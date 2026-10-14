# Internal Roles

Two internal roles exist that are not assignable through the standard UI, and one licence-bound role:

- **Component manager** (`component_manager`): system role for managing the shared component catalogs. Unlocks the **Component mngr.** menu section with **Manage IC**, **Manage COTS** and **Critical Components**.
- **Legal manager** (`legal_manager`): system role for legal reference data. Unlocks the **Legal mngr.** menu section with **Manage Legal**, **Legal templates** and **Copyright & Trademarks**.

- **CVD Coordinator** (`cvd_coordinator`): requires the `cvdself` license. It is assignable only in companies that hold the license, carries no permissions in the app and is passed on to the CVD service as a role claim. If the license is removed, the role stops taking effect.

The internal roles are secured: they are not offered in the role selection, and an invitation into an internal role is refused.

📸 *Screenshot: the left navigation of a user with the internal roles, with the Component mngr. and Legal mngr. sections expanded.*
