# Recipe: Handle a License Conflict

The analysis flags a license violation in one of your modules. Here is how to find the cause and resolve it.

> [!NOTE]
> **You'll need:** a module with an analysis that shows a legal violation, and the role **Manager** or **Compliance manager** (for project-wide lists, **Compliance manager**). The demo project usually contains license findings you can practise on.

## Steps

### 1. Find the component

Open the module and select the **Legal** tab. It lists the licenses found in the module, each with the components that carry it and the obligations and violations the evaluation produced. Use **Filter** to narrow the list. Select a component to see its versions, declared and detected licenses.

📸 *Screenshot: module Legal tab with a license expanded and a violation visible.*

### 2. Check the detection

False positives happen. Check on the component detail:

- Is the license the one the component's maintainers declare? Multi-licensed components may offer a license that fits.
- Was a license detected at all? Components without a recognised license need a decision by hand.

If the license is wrong or unknown, set the correct one by hand with a justification. See [Manual license resolution](../03-internal/02-modules/06-manual-license-resolution.md).

### 3. Check the legal settings

Whether a license is a violation depends on the project's and module's legal settings: commercial use, operating model, distribution, trade secrets. If they are not filled in or do not describe your case, the result is not reliable. Correct them with the wizard. See [Fill in the Legal Questionnaire](12-legal-questionnaire.md).

### 4. Decide

| Decision | How |
|---|---|
| **Replace** the component | Change your code or dependency, then scan or import again. |
| **Allow the license** for this module or project | **Settings → Allow/Deny → Always allow license**. On a module, entries added by a developer wait for a compliance manager's approval. |
| **Resolve the obligation** | Record how you meet the obligation on the **Resolved obligations** settings tab. |

📸 *Screenshot: module settings, Allow/Deny tab with the "Always allow license" list.*

Company-wide allow and deny lists are kept under **Administration → Settings → License allow/deny** and **Administration → Settings → Component allow/deny**. See [Settings](../06-administration/02-settings.md).

### 5. Re-analyse

Select the analyse button in the module header. The violation should be gone, or show the decision you recorded. Every change of a list or license is logged with user, time and comment.

## Related

- [Module detail tabs](../03-internal/02-modules/02-module-detail-tabs.md)
- [Allow and deny lists (project)](../03-internal/01-projects/settings/07-whitelists-blacklists.md)
- [Allow and deny lists (module)](../03-internal/02-modules/settings/14-whitelists-blacklists.md)
- [Resolved obligations (project)](../03-internal/01-projects/settings/08-obligations.md)
