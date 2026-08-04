/**
 * Write the Cloudinary URLs and alt text into the LIVE How it works entry —
 * media fields only, every copy field left exactly as stored.
 *
 *   node scripts/apply-how-it-works-media-to-cms.cjs --dry-run    # report, write nothing
 *   node scripts/apply-how-it-works-media-to-cms.cjs              # apply, then publish
 *   node scripts/apply-how-it-works-media-to-cms.cjs --restore    # roll back from the backup
 *
 * CommonJS on purpose: @strapi/strapi's ESM build fails to resolve its own
 * `lodash/fp` directory import under Node's ESM loader.
 *
 * bootstrap() only seeds a How it works entry when there isn't one, so the seed
 * file and the database diverge once the entry exists. This closes that gap
 * without touching the seed-once guard.
 *
 * Mirrors scripts/apply-eligibility-media-to-cms.cjs.
 */
const fs = require('node:fs');
const path = require('node:path');
const { createStrapi, compileStrapi } = require('@strapi/strapi');

const CMS_ROOT = path.resolve(__dirname, '..');
const PAGE_NAME = 'how-it-works-page';
const MANIFEST_PATH = path.join(CMS_ROOT, 'seed-manifests', PAGE_NAME, 'manifest.json');
const BACKUP_PATH = path.join(CMS_ROOT, 'seed-manifests', PAGE_NAME, 'pre-update-backup.json');

const DRY_RUN = process.argv.includes('--dry-run');
const RESTORE = process.argv.includes('--restore');

/**
 * No markup patches on this page. Every glyph is a lucide-react component and
 * the only vector art (the facility diagram, the InfraCredit colour logo) are
 * remote .svg files rendered through <img src>, so they are uploaded assets —
 * there is no static SVG string to seed.
 */
const MARKUP_PATCHES = [];

/** Media fields that intentionally have no `_alt_text` sibling. */
const NO_ALT_TEXT = new Set(); // all nine rows are <img>-backed

/** Repeatable arrays needing rows created before patching. anchorFunders and
 *  taProviders are already seeded with all their items, so none are needed. */
const ENSURE_ITEMS = [];

/**
 * Dynamic zones need populate declared per component. Sections are written back
 * wholesale, so anything nested must be populated explicitly or the update would
 * drop it — including the repeatables on the financing-structure section that
 * own the partner logos.
 */
const SECTION_POPULATE = {
  'how-it-works-page.structured-data-section': { populate: '*' },
  'how-it-works-page.hero-section': { populate: { steps: { populate: '*' } } },
  'how-it-works-page.financing-structure-section': {
    populate: {
      bullets: { populate: '*' },
      anchorFunders: { populate: '*' },
      coFinancingPartner: { populate: '*' },
      taProviders: { populate: '*' },
    },
  },
  'how-it-works-page.facility-structure-section': { populate: '*' },
  'how-it-works-page.process-section': { populate: { steps: { populate: '*' } } },
  'how-it-works-page.next-steps-section': { populate: { links: { populate: '*' } } },
};

/** Walks `paths` into `section`, returning the owning object and leaf key. */
function resolve(section, segments) {
  let node = section;
  for (const segment of segments.slice(0, -1)) {
    node = node?.[segment.field];
    if (segment.index !== undefined) node = node?.[segment.index];
    if (node == null) return null;
  }
  const last = segments.at(-1);
  if (last.index !== undefined) {
    node = node?.[last.field];
    return node?.[last.index] ? { owner: node[last.index], key: last.field } : null;
  }
  return node && typeof node === 'object' ? { owner: node, key: last.field } : null;
}

function buildPatches() {
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  const patches = [];
  for (const row of manifest) {
    if (row.status !== 'ok' || !row.cloudinaryUrl) {
      throw new Error(`manifest row ${row.localFile} is not uploaded (status: ${row.status})`);
    }
    const segments = row.paths[0];
    const leaf = segments.at(-1).field;
    patches.push({ component: row.component, paths: row.paths, field: leaf, value: row.cloudinaryUrl });
    if (!NO_ALT_TEXT.has(leaf)) {
      const altSegments = [...segments.slice(0, -1), { ...segments.at(-1), field: `${leaf}_alt_text` }];
      patches.push({
        component: row.component,
        paths: [altSegments],
        field: `${leaf}_alt_text`,
        value: row.altText,
      });
    }
  }
  return [...patches, ...MARKUP_PATCHES.map((p) => ({ ...p, field: p.paths[0].at(-1).field }))];
}

async function main() {
  const appContext = await compileStrapi({ appDir: CMS_ROOT, distDir: path.join(CMS_ROOT, 'dist') });
  const strapi = await createStrapi(appContext).load();

  try {
    const howItWorks = await strapi.documents('api::how-it-works.how-it-works').findFirst({
      status: 'draft',
      populate: { sections: { on: SECTION_POPULATE } },
    });
    if (!howItWorks?.sections?.length) throw new Error('no How it works draft with sections found');

    const patches = RESTORE
      ? JSON.parse(fs.readFileSync(BACKUP_PATH, 'utf8')).map((row) => ({
          component: row.component,
          paths: row.paths,
          field: row.paths[0].at(-1).field,
          value: row.previousValue,
        }))
      : buildPatches();

    if (!RESTORE) {
      for (const { component, field, rows } of ENSURE_ITEMS) {
        const section = howItWorks.sections.find((item) => item.__component === component);
        if (!section) throw new Error(`${component} missing — cannot seed ${field}`);
        const existing = Array.isArray(section[field]) ? section[field] : [];
        if (existing.length >= rows.length) continue;
        section[field] = [...existing, ...rows.slice(existing.length).map((row) => ({ ...row }))];
        console.log(`create ${component}.${field}[] += ${rows.length - existing.length} row(s)`);
      }
    }

    const backup = [];
    const unresolved = [];
    let applied = 0;

    for (const patch of patches) {
      const section = howItWorks.sections.find((item) => item.__component === patch.component);
      if (!section) {
        unresolved.push(`${patch.component} (section missing)`);
        continue;
      }
      const target = resolve(section, patch.paths[0]);
      if (!target) {
        unresolved.push(`${patch.component} -> ${JSON.stringify(patch.paths[0])}`);
        continue;
      }
      backup.push({
        component: patch.component,
        paths: patch.paths,
        previousValue: target.owner[target.key] ?? null,
      });
      const before = target.owner[target.key];
      target.owner[target.key] = patch.value;
      applied += 1;
      const changed = before !== patch.value;
      console.log(
        `${changed ? 'patch ' : 'same  '} ${patch.component}.${patch.field} = ` +
          `${String(patch.value).slice(0, 78)}${String(patch.value).length > 78 ? '…' : ''}`
      );
    }

    if (unresolved.length) {
      throw new Error(`${unresolved.length} unresolved path(s):\n  ${unresolved.join('\n  ')}`);
    }
    if (applied === 0) throw new Error('no patches resolved — refusing to write');

    console.log(`\n${applied} field(s) resolved.`);

    if (DRY_RUN) {
      console.log('--dry-run: nothing written.');
      return;
    }

    if (!RESTORE) {
      fs.writeFileSync(BACKUP_PATH, `${JSON.stringify(backup, null, 2)}\n`, 'utf8');
      console.log(`backup written: ${path.relative(CMS_ROOT, BACKUP_PATH)}`);
    }

    await strapi.documents('api::how-it-works.how-it-works').update({
      documentId: howItWorks.documentId,
      data: { sections: howItWorks.sections },
    });
    console.log('draft updated.');

    await strapi.documents('api::how-it-works.how-it-works').publish({
      documentId: howItWorks.documentId,
    });
    console.log('published — draft and published versions now match.');
  } finally {
    // Teardown only — see apply-projects-media-to-cms.cjs: destroy() can raise a
    // connection-acquisition timeout well after the write has committed.
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
