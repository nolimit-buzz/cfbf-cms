'use strict';

/**
 * One-off idempotent patch for the CFBF website-edit corrections that are also
 * baked into `src/seed/about-page-copy.ts` and `src/seed/projects-page-copy.ts`.
 * Seeding only creates missing entries/sections — it never rewrites a value
 * inside a section that already exists — so any environment seeded before
 * those seed-file fixes keeps serving the old figures/copy until this runs.
 *
 * Safe to re-run: each fix only touches a section matched by `__component`
 * and, within it, a specific field/array item, so running this after the
 * values are already correct is a no-op.
 *
 * Usage: `npm run patch:cfbf-edits` (from `cms/`).
 */

function buildComponentPopulate(strapi, componentUid, depth = 0) {
  const schema = strapi.components?.[componentUid];
  if (!schema || depth > 6) return null;

  const populate = {};
  for (const [name, attribute] of Object.entries(schema.attributes ?? {})) {
    if (attribute?.type === 'component' && attribute.component) {
      const child = buildComponentPopulate(strapi, attribute.component, depth + 1);
      populate[name] = child ? { populate: child } : {};
    }
  }
  return Object.keys(populate).length > 0 ? populate : null;
}

function buildSectionsPopulate(strapi, uid) {
  const zone = strapi.contentType(uid)?.attributes?.sections;
  const components = zone?.components ?? [];
  if (zone?.type !== 'dynamiczone' || components.length === 0) return ['sections'];

  const on = {};
  for (const componentUid of components) {
    const child = buildComponentPopulate(strapi, componentUid);
    on[componentUid] = child ? { populate: child } : {};
  }
  return { sections: { on } };
}

function isFullyPopulated(strapi, entry) {
  const schema = strapi.components?.[entry.__component];
  if (!schema) return false;

  for (const [name, attribute] of Object.entries(schema.attributes ?? {})) {
    if (attribute?.type !== 'component') continue;

    const value = entry[name];
    if (value === undefined) return false;

    const children = Array.isArray(value) ? value : [value];
    for (const child of children) {
      if (child && !isFullyPopulated(strapi, { ...child, __component: attribute.component })) {
        return false;
      }
    }
  }
  return true;
}

/** Patches the About singleton: hero stat, mandate numbers, and Critical Q&A. */
function patchAboutSections(sections) {
  let changed = false;

  for (const section of sections) {
    if (section.__component === 'about-page.hero-section') {
      const stat = (section.stats ?? []).find((s) => s.cardNumber === '02');
      if (stat && (stat.label !== 'Total Capital Deployed' || stat.value !== '11.65 Billion Naira')) {
        stat.label = 'Total Capital Deployed';
        stat.value = '11.65 Billion Naira';
        changed = true;
      }
    }

    if (section.__component === 'about-page.mandate-section') {
      const number = (section.numbers ?? []).find((n) => n.label === 'Total Deployed Capital');
      if (number && number.value !== '11.65 Billion Naira') {
        number.value = '11.65 Billion Naira';
        changed = true;
      }
    }

    if (section.__component === 'about-page.audience-section') {
      for (const persona of section.personas ?? []) {
        const questions = persona.questions ?? [];
        const governanceIdx = questions.findIndex(
          (q) => q.question === 'What is the green asset governance standard?'
        );
        if (governanceIdx !== -1) {
          questions.splice(governanceIdx, 1);
          persona.questions = questions;
          changed = true;
        }

        const denomination = questions.find(
          (q) => q.question === 'Are payments denominated in foreign currency?'
        );
        const correctAnswer =
          "No, all transactions are denominated in Nigerian Naira in accordance with InfraCredit's mandate to provide long term local currency loans.";
        if (denomination && denomination.answer !== correctAnswer) {
          denomination.answer = correctAnswer;
          changed = true;
        }
      }
    }
  }

  return changed;
}

/** Patches the Projects listing singleton: hero stats and analysis-tab stat boxes. */
function patchProjectsSections(sections) {
  let changed = false;
  const fixes = [
    { label: 'Capacity installed', value: '5.88' },
    { label: 'Connections powered', value: '51,666' },
    { label: 'Capital deployed', value: '₦11.65B' },
  ];

  for (const section of sections) {
    if (
      section.__component !== 'projects-page.hero-section' &&
      section.__component !== 'projects-page.analysis-tab-section'
    ) {
      continue;
    }

    const list = section.stats ?? section.statBoxes ?? [];
    for (const fix of fixes) {
      const stat = list.find((s) => s.label === fix.label);
      if (stat && stat.value !== fix.value) {
        stat.value = fix.value;
        changed = true;
      }
    }
  }

  return changed;
}

async function patchSingleType(strapi, uid, label, patchFn) {
  const documents = strapi.documents(uid);
  const populate = buildSectionsPopulate(strapi, uid);

  const draft = await documents.findFirst({ populate, status: 'draft' });
  if (!draft?.sections?.length) {
    strapi.log.info(`[patch-cfbf-edits] ${label}: no entry/sections found, skipping.`);
    return;
  }

  const partial = draft.sections.filter((section) => !isFullyPopulated(strapi, section));
  if (partial.length > 0) {
    strapi.log.warn(
      `[patch-cfbf-edits] ${label}: ${partial
        .map((s) => s.__component)
        .join(', ')} read back incomplete — skipping to avoid overwriting stored content.`
    );
    return;
  }

  const changed = patchFn(draft.sections);
  if (!changed) {
    strapi.log.info(`[patch-cfbf-edits] ${label}: already up to date, nothing to patch.`);
    return;
  }

  await documents.update({ documentId: draft.documentId, data: { sections: draft.sections }, populate });
  await documents.publish({ documentId: draft.documentId });
  strapi.log.info(`[patch-cfbf-edits] ${label}: patched and republished.`);
}

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();
  app.log.level = 'info';

  await patchSingleType(app, 'api::about.about', 'ABOUT page', patchAboutSections);
  await patchSingleType(app, 'api::projects.projects', 'PROJECTS page', patchProjectsSections);

  await app.destroy();
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
