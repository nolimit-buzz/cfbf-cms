'use strict';

/**
 * One-off idempotent patch for QA copy fixes that were also baked into
 * `src/seed/*.ts` before those files were corrected. Seeding only creates
 * missing entries/sections — it never rewrites text inside an entry that
 * already exists — so any environment seeded before the seed-file fix keeps
 * serving the old strings until this is run.
 *
 * Safe to re-run: each fix is a targeted string replacement, applied only
 * where the old string is found, so running this after the values are
 * already correct is a no-op.
 *
 * Usage: `npm run patch:qa-fixes` (from `cms/`).
 */

// Old string -> new string. Extend this list for future find-in-CMS fixes;
// each is applied everywhere it's found across the entries this script reads.
const REPLACEMENTS = [
  { from: 'ACOB Lightning', to: 'ACOB Lighting' },
  {
    from: 'renewable energy projects located in 35 states',
    to: 'renewable energy projects located in 36 states',
  },
];

/** Mirrors `buildComponentPopulate` in `src/index.ts` — full-depth populate for one component. */
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

/** Mirrors `buildSectionsPopulate` in `src/index.ts` — full-depth populate for a page's dynamic zone. */
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

/** Mirrors `isFullyPopulated` in `src/index.ts` — refuses to write back a partially-read section. */
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

/** Deep-walks an object/array tree, applying every REPLACEMENTS entry to string values in place. Returns whether anything changed. */
function applyReplacements(node) {
  if (typeof node === 'string') return node;

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

async function patchSingleType(strapi, uid, label) {
  const documents = strapi.documents(uid);
  const populate = buildSectionsPopulate(strapi, uid);

  const draft = await documents.findFirst({ populate, status: 'draft' });
  if (!draft?.sections?.length) {
    strapi.log.info(`[patch-qa-fixes] ${label}: no entry/sections found, skipping.`);
    return;
  }

  const partial = draft.sections.filter((section) => !isFullyPopulated(strapi, section));
  if (partial.length > 0) {
    strapi.log.warn(
      `[patch-qa-fixes] ${label}: ${partial
        .map((s) => s.__component)
        .join(', ')} read back incomplete — skipping to avoid overwriting stored content.`
    );
    return;
  }

  const changed = applyReplacements(draft.sections);
  if (!changed) {
    strapi.log.info(`[patch-qa-fixes] ${label}: already up to date, nothing to patch.`);
    return;
  }

  await documents.update({ documentId: draft.documentId, data: { sections: draft.sections }, populate });
  await documents.publish({ documentId: draft.documentId });
  strapi.log.info(`[patch-qa-fixes] ${label}: patched and republished.`);
}

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();
  app.log.level = 'info';

  await patchSingleType(app, 'api::projects.projects', 'PROJECTS page');

  await app.destroy();
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
