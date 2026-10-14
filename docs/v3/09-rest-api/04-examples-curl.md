# Example: Importing a Scan via curl

A complete end-to-end example:

```bash
# 1. Upload a scan
curl -X POST https://api.trustsource.io/v2/core/scans \
  -H "x-api-key: YOUR_KEY" \
  -H "Content-Type: application/json" \
  -H "User-Agent: my-pipeline/1.0.0" \
  -d @scan-result.json

# 2. Check scan status
curl -H "x-api-key: YOUR_KEY" \
  https://api.trustsource.io/v2/core/scans/SCAN_ID

# 3. Get module components
curl -H "x-api-key: YOUR_KEY" \
  https://api.trustsource.io/v2/core/modules/MODULE_ID/partsList
```

Notes:

- `POST /core/scans` needs a `User-Agent` header; without it the call fails with `400` ("mandatory User-Agent header missing"). An agent name that ***TrustSource*** does not know is accepted; the response then carries an `info` note.
- The project named in the scan (`project`) must exist, otherwise the call fails with `404`. The module is created on the first upload.
- The response of step 1 carries `scanId` and `moduleId` for steps 2 and 3.
- Uploading needs a key with the `developer` or `manager` scope; reading the parts list needs `manager`, `compliance_manager`, `portfolio_manager` or `company_security_manager`. A key with the `manager` scope can run all three steps. See [Scans](endpoints/scans.md) and [Modules](endpoints/modules.md).
