/**
 * Write the Cloudinary URLs and alt text into the LIVE News entry — media fields
 * only, every copy field left exactly as stored.
 *
 *   node scripts/apply-news-media-to-cms.cjs --dry-run    # report, write nothing
 *   node scripts/apply-news-media-to-cms.cjs              # apply, then publish
 *   node scripts/apply-news-media-to-cms.cjs --restore    # roll back from the backup
 *
 * CommonJS on purpose: @strapi/strapi's ESM build fails to resolve its own
 * `lodash/fp` directory import under Node's ESM loader.
 *
 * bootstrap() only seeds a News entry when there isn't one, so the seed file and
 * the database diverge once the entry exists. This closes that gap without
 * touching the seed-once guard.
 *
 * Mirrors scripts/apply-projects-media-to-cms.cjs. The News page has no inline
 * SVG and no repeatable array added after seeding, so it needs neither the
 * MARKUP_PATCHES nor the ENSURE_ITEMS hooks that script carries.
 */
const fs = require('node:fs');
const path = require('node:path');
const { createStrapi, compileStrapi } = require('@strapi/strapi');

const CMS_ROOT = path.resolve(__dirname, '..');
const PAGE_NAME = 'news-page';
const MANIFEST_PATH = path.join(CMS_ROOT, 'seed-manifests', PAGE_NAME, 'manifest.json');
const BACKUP_PATH = path.join(CMS_ROOT, 'seed-manifests', PAGE_NAME, 'pre-update-backup.json');

const DRY_RUN = process.argv.includes('--dry-run');
const RESTORE = process.argv.includes('--restore');

/** Media fields that intentionally have no `_alt_text` sibling. */
const NO_ALT_TEXT = new Set();

/**
 * Dynamic zones need populate declared per component. Sections are written back
 * wholesale, so anything nested two levels deep (articles[].paragraphs,
 * articles[].themes) must be populated explicitly or the update would drop it.
 */
const SECTION_POPULATE = {
  'news-page.structured-data-section': { populate: '*' },
  'news-page.hero-section': { populate: '*' },
  'news-page.listing-section': {
    populate: { viewTabs: { populate: '*' }, categories: { populate: '*' } },
  },
  'news-page.articles-section': {
    populate: {
      articles: { populate: { themes: { populate: '*' }, paragraphs: { populate: '*' } } },
    },
  },
  'news-page.article-detail-section': { populate: '*' },
  'news-page.next-steps-section': { populate: { links: { populate: '*' } } },
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
    patches.push({
      component: row.component,
      paths: row.paths,
      field: leaf,
      value: row.cloudinaryUrl,
    });
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
  return patches;
}

async function main() {
  const appContext = await compileStrapi({ appDir: CMS_ROOT, distDir: path.join(CMS_ROOT, 'dist') });
  const strapi = await createStrapi(appContext).load();

  try {
    const news = await strapi.documents('api::news.news').findFirst({
      status: 'draft',
      populate: { sections: { on: SECTION_POPULATE } },
    });
    if (!news?.sections?.length) throw new Error('no News draft with sections found');

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
      const section = news.sections.find((item) => item.__component === patch.component);
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
      // Write the backup once only. A second run reads back the values the first
      // run just wrote, so overwriting would destroy the pre-change snapshot and
      // silently make --restore a no-op.
      if (fs.existsSync(BACKUP_PATH)) {
        console.log(
          `backup kept: ${path.relative(CMS_ROOT, BACKUP_PATH)} already exists (pre-change snapshot preserved)`
        );
      } else {
        fs.writeFileSync(BACKUP_PATH, `${JSON.stringify(backup, null, 2)}\n`, 'utf8');
        console.log(`backup written: ${path.relative(CMS_ROOT, BACKUP_PATH)}`);
      }
    }

    await strapi.documents('api::news.news').update({
      documentId: news.documentId,
      data: { sections: news.sections },
    });
    console.log('draft updated.');

    await strapi.documents('api::news.news').publish({ documentId: news.documentId });
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
