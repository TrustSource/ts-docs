// v3 shots that DEV cannot provide, taken on a local ts-app (same version as DEV) with seeded
// example data. Capture with TS_BASE_URL=http://localhost:3000 TS_EMAIL=max.mustermann@example.com.
// The local docs company was created by the first login of Max Mustermann; its other data
// (projects, OBOMs, Jira settings, updates, messages) was inserted into the local database.
const GS = '00-getting-started';
const PROJECT = 'i3bNrQA2ByaAEcPy6'; // Example Webshop
const ORDER_SERVICE = 'iAMLyhDHBjravmfxA';

const CLEAN_CSS = `
  .chat-mascot { display: none !important; }
  .introjs-overlay, .introjs-helperLayer, .introjs-tooltipReferenceLayer,
  .introjs-disableInteraction, .introjsFloatingElement { display: none !important; }
`;
const clean = (page) => page.addStyleTag({ content: CLEAN_CSS });

async function waitText(page, ...texts) {
  await page.waitForFunction((ts) => ts.every((t) => document.body.innerText.includes(t)), texts, { timeout: 45000 });
  await page.waitForTimeout(800);
}

export default [
  {
    // Taken right after the first login, before any other data was added to the company.
    id: `${GS}/03-first-login-2`,
    alt: 'The dashboard of a new company without modules: the Welcome to TrustSource banner with Load demo project and Take tour, the Our latest videos panel and the Activity log with the creation of the new user.',
    doc: `${GS}/03-first-login.md`,
    url: '/dashboard',
    prepare: async (page, seed, h) => {
      await clean(page);
      await waitText(page, 'Welcome to TrustSource', 'Our latest videos');
      // The video carousel rotates by itself; stop it on the first video.
      await page.evaluate(() => { const $ = window.jQuery; $('.slick-initialized').slick('slickPause').slick('slickGoTo', 0, true); });
      await h.settle(page, 1500);
    },
    target: 'viewport',
  },
  {
    // OBOMs ingested through a local stand-in for the ts-obom Lambdas (ts-lambda/obom handlers).
    id: '03-internal/01-projects/03-deployments-1',
    alt: 'The Deployments page of Example Webshop with the Compare deployments button and the matrix of the scopes Project (overall), order-service, payment-service and shop-frontend against the deployments development, production-eu and staging: each cell shows the age and number of components, red findings chips, Explicit chips and one Defaults chip for order-service in production-eu.',
    doc: '03-internal/01-projects/03-deployments.md',
    url: `/projects/${PROJECT}/deployments`,
    prepare: async (page, seed, h) => { await clean(page); await waitText(page, 'PRODUCTION-EU', 'Defaults'); },
    target: { clip: { x: 211, y: 62, width: 1181, height: 450 } },
  },
  {
    id: '03-internal/02-modules/07-obom-tab-1',
    alt: 'The OBOM tab of the module order-service with Source ts-scan 2.4.0, the Created date, CycloneDX 1.6 and the Defaults scan chip, the Components, Findings (1) and Raw JSON buttons, and the Components table with eclipse-temurin, postgresql and ubuntu, their version, type, purl and findings.',
    doc: '03-internal/02-modules/07-obom-tab.md',
    url: `/projects/${PROJECT}/modules/${ORDER_SERVICE}/dependencies?view=obom`,
    prepare: async (page, seed, h) => {
      await clean(page);
      const skip = page.locator('.introjs-skipbutton');
      await skip.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
      if (await skip.isVisible().catch(() => false)) await skip.click();
      await waitText(page, 'Defaults scan', 'eclipse-temurin');
    },
    target: { clip: { x: 211, y: 62, width: 1181, height: 440 } },
  },
  {
    // The company has an example Jira integration (API, project key SHOP). Local modules have no
    // analysed components (analysis runs in the ts-analysis Lambda), so the app's own jiraLink
    // template is rendered on the module page with the text it builds for a component, and opened
    // with its Create issue link.
    id: '06-administration/08a-issue-trackers-1',
    alt: 'The Create new Jira issue dialog with a Title made of the Jira project key SHOP, the component log4j-core and its status violations, a Description that explains the status and asks to resolve it, and the Close and Create issue buttons.',
    doc: '06-administration/08a-issue-trackers.md',
    url: `/projects/${PROJECT}/modules/${ORDER_SERVICE}/dependencies`,
    prepare: async (page, seed, h) => {
      await clean(page);
      await waitText(page, 'order-service');
      await page.evaluate(() => {
        const { Blaze } = Package.blaze; const { Template } = Package.templating;
        const host = document.createElement('div'); host.id = 'docs-jira-host'; document.body.appendChild(host);
        const name = 'mvn:org.apache.logging.log4j:log4j-core';
        Blaze.renderWithData(Template.jiraLink, { jira: null, details: {}, module: {}, description: {
          title: name + ' - violations (TrustSource generated task)',
          text: 'Component "' + name + '" has status "violations" \nThis is due to Vulnerability problems. \n' +
            'Please check whether this component is still needed and resolve the reported violations. \nThank you for your support.' } }, host);
      });
      await page.locator('#docs-jira-host .show-jira-modal').dispatchEvent('click');
      await page.locator('.createIssue.in .modal-content, .createIssue.show .modal-content').first().waitFor({ state: 'visible' });
      await h.settle(page, 800);
    },
    target: '.createIssue.in .modal-content',
  },
  {
    // The local database also holds a CE "1.0" entry; the shot shows the newest entry only.
    id: '08-personal/01-updates-1',
    alt: 'The Updates page with the entry 3.3 and its publication date, and its items under New, Improvement and Fix.',
    doc: '08-personal/01-updates.md',
    url: '/updates',
    prepare: async (page) => { await clean(page); await waitText(page, 'Improvement', 'Approvals of unassigned modules'); },
    target: async (page) => {
      const box = await page.locator('.hpanel, .panel').filter({ hasText: 'Approvals of unassigned modules' }).last().boundingBox();
      return { clip: { x: 211, y: 62, width: 1181, height: box.y + box.height + 12 - 62 } };
    },
  },
  {
    // The type filter buttons do not render (the helpers do not await the async MessagesLabels).
    id: '08-personal/02-inbox-messages-1',
    alt: 'The Messages page with the Inbox (4), Marked and Trash buttons, the Filter field and the message table with From, Message and Date: a new vulnerability, an overdue risk task, an approval request and a reset component status, each with See more.',
    doc: '08-personal/02-inbox-messages.md',
    url: '/messages/inbox',
    prepare: async (page) => { await clean(page); await waitText(page, 'Reset component status', 'Action required'); },
    target: { clip: { x: 211, y: 62, width: 1181, height: 410 } },
  },
];
