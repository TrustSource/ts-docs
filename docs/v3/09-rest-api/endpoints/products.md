# Products

> Create, read, update and retire products, and attach misuse cases, support contracts, solutions, photos and documents.

## Use cases

- Create products in ***TrustSource*** from your product master data.
- Link a product to an approved release as its solution.
- Keep contracts, misuse cases and documents of a product up to date from your own systems.
- Retire a product when it reaches end of life.

## Operations

| Method | Path | What it does | Scopes |
|---|---|---|---|
| GET | `/core/products` | List products | `developer`, `manager`, `compliance_manager`, `company_security_manager`, `portfolio_manager`, `account_admin` |
| POST | `/core/products` | Create product | `developer`, `manager`, `compliance_manager`, `company_security_manager`, `account_admin` |
| GET | `/core/products/{product_id}` | Get product details | `developer`, `manager`, `compliance_manager`, `company_security_manager`, `portfolio_manager`, `account_admin` |
| POST | `/core/products/{product_id}` | Update product | `developer`, `manager`, `compliance_manager`, `company_security_manager`, `account_admin` |
| POST | `/core/products/{product_id}/retire` | Retire product | `compliance_manager`, `company_security_manager`, `account_admin` |
| POST | `/core/products/{product_id}/misuse` | Add a misuse case | `developer`, `manager`, `compliance_manager`, `company_security_manager`, `account_admin` |
| POST | `/core/products/{product_id}/unretire` | Un-retire a product | `compliance_manager`, `company_security_manager`, `account_admin` |
| DELETE | `/core/products/{product_id}/misuse/{item_id}` | Remove a misuse case | `developer`, `manager`, `compliance_manager`, `company_security_manager`, `account_admin` |
| POST | `/core/products/{product_id}/support` | Add a support contract | `developer`, `manager`, `compliance_manager`, `company_security_manager`, `account_admin` |
| DELETE | `/core/products/{product_id}/support/{item_id}` | Remove a support contract | `developer`, `manager`, `compliance_manager`, `company_security_manager`, `account_admin` |
| POST | `/core/products/{product_id}/solution` | Link a product to an approved release (solution) | `developer`, `manager`, `compliance_manager`, `company_security_manager`, `account_admin` |
| DELETE | `/core/products/{product_id}/solution/{approval_id}` | Unlink a solution | `developer`, `manager`, `compliance_manager`, `company_security_manager`, `account_admin` |
| POST | `/core/products/{product_id}/photo` | Upload a product photo | `developer`, `manager`, `compliance_manager`, `company_security_manager`, `account_admin` |
| DELETE | `/core/products/{product_id}/photo` | Remove a product photo | `developer`, `manager`, `compliance_manager`, `company_security_manager`, `account_admin` |
| POST | `/core/products/{product_id}/document` | Upload a product document | `developer`, `manager`, `compliance_manager`, `company_security_manager`, `account_admin` |
| DELETE | `/core/products/{product_id}/document` | Remove a product document | `developer`, `manager`, `compliance_manager`, `company_security_manager`, `account_admin` |

Request and response schemas are in the [OpenAPI specification](index.md#the-specification), which is also available as interactive documentation in the app.

## Notes

- `GET /core/products` excludes retired products unless you pass `includeRetired=true`.
- The `identifier` of a product must be unique within your company.
- `POST /core/products/{product_id}` updates only whitelisted fields. Server-managed fields are ignored.
- Photos and documents are uploaded as `multipart/form-data` file parts.

## Authentication

Send your key in the `x-api-key` header. The **Scopes** column shows which key scopes may call each operation; a key with another scope gets `403`. See [API scopes](../../10-roles-permissions/09-api-scopes.md).

## Related

- [Endpoint groups](index.md)
