/**
 * Footer partner-marquee media inventory.
 *
 * Only the 5 partners that had no real logo asset (United Capital, MERISTEM,
 * AfDB, USAID, Power Africa — previously rendered as plain text in
 * frontend/components/Footer.tsx's PartnerMarquee) are listed here. The other
 * 7 marquee partners already have working logo URLs elsewhere (the about-page
 * Cloudinary bucket or the legacy InfraCredit WP uploads) and are reused
 * as-is in cms/src/seed/footer-copy.ts — no re-upload needed.
 *
 * `index` is this partner's position in the seeded `partnerLogos` array
 * (cms/src/seed/footer-copy.ts), matching the marquee order in Footer.tsx:
 *   0 AIICO, 1 Linkage, 2 LEADWAY, 3 Pension Custodian, 4 United Capital,
 *   5 MERISTEM, 6 InfraCredit, 7 FCDO, 8 AfDB, 9 USAID, 10 Power Africa,
 *   11 Shell Foundation.
 *
 * Sources: each company/agency's own site, except AfDB (Wikimedia Commons
 * standalone mark, public domain) and USAID (Wikimedia Commons, public
 * domain — a US federal government work).
 */

export const PAGE_NAME = 'footer';
export const CLOUDINARY_FOLDER = 'climate facility/footer';

/** @type {{component:string, paths:Array<Array<{field:string,index?:number}>>, source:string, altText:string, localFile:string}[]} */
export const footerMediaRows = [
  {
    component: 'footer.partner-logo',
    paths: [[{ field: 'partnerLogos', index: 4 }, { field: 'logo' }]],
    source: 'https://unitedcapitalplcgroup.com/wp-content/uploads/2021/08/United-Capital-logo-websites.png',
    altText: 'United Capital Plc',
    localFile: 'footer-partner-united-capital-logo.png',
  },
  {
    component: 'footer.partner-logo',
    paths: [[{ field: 'partnerLogos', index: 5 }, { field: 'logo' }]],
    source: 'https://meristemng.com/_next/static/media/meristem%20logos%202.a03e6543.png',
    altText: 'Meristem',
    localFile: 'footer-partner-meristem-logo.png',
  },
  {
    component: 'footer.partner-logo',
    paths: [[{ field: 'partnerLogos', index: 8 }, { field: 'logo' }]],
    source: 'https://upload.wikimedia.org/wikipedia/commons/3/34/AFDB_Logo.png',
    altText: 'African Development Bank',
    localFile: 'footer-partner-afdb-logo.png',
  },
  {
    component: 'footer.partner-logo',
    paths: [[{ field: 'partnerLogos', index: 9 }, { field: 'logo' }]],
    source: 'https://upload.wikimedia.org/wikipedia/commons/1/17/USAID-Identity.svg',
    altText: 'USAID',
    localFile: 'footer-partner-usaid-logo.svg',
  },
  {
    component: 'footer.partner-logo',
    paths: [[{ field: 'partnerLogos', index: 10 }, { field: 'logo' }]],
    source: 'https://images.seeklogo.com/logo-png/39/1/power-africa-logo-png_seeklogo-392758.png',
    altText: 'Power Africa',
    localFile: 'footer-partner-power-africa-logo.png',
  },
];
