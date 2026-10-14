# OBOM Tab

> [!NOTE]
> **Required license feature:** `obom`. Without it the tab, the OBOM column and all OBOM calls are absent.

An **operational BOM (OBOM)** records how software is actually run: the containers, platforms and runtimes it sits on. The **OBOM** tab of a [module](02-module-detail-tabs.md) shows the newest OBOM stored for that module. It complements the dependency view, which describes what the software is built from.

## How an OBOM arrives

OBOMs are uploaded, not entered by hand. ***TrustSource*** `ts-scan` sends one alongside the dependency scan, or you call the API from your pipeline. See the [OBOM endpoints](../../09-rest-api/endpoints/obom.md). The upload must name the module (or the whole project) it belongs to.

> [!TIP]
> The module list has an **OBOM** column showing which modules have one.

## Reading the tab

Open the module and click **OBOM**. A line above the table gives the **Source** tool and version, the **Created** date and the **CycloneDX** version. Three buttons switch the view:

- **Components**: a searchable table with **Name**, **Version**, **Type**, **purl** and **Findings**. Click a findings count to jump to those findings.
- **Findings (N)**: checks that tools reported on the operated environment, with the columns **Check**, **Tool**, **Severity**, **Title**, **Affected resources** and **Risk** (always empty on the module tab, see below). Resources that could not be matched show as *unresolved*. **show all** removes a component filter.
- **Raw JSON**: the CycloneDX document as stored, for copying.

A **Defaults scan** chip means the scan used default parameters, so resource names may differ in the real environment. If the OBOM cannot be loaded, the tab says so instead of showing an empty state.

📸 *Screenshot: the OBOM tab with the Components table and the Defaults scan chip.*

## Deployments

A module can have several OBOMs, one per deployment (for example `staging` and `production`). The tab shows the latest document; the project's [Deployments page](../01-projects/03-deployments.md) lists them all and links to a specific one, in which case the tab adds a **Deployment:** note.

## Risks from findings

The module tab only lists findings. **Create risk** and the link to an existing risk are on the project's [Deployments page](../01-projects/03-deployments.md#findings-and-risks), because OBOM risks belong to a project and deployment. Creating one needs the `risks` feature and one of the roles `developer`, `manager`, `portfolio_manager`, `compliance_manager` or `company_security_manager`.

## Related

- [Deployments](../01-projects/03-deployments.md)
- [OBOM endpoints](../../09-rest-api/endpoints/obom.md)
- [Risks](../05-risks/index.md)
