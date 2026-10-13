# Manual License Resolution

> [!NOTE]
> **Required role:** Manager or Compliance manager. Other roles see the state but are asked to contact a compliance manager.

Sometimes a scan cannot tell which license a component is under. You can then record the license yourself, with a written justification. ***TrustSource CE*** keeps who set it and when.

## When you need it

Open the component in the [List view](04-component-detail.md#the-side-panel). The side panel offers manual resolution in these cases:

| Situation | Section title |
|---|---|
| The scan found no license | **Set the license** |
| The analysis matched a license but was not confident about it | **Set the license**, with the analyser's reason |
| The component includes two or more licenses | **Multi - license**, see below |
| The root component of the module | **Select license** |

Other roles see **License not set** with *The license for this component has to be set by hand. Ask a compliance manager to set it.* and **Add a comment**.

## Set the license of an unmatched component

1. In the side panel, open **Set the license**.
2. Pick a license under **License**. The list groups **Special cases - use only when no named license applies**, your company's **Private licenses** (if any) and **Standard licenses**.
3. In the confirmation dialog *Set the license for ...?*, read which paths and versions are affected. The setting applies to every occurrence of the component in this module, not only the path you selected.
4. Enter **Why does this license apply? (required)**, up to 2000 characters, and click **Set license**.
5. The module is re-analysed. The section now reads **License set manually** with the license, the **Justification**, author and date, plus the resulting **Policy status**.

The undo button **Clear the manually set license** (confirm with **Clear license**) returns the component to "not detected" and removes the justification.

> [!WARNING]
> Setting a license records which license applies. Whether it is allowed is still decided by your company policy at the next analysis; the component can remain a warning or a violation.

If the next analysis still reports no license, the section shows **Not applied**; run **Analyse** in the module header.

### Special cases

| Entry | Use it when |
|---|---|
| `NO-LICENSE` | You checked the sources and there is no license text: the rights holder granted no rights. |
| `PUBLIC-DOMAIN` | The rights holder explicitly placed the component in the public domain and no named license (such as CC0-1.0 or the Unlicense) fits. |
| `UNKNOWN` | You investigated and still cannot tell. This is an audit record; it does not clear the component. |

### The risk entry

For a module that belongs to a project, setting a license also files a risk with the origin **Unmatched License (LIC)** in the [risk register](../05-risks/02-risks-list.md). The side panel links to it (*A risk entry was created in Risk management*).

## Component with several licenses

If a component lists two or more licenses, the side panel shows **Multi - license** and **Change selected license**. In **Select license for component**, choose exactly one license and click **Update**. The views change after the next **Analyse**.

## Root component

The root component of a module has a **Select license** field in the side panel, also reachable from the gavel icon (**Set root component license**) next to the root in the List view. Selection is saved per module and re-applied on the next analysis run. Choosing **- none -** clears it.

## Related

- [Component details](04-component-detail.md)
- [Module Detail Tabs](02-module-detail-tabs.md)
- [Licenses](../../05-knowledge/06-licenses.md)
