/**
 * One-shot codemod: rewrite the image URLs already present in
 * cms/src/seed/home-page-copy.ts to their Cloudinary equivalents from
 * cms/seed-manifests/home-page/manifest.json, and insert the matching
 * `<field>_alt_text` sibling right after each one.
 *
 *   node scripts/seed-home-media-urls.mjs
 *
 * Fields that did not exist in the seed before this workflow (hero background
 * image/video, hero certification badge, about image, the two metric-card
 * images, net-zero image) are added by hand — they have no literal here to
 * match against.
 */
import fs from 'node:fs';

const SEED_PATH = 'src/seed/home-page-copy.ts';
const MANIFEST_PATH = 'seed-manifests/home-page/manifest.json';

/** Rows whose field is newly added and therefore has no literal in the seed yet. */
const NEW_FIELDS = new Set([
  'hero-background-image.jpg',
  'hero-background-video.mp4',
  'hero-certification-badge.svg',
  'about-image.jpg',
  'impact-metric-card-2-image.jpg',
  'impact-metric-card-4-image.jpg',
  'net-zero-image.jpg',
]);

const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
const rows = manifest.filter((row) => !NEW_FIELDS.has(row.localFile));

const literal = (value) => (value.includes("'") ? JSON.stringify(value) : `'${value}'`);

let source = fs.readFileSync(SEED_PATH, 'utf8');
let index = 0;

source = source.replace(
  // The trailing `/` requirement keeps the bare site URL (structured-data `url`)
  // out of the match — only asset paths are rewritten.
  /^([ ]*)(\w+):\s*\n?\s*'(https:\/\/(?:images\.unsplash\.com|climatesupportfacility\.org)\/[^']*)',$/gm,
  (_match, indent, key) => {
    const row = rows[index++];
    if (!row) throw new Error(`ran out of manifest rows at field "${key}"`);
    const leaf = row.paths[0].at(-1).field;
    if (leaf !== key) {
      throw new Error(`order mismatch #${index}: seed field "${key}" vs manifest "${leaf}" (${row.localFile})`);
    }
    return (
      `${indent}${key}:\n${indent}  '${row.cloudinaryUrl}',\n` +
      `${indent}${key}_alt_text:\n${indent}  ${literal(row.altText)},`
    );
  }
);

if (index !== rows.length) {
  throw new Error(`replaced ${index} of ${rows.length} expected rows`);
}

fs.writeFileSync(SEED_PATH, source);
console.log(`rewrote ${index} URL fields and inserted their _alt_text siblings`);
