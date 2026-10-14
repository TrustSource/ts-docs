# Recipe: Handle a License Conflict

A component in your module uses a forbidden license. Here is how to resolve it.

## Steps

1. Identify the component in the module's [Legal tab](../03-internal/02-modules/02-module-detail-tabs.md).
2. Check whether the license is correctly detected - false positives happen.
3. If correct, decide: **replace** the component, **allow** the license, or **accept the risk**.
4. To allow it: add the license to the allow list on the project's [Allow/Deny](../03-internal/01-projects/settings/07-whitelists-blacklists.md) settings tab.
5. To replace: update your code and re-scan.
6. Re-analyze the module to confirm the conflict is resolved.
