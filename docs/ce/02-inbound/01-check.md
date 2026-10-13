# Check (License / Component)

> [!NOTE]
> **Required role:** Developer, Compliance manager, Manager or Account admin

**Check** answers a "what if" question before you commit to a dependency: would this license, or this component version, pass the rules of a given module? ***TrustSource CE*** evaluates it against the legal settings of a project and module of yours, but adds nothing to them. Open it from **Inbound (Scans) → Check**.

Two buttons in the header switch between the modes: **License** and **Component**.

## Check a license

1. Choose the **Project** and the **Module** whose rules apply.
2. Choose the **License**.
3. Press **Check license**.

The result shows the license with a status colour and then, for the module's settings:

- whether the license is allowed, denied or a private license of your company;
- legal problems, for example a conflict with the module's distribution model;
- obligations that come with the license.

The result is shown twice, side by side: once for "Component was **not** modified" and once for "Component was modified", because the obligations differ.

> [!NOTE]
> License compatibility is evaluated by the ts-legalcheck service that runs next to the app. If it is not running, the check cannot produce a legal assessment. See [External services](../01-installation-setup/04-external-services.md).

## Check a component

1. Choose the **Project** and **Module**.
2. Start typing in **Component** and pick a match from the suggestions.
3. Choose the **Version**. The licenses of each version are shown next to it.
4. Press **Check component**.

You get the **Vulnerabilities** known for that version (each linked and coloured by score, or "No vulnerabilities known"), followed by the same legal assessment as above, based on the component's license.

📸 *Screenshot: the Check page in Component mode with a result.*

## When a project or module cannot be selected

If the project or module has incomplete legal settings, the page says it cannot be selected and links to its settings so you can complete the legal requirements first. Until all required fields are chosen, the page lists what is still missing.

> [!TIP]
> For automation, the [Check API](../09-rest-api/endpoints/compliance-check.md) offers the same evaluation.

## Related

- [Licenses](../05-knowledge/06-licenses.md)
- [Component Lake](../05-knowledge/01-component-lake.md)
- [Legal settings of a module](../03-internal/02-modules/settings/02-legal.md)
