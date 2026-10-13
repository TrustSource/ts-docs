// Getting started: sign in, first login, layout, quick tour, dashboard, guide and demo.
const ROBIN = 'robin.fischer@example.com';
const DIR = '00-getting-started';

// Sidebar crop from the top of the menu to just below the expanded group.
const sidebarWith = (group) => async (page) => {
  const box = await page.evaluate((g) => {
    const menu = document.querySelector('#side-menu').getBoundingClientRect();
    const sub = document.querySelector(g).getBoundingClientRect();
    return { x: 0, y: menu.top - 6, width: menu.width, height: sub.bottom - menu.top + 16 };
  }, group);
  return { clip: box };
};

const submenu = (n, label, menuId) => ({
  id: `${DIR}/04-quick-tour-${n}`,
  alt: `The left sidebar with the ${label} group expanded.`,
  doc: `${DIR}/04-quick-tour.md`,
  url: '/dashboard',
  prepare: async (page, seed, h) => h.openMenu(page, `#${menuId}`),
  target: sidebarWith(`#${menuId}`),
});

export default [
  {
    id: `${DIR}/03-first-login-1`,
    alt: 'The Sign in page with the Username and Password fields, the I forgot my password link and the Login button, and the TrustSource CE version below the form.',
    doc: `${DIR}/03-first-login.md`,
    user: null,
    url: '/',
    target: async (page, seed) => ({ clip: { x: 420, y: 80, width: 600, height: 500 } }),
  },
  {
    // A user without a company: the first login creates "Robin Fischer's" company.
    id: `${DIR}/03-first-login-2`,
    alt: 'The dashboard of a newly created company: the Welcome to TrustSource CE banner with Load demo project and Take tour, an empty Activity log, and Finish company setup under the company name.',
    doc: `${DIR}/03-first-login.md`,
    user: ROBIN,
    url: '/dashboard',
    target: 'viewport',
  },
  {
    id: `${DIR}/03-first-login-3`,
    alt: 'The main layout with four numbered areas: 1 the header, 2 the left sidebar, 3 the content area showing the Projects list, 4 the right bar.',
    doc: `${DIR}/03-first-login.md`,
    url: '/projects',
    annotate: [
      { selector: '#header', position: 'inside-top-right' },
      { selector: '#menu', position: 'inside-bottom-right' },
      { selector: '.content-area', position: 'inside-bottom-right' },
      { selector: '#right-bar', position: 'inside-bottom-left' },
    ],
    target: 'viewport',
  },
  {
    id: `${DIR}/04-quick-tour-1`,
    alt: 'The dashboard with the welcome banner, the Company portfolio view treemap, and the Focussed projects and Incoming approval requests panels.',
    doc: `${DIR}/04-quick-tour.md`,
    url: '/dashboard',
    target: 'viewport',
  },
  submenu(2, 'Inbound (Scans)', 'menu_inbound'),
  submenu(3, 'Internal', 'menu_processing'),
  submenu(4, 'Outbound', 'menu_outbound'),
  submenu(5, 'Knowledge', 'menu_knowledge'),
  submenu(6, 'Administration', 'menu_administration'),
  {
    id: `${DIR}/04-quick-tour-7`,
    alt: 'The dashboard with the seven right bar icons numbered from top to bottom: 1 Guide, 2 Help, 3 API documentation, 4 Updates, 5 Messages, 6 Contact Account Admin, 7 Logout.',
    doc: `${DIR}/04-quick-tour.md`,
    url: '/dashboard',
    annotate: [
      { selector: '#right-bar li.intro-guide a', position: 'left' },
      { selector: '#right-bar li.intro-support a', position: 'left' },
      { selector: '#right-bar li.intro-documentation a', position: 'left' },
      { selector: '#right-bar li.intro-updates a', position: 'left' },
      { selector: '#right-bar li.intro-messages a', position: 'left' },
      { selector: '#right-bar li:nth-last-child(2) a', position: 'left' },
      { selector: '#right-bar li.intro-signout a', position: 'left' },
    ],
    target: 'viewport',
  },
  {
    id: `${DIR}/05-mental-model-1`,
    alt: 'The Webshop project page listing its two modules, webshop-backend and webshop-frontend, with their state, components and legal, security and quality bars.',
    doc: `${DIR}/05-mental-model.md`,
    url: (seed) => `/projects/${seed.projects.Webshop}`,
    target: 'viewport',
  },
  {
    id: `${DIR}/05-mental-model-2`,
    alt: 'The webshop-frontend module page with the List, Tree, Graph, Legal and Quality views and the component list.',
    doc: `${DIR}/05-mental-model.md`,
    url: (seed) => `/projects/${seed.projects.Webshop}`,
    prepare: async (page, seed, h) => h.clickText(page, 'webshop-frontend', { wait: 2500 }),
    target: 'viewport',
  },
  {
    id: `${DIR}/05-mental-model-4`,
    alt: 'The Products page with the product tree on the left and Home Hub X1 selected, showing the tabs Information, Solutions, Classification, Photos, Documents and more.',
    doc: `${DIR}/05-mental-model.md`,
    url: '/products',
    prepare: async (page, seed, h) => {
      await h.click(page, '.expand-all');
      await h.click(page, '.open_details:text-is("Home Hub X1")', 1500);
    },
    target: 'viewport',
  },
  {
    id: `${DIR}/07-dashboard-1`,
    alt: 'The Welcome to TrustSource CE banner with the Load demo project and Take tour buttons.',
    doc: `${DIR}/07-dashboard.md`,
    user: ROBIN,
    url: '/dashboard',
    target: '.dashboard-welcome',
    padding: 10,
  },
  {
    id: `${DIR}/07-dashboard-2`,
    alt: 'The Company portfolio view: a treemap with one rectangle per project and module, coloured by status, and the view type selector set to Components - Summary.',
    doc: `${DIR}/07-dashboard.md`,
    url: '/dashboard',
    target: async (page, seed, h) => {
      const box = await page.evaluate(() => {
        const head = [...document.querySelectorAll('.ts-panel, .panel, div')].find((e) => e.textContent.trim().startsWith('Company portfolio view'));
        const r = head.closest('.col-lg-12').getBoundingClientRect();
        return { x: r.left, y: r.top, width: r.width, height: r.height };
      });
      return { clip: box };
    },
  },
  {
    id: `${DIR}/08-guide-and-demo-1`,
    alt: 'The Guide panel open next to the dashboard, showing Getting started with the Start tour button and the numbered steps.',
    doc: `${DIR}/08-guide-and-demo.md`,
    url: '/dashboard',
    prepare: async (page, seed, h) => h.click(page, '#right-bar .toggle-guide-panel', 1200),
    target: 'viewport',
  },
  {
    id: `${DIR}/08-guide-and-demo-2`,
    alt: 'A tour step highlighting the left navigation, with the step text, the step dots and the Cancel, Back and Next buttons.',
    doc: `${DIR}/08-guide-and-demo.md`,
    url: '/dashboard',
    prepare: async (page, seed, h) => {
      await h.click(page, '.show-intro', 1000);
      // Step 1 is the welcome text; step 2 highlights the navigation.
      await page.locator('.ts-tour .ts-tour-next').first().click();
      await page.waitForTimeout(1000);
    },
    target: 'viewport',
  },
  {
    id: `${DIR}/08-guide-and-demo-3`,
    alt: 'The Projects list with Demo project, and the Create, Generate and Remove demo buttons in the page header.',
    doc: `${DIR}/08-guide-and-demo.md`,
    url: '/projects',
    target: async (page) => ({ clip: { x: 211, y: 62, width: 1181, height: 400 } }),
  },
];
