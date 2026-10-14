# Recipe: Share an SBOM Publicly

Share an SBOM with a customer without giving them a TrustSource login.

## Steps

1. Approve the module via the [approval workflow](../03-internal/06-approvals/index.md). ***TrustSource*** publishes a [release key](../03-internal/06-approvals/05-public-approves.md) for the approval; you do not have to mark it as public.
2. Find the key with **Published keys** on the release, or under **Administration → API keys → Release keys**. There you can limit its scope or show its URL as a QR code. See [Release keys](../06-administration/04b-release-keys.md).
3. Share the URL with your customer: `https://api.trustsource.io/v2/compliance/releases/<release_key>/sbom` (or `/notice`, `/csaf`).
4. The customer can fetch the SBOM, the notice file and the CSAF VEX of the release, as far as the key's scope allows.
