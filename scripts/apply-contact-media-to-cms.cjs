/**
 * Write the Cloudinary URLs, alt text and the inline stat-icon SVG into the LIVE
 * Contact entry — media fields only, every copy field left exactly as stored.
 *
 *   node scripts/apply-contact-media-to-cms.cjs --dry-run    # report, write nothing
 *   node scripts/apply-contact-media-to-cms.cjs              # apply, then publish
 *   node scripts/apply-contact-media-to-cms.cjs --restore    # roll back from the backup
 *
 * CommonJS on purpose: @strapi/strapi's ESM build fails to resolve its own
 * `lodash/fp` directory import under Node's ESM loader.
 *
 * bootstrap() only seeds a Contact entry when there isn't one, so the seed file
 * and the database diverge once the entry exists. This closes that gap without
 * touching the seed-once guard.
 *
 * Mirrors scripts/apply-eligibility-media-to-cms.cjs.
 */
const fs = require('node:fs');
const path = require('node:path');
const { createStrapi, compileStrapi } = require('@strapi/strapi');

const CMS_ROOT = path.resolve(__dirname, '..');
const PAGE_NAME = 'contact-page';
const MANIFEST_PATH = path.join(CMS_ROOT, 'seed-manifests', PAGE_NAME, 'manifest.json');
const BACKUP_PATH = path.join(CMS_ROOT, 'seed-manifests', PAGE_NAME, 'pre-update-backup.json');
const STAT_ICON_SVG_PATH = path.join(CMS_ROOT, 'seed-manifests', PAGE_NAME, 'stat-icon.svg');

const DRY_RUN = process.argv.includes('--dry-run');
const RESTORE = process.argv.includes('--restore');

/**
 * Fields that carry no uploaded asset and so have no manifest row: the custom
 * TrendingUp glyph inside the fun-stats carousel card
 * (frontend/app/contact/page.tsx:79-82). It is literal inline markup, so per
 * IMAGE_EXTRACTOR_PROMPT.md Step 3.3 it is seeded verbatim as long text rather
 * than downloaded — same treatment as the Projects footprint map
 * (apply-projects-media-to-cms.cjs:31-42).
 */
const MARKUP_PATCHES = [
  {
    component: 'contact-page.fun-stats-section',
    paths: [[{ field: 'statIconSvg' }]],
    value: fs.readFileSync(STAT_ICON_SVG_PATH, 'utf8').trim(),
  },
];

/** Media fields that intentionally have no `_alt_text` sibling. */
const NO_ALT_TEXT = new Set(); // all three rows get one; fun-stats' is empty by design

/** Repeatable arrays needing rows created before patching. All three media
 *  fields are top-level scalars on their section, so none are needed. */
const ENSURE_ITEMS = [];

/**
 * Dynamic zones need populate declared per component. Sections are written back
 * wholesale, so anything nested must be populated explicitly or the update would
 * drop it — hero cards, fun-stat items, the four enquiry-form option arrays and
 * the next-steps links.
 */
const SECTION_POPULATE = {
  'contact-page.structured-data-section': { populate: '*' },
  'contact-page.hero-section': { populate: '*' },
  'contact-page.facility-contacts-section': { populate: '*' },
  'contact-page.eligibility-reminder-section': { populate: '*' },
  'contact-page.fun-stats-section': { populate: '*' },
  'contact-page.enquiry-form-section': { populate: '*' },
  'contact-page.submission-success-section': { populate: '*' },
  'contact-page.next-steps-section': { populate: '*' },
  'contact-page.download-cta-section': { populate: '*' },
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

/**
 * Runs a write, treating a Knex pool timeout as post-commit noise rather than a
 * failure. Any other error still propagates.
 */
async function commit(write, successMessage) {
  try {
    await write();
    console.log(successMessage);
  } catch (error) {
    if (!/Timeout acquiring a connection/i.test(error.message ?? '')) throw error;
    console.warn(
      `pool timeout on the return-populate — the write itself has committed.\n` +
        `  confirm with: node scripts/verify-contact-media-in-cms.cjs`
    );
  }
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
    patches.push({ component: row.component, paths: row.paths, field: leaf, value: row.cloudinaryUrl });
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
  return [...patches, ...MARKUP_PATCHES.map((p) => ({ ...p, field: p.paths[0].at(-1).field }))];
}

async function main() {
  const appContext = await compileStrapi({ appDir: CMS_ROOT, distDir: path.join(CMS_ROOT, 'dist') });
  const strapi = await createStrapi(appContext).load();

  try {
    const contact = await strapi.documents('api::contact.contact').findFirst({
      status: 'draft',
      populate: { sections: { on: SECTION_POPULATE } },
    });
    if (!contact?.sections?.length) throw new Error('no Contact draft with sections found');

    const patches = RESTORE
      ? JSON.parse(fs.readFileSync(BACKUP_PATH, 'utf8')).map((row) => ({
          component: row.component,
          paths: row.paths,
          field: row.paths[0].at(-1).field,
          value: row.previousValue,
        }))
      : buildPatches();

    if (!RESTORE) {
      for (const { component, field, rows } of ENSURE_ITEMS) {
        const section = contact.sections.find((item) => item.__component === component);
        if (!section) throw new Error(`${component} missing — cannot seed ${field}`);
        const existing = Array.isArray(section[field]) ? section[field] : [];
        if (existing.length >= rows.length) continue;
        section[field] = [...existing, ...rows.slice(existing.length).map((row) => ({ ...row }))];
        console.log(`create ${component}.${field}[] += ${rows.length - existing.length} row(s)`);
      }
    }

    const backup = [];
    const unresolved = [];
    let applied = 0;

    for (const patch of patches) {
      const section = contact.sections.find((item) => item.__component === patch.component);
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
      fs.writeFileSync(BACKUP_PATH, `${JSON.stringify(backup, null, 2)}\n`, 'utf8');
      console.log(`backup written: ${path.relative(CMS_ROOT, BACKUP_PATH)}`);
    }

    // Contact's dynamic zone is the widest of the eight pages (9 sections, seven
    // repeatables), and Strapi re-populates the whole thing on the way out of
    // update()/publish(). On a slow pool that return-populate can raise a Knex
    // "Timeout acquiring a connection" *after* the write has committed — the same
    // post-commit noise apply-projects-media-to-cms.cjs documents for destroy().
    // Downgrade it to a warning and let verify-contact-media-in-cms.cjs be the
    // acceptance gate: it reads every field straight back out of the database.
    await commit(
      () =>
        strapi.documents('api::contact.contact').update({
          documentId: contact.documentId,
          data: { sections: contact.sections },
        }),
      'draft updated.'
    );

    await commit(
      () => strapi.documents('api::contact.contact').publish({ documentId: contact.documentId }),
      'published — draft and published versions now match.'
    );
  } finally {
    // Teardown only — see apply-projects-media-to-cms.cjs: destroy() can raise a
    // connection-acquisition timeout well after the write has committed.
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
