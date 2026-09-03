import type { StrapiApp } from '@strapi/strapi/admin';

import { ExportAllButton } from './extensions/email-log/ExportButton';
import { ExportBulkAction, ExportDocumentAction } from './extensions/email-log/actions';

export default {
  config: {
    locales: [],
  },
  bootstrap(app: StrapiApp) {
    const contentManager = app.getPlugin('content-manager');

    // "Export all" in the list view header.
    contentManager.injectComponent('listView', 'actions', {
      name: 'export-email-log',
      Component: ExportAllButton,
    });

    // "Export" for the rows selected in the list view.
    (contentManager.apis as any).addBulkAction([ExportBulkAction]);

    // "Export" for a single entry, from its edit view.
    (contentManager.apis as any).addDocumentAction([ExportDocumentAction]);
  },
};
