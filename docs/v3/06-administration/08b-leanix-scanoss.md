# LeanIX and SCANOSS

> [!NOTE]
> **Required role:** `account_admin` or `enterprise_admin`
> **Plan:** LeanIX needs a plan that includes the integration; otherwise the page asks for a corporate account type. SCANOSS shows no plan check.

## LeanIX

Link your modules with the applications in your LeanIX workspace. Select the **LeanIX** tile on **Administration → Integrations**.

| Field | Description |
|---|---|
| **Company name** | The name of your LeanIX workspace. |
| **API-Token** | The LeanIX API token. It is hidden while you type and never shown again. Leave empty to keep the stored value. |

Select **Update** to save. Afterwards, the **General** settings of a project or module offer the LeanIX link. Without the integration, that field shows a link to these settings instead.

## SCANOSS

Add your SCANOSS access token to include SCANOSS matches in the results of [repository scans](../02-inbound/05-repository-scans.md). Select the **SCANOSS** tile.

| Field | Description |
|---|---|
| **Access Token** | Your SCANOSS token. It is hidden and never shown again. Leave empty to keep the stored value. |
| **Active** | Turns the integration on. |

## Related

- [Integrations](08-integrations.md)
