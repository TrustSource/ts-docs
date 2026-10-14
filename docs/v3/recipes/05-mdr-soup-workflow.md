# Recipe: MDR SOUP Workflow

Generate a Software of Unknown Provenance list for a medical device project.

## Prerequisites

- The license flag `medical` or the plan feature `soup_report` (either one shows **SOUP Lists**). The MDR/IVDR classification tab needs the Medical account type.
- A module with scan data and its [MDR/IVDR classification](../03-internal/02-modules/settings/07-module-classification-mdr-ivdr.md) configured.

## Steps

1. Configure the module's MDR/IVDR classification.
2. Ensure a scan with complete component data is available.
3. Create the SOUP file: start an [approval](../03-internal/06-approvals/index.md), which creates one, or select **Create soup file** under **Outbound → SOUP Lists**.
4. Open the file in [Outbound → SOUP Lists](../04-outbound/03-soup-lists.md), document each component and tick **cleared** when it is complete.
5. Select **Freeze** to lock the SOUP file, and **PDF** to download it.
