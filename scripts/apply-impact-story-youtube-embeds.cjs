/**
 * Switch the Impact page's Stories tab from stock b-roll placeholders to real
 * YouTube embeds, matching how the homepage's Stories section already does it.
 *
 * For the 3 stories with a confirmed real video (matched by title), sets
 * `youtubeUrl` and drops the old `video` field. The other 3 stories have no
 * real video anywhere (checked the reference site and YouTube) — they're
 * removed from the live array, with their full JSON written to
 * seed-manifests/impact-stories-removed.json so they can be restored
 * verbatim once real footage is sourced.
 *
 *   node scripts/apply-impact-story-youtube-embeds.cjs --dry-run    # report, write nothing
 *   node scripts/apply-impact-story-youtube-embeds.cjs              # apply, then publish
 *
 * CommonJS on purpose: @strapi/strapi's ESM build fails to resolve its own
 * `lodash/fp` directory import under Node's ESM loader. Modeled on
 * scripts/apply-documents-to-cms.cjs.
 *
 * Requires the CMS to have already picked up story-item.json's schema change
 * (`video` -> `youtubeUrl`) — restart the Strapi dev server once before
 * running this if it was already running.
 */
const fs = require('node:fs');
const path = require('node:path');
const { createStrapi, compileStrapi } = require('@strapi/strapi');

const CMS_ROOT = path.resolve(__dirname, '..');
const BACKUP_PATH = path.join(CMS_ROOT, 'seed-manifests', 'impact-stories-removed.json');
const DRY_RUN = process.argv.includes('--dry-run');

/** title -> real YouTube link, for the 3 stories with confirmed footage. */
const REAL_VIDEOS = {
  'Meet Felicia Adindu-End User, Darway Coast': 'https://youtu.be/kBGxtT3dd0s',
  'ACOB Lighting Solar Powered Rural Electrification Project': 'https://youtu.be/E2Dfe3QuZds',
  'Prado Power Solar Powered Rural Electrification Project': 'https://youtu.be/81ULxF30F4A',
};

async function main() {
  const appContext = await compileStrapi({ appDir: CMS_ROOT, distDir: path.join(CMS_ROOT, 'dist') });
  const strapi = await createStrapi(appContext).load();

  try {
    const impact = await strapi.documents('api::impact.impact').findFirst({
      status: 'draft',
      populate: { sections: { on: { 'impact-page.stories-tab-section': { populate: { stories: { populate: '*' } } } } } },
    });
    if (!impact?.sections?.length) throw new Error('no Impact draft with sections found');

    const section = impact.sections.find((s) => s.__component === 'impact-page.stories-tab-section');
    if (!section) throw new Error('impact-page.stories-tab-section not found');

    const kept = [];
    const removed = [];

    for (const story of section.stories ?? []) {
      const realUrl = REAL_VIDEOS[story.title];
      if (realUrl) {
        const before = story.youtubeUrl ?? story.video ?? null;
        delete story.video;
        story.youtubeUrl = realUrl;
        console.log(`keep   "${story.title}"\n  before: ${before}\n  after:  ${realUrl}`);
        kept.push(story);
      } else {
        console.log(`remove "${story.title}" (no real video found)`);
        removed.push(story);
      }
    }

    if (kept.length !== Object.keys(REAL_VIDEOS).length) {
      throw new Error(
        `expected ${Object.keys(REAL_VIDEOS).length} stories to match REAL_VIDEOS by title, found ${kept.length} — check for a title mismatch`
      );
    }
    if (removed.length !== 3) {
      throw new Error(`expected exactly 3 stories to be removed, found ${removed.length}`);
    }

    console.log(`\n${kept.length} kept with real video, ${removed.length} would be removed.`);

    if (DRY_RUN) {
      console.log('--dry-run: nothing written.');
      return;
    }

    fs.writeFileSync(BACKUP_PATH, `${JSON.stringify(removed, null, 2)}\n`, 'utf8');
    console.log(`backup written: ${path.relative(CMS_ROOT, BACKUP_PATH)}`);

    section.stories = kept;

    await strapi.documents('api::impact.impact').update({ documentId: impact.documentId, data: { sections: impact.sections } });
    console.log('draft updated.');

    await strapi.documents('api::impact.impact').publish({ documentId: impact.documentId });
    console.log('published — draft and published versions now match.');
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
