# Approval Detail Tabs

Each approval has an **Overview** tab plus eight review tabs (the SW Quality tab only appears with the `sarif` license). The compliance manager evaluates them before making a decision.

## Overview

The header shows key metrics: module count, component changes, tests passed, vulnerabilities resolved, legal actions, outdated components, Notice/SOUP completion percentages, and capabilities.

## Tabs

| # | Tab | What it shows |
|---|---|---|
| 1 | **Vulnerabilities** | Open CVEs, muted vulnerabilities, exploitability assessment. |
| 2 | **Licenses** | License compliance status, obligation tracking, notice file progress. |
| 3 | **Versioning** | Component outdatedness, dependency freshness, version lag. |
| 4 | **Viability** | End-of-life components, support status, lifecycle tracking. |
| 5 | **Status changes** | Audit trail of component changes — added, removed, updated since the last approval. |
| 6 | **Export Control** | Restricted/controlled component flags, export restriction assessment. |
| 7 | **Capabilities** | Software capabilities from approved modules. |
| 8 | **SW Quality** | SARIF quality results (if `sarif` license is enabled). |

📸 *Screenshot: the approval detail page with the Vulnerabilities tab active.*

> [!TIP]
> The **Status changes** tab is particularly useful — it shows exactly what changed since the last approval, so you only need to review the delta.

## Related

- [Approve / Reject](03-approve-reject-workflow.md) — making the decision
- [Requesting an Approval](01-request-approval.md) — how the approval was created
