# Deployments

> [!NOTE]
> **Required role:** `developer`, `compliance_manager`, `manager` or `account_admin`, with read access to the project's OBOM
> **Required license feature:** `obom`

A **deployment** is one environment your software runs in, for example `production-eu` or `staging`. The **Deployments** page of a project shows the newest Operational BOM (OBOM) for every deployment, for the project as a whole and for each module. You can also compare two deployments to see what differs between them. ***TrustSource*** shows the page only if your plan includes `obom`.

Open it from the **Deployments** tile on the [project page](02-project-overview.md), or via **Compare** on the tile.

## Where deployments come from

OBOMs are uploaded by `ts-scan` or through the [OBOM endpoints](../../09-rest-api/endpoints/obom.md). The deployment name travels in the OBOM itself (up to 100 characters). An OBOM without a name appears in the column **(no deployment)**, marked *Legacy upload*, so older uploads do not disappear. An empty page says "No deployment reported yet".

## The Deployments tile

The tile on the project page shows the number of deployments and up to four chips such as `production-eu · 3 d` (name and age of the newest document); more are summarised as `+2`. A chip marked with ◌ was generated with default parameters. **Compare** appears once the project has two or more deployments.

## The matrix

The matrix has one row per scope (the project itself and each module) and one column per deployment. Each cell shows the age of the newest OBOM, its number of components and, if the document carries findings, a red findings chip. A cell also says whether it was scanned with:

- **Defaults**: default parameters, so resource names may differ from the real environment.
- **Explicit**: deployment-specific parameters.

Click a module cell to open the module's [OBOM tab](../02-modules/07-obom-tab.md). Click a project cell to open the document in place below the matrix, with the **Components**, **Findings** and **Raw JSON** views; **Close** hides it.

![The Deployments page of Example Webshop with the Compare deployments button and the matrix of the scopes Project (overall), order-service, payment-service and shop-frontend against the deployments development, production-eu and staging: each cell shows the age and number of components, red findings chips, Explicit chips and one Defaults chip for order-service in production-eu.](../../../assets/images/v3/03-internal/01-projects/03-deployments-1.webp)

## Compare two deployments

1. Click **Compare deployments**.
2. Choose a deployment in each of the two lists (**Compare** ... **with** ...) and click **Compare**. **Hide** closes the form.
3. Read the summary line, for example "3 differences · 1 scope only in staging".

The result table lists each scope with the components only in the first deployment, those with a differing version and those only in the second. Expand a row to see component names, versions and purls. Findings that exist in only one deployment, or on different resources, are listed under **Findings**. Use **Show unchanged components** to see the rest.

> [!NOTE]
> If both documents of a scope were generated with default parameters, the scope is marked "Not comparable": differences could be tool defaults rather than real environment differences.

The comparison is in the page address (`?compare=1`), so you can share the link.

## Findings and risks

OBOM findings can become risks, one per check and deployment: click **Create risk** on a finding, or switch on **Create risks from OBOM findings** under [Quality settings](settings/04-quality.md). Both need the `risks` license.

## Related

- [OBOM tab of a module](../02-modules/07-obom-tab.md)
- [OBOM endpoints](../../09-rest-api/endpoints/obom.md)
