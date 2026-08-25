/**
 * Write `structureVideoUrl` into the 6 LIVE `project` collection records —
 * one field only, every other field left exactly as stored.
 *
 *   node scripts/apply-project-structure-video.cjs --dry-run    # report, write nothing (default)
 *   node scripts/apply-project-structure-video.cjs --apply      # write, then publish each
 *   node scripts/apply-project-structure-video.cjs --restore    # roll back from the backup
 *
 * CommonJS on purpose: @strapi/strapi's ESM build fails to resolve its own
 * `lodash/fp` directory import under Node's ESM loader.
 *
 * bootstrap()'s seedProjectRecords only creates a record when its projectId
 * doesn't exist yet — it never overwrites an existing one's fields, so this
 * script exists to make the actual live-content change that guard can't.
 */
const fs = require('node:fs');
const path = require('node:path');
const { createStrapi, compileStrapi } = require('@strapi/strapi');

const CMS_ROOT = path.resolve(__dirname, '..');
const BACKUP_PATH = path.join(CMS_ROOT, 'seed-manifests', 'projects-collection', 'pre-structure-video-backup.json');

const DRY_RUN = !process.argv.includes('--apply') && !process.argv.includes('--restore');
const RESTORE = process.argv.includes('--restore');

const STRUCTURE_VIDEO_URL =
  'https://res.cloudinary.com/diqfojkri/video/upload/v1787668726/climate%20facility/projects/structure-diagram.mp4';

async function main() {
  const appContext = await compileStrapi({ appDir: CMS_ROOT, distDir: path.join(CMS_ROOT, 'dist') });
  const strapi = await createStrapi(appContext).load();

  try {
    const documents = strapi.documents('api::project.project');
    const records = await documents.findMany({ status: 'draft' });

    if (!records?.length) throw new Error('no project draft records found');

    console.log(`Found ${records.length} project record(s).`);

    const backup = [];
    for (const record of records) {
      backup.push({ projectId: record.projectId, documentId: record.documentId, previousValue: record.structureVideoUrl ?? null });
      console.log(`  ${record.projectId}: ${record.structureVideoUrl ?? '(empty)'} -> ${RESTORE ? '(restoring)' : STRUCTURE_VIDEO_URL}`);
    }

    if (DRY_RUN) {
      console.log('\n--dry-run: nothing written. Pass --apply to write for real.');
      return;
    }

    let valuesByProjectId;
    if (RESTORE) {
      if (!fs.existsSync(BACKUP_PATH)) throw new Error(`no backup found at ${BACKUP_PATH}`);
      const backedUp = JSON.parse(fs.readFileSync(BACKUP_PATH, 'utf8'));
      valuesByProjectId = Object.fromEntries(backedUp.map((row) => [row.projectId, row.previousValue]));
    } else {
      if (fs.existsSync(BACKUP_PATH)) {
        console.log(`\nbackup kept: ${path.relative(CMS_ROOT, BACKUP_PATH)} already exists (pre-change snapshot preserved)`);
      } else {
        fs.mkdirSync(path.dirname(BACKUP_PATH), { recursive: true });
        fs.writeFileSync(BACKUP_PATH, `${JSON.stringify(backup, null, 2)}\n`, 'utf8');
        console.log(`\nbackup written: ${path.relative(CMS_ROOT, BACKUP_PATH)}`);
      }
      valuesByProjectId = Object.fromEntries(records.map((r) => [r.projectId, STRUCTURE_VIDEO_URL]));
    }

    for (const record of records) {
      await documents.update({
        documentId: record.documentId,
        data: { structureVideoUrl: valuesByProjectId[record.projectId] },
      });
      await documents.publish({ documentId: record.documentId });
      console.log(`  ${record.projectId}: updated and published.`);
    }

    console.log('\ndone.');
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
