# API Documentation

***TrustSource CE*** includes the interactive documentation of its [REST API](../09-rest-api/index.md). It is a Swagger UI generated from the OpenAPI specification that ships with the app, so it always matches the version you run.

## Open it

Select the **API documentation** icon in the right bar, or go to `https://<your-host>/apidoc-latest`. The page shows the operations of `/api/v2`, grouped by tag (Account, Releases, Risks, Check, Approval, Company, Projects, Modules, Products, Users, Scans, Tests, Reports, CSAF), with their parameters and responses.

The raw specification is available at `https://<your-host>/api-v2/openapi.yaml`.

📸 *Screenshot: the API documentation page with the operation groups.*

## Try a call

1. Select **Authorize** and enter an [API key](../06-administration/04-api-keys.md) as `x-api-key`, or fill in the `x-api-key` parameter of the operation.
2. Select an operation and choose **Try it out**.
3. Fill in the parameters and select **Execute**.

> [!WARNING]
> Calls you run here act on your real data. A `POST` or `DELETE` changes your company's data. Use a key with the smallest scope that does the job.

## Related

- [Authentication](../09-rest-api/01-authentication.md)
- [Endpoint groups](../09-rest-api/endpoints/index.md)
- [API scopes](../10-roles-permissions/09-api-scopes.md)
