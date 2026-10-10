# Public Routes

Some compliance data can be fetched without an API key, using a secret key in the URL instead:

- **Release keys** — fetch the SBOM, Notice file and CSAF documents of a published release under `/compliance/releases/{release_key}/...` (`sbom`, `notice`, `csaf`, `csaf-changes`). Create and scope release keys under **Administration → API keys → Release keys**; see [Release keys](../06-administration/04b-release-keys.md).
- **CSAF feed keys** — read your company's CSAF documents through the key-scoped, TLP-filtered feed under `/compliance/csaf/{csaf_key}/documents`. See [CSAF](../04-outbound/04-csaf.md).

Treat these keys like passwords: anyone who holds one can read what it serves.

> [!WARNING]
> The older **Public BoM** and **Public Notice** routes (`public-BoM`, `public-Notice`) are deprecated and not part of the v2 specification. Use release keys instead.

For the approval-based sharing links, see [Public Approves](../03-internal/06-approvals/05-public-approves.md). Details on release keys: [Release keys](../06-administration/04b-release-keys.md).
