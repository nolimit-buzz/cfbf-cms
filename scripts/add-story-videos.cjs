'use strict';

/**
 * One-off: the live HOME draft's stories-section items have no `youtubeUrl` —
 * that field didn't exist on the component schema until now. This sets the
 * real video for each of the 3 seeded stories, matched by title.
 *
 * Uses a full-depth populate (mirroring buildComponentPopulate/
 * buildSectionsPopulate/isFullyPopulated in src/index.ts, same as
 * patch-qa-fixes.js) before writing the whole `sections` array back, so no
 * other section's nested content gets silently truncated by an
 * under-populated read.
 *
 *   node scripts/add-story-videos.cjs [--dry-run]
 */
const path = require('node:path');
const { createStrapi, compileStrapi } = require('@strapi/strapi');

const CMS_ROOT = path.resolve(__dirname, '..');
const DRY_RUN = process.argv.includes('--dry-run');

const VIDEO_BY_TITLE = {
  'Meet Felicia Adindu-End User, Darway Coast': 'https://youtu.be/kBGxtT3dd0s',
  'ACOB Lighting Solar Powered Rural Electrification Project': 'https://youtu.be/E2Dfe3QuZds',
  'Prado Power Solar Powered Rural Electrification Project': 'https://youtu.be/81ULxF30F4A',
};

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

    const section = home.sections.find((s) => s.__component === 'home-page.stories-section');
    if (!section) throw new Error('stories-section not found');

    console.log(`section has ${section.stories.length} stor(y/ies):`);
    let changed = false;

    for (const story of section.stories) {
      const url = VIDEO_BY_TITLE[story.title];
      if (!url) {
        console.log(`  - "${story.title}": no known video, leaving alone`);
        continue;
      }
      if (story.youtubeUrl === url) {
        console.log(`  - "${story.title}": already set to ${url}`);
        continue;
      }
      story.youtubeUrl = url;
      changed = true;
      console.log(`  - "${story.title}": set youtubeUrl -> ${url}`);
    }

    if (!changed) {
      console.log('\nnothing to update.');
      return;
    }

    if (DRY_RUN) {
      console.log('\n--dry-run: nothing written.');
      return;
    }

    await documents.update({ documentId: home.documentId, data: { sections: home.sections }, populate });
    console.log('\ndraft updated.');

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
