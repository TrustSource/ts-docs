# SARIF Weaknesses and Risks

> [!NOTE]
> **Required role:** assigning a CWE needs `company_security_manager` or `account_admin`; the risk switch needs `compliance_manager`, `manager` or `account_admin`
> **Required license feature:** `sarif`, plus `risks` for the risk register

A **CWE** (Common Weakness Enumeration) names the kind of weakness a finding points at, such as *CWE-79 Cross-site scripting*. ***TrustSource*** shows the CWEs of your [SARIF imports](04-sw-quality-scans.md), lets you add the ones a tool leaves out, and can keep one risk per weakness in the risk register.

## Where CWEs appear

- **Tests list**, column **CWEs**: up to a few badges per test, with *+n* for more.
- **Test page**, strip **CWEs** above the findings: every weakness of the document with the number of findings behind it.
- **Rule groups** on the test page: the CWEs of that rule next to its name.

Click a badge to open the weakness in the [Vulnerability Lake](../05-knowledge/04-vulnerability-lake.md). Weaknesses are only taken from what the tool published, or from an assignment made by a person; ***TrustSource*** never guesses one.

A badge in the assigned style means that **every** finding behind it was attributed by a person, not reported by the tool. A weakness the tool reported on one rule stays a reported weakness even if someone assigned it on another.

An empty cell shows a dash. Hover for the reason: either none of the document's findings carry a CWE, or the document was imported before CWEs were recorded; open it to see its weaknesses.

📸 *Screenshot: the CWE strip and rule groups on a test page, one assigned badge in a different style.*

## Assign a CWE to a rule

Many tools publish no CWE for their rules, so these findings could not appear on a threat model or in a CWE risk. You can name the weakness yourself.

1. Open the test page. The strip shows *n rules unclassified* if some rules produced findings but carry no CWE.
2. In the header of the rule group, click **Assign CWEs**.
3. Enter one or more ids such as `CWE-79` (up to 50) and click **Save**.

The assignment is stored for the combination of tool and rule and applies to **every finding of that rule across your company**, on documents already imported as well as future ones. It is always shown as assigned.

To change it, click **Edit assigned CWEs**. **Withdraw assignment** removes it with the same immediate effect.

- **Assign CWEs** is only offered on rules for which the tool published no weakness. An assignment made earlier stays editable and withdrawable.
- Assigning and withdrawing are written to [Audit Logs](../06-administration/07-audit-logs.md) as *Rules modified*; a change or withdrawal names the previous value. Both actions are rate limited.
- ***TrustSource*** can also maintain default assignments that apply to all companies; they behave like your own.

### Did the assignments change since the import?

The test page shows a line such as *Extractor v1 - CWE assignments unchanged since import*, or *changed since import*. The counts of an imported document were calculated with the assignments of that moment; the CWEs you see are always the current ones. The API returns `evaluatedWith` and `appliedMappings` on `GET /core/tests/sarif` and `/{id}`, so two answers for the same document can be told apart. A document imported before this was recorded says *Imported before provenance was recorded*.

## Risks from weaknesses

With the project switch **Enable risk creation from SARIF weaknesses (CWE)**, every import creates or updates one risk per module, tool and weakness. See [Automatic Risks](../03-internal/05-risks/08-automatic-risks.md#sarif-weaknesses-cwe) for how those risks behave and how to switch them on.

The switch is off by default and applies to future imports only. Import a test again on the module's **Quality** tab to see risks for an existing document.

### Risk register limits

To keep the register readable, one import creates at most **200 risks per tool**, covers at most **8 tools** and creates at most **400 risks in total**. Runs without a usable tool name are skipped.

If an import exceeds a limit, ***TrustSource*** tells you in four places:

- the upload dialog shows *Risk register incomplete* with the numbers;
- the Tests list shows *n weaknesses not in risk register* in the **Details** column;
- the test page shows a warning that names the first weaknesses that were not tracked;
- [Audit Logs](../06-administration/07-audit-logs.md) hold one entry, *Risk modified*, with the same sentence.

The API reports it in `riskRegister.notTracked`. Weaknesses over a limit are still shown on the test page; they just have no risk.

## Related

- [SW Quality Scans](04-sw-quality-scans.md) — import, status and counts
- [Automatic Risks](../03-internal/05-risks/08-automatic-risks.md) — how CWE risks are kept up to date
- [Threat Models](../03-internal/08-threat-models/index.md) — weaknesses from tests also feed threat models
- [Tests (SARIF) API](../09-rest-api/endpoints/tests.md)
