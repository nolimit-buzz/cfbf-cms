'use strict';

/**
 * One-off: the live About draft still has the old "seed funding" wording in
 * the hero paragraph and a milestone label/alt-text — the client wants
 * total-funding framing instead (see PR discussion). Same full-depth-populate
 * safety pattern as add-story-videos.cjs / patch-qa-fixes.js.
 *
 *   node scripts/reword-seed-funding.cjs [--dry-run]
 */
const path = require('node:path');
const { createStrapi, compileStrapi } = require('@strapi/strapi');

const CMS_ROOT = path.resolve(__dirname, '..');
const DRY_RUN = process.argv.includes('--dry-run');

const REPLACEMENTS = [
  {
    from: 'The Climate Finance Blending Facility (CFBF) is capitalised with seed funding by the UK Foreign, Commonwealth & Development Office (FCDO) and co-invested alongside British International Investment (BII).',
    to: 'The Climate Finance Blending Facility (CFBF) is capitalised with USD 21.3M total concessional funding by the UK Foreign, Commonwealth & Development Office (FCDO) and co-invested alongside British International Investment (BII).',
  },
  { from: 'Fund seeded & framework certified', to: 'Facility capitalised & framework certified' },
];

function buildComponentPopulate(strapi, componentUid, depth = 0) {
  const schema = strapi.components?.[componentUid];
  if (!schema || depth > 6) return null;

  const populate = {};
  for (const [name, attribute] of Object.entries(schema.attributes ?? {})) {
    if (attribute?.type === 'component' && attribute.component) {
      const child = buildComponentPopulate(strapi, attribute.component, depth + 1);
      populate[name] = child ? { populate: child } : {};
    }
  }
  return Object.keys(populate).length > 0 ? populate : null;
}

function buildSectionsPopulate(strapi, uid) {
  const zone = strapi.contentType(uid)?.attributes?.sections;
  const components = zone?.components ?? [];
  if (zone?.type !== 'dynamiczone' || components.length === 0) return ['sections'];

  const on = {};
  for (const componentUid of components) {
    const child = buildComponentPopulate(strapi, componentUid);
    on[componentUid] = child ? { populate: child } : {};
  }
  return { sections: { on } };
}

function isFullyPopulated(strapi, entry) {
  const schema = strapi.components?.[entry.__component];
  if (!schema) return false;

  for (const [name, attribute] of Object.entries(schema.attributes ?? {})) {
    if (attribute?.type !== 'component') continue;

    const value = entry[name];
    if (value === undefined) return false;

    const children = Array.isArray(value) ? value : [value];
    for (const child of children) {
      if (child && !isFullyPopulated(strapi, { ...child, __component: attribute.component })) {
        return false;
      }
    }
  }
  return true;
}

function applyReplacements(node) {
  if (Array.isArray(node)) {
    let changed = false;
    node.forEach((item, i) => {
      if (typeof item === 'string') {
        const patched = patchString(item);
        if (patched !== item) {
          node[i] = patched;
          changed = true;
        }
      } else if (item && typeof item === 'object') {
        if (applyReplacements(item)) changed = true;
      }
    });
    return changed;
  }

  if (node && typeof node === 'object') {
    let changed = false;
    for (const key of Object.keys(node)) {
      const value = node[key];
      if (typeof value === 'string') {
        const patched = patchString(value);
        if (patched !== value) {
          node[key] = patched;
          changed = true;
        }
      } else if (value && typeof value === 'object') {
        if (applyReplacements(value)) changed = true;
      }
    }
    return changed;
  }

  return false;
}

function patchString(value) {
  let result = value;
  for (const { from, to } of REPLACEMENTS) {
    if (result.includes(from)) result = result.split(from).join(to);
  }
  return result;
}

async function main() {
  const appContext = await compileStrapi({ appDir: CMS_ROOT, distDir: path.join(CMS_ROOT, 'dist') });
  const strapi = await createStrapi(appContext).load();

  try {
    const uid = 'api::about.about';
    const documents = strapi.documents(uid);
    const populate = buildSectionsPopulate(strapi, uid);

    const about = await documents.findFirst({ populate, status: 'draft' });
    if (!about?.sections?.length) throw new Error('no About draft with sections found');

    const partial = about.sections.filter((section) => !isFullyPopulated(strapi, section));
    if (partial.length > 0) {
      throw new Error(
        `sections read back incomplete: ${partial.map((s) => s.__component).join(', ')} — aborting to avoid overwriting stored content.`
      );
    }

    const changed = applyReplacements(about.sections);
    if (!changed) {
      console.log('already up to date, nothing to patch.');
      return;
    }

    if (DRY_RUN) {
      console.log('--dry-run: would update hero/milestones wording. Nothing written.');
      return;
    }

    await documents.update({ documentId: about.documentId, data: { sections: about.sections }, populate });
    console.log('draft updated.');

    await documents.publish({ documentId: about.documentId });
    console.log('published — draft and published versions now match.');
  } finally {
    await strapi.destroy();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
