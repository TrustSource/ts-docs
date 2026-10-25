# Knowledge

The **Knowledge** menu holds the reference data that ***TrustSource CE*** uses when it analyses your modules: the components it has seen, the infrastructure and commercial components it knows, the vulnerabilities reported for them, the license catalog and your company's open source policy. Every signed-in user can read these pages.

All data lives in your own installation. The catalogs grow from the scans you import and from what your users enter; TrustSource CE does not download a public component index. Searching public registries is planned for 1.1.0. Vulnerabilities come from OSV during analysis.

| Page | What it covers |
|---|---|
| [Component Lake](01-component-lake.md) | The components this installation knows: search, inspect versions, licenses and vulnerabilities. |
| [Infrastructure Elements](02-infrastructure-elements.md) | Operating systems, base images, servers and other infrastructure components. |
| [3rd party (COTS)](03-cots.md) | Commercial off-the-shelf components with their commercial terms. |
| [Vulnerability Lake](04-vulnerability-lake.md) | The OSV vulnerabilities found for the components this installation analysed; vulnerability and CWE lookup. |
| [Licenses](06-licenses.md) | The license catalog with license texts. |
| [Open Source Policy](07-open-source-policy.md) | Your company's active open source policy. |

> [!NOTE]
> The component, infrastructure, COTS and license catalogs are shared by all companies of an installation. Only users with the **Company component manager** role can change them; see [Infrastructure Elements](02-infrastructure-elements.md#maintain-the-catalog), [3rd party (COTS)](03-cots.md#maintain-the-catalog) and [Licenses](06-licenses.md#edit-the-catalog). A change takes effect for every later analysis of every company. The first user of a company holds all seven roles, including Company component manager; that applies to the initial admin and, when self sign-up is enabled, to every user who signs up and creates a company. On an installation shared by several organisations, decide deliberately who keeps this role.

Cryptographic algorithms are managed under **Administration → Policies → Crypto algorithms** and **Administration → Settings → Private algorithms** (see [Policies](../06-administration/05-policies.md)). The **Copyright & Trademarks** page is linked from the copyright line at the bottom of the left menu; see [Quick Tour](../00-getting-started/04-quick-tour.md#copyright-trademarks). Trainings and the AI chat assistant of the SaaS edition are not part of TrustSource CE; see [CE and SaaS compared](../13-ce-vs-saas.md).
