# Risk History

> [!NOTE]
> **Required role:** `developer`, `compliance_manager`, `manager` or `account_admin`
> **Required license feature:** `risks`

Every change to a risk is recorded: who, when, from where, and the old and new value of each field. This gives you an audit trail for decisions and for what automatic imports did.

## Read the history

Open a risk and click the **History** tab. Entries run newest first.

Each entry shows the action (**Created**, **Updated** or **Removed**), the person, the source and the time. Hover over the time for the exact date.

| Source | Meaning |
|---|---|
| UI | A person saved the risk in ***TrustSource***. |
| API | A call to the Risks API. |
| SARIF import | An import updated a CWE risk. |
| Vulnerability check | The regular check updated a CVE risk. |
| VEX publication | A published VEX advisory moved a CVE risk. |
| License resolution | A manually set license created or updated a risk. |
| CSAF removal | Removing a CSAF draft re-opened risks. |
| Migration | The upgrade to the treatment model converted the risk. |
| exception-sweep | A temporary exception ended and the risk returned to `assessed`. |
| obom-reconcile | The OBOM findings check created or updated a risk. |
| obom-promote | **Create risk** on a single OBOM finding. |

The last three are shown with their internal names.

Changes made by the system itself carry the badge **Automation**. Each line reads *Field: old → new*; links lead to the project and module. Entries with many fields show the first ones and **Show n more fields**; **Load more** fetches older entries.

Changes are recorded from version 3.3.23; older risks start with an empty history.

Edits on the Countermeasures and Tasks tabs show up too: showing the tab reads the trail again.

![The History tab of the risk Example: session token readable from browser storage, newest first: an update by Max Mustermann via UI that added a countermeasure, an update changing the state from assessed to approved and the treatment strategy from none to mitigate, an update from identified to assessed, and the start of the Created entry.](../../../assets/images/v3/03-internal/05-risks/09-risk-history-1.webp)

## Company Logs

The same edits appear in [Company Logs](../../06-administration/07-audit-logs.md) as *Risk ...: state a -> b*, followed by the names of the other fields that changed, together with the risk's project and module. Only the History tab shows the old and new value of every field. A temporary exception that ends is logged there too.

## Read it over the API

`GET /core/risks/{risk_id}/history` returns the history, paged. See [Risks API](../../09-rest-api/endpoints/risks.md).

## Related

- [Decisions](06-decisions.md) - what was decided and why
- [Automatic Risks](08-automatic-risks.md) - what imports change
