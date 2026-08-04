import type { Schema, Struct } from '@strapi/strapi';

export interface AboutPageAudienceSection extends Struct.ComponentSchema {
  collectionName: 'components_about_page_audience_sections';
  info: {
    description: '';
    displayName: 'Audience Section';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    headingPrimary: Schema.Attribute.String;
    headingSecondary: Schema.Attribute.String;
    journeySuffix: Schema.Attribute.String;
    personas: Schema.Attribute.Component<'about-page.persona-item', true>;
    questionsHeading: Schema.Attribute.String;
  };
}

export interface AboutPageBentoCaptionItem extends Struct.ComponentSchema {
  collectionName: 'components_about_page_bento_caption_items';
  info: {
    description: '';
    displayName: 'Bento Caption Item';
  };
  attributes: {
    image: Schema.Attribute.String;
    image_alt_text: Schema.Attribute.String;
    label: Schema.Attribute.String;
  };
}

export interface AboutPageCapitalStackSection extends Struct.ComponentSchema {
  collectionName: 'components_about_page_capital_stack_sections';
  info: {
    description: '';
    displayName: 'Capital Stack Section';
  };
  attributes: {
    bars: Schema.Attribute.Component<'about-page.stack-bar-item', true>;
    collapsedBody: Schema.Attribute.Text;
    collapseLabel: Schema.Attribute.String;
    expandedBody: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    headingPrimary: Schema.Attribute.String;
    headingSecondary: Schema.Attribute.String;
    launchLabel: Schema.Attribute.String;
    maxLabel: Schema.Attribute.String;
    minLabel: Schema.Attribute.String;
    segments: Schema.Attribute.Component<'about-page.stack-segment-item', true>;
    sliderLabel: Schema.Attribute.String;
    sliderUnitLabel: Schema.Attribute.String;
    totalLabel: Schema.Attribute.String;
    totalSuffix: Schema.Attribute.String;
    wrapBadge: Schema.Attribute.String;
  };
}

export interface AboutPageDownloadCtaSection extends Struct.ComponentSchema {
  collectionName: 'components_about_page_download_cta_sections';
  info: {
    description: '';
    displayName: 'Download CTA Section';
  };
  attributes: {
    backgroundImage: Schema.Attribute.String;
    backgroundImage_alt_text: Schema.Attribute.String;
    body: Schema.Attribute.Text;
    buttonHref: Schema.Attribute.String;
    buttonLabel: Schema.Attribute.String;
    downloadFileName: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String;
  };
}

export interface AboutPageEnergyMapSection extends Struct.ComponentSchema {
  collectionName: 'components_about_page_energy_map_sections';
  info: {
    description: '';
    displayName: 'Energy Map Section';
  };
  attributes: {
    body: Schema.Attribute.Text;
    colHeaderConnections: Schema.Attribute.String;
    colHeaderGap: Schema.Attribute.String;
    colHeaderRank: Schema.Attribute.String;
    colHeaderState: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    headingPrimary: Schema.Attribute.String;
    headingSecondary: Schema.Attribute.String;
    legendLabel: Schema.Attribute.String;
    legendScaleLabel: Schema.Attribute.String;
    mapSvg: Schema.Attribute.Text;
    sourceNote: Schema.Attribute.Text;
    states: Schema.Attribute.Component<'about-page.map-state-item', true>;
    tabs: Schema.Attribute.Component<'about-page.map-tab-item', true>;
    tooltipConnectionsLabel: Schema.Attribute.String;
    tooltipFundingGapLabel: Schema.Attribute.String;
    tooltipNeedIndexLabel: Schema.Attribute.String;
    tooltipUnservedLabel: Schema.Attribute.String;
  };
}

export interface AboutPageFrameworkCardItem extends Struct.ComponentSchema {
  collectionName: 'components_about_page_framework_card_items';
  info: {
    description: '';
    displayName: 'Framework Card Item';
  };
  attributes: {
    bgImage: Schema.Attribute.String;
    bgImage_alt_text: Schema.Attribute.String;
    body: Schema.Attribute.Text;
    cardNumber: Schema.Attribute.String;
    tag: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface AboutPageFrameworkSection extends Struct.ComponentSchema {
  collectionName: 'components_about_page_framework_sections';
  info: {
    description: '';
    displayName: 'Framework Section';
  };
  attributes: {
    cards: Schema.Attribute.Component<'about-page.framework-card-item', true>;
    eyebrow: Schema.Attribute.String;
    headingPrimary: Schema.Attribute.String;
    headingSecondary: Schema.Attribute.String;
    intro: Schema.Attribute.Text;
  };
}

export interface AboutPageHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_about_page_hero_sections';
  info: {
    description: '';
    displayName: 'Hero Section';
  };
  attributes: {
    backgroundImage: Schema.Attribute.String;
    backgroundImage_alt_text: Schema.Attribute.String;
    bodyPartOne: Schema.Attribute.Text;
    bodyPartTwo: Schema.Attribute.Text;
    breadcrumbLabel: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    headingHighlight: Schema.Attribute.String;
    headingItalic: Schema.Attribute.String;
    headingPartOne: Schema.Attribute.String;
    headingPartTwo: Schema.Attribute.String;
    sliderStats: Schema.Attribute.Component<
      'about-page.hero-slider-stat-item',
      true
    >;
    statImage: Schema.Attribute.String;
    statImage_alt_text: Schema.Attribute.String;
    stats: Schema.Attribute.Component<'about-page.hero-stat-item', true>;
  };
}

export interface AboutPageHeroSliderStatItem extends Struct.ComponentSchema {
  collectionName: 'components_about_page_hero_slider_stat_items';
  info: {
    description: '';
    displayName: 'Hero Slider Stat Item';
  };
  attributes: {
    label: Schema.Attribute.String;
    sub: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface AboutPageHeroStatItem extends Struct.ComponentSchema {
  collectionName: 'components_about_page_hero_stat_items';
  info: {
    description: '';
    displayName: 'Hero Stat Item';
  };
  attributes: {
    cardNumber: Schema.Attribute.String;
    label: Schema.Attribute.String;
    sub: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface AboutPageMandateNumberItem extends Struct.ComponentSchema {
  collectionName: 'components_about_page_mandate_number_items';
  info: {
    description: '';
    displayName: 'Mandate Number Item';
  };
  attributes: {
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface AboutPageMandateParagraphItem extends Struct.ComponentSchema {
  collectionName: 'components_about_page_mandate_paragraph_items';
  info: {
    description: '';
    displayName: 'Mandate Paragraph Item';
  };
  attributes: {
    text: Schema.Attribute.Text;
  };
}

export interface AboutPageMandateSection extends Struct.ComponentSchema {
  collectionName: 'components_about_page_mandate_sections';
  info: {
    description: '';
    displayName: 'Mandate Section';
  };
  attributes: {
    bentoVideo: Schema.Attribute.String;
    body: Schema.Attribute.Text;
    captions: Schema.Attribute.Component<'about-page.bento-caption-item', true>;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    mandateHeading: Schema.Attribute.String;
    numbers: Schema.Attribute.Component<'about-page.mandate-number-item', true>;
    numbersLabel: Schema.Attribute.String;
    paragraphs: Schema.Attribute.Component<
      'about-page.mandate-paragraph-item',
      true
    >;
  };
}

export interface AboutPageMapStateItem extends Struct.ComponentSchema {
  collectionName: 'components_about_page_map_state_items';
  info: {
    description: '';
    displayName: 'Map State Item';
  };
  attributes: {
    connections: Schema.Attribute.String;
    fundingGap: Schema.Attribute.String;
    grid: Schema.Attribute.Decimal;
    mapId: Schema.Attribute.String;
    miniGrid: Schema.Attribute.Decimal;
    name: Schema.Attribute.String;
    standalone: Schema.Attribute.Decimal;
    unservedPct: Schema.Attribute.Integer;
  };
}

export interface AboutPageMapTabItem extends Struct.ComponentSchema {
  collectionName: 'components_about_page_map_tab_items';
  info: {
    description: '';
    displayName: 'Map Tab Item';
  };
  attributes: {
    label: Schema.Attribute.String;
    tabId: Schema.Attribute.String;
  };
}

export interface AboutPageMarketBentoCardItem extends Struct.ComponentSchema {
  collectionName: 'components_about_page_market_bento_card_items';
  info: {
    description: '';
    displayName: 'Market Bento Card Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    footer: Schema.Attribute.Text;
    value: Schema.Attribute.String;
  };
}

export interface AboutPageMarketSection extends Struct.ComponentSchema {
  collectionName: 'components_about_page_market_sections';
  info: {
    description: '';
    displayName: 'Market Section';
  };
  attributes: {
    bentoImage: Schema.Attribute.String;
    bentoImage_alt_text: Schema.Attribute.String;
    bodyOne: Schema.Attribute.Text;
    bodyTwo: Schema.Attribute.Text;
    cards: Schema.Attribute.Component<
      'about-page.market-bento-card-item',
      true
    >;
    eyebrow: Schema.Attribute.String;
    headingPrimary: Schema.Attribute.String;
    headingSecondary: Schema.Attribute.String;
  };
}

export interface AboutPageMilestoneEventItem extends Struct.ComponentSchema {
  collectionName: 'components_about_page_milestone_event_items';
  info: {
    description: '';
    displayName: 'Milestone Event Item';
  };
  attributes: {
    date: Schema.Attribute.String;
    text: Schema.Attribute.Text;
  };
}

export interface AboutPageMilestoneItem extends Struct.ComponentSchema {
  collectionName: 'components_about_page_milestone_items';
  info: {
    description: '';
    displayName: 'Milestone Item';
  };
  attributes: {
    events: Schema.Attribute.Component<'about-page.milestone-event-item', true>;
    image: Schema.Attribute.String;
    image_alt_text: Schema.Attribute.String;
    label: Schema.Attribute.Text;
    period: Schema.Attribute.String;
    year: Schema.Attribute.String;
  };
}

export interface AboutPageMilestonesSection extends Struct.ComponentSchema {
  collectionName: 'components_about_page_milestones_sections';
  info: {
    description: '';
    displayName: 'Milestones Section';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    headingPrimary: Schema.Attribute.String;
    headingSecondary: Schema.Attribute.String;
    milestones: Schema.Attribute.Component<'about-page.milestone-item', true>;
    railYears: Schema.Attribute.Component<'about-page.rail-year-item', true>;
  };
}

export interface AboutPageNavLinkItem extends Struct.ComponentSchema {
  collectionName: 'components_about_page_nav_link_items';
  info: {
    description: '';
    displayName: 'Nav Link Item';
  };
  attributes: {
    label: Schema.Attribute.String;
    sectionId: Schema.Attribute.String;
  };
}

export interface AboutPageNextStepsSection extends Struct.ComponentSchema {
  collectionName: 'components_about_page_next_steps_sections';
  info: {
    description: '';
    displayName: 'Next Steps Section';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    headingPrimary: Schema.Attribute.String;
    headingSecondary: Schema.Attribute.String;
    links: Schema.Attribute.Component<'about-page.portal-link-item', true>;
  };
}

export interface AboutPagePartnerGroupItem extends Struct.ComponentSchema {
  collectionName: 'components_about_page_partner_group_items';
  info: {
    description: '';
    displayName: 'Partner Group Item';
  };
  attributes: {
    category: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    partners: Schema.Attribute.Component<'about-page.partner-item', true>;
  };
}

export interface AboutPagePartnerItem extends Struct.ComponentSchema {
  collectionName: 'components_about_page_partner_items';
  info: {
    description: '';
    displayName: 'Partner Item';
  };
  attributes: {
    logo: Schema.Attribute.String;
    logo_alt_text: Schema.Attribute.String;
    logoColour: Schema.Attribute.String;
    logoColour_alt_text: Schema.Attribute.String;
    logoText: Schema.Attribute.String;
    name: Schema.Attribute.String;
    role: Schema.Attribute.String;
  };
}

export interface AboutPagePartnersSection extends Struct.ComponentSchema {
  collectionName: 'components_about_page_partners_sections';
  info: {
    description: '';
    displayName: 'Partners Section';
  };
  attributes: {
    ctaHoverLabel: Schema.Attribute.String;
    ctaHref: Schema.Attribute.String;
    ctaLabel: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    groups: Schema.Attribute.Component<'about-page.partner-group-item', true>;
    headingPrimary: Schema.Attribute.String;
    headingSecondary: Schema.Attribute.String;
  };
}

export interface AboutPagePersonaItem extends Struct.ComponentSchema {
  collectionName: 'components_about_page_persona_items';
  info: {
    description: '';
    displayName: 'Persona Item';
  };
  attributes: {
    ctaHref: Schema.Attribute.String;
    ctaLabel: Schema.Attribute.String;
    intro: Schema.Attribute.Text;
    questions: Schema.Attribute.Component<'about-page.persona-qa-item', true>;
    tabLabel: Schema.Attribute.String;
    tagline: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface AboutPagePersonaQaItem extends Struct.ComponentSchema {
  collectionName: 'components_about_page_persona_qa_items';
  info: {
    description: '';
    displayName: 'Persona QA Item';
  };
  attributes: {
    answer: Schema.Attribute.Text;
    question: Schema.Attribute.String;
  };
}

export interface AboutPagePortalLinkItem extends Struct.ComponentSchema {
  collectionName: 'components_about_page_portal_link_items';
  info: {
    description: '';
    displayName: 'Portal Link Item';
  };
  attributes: {
    href: Schema.Attribute.String;
    kicker: Schema.Attribute.String;
    sub: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface AboutPageRailYearItem extends Struct.ComponentSchema {
  collectionName: 'components_about_page_rail_year_items';
  info: {
    description: '';
    displayName: 'Rail Year Item';
  };
  attributes: {
    label: Schema.Attribute.String;
  };
}

export interface AboutPageStackBarItem extends Struct.ComponentSchema {
  collectionName: 'components_about_page_stack_bar_items';
  info: {
    description: '';
    displayName: 'Stack Bar Item';
  };
  attributes: {
    label: Schema.Attribute.String;
    percent: Schema.Attribute.String;
  };
}

export interface AboutPageStackSegmentItem extends Struct.ComponentSchema {
  collectionName: 'components_about_page_stack_segment_items';
  info: {
    description: '';
    displayName: 'Stack Segment Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface AboutPageStickyNavSection extends Struct.ComponentSchema {
  collectionName: 'components_about_page_sticky_nav_sections';
  info: {
    description: '';
    displayName: 'Sticky Nav Section';
  };
  attributes: {
    links: Schema.Attribute.Component<'about-page.nav-link-item', true>;
  };
}

export interface AboutPageStructuredDataSection extends Struct.ComponentSchema {
  collectionName: 'components_about_page_structured_data_sections';
  info: {
    description: '';
    displayName: 'Structured Data Section';
  };
  attributes: {
    dcCreator: Schema.Attribute.String;
    dcDescription: Schema.Attribute.Text;
    dcLanguage: Schema.Attribute.String;
    dcPublisher: Schema.Attribute.String;
    dcSubject: Schema.Attribute.String;
    dcTitle: Schema.Attribute.String;
    dcType: Schema.Attribute.String;
    jsonLdDescription: Schema.Attribute.Text;
    jsonLdName: Schema.Attribute.String;
    jsonLdPublisherName: Schema.Attribute.String;
    jsonLdType: Schema.Attribute.String;
    loadingLabel: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text;
    pageTitle: Schema.Attribute.String;
  };
}

export interface ContactPageDownloadCtaSection extends Struct.ComponentSchema {
  collectionName: 'components_contact_page_download_cta_sections';
  info: {
    description: '';
    displayName: 'Download CTA Section';
  };
  attributes: {
    backgroundImage: Schema.Attribute.String;
    ctaLabel: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    downloadFileName: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    fileHref: Schema.Attribute.String;
    heading: Schema.Attribute.String;
  };
}

export interface ContactPageEligibilityReminderSection
  extends Struct.ComponentSchema {
  collectionName: 'components_contact_page_eligibility_reminder_sections';
  info: {
    description: '';
    displayName: 'Eligibility Reminder Section';
  };
  attributes: {
    ctaHref: Schema.Attribute.String;
    ctaLabel: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String;
  };
}

export interface ContactPageEnquiryFormSection extends Struct.ComponentSchema {
  collectionName: 'components_contact_page_enquiry_form_sections';
  info: {
    description: '';
    displayName: 'Enquiry Form Section';
  };
  attributes: {
    capacityLabel: Schema.Attribute.String;
    defaultTechnologyLabel: Schema.Attribute.String;
    emailAddressLabel: Schema.Attribute.String;
    fullNameLabel: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    institutionOptions: Schema.Attribute.Component<
      'contact-page.select-option-item',
      true
    >;
    institutionTypeLabel: Schema.Attribute.String;
    investmentTrancheLabel: Schema.Attribute.String;
    messageLabel: Schema.Attribute.String;
    organizationLabel: Schema.Attribute.String;
    prefillIntroTemplate: Schema.Attribute.Text;
    prefillQualifiedBody: Schema.Attribute.Text;
    prefillTechnicalAssistanceBody: Schema.Attribute.Text;
    qualifiedAlertBody: Schema.Attribute.Text;
    readinessAlertLabelPrefix: Schema.Attribute.String;
    readinessAlertLabelSuffix: Schema.Attribute.String;
    roleTabs: Schema.Attribute.Component<'contact-page.role-tab-item', true>;
    submitLabel: Schema.Attribute.String;
    technicalAssistanceAlertBody: Schema.Attribute.Text;
    technologyOptions: Schema.Attribute.Component<
      'contact-page.select-option-item',
      true
    >;
    technologyParamMap: Schema.Attribute.Component<
      'contact-page.tech-mapping-item',
      true
    >;
    technologyTypeLabel: Schema.Attribute.String;
  };
}

export interface ContactPageFacilityContactsSection
  extends Struct.ComponentSchema {
  collectionName: 'components_contact_page_facility_contacts_sections';
  info: {
    description: '';
    displayName: 'Facility Contacts Section';
  };
  attributes: {
    emailAddress: Schema.Attribute.String;
    emailHref: Schema.Attribute.String;
    emailLabel: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    officeAddressLineOne: Schema.Attribute.String;
    officeAddressLineTwo: Schema.Attribute.String;
    officeLocationLabel: Schema.Attribute.String;
    phoneHref: Schema.Attribute.String;
    phoneLabel: Schema.Attribute.String;
    phoneNumber: Schema.Attribute.String;
  };
}

export interface ContactPageFunStatItem extends Struct.ComponentSchema {
  collectionName: 'components_contact_page_fun_stat_items';
  info: {
    description: '';
    displayName: 'Fun Stat Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface ContactPageFunStatsSection extends Struct.ComponentSchema {
  collectionName: 'components_contact_page_fun_stats_sections';
  info: {
    description: '';
    displayName: 'Fun Stats Section';
  };
  attributes: {
    backgroundImage: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    stats: Schema.Attribute.Component<'contact-page.fun-stat-item', true>;
  };
}

export interface ContactPageHeroCardItem extends Struct.ComponentSchema {
  collectionName: 'components_contact_page_hero_card_items';
  info: {
    description: '';
    displayName: 'Hero Card Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    index: Schema.Attribute.String;
    theme: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ContactPageHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_contact_page_hero_sections';
  info: {
    description: '';
    displayName: 'Hero Section';
  };
  attributes: {
    backgroundImage: Schema.Attribute.String;
    breadcrumbLabel: Schema.Attribute.String;
    cards: Schema.Attribute.Component<'contact-page.hero-card-item', true>;
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    headingHighlight: Schema.Attribute.String;
    headingPartOne: Schema.Attribute.String;
  };
}

export interface ContactPageNextStepsSection extends Struct.ComponentSchema {
  collectionName: 'components_contact_page_next_steps_sections';
  info: {
    description: '';
    displayName: 'Next Steps Section';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    headingItalic: Schema.Attribute.String;
    headingPartOne: Schema.Attribute.String;
    links: Schema.Attribute.Component<'contact-page.portal-link-item', true>;
  };
}

export interface ContactPagePortalLinkItem extends Struct.ComponentSchema {
  collectionName: 'components_contact_page_portal_link_items';
  info: {
    description: '';
    displayName: 'Portal Link Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    href: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ContactPageRoleTabItem extends Struct.ComponentSchema {
  collectionName: 'components_contact_page_role_tab_items';
  info: {
    description: '';
    displayName: 'Role Tab Item';
  };
  attributes: {
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface ContactPageSelectOptionItem extends Struct.ComponentSchema {
  collectionName: 'components_contact_page_select_option_items';
  info: {
    description: '';
    displayName: 'Select Option Item';
  };
  attributes: {
    label: Schema.Attribute.String;
  };
}

export interface ContactPageStructuredDataSection
  extends Struct.ComponentSchema {
  collectionName: 'components_contact_page_structured_data_sections';
  info: {
    description: '';
    displayName: 'Structured Data Section';
  };
  attributes: {
    jsonLdDescription: Schema.Attribute.Text;
    jsonLdName: Schema.Attribute.String;
    jsonLdPublisherName: Schema.Attribute.String;
    jsonLdType: Schema.Attribute.String;
    loadingLabel: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text;
    pageTitle: Schema.Attribute.String;
  };
}

export interface ContactPageSubmissionSuccessSection
  extends Struct.ComponentSchema {
  collectionName: 'components_contact_page_submission_success_sections';
  info: {
    description: '';
    displayName: 'Submission Success Section';
  };
  attributes: {
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
    primaryCtaHref: Schema.Attribute.String;
    primaryCtaLabel: Schema.Attribute.String;
    secondaryCtaLabel: Schema.Attribute.String;
  };
}

export interface ContactPageTechMappingItem extends Struct.ComponentSchema {
  collectionName: 'components_contact_page_tech_mapping_items';
  info: {
    description: '';
    displayName: 'Tech Mapping Item';
  };
  attributes: {
    label: Schema.Attribute.String;
    paramValue: Schema.Attribute.String;
  };
}

export interface EligibilityPageAssessmentChromeSection
  extends Struct.ComponentSchema {
  collectionName: 'components_eligibility_page_assessment_chrome_sections';
  info: {
    description: '';
    displayName: 'Assessment Chrome Section';
  };
  attributes: {
    backLabel: Schema.Attribute.String;
    cancelLabel: Schema.Attribute.String;
    nextLabel: Schema.Attribute.String;
    stepCounterMiddle: Schema.Attribute.String;
    stepCounterPrefix: Schema.Attribute.String;
    stepCounterTotal: Schema.Attribute.String;
    summaryBadge: Schema.Attribute.String;
  };
}

export interface EligibilityPageAssessmentLogRowItem
  extends Struct.ComponentSchema {
  collectionName: 'components_eligibility_page_assessment_log_row_items';
  info: {
    description: '';
    displayName: 'Assessment Log Row Item';
  };
  attributes: {
    failLabel: Schema.Attribute.String;
    label: Schema.Attribute.String;
    passLabel: Schema.Attribute.String;
  };
}

export interface EligibilityPageAssessmentOptionItem
  extends Struct.ComponentSchema {
  collectionName: 'components_eligibility_page_assessment_option_items';
  info: {
    description: '';
    displayName: 'Assessment Option Item';
  };
  attributes: {
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface EligibilityPageAssessmentOutcomeItem
  extends Struct.ComponentSchema {
  collectionName: 'components_eligibility_page_assessment_outcome_items';
  info: {
    description: '';
    displayName: 'Assessment Outcome Item';
  };
  attributes: {
    ctaLabel: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    status: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface EligibilityPageAssessmentQuestionItem
  extends Struct.ComponentSchema {
  collectionName: 'components_eligibility_page_assessment_question_items';
  info: {
    description: '';
    displayName: 'Assessment Question Item';
  };
  attributes: {
    helperText: Schema.Attribute.Text;
    label: Schema.Attribute.Text;
    options: Schema.Attribute.Component<
      'eligibility-page.assessment-option-item',
      true
    >;
    requiredMarker: Schema.Attribute.String;
    stepNumber: Schema.Attribute.String;
  };
}

export interface EligibilityPageAssessmentResultSection
  extends Struct.ComponentSchema {
  collectionName: 'components_eligibility_page_assessment_result_sections';
  info: {
    description: '';
    displayName: 'Assessment Result Section';
  };
  attributes: {
    excludedCtaLabel: Schema.Attribute.String;
    logHeading: Schema.Attribute.String;
    logRows: Schema.Attribute.Component<
      'eligibility-page.assessment-log-row-item',
      true
    >;
    outcomes: Schema.Attribute.Component<
      'eligibility-page.assessment-outcome-item',
      true
    >;
    readinessLabel: Schema.Attribute.String;
    restartLabel: Schema.Attribute.String;
  };
}

export interface EligibilityPageAssessmentStepItem
  extends Struct.ComponentSchema {
  collectionName: 'components_eligibility_page_assessment_step_items';
  info: {
    description: '';
    displayName: 'Assessment Step Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    stepNumber: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface EligibilityPageAssessmentStepsSection
  extends Struct.ComponentSchema {
  collectionName: 'components_eligibility_page_assessment_steps_sections';
  info: {
    description: '';
    displayName: 'Assessment Steps Section';
  };
  attributes: {
    questions: Schema.Attribute.Component<
      'eligibility-page.assessment-question-item',
      true
    >;
    steps: Schema.Attribute.Component<
      'eligibility-page.assessment-step-item',
      true
    >;
  };
}

export interface EligibilityPageCriteriaCardItem
  extends Struct.ComponentSchema {
  collectionName: 'components_eligibility_page_criteria_card_items';
  info: {
    description: '';
    displayName: 'Criteria Card Item';
  };
  attributes: {
    body: Schema.Attribute.Text;
    footerTag: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    listItems: Schema.Attribute.Component<
      'eligibility-page.criteria-list-item',
      true
    >;
    stats: Schema.Attribute.Component<
      'eligibility-page.criteria-stat-item',
      true
    >;
    subNote: Schema.Attribute.Text;
  };
}

export interface EligibilityPageCriteriaListItem
  extends Struct.ComponentSchema {
  collectionName: 'components_eligibility_page_criteria_list_items';
  info: {
    description: '';
    displayName: 'Criteria List Item';
  };
  attributes: {
    text: Schema.Attribute.String;
  };
}

export interface EligibilityPageCriteriaPillarsSection
  extends Struct.ComponentSchema {
  collectionName: 'components_eligibility_page_criteria_pillars_sections';
  info: {
    description: '';
    displayName: 'Criteria Pillars Section';
  };
  attributes: {
    cards: Schema.Attribute.Component<
      'eligibility-page.criteria-card-item',
      true
    >;
    eyebrow: Schema.Attribute.String;
    headingHighlight: Schema.Attribute.String;
    headingPartOne: Schema.Attribute.String;
  };
}

export interface EligibilityPageCriteriaStatItem
  extends Struct.ComponentSchema {
  collectionName: 'components_eligibility_page_criteria_stat_items';
  info: {
    description: '';
    displayName: 'Criteria Stat Item';
  };
  attributes: {
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface EligibilityPageFinalCtaSection extends Struct.ComponentSchema {
  collectionName: 'components_eligibility_page_final_cta_sections';
  info: {
    description: '';
    displayName: 'Final CTA Section';
  };
  attributes: {
    backgroundImage: Schema.Attribute.String;
    body: Schema.Attribute.Text;
    downloadCtaHref: Schema.Attribute.String;
    downloadCtaLabel: Schema.Attribute.String;
    downloadFileName: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    headingHighlight: Schema.Attribute.String;
    headingPartOne: Schema.Attribute.String;
    primaryCtaHref: Schema.Attribute.String;
    primaryCtaLabel: Schema.Attribute.String;
  };
}

export interface EligibilityPageHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_eligibility_page_hero_sections';
  info: {
    description: '';
    displayName: 'Hero Section';
  };
  attributes: {
    backgroundImage: Schema.Attribute.String;
    breadcrumbLabel: Schema.Attribute.String;
    currentPageLabel: Schema.Attribute.String;
    descriptionPrimary: Schema.Attribute.Text;
    descriptionSecondaryLinkHref: Schema.Attribute.String;
    descriptionSecondaryLinkLabel: Schema.Attribute.String;
    descriptionSecondaryPrefix: Schema.Attribute.Text;
    descriptionSecondarySuffix: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    headingHighlight: Schema.Attribute.String;
    headingPartOne: Schema.Attribute.String;
    sectors: Schema.Attribute.Component<'eligibility-page.sector-item', true>;
    sectorsLabel: Schema.Attribute.String;
  };
}

export interface EligibilityPageNextStepsSection
  extends Struct.ComponentSchema {
  collectionName: 'components_eligibility_page_next_steps_sections';
  info: {
    description: '';
    displayName: 'Next Steps Section';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    headingItalic: Schema.Attribute.String;
    headingPartOne: Schema.Attribute.String;
    links: Schema.Attribute.Component<
      'eligibility-page.portal-link-item',
      true
    >;
  };
}

export interface EligibilityPagePortalLinkItem extends Struct.ComponentSchema {
  collectionName: 'components_eligibility_page_portal_link_items';
  info: {
    description: '';
    displayName: 'Portal Link Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    href: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface EligibilityPageSectorItem extends Struct.ComponentSchema {
  collectionName: 'components_eligibility_page_sector_items';
  info: {
    description: '';
    displayName: 'Sector Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    sdgBadge: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface EligibilityPageStructuredDataSection
  extends Struct.ComponentSchema {
  collectionName: 'components_eligibility_page_structured_data_sections';
  info: {
    description: '';
    displayName: 'Structured Data Section';
  };
  attributes: {
    dcCreator: Schema.Attribute.String;
    dcDescription: Schema.Attribute.Text;
    dcLanguage: Schema.Attribute.String;
    dcPublisher: Schema.Attribute.String;
    dcSubject: Schema.Attribute.String;
    dcTitle: Schema.Attribute.String;
    dcType: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text;
    pageTitle: Schema.Attribute.String;
    schemaDescription: Schema.Attribute.Text;
    schemaName: Schema.Attribute.String;
    schemaPublisherName: Schema.Attribute.String;
  };
}

export interface EligibilityPageTimelineStepItem
  extends Struct.ComponentSchema {
  collectionName: 'components_eligibility_page_timeline_step_items';
  info: {
    description: '';
    displayName: 'Timeline Step Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    stepNumber: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface EligibilityPageTimelineWorkflowSection
  extends Struct.ComponentSchema {
  collectionName: 'components_eligibility_page_timeline_workflow_sections';
  info: {
    description: '';
    displayName: 'Timeline Workflow Section';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    headingHighlight: Schema.Attribute.String;
    headingPartOne: Schema.Attribute.String;
    stepLabelPrefix: Schema.Attribute.String;
    steps: Schema.Attribute.Component<
      'eligibility-page.timeline-step-item',
      true
    >;
  };
}

export interface HomePageAboutSection extends Struct.ComponentSchema {
  collectionName: 'components_home_page_about_sections';
  info: {
    description: '';
    displayName: 'About Section';
  };
  attributes: {
    body: Schema.Attribute.Text;
    ctaHref: Schema.Attribute.String;
    ctaLabel: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    headingPrimary: Schema.Attribute.String;
    headingSecondary: Schema.Attribute.String;
    image: Schema.Attribute.String;
    image_alt_text: Schema.Attribute.String;
    partners: Schema.Attribute.Component<'home-page.partner-item', true>;
    partnersHeading: Schema.Attribute.String;
    statDescription: Schema.Attribute.Text;
    statValue: Schema.Attribute.String;
  };
}

export interface HomePageCategoryItem extends Struct.ComponentSchema {
  collectionName: 'components_home_page_category_items';
  info: {
    description: '';
    displayName: 'Category Item';
  };
  attributes: {
    label: Schema.Attribute.String;
  };
}

export interface HomePageFeatureCardItem extends Struct.ComponentSchema {
  collectionName: 'components_home_page_feature_card_items';
  info: {
    description: '';
    displayName: 'Feature Card Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface HomePageGallerySlideItem extends Struct.ComponentSchema {
  collectionName: 'components_home_page_gallery_slide_items';
  info: {
    description: '';
    displayName: 'Gallery Slide Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.String;
    image_alt_text: Schema.Attribute.String;
  };
}

export interface HomePageHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_home_page_hero_sections';
  info: {
    description: '';
    displayName: 'Hero Section';
  };
  attributes: {
    backgroundImage: Schema.Attribute.String;
    backgroundImage_alt_text: Schema.Attribute.String;
    backgroundVideo: Schema.Attribute.String;
    certificationBadge: Schema.Attribute.String;
    certificationBadge_alt_text: Schema.Attribute.String;
    ctaHref: Schema.Attribute.String;
    ctaLabel: Schema.Attribute.String;
    headingPrimary: Schema.Attribute.String;
    headingSecondary: Schema.Attribute.String;
    newsCtaLabel: Schema.Attribute.String;
    stats: Schema.Attribute.Component<'home-page.stat-item', true>;
    subheadline: Schema.Attribute.Text;
  };
}

export interface HomePageImpactSection extends Struct.ComponentSchema {
  collectionName: 'components_home_page_impact_sections';
  info: {
    description: '';
    displayName: 'Impact Section';
  };
  attributes: {
    capacityCtaLabel: Schema.Attribute.String;
    capacityStats: Schema.Attribute.Component<'home-page.stat-item', true>;
    eyebrow: Schema.Attribute.String;
    galleryCtaLabel: Schema.Attribute.String;
    gallerySlides: Schema.Attribute.Component<
      'home-page.gallery-slide-item',
      true
    >;
    headingPrimary: Schema.Attribute.String;
    headingSecondary: Schema.Attribute.String;
    knowledgeHubSubtitle: Schema.Attribute.Text;
    knowledgeHubTitle: Schema.Attribute.String;
    metricCards: Schema.Attribute.Component<'home-page.metric-card-item', true>;
    numbersCtaLabel: Schema.Attribute.String;
    reportCtaLabel: Schema.Attribute.String;
    reportFileHref: Schema.Attribute.String;
    reportFileName: Schema.Attribute.String;
    reports: Schema.Attribute.Component<'home-page.report-item', true>;
    statsCardEyebrow: Schema.Attribute.String;
    tabs: Schema.Attribute.Component<'home-page.tab-item', true>;
    theoryCards: Schema.Attribute.Component<'home-page.theory-card-item', true>;
    theoryEyebrow: Schema.Attribute.String;
    theoryFooterLabel: Schema.Attribute.Text;
    theoryHeadingPrimary: Schema.Attribute.String;
    theoryHeadingSecondary: Schema.Attribute.String;
  };
}

export interface HomePageMapMarkerItem extends Struct.ComponentSchema {
  collectionName: 'components_home_page_map_marker_items';
  info: {
    description: '';
    displayName: 'Map Marker Item';
  };
  attributes: {
    name: Schema.Attribute.String;
    x: Schema.Attribute.String;
    y: Schema.Attribute.String;
  };
}

export interface HomePageMapSection extends Struct.ComponentSchema {
  collectionName: 'components_home_page_map_sections';
  info: {
    description: '';
    displayName: 'Map Section';
  };
  attributes: {
    activeStates: Schema.Attribute.Component<'home-page.map-state-item', true>;
    body: Schema.Attribute.Text;
    categories: Schema.Attribute.Component<'home-page.category-item', true>;
    ctaLabel: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    fsdAfricaLogoSvg: Schema.Attribute.Text;
    headingPrimary: Schema.Attribute.String;
    headingSecondary: Schema.Attribute.String;
    markers: Schema.Attribute.Component<'home-page.map-marker-item', true>;
    statLabel: Schema.Attribute.String;
    statValue: Schema.Attribute.String;
  };
}

export interface HomePageMapStateItem extends Struct.ComponentSchema {
  collectionName: 'components_home_page_map_state_items';
  info: {
    description: '';
    displayName: 'Map State Item';
  };
  attributes: {
    stateId: Schema.Attribute.String;
  };
}

export interface HomePageMetricCardItem extends Struct.ComponentSchema {
  collectionName: 'components_home_page_metric_card_items';
  info: {
    description: '';
    displayName: 'Metric Card Item';
  };
  attributes: {
    image: Schema.Attribute.String;
    image_alt_text: Schema.Attribute.String;
    label: Schema.Attribute.String;
    suffix: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface HomePageNetZeroSection extends Struct.ComponentSchema {
  collectionName: 'components_home_page_net_zero_sections';
  info: {
    description: '';
    displayName: 'Net Zero Section';
  };
  attributes: {
    body: Schema.Attribute.Text;
    cardBody: Schema.Attribute.Text;
    cardSubtitle: Schema.Attribute.String;
    cardTitle: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    features: Schema.Attribute.Component<'home-page.feature-card-item', true>;
    heading: Schema.Attribute.String;
    image: Schema.Attribute.String;
    image_alt_text: Schema.Attribute.String;
  };
}

export interface HomePageNewsArticleItem extends Struct.ComponentSchema {
  collectionName: 'components_home_page_news_article_items';
  info: {
    description: '';
    displayName: 'News Article Item';
  };
  attributes: {
    articleId: Schema.Attribute.String;
    author: Schema.Attribute.String;
    authorAvatar: Schema.Attribute.String;
    authorAvatar_alt_text: Schema.Attribute.String;
    date: Schema.Attribute.String;
    excerpt: Schema.Attribute.Text;
    image: Schema.Attribute.String;
    image_alt_text: Schema.Attribute.String;
    keyContext: Schema.Attribute.Text;
    paragraphs: Schema.Attribute.Component<
      'home-page.news-paragraph-item',
      true
    >;
    readTime: Schema.Attribute.String;
    tag: Schema.Attribute.String;
    themes: Schema.Attribute.Component<'home-page.news-theme-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface HomePageNewsParagraphItem extends Struct.ComponentSchema {
  collectionName: 'components_home_page_news_paragraph_items';
  info: {
    description: '';
    displayName: 'News Paragraph Item';
  };
  attributes: {
    blockType: Schema.Attribute.String;
    caption: Schema.Attribute.Text;
    text: Schema.Attribute.Text;
    url: Schema.Attribute.String;
    url_alt_text: Schema.Attribute.String;
  };
}

export interface HomePageNewsSection extends Struct.ComponentSchema {
  collectionName: 'components_home_page_news_sections';
  info: {
    description: '';
    displayName: 'News Section';
  };
  attributes: {
    articles: Schema.Attribute.Component<'home-page.news-article-item', true>;
    ctaHref: Schema.Attribute.String;
    ctaLabel: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    readArticleLabel: Schema.Attribute.String;
    viewTabs: Schema.Attribute.Component<'home-page.view-tab-item', true>;
  };
}

export interface HomePageNewsThemeItem extends Struct.ComponentSchema {
  collectionName: 'components_home_page_news_theme_items';
  info: {
    description: '';
    displayName: 'News Theme Item';
  };
  attributes: {
    label: Schema.Attribute.String;
  };
}

export interface HomePagePartnerItem extends Struct.ComponentSchema {
  collectionName: 'components_home_page_partner_items';
  info: {
    description: '';
    displayName: 'Partner Item';
  };
  attributes: {
    name: Schema.Attribute.String;
  };
}

export interface HomePageProjectItem extends Struct.ComponentSchema {
  collectionName: 'components_home_page_project_items';
  info: {
    description: '';
    displayName: 'Project Item';
  };
  attributes: {
    capacity: Schema.Attribute.String;
    capital: Schema.Attribute.String;
    category: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.String;
    image_alt_text: Schema.Attribute.String;
    imageOne: Schema.Attribute.String;
    imageOne_alt_text: Schema.Attribute.String;
    imageTwo: Schema.Attribute.String;
    imageTwo_alt_text: Schema.Attribute.String;
    impact: Schema.Attribute.Text;
    location: Schema.Attribute.String;
    problem: Schema.Attribute.Text;
    projectId: Schema.Attribute.String;
    solution: Schema.Attribute.Text;
    title: Schema.Attribute.String;
    year: Schema.Attribute.String;
  };
}

export interface HomePageProjectsSection extends Struct.ComponentSchema {
  collectionName: 'components_home_page_projects_sections';
  info: {
    description: '';
    displayName: 'Projects Section';
  };
  attributes: {
    capacityLabel: Schema.Attribute.String;
    capitalLabel: Schema.Attribute.String;
    categories: Schema.Attribute.Component<'home-page.category-item', true>;
    challengeLabel: Schema.Attribute.String;
    ctaHref: Schema.Attribute.String;
    ctaLabel: Schema.Attribute.String;
    detailCtaLabel: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    impactLabel: Schema.Attribute.String;
    projects: Schema.Attribute.Component<'home-page.project-item', true>;
    solutionLabel: Schema.Attribute.String;
    viewTabs: Schema.Attribute.Component<'home-page.view-tab-item', true>;
  };
}

export interface HomePageReportItem extends Struct.ComponentSchema {
  collectionName: 'components_home_page_report_items';
  info: {
    description: '';
    displayName: 'Report Item';
  };
  attributes: {
    reportId: Schema.Attribute.String;
    size: Schema.Attribute.String;
    tag: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface HomePageSponsorItem extends Struct.ComponentSchema {
  collectionName: 'components_home_page_sponsor_items';
  info: {
    description: '';
    displayName: 'Sponsor Item';
  };
  attributes: {
    name: Schema.Attribute.String;
  };
}

export interface HomePageStatItem extends Struct.ComponentSchema {
  collectionName: 'components_home_page_stat_items';
  info: {
    description: '';
    displayName: 'Stat Item';
  };
  attributes: {
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface HomePageStoriesSection extends Struct.ComponentSchema {
  collectionName: 'components_home_page_stories_sections';
  info: {
    description: '';
    displayName: 'Stories Section';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    locationLabel: Schema.Attribute.String;
    roleLabel: Schema.Attribute.String;
    stories: Schema.Attribute.Component<'home-page.story-item', true>;
    typeLabel: Schema.Attribute.String;
    viewTabs: Schema.Attribute.Component<'home-page.view-tab-item', true>;
  };
}

export interface HomePageStoryItem extends Struct.ComponentSchema {
  collectionName: 'components_home_page_story_items';
  info: {
    description: '';
    displayName: 'Story Item';
  };
  attributes: {
    badge: Schema.Attribute.String;
    duration: Schema.Attribute.String;
    excerpt: Schema.Attribute.Text;
    image: Schema.Attribute.String;
    image_alt_text: Schema.Attribute.String;
    location: Schema.Attribute.String;
    role: Schema.Attribute.String;
    storyType: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface HomePageStructuredDataSection extends Struct.ComponentSchema {
  collectionName: 'components_home_page_structured_data_sections';
  info: {
    description: '';
    displayName: 'Structured Data Section';
  };
  attributes: {
    description: Schema.Attribute.Text;
    logoUrl: Schema.Attribute.String;
    logoUrl_alt_text: Schema.Attribute.String;
    organizationName: Schema.Attribute.String;
    siteName: Schema.Attribute.String;
    sponsors: Schema.Attribute.Component<'home-page.sponsor-item', true>;
    url: Schema.Attribute.String;
  };
}

export interface HomePageTabItem extends Struct.ComponentSchema {
  collectionName: 'components_home_page_tab_items';
  info: {
    description: '';
    displayName: 'Tab Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    label: Schema.Attribute.String;
    tabId: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface HomePageTheoryCardItem extends Struct.ComponentSchema {
  collectionName: 'components_home_page_theory_card_items';
  info: {
    description: '';
    displayName: 'Theory Card Item';
  };
  attributes: {
    cardId: Schema.Attribute.String;
    cardType: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.String;
    image_alt_text: Schema.Attribute.String;
    link: Schema.Attribute.String;
    linkLabel: Schema.Attribute.String;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface HomePageViewTabItem extends Struct.ComponentSchema {
  collectionName: 'components_home_page_view_tab_items';
  info: {
    description: '';
    displayName: 'View Tab Item';
  };
  attributes: {
    label: Schema.Attribute.String;
    tabId: Schema.Attribute.String;
  };
}

export interface HowItWorksPageBulletItem extends Struct.ComponentSchema {
  collectionName: 'components_how_it_works_page_bullet_items';
  info: {
    description: '';
    displayName: 'Bullet Item';
  };
  attributes: {
    text: Schema.Attribute.String;
  };
}

export interface HowItWorksPageCoFinancingPartner
  extends Struct.ComponentSchema {
  collectionName: 'components_how_it_works_page_co_financing_partners';
  info: {
    description: '';
    displayName: 'Co Financing Partner';
  };
  attributes: {
    alt: Schema.Attribute.String;
    href: Schema.Attribute.String;
    srcColour: Schema.Attribute.String;
    srcWhite: Schema.Attribute.String;
  };
}

export interface HowItWorksPageFacilityStructureSection
  extends Struct.ComponentSchema {
  collectionName: 'components_how_it_works_page_facility_structure_sections';
  info: {
    description: '';
    displayName: 'Facility Structure Section';
  };
  attributes: {
    body: Schema.Attribute.Text;
    diagramAlt: Schema.Attribute.Text;
    diagramSrc: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    headingHighlight: Schema.Attribute.String;
    headingPartOne: Schema.Attribute.String;
  };
}

export interface HowItWorksPageFinancingStructureSection
  extends Struct.ComponentSchema {
  collectionName: 'components_how_it_works_page_financing_structure_sections';
  info: {
    description: '';
    displayName: 'Financing Structure Section';
  };
  attributes: {
    anchorFunders: Schema.Attribute.Component<
      'how-it-works-page.partner-logo-item',
      true
    >;
    anchorFundersLabel: Schema.Attribute.String;
    bodyPrimary: Schema.Attribute.Text;
    bodySecondary: Schema.Attribute.Text;
    bullets: Schema.Attribute.Component<'how-it-works-page.bullet-item', true>;
    coFinancingLabel: Schema.Attribute.String;
    coFinancingPartner: Schema.Attribute.Component<
      'how-it-works-page.co-financing-partner',
      false
    >;
    eyebrow: Schema.Attribute.String;
    headingHighlight: Schema.Attribute.String;
    headingPartOne: Schema.Attribute.String;
    taProviders: Schema.Attribute.Component<
      'how-it-works-page.partner-logo-item',
      true
    >;
    taProvidersLabel: Schema.Attribute.String;
    taRotationMs: Schema.Attribute.String;
  };
}

export interface HowItWorksPageHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_how_it_works_page_hero_sections';
  info: {
    description: '';
    displayName: 'Hero Section';
  };
  attributes: {
    backgroundImage: Schema.Attribute.String;
    breadcrumbLabel: Schema.Attribute.String;
    breadcrumbRootLabel: Schema.Attribute.String;
    descriptionPrimary: Schema.Attribute.Text;
    descriptionSecondaryLinkHref: Schema.Attribute.String;
    descriptionSecondaryLinkLabel: Schema.Attribute.String;
    descriptionSecondaryPrefix: Schema.Attribute.Text;
    descriptionSecondarySuffix: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    headingHighlight: Schema.Attribute.String;
    headingPartOne: Schema.Attribute.String;
    stepCardAriaSuffix: Schema.Attribute.String;
    stepCardHref: Schema.Attribute.String;
    steps: Schema.Attribute.Component<'how-it-works-page.hero-step-item', true>;
  };
}

export interface HowItWorksPageHeroStepItem extends Struct.ComponentSchema {
  collectionName: 'components_how_it_works_page_hero_step_items';
  info: {
    description: '';
    displayName: 'Hero Step Item';
  };
  attributes: {
    desc: Schema.Attribute.Text;
    index: Schema.Attribute.String;
    range: Schema.Attribute.String;
    theme: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface HowItWorksPageNextStepsSection extends Struct.ComponentSchema {
  collectionName: 'components_how_it_works_page_next_steps_sections';
  info: {
    description: '';
    displayName: 'Next Steps Section';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    headingItalic: Schema.Attribute.String;
    headingPartOne: Schema.Attribute.String;
    links: Schema.Attribute.Component<
      'how-it-works-page.portal-link-item',
      true
    >;
  };
}

export interface HowItWorksPagePartnerLogoItem extends Struct.ComponentSchema {
  collectionName: 'components_how_it_works_page_partner_logo_items';
  info: {
    description: '';
    displayName: 'Partner Logo Item';
  };
  attributes: {
    alt: Schema.Attribute.String;
    href: Schema.Attribute.String;
    src: Schema.Attribute.String;
  };
}

export interface HowItWorksPagePortalLinkItem extends Struct.ComponentSchema {
  collectionName: 'components_how_it_works_page_portal_link_items';
  info: {
    description: '';
    displayName: 'Portal Link Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    href: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface HowItWorksPageProcessSection extends Struct.ComponentSchema {
  collectionName: 'components_how_it_works_page_process_sections';
  info: {
    description: '';
    displayName: 'Process Section';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    headingHighlight: Schema.Attribute.String;
    headingPartOne: Schema.Attribute.String;
    intro: Schema.Attribute.Text;
    steps: Schema.Attribute.Component<
      'how-it-works-page.process-step-item',
      true
    >;
  };
}

export interface HowItWorksPageProcessStepItem extends Struct.ComponentSchema {
  collectionName: 'components_how_it_works_page_process_step_items';
  info: {
    description: '';
    displayName: 'Process Step Item';
  };
  attributes: {
    desc: Schema.Attribute.Text;
    step: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface HowItWorksPageStructuredDataSection
  extends Struct.ComponentSchema {
  collectionName: 'components_how_it_works_page_structured_data_sections';
  info: {
    description: '';
    displayName: 'Structured Data Section';
  };
  attributes: {
    dcCreator: Schema.Attribute.String;
    dcDescription: Schema.Attribute.Text;
    dcLanguage: Schema.Attribute.String;
    dcSubject: Schema.Attribute.String;
    dcTitle: Schema.Attribute.String;
    dcType: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text;
    pageTitle: Schema.Attribute.String;
    publisherName: Schema.Attribute.String;
    schemaDescription: Schema.Attribute.Text;
    schemaName: Schema.Attribute.String;
  };
}

export interface ImpactPageAssetItem extends Struct.ComponentSchema {
  collectionName: 'components_impact_page_asset_items';
  info: {
    description: '';
    displayName: 'Asset Item';
  };
  attributes: {
    assetId: Schema.Attribute.String;
    capacity: Schema.Attribute.String;
    capital: Schema.Attribute.String;
    category: Schema.Attribute.String;
    connections: Schema.Attribute.String;
    ghg: Schema.Attribute.String;
    jobs: Schema.Attribute.String;
    location: Schema.Attribute.String;
    status: Schema.Attribute.String;
    title: Schema.Attribute.String;
    year: Schema.Attribute.String;
  };
}

export interface ImpactPageAssetsTabSection extends Struct.ComponentSchema {
  collectionName: 'components_impact_page_assets_tab_sections';
  info: {
    description: '';
    displayName: 'Assets Tab Section';
  };
  attributes: {
    assets: Schema.Attribute.Component<'impact-page.asset-item', true>;
    columns: Schema.Attribute.Component<'impact-page.label-item', true>;
  };
}

export interface ImpactPageHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_impact_page_hero_sections';
  info: {
    description: '';
    displayName: 'Hero Section';
  };
  attributes: {
    backgroundImage: Schema.Attribute.String;
    breadcrumbLabel: Schema.Attribute.String;
    descriptionPrimary: Schema.Attribute.Text;
    descriptionSecondary: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    headingHighlight: Schema.Attribute.String;
    headingPartOne: Schema.Attribute.String;
    stats: Schema.Attribute.Component<'impact-page.hero-stat-item', true>;
  };
}

export interface ImpactPageHeroStatItem extends Struct.ComponentSchema {
  collectionName: 'components_impact_page_hero_stat_items';
  info: {
    description: '';
    displayName: 'Hero Stat Item';
  };
  attributes: {
    category: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    label: Schema.Attribute.String;
    sdgBadge: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface ImpactPageImpactConsoleSection extends Struct.ComponentSchema {
  collectionName: 'components_impact_page_impact_console_sections';
  info: {
    description: '';
    displayName: 'Impact Console Section';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    headingHighlight: Schema.Attribute.String;
    headingPartOne: Schema.Attribute.String;
    tabs: Schema.Attribute.Component<'impact-page.tab-item', true>;
  };
}

export interface ImpactPageInvestmentsTabSection
  extends Struct.ComponentSchema {
  collectionName: 'components_impact_page_investments_tab_sections';
  info: {
    description: '';
    displayName: 'Investments Tab Section';
  };
  attributes: {
    pillars: Schema.Attribute.Component<'impact-page.pillar-item', true>;
    pillarsHeading: Schema.Attribute.String;
    sdgCards: Schema.Attribute.Component<'impact-page.sdg-card-item', true>;
    sdgHeading: Schema.Attribute.String;
  };
}

export interface ImpactPageLabelItem extends Struct.ComponentSchema {
  collectionName: 'components_impact_page_label_items';
  info: {
    description: '';
    displayName: 'Label Item';
  };
  attributes: {
    label: Schema.Attribute.String;
  };
}

export interface ImpactPageMetricItem extends Struct.ComponentSchema {
  collectionName: 'components_impact_page_metric_items';
  info: {
    description: '';
    displayName: 'Metric Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    label: Schema.Attribute.String;
    unit: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface ImpactPageNextStepsSection extends Struct.ComponentSchema {
  collectionName: 'components_impact_page_next_steps_sections';
  info: {
    description: '';
    displayName: 'Next Steps Section';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    headingItalic: Schema.Attribute.String;
    headingPartOne: Schema.Attribute.String;
    links: Schema.Attribute.Component<'impact-page.portal-link-item', true>;
  };
}

export interface ImpactPageNumbersTabSection extends Struct.ComponentSchema {
  collectionName: 'components_impact_page_numbers_tab_sections';
  info: {
    description: '';
    displayName: 'Numbers Tab Section';
  };
  attributes: {
    etpBody: Schema.Attribute.Text;
    etpLabel: Schema.Attribute.String;
    metrics: Schema.Attribute.Component<'impact-page.metric-item', true>;
    pensionCurrentLabel: Schema.Attribute.String;
    pensionLabel: Schema.Attribute.String;
    pensionTargetLabel: Schema.Attribute.String;
    pensionTargetValue: Schema.Attribute.String;
    timelinePoints: Schema.Attribute.Component<
      'impact-page.timeline-point-item',
      true
    >;
    wheelCenterLabel: Schema.Attribute.String;
    wheelCenterYear: Schema.Attribute.String;
    wheelProgressLabel: Schema.Attribute.String;
  };
}

export interface ImpactPagePhilosophySection extends Struct.ComponentSchema {
  collectionName: 'components_impact_page_philosophy_sections';
  info: {
    description: '';
    displayName: 'Philosophy Section';
  };
  attributes: {
    bodyPartOne: Schema.Attribute.Text;
    bodyPartTwo: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    headingHighlight: Schema.Attribute.String;
    headingPartOne: Schema.Attribute.String;
    pillars: Schema.Attribute.Component<'impact-page.pillar-item', true>;
  };
}

export interface ImpactPagePillarItem extends Struct.ComponentSchema {
  collectionName: 'components_impact_page_pillar_items';
  info: {
    description: '';
    displayName: 'Pillar Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    number: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ImpactPagePortalLinkItem extends Struct.ComponentSchema {
  collectionName: 'components_impact_page_portal_link_items';
  info: {
    description: '';
    displayName: 'Portal Link Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    href: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ImpactPageSdgCardItem extends Struct.ComponentSchema {
  collectionName: 'components_impact_page_sdg_card_items';
  info: {
    description: '';
    displayName: 'SDG Card Item';
  };
  attributes: {
    badgeLabel: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.String;
    number: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ImpactPageStoriesTabSection extends Struct.ComponentSchema {
  collectionName: 'components_impact_page_stories_tab_sections';
  info: {
    description: '';
    displayName: 'Stories Tab Section';
  };
  attributes: {
    countMiddle: Schema.Attribute.String;
    countPrefix: Schema.Attribute.String;
    countSuffix: Schema.Attribute.String;
    locationLabel: Schema.Attribute.String;
    roleLabel: Schema.Attribute.String;
    stories: Schema.Attribute.Component<'impact-page.story-item', true>;
    typeLabel: Schema.Attribute.String;
    viewMoreLabel: Schema.Attribute.String;
  };
}

export interface ImpactPageStoryItem extends Struct.ComponentSchema {
  collectionName: 'components_impact_page_story_items';
  info: {
    description: '';
    displayName: 'Story Item';
  };
  attributes: {
    badge: Schema.Attribute.String;
    duration: Schema.Attribute.String;
    excerpt: Schema.Attribute.Text;
    image: Schema.Attribute.String;
    location: Schema.Attribute.String;
    role: Schema.Attribute.String;
    title: Schema.Attribute.String;
    type: Schema.Attribute.String;
    video: Schema.Attribute.String;
  };
}

export interface ImpactPageStructuredDataSection
  extends Struct.ComponentSchema {
  collectionName: 'components_impact_page_structured_data_sections';
  info: {
    description: '';
    displayName: 'Structured Data Section';
  };
  attributes: {
    loadingLabel: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text;
    pageTitle: Schema.Attribute.String;
  };
}

export interface ImpactPageTabItem extends Struct.ComponentSchema {
  collectionName: 'components_impact_page_tab_items';
  info: {
    description: '';
    displayName: 'Tab Item';
  };
  attributes: {
    label: Schema.Attribute.String;
    tabId: Schema.Attribute.String;
  };
}

export interface ImpactPageTimelinePointItem extends Struct.ComponentSchema {
  collectionName: 'components_impact_page_timeline_point_items';
  info: {
    description: '';
    displayName: 'Timeline Point Item';
  };
  attributes: {
    label: Schema.Attribute.String;
    year: Schema.Attribute.String;
  };
}

export interface ImpactPageVideoModalSection extends Struct.ComponentSchema {
  collectionName: 'components_impact_page_video_modal_sections';
  info: {
    description: '';
    displayName: 'Video Modal Section';
  };
  attributes: {
    nowPlayingLabel: Schema.Attribute.String;
  };
}

export interface NewsPageArticleDetailSection extends Struct.ComponentSchema {
  collectionName: 'components_news_page_article_detail_sections';
  info: {
    description: '';
    displayName: 'Article Detail Section';
  };
  attributes: {
    backLabel: Schema.Attribute.String;
    breadcrumbParentLabel: Schema.Attribute.String;
    breadcrumbPrefix: Schema.Attribute.String;
    contextLabel: Schema.Attribute.String;
    copyLinkAlert: Schema.Attribute.String;
    copyLinkAriaLabel: Schema.Attribute.String;
    dcLanguage: Schema.Attribute.String;
    dcPublisher: Schema.Attribute.String;
    dcType: Schema.Attribute.String;
    firstArticleLabel: Schema.Attribute.String;
    latestArticleLabel: Schema.Attribute.String;
    loadingLabel: Schema.Attribute.String;
    nextArticleLabel: Schema.Attribute.String;
    notFoundBody: Schema.Attribute.Text;
    notFoundCtaLabel: Schema.Attribute.String;
    notFoundTitle: Schema.Attribute.String;
    postedByLabel: Schema.Attribute.String;
    previousArticleLabel: Schema.Attribute.String;
    publishedInPrefix: Schema.Attribute.String;
    publisherLogoUrl: Schema.Attribute.String;
    publisherName: Schema.Attribute.String;
    relatedCtaLabel: Schema.Attribute.String;
    relatedHeadingHighlight: Schema.Attribute.String;
    relatedHeadingPartOne: Schema.Attribute.String;
    shareFacebookAriaLabel: Schema.Attribute.String;
    shareLabel: Schema.Attribute.String;
    shareLinkedinAriaLabel: Schema.Attribute.String;
    shareTwitterAriaLabel: Schema.Attribute.String;
    themesLabel: Schema.Attribute.String;
    titleSuffix: Schema.Attribute.String;
  };
}

export interface NewsPageArticleItem extends Struct.ComponentSchema {
  collectionName: 'components_news_page_article_items';
  info: {
    description: '';
    displayName: 'Article Item';
  };
  attributes: {
    articleId: Schema.Attribute.String;
    author: Schema.Attribute.String;
    authorAvatar: Schema.Attribute.String;
    date: Schema.Attribute.String;
    excerpt: Schema.Attribute.Text;
    image: Schema.Attribute.String;
    keyContext: Schema.Attribute.Text;
    paragraphs: Schema.Attribute.Component<
      'news-page.article-paragraph-item',
      true
    >;
    readTime: Schema.Attribute.String;
    tag: Schema.Attribute.String;
    themes: Schema.Attribute.Component<'news-page.article-theme-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface NewsPageArticleParagraphItem extends Struct.ComponentSchema {
  collectionName: 'components_news_page_article_paragraph_items';
  info: {
    description: '';
    displayName: 'Article Paragraph Item';
  };
  attributes: {
    blockType: Schema.Attribute.String;
    caption: Schema.Attribute.Text;
    text: Schema.Attribute.Text;
    url: Schema.Attribute.String;
  };
}

export interface NewsPageArticleThemeItem extends Struct.ComponentSchema {
  collectionName: 'components_news_page_article_theme_items';
  info: {
    description: '';
    displayName: 'Article Theme Item';
  };
  attributes: {
    label: Schema.Attribute.String;
  };
}

export interface NewsPageArticlesSection extends Struct.ComponentSchema {
  collectionName: 'components_news_page_articles_sections';
  info: {
    description: '';
    displayName: 'Articles Section';
  };
  attributes: {
    articles: Schema.Attribute.Component<'news-page.article-item', true>;
    gridCtaLabel: Schema.Attribute.String;
  };
}

export interface NewsPageCategoryItem extends Struct.ComponentSchema {
  collectionName: 'components_news_page_category_items';
  info: {
    description: '';
    displayName: 'Category Item';
  };
  attributes: {
    label: Schema.Attribute.String;
  };
}

export interface NewsPageHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_news_page_hero_sections';
  info: {
    description: '';
    displayName: 'Hero Section';
  };
  attributes: {
    bgImage: Schema.Attribute.String;
    breadcrumbCurrentPage: Schema.Attribute.String;
    breadcrumbHomeLabel: Schema.Attribute.String;
    cardCtaLabel: Schema.Attribute.String;
    headingHighlight: Schema.Attribute.String;
    headingPartOne: Schema.Attribute.String;
    nextAriaLabel: Schema.Attribute.String;
    prevAriaLabel: Schema.Attribute.String;
    subtitle: Schema.Attribute.String;
  };
}

export interface NewsPageListingSection extends Struct.ComponentSchema {
  collectionName: 'components_news_page_listing_sections';
  info: {
    description: '';
    displayName: 'Listing Section';
  };
  attributes: {
    categories: Schema.Attribute.Component<'news-page.category-item', true>;
    sectionSub: Schema.Attribute.String;
    sectionTitle: Schema.Attribute.Text;
    viewTabs: Schema.Attribute.Component<'news-page.view-tab-item', true>;
  };
}

export interface NewsPageNextStepsSection extends Struct.ComponentSchema {
  collectionName: 'components_news_page_next_steps_sections';
  info: {
    description: '';
    displayName: 'Next Steps Section';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    headingItalic: Schema.Attribute.String;
    headingPartOne: Schema.Attribute.String;
    links: Schema.Attribute.Component<'news-page.portal-link-item', true>;
  };
}

export interface NewsPagePortalLinkItem extends Struct.ComponentSchema {
  collectionName: 'components_news_page_portal_link_items';
  info: {
    description: '';
    displayName: 'Portal Link Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    href: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface NewsPageStructuredDataSection extends Struct.ComponentSchema {
  collectionName: 'components_news_page_structured_data_sections';
  info: {
    description: '';
    displayName: 'Structured Data Section';
  };
  attributes: {
    dcCreator: Schema.Attribute.String;
    dcDescription: Schema.Attribute.Text;
    dcLanguage: Schema.Attribute.String;
    dcPublisher: Schema.Attribute.String;
    dcSubject: Schema.Attribute.String;
    dcTitle: Schema.Attribute.String;
    dcType: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text;
    pageTitle: Schema.Attribute.String;
    parentOrganizationName: Schema.Attribute.String;
    schemaDescription: Schema.Attribute.Text;
    schemaName: Schema.Attribute.String;
    schemaUrl: Schema.Attribute.String;
  };
}

export interface NewsPageViewTabItem extends Struct.ComponentSchema {
  collectionName: 'components_news_page_view_tab_items';
  info: {
    description: '';
    displayName: 'View Tab Item';
  };
  attributes: {
    label: Schema.Attribute.String;
    tabId: Schema.Attribute.String;
  };
}

export interface ProjectsPageAnalysisTabSection extends Struct.ComponentSchema {
  collectionName: 'components_projects_page_analysis_tab_sections';
  info: {
    description: '';
    displayName: 'Analysis Tab Section';
  };
  attributes: {
    capacityUnit: Schema.Attribute.String;
    columnHeads: Schema.Attribute.Component<'projects-page.label-item', true>;
    downloadHref: Schema.Attribute.String;
    downloadLabel: Schema.Attribute.String;
    ghgUnit: Schema.Attribute.String;
    statBoxes: Schema.Attribute.Component<'projects-page.stat-box-item', true>;
    statusOperationalLabel: Schema.Attribute.String;
    statusUnderConstructionLabel: Schema.Attribute.String;
    tableHeading: Schema.Attribute.String;
    totalsConnectionsSuffix: Schema.Attribute.String;
    totalsRowLabel: Schema.Attribute.String;
  };
}

export interface ProjectsPageEligibilityCtaSection
  extends Struct.ComponentSchema {
  collectionName: 'components_projects_page_eligibility_cta_sections';
  info: {
    description: '';
    displayName: 'Eligibility CTA Section';
  };
  attributes: {
    backgroundImage: Schema.Attribute.String;
    backgroundImage_alt_text: Schema.Attribute.String;
    body: Schema.Attribute.Text;
    ctaHref: Schema.Attribute.String;
    ctaLabel: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    headingHighlight: Schema.Attribute.String;
    headingPartOne: Schema.Attribute.String;
    headingPartTwo: Schema.Attribute.String;
  };
}

export interface ProjectsPageFootprintMapSection
  extends Struct.ComponentSchema {
  collectionName: 'components_projects_page_footprint_map_sections';
  info: {
    description: '';
    displayName: 'Footprint Map Section';
  };
  attributes: {
    body: Schema.Attribute.Text;
    clearSelectionLabel: Schema.Attribute.String;
    communitiesStatLabel: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    headingHighlight: Schema.Attribute.String;
    headingPartOne: Schema.Attribute.String;
    legend: Schema.Attribute.Component<'projects-page.map-legend-item', true>;
    lgaEmptyMessage: Schema.Attribute.String;
    lgaPanelSuffix: Schema.Attribute.String;
    lgaProjects: Schema.Attribute.Component<
      'projects-page.lga-project-item',
      true
    >;
    mapHint: Schema.Attribute.String;
    mapLabel: Schema.Attribute.String;
    mapSvg: Schema.Attribute.Text;
    placeholderBody: Schema.Attribute.Text;
    placeholderTitle: Schema.Attribute.String;
    searchPlaceholder: Schema.Attribute.String;
    states: Schema.Attribute.Component<'projects-page.map-state-item', true>;
    statesColumnLabel: Schema.Attribute.String;
    statesStatLabel: Schema.Attribute.String;
  };
}

export interface ProjectsPageHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_projects_page_hero_sections';
  info: {
    description: '';
    displayName: 'Hero Section';
  };
  attributes: {
    backgroundImage: Schema.Attribute.String;
    backgroundImage_alt_text: Schema.Attribute.String;
    breadcrumbLabel: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    headingHighlight: Schema.Attribute.String;
    headingPartOne: Schema.Attribute.String;
    stats: Schema.Attribute.Component<'projects-page.hero-stat-item', true>;
  };
}

export interface ProjectsPageHeroStatItem extends Struct.ComponentSchema {
  collectionName: 'components_projects_page_hero_stat_items';
  info: {
    description: '';
    displayName: 'Hero Stat Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    label: Schema.Attribute.String;
    sdgBadge: Schema.Attribute.String;
    unit: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface ProjectsPageLabelItem extends Struct.ComponentSchema {
  collectionName: 'components_projects_page_label_items';
  info: {
    description: '';
    displayName: 'Label Item';
  };
  attributes: {
    label: Schema.Attribute.String;
  };
}

export interface ProjectsPageLgaHeroImageItem extends Struct.ComponentSchema {
  collectionName: 'components_projects_page_lga_hero_image_items';
  info: {
    description: '';
    displayName: 'LGA Hero Image Item';
  };
  attributes: {
    image: Schema.Attribute.String;
    image_alt_text: Schema.Attribute.String;
    projectType: Schema.Attribute.String;
  };
}

export interface ProjectsPageLgaItem extends Struct.ComponentSchema {
  collectionName: 'components_projects_page_lga_items';
  info: {
    description: '';
    displayName: 'LGA Item';
  };
  attributes: {
    name: Schema.Attribute.String;
  };
}

export interface ProjectsPageLgaModalSection extends Struct.ComponentSchema {
  collectionName: 'components_projects_page_lga_modal_sections';
  info: {
    description: '';
    displayName: 'LGA Modal Section';
  };
  attributes: {
    closeLabel: Schema.Attribute.String;
    columnHeads: Schema.Attribute.Component<'projects-page.label-item', true>;
    emptyBody: Schema.Attribute.Text;
    emptyTitle: Schema.Attribute.String;
    fallbackIcon: Schema.Attribute.String;
    heroImages: Schema.Attribute.Component<
      'projects-page.lga-hero-image-item',
      true
    >;
    projectTypeIcons: Schema.Attribute.Component<
      'projects-page.project-type-icon-item',
      true
    >;
    sourceLabel: Schema.Attribute.String;
    statLabelCommunities: Schema.Attribute.String;
    statLabelDevelopers: Schema.Attribute.String;
    statLabelPuePotential: Schema.Attribute.String;
    subtitlePrefix: Schema.Attribute.String;
    subtitleStateSuffix: Schema.Attribute.String;
  };
}

export interface ProjectsPageLgaProjectItem extends Struct.ComponentSchema {
  collectionName: 'components_projects_page_lga_project_items';
  info: {
    description: '';
    displayName: 'LGA Project Item';
  };
  attributes: {
    community: Schema.Attribute.String;
    developer: Schema.Attribute.String;
    enumerators: Schema.Attribute.Integer;
    lga: Schema.Attribute.String;
    projectType: Schema.Attribute.String;
    puePotential: Schema.Attribute.Integer;
    state: Schema.Attribute.String;
  };
}

export interface ProjectsPageMapLegendItem extends Struct.ComponentSchema {
  collectionName: 'components_projects_page_map_legend_items';
  info: {
    description: '';
    displayName: 'Map Legend Item';
  };
  attributes: {
    color: Schema.Attribute.String;
    label: Schema.Attribute.String;
    type: Schema.Attribute.String;
  };
}

export interface ProjectsPageMapStateItem extends Struct.ComponentSchema {
  collectionName: 'components_projects_page_map_state_items';
  info: {
    description: '';
    displayName: 'Map State Item';
  };
  attributes: {
    hasProjects: Schema.Attribute.Boolean;
    lgas: Schema.Attribute.Component<'projects-page.lga-item', true>;
    mapId: Schema.Attribute.String;
    name: Schema.Attribute.String;
    projectType: Schema.Attribute.String;
  };
}

export interface ProjectsPageMetricCardItem extends Struct.ComponentSchema {
  collectionName: 'components_projects_page_metric_card_items';
  info: {
    description: '';
    displayName: 'Metric Card Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    label: Schema.Attribute.String;
    unit: Schema.Attribute.String;
  };
}

export interface ProjectsPageNextStepsSection extends Struct.ComponentSchema {
  collectionName: 'components_projects_page_next_steps_sections';
  info: {
    description: '';
    displayName: 'Next Steps Section';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    headingItalic: Schema.Attribute.String;
    headingPartOne: Schema.Attribute.String;
    links: Schema.Attribute.Component<'projects-page.portal-link-item', true>;
  };
}

export interface ProjectsPagePipelineConsoleSection
  extends Struct.ComponentSchema {
  collectionName: 'components_projects_page_pipeline_console_sections';
  info: {
    description: '';
    displayName: 'Pipeline Console Section';
  };
  attributes: {
    body: Schema.Attribute.Text;
    businessModelsHeader: Schema.Attribute.String;
    businessModelsMandatedNgn: Schema.Attribute.String;
    businessModelsMandatedUsd: Schema.Attribute.String;
    businessModelsSubcopy: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    footerLabel: Schema.Attribute.String;
    footerPercent: Schema.Attribute.String;
    footerProjects: Schema.Attribute.String;
    footerTotalMandated: Schema.Attribute.String;
    footerTotalPipeline: Schema.Attribute.String;
    headingHighlight: Schema.Attribute.String;
    headingPartOne: Schema.Attribute.String;
    leftBackgroundImage: Schema.Attribute.String;
    leftBackgroundImage_alt_text: Schema.Attribute.String;
    mandatedDealRows: Schema.Attribute.Component<
      'projects-page.sector-row-item',
      true
    >;
    metricLabels: Schema.Attribute.Component<
      'projects-page.metric-card-item',
      true
    >;
    metricsHeader: Schema.Attribute.String;
    metricsSubcopy: Schema.Attribute.Text;
    rightBackgroundImage: Schema.Attribute.String;
    rightBackgroundImage_alt_text: Schema.Attribute.String;
    sdgFrameworks: Schema.Attribute.Component<'projects-page.sdg-item', true>;
    sdgFrameworksLabel: Schema.Attribute.String;
    selectStageLabel: Schema.Attribute.String;
    stages: Schema.Attribute.Component<
      'projects-page.pipeline-stage-item',
      true
    >;
    tableHeadDealSize: Schema.Attribute.String;
    tableHeadMandatedNgn: Schema.Attribute.String;
    tableHeadPipelineNgn: Schema.Attribute.String;
    tableHeadProjects: Schema.Attribute.String;
    tableHeadSector: Schema.Attribute.String;
    toggleMandatedLabel: Schema.Attribute.String;
    toggleTotalLabel: Schema.Attribute.String;
    totalPipelineRows: Schema.Attribute.Component<
      'projects-page.sector-row-item',
      true
    >;
    usdUnitLabel: Schema.Attribute.String;
  };
}

export interface ProjectsPagePipelineStageItem extends Struct.ComponentSchema {
  collectionName: 'components_projects_page_pipeline_stage_items';
  info: {
    description: '';
    displayName: 'Pipeline Stage Item';
  };
  attributes: {
    desc: Schema.Attribute.Text;
    label: Schema.Attribute.String;
    metrics: Schema.Attribute.Component<
      'projects-page.pipeline-stage-metrics',
      false
    >;
    ngnVal: Schema.Attribute.String;
    sdgs: Schema.Attribute.String;
    stageId: Schema.Attribute.String;
    title: Schema.Attribute.String;
    usdVal: Schema.Attribute.String;
  };
}

export interface ProjectsPagePipelineStageMetrics
  extends Struct.ComponentSchema {
  collectionName: 'components_projects_page_pipeline_stage_metrics';
  info: {
    description: '';
    displayName: 'Pipeline Stage Metrics';
  };
  attributes: {
    capacity: Schema.Attribute.String;
    capital: Schema.Attribute.String;
    capitalSub: Schema.Attribute.String;
    communities: Schema.Attribute.String;
    communitiesLabel: Schema.Attribute.String;
    connections: Schema.Attribute.String;
    connectionsLabel: Schema.Attribute.String;
    ghg: Schema.Attribute.String;
    jobs: Schema.Attribute.String;
  };
}

export interface ProjectsPagePipelineTabSection extends Struct.ComponentSchema {
  collectionName: 'components_projects_page_pipeline_tab_sections';
  info: {
    description: '';
    displayName: 'Pipeline Tab Section';
  };
  attributes: {
    categories: Schema.Attribute.Component<'projects-page.label-item', true>;
    challengeLabel: Schema.Attribute.String;
    clearFilterLabel: Schema.Attribute.String;
    detailsLinkLabel: Schema.Attribute.String;
    filterBannerPrefix: Schema.Attribute.String;
    financialCloseLabel: Schema.Attribute.String;
    privateCapitalLabel: Schema.Attribute.String;
    projectIdPrefix: Schema.Attribute.String;
    projects: Schema.Attribute.Component<'projects-page.project-item', true>;
    sdgDefinitions: Schema.Attribute.Component<'projects-page.sdg-item', true>;
    sdgGoalsLabel: Schema.Attribute.String;
    stateProjects: Schema.Attribute.Component<
      'projects-page.state-project-item',
      true
    >;
    stateSuffix: Schema.Attribute.String;
  };
}

export interface ProjectsPagePortalLinkItem extends Struct.ComponentSchema {
  collectionName: 'components_projects_page_portal_link_items';
  info: {
    description: '';
    displayName: 'Portal Link Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    href: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ProjectsPagePortfolioTabsSection
  extends Struct.ComponentSchema {
  collectionName: 'components_projects_page_portfolio_tabs_sections';
  info: {
    description: '';
    displayName: 'Portfolio Tabs Section';
  };
  attributes: {
    body: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    headingHighlight: Schema.Attribute.String;
    headingPartOne: Schema.Attribute.String;
    tabs: Schema.Attribute.Component<'projects-page.tab-item', true>;
  };
}

export interface ProjectsPageProjectItem extends Struct.ComponentSchema {
  collectionName: 'components_projects_page_project_items';
  info: {
    description: '';
    displayName: 'Project Item';
  };
  attributes: {
    capacity: Schema.Attribute.String;
    capital: Schema.Attribute.String;
    category: Schema.Attribute.String;
    connections: Schema.Attribute.String;
    desc: Schema.Attribute.Text;
    ghg: Schema.Attribute.String;
    image: Schema.Attribute.String;
    image_alt_text: Schema.Attribute.String;
    impact: Schema.Attribute.Text;
    jobs: Schema.Attribute.String;
    location: Schema.Attribute.String;
    problem: Schema.Attribute.Text;
    projectId: Schema.Attribute.String;
    sdgs: Schema.Attribute.String;
    solution: Schema.Attribute.Text;
    status: Schema.Attribute.String;
    title: Schema.Attribute.String;
    year: Schema.Attribute.String;
  };
}

export interface ProjectsPageProjectTypeIconItem
  extends Struct.ComponentSchema {
  collectionName: 'components_projects_page_project_type_icon_items';
  info: {
    description: '';
    displayName: 'Project Type Icon Item';
  };
  attributes: {
    icon: Schema.Attribute.String;
    projectType: Schema.Attribute.String;
  };
}

export interface ProjectsPageSdgItem extends Struct.ComponentSchema {
  collectionName: 'components_projects_page_sdg_items';
  info: {
    description: '';
    displayName: 'SDG Item';
  };
  attributes: {
    image: Schema.Attribute.String;
    image_alt_text: Schema.Attribute.String;
    name: Schema.Attribute.String;
    number: Schema.Attribute.String;
  };
}

export interface ProjectsPageSectorRowItem extends Struct.ComponentSchema {
  collectionName: 'components_projects_page_sector_row_items';
  info: {
    description: '';
    displayName: 'Sector Row Item';
  };
  attributes: {
    percentage: Schema.Attribute.String;
    projectsCount: Schema.Attribute.Integer;
    sector: Schema.Attribute.String;
    valueNgn: Schema.Attribute.Decimal;
  };
}

export interface ProjectsPageStatBoxItem extends Struct.ComponentSchema {
  collectionName: 'components_projects_page_stat_box_items';
  info: {
    description: '';
    displayName: 'Stat Box Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    label: Schema.Attribute.String;
    unit: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface ProjectsPageStateProjectItem extends Struct.ComponentSchema {
  collectionName: 'components_projects_page_state_project_items';
  info: {
    description: '';
    displayName: 'State Project Item';
  };
  attributes: {
    capacity: Schema.Attribute.String;
    category: Schema.Attribute.String;
    funding: Schema.Attribute.String;
    projectName: Schema.Attribute.String;
    sdgs: Schema.Attribute.String;
    stateMapId: Schema.Attribute.String;
    status: Schema.Attribute.String;
  };
}

export interface ProjectsPageStructuredDataSection
  extends Struct.ComponentSchema {
  collectionName: 'components_projects_page_structured_data_sections';
  info: {
    description: '';
    displayName: 'Structured Data Section';
  };
  attributes: {
    dcCoverageSpatial: Schema.Attribute.String;
    dcCreator: Schema.Attribute.String;
    dcDescription: Schema.Attribute.Text;
    dcLanguage: Schema.Attribute.String;
    dcPublisher: Schema.Attribute.String;
    dcSubject: Schema.Attribute.String;
    dcTitle: Schema.Attribute.String;
    dcType: Schema.Attribute.String;
    jsonLdDescription: Schema.Attribute.Text;
    jsonLdName: Schema.Attribute.String;
    jsonLdPublisherName: Schema.Attribute.String;
    jsonLdType: Schema.Attribute.String;
    jsonLdUrl: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text;
    pageTitle: Schema.Attribute.String;
  };
}

export interface ProjectsPageTabItem extends Struct.ComponentSchema {
  collectionName: 'components_projects_page_tab_items';
  info: {
    description: '';
    displayName: 'Tab Item';
  };
  attributes: {
    label: Schema.Attribute.String;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'about-page.audience-section': AboutPageAudienceSection;
      'about-page.bento-caption-item': AboutPageBentoCaptionItem;
      'about-page.capital-stack-section': AboutPageCapitalStackSection;
      'about-page.download-cta-section': AboutPageDownloadCtaSection;
      'about-page.energy-map-section': AboutPageEnergyMapSection;
      'about-page.framework-card-item': AboutPageFrameworkCardItem;
      'about-page.framework-section': AboutPageFrameworkSection;
      'about-page.hero-section': AboutPageHeroSection;
      'about-page.hero-slider-stat-item': AboutPageHeroSliderStatItem;
      'about-page.hero-stat-item': AboutPageHeroStatItem;
      'about-page.mandate-number-item': AboutPageMandateNumberItem;
      'about-page.mandate-paragraph-item': AboutPageMandateParagraphItem;
      'about-page.mandate-section': AboutPageMandateSection;
      'about-page.map-state-item': AboutPageMapStateItem;
      'about-page.map-tab-item': AboutPageMapTabItem;
      'about-page.market-bento-card-item': AboutPageMarketBentoCardItem;
      'about-page.market-section': AboutPageMarketSection;
      'about-page.milestone-event-item': AboutPageMilestoneEventItem;
      'about-page.milestone-item': AboutPageMilestoneItem;
      'about-page.milestones-section': AboutPageMilestonesSection;
      'about-page.nav-link-item': AboutPageNavLinkItem;
      'about-page.next-steps-section': AboutPageNextStepsSection;
      'about-page.partner-group-item': AboutPagePartnerGroupItem;
      'about-page.partner-item': AboutPagePartnerItem;
      'about-page.partners-section': AboutPagePartnersSection;
      'about-page.persona-item': AboutPagePersonaItem;
      'about-page.persona-qa-item': AboutPagePersonaQaItem;
      'about-page.portal-link-item': AboutPagePortalLinkItem;
      'about-page.rail-year-item': AboutPageRailYearItem;
      'about-page.stack-bar-item': AboutPageStackBarItem;
      'about-page.stack-segment-item': AboutPageStackSegmentItem;
      'about-page.sticky-nav-section': AboutPageStickyNavSection;
      'about-page.structured-data-section': AboutPageStructuredDataSection;
      'contact-page.download-cta-section': ContactPageDownloadCtaSection;
      'contact-page.eligibility-reminder-section': ContactPageEligibilityReminderSection;
      'contact-page.enquiry-form-section': ContactPageEnquiryFormSection;
      'contact-page.facility-contacts-section': ContactPageFacilityContactsSection;
      'contact-page.fun-stat-item': ContactPageFunStatItem;
      'contact-page.fun-stats-section': ContactPageFunStatsSection;
      'contact-page.hero-card-item': ContactPageHeroCardItem;
      'contact-page.hero-section': ContactPageHeroSection;
      'contact-page.next-steps-section': ContactPageNextStepsSection;
      'contact-page.portal-link-item': ContactPagePortalLinkItem;
      'contact-page.role-tab-item': ContactPageRoleTabItem;
      'contact-page.select-option-item': ContactPageSelectOptionItem;
      'contact-page.structured-data-section': ContactPageStructuredDataSection;
      'contact-page.submission-success-section': ContactPageSubmissionSuccessSection;
      'contact-page.tech-mapping-item': ContactPageTechMappingItem;
      'eligibility-page.assessment-chrome-section': EligibilityPageAssessmentChromeSection;
      'eligibility-page.assessment-log-row-item': EligibilityPageAssessmentLogRowItem;
      'eligibility-page.assessment-option-item': EligibilityPageAssessmentOptionItem;
      'eligibility-page.assessment-outcome-item': EligibilityPageAssessmentOutcomeItem;
      'eligibility-page.assessment-question-item': EligibilityPageAssessmentQuestionItem;
      'eligibility-page.assessment-result-section': EligibilityPageAssessmentResultSection;
      'eligibility-page.assessment-step-item': EligibilityPageAssessmentStepItem;
      'eligibility-page.assessment-steps-section': EligibilityPageAssessmentStepsSection;
      'eligibility-page.criteria-card-item': EligibilityPageCriteriaCardItem;
      'eligibility-page.criteria-list-item': EligibilityPageCriteriaListItem;
      'eligibility-page.criteria-pillars-section': EligibilityPageCriteriaPillarsSection;
      'eligibility-page.criteria-stat-item': EligibilityPageCriteriaStatItem;
      'eligibility-page.final-cta-section': EligibilityPageFinalCtaSection;
      'eligibility-page.hero-section': EligibilityPageHeroSection;
      'eligibility-page.next-steps-section': EligibilityPageNextStepsSection;
      'eligibility-page.portal-link-item': EligibilityPagePortalLinkItem;
      'eligibility-page.sector-item': EligibilityPageSectorItem;
      'eligibility-page.structured-data-section': EligibilityPageStructuredDataSection;
      'eligibility-page.timeline-step-item': EligibilityPageTimelineStepItem;
      'eligibility-page.timeline-workflow-section': EligibilityPageTimelineWorkflowSection;
      'home-page.about-section': HomePageAboutSection;
      'home-page.category-item': HomePageCategoryItem;
      'home-page.feature-card-item': HomePageFeatureCardItem;
      'home-page.gallery-slide-item': HomePageGallerySlideItem;
      'home-page.hero-section': HomePageHeroSection;
      'home-page.impact-section': HomePageImpactSection;
      'home-page.map-marker-item': HomePageMapMarkerItem;
      'home-page.map-section': HomePageMapSection;
      'home-page.map-state-item': HomePageMapStateItem;
      'home-page.metric-card-item': HomePageMetricCardItem;
      'home-page.net-zero-section': HomePageNetZeroSection;
      'home-page.news-article-item': HomePageNewsArticleItem;
      'home-page.news-paragraph-item': HomePageNewsParagraphItem;
      'home-page.news-section': HomePageNewsSection;
      'home-page.news-theme-item': HomePageNewsThemeItem;
      'home-page.partner-item': HomePagePartnerItem;
      'home-page.project-item': HomePageProjectItem;
      'home-page.projects-section': HomePageProjectsSection;
      'home-page.report-item': HomePageReportItem;
      'home-page.sponsor-item': HomePageSponsorItem;
      'home-page.stat-item': HomePageStatItem;
      'home-page.stories-section': HomePageStoriesSection;
      'home-page.story-item': HomePageStoryItem;
      'home-page.structured-data-section': HomePageStructuredDataSection;
      'home-page.tab-item': HomePageTabItem;
      'home-page.theory-card-item': HomePageTheoryCardItem;
      'home-page.view-tab-item': HomePageViewTabItem;
      'how-it-works-page.bullet-item': HowItWorksPageBulletItem;
      'how-it-works-page.co-financing-partner': HowItWorksPageCoFinancingPartner;
      'how-it-works-page.facility-structure-section': HowItWorksPageFacilityStructureSection;
      'how-it-works-page.financing-structure-section': HowItWorksPageFinancingStructureSection;
      'how-it-works-page.hero-section': HowItWorksPageHeroSection;
      'how-it-works-page.hero-step-item': HowItWorksPageHeroStepItem;
      'how-it-works-page.next-steps-section': HowItWorksPageNextStepsSection;
      'how-it-works-page.partner-logo-item': HowItWorksPagePartnerLogoItem;
      'how-it-works-page.portal-link-item': HowItWorksPagePortalLinkItem;
      'how-it-works-page.process-section': HowItWorksPageProcessSection;
      'how-it-works-page.process-step-item': HowItWorksPageProcessStepItem;
      'how-it-works-page.structured-data-section': HowItWorksPageStructuredDataSection;
      'impact-page.asset-item': ImpactPageAssetItem;
      'impact-page.assets-tab-section': ImpactPageAssetsTabSection;
      'impact-page.hero-section': ImpactPageHeroSection;
      'impact-page.hero-stat-item': ImpactPageHeroStatItem;
      'impact-page.impact-console-section': ImpactPageImpactConsoleSection;
      'impact-page.investments-tab-section': ImpactPageInvestmentsTabSection;
      'impact-page.label-item': ImpactPageLabelItem;
      'impact-page.metric-item': ImpactPageMetricItem;
      'impact-page.next-steps-section': ImpactPageNextStepsSection;
      'impact-page.numbers-tab-section': ImpactPageNumbersTabSection;
      'impact-page.philosophy-section': ImpactPagePhilosophySection;
      'impact-page.pillar-item': ImpactPagePillarItem;
      'impact-page.portal-link-item': ImpactPagePortalLinkItem;
      'impact-page.sdg-card-item': ImpactPageSdgCardItem;
      'impact-page.stories-tab-section': ImpactPageStoriesTabSection;
      'impact-page.story-item': ImpactPageStoryItem;
      'impact-page.structured-data-section': ImpactPageStructuredDataSection;
      'impact-page.tab-item': ImpactPageTabItem;
      'impact-page.timeline-point-item': ImpactPageTimelinePointItem;
      'impact-page.video-modal-section': ImpactPageVideoModalSection;
      'news-page.article-detail-section': NewsPageArticleDetailSection;
      'news-page.article-item': NewsPageArticleItem;
      'news-page.article-paragraph-item': NewsPageArticleParagraphItem;
      'news-page.article-theme-item': NewsPageArticleThemeItem;
      'news-page.articles-section': NewsPageArticlesSection;
      'news-page.category-item': NewsPageCategoryItem;
      'news-page.hero-section': NewsPageHeroSection;
      'news-page.listing-section': NewsPageListingSection;
      'news-page.next-steps-section': NewsPageNextStepsSection;
      'news-page.portal-link-item': NewsPagePortalLinkItem;
      'news-page.structured-data-section': NewsPageStructuredDataSection;
      'news-page.view-tab-item': NewsPageViewTabItem;
      'projects-page.analysis-tab-section': ProjectsPageAnalysisTabSection;
      'projects-page.eligibility-cta-section': ProjectsPageEligibilityCtaSection;
      'projects-page.footprint-map-section': ProjectsPageFootprintMapSection;
      'projects-page.hero-section': ProjectsPageHeroSection;
      'projects-page.hero-stat-item': ProjectsPageHeroStatItem;
      'projects-page.label-item': ProjectsPageLabelItem;
      'projects-page.lga-hero-image-item': ProjectsPageLgaHeroImageItem;
      'projects-page.lga-item': ProjectsPageLgaItem;
      'projects-page.lga-modal-section': ProjectsPageLgaModalSection;
      'projects-page.lga-project-item': ProjectsPageLgaProjectItem;
      'projects-page.map-legend-item': ProjectsPageMapLegendItem;
      'projects-page.map-state-item': ProjectsPageMapStateItem;
      'projects-page.metric-card-item': ProjectsPageMetricCardItem;
      'projects-page.next-steps-section': ProjectsPageNextStepsSection;
      'projects-page.pipeline-console-section': ProjectsPagePipelineConsoleSection;
      'projects-page.pipeline-stage-item': ProjectsPagePipelineStageItem;
      'projects-page.pipeline-stage-metrics': ProjectsPagePipelineStageMetrics;
      'projects-page.pipeline-tab-section': ProjectsPagePipelineTabSection;
      'projects-page.portal-link-item': ProjectsPagePortalLinkItem;
      'projects-page.portfolio-tabs-section': ProjectsPagePortfolioTabsSection;
      'projects-page.project-item': ProjectsPageProjectItem;
      'projects-page.project-type-icon-item': ProjectsPageProjectTypeIconItem;
      'projects-page.sdg-item': ProjectsPageSdgItem;
      'projects-page.sector-row-item': ProjectsPageSectorRowItem;
      'projects-page.stat-box-item': ProjectsPageStatBoxItem;
      'projects-page.state-project-item': ProjectsPageStateProjectItem;
      'projects-page.structured-data-section': ProjectsPageStructuredDataSection;
      'projects-page.tab-item': ProjectsPageTabItem;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
