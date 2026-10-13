# Company FOSS

> Read your company's FOSS liaison: the contact recipients should address with open source license questions and requests for source code.

## Use cases

- Print the FOSS contact into notice files, product documentation or an "About" dialog generated at build time.
- Keep a company website imprint in sync with the contact maintained in ***TrustSource CE***.

## Operations

| Method | Path | What it does | Scopes |
|---|---|---|---|
| GET | `/compliance/company/foss` | Get the company's FOSS liaison | Any valid key |

## GET /compliance/company/foss

No parameters besides the `x-api-key` header. Returns `company`, `name`, `email`, `phone`, `zip`, `address`, `country` and `url`, as maintained under **Administration → Settings → FOSS liaison**.

If no FOSS liaison is set, the call answers `404`.

## Related

- [Settings](../../06-administration/02-settings.md)
- [Notice files](../../04-outbound/02-notice-files.md)
- [Endpoint groups](index.md)
