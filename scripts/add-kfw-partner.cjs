/**
 * One-off: the live About draft's partners-section groups[1] (Technical
 * Assistance Providers) only has FSD Africa and Shell Foundation — KfW is
 * missing. This appends it with the already-uploaded Cloudinary logo URL
 * (see scripts/upload-kfw-logo.mjs). Modeled directly on
 * add-domestic-investor-partners.cjs.
 *
 *   node scripts/add-kfw-partner.cjs [--dry-run]
 */
const path = require('node:path');
const { createStrapi, compileStrapi } = require('@strapi/strapi');

const CMS_ROOT = path.resolve(__dirname, '..');
const DRY_RUN = process.argv.includes('--dry-run');

const KFW_PARTNER = {
  name: 'KfW',
  role: 'Technical Assistance Partner',
  logoText: '',
  logo: 'https://res.cloudinary.com/diqfojkri/image/upload/v1787232940/climate%20facility/about-page/partners-group-2-partner-3-logo.png',
  logo_alt_text: 'KfW',
  logoColour: null,
  logoColour_alt_text: null,
};

async function main() {
  const appContext = await compileStrapi({ appDir: CMS_ROOT, distDir: path.join(CMS_ROOT, 'dist') });
  const strapi = await createStrapi(appContext).load();

  try {
    const about = await strapi.documents('api::about.about').findFirst({
      status: 'draft',
      populate: { sections: { on: { 'about-page.partners-section': { populate: { groups: { populate: '*' } } } } } },
    });
    if (!about?.sections?.length) throw new Error('no About draft with sections found');

    const section = about.sections.find((s) => s.__component === 'about-page.partners-section');
    if (!section) throw new Error('partners-section not found');

    const group = section.groups?.find((g) => g.category === 'Technical Assistance Providers');
    if (!group) throw new Error('Technical Assistance Providers group not found');

    console.log(`group "${group.category}" currently has ${group.partners.length} partner(s):`);
    for (const p of group.partners) console.log(`  - ${p.name}`);

    if (group.partners.some((p) => p.name === 'KfW')) {
      console.log('\nKfW already present — nothing to do.');
      return;
    }

    if (group.partners.length !== 2) {
      throw new Error(`expected exactly 2 existing partners (FSD Africa, Shell Foundation), found ${group.partners.length} — aborting to avoid duplicates`);
    }

    group.partners.push(KFW_PARTNER);
    console.log(`\nappending KfW -> group will have ${group.partners.length} total`);

    if (DRY_RUN) {
      console.log('--dry-run: nothing written.');
      return;
    }

    await strapi.documents('api::about.about').update({
      documentId: about.documentId,
      data: { sections: about.sections },
    });
    console.log('draft updated.');

    await strapi.documents('api::about.about').publish({ documentId: about.documentId });
    console.log('published — draft and published versions now match.');
  } finally {
    await strapi.destroy();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
