/**
 * Partner logo inventory — the single source of truth for the artwork in
 * frontend/public/partners/.
 *
 * Every brand ships two variants: a white knockout (shown by default against
 * the dark sections) and a full-colour version (crossfaded in on hover). The
 * local filenames are inconsistent — spaces, a trailing " w" for white, and
 * USAID's white variant named `usaid-1.svg` — so this table maps each brand to
 * a stable slug that becomes the Cloudinary public_id.
 *
 * Consumed by:
 *   scripts/upload-partner-logos.mjs      — uploads and records secure_urls
 *   scripts/apply-partner-logos-to-cms.cjs — writes those URLs into Strapi
 *
 * `aboutName` / `footerName` are the exact `name` values the two CMS sections
 * use, so the apply script can match by name rather than by fragile index.
 * A `null` means the brand does not appear in that section.
 */

export const CLOUDINARY_FOLDER = 'climate facility/partners';

/** Relative to the repo root — the SVGs live with the frontend, not the CMS. */
export const SOURCE_DIR = 'frontend/public/partners';

/** @type {{slug:string, label:string, white:string, colour:string, aboutName:string|null, footerName:string|null}[]} */
export const partnerLogos = [
  {
    slug: 'uk-fcdo',
    label: 'UK International Development',
    white: 'uk w.svg',
    colour: 'uk.svg',
    aboutName: 'Foreign, Commonwealth & Development Office',
    footerName: 'FCDO',
  },
  {
    slug: 'fsd-africa',
    label: 'FSD Africa',
    white: 'fsd w.svg',
    colour: 'fsd.svg',
    aboutName: 'FSD Africa',
    footerName: null,
  },
  {
    slug: 'shell-foundation',
    label: 'Shell Foundation',
    white: 'shell f w.svg',
    colour: 'shell f.svg',
    aboutName: 'Shell Foundation',
    footerName: 'Shell Foundation',
  },
  {
    slug: 'kfw',
    label: 'KfW',
    white: 'kfw w.svg',
    colour: 'kfw.svg',
    aboutName: 'KfW',
    footerName: null,
  },
  {
    slug: 'infracredit',
    label: 'InfraCredit',
    white: 'infracredit w.svg',
    colour: 'infracredit.svg',
    aboutName: 'InfraCredit',
    footerName: 'InfraCredit',
  },
  {
    slug: 'aiico',
    label: 'AIICO Insurance PLC',
    white: 'Aiico w.svg',
    colour: 'Aiico.svg',
    aboutName: 'AIICO Insurance PLC',
    footerName: 'AIICO Insurance',
  },
  {
    slug: 'nem',
    label: 'NEM Insurance PLC',
    white: 'nem w.svg',
    colour: 'nem.svg',
    aboutName: 'NEM Insurance PLC',
    footerName: null,
  },
  {
    slug: 'linkage',
    label: 'Linkage Assurance PLC',
    white: 'linkage w.svg',
    colour: 'linkage.svg',
    aboutName: 'Linkage Insurance PLC',
    footerName: 'Linkage Assurance',
  },
  {
    slug: 'leadway',
    label: 'Leadway Insurance',
    white: 'leadway w.svg',
    colour: 'leadway.svg',
    aboutName: 'Leadway Insurance',
    footerName: 'LEADWAY',
  },
  {
    slug: 'tangerine',
    label: 'Tangerine Life',
    white: 'tangrine w.svg',
    colour: 'tangrine.svg',
    aboutName: 'Tangerine Life',
    footerName: null,
  },
  {
    slug: 'clean-energy-lcf',
    label: 'Clean Energy Local Currency Fund',
    white: 'clean energy w.svg',
    colour: 'clean energy.svg',
    aboutName: 'Clean Energy Local Currency Fund',
    footerName: null,
  },
  {
    slug: 'first-pension-custodian',
    label: 'First Pension Custodian',
    white: 'first pc w.svg',
    colour: 'first pc.svg',
    aboutName: 'First Pension Custodian',
    footerName: 'Pension Custodian',
  },
  {
    slug: 'united-capital',
    label: 'United Capital Plc',
    white: 'united capital w.svg',
    colour: 'united capital.svg',
    aboutName: null,
    footerName: 'United Capital',
  },
  {
    slug: 'meristem',
    label: 'Meristem',
    white: 'meristem w.svg',
    colour: 'meristem.svg',
    aboutName: null,
    footerName: 'MERISTEM',
  },
  {
    slug: 'afdb',
    label: 'African Development Bank',
    white: 'Adf w.svg',
    colour: 'Adf.svg',
    aboutName: null,
    footerName: 'AfDB',
  },
  {
    // The white variant is `usaid-1.svg`, not `usaid w.svg` — confirmed by its
    // fills being uniformly `white` where `usaid.svg` uses the brand navy/red.
    slug: 'usaid',
    label: 'USAID',
    white: 'usaid-1.svg',
    colour: 'usaid.svg',
    aboutName: null,
    footerName: 'USAID',
  },
  {
    slug: 'power-africa',
    label: 'Power Africa',
    white: 'Power w.svg',
    colour: 'Power.svg',
    aboutName: null,
    footerName: 'Power Africa',
  },
];

/**
 * British International Investment has no artwork in the partners folder, so
 * it keeps its legacy white PNG and lives in the footer marquee only (it was
 * removed from the About page's Anchor Funders grid, which now shows UK FCDO
 * alone). No colour variant — the marquee degrades to a single image.
 */
export const BII_FOOTER_ENTRY = {
  name: 'BII',
  logo: 'https://infracredit.ng/climate-facility/wp-content/uploads/2022/10/BII_Logo_All_white_RGB.png',
  logo_alt_text: 'British International Investment',
};

/** The About-page partner dropped from the grid by apply-partner-logos-to-cms. */
export const ABOUT_REMOVED_PARTNER_NAME = 'British International Investment';

export const publicIdFor = (slug, variant) => `partner-${slug}-${variant}`;

/**
 * Drops Cloudinary's `/v<timestamp>/` segment from a secure_url.
 *
 * These uploads are idempotent by `overwrite: true` on a stable public_id, so
 * redrawn artwork replaces the asset in place. A version-pinned URL would keep
 * serving the old file after that; the versionless form picks up the new one.
 */
export const stripVersion = (url) => url.replace(/\/v\d+\//, '/');
