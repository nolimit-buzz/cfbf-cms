/**
 * Seed data for the `footer` single type — the "Domestic Institutional
 * Investors & Partners" marquee in frontend/components/Footer.tsx.
 *
 * Order matches the marquee's current display order. 7 of these 12 reuse
 * logo URLs already live elsewhere (the about-page Cloudinary bucket or the
 * legacy InfraCredit WP uploads); the other 5 (United Capital, MERISTEM,
 * AfDB, USAID, Power Africa) were uploaded via
 * scripts/footer-media-sources.mjs -> scripts/upload-page-media.mjs
 * (see seed-manifests/footer/manifest.json).
 */

const ABOUT_PAGE_CLOUDINARY = 'https://res.cloudinary.com/diqfojkri/image/upload';
const WP = 'https://infracredit.ng/climate-facility/wp-content/uploads';

export const footerPartnerLogos = [
  {
    name: 'AIICO Insurance',
    logo: `${ABOUT_PAGE_CLOUDINARY}/v1786962991/climate%20facility/about-page/partners-group-3-partner-2-logo.png`,
    logo_alt_text: 'AIICO Insurance',
  },
  {
    name: 'Linkage Assurance',
    logo: `${ABOUT_PAGE_CLOUDINARY}/v1786962993/climate%20facility/about-page/partners-group-3-partner-4-logo.png`,
    logo_alt_text: 'Linkage Assurance',
  },
  {
    name: 'LEADWAY',
    logo: `${ABOUT_PAGE_CLOUDINARY}/v1786962994/climate%20facility/about-page/partners-group-3-partner-5-logo.webp`,
    logo_alt_text: 'Leadway Insurance',
  },
  {
    name: 'Pension Custodian',
    logo: `${ABOUT_PAGE_CLOUDINARY}/v1786962999/climate%20facility/about-page/partners-group-3-partner-8-logo.png`,
    logo_alt_text: 'First Pension Custodian',
  },
  {
    name: 'United Capital',
    logo: 'https://res.cloudinary.com/diqfojkri/image/upload/v1786983650/climate%20facility/footer/footer-partner-united-capital-logo.png',
    logo_alt_text: 'United Capital Plc',
  },
  {
    name: 'MERISTEM',
    logo: 'https://res.cloudinary.com/diqfojkri/image/upload/v1786983651/climate%20facility/footer/footer-partner-meristem-logo.png',
    logo_alt_text: 'Meristem',
  },
  {
    name: 'InfraCredit',
    logo: `${WP}/2022/09/ICAsset-6@4x-8-002-1024x326-1.png`,
    logo_alt_text: 'InfraCredit',
  },
  {
    name: 'FCDO',
    logo: `${WP}/2022/10/UK-DEVELOPMENT-WHITE.png`,
    logo_alt_text: 'FCDO',
  },
  {
    name: 'AfDB',
    logo: 'https://res.cloudinary.com/diqfojkri/image/upload/v1786983652/climate%20facility/footer/footer-partner-afdb-logo.png',
    logo_alt_text: 'African Development Bank',
  },
  {
    name: 'USAID',
    logo: 'https://res.cloudinary.com/diqfojkri/image/upload/v1786983653/climate%20facility/footer/footer-partner-usaid-logo.svg',
    logo_alt_text: 'USAID',
  },
  {
    name: 'Power Africa',
    logo: 'https://res.cloudinary.com/diqfojkri/image/upload/v1786983656/climate%20facility/footer/footer-partner-power-africa-logo.png',
    logo_alt_text: 'Power Africa',
  },
  {
    name: 'Shell Foundation',
    logo: `${WP}/2022/10/Shell-foundation-1.png`,
    logo_alt_text: 'Shell Foundation',
  },
];
