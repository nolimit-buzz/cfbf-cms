import { Download } from '@strapi/icons';

import { EMAIL_LOG_UID, useExportEmailLog } from './ExportButton';

/**
 * These are not components that render JSX — they are hook-shaped functions
 * returning a descriptor object, and returning `null` opts out.
 *
 * The collection guard is mandatory: the action APIs are global, so without it
 * an "Export" entry appears on every collection type in the CMS. The list view
 * reads the collection from `useParams().slug`; here it arrives as `model`.
 */

/**
 * "Export" entry in the bulk-actions bar that appears once rows are checked.
 * Checking a single row is how you export one entry from the list.
 */
export const ExportBulkAction = ({ model, documents }: any) => {
  const { exportLog, isLoading } = useExportEmailLog();

  if (model !== EMAIL_LOG_UID) return null;

  const ids = (documents ?? [])
    .map((doc: any) => doc.documentId ?? doc.id)
    .filter(Boolean);

  return {
    label: 'Export',
    icon: <Download />,
    variant: 'secondary',
    disabled: isLoading || ids.length === 0,
    onClick: () => exportLog(ids),
  };
};

/** "Export" button in the panel of a single entry's edit view. */
export const ExportDocumentAction = ({ model, document }: any) => {
  const { exportLog, isLoading } = useExportEmailLog();

  const id = document?.documentId ?? document?.id;
  if (model !== EMAIL_LOG_UID || !id) return null;

  return {
    label: 'Export',
    icon: <Download />,
    variant: 'secondary',
    position: ['panel'],
    disabled: isLoading,
    onClick: () => exportLog([id]),
  };
};
