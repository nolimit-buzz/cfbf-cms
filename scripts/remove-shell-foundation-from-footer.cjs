/**
 * Remove the "Shell Foundation" entry from the LIVE `footer` singleType's
 * `partnerLogos` array.
 *
 *   node scripts/remove-shell-foundation-from-footer.cjs --dry-run   # report, write nothing
 *   node scripts/remove-shell-foundation-from-footer.cjs             # apply
 *   node scripts/remove-shell-foundation-from-footer.cjs --restore   # roll back from the backup
 *
 * CommonJS on purpose: @strapi/strapi's ESM build fails to resolve its own
 * `lodash/fp` directory import under Node's ESM loader.
 *
 * `footer` has `draftAndPublish: false`, so there is only one version to
 * update — no separate publish step needed. Same pattern as
 * apply-footer-media-to-cms.cjs, but removing an array item instead of
 * patching media fields in place.
 */
const fs = require('node:fs');
const path = require('node:path');
const { createStrapi, compileStrapi } = require('@strapi/strapi');

const CMS_ROOT = path.resolve(__dirname, '..');
const BACKUP_PATH = path.join(CMS_ROOT, 'seed-manifests', 'footer', 'pre-remove-shell-backup.json');
const TARGET_NAME = 'Shell Foundation';

const DRY_RUN = process.argv.includes('--dry-run');
const RESTORE = process.argv.includes('--restore');

async function main() {
  const appContext = await compileStrapi({ appDir: CMS_ROOT, distDir: path.join(CMS_ROOT, 'dist') });
  const strapi = await createStrapi(appContext).load();

  try {
    const footer = await strapi.documents('api::footer.footer').findFirst({
      populate: { partnerLogos: true },
    });
    if (!footer?.partnerLogos?.length) throw new Error('no footer entry with partnerLogos found');

    if (RESTORE) {
      if (!fs.existsSync(BACKUP_PATH)) throw new Error(`no backup found at ${BACKUP_PATH}`);
      const partnerLogos = JSON.parse(fs.readFileSync(BACKUP_PATH, 'utf8'));
      console.log(`restoring ${partnerLogos.length} partnerLogos entries from backup`);
      if (DRY_RUN) {
        console.log('--dry-run: nothing written.');
        return;
      }
      await strapi.documents('api::footer.footer').update({
        documentId: footer.documentId,
        data: { partnerLogos },
      });
      console.log('footer entry restored.');
      return;
    }

    const index = footer.partnerLogos.findIndex((p) => p.name === TARGET_NAME);
    if (index === -1) {
      console.log(`"${TARGET_NAME}" not found in partnerLogos (${footer.partnerLogos.length} entries) — nothing to do.`);
      return;
    }

    console.log(`found "${TARGET_NAME}" at index ${index} of ${footer.partnerLogos.length}`);
    const filtered = footer.partnerLogos.filter((p) => p.name !== TARGET_NAME);

    if (DRY_RUN) {
      console.log(`--dry-run: would remove it, leaving ${filtered.length} entries. Nothing written.`);
      return;
    }

    fs.mkdirSync(path.dirname(BACKUP_PATH), { recursive: true });
    fs.writeFileSync(BACKUP_PATH, `${JSON.stringify(footer.partnerLogos, null, 2)}\n`, 'utf8');
    console.log(`backup written: ${path.relative(CMS_ROOT, BACKUP_PATH)}`);

    await strapi.documents('api::footer.footer').update({
      documentId: footer.documentId,
      data: { partnerLogos: filtered },
    });
    console.log(`footer entry updated — ${filtered.length} entries remain.`);
  } finally {
    await strapi.destroy();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
