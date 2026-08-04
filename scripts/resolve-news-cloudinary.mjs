/**
 * News page Cloudinary reuse pass.
 *
 * The Home page renders the same five news articles as /news, so 15 of the 16
 * News images are the exact same Unsplash photos already uploaded under
 * `climate facility/home-page/news-*`. Rather than duplicate them on Cloudinary,
 * this script matches News manifest rows to Home manifest rows by Unsplash photo
 * id and copies over the existing cloudinaryPublicId / cloudinaryUrl, marking the
 * row `reusedFrom: "home-page"`.
 *
 *   node scripts/resolve-news-cloudinary.mjs
 *   node scripts/upload-page-media.mjs --page=news --skip-existing
 *
 * The second command then uploads only whatever this pass could not resolve
 * (currently just hero-bg-image) into `climate facility/news-page`.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const CMS_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const NEWS_MANIFEST = path.join(CMS_ROOT, 'seed-manifests', 'news-page', 'manifest.json');
const HOME_MANIFEST = path.join(CMS_ROOT, 'seed-manifests', 'home-page', 'manifest.json');

/** `https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80` -> `photo-1509391366360-2e959784a276` */
function photoId(url) {
  return url?.split('?')[0].split('/').pop() ?? null;
}

async function main() {
  const news = JSON.parse(await fs.readFile(NEWS_MANIFEST, 'utf8'));
  const home = JSON.parse(await fs.readFile(HOME_MANIFEST, 'utf8'));

  // Only the home-page `news-*` assets are eligible for reuse. Several News
  // photos also happen to appear under unrelated home-page names (e.g. the same
  // Unsplash photo backs `hero-background-image` and `project-1-image`); reusing
  // those would couple a News article's image to the Home hero, so any News row
  // that doesn't match a `news-*` asset is uploaded fresh under news-page.
  const byPhotoId = new Map();
  for (const row of home) {
    const id = photoId(row.source);
    if (!id || !row.cloudinaryUrl || !row.localFile?.startsWith('news-')) continue;
    if (!byPhotoId.has(id)) byPhotoId.set(id, row);
  }

  let reused = 0;
  const unresolved = [];
  for (const row of news) {
    if (row.status !== 'ok') continue;
    const match = byPhotoId.get(photoId(row.source));
    if (!match) {
      // Drop anything a previous, looser run may have written so the upload pass
      // treats this row as genuinely missing.
      delete row.cloudinaryPublicId;
      delete row.cloudinaryUrl;
      delete row.reusedFrom;
      delete row.reusedLocalFile;
      unresolved.push(row.localFile);
      continue;
    }
    row.cloudinaryPublicId = match.cloudinaryPublicId;
    row.cloudinaryUrl = match.cloudinaryUrl;
    row.reusedFrom = 'home-page';
    row.reusedLocalFile = match.localFile;
    reused += 1;
    console.log(`reused   ${row.localFile}  <- home-page/${match.localFile}`);
  }

  await fs.writeFile(NEWS_MANIFEST, `${JSON.stringify(news, null, 2)}\n`, 'utf8');
  console.log(`\n${reused} row(s) reused from home-page, ${unresolved.length} still to upload:`);
  for (const file of unresolved) console.log(`  - ${file}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
