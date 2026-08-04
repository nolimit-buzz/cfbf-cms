/**
 * How it works page Cloudinary reuse pass.
 *
 * Seven of the nine How it works sources are the exact same URLs already
 * uploaded for other pages — the six partner logos under
 * `climate facility/about-page/partners-*` and the Unsplash hero photo (w=1200)
 * under `climate facility/eligibility-page/hero-background-image`. Rather than
 * duplicate them on Cloudinary, this pass matches rows by their **full source
 * URL** and copies over the existing cloudinaryPublicId / cloudinaryUrl,
 * marking the row `reusedFrom`.
 *
 *   node scripts/resolve-how-it-works-cloudinary.mjs
 *   node scripts/upload-page-media.mjs --page=how-it-works --skip-existing
 *
 * The second command then uploads only what this pass could not resolve
 * (ta-provider-3-src.png and facility-structure-diagram-src.svg) into
 * `climate facility/how-it-works-page`.
 *
 * Unlike scripts/resolve-news-cloudinary.mjs — which matches on Unsplash photo
 * id because Home and News request the same photo at the same width — matching
 * here is on the whole URL. Six of the seven are wp-content paths with no query
 * string, and the hero must not collide with the same photo requested at other
 * widths (w=800 / w=1400 / w=2070 all exist in other manifests).
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const CMS_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MANIFEST = (page) => path.join(CMS_ROOT, 'seed-manifests', page, 'manifest.json');

const TARGET_PAGE = 'how-it-works-page';
/** Donor pages, in priority order. */
const DONOR_PAGES = ['about-page', 'eligibility-page'];

async function main() {
  const target = JSON.parse(await fs.readFile(MANIFEST(TARGET_PAGE), 'utf8'));

  /** source URL -> { page, row } of the first donor that has it uploaded. */
  const bySource = new Map();
  for (const page of DONOR_PAGES) {
    const rows = JSON.parse(await fs.readFile(MANIFEST(page), 'utf8'));
    for (const row of rows) {
      if (!row.source || !row.cloudinaryUrl || row.status !== 'ok') continue;
      if (!bySource.has(row.source)) bySource.set(row.source, { page, row });
    }
  }

  let reused = 0;
  const unresolved = [];
  for (const row of target) {
    if (row.status !== 'ok') continue;
    const match = bySource.get(row.source);
    if (!match) {
      // Drop anything a previous, looser run may have written so the upload
      // pass treats this row as genuinely missing.
      delete row.cloudinaryPublicId;
      delete row.cloudinaryUrl;
      delete row.reusedFrom;
      delete row.reusedLocalFile;
      unresolved.push(row.localFile);
      continue;
    }
    row.cloudinaryPublicId = match.row.cloudinaryPublicId;
    row.cloudinaryUrl = match.row.cloudinaryUrl;
    row.reusedFrom = match.page;
    row.reusedLocalFile = match.row.localFile;
    reused += 1;
    console.log(`reused   ${row.localFile}  <- ${match.page}/${match.row.localFile}`);
  }

  await fs.writeFile(MANIFEST(TARGET_PAGE), `${JSON.stringify(target, null, 2)}\n`, 'utf8');
  console.log(`\n${reused} row(s) reused, ${unresolved.length} still to upload:`);
  for (const file of unresolved) console.log(`  - ${file}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
