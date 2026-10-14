# Recipe: Add an Infrastructure Module

Track a database, base image or runtime as an infrastructure dependency.

## Steps

1. Open your project and click **Add/link** in the module list toolbar (`manager` or `compliance_manager`).
2. Set **Module type** to **COTS or Infrastructure component**.
3. Under **Select pre-defined module**, search the [Infrastructure catalog](../05-knowledge/02-infrastructure-elements.md) (for example `postgres`), choose the entry and then its **Module version**.
4. Choose the **Type of architecture**, for example **Infrastructure Service**, tick **Is open source module** if it applies, and click **Create module**. If the entry is missing, use **Not finding what you are looking for?** and **Send request**.
5. The module now carries the license data of the catalog entry and is labelled **Infrastructure Module**.

See [Infrastructure Modules](../03-internal/02-modules/03-infrastructure-modules.md) for details.
