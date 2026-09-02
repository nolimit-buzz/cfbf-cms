/**
 * Seed data for the `footer` single type — the "Domestic Institutional
 * Investors & Partners" marquee in frontend/components/Footer.tsx.
 *
 * Order matches the marquee's display order. Each partner carries a white
 * knockout (`logo`, shown by default) and its full-colour artwork
 * (`logoColour`, crossfaded in on hover) — both uploaded from
 * frontend/public/partners by scripts/upload-partner-logos.mjs. URLs are
 * versionless on purpose: those uploads overwrite a stable public_id, so
 * redrawn artwork propagates instead of staying pinned to an old version.
 *
 * BII is the exception — no artwork in the partners folder, so it keeps its
 * legacy white PNG and renders without a colour swap. It moved here from the
 * About page's Anchor Funders grid, which now shows UK FCDO alone.
 */

const PARTNERS = 'https://res.cloudinary.com/diqfojkri/image/upload/climate%20facility/partners';

const partner = (name: string, slug: string, altText: string) => ({
  name,
  logo: `${PARTNERS}/partner-${slug}-white.svg`,
  logo_alt_text: altText,
  logoColour: `${PARTNERS}/partner-${slug}-colour.svg`,
  logoColour_alt_text: altText,
});

export const footerPartnerLogos = [
  partner('AIICO Insurance', 'aiico', 'AIICO Insurance PLC'),
  partner('Linkage Assurance', 'linkage', 'Linkage Assurance PLC'),
  partner('LEADWAY', 'leadway', 'Leadway Insurance'),
  partner('Pension Custodian', 'first-pension-custodian', 'First Pension Custodian'),
  partner('United Capital', 'united-capital', 'United Capital Plc'),
  partner('MERISTEM', 'meristem', 'Meristem'),
  partner('InfraCredit', 'infracredit', 'InfraCredit'),
  partner('FCDO', 'uk-fcdo', 'UK International Development'),
  partner('AfDB', 'afdb', 'African Development Bank'),
  partner('USAID', 'usaid', 'USAID'),
  partner('Power Africa', 'power-africa', 'Power Africa'),
  partner('Shell Foundation', 'shell-foundation', 'Shell Foundation'),
  {
    name: 'BII',
    logo: 'https://infracredit.ng/climate-facility/wp-content/uploads/2022/10/BII_Logo_All_white_RGB.png',
    logo_alt_text: 'British International Investment',
    logoColour: null,
    logoColour_alt_text: null,
  },
];
