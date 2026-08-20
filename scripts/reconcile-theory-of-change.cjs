'use strict';

/**
 * One-off: the live HOME draft's theoryCards (home-page.impact-section) still
 * have the shortened descriptions — the reference site's fuller text was
 * reconciled into the frontend defaults and seed file; this patches the
 * already-seeded entry to match. Same full-depth-populate safety pattern as
 * the earlier patch scripts.
 *
 *   node scripts/reconcile-theory-of-change.cjs [--dry-run]
 */
const path = require('node:path');
const { createStrapi, compileStrapi } = require('@strapi/strapi');

const CMS_ROOT = path.resolve(__dirname, '..');
const DRY_RUN = process.argv.includes('--dry-run');

const REPLACEMENTS = [
  {
    from: 'Unlock affordable financing for private sector enterprises providing off-grid energy solutions such as solar mini grids, solar home systems, solar lanterns, fridges, pumps, driers and clean cooking products.',
    to: 'Unlock affordable financing for private sector enterprises providing renewable energy solutions such as solar mini grids, solar home systems, solar lanterns, fridges, pumps, driers and clean cooking products, small medium enterprise coolhubs for unserved and underserved markets.',
  },
  {
    from: 'Catalyse green investments in local currency from domestic private institutional investors such as insurance companies, local pension funds, and asset managers.',
    to: 'Catalyse green investments in local currency from domestic private institutional investors such as insurance companies, local pension funds, and other asset managers including low carbon energy focused funds from the domestic debt capital markets.',
  },
  {
    from: 'Innovative blended finance approach for donors and concessional financiers, to make smart use of impact-seeking capital to de-risk and mobilise private sector financing.',
    to: "Innovative blended finance approach for donors and concessional financiers, to make smart use of impact-seeking capital to de-risk, reduce the capital cost and mobilise private sector financing towards increasing clean energy access in Nigeria in line with Nigeria's Nationally Determined Contributions.",
  },
  {
    from: 'Promote green growth and climate resilient development by enhancing access to renewable energy for productive uses and boosting agricultural development.',
    to: 'Promote green growth and climate resilient development by enhancing access to renewable energy for productive uses and boosting agricultural development whilst transitioning to a low-carbon economy that will create jobs, reduce poverty, promote gender diversity and stimulate local economic growth.',
  },
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
    const uid = 'api::home.home';
    const documents = strapi.documents(uid);
    const populate = buildSectionsPopulate(strapi, uid);

    const home = await documents.findFirst({ populate, status: 'draft' });
    if (!home?.sections?.length) throw new Error('no HOME draft with sections found');

    const partial = home.sections.filter((section) => !isFullyPopulated(strapi, section));
    if (partial.length > 0) {
      throw new Error(
        `sections read back incomplete: ${partial.map((s) => s.__component).join(', ')} — aborting to avoid overwriting stored content.`
      );
    }

    const changed = applyReplacements(home.sections);
    if (!changed) {
      console.log('already up to date, nothing to patch.');
      return;
    }

    if (DRY_RUN) {
      console.log('--dry-run: would update theoryCards descriptions. Nothing written.');
      return;
    }

    await documents.update({ documentId: home.documentId, data: { sections: home.sections }, populate });
    console.log('draft updated.');

    await documents.publish({ documentId: home.documentId });
    console.log('published — draft and published versions now match.');
  } finally {
    await strapi.destroy();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
