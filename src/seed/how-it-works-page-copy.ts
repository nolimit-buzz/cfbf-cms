/**
 * HOW IT WORKS page copy, extracted verbatim from the Next.js frontend.
 *
 * Sources:
 *   frontend/app/how-it-works/page.tsx  -> structured-data-section (JSON-LD, title,
 *                                            meta description, DC.* metadata),
 *                                          hero-section (HERO_STEPS),
 *                                          financing-structure-section (bullets,
 *                                            ANCHOR_FUNDERS, CO_FINANCING,
 *                                            TA_PROVIDERS / TaSlider),
 *                                          facility-structure-section (diagram),
 *                                          process-section (FUNDING_STEPS),
 *                                          next-steps-section (portal links)
 *   frontend/components/GlassHero.tsx   -> hero-section (breadcrumb root label)
 *
 * This is a dynamic-zone payload: every entry carries a `__component` key and the
 * array order matches the render order in frontend/app/how-it-works/page.tsx.
 *
 * Strings the frontend derives at runtime are written out here as explicit fields
 * so no user-facing copy is left hardcoded:
 *   - the hero heading, split across two spans, becomes headingPartOne /
 *     headingHighlight (page.tsx:120); the same split applies to every section
 *     heading and to the italic tail of the next-steps heading (page.tsx:342)
 *   - the second hero paragraph wraps an inline anchor, so it is split into
 *     descriptionSecondaryPrefix / LinkLabel / LinkHref / Suffix (page.tsx:131-137)
 *   - the hero card aria-label template, built from the card title plus a fixed
 *     tail (page.tsx:154), becomes stepCardAriaSuffix
 *   - the TaSlider rotation interval, 2800 ms (page.tsx:46), becomes taRotationMs
 *
 * Image and logo URLs are hoisted as consts below. They point at Cloudinary
 * rather than the wp-content originals page.tsx:22-40 still uses — see the
 * media block below and cms/seed-manifests/how-it-works-page/manifest.json.
 */

/**
 * Media URLs now point at Cloudinary, per IMAGE_EXTRACTOR_PROMPT.md — see
 * cms/seed-manifests/how-it-works-page/manifest.json for the original sources
 * and the local extracted copies.
 *
 * Seven of the nine assets are reused from folders another page uploaded first
 * (the six partner logos from about-page, the hero photo from eligibility-page),
 * which is why their public ids don't read `how-it-works-page`. Only the KfW
 * logo and the facility diagram are unique to this page.
 */
const CDN = 'https://res.cloudinary.com/diqfojkri/image/upload';

const HERO_IMAGE = `${CDN}/v1785840356/climate%20facility/eligibility-page/hero-background-image.jpg`;

const DIAGRAM_IMAGE = `${CDN}/v1785844207/climate%20facility/how-it-works-page/facility-structure-diagram-src.svg`;

const FCDO_LOGO = `${CDN}/v1785804895/climate%20facility/about-page/partners-group-1-partner-1-logo.png`;
const BII_LOGO = `${CDN}/v1785804896/climate%20facility/about-page/partners-group-1-partner-2-logo.png`;

const INFRACREDIT_LOGO_WHITE = `${CDN}/v1785804899/climate%20facility/about-page/partners-group-3-partner-1-logo.png`;
const INFRACREDIT_LOGO_COLOUR = `${CDN}/v1785804900/climate%20facility/about-page/partners-group-3-partner-1-logo-colour.svg`;

const FSD_AFRICA_LOGO = `${CDN}/v1785804897/climate%20facility/about-page/partners-group-2-partner-1-logo.png`;
const SHELL_FOUNDATION_LOGO = `${CDN}/v1785804898/climate%20facility/about-page/partners-group-2-partner-2-logo.png`;
const KFW_LOGO = `${CDN}/v1785844205/climate%20facility/how-it-works-page/ta-provider-3-src.png`;

const META_DESCRIPTION =
  'Understand the financing structure, facility architecture, and step-by-step process for accessing blended climate finance through CFBF and InfraCredit.';

export const howItWorksSections = [
  {
    __component: 'how-it-works-page.structured-data-section' as const,
    schemaName: 'How it works | Climate Finance Blending Facility',
    schemaDescription: META_DESCRIPTION,
    publisherName: 'Climate Finance Blending Facility (CFBF)',
    pageTitle: 'How it works — financing structure & process | CFBF',
    metaDescription: META_DESCRIPTION,
    dcTitle: 'How it works — climate finance blending facility',
    dcCreator: 'NoLimitBuzz',
    dcSubject: 'Blended Finance, Concessional Capital, Infrastructure',
    dcDescription: 'Detailed guide on the blended finance capital flow model.',
    dcLanguage: 'en',
    dcType: 'Guidelines Document',
  },
  {
    __component: 'how-it-works-page.hero-section' as const,
    eyebrow: 'Financing structure',
    headingPartOne: 'How it ',
    headingHighlight: 'works',
    backgroundImage: HERO_IMAGE,
    // GlassHero falls back to 'Hero banner' because the title is a JSX fragment.
    backgroundImage_alt_text: 'Hero banner',
    breadcrumbRootLabel: 'home',
    breadcrumbLabel: 'how-it-works',
    descriptionPrimary:
      "From eligibility to financial close, CFBF channels concessional first-loss capital through InfraCredit's local-currency guarantee — unlocking domestic institutional finance for off-grid energy developers.",
    descriptionSecondaryPrefix: 'The pathway below condenses our ',
    descriptionSecondaryLinkLabel: 'full nine-step process',
    descriptionSecondaryLinkHref: '#process',
    descriptionSecondarySuffix: ' into four clear phases.',
    stepCardAriaSuffix: '— jump to the full nine-step process',
    stepCardHref: '#process',
    steps: [
      {
        index: '01',
        range: 'Steps 1–2',
        title: 'Apply & Pre-qualify',
        desc: "Complete the readiness checklist, submit your Guarantee Request Letter, and pass InfraCredit's origination and eligibility screening.",
        theme: 'light',
      },
      {
        index: '02',
        range: 'Steps 3–4',
        title: 'Mandate & Credit Approval',
        desc: 'Clear KYC, execute the Mandate Letter, and secure Board Credit Committee approval after a detailed credit assessment.',
        theme: 'cyan',
      },
      {
        index: '03',
        range: 'Steps 5–7',
        title: 'Due Diligence & Structuring',
        desc: 'Undergo ESG, technical and legal due diligence, an Investment Committee No-Objection, and final Facility approval with co-financing terms.',
        theme: 'green',
      },
      {
        index: '04',
        range: 'Steps 8–9',
        title: 'Conditions & Financial Close',
        desc: 'Satisfy all Conditions Precedent, then execute the local-currency guarantee and disburse co-financing at financial close.',
        theme: 'dark',
      },
    ],
  },
  {
    __component: 'how-it-works-page.financing-structure-section' as const,
    eyebrow: 'Overview',
    headingPartOne: 'Financing ',
    headingHighlight: 'structure',
    bodyPrimary:
      'The Facility deploys impact-focused capital to offer blended first-loss and low-interest funding to qualified off-grid energy companies. These companies gain access to Nigerian Naira debt financing from domestic capital markets, backed by InfraCredit guarantees.',
    bodySecondary:
      'The initiative aims to catalyse at least 50% of funding from domestic institutional investors — including pension funds, insurance companies, and asset managers — to expand clean energy access across Nigeria.',
    bullets: [
      { text: 'Local currency (NGN) debt financing with InfraCredit guarantee' },
      {
        text: 'First-loss concessional capital reduces risk for private investors',
      },
      { text: 'Minimum 50% co-financing from domestic institutional sources' },
      {
        text: 'Technical assistance for developers through the facility lifecycle',
      },
    ],
    anchorFundersLabel: 'Anchor Funders',
    anchorFunders: [
      {
        src: FCDO_LOGO,
        src_alt_text: 'FCDO – UK Foreign, Commonwealth & Development Office',
        alt: 'FCDO – UK Foreign, Commonwealth & Development Office',
        href: 'https://www.gov.uk/government/organisations/foreign-commonwealth-development-office',
      },
      {
        src: BII_LOGO,
        src_alt_text: 'British International Investment',
        alt: 'British International Investment',
        href: 'https://www.bii.co.uk/',
      },
    ],
    coFinancingLabel: 'Co-Financing Partner',
    coFinancingPartner: {
      srcWhite: INFRACREDIT_LOGO_WHITE,
      srcWhite_alt_text: 'InfraCredit',
      srcColour: INFRACREDIT_LOGO_COLOUR,
      // Decorative hover swap of the logo above — alt="" aria-hidden="true".
      srcColour_alt_text: '',
      alt: 'InfraCredit',
      href: 'https://infracredit.ng/',
    },
    taProvidersLabel: 'Technical Assistance Providers',
    taProviders: [
      {
        src: FSD_AFRICA_LOGO,
        src_alt_text: 'FSD Africa',
        alt: 'FSD Africa',
        href: 'https://fsdafrica.org/',
      },
      {
        src: SHELL_FOUNDATION_LOGO,
        src_alt_text: 'Shell Foundation',
        alt: 'Shell Foundation',
        href: 'https://shellfoundation.org/',
      },
      {
        src: KFW_LOGO,
        src_alt_text: 'KfW',
        alt: 'KfW',
        href: 'https://www.kfw.de/',
      },
    ],
    taRotationMs: '2800',
  },
  {
    __component: 'how-it-works-page.facility-structure-section' as const,
    eyebrow: 'Architecture',
    headingPartOne: 'Facility ',
    headingHighlight: 'structure',
    body: "Capital flows from anchor funders through the Facility and InfraCredit's guarantee mechanism into domestic capital markets, reaching developers and ultimately the communities they serve.",
    diagramSrc: DIAGRAM_IMAGE,
    diagramSrc_alt_text:
      'CFBF facility financing structure diagram — showing capital flows from anchor funders through InfraCredit guarantee to developers and communities',
    diagramAlt:
      'CFBF facility financing structure diagram — showing capital flows from anchor funders through InfraCredit guarantee to developers and communities',
  },
  {
    __component: 'how-it-works-page.process-section' as const,
    eyebrow: 'Timeline workflow',
    headingPartOne: 'Process for accessing ',
    headingHighlight: 'funding',
    intro:
      'A structured nine-step pathway from initial checklist to financial close, administered by InfraCredit with Facility oversight at key milestones.',
    steps: [
      {
        step: '01',
        title: 'Checklist & request',
        desc: 'Developer completes the preliminary readiness checklist and submits a formal Guarantee Request Letter to InfraCredit.',
      },
      {
        step: '02',
        title: 'Origination check',
        desc: 'InfraCredit conducts a preliminary assessment, confirms eligibility for facility support, and obtains internal New Business Committee (NBC) approval.',
      },
      {
        step: '03',
        title: 'Mandate signing',
        desc: 'InfraCredit completes Know Your Customer (KYC) verification and the Company executes the formal Mandate Letter.',
      },
      {
        step: '04',
        title: 'Credit Committee approval',
        desc: 'InfraCredit conducts a detailed credit assessment and obtains Board Credit Committee approval.',
      },
      {
        step: '05',
        title: 'Due diligence',
        desc: 'InfraCredit conducts comprehensive Environmental & Social (ESG), technical, and legal due diligence on the project.',
      },
      {
        step: '06',
        title: 'Investment review',
        desc: "The Facility's Investment Committee/Adviser reviews project details and issues a formal No-Objection.",
      },
      {
        step: '07',
        title: 'Facility approval',
        desc: 'InfraCredit obtains final Facility Investment Approval and negotiates the co-financing agreements with the developer.',
      },
      {
        step: '08',
        title: 'CP satisfaction',
        desc: 'The Company satisfies all required Conditions Precedent (CPs) to closing.',
      },
      {
        step: '09',
        title: 'Financial close',
        desc: 'Execution of the local currency guarantee and successful co-financing disbursement.',
      },
    ],
  },
  {
    __component: 'how-it-works-page.next-steps-section' as const,
    eyebrow: 'Next steps',
    headingPartOne: 'Explore the ',
    headingItalic: 'facility portal',
    links: [
      {
        eyebrow: 'About us',
        title: 'Who we are',
        description: 'Learn about our seed capital & mandates',
        href: '/about',
      },
      {
        eyebrow: 'Eligibility',
        title: 'Check if you qualify',
        description: 'Review criteria & pre-qualification standards',
        href: '/eligibility',
      },
      {
        eyebrow: 'Impact',
        title: 'View our impact',
        description: 'Explore carbon targets & video stories',
        href: '/impact',
      },
    ],
  },
];
