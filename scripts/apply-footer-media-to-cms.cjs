/**
 * Write the 5 newly-uploaded Cloudinary logo URLs into the LIVE `footer`
 * singleType entry's `partnerLogos` array — media fields only.
 *
 *   node scripts/apply-footer-media-to-cms.cjs --dry-run    # report, write nothing
 *   node scripts/apply-footer-media-to-cms.cjs              # apply
 *   node scripts/apply-footer-media-to-cms.cjs --restore    # roll back from the backup
 *
 * CommonJS on purpose: @strapi/strapi's ESM build fails to resolve its own
 * `lodash/fp` directory import under Node's ESM loader.
 *
 * `footer` has `draftAndPublish: false` (like `global`), so there is only one
 * version to update — no separate publish step needed.
 *
 * Unlike apply-about-media-to-cms.cjs, `footer` has no dynamic zone / nested
 * component path to walk: `partnerLogos` is a flat repeatable component
 * directly on the entry, so each manifest row's `paths[0]` is just
 * `[{ field: 'partnerLogos', index }, { field: 'logo' }]`.
 */
const fs = require('node:fs');
const path = require('node:path');
const { createStrapi, compileStrapi } = require('@strapi/strapi');

const CMS_ROOT = path.resolve(__dirname, '..');
const PAGE_NAME = 'footer';
const MANIFEST_PATH = path.join(CMS_ROOT, 'seed-manifests', PAGE_NAME, 'manifest.json');
const BACKUP_PATH = path.join(CMS_ROOT, 'seed-manifests', PAGE_NAME, 'pre-update-backup.json');

const DRY_RUN = process.argv.includes('--dry-run');
const RESTORE = process.argv.includes('--restore');

/** Walks `paths` into `partnerLogos`, returning the owning object and leaf key. */
function resolve(partnerLogos, segments) {
  const [groupSeg, leafSeg] = segments;
  const item = partnerLogos?.[groupSeg.index];
  return item ? { owner: item, key: leafSeg.field } : null;
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
    patches.push({ paths: row.paths, field: leaf, value: row.cloudinaryUrl });
    const altSegments = [segments[0], { field: `${leaf}_alt_text` }];
    patches.push({ paths: [altSegments], field: `${leaf}_alt_text`, value: row.altText });
  }
  return patches;
}

async function main() {
  const appContext = await compileStrapi({ appDir: CMS_ROOT, distDir: path.join(CMS_ROOT, 'dist') });
  const strapi = await createStrapi(appContext).load();

  try {
    const footer = await strapi.documents('api::footer.footer').findFirst({
      populate: { partnerLogos: true },
    });
    if (!footer?.partnerLogos?.length) throw new Error('no footer entry with partnerLogos found');

    const patches = RESTORE
      ? JSON.parse(fs.readFileSync(BACKUP_PATH, 'utf8')).map((row) => ({
          paths: row.paths,
          field: row.paths[0].at(-1).field,
          value: row.previousValue,
        }))
      : buildPatches();

    const backup = [];
    const unresolved = [];
    let applied = 0;

    for (const patch of patches) {
      const target = resolve(footer.partnerLogos, patch.paths[0]);
      if (!target) {
        unresolved.push(JSON.stringify(patch.paths[0]));
        continue;
      }
      backup.push({ paths: patch.paths, previousValue: target.owner[target.key] ?? null });
      const before = target.owner[target.key];
      target.owner[target.key] = patch.value;
      applied += 1;
      const changed = before !== patch.value;
      console.log(
        `${changed ? 'patch ' : 'same  '} partnerLogos[${patch.paths[0][0].index}].${patch.field} = ` +
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

    await strapi.documents('api::footer.footer').update({
      documentId: footer.documentId,
      data: { partnerLogos: footer.partnerLogos },
    });
    console.log('footer entry updated.');
  } finally {
    await strapi.destroy();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
