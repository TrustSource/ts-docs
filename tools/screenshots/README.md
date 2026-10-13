# CE screenshots

Scripts that fill a TrustSource CE installation with example data and take the screenshots used in `docs/ce`. Images are written to `docs/assets/images/ce/` as WebP.

## Requirements

- A running TrustSource CE (`docker compose up` in `ts-core-ce`) with an empty database, Mailpit reachable (invitations are read from it), and outbound access for the OSV vulnerability lookup.
- Node.js 20 or newer. `npm install` in this folder.
- A browser: `npx playwright install chromium`, or set `TS_BROWSER_CHANNEL=chrome` to use an installed Chrome.

## Run

```bash
cd tools/screenshots
npm install
export TS_BASE_URL=http://localhost:3000        # your CE address
export TS_MAILPIT_URL=http://localhost:8025     # Mailpit web address
export TS_PASSWORD='<INITIAL_ADMIN_PASSWORD>'   # password of admin@example.com
node seed.mjs        # example data, once per installation
node capture.mjs     # all screenshots (or: node capture.mjs <words> for a subset)
node embed.mjs       # write images and alt texts into docs/ce
```

The installation must be started with `INITIAL_ADMIN_EMAIL=admin@example.com` and `INITIAL_COMPANY_NAME=Example Corp`.

## What the files do

| File | Purpose |
|---|---|
| `seed.mjs` | Creates the example company content: the demo project, three projects with CycloneDX imports, SARIF results, approvals and releases, products, risks and a fictional team. Progress is kept in `.seed.json`, so a second run only adds what is missing. |
| `seeds/*.mjs` | Further seed steps, one file per area. `node seed.mjs --steps <name>` runs only these. Each keeps its state in `.seed-<name>.json`. |
| `fixtures.mjs` | The example SBOMs and SARIF documents. The packages are real public releases chosen for their known vulnerabilities, licenses and crypto usage. |
| `shots/*.mjs` | Screenshot definitions: page, user, preparation steps, crop and alt text. See the comment at the top of `capture.mjs`. |
| `capture.mjs` | Takes the screenshots at 1440x900 and device scale 2, and writes WebP files scaled so that a full-width shot is 1600 pixels wide. |
| `embed.mjs` | Replaces the n-th `📸` placeholder of a page with the image of shot `<page>-<n>` and keeps alt texts in sync. |

Screenshots are taken as Alex Morgan, who holds every role except Developer. The first-login shots use Robin Fischer, a user without a company, whose first login creates a new one. All names, email addresses (`example.com`) and companies are fictional.

`.seed*.json` and `.auth-*.json` hold passwords, the seeding API key and login sessions. They are git-ignored; do not commit them.
