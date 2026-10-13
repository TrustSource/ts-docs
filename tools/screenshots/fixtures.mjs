// Example data for the screenshot instance. Everything here is fictional (Example Corp)
// except the open source packages, which are real public releases chosen for their
// known vulnerabilities, licenses and crypto usage.

// A component: [purl, license, children?, extras?]. extras may carry crypto (algorithm
// names) and models (machine-learning-model components) linked to the component.
const c = (purl, license, children = [], extras = {}) => ({ purl, license, children, ...extras });

export const PROJECTS = [
  {
    name: 'Webshop',
    description: 'Online shop for Example Corp customers: storefront, checkout and order back office.',
    modules: [
      {
        name: 'webshop-frontend',
        root: c('pkg:npm/webshop-frontend@2.4.0', 'UNLICENSED', [
          c('pkg:npm/react@18.2.0', 'MIT', [c('pkg:npm/loose-envify@1.4.0', 'MIT')]),
          c('pkg:npm/react-dom@18.2.0', 'MIT', [c('pkg:npm/scheduler@0.23.0', 'MIT')]),
          c('pkg:npm/axios@0.21.1', 'MIT', [c('pkg:npm/follow-redirects@1.14.0', 'MIT')]),
          c('pkg:npm/lodash@4.17.15', 'MIT'),
          c('pkg:npm/moment@2.29.1', 'MIT'),
          c('pkg:npm/crypto-js@4.1.1', 'MIT', [], { crypto: ['AES', 'SHA-256', 'MD5'] }),
          c('pkg:npm/chart.js@2.9.3', 'MIT'),
          c('pkg:npm/marked@0.3.6', 'MIT'),
        ]),
      },
      {
        name: 'webshop-backend',
        root: c('pkg:maven/com.example/webshop-backend@2.4.0', 'UNLICENSED', [
          c('pkg:maven/org.springframework/spring-webmvc@5.3.17', 'Apache-2.0', [
            c('pkg:maven/org.springframework/spring-beans@5.3.17', 'Apache-2.0'),
            c('pkg:maven/org.springframework/spring-core@5.3.17', 'Apache-2.0'),
          ]),
          c('pkg:maven/org.apache.logging.log4j/log4j-core@2.14.1', 'Apache-2.0', [
            c('pkg:maven/org.apache.logging.log4j/log4j-api@2.14.1', 'Apache-2.0'),
          ]),
          c('pkg:maven/com.fasterxml.jackson.core/jackson-databind@2.9.10', 'Apache-2.0'),
          c('pkg:maven/mysql/mysql-connector-java@8.0.27', 'GPL-2.0-only'),
          c('pkg:maven/org.bouncycastle/bcprov-jdk15on@1.68', 'MIT', [], { crypto: ['RSA', 'ECDSA', 'SHA-1', 'DES'] }),
          c('pkg:maven/commons-collections/commons-collections@3.2.1', 'Apache-2.0'),
          c('pkg:maven/org.hibernate/hibernate-core@5.4.24.Final', 'LGPL-2.1-only'),
        ]),
      },
    ],
  },
  {
    name: 'Mobile App',
    description: 'Companion app for the Example Corp smart home hub.',
    modules: [
      {
        name: 'mobile-app',
        root: c('pkg:npm/example-mobile-app@1.8.2', 'UNLICENSED', [
          c('pkg:npm/react-native@0.64.0', 'MIT', [c('pkg:npm/ws@7.4.5', 'MIT'), c('pkg:npm/minimist@1.2.5', 'MIT')]),
          c('pkg:npm/jsonwebtoken@8.5.1', 'MIT', [c('pkg:npm/jws@3.2.2', 'MIT')], { crypto: ['HMAC-SHA256', 'RSA'] }),
          c('pkg:npm/node-forge@0.10.0', '(BSD-3-Clause OR GPL-2.0)', [], { crypto: ['RSA', 'AES', '3DES'] }),
          c('pkg:npm/qs@6.5.2', 'BSD-3-Clause'),
          c('pkg:npm/semver@5.7.1', 'ISC'),
        ]),
      },
    ],
  },
  {
    name: 'Payment Service',
    description: 'Payment and fraud scoring service used by the Webshop checkout.',
    modules: [
      {
        name: 'payment-service',
        root: c('pkg:pypi/payment-service@3.1.0', 'UNLICENSED', [
          c('pkg:pypi/django@3.2.0', 'BSD-3-Clause', [c('pkg:pypi/sqlparse@0.4.1', 'BSD-3-Clause')]),
          c('pkg:pypi/requests@2.25.1', 'Apache-2.0', [c('pkg:pypi/urllib3@1.26.4', 'MIT'), c('pkg:pypi/idna@2.10', 'BSD-3-Clause')]),
          c('pkg:pypi/cryptography@3.3.2', 'Apache-2.0', [], { crypto: ['AES', 'RSA', 'X25519', 'SHA-256'] }),
          c('pkg:pypi/pyyaml@5.3.1', 'MIT'),
          c('pkg:pypi/jinja2@2.11.2', 'BSD-3-Clause'),
          c('pkg:pypi/torch@1.13.0', 'BSD-3-Clause', [], {
            models: [{
              name: 'fraud-scoring-model', version: '2.1', publisher: 'Example Corp',
              purl: 'pkg:huggingface/example-corp/fraud-scoring-model@2.1',
              modelCard: { modelParameters: { task: 'tabular-classification', architectureFamily: 'gradient boosting', modelArchitecture: 'XGBoost classifier' } },
            }],
          }),
          c('pkg:pypi/paramiko@2.7.2', 'LGPL-2.1-only'),
        ]),
      },
    ],
  },
];

// Builds a CycloneDX 1.6 document for a module definition. Crypto algorithms and models
// become cryptographic-asset and machine-learning-model components linked in the graph.
export function cyclonedx(mod) {
  const components = new Map();
  const assets = new Map();
  const dependencies = [];
  const visit = (node, isRoot) => {
    const [typeAndName, version] = node.purl.slice(4).split('@');
    const parts = typeAndName.split('/');
    if (!components.has(node.purl)) {
      const comp = { type: isRoot ? 'application' : 'library', 'bom-ref': node.purl, name: parts[parts.length - 1], version, purl: node.purl };
      if (parts[0] === 'maven') comp.group = parts[1];
      if (node.license && node.license !== 'UNLICENSED') {
        comp.licenses = node.license.includes(' OR ')
          ? [{ expression: node.license.replace(/[()]/g, '') }]
          : [{ license: { id: node.license } }];
      }
      components.set(node.purl, comp);
    }
    const dependsOn = node.children.map((child) => visit(child, false));
    for (const alg of node.crypto || []) {
      const ref = 'crypto:' + alg;
      assets.set(ref, { type: 'cryptographic-asset', 'bom-ref': ref, name: alg, cryptoProperties: { assetType: 'algorithm' } });
      dependsOn.push(ref);
    }
    for (const m of node.models || []) {
      assets.set(m.purl, { type: 'machine-learning-model', 'bom-ref': m.purl, ...m });
      dependsOn.push(m.purl);
    }
    dependencies.push({ ref: node.purl, dependsOn });
    return node.purl;
  };
  visit(mod.root, true);
  const [rootComp, ...rest] = components.values();
  return {
    bomFormat: 'CycloneDX',
    specVersion: '1.6',
    version: 1,
    metadata: { component: rootComp },
    components: [...rest, ...assets.values()],
    dependencies,
  };
}

// SARIF results of two static analysis tools for webshop-backend. One rule ships without a
// CWE so the "assign CWE" state can be shown.
const sarifRun = (tool, version, rules, results) => ({
  $schema: 'https://json.schemastore.org/sarif-2.1.0.json',
  version: '2.1.0',
  runs: [{
    tool: { driver: { name: tool, semanticVersion: version, rules } },
    results: results.map(([ruleId, level, file, line, message]) => ({
      ruleId, level, message: { text: message },
      locations: [{ physicalLocation: { artifactLocation: { uri: file }, region: { startLine: line } } }],
    })),
  }],
});

export const SARIF = [
  {
    project: 'Webshop', module: 'webshop-backend',
    doc: sarifRun('CodeQL', '2.19.3', [
      { id: 'java/sql-injection', name: 'SqlInjection', shortDescription: { text: 'Query built from user-controlled sources' }, properties: { tags: ['security', 'external/cwe/cwe-089'], 'security-severity': '8.8' } },
      { id: 'java/xss', name: 'XSS', shortDescription: { text: 'Cross-site scripting' }, properties: { tags: ['security', 'external/cwe/cwe-079'], 'security-severity': '6.1' } },
      { id: 'java/weak-cryptographic-algorithm', name: 'WeakCrypto', shortDescription: { text: 'Use of a broken or risky cryptographic algorithm' }, properties: { tags: ['security', 'external/cwe/cwe-327'], 'security-severity': '7.5' } },
      { id: 'java/unused-local-variable', name: 'UnusedLocal', shortDescription: { text: 'Unused local variable' }, properties: { tags: ['maintainability'] } },
    ], [
      ['java/sql-injection', 'error', 'src/main/java/com/example/shop/OrderRepository.java', 88, 'This query depends on a user-provided value.'],
      ['java/sql-injection', 'error', 'src/main/java/com/example/shop/SearchController.java', 41, 'This query depends on a user-provided value.'],
      ['java/xss', 'error', 'src/main/java/com/example/shop/ReviewController.java', 57, 'Cross-site scripting vulnerability due to a user-provided value.'],
      ['java/weak-cryptographic-algorithm', 'warning', 'src/main/java/com/example/shop/LegacyTokenService.java', 23, 'Cryptographic algorithm DES is weak and should not be used.'],
      ['java/unused-local-variable', 'note', 'src/main/java/com/example/shop/CartService.java', 112, 'Variable total is not used.'],
    ]),
  },
  {
    project: 'Webshop', module: 'webshop-backend',
    doc: sarifRun('Semgrep OSS', '1.95.0', [
      { id: 'java.lang.security.audit.crypto.use-of-md5', shortDescription: { text: 'Use of MD5' }, properties: { tags: ['CWE-328: Use of Weak Hash'] } },
      { id: 'java.spring.security.unvalidated-redirect', shortDescription: { text: 'Unvalidated redirect' }, properties: { tags: ['CWE-601: URL Redirection to Untrusted Site'] } },
      { id: 'java.lang.correctness.hardcoded-timeout', shortDescription: { text: 'Hard-coded timeout' }, properties: {} },
    ], [
      ['java.lang.security.audit.crypto.use-of-md5', 'warning', 'src/main/java/com/example/shop/ChecksumUtil.java', 17, 'Detected MD5 hash algorithm which is considered insecure.'],
      ['java.spring.security.unvalidated-redirect', 'warning', 'src/main/java/com/example/shop/LoginController.java', 74, 'Application redirects to a destination URL specified by a user-supplied parameter.'],
      ['java.lang.correctness.hardcoded-timeout', 'note', 'src/main/java/com/example/shop/HttpClientConfig.java', 30, 'Timeout value is hard-coded.'],
    ]),
  },
  {
    project: 'Mobile App', module: 'mobile-app',
    doc: sarifRun('ESLint', '9.14.0', [
      { id: 'no-eval', shortDescription: { text: 'Disallow the use of eval()' }, properties: { tags: ['CWE-95'] } },
      { id: 'no-unused-vars', shortDescription: { text: 'Disallow unused variables' }, properties: {} },
    ], [
      ['no-eval', 'error', 'src/utils/formula.js', 12, 'eval can be harmful.'],
      ['no-unused-vars', 'warning', 'src/screens/Settings.js', 8, "'theme' is assigned a value but never used."],
    ]),
  },
];

// A newer scan of webshop-frontend, so the module history and "since last" views have data.
export const FRONTEND_UPDATE = {
  name: 'webshop-frontend',
  root: c('pkg:npm/webshop-frontend@2.5.0', 'UNLICENSED', [
    c('pkg:npm/react@18.3.1', 'MIT', [c('pkg:npm/loose-envify@1.4.0', 'MIT')]),
    c('pkg:npm/react-dom@18.3.1', 'MIT', [c('pkg:npm/scheduler@0.23.2', 'MIT')]),
    c('pkg:npm/axios@1.7.7', 'MIT', [c('pkg:npm/follow-redirects@1.15.9', 'MIT')]),
    c('pkg:npm/lodash@4.17.21', 'MIT'),
    c('pkg:npm/moment@2.29.1', 'MIT'),
    c('pkg:npm/crypto-js@4.1.1', 'MIT', [], { crypto: ['AES', 'SHA-256', 'MD5'] }),
    c('pkg:npm/chart.js@4.4.4', 'MIT'),
    c('pkg:npm/marked@0.3.6', 'MIT'),
  ]),
};
