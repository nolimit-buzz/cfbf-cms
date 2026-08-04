/**
 * Contact page Cloudinary reuse pass.
 *
 * One of the three Contact sources is the exact URL already uploaded for the
 * Eligibility final CTA — photo-1509391366360 at w=1400, living at
 * `climate facility/eligibility-page/final-cta-background-image`. Rather than
 * duplicate the same bytes, this pass matches rows by their **full source URL**
 * and copies over the existing cloudinaryPublicId / cloudinaryUrl, marking the
 * row `reusedFrom`.
 *
 *   node scripts/resolve-contact-cloudinary.mjs
 *   node scripts/upload-page-media.mjs --page=contact --skip-existing
 *
 * The second command then uploads only what this pass could not resolve (the
 * hero and fun-stats photos) into `climate facility/contact-page`.
 *
 * Matching is on the whole URL, not the Unsplash photo id: photo-1509391366360
 * is also requested at w=1200 by the Eligibility hero, and those are two
 * distinct assets. Same rule as resolve-how-it-works-cloudinary.mjs:19-23.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const CMS_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MANIFEST = (page) => path.join(CMS_ROOT, 'seed-manifests', page, 'manifest.json');

const TARGET_PAGE = 'contact-page';
/** Donor pages, in priority order. */
const DONOR_PAGES = ['eligibility-page', 'about-page', 'home-page', 'impact-page', 'projects-page'];

/**
 * Only these rows may reuse another page's asset. Everything else uploads into
 * `climate facility/contact-page` so the folder stays a complete record of the
 * page, even where a photo happens to be shared.
 *
 * The hero photo (photo-1473341304170 at w=1200) is byte-identical to
 * home-page/news-3-image.jpg, but that name says nothing about the Contact hero
 * — reusing it would leave contact-page/ missing its own hero. Only the brochure
 * CTA, whose donor is a same-purpose full-bleed CTA background, is reused.
 */
const REUSABLE = new Set(['download-cta-background-image.jpg']);

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
    const match = REUSABLE.has(row.localFile) ? bySource.get(row.source) : undefined;
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
