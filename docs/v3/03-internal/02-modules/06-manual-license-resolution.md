# Manual License Resolution

> [!NOTE]
> **Required role:** `manager` or `compliance_manager`. Other roles see the state but are asked to contact a compliance manager.

Sometimes a scan cannot tell which license a component is under. You can then record the license yourself, with a written justification. ***TrustSource*** keeps who set it and when.

## When you need it

Open the component in the [List tab](04-component-detail.md#the-side-panel). The legal section of the side panel offers manual resolution in these cases:

| Situation | Section title |
|---|---|
| The scan found no license | **Set the license** |
| The analysis matched a license but was not confident about it | **Set the license**, with the analyzer's reason |
| The component includes two or more licenses | **Multi - license**, see below |
| The root component of the module (company accounts with private licenses) | **Select license** |

## Set the license of an unmatched component

1. In the side panel, open **Set the license**.
2. Pick a license under **License**. The catalog lists **Special cases** first, then, for enterprise and medical accounts with private licenses, **Private licenses**, and then **Standard licenses**.
3. In the confirmation dialog, read which paths and versions are affected. The setting applies to every occurrence of the component in this module, not only the path you selected.
4. Enter **Why does this license apply? (required)**, up to 2000 characters, and click **Set license**.
5. The module is re-analyzed. The section now reads **License set manually** with the license, justification, author and date, plus the resulting **Policy status**.

The undo button **Clear the manually set license** returns the component to "not detected" and removes the justification.

> [!IMPORTANT]
> Setting a license records which license applies. Whether it is allowed is still decided by your company policy at the next analysis; the component can remain a warning or a violation.

### Special cases

| Entry | Use it when |
|---|---|
| `NO-LICENSE` | You checked the sources and there is no license text: the rights holder granted no rights. |
| `PUBLIC-DOMAIN` | The rights holder explicitly placed the component in the public domain and no named license (such as CC0-1.0 or the Unlicense) fits. |
| `UNKNOWN` | You investigated and still cannot tell. This is an audit record; it does not clear the component. |

### The risk entry

With the `risks` license feature, setting a license also files a risk under the origin **Unmatched License (LIC)** in [Risks](../05-risks/01-overview.md). The side panel links to it. Without the feature, the license setting is kept and no risk is created.

## Component with several licenses

If a component lists two or more licenses, the side panel shows **Multi - license** and **Change selected license**. Choose exactly one in the dialog and save. The views change after the next **Analyse**.

## Root component

For enterprise and medical accounts, the root component of a module has a **Select license** field (also reachable from the gavel icon next to the root in the List tab). The choice is saved per module and re-applied on every analysis. Removing the selection clears it.

## Related

- [Component details](04-component-detail.md)
- [Module Detail Tabs](02-module-detail-tabs.md)
- [Licenses](../../05-knowledge/06-licenses.md)
