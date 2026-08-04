/**
 * Read every About media field back out of the database and report whether it
 * actually holds a Cloudinary URL — the acceptance test for the extract →
 * upload → apply pipeline.
 *
 *   node scripts/verify-about-media-in-cms.cjs                 # draft (default)
 *   node scripts/verify-about-media-in-cms.cjs --status=published
 *
 * Exits non-zero if any manifest row's field, its `_alt_text` sibling, or the
 * energy map's `mapSvg` is missing, empty, or not a res.cloudinary.com URL.
 */
const fs = require('node:fs');
const path = require('node:path');
const { createStrapi, compileStrapi } = require('@strapi/strapi');

const CMS_ROOT = path.resolve(__dirname, '..');
const MANIFEST_PATH = path.join(CMS_ROOT, 'seed-manifests', 'about-page', 'manifest.json');

const status =
  process.argv.find((arg) => arg.startsWith('--status='))?.slice('--status='.length) ?? 'draft';

const NO_ALT_TEXT = new Set(['bentoVideo']);

const SECTION_POPULATE = {
  'about-page.hero-section': { populate: '*' },
  'about-page.mandate-section': { populate: '*' },
  'about-page.market-section': { populate: '*' },
  'about-page.energy-map-section': { populate: '*' },
  'about-page.framework-section': { populate: '*' },
  'about-page.partners-section': { populate: { groups: { populate: '*' } } },
  'about-page.milestones-section': { populate: '*' },
  'about-page.download-cta-section': { populate: '*' },
};

function read(section, segments) {
  let node = section;
  for (const segment of segments) {
    node = node?.[segment.field];
    if (segment.index !== undefined) node = node?.[segment.index];
    if (node == null) return null;
  }
  return node;
}

async function main() {
  const appContext = await compileStrapi({ appDir: CMS_ROOT, distDir: path.join(CMS_ROOT, 'dist') });
  const strapi = await createStrapi(appContext).load();

  try {
    const about = await strapi.documents('api::about.about').findFirst({
      status,
      populate: { sections: { on: SECTION_POPULATE } },
    });
    if (!about?.sections?.length) throw new Error(`no About ${status} entry with sections found`);

    const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
    const rows = [];
    let failures = 0;

    for (const entry of manifest) {
      const section = about.sections.find((item) => item.__component === entry.component);
      const segments = entry.paths[0];
      const leaf = segments.at(-1).field;
      const value = section ? read(section, segments) : null;
      const matches = value === entry.cloudinaryUrl;
      const isCloudinary = typeof value === 'string' && value.startsWith('https://res.cloudinary.com/');

      let altState = 'n/a';
      if (!NO_ALT_TEXT.has(leaf)) {
        const altSegments = [...segments.slice(0, -1), { ...segments.at(-1), field: `${leaf}_alt_text` }];
        const altValue = section ? read(section, altSegments) : null;
        altState = altValue === entry.altText ? 'ok' : `MISMATCH (${JSON.stringify(altValue)})`;
      }

      const ok = isCloudinary && matches && !altState.startsWith('MISMATCH');
      if (!ok) failures += 1;
      rows.push({
        field: `${entry.component.replace('about-page.', '')}.${leaf}`,
        url: ok ? 'OK' : (value ?? 'NULL'),
        alt: altState,
        verdict: ok ? 'PASS' : 'FAIL',
      });
    }

    // Energy map SVG — markup, not an upload, so it has no manifest row.
    const mapSection = about.sections.find((s) => s.__component === 'about-page.energy-map-section');
    const mapSvg = mapSection?.mapSvg;
    const svgOk = typeof mapSvg === 'string' && mapSvg.startsWith('<svg') && mapSvg.includes('data-state-id');
    if (!svgOk) failures += 1;
    rows.push({
      field: 'energy-map-section.mapSvg',
      url: svgOk ? `OK (${mapSvg.length} chars)` : 'MISSING',
      alt: 'n/a',
      verdict: svgOk ? 'PASS' : 'FAIL',
    });

    console.table(rows);
    console.log(`\nstatus=${status}: ${rows.length - failures}/${rows.length} passed.`);
    if (failures) process.exitCode = 1;
  } finally {
    await strapi.destroy();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
