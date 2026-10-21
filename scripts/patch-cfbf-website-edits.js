'use strict';

/**
 * One-off idempotent patch for the CFBF website-edit corrections that are also
 * baked into `src/seed/about-page-copy.ts` and `src/seed/projects-page-copy.ts`.
 * Seeding only creates missing entries/sections — it never rewrites a value
 * inside a section that already exists — so any environment seeded before
 * those seed-file fixes keeps serving the old figures/copy until this runs.
 *
 * Safe to re-run: each fix only touches a section matched by `__component`
 * and, within it, a specific field/array item, so running this after the
 * values are already correct is a no-op.
 *
 * Usage: `npm run patch:cfbf-edits` (from `cms/`).
 */

function buildComponentPopulate(strapi, componentUid, depth = 0) {
  const schema = strapi.components?.[componentUid];
  if (!schema || depth > 6) return null;

  const populate = {};
  for (const [name, attribute] of Object.entries(schema.attributes ?? {})) {
    if (attribute?.type === 'component' && attribute.component) {
      const child = buildComponentPopulate(strapi, attribute.component, depth + 1);
      populate[name] = child ? { populate: child } : {};
    }
  }
  return Object.keys(populate).length > 0 ? populate : null;
}

function buildSectionsPopulate(strapi, uid) {
  const zone = strapi.contentType(uid)?.attributes?.sections;
  const components = zone?.components ?? [];
  if (zone?.type !== 'dynamiczone' || components.length === 0) return ['sections'];

  const on = {};
  for (const componentUid of components) {
    const child = buildComponentPopulate(strapi, componentUid);
    on[componentUid] = child ? { populate: child } : {};
  }
  return { sections: { on } };
}

function isFullyPopulated(strapi, entry) {
  const schema = strapi.components?.[entry.__component];
  if (!schema) return false;

  for (const [name, attribute] of Object.entries(schema.attributes ?? {})) {
    if (attribute?.type !== 'component') continue;

    const value = entry[name];
    if (value === undefined) return false;

    const children = Array.isArray(value) ? value : [value];
    for (const child of children) {
      if (child && !isFullyPopulated(strapi, { ...child, __component: attribute.component })) {
        return false;
      }
    }
  }
  return true;
}

/** Patches the About singleton: hero stat, mandate numbers, and Critical Q&A. */
function patchAboutSections(strapi, sections) {
  let changed = false;

  for (const section of sections) {
    if (section.__component === 'about-page.hero-section') {
      const stat = (section.stats ?? []).find((s) => s.cardNumber === '02');
      if (stat && (stat.label !== 'Total Capital Deployed' || stat.value !== '11.65 Billion Naira')) {
        stat.label = 'Total Capital Deployed';
        stat.value = '11.65 Billion Naira';
        changed = true;
      }
    }

    if (section.__component === 'about-page.mandate-section') {
      const number = (section.numbers ?? []).find((n) => n.label === 'Total Deployed Capital');
      if (number && number.value !== '11.65 Billion Naira') {
        number.value = '11.65 Billion Naira';
        changed = true;
      }
    }

    if (section.__component === 'about-page.audience-section') {
      for (const persona of section.personas ?? []) {
        const questions = persona.questions ?? [];
        const governanceIdx = questions.findIndex(
          (q) => q.question === 'What is the green asset governance standard?'
        );
        if (governanceIdx !== -1) {
          questions.splice(governanceIdx, 1);
          persona.questions = questions;
          changed = true;
        }

        const denomination = questions.find(
          (q) => q.question === 'Are payments denominated in foreign currency?'
        );
        const correctAnswer =
          "No, all transactions are denominated in Nigerian Naira in accordance with InfraCredit's mandate to provide long term local currency loans.";
        if (denomination && denomination.answer !== correctAnswer) {
          denomination.answer = correctAnswer;
          changed = true;
        }
      }
    }
  }

  return changed;
}

/** New case-study entries added to `projects-page.pipeline-tab-section.projects` — kept in sync with `src/seed/projects-page-copy.ts`. */
const NEW_PIPELINE_PROJECTS = [
  {
    projectId: '07',
    title: 'Electrify Microgrid Limited',
    location: 'Jigawa State',
    year: '2026',
    capital: '₦3.60b',
    capacity: '609kW',
    category: 'Solar Grid',
    connections: '4,557',
    jobs: '305',
    ghg: '1,500 Tonnes',
    status: 'Under Construction',
    image_alt_text: 'Electrify Microgrid Limited',
    desc: 'Nine solar mini-grids providing productive-use power across Jigawa State.',
    problem:
      'Nine rural communities in Jigawa State lacked grid access, leaving residents and businesses without reliable power.',
    solution:
      '609kWp of solar mini-grids backed by battery storage, connecting 4,557 households and businesses.',
    impact: 'Electrifying over 20,000 people and 400 businesses, creating up to 305 jobs across Jigawa State.',
    sdgs: '3, 7, 8, 13',
  },
  {
    projectId: '08',
    title: 'Magnificent Catalytic Inclusions Limited',
    location: 'Benue & Kogi States',
    year: '2026',
    capital: '₦2.00b',
    capacity: '710kW',
    category: 'Solar Grid',
    connections: '7,032',
    jobs: '1,095',
    ghg: '2,000 Tonnes',
    status: 'Under Construction',
    image_alt_text: 'Magnificent Catalytic Inclusions Limited',
    desc: 'Solar-hybrid mini-grids for off-grid communities in Benue and Kogi states.',
    problem: 'Four communities across Benue and Kogi states had no grid access for households and small businesses.',
    solution: '710kWp of solar-hybrid mini-grid capacity connecting 7,032 households and small businesses.',
    impact: 'Electrifying up to 7,032 unserved households, creating up to 1,095 temporary and permanent jobs.',
    sdgs: '7, 8, 9, 11, 13, 17',
  },
  {
    projectId: '09',
    title: 'Ashipa Electric Limited',
    location: 'Kogi State',
    year: '2025',
    capital: '₦1.70b',
    capacity: '750kW',
    category: 'Solar Grid',
    connections: '2,671',
    jobs: '350',
    ghg: '699 Tonnes',
    status: 'Under Construction',
    image_alt_text: 'Ashipa Electric Limited',
    desc: 'Solar-hybrid mini-grids for off-grid rural electrification in Kogi state.',
    problem: 'Five communities in Kogi state lacked grid access for households and small businesses.',
    solution: '750kWp of solar-hybrid mini-grid capacity connecting 2,671 households and small businesses.',
    impact: 'Electrifying up to 2,671 unserved households, creating up to 350 temporary and permanent jobs.',
    sdgs: '7, 8, 9, 11, 13, 17',
  },
];

/** Patches the Projects listing singleton: hero stats, analysis-tab stat boxes, and the pipeline project list. */
function patchProjectsSections(strapi, sections) {
  let changed = false;
  const fixes = [
    { label: 'Capacity installed', value: '5.88' },
    { label: 'Connections powered', value: '51,666' },
    { label: 'Capital deployed', value: '₦11.65B' },
  ];

  for (const section of sections) {
    if (
      section.__component === 'projects-page.hero-section' ||
      section.__component === 'projects-page.analysis-tab-section'
    ) {
      const list = section.stats ?? section.statBoxes ?? [];
      for (const fix of fixes) {
        const stat = list.find((s) => s.label === fix.label);
        if (stat && stat.value !== fix.value) {
          stat.value = fix.value;
          changed = true;
        }
      }
    }

    if (section.__component === 'projects-page.pipeline-tab-section') {
      const existingIds = new Set((section.projects ?? []).map((p) => p.projectId));
      for (const entry of NEW_PIPELINE_PROJECTS) {
        if (!existingIds.has(entry.projectId)) {
          // Reuse the image already seeded on an existing Solar Grid entry rather than
          // hardcoding a Cloudinary/Unsplash URL here — keeps this patch schema-light.
          const fallbackImage = (section.projects ?? []).find((p) => p.category === 'Solar Grid')?.image ?? '';
          section.projects = section.projects ?? [];
          section.projects.push({ ...entry, image: fallbackImage });
          changed = true;
        }
      }
    }
  }

  return changed;
}

async function patchSingleType(strapi, uid, label, patchFn) {
  const documents = strapi.documents(uid);
  const populate = buildSectionsPopulate(strapi, uid);

  const draft = await documents.findFirst({ populate, status: 'draft' });
  if (!draft?.sections?.length) {
    strapi.log.info(`[patch-cfbf-edits] ${label}: no entry/sections found, skipping.`);
    return;
  }

  const partial = draft.sections.filter((section) => !isFullyPopulated(strapi, section));
  if (partial.length > 0) {
    strapi.log.warn(
      `[patch-cfbf-edits] ${label}: ${partial
        .map((s) => s.__component)
        .join(', ')} read back incomplete — skipping to avoid overwriting stored content.`
    );
    return;
  }

  const changed = patchFn(strapi, draft.sections);
  if (!changed) {
    strapi.log.info(`[patch-cfbf-edits] ${label}: already up to date, nothing to patch.`);
    return;
  }

  await documents.update({ documentId: draft.documentId, data: { sections: draft.sections }, populate });
  await documents.publish({ documentId: draft.documentId });
  strapi.log.info(`[patch-cfbf-edits] ${label}: patched and republished.`);
}

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();
  app.log.level = 'info';

  await patchSingleType(app, 'api::about.about', 'ABOUT page', patchAboutSections);
  await patchSingleType(app, 'api::projects.projects', 'PROJECTS page', patchProjectsSections);

  await app.destroy();
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
