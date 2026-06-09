# Your first module: from scan to signed-off SBOM in 15 minutes

This recipe takes you from "I just got a ***TrustSource*** login" to "I have an audit-ready SBOM for my software" — without spending an afternoon reading the manual first.

> [!NOTE]
> **Goal:** A complete bill of materials for one piece of your software, signed off through an approval, frozen as a release that ***TrustSource*** keeps watching for new vulnerabilities, and exported as an SBOM in SPDX or CycloneDX format.
>
> **Time:** ~15 minutes if you wear both the developer and project-manager hats (typical first-time scenario in a small team). If a different person has to do the approval, the wall-clock time depends on their availability — the approval review itself takes only a few minutes.
>
> **You'll need:**
>
> - A ***TrustSource*** account with at least the `developer` role (your account admin grants this — see [Roles & Licenses](../00-getting-started/index.md)).
> - For step 7 onwards: someone with the `manager` or `compliance_manager` role for your project. This may be you.
> - A small repository to scan. Any of Maven, npm, NuGet, PyPI or a folder of source code works.
> - **Python 3.10, 3.11 or 3.12** installed locally for running [`ts-scan`](https://trustsource.github.io/ts-scan).
>
> **What you'll have at the end:**
>
> - One project with one module in your company.
> - A scan result populating the module's bill of materials.
> - An approval signed off by the project manager.
> - A release that freezes the bill of materials and is monitored continuously for new vulnerabilities.
> - A downloadable SBOM file in your chosen format.

## Steps

### 1. Create your first project

In the left navigation, open **Internal → Projects** and click **+ New Project**. Give it a name that makes sense to your team — for example, the name of the product or service this software belongs to.

📸 *Screenshot: project list with the "+ New Project" button highlighted.*

> [!TIP]
> Don't overthink the project name yet. You can rename it later, and you can move modules between projects.

### 2. Create an API key

Go to **Administration → Scanners & API Keys** and create a new key.

> [!CAUTION]
> The API key is shown **once**. Copy it immediately into a safe place — a password manager, your CI secret store, or for this recipe, just an environment variable in your shell.

📸 *Screenshot: API key creation dialog, with the one-time-only key revealed.*

```bash
export TS_APIKEY="<paste-your-key-here>"
```

### 3. Install ts-scan locally

In your terminal:

```bash
pip install ts-scan
```

Verify it works:

```bash
ts-scan --version
```

For details and troubleshooting, see the [`ts-scan` installation guide](https://trustsource.github.io/ts-scan/setup).

### 4. Scan your repository and upload the result

Move into the root of the repository you want to scan. Then run:

```bash
ts-scan scan -o myscan.json /path/to/your/project
```

This produces `myscan.json` in the TrustSource internal format. ***ts-scan*** auto-detects the package management system — Maven, npm, NuGet, PyPI and more — and walks the dependency tree.

> [!TIP]
> If your project uses several ecosystems (e.g. a frontend in npm and a backend in Maven), `ts-scan` handles them in one pass. See the [`ts-scan` usage docs](https://trustsource.github.io/ts-scan/usage) for ecosystem-specific options.

Now upload the result to your project:

```bash
ts-scan upload \
  --apikey "$TS_APIKEY" \
  --project "<your project name>" \
  myscan.json
```

> [!TIP]
> **You don't have to create the module beforehand.** ***TrustSource*** creates it automatically on the first upload, taking the module name from the artefact ***ts-scan*** detected (the package name, the directory name, the image name, depending on what you scanned). On subsequent uploads of the same artefact, the existing module is updated in place.

> [!NOTE]
> Exact CLI flags may vary slightly between `ts-scan` versions. Run `ts-scan upload --help` if the syntax above doesn't match what you have.

### 5. Review the results and identify ToDos

Open your project in the app. The newly-created module is listed there — click it to open. Within a few seconds, its **Components** tab is populated with everything ***ts-scan*** found.

📸 *Screenshot: module Components tab freshly populated after a scan, with traffic-light indicators visible.*

The module now carries a **traffic-light status** (see [Mental Model](../00-getting-started/05-mental-model.md#status-green-yellow-red)) — almost certainly 🟡 yellow or 🔴 red, because any non-trivial scan surfaces something. Take a tour:

- **Components** — the bill of materials. Click any component to see its versions, declared and detected licenses, and any known vulnerabilities. Each row carries its own status.
- **Vulnerability** — every CVE / GHSA matched against the components, sortable by severity.
- **Dependencies** and **Graphs** — the dependency tree, in list and visual form.

The day-to-day work in ***TrustSource*** is a loop: **look at the reds and yellows, decide what to do about each one, watch the status improve.** Some yellows turn green by fixing the underlying problem (upgrade a component, swap a license), some by accepting a risk with a comment, some by adjusting your project's whitelist. This back-and-forth between the developer and the project manager is the normal mode.

> [!TIP]
> You don't need to be exhaustive on the first pass. The goal here is just to understand the shape of the findings — not to drive everything to green before lunch.

### 6. Request an approval (project-manager step)

> [!NOTE]
> **Approvals are not done on every upload.** They are the **milestone** before a release. The day-to-day work in steps 4–5 is the loop: scan, look at the traffic lights, fix things, scan again. **Only when the module's status is good enough to ship** does the project manager request an approval.

Approvals are a **project governance step**, not a self-service action. They are **requested by the project manager** of your project — the role that holds accountability for what gets signed off — and reviewed by **a separate person**: typically the **compliance manager** or **security manager**. This four-eyes principle is what makes the approval auditable.

In a small team where you wear multiple hats, you can do both yourself. Otherwise, ping your project manager and ask them to start an approval against the current state of your module — the easiest way is to share the module URL.

📸 *Screenshot: project manager initiating an approval from the module's Approve tab.*

### 7. Walk through the eight review tabs

The **compliance manager** (or **security manager**) — not the requester — opens the approval and works through the eight tabs:

| Tab | What gets reviewed |
|---|---|
| **Vulnerabilities** | Every CVE in the snapshot. Each gets a status — *open*, *mitigated*, *not affected* or *risk accepted*. |
| **Licenses** | Every license found and its obligations. Watch for forbidden licenses or conflicts. |
| **Versioning** | How far behind current each component is. |
| **Viability** | End-of-life, low maintainer activity, low community score. |
| **Changes** | The diff to the previous approval (skip on the first one). |
| **Export Control** | Dual-use / ECCN classification. Skip if not relevant. |
| **Tests** | Linked test results — empty if no SARIF has been uploaded. |
| **Capabilities** | Feature flags / capabilities asserted for this release. |

📸 *Screenshot: approval tab bar with the eight tabs visible.*

For a first approval, the goal isn't exhaustive review — it's to **see what's there** and catch any show-stopper (e.g. a GPL-3.0 in a module you ship as proprietary).

### 8. Approve

Once the review is done, the compliance/security manager clicks **Approve**. This is the formal sign-off: from here on, the approval is **frozen** — the immutable record that this state of the module was accepted, by whom, and at what moment.

> [!WARNING]
> An approved approval cannot be edited afterwards. If something needs to change, the next iteration goes into a **new** approval. That's how the audit trail stays intact.

> [!TIP]
> ***TrustSource*** logs every state change across the platform. If anyone — at any point — turned a 🔴 status into a 🟢, or accepted a risk with a comment, it's recorded with timestamp, user and reason. The approval is the formal milestone, but the log behind it is what makes the whole story auditable. See the [Mental Model — Audit log](../00-getting-started/05-mental-model.md#audit-log).

### 9. Create a release

The approval says "we accept this state." A **release** says "this state is now what we ship." Releases are the central concept for what gets monitored long-term.

What a release does:

- **Freezes the SBOM** at a specific version — no further changes possible.
- **Triggers ongoing monitoring** — ***TrustSource*** keeps watching the components in this release for new vulnerabilities, end-of-life events and policy violations, and raises alerts.
- **Creates the artifact you ship** — the release-SBOM is what you hand to customers, attach to a build pipeline, or store in your audit archive.

You can create a release in two ways:

- **From inside the app** — the project manager opens the module's **Releases** tab (or **Internal → Releases**) and creates a release referencing the approved version. Useful for manual / human-paced ship cadences.
- **From outside via CI/CD** — your build pipeline calls the ***TrustSource*** API at the moment the build is published. Useful for high-frequency releases or when the human approval already happened upstream.

📸 *Screenshot: release dialog showing the version field and the link to the approved module state.*

> [!TIP]
> **Why this matters.** A release-SBOM is what stays in the field — running on customer machines, baked into firmware, or shipped as a container. Your dev team may be 256 commits ahead, but the release stands still. ***TrustSource*** keeps that frozen SBOM under continuous watch, so the day a new CVE drops on a component you released six months ago, you get the alert — even if nobody on the team remembers that version exists anymore.

### 10. Download the release-SBOM

From the release, open the **Documents** action and pick your format:

- **SPDX** (JSON, YAML or tag-value) — the most widely accepted standard, especially in enterprise procurement.
- **CycloneDX** (JSON or XML) — popular in vulnerability tooling, especially with VEX support.

📸 *Screenshot: SBOM export dialog from a release.*

That's the file you ship — and the one ***TrustSource*** will keep watching for as long as the release exists.

## Did it work?

You're done if all of the following are true:

- [ ] Your project shows one module with a populated **Components** tab.
- [ ] The module's **Vulnerability** tab lists CVEs (or shows "no findings").
- [ ] An **approved approval** is visible under the module's **Approve** tab.
- [ ] A **release** appears under the module's **Releases** tab (or in **Internal → Releases**), referencing the approval.
- [ ] The downloaded SBOM file opens in any text editor and lists your components.

## Variants

- **No `ts-scan` available?** Skip steps 3–4 and instead upload an SBOM you already have via **Outbound → SBOM Files → Upload**. The rest of the recipe is identical.
- **Container image instead of source code?** Use `ts-scan` against your image — see the [`ts-scan` container guide](https://trustsource.github.io/ts-scan/container) — then continue from step 5.
- **Already running in CI/CD?** Step 4 (scan + upload) and step 9 (release creation) can both be triggered from your build pipeline. The recipe *Integrate TrustSource into your CI/CD pipeline* (coming soon) covers the patterns.
- **You're not the project manager?** Steps 1–5 are yours; ping the PM after step 5 with the module URL so they can request the approval and trigger the release.

## What's next

- Add an [Infrastructure Module](../00-getting-started/05-mental-model.md) to the same project so your release-SBOM covers your runtime surface, not just your code — that's where ongoing CVE monitoring really earns its keep.
- Configure a [whitelist or blacklist](#) *(coming soon)* so future approvals surface only the findings that actually matter to you.
- Connect ***TrustSource*** to your issue tracker so CVE alerts on a release automatically open Jira / GitHub / TFS tickets *(coming soon)*.
- Set up [public sharing](#) of this release-SBOM for a customer who doesn't have a ***TrustSource*** login *(coming soon)*.
- React to a 0-day CVE on a release that's already in the field — see *React to a 0-day in an already-released module* (coming soon).
