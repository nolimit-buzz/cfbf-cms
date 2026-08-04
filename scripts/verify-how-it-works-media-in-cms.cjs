/**
 * Read every How it works media field back out of the database and report
 * whether it actually holds a Cloudinary URL — the acceptance test for the
 * extract → upload → apply pipeline.
 *
 *   node scripts/verify-how-it-works-media-in-cms.cjs                 # draft (default)
 *   node scripts/verify-how-it-works-media-in-cms.cjs --status=published
 *
 * Exits non-zero if any manifest row's field or its `_alt_text` sibling is
 * missing, empty, or not a res.cloudinary.com URL.
 *
 * Mirrors scripts/verify-eligibility-media-in-cms.cjs.
 */
const fs = require('node:fs');
const path = require('node:path');
const { createStrapi, compileStrapi } = require('@strapi/strapi');

const CMS_ROOT = path.resolve(__dirname, '..');
const MANIFEST_PATH = path.join(CMS_ROOT, 'seed-manifests', 'how-it-works-page', 'manifest.json');

const status =
  process.argv.find((arg) => arg.startsWith('--status='))?.slice('--status='.length) ?? 'draft';

/** Media fields that intentionally have no `_alt_text` sibling. */
const NO_ALT_TEXT = new Set();

/** Only the three sections that own media need populating for this read. */
const SECTION_POPULATE = {
  'how-it-works-page.hero-section': { populate: '*' },
  'how-it-works-page.financing-structure-section': {
    populate: {
      anchorFunders: { populate: '*' },
      coFinancingPartner: { populate: '*' },
      taProviders: { populate: '*' },
    },
  },
  'how-it-works-page.facility-structure-section': { populate: '*' },
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
    const howItWorks = await strapi.documents('api::how-it-works.how-it-works').findFirst({
      status,
      populate: { sections: { on: SECTION_POPULATE } },
    });
    if (!howItWorks?.sections?.length) {
      throw new Error(`no How it works ${status} entry with sections found`);
    }

    const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
    const rows = [];
    let failures = 0;

    for (const entry of manifest) {
      const section = howItWorks.sections.find((item) => item.__component === entry.component);
      const segments = entry.paths[0];
      const leaf = segments.at(-1).field;
      const value = section ? read(section, segments) : null;
      const matches = value === entry.cloudinaryUrl;
      const isCloudinary =
        typeof value === 'string' && value.startsWith('https://res.cloudinary.com/');

      let altState = 'n/a';
      if (!NO_ALT_TEXT.has(leaf)) {
        const altSegments = [...segments.slice(0, -1), { ...segments.at(-1), field: `${leaf}_alt_text` }];
        const altValue = section ? read(section, altSegments) : null;
        // altText is often intentionally '' (decorative images); Strapi stores
        // an empty string as null, so treat both as a match for an empty seed.
        const normalised = altValue ?? '';
        altState = normalised === entry.altText ? 'ok' : `MISMATCH (${JSON.stringify(altValue)})`;
      }

      const ok = isCloudinary && matches && !altState.startsWith('MISMATCH');
      if (!ok) failures += 1;
      const index = segments.at(-2)?.index;
      rows.push({
        field: `${entry.component.replace('how-it-works-page.', '')}.${
          index === undefined ? leaf : `[${index}].${leaf}`
        }`,
        file: entry.localFile,
        url: ok ? 'OK' : (value ?? 'NULL'),
        alt: altState,
        verdict: ok ? 'PASS' : 'FAIL',
      });
    }

    console.table(rows);
    console.log(`\nstatus=${status}: ${rows.length - failures}/${rows.length} passed.`);
    if (failures) process.exitCode = 1;
  } finally {
    // See apply-how-it-works-media-to-cms.cjs — destroy() can time out acquiring
    // a connection after a heavy populate. That must not flip a passing verify.
    try {
      await strapi.destroy();
    } catch (error) {
      console.warn(`shutdown warning (results above are valid): ${error.message}`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
