# SSO / Auth Troubleshooting

Common Keycloak and SSO login issues.

| Problem | Likely cause | Fix |
|---|---|---|
| Corporate login does not open your company's sign-in page | Wrong value entered in **Your company name** on the sign-in page. | The corporate login box accepts the company id, the company name or the realm name, spelled exactly as stored. A value that matches none of them shows "No company with this name or ID uses corporate login. Check the company name or ask your administrator for the correct one." on the sign-in page. An empty field shows "Enter your company name or ID." Check the exact value with your admin. |
| Redirect loop | Keycloak configuration issue. | Verify the redirect URI in your Keycloak realm settings. |
| User not provisioned | Auto-provisioning disabled. | Ask your admin to enable auto-provisioning or create the user manually. |
| Login fails with an error naming a missing "sub" claim | The identity provider's token for this realm doesn't include a subject (`sub`) claim. | Check that the client used for corporate login has the required client scope assigned in your identity provider, then retry. |
| Identity Integration pages show "Identity provider is not available." | The identity provider did not answer. | Reload later; if it persists, contact support@trustsource.io. |
