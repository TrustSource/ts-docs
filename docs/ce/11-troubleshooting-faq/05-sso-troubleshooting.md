# SSO / Auth Troubleshooting

Common Keycloak and SSO login issues.

| Problem | Likely cause | Fix |
|---|---|---|
| "Company not found" | Wrong company name in IDM login. | Check the exact company name with your admin. |
| Redirect loop | Keycloak configuration issue. | Verify the redirect URI in your Keycloak realm settings. |
| User not provisioned | Auto-provisioning disabled. | Ask your admin to enable auto-provisioning or create the user manually. |
