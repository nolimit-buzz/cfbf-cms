import type { Core } from '@strapi/strapi';

import { homeSections } from './seed/home-page-copy';

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
    const existing = await strapi.documents('api::home.home').findFirst({
      populate: ['sections'],
      status: 'draft',
    });

    if (existing?.sections?.length) return;

    await strapi.documents('api::home.home').create({
      data: {
        sections: homeSections,
      },
    });

    strapi.log.info('[seed] HOME page seeded with 9 sections.');
  },
};
