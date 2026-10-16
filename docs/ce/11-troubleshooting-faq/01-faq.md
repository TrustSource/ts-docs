# Frequently Asked Questions

The most common questions about ***TrustSource CE***. If your question is not answered here, see [Reporting a Problem](06-contact-support.md).

## About TrustSource CE

**Is TrustSource CE free to use?**
Yes. TrustSource CE is open source under the [AGPL-3.0-only](https://www.gnu.org/licenses/agpl-3.0.html) (GNU Affero General Public License v3.0). The source code is at [github.com/TrustSource/ts-core-ce](https://github.com/TrustSource/ts-core-ce), and the **Source code (AGPL-3.0)** link in the sidebar footer points to it. If you modify TrustSource CE, read the license for the conditions that apply to offering it to others. The name TrustSource and its logo are trademarks of EACG GmbH and are not licensed with the code; see the NOTICE file that ships with the source code.

**What is the difference to the TrustSource SaaS platform?**
CE is self-hosted and shares the core of the platform. Some capabilities, for example single sign-on, the AI assistants (OSCAR chat, Threat Model Agent) and repository deep scans, are only in the SaaS edition. See [CE and SaaS compared](../13-ce-vs-saas.md).

**Are there plans, limits or feature flags?**
No. Every feature is available in every installation, and there are no limits on projects, modules or users. Access is controlled by roles only; see the [Roles Cheat Sheet](../00-getting-started/06-roles-cheatsheet.md).

**Which languages does the UI support?**
English only.

**Does TrustSource CE send data to TrustSource?**
At every start, the app checks for a newer version by requesting a file from GitHub, together with a random installation id. During analysis it queries OSV for vulnerabilities, and for vulnerability reports it reads EPSS scores from FIRST. No other TrustSource service is contacted. See [External Services](../01-installation-setup/04-external-services.md).

## Accounts and sign-in

**Can we sign in with SSO, LDAP, GitHub or LinkedIn?**
No. TrustSource CE supports email and password, with optional two-factor authentication from an authenticator app.

**How do new users get an account?**
An account admin invites them under **Administration → User Management**. Self sign-up is off by default; the operator can enable it with `REGISTRATION_ENABLED=true`. See [Your First Login](../00-getting-started/03-first-login.md).

**Why does the header say "ATTENTION! You are using all roles"?**
Your account holds all seven roles, as the first administrator and every user who signed up themselves do. It is a reminder to work with fewer roles in daily use. An account admin can change your roles in **User Management**.

**We changed `INITIAL_ADMIN_PASSWORD`, but the old password still works.**
The `INITIAL_*` settings are only used on the very first start, while the database has no users. Change the password in your [Profile](../08-personal/03-profile.md) or with **I forgot my password**.

**Why am I signed out every day?**
Sessions expire after one day. Sign in again.

**Where are the emails? Nobody receives invitations.**
In the reference installation, emails are caught by Mailpit at `http://localhost:8025` on the host, not delivered. Mailpit is for testing only. The operator sets `MAIL_URL` to a real SMTP server; see [External Services](../01-installation-setup/04-external-services.md#mail-smtp).

## Using the app

**How can I try the app without our own data?**
Load the demo project from the dashboard or with **Generate** in the project list (Compliance manager or Manager). See [Guide, tour and demo project](../00-getting-started/08-guide-and-demo.md).

**Which file formats can I import?**
SPDX and CycloneDX SBOMs under **Inbound (Scans) → Import Scans**, and SARIF files on a module's **Quality** tab (see **Inbound (Scans) → SW Quality Scans**). See the [Inbound (Scans) chapter](../02-inbound/index.md).

**Why do all licenses show as warnings?**
The license check service did not evaluate the module. See [Scan Troubleshooting](03-scan-troubleshooting.md#all-licenses-show-as-warnings).

**Where is the API documentation?**
Click **API documentation** in the right bar. It describes the REST API under `/api/v2` and lets you try the calls. See also the [REST API chapter](../09-rest-api/index.md).

**Why can't I edit a license text?**
The license catalog is shared by all companies of the installation and can only be edited by the **Company component manager** role. For some licenses, the text is not stored in TrustSource CE.

## Operating the installation

**How do I update to a new version?**
`git pull` and `docker compose up -d --build`, after a backup. See the [Upgrade Guide](../01-installation-setup/08-upgrade.md).

**Can I change `TS_ENCRYPTION_KEY`?**
No. Changing it makes stored credentials unreadable and invalidates existing API keys and release signatures. See [Settings Reference](../01-installation-setup/03-environment-variables.md#the-encryption-key).

**Where are uploaded files stored?**
In the Docker volume `ts-files`, mounted at `/app.storage/files`. Back it up together with the database; see [Backups & Monitoring](../01-installation-setup/07-backups-monitoring.md).

**Can TrustSource CE run without internet access?**
Yes, with `TS_OSV_ENABLED=false` and `TS_EPSS_ENABLED=false`. New vulnerabilities are then no longer found. See [Air-gapped installations](../01-installation-setup/04-external-services.md#air-gapped-installations).

**Can I switch off the version check?**
Not with a setting. It fails harmlessly when GitHub cannot be reached; block `raw.githubusercontent.com` in your firewall if you need to.

**Can several companies share one installation?**
Yes. Each company has its own projects, users and settings. The component, license, infrastructure and vulnerability catalogs are shared.
