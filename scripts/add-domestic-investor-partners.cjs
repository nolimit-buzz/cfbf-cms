/**
 * One-off: the live About draft's partners-section groups[2] (Domestic
 * Institutional Investors) only has InfraCredit — the other 7 partners
 * (AIICO, NEM, Linkage, Leadway, Tangerine, CELCF, FPC) exist only as
 * frontend fallback defaults (frontend/lib/cms/about-defaults.ts:392-399),
 * never written into Strapi. This appends them (logo: '') so
 * apply-about-media-to-cms.cjs has array slots to patch logo URLs into.
 *
 *   node scripts/add-domestic-investor-partners.cjs [--dry-run]
 */
const path = require('node:path');
const { createStrapi, compileStrapi } = require('@strapi/strapi');

const CMS_ROOT = path.resolve(__dirname, '..');
const DRY_RUN = process.argv.includes('--dry-run');

const NEW_PARTNERS = [
  { name: 'AIICO Insurance PLC', role: 'Domestic PFA Co-financier', logoText: 'AIICO', logo: '', logo_alt_text: '', logoColour: null, logoColour_alt_text: null },
  { name: 'NEM Insurance PLC', role: 'Domestic PFA Co-financier', logoText: 'NEM', logo: '', logo_alt_text: '', logoColour: null, logoColour_alt_text: null },
  { name: 'Linkage Insurance PLC', role: 'Domestic PFA Co-financier', logoText: 'LINKAGE', logo: '', logo_alt_text: '', logoColour: null, logoColour_alt_text: null },
  { name: 'Leadway Insurance', role: 'Domestic PFA Co-financier', logoText: 'LEADWAY', logo: '', logo_alt_text: '', logoColour: null, logoColour_alt_text: null },
  { name: 'Tangerine Life', role: 'Domestic PFA Co-financier', logoText: 'TANGERINE', logo: '', logo_alt_text: '', logoColour: null, logoColour_alt_text: null },
  { name: 'Clean Energy Local Currency Fund', role: 'Domestic PFA Co-financier', logoText: 'CELCF', logo: '', logo_alt_text: '', logoColour: null, logoColour_alt_text: null },
  { name: 'First Pension Custodian', role: 'Pension Asset Custodian', logoText: 'FPC', logo: '', logo_alt_text: '', logoColour: null, logoColour_alt_text: null },
];

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

    const group = section.groups?.find((g) => g.category === 'Domestic Institutional Investors');
    if (!group) throw new Error('Domestic Institutional Investors group not found');

    console.log(`group "${group.category}" currently has ${group.partners.length} partner(s):`);
    for (const p of group.partners) console.log(`  - ${p.name}`);

    if (group.partners.length > 1) {
      throw new Error(`expected exactly 1 existing partner (InfraCredit), found ${group.partners.length} — aborting to avoid duplicates`);
    }

    group.partners.push(...NEW_PARTNERS);
    console.log(`\nappending ${NEW_PARTNERS.length} partner(s) -> group will have ${group.partners.length} total`);

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
