/**
 * Fix the Nigeria map legend colors on the LIVE Projects entry — only the
 * `color` field of each footprint-map-section.legend row, nothing else.
 *
 *   node scripts/apply-legend-colors-to-cms.cjs --dry-run    # report, write nothing
 *   node scripts/apply-legend-colors-to-cms.cjs              # apply, then publish
 *   node scripts/apply-legend-colors-to-cms.cjs --restore    # roll back from the backup
 *
 * CommonJS on purpose: @strapi/strapi's ESM build fails to resolve its own
 * `lodash/fp` directory import under Node's ESM loader.
 *
 * bootstrap() only seeds a Projects entry when there isn't one, so the seed
 * file (src/seed/projects-page-copy.ts) and the live database diverged after
 * someone edited the legend colors directly in the CMS. This restores the
 * seed file's values on the live entry without touching the seed-once guard.
 *
 * Mirrors scripts/apply-projects-media-to-cms.cjs.
 */
const fs = require('node:fs');
const path = require('node:path');
const { createStrapi, compileStrapi } = require('@strapi/strapi');

const CMS_ROOT = path.resolve(__dirname, '..');
const PAGE_NAME = 'projects-page';
const BACKUP_PATH = path.join(CMS_ROOT, 'seed-manifests', PAGE_NAME, 'legend-colors-backup.json');

const DRY_RUN = process.argv.includes('--dry-run');
const RESTORE = process.argv.includes('--restore');

/** Target colors, matching cms/src/seed/projects-page-copy.ts:779-785. */
const TARGET_COLORS = {
  'rural-electrification': '#48C0A3',
  'rural-telephony': '#648CDC',
  both: '#FDB713',
  'mini-grids': '#B4A082',
  default: '#2d6a4f',
  pue: '#69b44b',
  'rural-elec-pue': '#f4845f',
};

const SECTION_POPULATE = {
  'projects-page.footprint-map-section': {
    populate: {
      legend: { populate: '*' },
      states: { populate: '*' },
      lgaProjects: { populate: '*' },
    },
  },
};

async function main() {
  const appContext = await compileStrapi({ appDir: CMS_ROOT, distDir: path.join(CMS_ROOT, 'dist') });
  const strapi = await createStrapi(appContext).load();

  try {
    const projects = await strapi.documents('api::projects.projects').findFirst({
      status: 'draft',
      populate: { sections: { on: SECTION_POPULATE } },
    });
    if (!projects?.sections?.length) throw new Error('no Projects draft with sections found');

    const section = projects.sections.find(
      (item) => item.__component === 'projects-page.footprint-map-section'
    );
    if (!section) throw new Error('projects-page.footprint-map-section missing');
    if (!Array.isArray(section.legend) || section.legend.length === 0) {
      throw new Error('footprint-map-section.legend is empty — cannot patch');
    }

    const colorMap = RESTORE
      ? Object.fromEntries(JSON.parse(fs.readFileSync(BACKUP_PATH, 'utf8')).map((r) => [r.type, r.previousColor]))
      : TARGET_COLORS;

    const backup = [];
    const unresolved = [];
    let applied = 0;

    for (const row of section.legend) {
      const target = colorMap[row.type];
      if (target === undefined) {
        unresolved.push(row.type ?? '(no type)');
        continue;
      }
      backup.push({ type: row.type, previousColor: row.color ?? null });
      const before = row.color;
      row.color = target;
      applied += 1;
      const changed = before !== target;
      console.log(`${changed ? 'patch ' : 'same  '} legend[${row.type}].color = ${target}`);
    }

    if (unresolved.length) {
      throw new Error(`${unresolved.length} legend row(s) with unrecognized type:\n  ${unresolved.join('\n  ')}`);
    }
    if (applied === 0) throw new Error('no legend rows resolved — refusing to write');

    console.log(`\n${applied} legend row(s) resolved.`);

    if (DRY_RUN) {
      console.log('--dry-run: nothing written.');
      return;
    }

    if (!RESTORE) {
      fs.writeFileSync(BACKUP_PATH, `${JSON.stringify(backup, null, 2)}\n`, 'utf8');
      console.log(`backup written: ${path.relative(CMS_ROOT, BACKUP_PATH)}`);
    }

    await strapi.documents('api::projects.projects').update({
      documentId: projects.documentId,
      data: { sections: projects.sections },
    });
    console.log('draft updated.');

    await strapi.documents('api::projects.projects').publish({ documentId: projects.documentId });
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
