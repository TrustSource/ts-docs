# Example: Importing a Scan via curl

A complete end-to-end example:

```bash
# 1. Upload a scan
curl -X POST https://app.trustsource.io/api/v1/scans \
  -H "x-apikey: YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d @scan-result.json

# 2. Check scan status
curl -H "x-apikey: YOUR_KEY" \
  https://app.trustsource.io/api/v1/scans/SCAN_ID

# 3. Get module components
curl -H "x-apikey: YOUR_KEY" \
  https://app.trustsource.io/api/v1/modules/MODULE_ID/components
```
