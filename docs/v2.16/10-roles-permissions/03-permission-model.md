# Permission Model

***TrustSource*** uses **OR-aggregation** for role permissions — if any of your assigned roles grants access to a function, you have access. There is no deny-override.

**Resource-layer permissions** add field-level control within settings tabs. Each settings field has read/write/execute permissions that depend on both the user's role and their relationship to the project (owner, member, etc.).

**Owner-vacuum pattern**: when a project has no assigned manager, certain management functions become accessible to broader roles to prevent lockout.

📸 *Screenshot: the Permission Model reference page.*
