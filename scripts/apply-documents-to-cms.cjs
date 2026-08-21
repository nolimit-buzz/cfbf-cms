/**
 * Write the real document URLs (uploaded by scripts/upload-documents.mjs, see
 * seed-manifests/documents.json) into every LIVE CMS entry that has a
 * "download the factsheet / impact report" field. Every field patched here
 * currently holds the placeholder `/download.pdf`.
 *
 *   node scripts/apply-documents-to-cms.cjs --dry-run    # report, write nothing
 *   node scripts/apply-documents-to-cms.cjs              # apply, then publish
 *
 * CommonJS on purpose: @strapi/strapi's ESM build fails to resolve its own
 * `lodash/fp` directory import under Node's ESM loader. Modeled on
 * scripts/add-kfw-partner.cjs — a handful of direct field writes rather than
 * the manifest-driven patch framework the per-page image scripts use, since
 * these six fields span five different content types.
 */
const fs = require('node:fs');
const path = require('node:path');
const { createStrapi, compileStrapi } = require('@strapi/strapi');

const CMS_ROOT = path.resolve(__dirname, '..');
const DRY_RUN = process.argv.includes('--dry-run');

const DOCS = JSON.parse(fs.readFileSync(path.join(CMS_ROOT, 'seed-manifests', 'documents.json'), 'utf8'));
const FACTSHEET_URL = DOCS['cfbf-factsheet'];
const IMPACT_REPORT_URL = DOCS['cfbf-impact-report-2025'];
if (!FACTSHEET_URL || !IMPACT_REPORT_URL) {
  throw new Error('seed-manifests/documents.json is missing one of the expected URLs — run upload-documents.mjs first');
}

/** Each target: which content type, which section component, which field(s) to set. */
const TARGETS = [
  {
    uid: 'api::about.about',
    populate: {
      sections: {
        on: {
          'about-page.download-cta-section': { populate: '*' },
          'about-page.audience-section': { populate: { personas: { populate: '*' } } },
        },
      },
    },
    patches: [
      { component: 'about-page.download-cta-section', field: 'buttonHref', value: FACTSHEET_URL },
      {
        component: 'about-page.audience-section',
        apply: (section) => {
          const persona = section.personas?.find((p) => p.tabLabel === 'Institutional Investor');
          if (!persona) throw new Error('about-page.audience-section: "Institutional Investor" persona not found');
          const before = persona.ctaHref;
          persona.ctaHref = FACTSHEET_URL;
          return { field: 'personas[Institutional Investor].ctaHref', before, after: FACTSHEET_URL };
        },
      },
    ],
  },
  {
    uid: 'api::eligibility.eligibility',
    populate: { sections: { on: { 'eligibility-page.final-cta-section': { populate: '*' } } } },
    patches: [
      { component: 'eligibility-page.final-cta-section', field: 'downloadCtaHref', value: FACTSHEET_URL },
    ],
  },
  {
    uid: 'api::contact.contact',
    populate: { sections: { on: { 'contact-page.download-cta-section': { populate: '*' } } } },
    patches: [
      { component: 'contact-page.download-cta-section', field: 'fileHref', value: FACTSHEET_URL },
    ],
  },
  {
    uid: 'api::home.home',
    populate: { sections: { on: { 'home-page.impact-section': { populate: '*' } } } },
    patches: [
      { component: 'home-page.impact-section', field: 'reportFileHref', value: IMPACT_REPORT_URL },
    ],
  },
  {
    uid: 'api::projects.projects',
    populate: { sections: { on: { 'projects-page.analysis-tab-section': { populate: '*' } } } },
    patches: [
      { component: 'projects-page.analysis-tab-section', field: 'downloadHref', value: IMPACT_REPORT_URL },
    ],
  },
];

async function main() {
  const appContext = await compileStrapi({ appDir: CMS_ROOT, distDir: path.join(CMS_ROOT, 'dist') });
  const strapi = await createStrapi(appContext).load();

  try {
    let totalApplied = 0;

    for (const target of TARGETS) {
      const entry = await strapi.documents(target.uid).findFirst({
        status: 'draft',
        populate: target.populate,
      });
      if (!entry?.sections?.length) {
        console.warn(`skip ${target.uid}: no draft with sections found`);
        continue;
      }

      let changed = false;
      for (const patch of target.patches) {
        const section = entry.sections.find((s) => s.__component === patch.component);
        if (!section) {
          throw new Error(`${target.uid}: ${patch.component} not found on entry`);
        }

        if (patch.apply) {
          const { field, before, after } = patch.apply(section);
          console.log(`${target.uid} ${patch.component}.${field}\n  before: ${before}\n  after:  ${after}`);
          changed = true;
        } else {
          const before = section[patch.field];
          section[patch.field] = patch.value;
          console.log(`${target.uid} ${patch.component}.${patch.field}\n  before: ${before}\n  after:  ${patch.value}`);
          changed = true;
        }
        totalApplied += 1;
      }

      if (!changed || DRY_RUN) continue;

      await strapi.documents(target.uid).update({ documentId: entry.documentId, data: { sections: entry.sections } });
      console.log(`${target.uid}: draft updated.`);
      await strapi.documents(target.uid).publish({ documentId: entry.documentId });
      console.log(`${target.uid}: published.`);
    }

    console.log(`\n${totalApplied} field(s) ${DRY_RUN ? 'would be' : ''} patched.`);
    if (DRY_RUN) console.log('--dry-run: nothing written.');
  } finally {
    try {
      await strapi.destroy();
    } catch (error) {
      console.warn(`shutdown warning (data already committed): ${error.message}`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
