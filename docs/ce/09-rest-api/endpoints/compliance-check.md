# Compliance check

> Check licenses or components against the legal settings of a project and module before you add them, for example from an IDE or build plugin.

## Use cases

- Ask "may I use this license in this module?" before adding a dependency.
- Check a list of component versions for license obligations, violations and known vulnerabilities from a build step.

## Operations

| Method | Path | What it does | Scopes |
|---|---|---|---|
| POST | `/compliance/check/license` | Check licenses | `developer`, `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager`, `company_component_manager` |
| POST | `/compliance/check/component` | Check components | `developer`, `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager`, `company_component_manager` |

## Requests

Both operations take `projectName` and `moduleName` (both required, exact names of an existing project and module in it) and the items to check:

```json
{ "projectName": "Webshop", "moduleName": "webshop-backend",
  "licenses": ["MIT", "GPL-3.0-only"] }
```

```json
{ "projectName": "Webshop", "moduleName": "webshop-backend",
  "components": [ { "key": "npm:lodash", "version": "4.17.21" } ] }
```

A component `key` is matched against the component key or name in the Component Lake, so only components this installation already knows can be checked.

## Responses

`200` with:

| Field | Content |
|---|---|
| `ok` | `true` if every item was found |
| `warnings` | Items that could not be checked, with `status` `license_not_found`, `component_not_found` or `version_not_found` |
| `data` | One result per checked item: `changed` and `not_changed` legal analysis (obligations, violations, `computedStatus`), and for components `component`, `license` and `vulnerabilities` |

`changed` and `not_changed` give the result for the case that you modify the component and the case that you use it unchanged.

| Status | Meaning |
|---|---|
| `400` | The project's or module's legal settings are incomplete: `{"error": "Sorry, project \"...\" can not be checked, because settings are incomplete. Please complete legal requirements first"}` |
| `404` | Project, module, or all licenses or components not found, with an `error` message |

Complete the legal settings on the project's and module's **Legal** settings tabs first. See [Recipe: Legal questionnaire](../../recipes/12-legal-questionnaire.md).

The legal evaluation is done by the bundled ts-legalcheck service. If it is not reachable, licenses stay unevaluated.

## Related

- [Check](../../02-inbound/01-check.md) - the same check in the app
- [Licenses](../../05-knowledge/06-licenses.md)
- [Endpoint groups](index.md)
