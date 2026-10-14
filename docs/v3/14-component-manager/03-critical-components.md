# Critical Components

> [!NOTE]
> **Required role:** `component_manager` (an [internal role](../10-roles-permissions/02-internal-roles.md))

**Critical Components** is the worklist for fixing the component database. It lists components that have versions **without licenses** or **with a license without a key**: data that makes the license assessment of every scan using them unreliable. Open **Component mngr. → Critical Components**.

## Find components to fix

The header counts the matching components and states that **up to 50 of them are shown**. Tabs split the list by package type, each with its own counter:

- **GitHub, Maven, Nuget, Npm, Pypi, Ossf**: components that are due a crawl by the matching crawler;
- **Deb, CocoaPods, Apk, Cargo, Dart, Go**: all matching components of that package type, whether or not a crawler exists for it;
- **No filter**: everything.

The tab strip scrolls sideways. **Show private** / **Hide private** includes or excludes private components. The table shows **Updated**, **Name**, **Comment**, the package icon and **Links** to homepage and repository; filter it with the search box.

## Fix a component

Select a row to open the component's edit page with the tabs **Info**, **CPE**, **Crawlers** and **Logs**. Set the licenses of the affected versions, or select several versions and use **Set to selected**. A version filter narrows long lists. **Soft-delete** marks a bad entry as removed. You can also start a **DeepScan** or request a **Scorecard** from the repository field. The result opens in TrustSource with **View results**. See [Manage Infrastructure Components](01-manage-infrastructure.md#edit-a-component).

📸 *Screenshot: the Critical Components list with the package tabs.*

> [!NOTE]
> Users with the **Company Component Manager** role (`company_component_manager`) work on a company level instead: their **Critical components** button in the Component Lake opens the *Components* report, a list of components with missing data used by your company's modules, with a PDF export. They are asked to confirm the role's conditions first (window **Policy confirmation**).

## Related

- [Component Lake](../05-knowledge/01-component-lake.md)
- [Licenses](../05-knowledge/06-licenses.md)
