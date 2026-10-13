# Example: From SBOM to Approval via curl

A complete end-to-end example: create a project, import a CycloneDX SBOM, wait for the analysis, read the results and request and grant an approval. The example uses `jq` to pick values out of the responses.

The key needs the scopes `manager` and `compliance_manager` (approving an approval needs `compliance_manager`; everything else here works with `manager`).

```bash
export TS_BASE="https://<your-host>/api/v2"
read -rs TS_API_KEY && export TS_API_KEY   # paste your published API key; it is not echoed or kept in the shell history

# 1. Check the key
curl -s -H "x-api-key: $TS_API_KEY" "$TS_BASE/account/authorization"

# 2. Create the project (returns the existing one if the name is taken)
PROJECT_ID=$(curl -s -X POST "$TS_BASE/core/projects" \
  -H "x-api-key: $TS_API_KEY" -H "Content-Type: application/json" \
  -d '{"name": "Webshop"}' | jq -r .projectId)

# 3. Import a CycloneDX SBOM as module "webshop-backend"
SCAN=$(curl -s -X POST \
  "$TS_BASE/core/imports/scan/cyclonedx/json?project=Webshop&module=webshop-backend" \
  -H "x-api-key: $TS_API_KEY" \
  -F "file=@bom.json")
SCAN_ID=$(echo "$SCAN" | jq -r .scanId)
MODULE_ID=$(echo "$SCAN" | jq -r .moduleId)

# 4. Wait until the analysis has finished
until [ "$(curl -s -H "x-api-key: $TS_API_KEY" "$TS_BASE/core/scans/$SCAN_ID" \
  | jq -r .analysisStatus)" = "Finished" ]; do sleep 5; done

# 5. Read the module's parts list and the project's vulnerability report
curl -s -H "x-api-key: $TS_API_KEY" "$TS_BASE/core/modules/$MODULE_ID/partsList"
curl -s -H "x-api-key: $TS_API_KEY" "$TS_BASE/core/reports/vulnerabilities?projectId=$PROJECT_ID"

# 6. Request an approval for this scan
APPROVAL_ID=$(curl -s -X POST "$TS_BASE/compliance/approvals" \
  -H "x-api-key: $TS_API_KEY" -H "Content-Type: application/json" \
  -d "{\"scanId\": \"$SCAN_ID\", \"name\": \"Webshop backend\", \"version\": \"1.0.0\"}" \
  | jq -r .approveId)

# 7. Approve it (compliance_manager scope)
curl -s -X POST -H "x-api-key: $TS_API_KEY" "$TS_BASE/compliance/approvals/$APPROVAL_ID/approve"
```

After step 7 the approval is a release. It appears under **Internal → Releases**, and you can share its documents with a [release key](05-public-routes.md).

## Notes

- The project must exist before you import into it. Step 2 is safe to repeat: it returns the existing project with `"existing": true`.
- The module is created on the first import and reused on later imports with the same `module` name. Use the same name on every upload path (scans, SBOM imports, SARIF).
- Step 3 sends the file as a multipart upload, which accepts files up to `TS_UPLOAD_MAX_MB` (default 50 MB). The JSON-body variant `POST /core/imports/scan/cyclonedx` is limited to 5 MB.
- In step 4, `analysisStatus` is `In progress` until the first analysis of this scan exists. Analysis needs the ts-legalcheck service for license evaluation and, when enabled, queries OSV for vulnerabilities.

## Related

- [Imports](endpoints/imports.md)
- [Scans](endpoints/scans.md)
- [Compliance approvals](endpoints/compliance-approvals.md)
- [Recipe: First module to SBOM](../recipes/01-first-module-to-sbom.md)
