/**
 * Write the Cloudinary URLs, alt text and inline SVG markup into the LIVE Home
 * entry — media fields only, every copy field left exactly as stored.
 *
 *   node scripts/apply-home-media-to-cms.cjs --dry-run    # report, write nothing
 *   node scripts/apply-home-media-to-cms.cjs              # apply, then publish
 *   node scripts/apply-home-media-to-cms.cjs --restore    # roll back from the backup
 *
 * CommonJS on purpose: @strapi/strapi's ESM build fails to resolve its own
 * `lodash/fp` directory import under Node's ESM loader.
 *
 * bootstrap() only seeds a Home entry when there isn't one, so the seed file and
 * the database diverge once the entry exists. This closes that gap without
 * touching the seed-once guard.
 *
 * It goes through Strapi's document service rather than SQL because the Home
 * document has separate draft and published entity trees, and repeatable
 * components are ordered through *_cmps link tables — both of which the document
 * service already handles.
 */
const fs = require('node:fs');
const path = require('node:path');
const { createStrapi, compileStrapi } = require('@strapi/strapi');

const CMS_ROOT = path.resolve(__dirname, '..');
const MANIFEST_PATH = path.join(CMS_ROOT, 'seed-manifests', 'home-page', 'manifest.json');
const BACKUP_PATH = path.join(CMS_ROOT, 'seed-manifests', 'home-page', 'pre-update-backup.json');

const DRY_RUN = process.argv.includes('--dry-run');
const RESTORE = process.argv.includes('--restore');

/**
 * Fields that carry no uploaded asset and so have no manifest row:
 * the map section's inline SVG, seeded as markup exactly as in
 * cms/src/seed/home-page-copy.ts (lifted from frontend/components/ui/MapLogos.tsx).
 */
const MARKUP_PATCHES = [
  {
    component: 'home-page.map-section',
    paths: [[{ field: 'fsdAfricaLogoSvg' }]],
    value:
      '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50,15 C50,15 25,35 25,55 C25,75 50,90 50,90 C50,90 75,75 75,55 C75,35 50,15 50,15 Z M50,78 C38,78 33,68 33,55 C33,40 50,26 50,26 C50,26 67,40 67,55 C67,68 62,78 50,78 Z" /><path d="M50,35 C50,35 37,47 37,58 C37,68 50,76 50,76 C50,76 63,68 63,58 C63,47 50,35 50,35 Z" fill="#00A788" opacity="0.8" /></svg>',
  },
];

/** Media fields that intentionally have no `_alt_text` sibling. */
const NO_ALT_TEXT = new Set(['backgroundVideo']);

/**
 * Dynamic zones need populate declared per component. `articles[].paragraphs[]`
 * in the news section is the only three-level case.
 */
const SECTION_POPULATE = {
  'home-page.hero-section': { populate: '*' },
  'home-page.about-section': { populate: '*' },
  'home-page.impact-section': { populate: '*' },
  'home-page.projects-section': { populate: '*' },
  'home-page.map-section': { populate: '*' },
  'home-page.stories-section': { populate: '*' },
  'home-page.news-section': { populate: { articles: { populate: '*' } } },
  'home-page.net-zero-section': { populate: '*' },
  'home-page.structured-data-section': { populate: '*' },
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
    const home = await strapi.documents('api::home.home').findFirst({
      status: 'draft',
      populate: { sections: { on: SECTION_POPULATE } },
    });
    if (!home?.sections?.length) throw new Error('no Home draft with sections found');

    const patches = RESTORE
      ? JSON.parse(fs.readFileSync(BACKUP_PATH, 'utf8')).map((row) => ({
          component: row.component,
          paths: row.paths,
          field: row.paths[0].at(-1).field,
          value: row.previousValue,
        }))
      : buildPatches();

    const backup = [];
    const unresolved = [];
    let applied = 0;

    for (const patch of patches) {
      const section = home.sections.find((item) => item.__component === patch.component);
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

    await strapi.documents('api::home.home').update({
      documentId: home.documentId,
      data: { sections: home.sections },
    });
    console.log('draft updated.');

    await strapi.documents('api::home.home').publish({ documentId: home.documentId });
    console.log('published — draft and published versions now match.');
  } finally {
    await strapi.destroy();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
