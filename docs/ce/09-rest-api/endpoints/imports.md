# Imports (CycloneDX, SPDX)

> Import an SBOM produced by another tool into a project. The import creates a scan and a module analysis, exactly like a dependency scan.

## Use cases

- Bring SBOMs from container scanners, build plugins or another SCA tool into ***TrustSource CE***.
- Import a CycloneDX 1.7 document that also carries cryptographic assets (CBOM) or machine-learning models (AIBOM).
- Import SBOMs of supplier software.

## Operations

| Method | Path | What it does | Scopes |
|---|---|---|---|
| POST | `/core/imports/scan/cyclonedx` | Import CycloneDX (JSON request body) | `developer`, `manager` |
| POST | `/core/imports/scan/cyclonedx/json` | Import CycloneDX (JSON file upload) | `developer`, `manager` |
| POST | `/core/imports/scan/spdx` | Import SPDX (JSON request body) | `developer`, `manager` |
| POST | `/core/imports/scan/spdx/json` | Import SPDX (JSON file upload) | `developer`, `manager` |
| POST | `/core/imports/scan/spdx/rdf` | Import SPDX (RDF file upload) | `developer`, `manager` |

The imports hand the converted document to the scan intake, which accepts `developer` and `manager`. A key with only other scopes gets `403` `"API-key scope is limited"`.

## Query parameters

| Parameter | Required | Meaning |
|---|---|---|
| `project` | Yes | Name or id of an **existing** project. `projectName` is accepted as an alias. |
| `module` | No | Module name. `moduleName` is accepted as an alias. Without it, the module name is taken from the document. |
| `pkgType` | No | Package type to apply to components without a package URL, for example `npm` or `maven` |
| `version` | No | Format version. CycloneDX uses the document's `specVersion` first; this is the fallback. |
| `release`, `branch`, `tag` | No | Release identifier, SCM branch and tag stored with the scan |
| `binaryLinks` | No | Artefact link stored with the scan |
| `demo` | No | `true` marks the scan and module as demo data |

## Request body

- **JSON body** (`/cyclonedx`, `/spdx`): send the document itself with `Content-Type: application/json`. Limited to 5 MB.
- **File upload** (`/cyclonedx/json`, `/spdx/json`, `/spdx/rdf`): send `multipart/form-data` with one file part named `file`. Limited by `TS_UPLOAD_MAX_MB` (default 50 MB). Prefer this for real SBOMs.

```bash
curl -X POST \
  "https://<your-host>/api/v2/core/imports/scan/cyclonedx/json?project=Webshop&module=webshop-frontend" \
  -H "x-api-key: $TS_API_KEY" \
  -F "file=@bom.cdx.json"
```

Supported formats: CycloneDX 1.2 to 1.7 in JSON, SPDX JSON and SPDX RDF. SPDX tag-value and spreadsheet formats are not supported.

## Responses

| Status | Body |
|---|---|
| `201` | `{"scanId": "...", "moduleId": "..."}`, plus `warning`, `contentNotices` or `info` when values were dropped or noticed |
| `400` | The document or a parameter failed validation, or the body is not a JSON object |
| `404` | The project does not exist |
| `413` | The uploaded file is larger than `TS_UPLOAD_MAX_MB` |

The analysis runs in the background. Poll `GET /core/scans/{scan_id}` until `analysisStatus` is `Finished`. See [Scans](scans.md).

## CycloneDX: crypto and AI assets

In a CycloneDX document, components of type `cryptographic-asset` are not imported as dependencies. They are stored as the module's cryptographic assets and linked to the components that reference them through the `dependencies` graph. Components of type `machine-learning-model` are stored as the module's AI artefacts. They show up on the module's **Crypto management** and **AI / ML** settings tabs and in the [CBOM and AIBOM exports](modules.md#parts-list-sbom-aibom-and-cbom). Use this endpoint to publish a CBOM or AIBOM together with the SBOM.

For each component the strongest hash is imported (SHA-512, then SHA-384, SHA-256, SHA-1, MD5). External references of type `website`, `vcs`, `issue-tracker`, `mailing-list`, `distribution` and `documentation` become the component's links.

## Module naming

The module is matched by exact name inside the project and created on the first import. Use the same `module` value as your dependency scans and SARIF uploads for the same software; otherwise you get separate modules. See [Module naming](modules.md#module-naming).

## Related

- [Scans](scans.md)
- [Import Scans](../../02-inbound/02-import-scans.md) - the same import in the app
- [Recipe: Migrate from another SCA](../../recipes/11-migrate-from-another-sca.md)
- [Endpoint groups](index.md)
