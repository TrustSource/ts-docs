# SSO / Auth Troubleshooting

Common Keycloak and SSO login issues.

| Problem | Likely cause | Fix |
|---|---|---|
| "Company not found" | Wrong company id, company name, or realm name entered on the corporate login page. | The corporate login box accepts any of the three — check the exact value with your admin. |
| Redirect loop | Keycloak configuration issue. | Verify the redirect URI in your Keycloak realm settings. |
| User not provisioned | Auto-provisioning disabled. | Ask your admin to enable auto-provisioning or create the user manually. |
| Login fails with an error naming a missing "sub" claim | The identity provider's token for this realm doesn't include a subject (`sub`) claim. | Check that the client used for corporate login has the required client scope assigned in your identity provider, then retry. |
