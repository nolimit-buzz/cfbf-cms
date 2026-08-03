import type { Core } from '@strapi/strapi';

import { aboutSections } from './seed/about-page-copy';
import { contactSections } from './seed/contact-page-copy';
import { eligibilitySections } from './seed/eligibility-page-copy';
import { homeSections } from './seed/home-page-copy';
import { howItWorksSections } from './seed/how-it-works-page-copy';
import { impactSections } from './seed/impact-page-copy';
import { newsSections } from './seed/news-page-copy';
import { projectsSections } from './seed/projects-page-copy';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Seed the HOME single type once, so every field is pre-filled in the
    // Content Manager on a fresh boot.
    //
    // `status: 'draft'` matters: the entry is created as an unpublished draft,
    // and findFirst defaults to looking for the *published* version — which
    // would always be null here and make this reseed on every boot.
    const existingHome = await strapi.documents('api::home.home').findFirst({
      populate: ['sections'],
      status: 'draft',
    });

    if (!existingHome?.sections?.length) {
      await strapi.documents('api::home.home').create({
        data: {
          sections: homeSections,
        },
      });

      strapi.log.info('[seed] HOME page seeded with 9 sections.');
    }

    // Same treatment for the ABOUT single type. Each entry in `aboutSections`
    // carries a `__component` key — the dynamic zone needs it to know which
    // component type each section is.
    const existingAbout = await strapi.documents('api::about.about').findFirst({
      populate: ['sections'],
      status: 'draft',
    });

    if (!existingAbout?.sections?.length) {
      await strapi.documents('api::about.about').create({
        data: {
          sections: aboutSections,
        },
      });

      strapi.log.info('[seed] ABOUT page seeded with 13 sections.');
    }

    // Same treatment for the PROJECTS single type.
    const existingProjects = await strapi
      .documents('api::projects.projects')
      .findFirst({
        populate: ['sections'],
        status: 'draft',
      });

    if (!existingProjects?.sections?.length) {
      await strapi.documents('api::projects.projects').create({
        data: {
          sections: projectsSections,
        },
      });

      strapi.log.info('[seed] PROJECTS page seeded with 10 sections.');
    }

    // Same treatment for the IMPACT single type.
    const existingImpact = await strapi
      .documents('api::impact.impact')
      .findFirst({
        populate: ['sections'],
        status: 'draft',
      });

    if (!existingImpact?.sections?.length) {
      await strapi.documents('api::impact.impact').create({
        data: {
          sections: impactSections,
        },
      });

      strapi.log.info('[seed] IMPACT page seeded with 10 sections.');
    }

    // Same treatment for the ELIGIBILITY single type. Its dynamic zone also
    // owns the copy for the /eligibility/assessment wizard sub-page.
    const existingEligibility = await strapi
      .documents('api::eligibility.eligibility')
      .findFirst({
        populate: ['sections'],
        status: 'draft',
      });

    if (!existingEligibility?.sections?.length) {
      await strapi.documents('api::eligibility.eligibility').create({
        data: {
          sections: eligibilitySections,
        },
      });

      strapi.log.info('[seed] ELIGIBILITY page seeded with 9 sections.');
    }

    // Same treatment for the NEWS single type. Its dynamic zone owns both the
    // /news archive chrome and the copy for the /news/[id] article detail page,
    // plus the articles themselves as a repeatable component.
    const existingNews = await strapi.documents('api::news.news').findFirst({
      populate: ['sections'],
      status: 'draft',
    });

    if (!existingNews?.sections?.length) {
      await strapi.documents('api::news.news').create({
        data: {
          sections: newsSections,
        },
      });

      strapi.log.info('[seed] NEWS page seeded with 6 sections.');
    }

    // Same treatment for the HOW IT WORKS single type.
    const existingHowItWorks = await strapi
      .documents('api::how-it-works.how-it-works')
      .findFirst({
        populate: ['sections'],
        status: 'draft',
      });

    if (!existingHowItWorks?.sections?.length) {
      await strapi.documents('api::how-it-works.how-it-works').create({
        data: {
          sections: howItWorksSections,
        },
      });

      strapi.log.info('[seed] HOW IT WORKS page seeded with 6 sections.');
    }

    // Same treatment for the CONTACT single type. Its dynamic zone owns the
    // enquiry form chrome too — field labels, select options, and the readiness
    // prefill templates the /eligibility results page links into.
    const existingContact = await strapi
      .documents('api::contact.contact')
      .findFirst({
        populate: ['sections'],
        status: 'draft',
      });

    if (!existingContact?.sections?.length) {
      await strapi.documents('api::contact.contact').create({
        data: {
          sections: contactSections,
        },
      });

      strapi.log.info('[seed] CONTACT page seeded with 9 sections.');
    }
  },
};
