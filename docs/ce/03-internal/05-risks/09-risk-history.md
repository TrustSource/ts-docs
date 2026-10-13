# Risk History

> [!NOTE]
> **Audit logs:** Account admin.

***TrustSource CE*** keeps no change history per risk: the risk editor has no **History** tab, and earlier values of a field are not stored. Each risk records who last saved it and when.

What the app does record is written to the company's [audit log](../../06-administration/07-audit-logs.md) (**Administration → Audit logs**, *All logs of company*):

| Event | Log entry |
|---|---|
| A risk is added by hand or through the API | `Risk properties NAME created` |
| A risk is removed | `Risk properties removed` |
| A SARIF import creates a risk | `Risk NAME created (N occurrences)` |
| A SARIF import changes the occurrences of a risk | `Risk source references for CWE-ID (TOOL) updated: A -> B occurrences` |
| A license set by hand creates or updates a risk | `Risk NAME created` / `Risk NAME updated` |
| A task is added, changed or removed | `Task NAME created` / `Task updated` / `Task removed` |

Edits in the risk editor, including changes to countermeasures, are not written to the audit log.

> [!NOTE]
> A per-risk History tab with old and new values is a SaaS feature and not part of TrustSource CE. See [CE and SaaS compared](../../13-ce-vs-saas.md).
>
> If you need an audit trail for decisions, write the reasoning, the decider and the date into the risk itself, as described in [Decisions](06-decisions.md).

## Related

- [Decisions](06-decisions.md) - documenting what was decided and why
- [Automatic Risks](08-automatic-risks.md) - what imports change
- [Audit Logs](../../06-administration/07-audit-logs.md)
