# Recipe: CRA Product Classification

Record a product, its class under the EU Cyber Resilience Act (CRA) and the information the CRA asks manufacturers to keep: contacts, misuse cases, support period, the releases that make up the product, and its documents.

> [!NOTE]
> **You'll need:** the role **Developer**, **Compliance manager**, **Company security manager** or **Account admin** (these may change products), and for step 6 at least one approved release (see [Your first module: from scan to signed-off SBOM](01-first-module-to-sbom.md)).
>
> ***TrustSource CE*** records the classification you choose. It does not decide the class for you. For the regulation itself see [Background: CRA](../../shared/background/01-cra-cyber-resilience-act.md).

## Steps

### 1. Create the product

Open **Internal → Products** and select **Add**. Fill in:

- **Parent** - optional, places the product under another product in the tree;
- **Identifier** - your external key, unique within the company;
- **Type** - **Class**, **Family**, **Variant**, **Version** or **Position**;
- **Name** and **Purpose**.

Tick **Draft** for a test product that you can remove later. Select **Add**, then select the product in the tree.

📸 *Screenshot: Products page with the "Add product" dialog.*

### 2. Describe it

On the **Information** tab, complete **Purpose** and **Features**. These describe the intended use, which the classification and the misuse cases build on.

### 3. Classify it

Open the **Classification** tab and choose under **Classified as**:

| Value | CRA category |
|---|---|
| **STANDARD** | Default category |
| **IMPORTANT Class 1** | Important product, class I |
| **IMPORTANT Class 2** | Important product, class II |
| **CRITICAL** | Critical product |

Select **Save**. Below the field the app lists sample product areas for the chosen value, as a quick plausibility check.

📸 *Screenshot: Classification tab with "IMPORTANT Class 1" selected and the sample areas listed.*

### 4. Add the contacts

On the **Contacts** tab fill in **Registered Trade Name**, **Manufacturer Name**, **Manufacturer Address**, **Manufacturer Website**, **Product Security Contact** and its **Weblink**, then **Save**. These are the manufacturer and vulnerability-reporting contacts the CRA requires.

### 5. Record misuse cases and support

- **Misuse** tab: **Add potential misuse case** for each reasonably foreseeable misuse.
- **Support** tab: **Add contract** for each support commitment with its end date. **Generate EoL info** creates a machine-readable JSON file with the end-of-support dates of these contracts.

### 6. Link the releases

On the **Solutions** tab select **Add solution** and **Add** the approved releases that make up the product. **Generate SBOM** creates an SBOM across the linked solutions; the file appears on the **Documents** tab.

### 7. Attach the documents

On the **Documents** tab select **Add new document** to upload the **User Manual**, **Secure Setup**, **Product Description**, **SBOM file** and **CE mark declaration**. Uploading again replaces a document. **Download all** downloads them together.

## Did it work?

- [ ] The product shows its class on the **Classification** tab.
- [ ] **Contacts**, **Misuse** and **Support** are filled in.
- [ ] The **Solutions** tab lists the releases, and the **Documents** tab holds the SBOM.

## Variants

- **From a script:** create and update products, misuse cases, support contracts, solutions and documents with the [Products API](../09-rest-api/endpoints/products.md). The class is the `classification` field: `STANDARD`, `IMPORTANT_1`, `IMPORTANT_2`, `CRITICAL`.
- **Many products:** **Import** on the **Products** page loads a product structure from a JSON file; **Export** writes one.

## Related

- [Products](../03-internal/03-products/index.md)
- [Classification tab](../03-internal/03-products/04-tab-classification-cra.md)
- [Link with release](../03-internal/03-products/10-link-with-release.md)
- [React to a 0-day](04-react-to-0day.md) - CRA reporting starts with knowing what is affected
