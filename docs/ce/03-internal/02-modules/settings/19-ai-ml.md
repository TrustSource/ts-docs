# AI / ML (Module)

> [!NOTE]
> **Required role:** the tab is shown to everyone who can read the module's Crypto management tab. **Add AI artifact**, edit, remove and **Export as CycloneDX** need Developer, Compliance manager or Manager. See the [Module Settings Permission Matrix](../../../10-roles-permissions/06a-module-settings-matrix.md).

The **AI / ML** tab manages the AI artifacts of a module, the basis of its **AIBOM** (AI bill of materials). It has the same structure as [Crypto management](10-encryption.md) and sits next to it. It is not shown for infrastructure and COTS modules.

## List of AI artifacts as detected

The upper panel lists the machine-learning models and AI artifacts found in the module's components, for example `image-classifier [1.0] · image-classification`. If there are none, it reads *No machine-learning-model components or AI artifacts identified*. Models arrive with a scan or a CycloneDX import.

## List of AI artifacts as managed

The lower panel holds the artifacts you maintain by hand, in addition to what the scan found. Columns are **Added**, **Name**, **Version**, **Details** (provider, task, family, architecture) and **Comment**.

Click **Add AI artifact** (or the pencil on a row for **Edit AI artifact**), fill in the fields and click **Save**:

| Field | Example |
|---|---|
| **Name** (required) | `image-classifier` |
| **Version** | `1.0` |
| **Provider** | `Example AI` |
| **Task** | `image-classification` |
| **Model family** | `vision-transformer` |
| **Architecture** | `ViT-B/16` |
| **PURL** | `pkg:huggingface/example-org/image-classifier@1.0` |
| **Comment** | optional note |

The bin icon removes an artifact.

## Export as CycloneDX

**Export as CycloneDX** offers **AIBOM** (only the AI artifacts) and **Full BOM (components + crypto + AI)**. Both download a CycloneDX JSON file. The same documents are available through the REST API, see [Modules endpoints](../../../09-rest-api/endpoints/modules.md).

AI models also appear in the **AI / ML models** section of the component side panel; see [Component details](../04-component-detail.md).

![The AI / ML tab of payment-service: List of AI artifacts as detected, and List of AI artifacts as managed with Add AI artifact, Export as CycloneDX and the models fraud-scoring-model 2.1 and chargeback-classifier 1.0 with provider, task, family, architecture and comment.](../../../../assets/images/ce/03-internal/02-modules/settings/19-ai-ml-1.webp)

## Related

- [Crypto management](10-encryption.md)
- [SBOM + CBOM](../../../04-outbound/01-sbom-cbom.md)
