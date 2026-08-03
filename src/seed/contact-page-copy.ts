/**
 * CONTACT page copy, extracted verbatim from the Next.js frontend.
 *
 * Sources:
 *   frontend/app/contact/page.tsx       -> structured-data-section (hoisted
 *                                            <title>/meta + JSON-LD + Suspense
 *                                            fallback),
 *                                          hero-section (GlassHero + heroCards),
 *                                          facility-contacts-section,
 *                                          eligibility-reminder-section,
 *                                          fun-stats-section (FunStatsCarousel),
 *                                          enquiry-form-section (ContactForm),
 *                                          submission-success-section,
 *                                          next-steps-section,
 *                                          download-cta-section
 *   frontend/components/GlassHero.tsx   -> hero-section (breadcrumb root label)
 *
 * This is a dynamic-zone payload: every entry carries a `__component` key and
 * the array order matches the render order in frontend/app/contact/page.tsx.
 *
 * Strings the frontend derives at runtime are written out here as explicit
 * fields so no user-facing copy is left hardcoded:
 *   - the readiness banner label "Readiness Verified: {score}%" (page.tsx:345)
 *     is split into readinessAlertLabelPrefix / readinessAlertLabelSuffix
 *   - the readiness prefill message (page.tsx:146-151) becomes
 *     prefillIntroTemplate — the literal `${score}` placeholder is kept so the
 *     frontend can still interpolate — plus the two classification bodies
 *   - the `tech` query-param -> technology-label if/else chain
 *     (page.tsx:155-159) becomes the technologyParamMap repeatable, with the
 *     final `else` branch as defaultTechnologyLabel
 *   - the <select> option lists become repeatable select-option-items
 */

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1200&auto=format&fit=crop';

const FUN_STATS_IMAGE =
  'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=1200&auto=format&fit=crop';

const BROCHURE_IMAGE =
  'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1400&auto=format&fit=crop';

const META_DESCRIPTION =
  'Get in touch with the Climate Finance Blending Facility for developer intake, investor relations, or donor partnerships.';

export const contactSections = [
  {
    __component: 'contact-page.structured-data-section' as const,
    pageTitle: 'Contact & partnerships | CFBF',
    metaDescription: META_DESCRIPTION,
    loadingLabel: 'Loading connection portal...',
    jsonLdType: 'ContactPage',
    jsonLdName: 'Contact and Enquiries | CFBF',
    jsonLdDescription: META_DESCRIPTION,
    jsonLdPublisherName: 'Climate Finance Blending Facility (CFBF)',
  },
  {
    __component: 'contact-page.hero-section' as const,
    breadcrumbLabel: 'home',
    eyebrow: 'Partnership portal',
    headingPartOne: 'Connect with ',
    headingHighlight: 'our team',
    description:
      'Whether you are a clean energy developer looking for blended financing, or an institutional investor/donor looking to co-finance green transitions, reach out to our team.',
    backgroundImage: HERO_IMAGE,
    cards: [
      {
        index: '01',
        title: 'Developer Intake',
        description:
          'Submit off-grid mini-grid, telecom, or agri-processing project profiles.',
        theme: 'light',
      },
      {
        index: '02',
        title: 'Investor Relations',
        description:
          'Co-finance green tranches and explore local currency credit enhancements.',
        theme: 'cyan',
      },
      {
        index: '03',
        title: 'Donor Partnership',
        description:
          'Blend concessional funds to de-risk sustainable clean energy projects.',
        theme: 'green',
      },
    ],
  },
  {
    __component: 'contact-page.facility-contacts-section' as const,
    heading: 'Facility Contacts',
    officeLocationLabel: 'Office Location',
    officeAddressLineOne: 'InfraCredit House,',
    officeAddressLineTwo: 'Lagos, Nigeria.',
    emailLabel: 'Email Enquiries',
    emailAddress: 'info@infracredit.ng',
    emailHref: 'mailto:info@infracredit.ng',
    phoneLabel: 'Phone Line',
    phoneNumber: '+234 (1) 234 5678',
    phoneHref: 'tel:+23412345678',
  },
  {
    __component: 'contact-page.eligibility-reminder-section' as const,
    eyebrow: 'Before you connect',
    heading: 'Verify your eligibility',
    description:
      "Save time by completing our preliminary Readiness Assessment before submitting a request. This helps confirm your project matches the facility's initial funding requirements.",
    ctaLabel: 'Go to Eligibility Check',
    ctaHref: '/eligibility',
  },
  {
    __component: 'contact-page.fun-stats-section' as const,
    eyebrow: 'Fun Stats & Impact',
    backgroundImage: FUN_STATS_IMAGE,
    stats: [
      {
        value: '₦7.86B+',
        label: 'Active Pipeline',
        description:
          'Mobilised from domestic institutional investors and pension funds into the real economy.',
      },
      {
        value: '7,500+ tCO₂e',
        label: 'Mitigated',
        description:
          'Tonnes of annual carbon emissions avoided across active clean energy installations.',
      },
      {
        value: '100% Green',
        label: 'Certified',
        description:
          'Project transactions fully certified under Climate Bonds Initiative (CBI) standards.',
      },
      {
        value: '39,438',
        label: 'Connections',
        description:
          'Projected household and SME clean energy connections powered across Nigeria.',
      },
    ],
  },
  {
    __component: 'contact-page.enquiry-form-section' as const,
    heading: 'Send an Enquiry',
    readinessAlertLabelPrefix: 'Readiness Verified:',
    readinessAlertLabelSuffix: '%',
    qualifiedAlertBody:
      'Form pre-filled for priority guarantee review. Complete and submit the enquiry details below.',
    technicalAssistanceAlertBody:
      'Form pre-filled for Technical Assistance application. Complete and submit the enquiry details below.',
    roleTabs: [
      { value: 'developer', label: 'Developer' },
      { value: 'investor', label: 'Investor' },
      { value: 'donor', label: 'Donor / Partner' },
    ],
    fullNameLabel: 'Full Name',
    organizationLabel: 'Organization',
    emailAddressLabel: 'Email Address',
    technologyTypeLabel: 'Technology Type',
    capacityLabel: 'Project Capacity (KW)',
    institutionTypeLabel: 'Institution Type',
    investmentTrancheLabel: 'Target Investment Tranche',
    messageLabel: 'Message / Enquiry Details',
    technologyOptions: [
      { label: 'Solar Mini-Grid' },
      { label: 'Telecom Solar Hubs' },
      { label: 'Agro-Processing Solar' },
      { label: 'Clean Cooking' },
      { label: 'Low-Carbon Public Transport' },
      { label: 'Other Green Tech' },
    ],
    institutionOptions: [
      { label: 'Pension Fund Administrator (PFA)' },
      { label: 'Insurance Company' },
      { label: 'Asset Management Fund' },
      { label: 'Development Partner / DFI' },
      { label: 'Other Corporate Investor' },
    ],
    prefillIntroTemplate:
      'Hello CFBF Team,\n\nWe have completed the Project Readiness Assessment on your website. Our project achieved a readiness score of ${score}%.\n\n',
    prefillQualifiedBody:
      'Our project is classified as "Highly Qualified for Guarantees." We satisfy all core operational, financial, and ESG criteria, and would like to initiate the pre-qualification check and mandate letter process.',
    prefillTechnicalAssistanceBody:
      'Our project is classified as "Eligible for Technical Assistance." We meet core requirements but need project preparation support (e.g. expanding paying customer base, operational tracking) to achieve guarantee-readiness.',
    technologyParamMap: [
      { paramValue: 'solar-grid', label: 'Solar Mini-Grid' },
      { paramValue: 'cold-storage', label: 'Agro-Processing Solar' },
      { paramValue: 'clean-cooking', label: 'Clean Cooking' },
      { paramValue: 'low-carbon-transport', label: 'Low-Carbon Public Transport' },
    ],
    defaultTechnologyLabel: 'Other Green Tech',
    submitLabel: 'Send Enquiry Message',
  },
  {
    __component: 'contact-page.submission-success-section' as const,
    heading: 'Enquiry Submitted!',
    description:
      'Thank you for reaching out to the Climate Finance Blending Facility. An investment analyst or partnership officer will contact you within 3 business days.',
    primaryCtaLabel: 'Return Home',
    primaryCtaHref: '/',
    secondaryCtaLabel: 'Send another message',
  },
  {
    __component: 'contact-page.next-steps-section' as const,
    eyebrow: 'Next steps',
    headingPartOne: 'Explore the ',
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
    __component: 'contact-page.download-cta-section' as const,
    eyebrow: 'Brochure & prospectus',
    heading: 'Get the technical specifications of the facility',
    description:
      'Download our comprehensive brochure outlining fund structure, eligibility guidelines, co-financing terms, and regional deployment targets.',
    ctaLabel: 'Download Brochure PDF',
    fileHref: '/download.pdf',
    downloadFileName: 'CFBF_Brochure.pdf',
    backgroundImage: BROCHURE_IMAGE,
  },
];
