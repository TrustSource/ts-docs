# Quick Check (License / Component)

> [!NOTE]
> **Required role:** `developer`, `compliance_manager`, `manager` or `account_admin`

***TrustSource*** lets you look up a license or component instantly — without creating a project, module or scan. Use it when you need a fast answer to "Can I use this library?" or "What obligations come with this license?".

## What it does

The Quick Check page gives you two lookup modes:

- **License check** — enter a license name (e.g. "MIT", "GPL-3.0-only") and see its classification, obligations, compatibility notes and whether your company policy allows it.
- **Component check** — enter a component identifier (e.g. `lodash`, `org.apache.commons:commons-lang3`) and see its known versions, licenses, vulnerabilities and metadata from the Component Lake.

## When to use it

- A developer asks "Can I add this dependency?" — check the license before you commit.
- A compliance manager wants to verify a license obligation without navigating into a specific module.
- You received a third-party SBOM and want to spot-check individual entries.

## How to use it

1. Navigate to **Inbound → Check** in the sidebar.
2. Select the check type: **License** or **Component**.
3. Type the name or identifier. Autocomplete suggests matches as you type.
4. Review the results.

📸 *Screenshot: the Check page with a license lookup result showing classification, obligations and policy status.*

For a **license check**, results include:

- License name and SPDX identifier
- Your company's approval status (allowed / restricted / forbidden)
- Obligation summary (attribution, copyleft, patent grant, etc.)
- Commercial terms (if configured)

For a **component check**, results include:

- Component name, ecosystem, known versions
- Declared and detected licenses
- Open vulnerabilities (CVE, GHSA)
- Dependent modules in your company (if any)

> [!TIP]
> Quick Check queries the same global databases as your scans — Component Lake and the license catalog. The difference is that results are not attached to any module or project.

## Related

- [Component Lake](../05-knowledge/01-component-lake.md) — browse and search the full component database
- [Licenses](../05-knowledge/05-licenses.md) — the license catalog with obligations and commercial terms
- [Open Source Policy](../05-knowledge/07-open-source-policies.md) — how policies classify licenses as allowed, restricted or forbidden
