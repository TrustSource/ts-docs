# Recipe: Add an Infrastructure Module

Track a database, base image or runtime as an infrastructure dependency.

## Steps

1. Open your project and click **Create Module**.
2. Set architecture type to **Infrastructure Module**.
3. Enter the name (e.g. `postgres:16.3`).
4. Link to an entry in the [Infrastructure catalog](../05-knowledge/03-infrastructure-components.md).
5. The module now tracks vulnerabilities and licenses for that infrastructure component.

See [Infrastructure Modules](../03-internal/02-modules/03-infrastructure-modules.md) for details.
