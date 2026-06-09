# Mental Model — Projects, Modules, Components, Products

The hardest part of learning a new platform is the vocabulary. Once you know what each word means in ***TrustSource***, the rest of the manual reads naturally. This page is the **glossary that everything else builds on**.

## The five core concepts

```
Company
  └── Project ──┬── Module                ──── Component (┬── Version)
                │   (in-house code)                       ├── License(s)
                │                                         └── Vulnerability(ies)
                ├── Infrastructure Module ──── Component (┬── Version)
                │   (3rd-party non-code:                  ├── License(s)
                │    DB, base image, web server, …)       └── Vulnerability(ies)
                │
                └── Approval / Release

  └── Product ──── Solution ──── Module / Release  (links into the structure above)
```

> [!TIP]
> Read this diagram from top to bottom. **Companies** are tenants, **Projects** are organizational, **Modules** and **Infrastructure Modules** are the two technical units of analysis, **Components** are the building blocks. **Products** sit on the side — they describe what you ship to the customer, not what you build.

### Company

The top-level tenant. All your projects, products, users, policies and integrations live inside one company. Users with multiple companies can switch between them via the company dropdown in the sidebar.

### Project

An organizational container. A project groups related modules — typically one project per software product line, business unit or team. Projects carry their own legal and obligation settings, default project / compliance manager, integration credentials (Jira, GitHub, TFS) and policy overrides.

📸 *Screenshot: project list with one project expanded to show modules.*

### Module

The **unit of analysis** in ***TrustSource***. A module represents one piece of software — a microservice, a library, a frontend, a firmware build — at a specific point in time. Each module has:

- A **set of components** — the bill of materials, populated by scans, SBOM uploads or manual entries.
- A **legal configuration** — which licenses are allowed, which are forbidden, which obligations apply.
- A **vulnerability view** — open CVEs, status per CVE, manual entries.
- An **approval history** — snapshots of the module at moments of formal release.

Modules belong to exactly one project. Module-level settings can override project-level defaults where it makes sense.

📸 *Screenshot: module detail page with the eight tabs (Settings, Legal, Viability, Vulnerability, Components, Dependencies, Graphs, Approve).*

### Infrastructure Module

A peer of the regular Module — but for **everything that goes into your project that you didn't write yourself**. Database servers, base container images, message brokers, web servers, runtimes, OS distributions: anything that is required to build, run or ship your software, but is not in-house code.

Infrastructure Modules exist because your supply chain risk does not stop at your application code. A vulnerability in your `mysql:8.0.36` server, an end-of-life `debian:11` base image or a known CVE in your `nginx` reverse proxy is just as relevant as a CVE in a npm package — and ***TrustSource*** treats it the same way: monitored, scored, and surfaced in your reports and approvals.

> [!NOTE]
> **This is a deliberate quality of TrustSource.** Many SBOM and SCA tools stop at the package manager boundary. We don't — we let you put the database, the base image and the message broker into the same project view as your code modules, so the picture is actually complete.

Concretely, an Infrastructure Module is a Module that points to one of the entries in the global **[Infrastructure catalog](#)** — for example `debian:bookworm`, `mysql:8.0.36`, `redis:7.2-alpine`. Once linked:

- Vulnerabilities and license findings for that infrastructure entry show up in the project just like for any other module.
- It participates in approvals, reports, BoMs and SBOMs.
- You can mark it as `public` (visible in shared SBOMs) or keep it internal-only.

Use Infrastructure Modules whenever you want to be honest about the **complete** runtime and distribution surface of your software — which is increasingly required by frameworks like the EU CRA, NIS2 and customer due-diligence questionnaires.

📸 *Screenshot: an infrastructure module in the project's module list, with its linked catalog entry and version visible.*

### Component

A third-party building block — a Maven artifact, an npm package, a system library, a COTS product, a piece of infrastructure. Components are **global** — they live in the [Component Lake](#) and are referenced from your modules. Each component has:

- One or more **versions** with their own metadata.
- One or more **licenses** (either declared or detected).
- Zero or more **vulnerabilities** (CVE / GHSA matched via CPE / PURL).
- Optional **CPE** entries for vulnerability matching.
- Cryptographic algorithms it uses (when known).

You normally don't manage components by hand — scans and SBOM imports do that for you. The manual entries you do make are usually for in-house libraries that no public scanner will find.

### Product

A product is **what you ship to the customer**. It can contain one or more modules and one or more releases. Products are particularly relevant for **EU Cyber Resilience Act (CRA)** compliance — they carry the CRA classification (STANDARD, IMPORTANT_1, IMPORTANT_2, CRITICAL), the misuse-case catalog, the PSIRT contact, the product documentation and the photo gallery.

> [!NOTE]
> The Products module is gated by the `products` license feature. Ask your account admin if you can't find the menu entry.

📸 *Screenshot: a product detail page with its eight tabs.*

## Two cross-cutting ideas

Two more concepts run through every screen in the app and deserve their own paragraph: the **traffic-light status** and the **audit log**.

### Status: green, yellow, red

Every object in ***TrustSource*** that can be in a *good* or *bad* state — components, licenses, vulnerabilities, modules, approvals, releases — carries a traffic-light status:

- 🟢 **Green** — OK. Nothing here needs your attention.
- 🟡 **Yellow** — Pay attention. Something is worth a look — a license that may need a decision, a low-severity CVE, a component approaching end-of-life.
- 🔴 **Red** — Alarm. Something needs treatment now — a forbidden license, a critical CVE, a policy violation, an EOL component still in production.

The status **rolls up**: a module that contains one red component is itself red. A project that contains one red module is red. The dashboard and lists make it easy to see at a glance where to look.

> [!TIP]
> The traffic lights are the day-to-day workflow. Most of the work in ***TrustSource*** is about turning red into yellow and yellow into green — by fixing the underlying issue, by accepting a risk with a comment, by adjusting your policies. Approvals and releases (see the [recipes](../recipes/)) are the moments where you say *"this state is good enough to ship"*.

### Audit log

Every state change — including the moment someone turned a 🔴 into a 🟢 and the reason they gave for it — is logged. The audit trail is always available to project managers and account admins, and the change history per object is one click away.

This matters because compliance work lives or dies by traceability. ***TrustSource*** doesn't let anyone silently make a problem disappear: if a status moved, you can always find out who, when, and why.

## How the pieces fit together in practice

A typical end-to-end flow looks like this:

1. You **create a project** (e.g. "Customer Portal").
2. You **add modules** to the project (e.g. "frontend", "api-gateway", "user-service").
3. You **add infrastructure modules** for what those services depend on (e.g. `postgres:16.3`, `redis:7.2-alpine`, `nginx:1.25.4`).
4. You **scan each code module** — via CI/CD, a repository scan, an SBOM upload, or `ts-scan` for container images. Components, versions, licenses and vulnerabilities show up automatically. Infrastructure modules are matched against the global infrastructure catalog instead.
5. You **review the findings** across both kinds of modules — license conflicts, new CVEs, EOL components — and adjust whitelists, blacklists or status flags.
6. When you're ready to ship, you **create an approval** for the relevant module. This freezes a snapshot of the bill of materials and runs it through eight review tabs.
7. You **link the approved module(s)** into a **product** as a *solution*. The product gets its CRA classification, contact list and documentation.
8. You **generate the customer-facing documents** — SBOM, notice file, CSAF advisory — and either share them via a public link or attach them to the release for archival.

> [!TIP]
> Not every project needs all of these steps. A small open-source library might stop at step 6 and skip infrastructure modules entirely. A medical device built under MDR — and most products in scope of the EU CRA — will use every single one, including the full runtime surface.

## Adjacent concepts you'll meet later

- **Scan** — one upload of analysis results from a tool, attached to one module. A module can have many scans over time.
- **Approval** — a quality milestone before shipping. Requested by the project manager, reviewed and signed off by a third party (compliance manager or security manager). The signed-off approval is **frozen** and cannot be changed afterwards.
- **Release** — the act of putting an approved state into the world. Freezes the SBOM at a specific version and starts continuous monitoring of that version for new vulnerabilities — even after the dev team has moved on.
- **Risk** — an entry in the per-project risk register (separate from CVEs; see the [Risks chapter](#) — *coming soon*).
- **Threat Model** — a STRIDE or LINDDUN model attached to a project (see [Threat Models chapter](#) — *coming soon*).

## Where to next

- *Account Types & Editions (coming soon)* — find out which features your edition includes.
- *A 5-Minute Tour (coming soon)* — see this model applied in the actual UI.
- **Inbound chapter** *(coming soon)* — start adding data to your first module.
