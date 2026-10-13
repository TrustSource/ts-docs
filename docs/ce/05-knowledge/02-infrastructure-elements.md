# Infrastructure Elements

The Infrastructure Elements catalog lists the infrastructure components ***TrustSource CE*** knows: operating systems, base images, database servers, web servers, message brokers and similar. You link them to [infrastructure modules](../03-internal/02-modules/03-infrastructure-modules.md). Open it from **Knowledge → Infrastructure Elements**; the page is titled **Infrastructure components**.

## Where the data comes from

On its first start, TrustSource CE fills the catalog with a set of common infrastructure components. Later starts only add entries that are missing; components you edited or soft-deleted are not touched. Users with the **Company component manager** role can add and edit components. The catalog is shared by all companies of the installation.

## Browse the catalog

The header shows how many components are managed. Use the filter bar to narrow the list. Each row shows the component name with its categories, a short description and links to the homepage and repository. A red **B** means that the component is on your company's deny list.

Select a component to open its page: the **Information** panel (key, purl, homepage, repository, language, last update), the **Comment**, the commercial terms if any were recorded, and the **Versions** with licenses, checksums, copyright and reported vulnerabilities. A filter above the versions narrows long lists.

> [!NOTE]
> Everyone can read the catalog. Company component managers also see **Add infrastructure component**, **View used as Modules** and an **Edit** button. See [Manage Infrastructure Components](../14-component-manager/01-manage-infrastructure.md).

![The Infrastructure components list with six components, among them Apache HTTP Server, MariaDB, MongoDB and NGINX, each with its categories, description and homepage and repository links.](../../assets/images/ce/05-knowledge/02-infrastructure-elements-1.webp)

## Related

- [Infrastructure modules](../03-internal/02-modules/03-infrastructure-modules.md)
- [3rd party (COTS)](03-cots.md)
