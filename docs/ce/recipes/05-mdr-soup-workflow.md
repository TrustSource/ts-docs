# Recipe: MDR SOUP Workflow

Generate a Software of Unknown Provenance list for a medical device project.

## Prerequisites

- Medical account with `medical` and `soup_report` license features.
- Module with scan data and [MDR/IVDR classification](../03-internal/02-modules/settings/07-module-classification-mdr-ivdr.md) configured.

## Steps

1. Configure the module's MDR/IVDR classification.
2. Ensure a scan with complete component data is available.
3. Create an [approval](../03-internal/06-approvals/index.md) — the SOUP file is generated automatically.
4. Review the SOUP file in [Outbound → SOUP Files](../04-outbound/02-soup-files.md).
5. Approve the module to freeze the SOUP document.
