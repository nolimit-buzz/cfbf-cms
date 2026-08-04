/**
 * ELIGIBILITY page copy, extracted verbatim from the Next.js frontend.
 *
 * Sources:
 *   frontend/app/eligibility/page.tsx             -> structured-data-section,
 *                                                    hero-section (SECTORS),
 *                                                    criteria-pillars-section,
 *                                                    timeline-workflow-section
 *                                                      (fundingSteps),
 *                                                    next-steps-section,
 *                                                    final-cta-section
 *   frontend/app/eligibility/assessment/page.tsx  -> assessment-chrome-section,
 *                                                    assessment-steps-section,
 *                                                    assessment-result-section
 *   frontend/components/GlassHero.tsx             -> hero-section (breadcrumb)
 *
 * This is a dynamic-zone payload: every entry carries a `__component` key and
 * the array order matches the render order in the two pages above.
 *
 * Strings the frontend builds at runtime are written out here as explicit
 * fields so no user-facing copy is left hardcoded:
 *   - the "Step {n} of 4" counter (assessment/page.tsx:232) is split into
 *     stepCounterPrefix / stepCounterMiddle / stepCounterTotal
 *   - the wizard's back button, which reads "Cancel" on step 1 and "Back"
 *     afterwards (assessment/page.tsx:877), becomes cancelLabel / backLabel
 *   - the option labels derived from raw values — 'Less than 2' / '2 to 5' /
 *     '5+ Years' (assessment/page.tsx:349) and '0 Sites' / '1 Site' /
 *     '2 or More' (assessment/page.tsx:527) — become option items whose
 *     `value` holds the internal id the frontend stores in state
 *   - the pass/fail strings in the Framework Alignment Log
 *     (assessment/page.tsx:808-837) become each row's passLabel / failLabel
 *   - the result CTA, which reads "Priority Guarantee Request" when qualified
 *     and "Apply for Technical Assistance" otherwise
 *     (assessment/page.tsx:848), becomes each outcome's ctaLabel
 *
 * The hero's second paragraph wraps an inline anchor, so it is split into
 * prefix / link label / link href / suffix rather than stored as one string.
 */

const META_DESCRIPTION =
  'Pre-qualification standards and timeline workflow for accessing funding from the Climate Finance Blending Facility.';

/**
 * Media, served from Cloudinary under `climate facility/eligibility-page/`.
 *
 * These are the URLs produced by the extract → upload pipeline
 * (scripts/eligibility-media-sources.mjs → extract-page-media.mjs →
 * upload-page-media.mjs); the Unsplash originals they replaced are recorded per
 * row in seed-manifests/eligibility-page/manifest.json. They matter only for a
 * fresh database — once an Eligibility entry exists, bootstrap()'s seed-once
 * guard skips this file and scripts/apply-eligibility-media-to-cms.cjs is what
 * writes the live entry. Both paths land on the same URLs.
 *
 * The hero and the final CTA used the same Unsplash photo at two widths, so they
 * are two separate assets here, one per field.
 */
const CLOUDINARY = 'https://res.cloudinary.com/diqfojkri';
const FOLDER = 'climate%20facility/eligibility-page';

// The `v…` segment is each asset's own upload version, copied verbatim from the
// manifest so a fresh seed and an applied entry hold byte-identical URLs.
const HERO_IMAGE = `${CLOUDINARY}/image/upload/v1785840356/${FOLDER}/hero-background-image.jpg`;
const HERO_IMAGE_ALT = 'Hero banner';

const CTA_IMAGE = `${CLOUDINARY}/image/upload/v1785840357/${FOLDER}/final-cta-background-image.jpg`;
const CTA_IMAGE_ALT = 'CFBF Factsheet & Assessment Background';

export const eligibilitySections = [
  {
    __component: 'eligibility-page.structured-data-section' as const,
    pageTitle: 'Eligibility requirements & pre-qualification | CFBF',
    metaDescription: META_DESCRIPTION,
    dcTitle: 'Eligibility framework & pre-qualification | CFBF',
    dcCreator: 'NoLimitBuzz',
    dcSubject: 'Eligibility Criteria, Pre-qualification, ESG Compliance',
    dcDescription: META_DESCRIPTION,
    dcPublisher: 'Climate Finance Blending Facility',
    dcLanguage: 'en',
    dcType: 'Eligibility Guidelines',
    schemaName: 'Eligibility Guidelines & Criteria Framework',
    schemaDescription: META_DESCRIPTION,
    schemaPublisherName: 'Climate Finance Blending Facility (CFBF)',
  },

  {
    __component: 'eligibility-page.hero-section' as const,
    breadcrumbLabel: 'home',
    currentPageLabel: 'eligibility',
    eyebrow: 'Pre-qualification standards',
    headingPartOne: 'Eligibility requirements:',
    headingHighlight: 'a guide to applying for funding',
    descriptionPrimary:
      'We believe in promoting sustainable and innovative projects that will help reduce the impacts of climate change, and to achieve this goal, we have established a set of eligibility criteria that must be met before applying for funding. By reviewing this page, you will gain a better understanding of what we are looking for in a project and whether your initiative is a good fit for our facility.',
    descriptionSecondaryPrefix: 'The pathway below condenses our',
    descriptionSecondaryLinkLabel: 'full nine-step process',
    descriptionSecondaryLinkHref: '#process',
    descriptionSecondarySuffix: 'into four clear phases.',
    backgroundImage: HERO_IMAGE,
    backgroundImage_alt_text: HERO_IMAGE_ALT,
    sectorsLabel: 'Eligible sectors',
    sectors: [
      {
        title: 'Solar Hybrid Grids',
        description:
          'Off-grid solar-hybrid mini-grids with battery storage for rural and peri-urban communities.',
        sdgBadge: 'SDG 7 & 13',
      },
      {
        title: 'Green Telephony',
        description:
          'Solar-as-a-service for telecom towers, replacing diesel generators with clean energy.',
        sdgBadge: 'SDG 13',
      },
      {
        title: 'Productive Agro-Use',
        description:
          'Solar-powered agro-processing hubs, irrigation pumps, and crop drying facilities.',
        sdgBadge: 'SDG 2 & 7',
      },
      {
        title: 'Clean Cooking & Cold Chain',
        description:
          'SME CoolHubs, solar refrigeration, and clean cooking products for households and businesses.',
        sdgBadge: 'SDG 13',
      },
      {
        title: 'Solar Home Systems',
        description:
          'Distributed solar home systems increasing household energy access across Nigeria.',
        sdgBadge: 'SDG 7',
      },
    ],
  },

  {
    __component: 'eligibility-page.criteria-pillars-section' as const,
    eyebrow: 'Criteria pillars',
    headingPartOne: 'CFBF',
    headingHighlight: 'eligibility framework',
    cards: [
      {
        heading: '01. Eligible Technologies & Sectors',
        body: 'Projects must be off-grid clean energy solutions such as solar mini-grids, solar homes systems, solar lanterns, fridges, pumps, driers and clean cooking products, small medium enterprise coolhubs and low carbon public transport or such other eligible projects as may be approved by the Funders.',
        subNote:
          'Projects should increase energy access and/or productive use of energy.',
        listItems: [],
        stats: [],
        footerTag: 'SDG 7 & 13 Focus',
      },
      {
        heading: '02. InfraCredit Infrastructure Criteria',
        body: '',
        subNote: '',
        listItems: [
          { text: 'Naira denominated' },
          { text: 'Debt Instrument' },
          {
            text: "Acceptable Credit Profile based on InfraCredit's internal credit assessment",
          },
          { text: 'Adequate Security Package' },
          { text: 'Debt Tenor of up to 10 years' },
          {
            text: "Satisfies InfraCredit's Environmental and Social Safeguards Standards",
          },
          { text: "Is not on InfraCredit's Project Exclusion List" },
          { text: 'Issuer is PENCOM Compliant' },
        ],
        stats: [],
        footerTag: 'INFRASTRUCTURE MINIMUMS',
      },
      {
        heading: '03. Compliance & Scale',
        body: '',
        subNote: '',
        listItems: [
          {
            text: 'Must comply with IFC Economic Sustainability and Governance Standards',
          },
          { text: 'Minimum of 1 active operational mini-grid site(s)' },
          { text: 'Scalable business model' },
        ],
        stats: [],
        footerTag: 'ESG & GROWTH GUIDELINES',
      },
      {
        heading: '04. Operational & Capacity Scale',
        body: '',
        subNote: '',
        listItems: [],
        stats: [
          { value: '150kW+', label: 'Installed Capacity' },
          { value: '200+', label: 'Paying Customers' },
          { value: '1+', label: 'Active Site' },
          { value: 'Scalable', label: 'Business Model' },
        ],
        footerTag: 'DEVELOPMENT THRESHOLDS',
      },
    ],
  },

  {
    __component: 'eligibility-page.timeline-workflow-section' as const,
    eyebrow: 'Timeline workflow',
    headingPartOne: 'Process for accessing funding from the',
    headingHighlight: 'Climate Finance Blending Facility',
    stepLabelPrefix: 'Step',
    steps: [
      {
        stepNumber: '01',
        title: 'Checklist & request',
        description:
          'Developer completes the preliminary readiness checklist and submits a formal Guarantee Request Letter to InfraCredit.',
      },
      {
        stepNumber: '02',
        title: 'Origination check',
        description:
          'InfraCredit conducts a preliminary assessment, confirms eligibility for facility support, and obtains internal New Business Committee (NBC) approval.',
      },
      {
        stepNumber: '03',
        title: 'Mandate signing',
        description:
          'InfraCredit completes Know Your Customer (KYC) verification and the Company executes the formal Mandate Letter.',
      },
      {
        stepNumber: '04',
        title: 'Credit Committee approval',
        description:
          'InfraCredit conducts a detailed credit assessment and obtains Board Credit Committee approval.',
      },
      {
        stepNumber: '05',
        title: 'Due diligence',
        description:
          'InfraCredit conducts comprehensive Environmental & Social (ESG), technical, and legal due diligence on the project.',
      },
      {
        stepNumber: '06',
        title: 'Investment review',
        description:
          "The Facility's Investment Committee/Adviser reviews project details and issues a formal No-Objection.",
      },
      {
        stepNumber: '07',
        title: 'Facility approval',
        description:
          'InfraCredit obtains final Facility Investment Approval and negotiates the co-financing agreements with the developer.',
      },
      {
        stepNumber: '08',
        title: 'CP satisfaction',
        description:
          'The Company satisfies all required Conditions Precedent (CPs) to closing.',
      },
      {
        stepNumber: '09',
        title: 'Financial close',
        description:
          'Execution of the local currency guarantee and successful co-financing disbursement.',
      },
    ],
  },

  {
    __component: 'eligibility-page.next-steps-section' as const,
    eyebrow: 'Next steps',
    headingPartOne: 'Explore the',
    headingItalic: 'facility portal',
    links: [
      {
        eyebrow: 'Portfolio',
        title: 'Browse portfolio',
        description: 'Discover how our credit wraps support developers',
        href: '/projects',
      },
      {
        eyebrow: 'Architecture',
        title: 'Learn how it works',
        description: 'Understand our blending process & structures',
        href: '/how-it-works',
      },
      {
        eyebrow: 'Impact',
        title: 'View our impact',
        description: 'Explore carbon targets and video stories',
        href: '/impact',
      },
    ],
  },

  {
    __component: 'eligibility-page.final-cta-section' as const,
    backgroundImage: CTA_IMAGE,
    backgroundImage_alt_text: CTA_IMAGE_ALT,
    eyebrow: 'Assessment & Factsheet',
    headingPartOne: 'Find out if you are',
    headingHighlight: 'eligible',
    body: 'Take our interactive Project Readiness Assessment to quickly verify compliance against fatal requirements, estimate your qualifying scores, and fast-track your Guarantee Request. You can also download the complete Eligibility & Framework Factsheet for offline reference.',
    primaryCtaLabel: 'Start the process',
    primaryCtaHref: '/eligibility/assessment',
    downloadCtaLabel: 'Download factsheet',
    downloadCtaHref: '/wp-content/uploads/2026/05/CFBF-Factsheet-compressed.pdf',
    downloadFileName: 'CFBF_Factsheet.pdf',
  },

  {
    __component: 'eligibility-page.assessment-chrome-section' as const,
    backLabel: 'Back',
    cancelLabel: 'Cancel',
    nextLabel: 'Next Step',
    stepCounterPrefix: 'Step',
    stepCounterMiddle: 'of',
    stepCounterTotal: '4',
    summaryBadge: 'Assessment Summary',
  },

  {
    __component: 'eligibility-page.assessment-steps-section' as const,
    steps: [
      {
        stepNumber: '1',
        title: 'Corporate Compliance Profile',
        description:
          'Confirm your developer legal status, registration region, and historical active track record.',
      },
      {
        stepNumber: '2',
        title: 'Technology Cleanliness & Safeguards',
        description:
          'Projects must fall under renewable technology categories and comply with human rights frameworks.',
      },
      {
        stepNumber: '3',
        title: 'Project Operational Capacity Thresholds',
        description:
          'Confirm your capacity thresholds, site footprint, and paying customer scale.',
      },
      {
        stepNumber: '4',
        title: 'Financing & Capital Structure',
        description:
          'Confirm your transaction parameters, currency alignment, and security reserves.',
      },
    ],
    questions: [
      {
        stepNumber: '1',
        label: 'Is your business entity incorporated and active in Nigeria?',
        requiredMarker: '*',
        helperText:
          'Guarantees and blenders are legally structured in NGN and are exclusively deployable for local assets.',
        options: [
          { label: 'Yes, Registered in Nigeria', value: 'true' },
          { label: 'No, International Entity', value: 'false' },
        ],
      },
      {
        stepNumber: '1',
        label:
          'Is the issuer compliant with National Pension Commission (PENCOM) regulations?',
        requiredMarker: '*',
        helperText:
          'All target bond issuers under the blend structure must satisfy institutional pension framework parameters in Nigeria.',
        options: [
          { label: 'Yes, PENCOM Compliant', value: 'true' },
          { label: 'No / Not Applicable', value: 'false' },
        ],
      },
      {
        stepNumber: '1',
        label: 'Years of active experience in clean energy infrastructure?',
        requiredMarker: '*',
        helperText: '',
        options: [
          { label: 'Less than 2', value: '<2' },
          { label: '2 to 5', value: '2-5' },
          { label: '5+ Years', value: '5+' },
        ],
      },
      {
        stepNumber: '2',
        label: 'Clean Tech Deployment Category',
        requiredMarker: '*',
        helperText: '',
        options: [
          { label: 'Solar Hybrid Grids / SHS', value: 'solar-grid' },
          { label: 'Cold Storage / Agro-Use', value: 'cold-storage' },
          { label: 'Clean Cooking Products', value: 'clean-cooking' },
          {
            label: 'Low-Carbon Public Transport',
            value: 'low-carbon-transport',
          },
          { label: 'Other Approved Clean Tech', value: 'other-green' },
          { label: 'Heavy Fossil Hybrid (Excl.)', value: 'fossil-fuel' },
        ],
      },
      {
        stepNumber: '2',
        label:
          'Component sourcing complies with non-forced labor & human rights?',
        requiredMarker: '*',
        helperText: '',
        options: [
          { label: 'Yes, Sourcing Complies', value: 'true' },
          { label: 'No / Non-Compliant', value: 'false' },
        ],
      },
      {
        stepNumber: '2',
        label:
          'Does the project align with IFC Environmental & Social Safeguard Standards?',
        requiredMarker: '*',
        helperText: '',
        options: [
          { label: 'Yes, Aligned with IFC ESG', value: 'true' },
          { label: 'No, Out of Alignment', value: 'false' },
        ],
      },
      {
        stepNumber: '3',
        label: 'Total project designed capacity (kWp)',
        requiredMarker: '*',
        helperText: '',
        options: [
          { label: '150 kWp or Higher (Combined)', value: 'true' },
          { label: 'Less than 150 kWp', value: 'false' },
        ],
      },
      {
        stepNumber: '3',
        label: 'Number of active operational mini-grid sites?',
        requiredMarker: '*',
        helperText: '',
        options: [
          { label: '0 Sites', value: '0' },
          { label: '1 Site', value: '1' },
          { label: '2 or More', value: '2' },
        ],
      },
      {
        stepNumber: '3',
        label: 'Do you currently serve 200 or more paying customers?',
        requiredMarker: '*',
        helperText: '',
        options: [
          { label: 'Yes, 200+ Paying Customers', value: 'true' },
          { label: 'No, Less than 200', value: 'false' },
        ],
      },
      {
        stepNumber: '3',
        label: 'Is the operational business model scalable across regions?',
        requiredMarker: '*',
        helperText: '',
        options: [
          { label: 'Yes, Scalable Model', value: 'true' },
          { label: 'No / Hard to Scale', value: 'false' },
        ],
      },
      {
        stepNumber: '4',
        label:
          'Is your proposed debt transaction denominated in Nigerian Naira (NGN)?',
        requiredMarker: '*',
        helperText: '',
        options: [
          { label: 'Yes, Denominated in NGN', value: 'true' },
          { label: 'No, Hard Currency (USD/EUR)', value: 'false' },
        ],
      },
      {
        stepNumber: '4',
        label: 'Funding Structure Instrument',
        requiredMarker: '*',
        helperText: '',
        options: [
          { label: 'Debt Instrument / Guaranteed Loan', value: 'debt' },
          { label: 'Equity Funding Only (Excl.)', value: 'equity-only' },
        ],
      },
      {
        stepNumber: '4',
        label: 'Requested debt maturity/tenor is up to 10 years?',
        requiredMarker: '*',
        helperText: '',
        options: [
          { label: 'Yes, Tenor Up to 10 Years', value: 'true' },
          { label: 'No, Tenor Over 10 Years', value: 'false' },
        ],
      },
      {
        stepNumber: '4',
        label: 'Are adequate security assets / collateral package available?',
        requiredMarker: '*',
        helperText: '',
        options: [
          { label: 'Yes, Security Package Available', value: 'true' },
          { label: 'No Security Package Available', value: 'false' },
        ],
      },
    ],
  },

  {
    __component: 'eligibility-page.assessment-result-section' as const,
    readinessLabel: 'Readiness',
    logHeading: 'Framework Alignment Log',
    outcomes: [
      {
        status: 'qualified',
        title: 'Highly Qualified for Guarantees',
        description:
          'Outstanding project parameters. Your mini-grid initiative satisfies all core operational, financial, ESG, and regulatory thresholds. You are fully qualified to fast-track your Guarantee Request with the Climate Finance Blending Facility.',
        ctaLabel: 'Priority Guarantee Request',
      },
      {
        status: 'technical-assistance',
        title: 'Eligible for Technical Assistance',
        description:
          'Your clean energy project meets core parameters but lacks full operational scale (e.g., operational history or target customer base). You qualify for CFBF Project Preparation & Technical Assistance support to achieve guarantee-readiness.',
        ctaLabel: 'Apply for Technical Assistance',
      },
      {
        status: 'excluded',
        title: 'Criteria Conflict Detected',
        description:
          'Your project parameters do not align with the core regulatory/exclusion list filters. InfraCredit guarantees require Naira-denominated debt instruments, PENCOM compliance, and zero coal/heavy fossil technology components.',
        ctaLabel: 'View Framework Guidelines',
      },
    ],
    logRows: [
      {
        label: 'Nigeria Incorporation Base:',
        passLabel: 'Valid Base',
        failLabel: 'Non-Compliant',
      },
      {
        label: 'Legal Sourcing Compliance:',
        passLabel: 'ESG Aligned',
        failLabel: 'Non-Compliant',
      },
      {
        label: 'Scale Threshold (>=150kW):',
        passLabel: 'Passed',
        failLabel: 'Under Capacity',
      },
      {
        label: 'Paying Customer Threshold (>=200):',
        passLabel: 'Passed',
        failLabel: 'Under Minimum Scale (TA Focus)',
      },
      {
        label: 'Transaction Currency (Naira):',
        passLabel: 'NGN Aligned',
        failLabel: 'Hard Currency Excl.',
      },
    ],
    excludedCtaLabel: 'View Framework Guidelines',
    restartLabel: 'Restart',
  },
];
