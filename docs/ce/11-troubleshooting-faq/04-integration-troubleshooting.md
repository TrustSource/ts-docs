# Integration Troubleshooting

Issues with Jira, GitHub and TFS integrations.

| Problem | Likely cause | Fix |
|---|---|---|
| Issues not created | Credentials expired. | Regenerate the API token and update in project settings. |
| Wrong Jira project | Project key mismatch. | Verify the project key in Administration → Integrations. |
| GitHub rate limit | Too many API calls. | Wait for the rate limit to reset (1 hour). |
