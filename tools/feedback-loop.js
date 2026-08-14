/**
 * Feedback Loop & Health Check Runner for ITM Theme (kiwatinook)
 * Executes quick automated verification of server health, asset builds, PHP errors, and visual readiness.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { BASE_URL, PAGES, createBrowser, themeRoot } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runFeedbackLoop() {
  console.log(`\n======================================================`);
  console.log(`🩺 ITM Theme Feedback Loop & Health Check`);
  console.log(`   Target Server: ${BASE_URL}`);
  console.log(`======================================================\n`);

  let passCount = 0;
  let warnCount = 0;
  let failCount = 0;

  function report(type, label, detail = '') {
    if (type === 'PASS') {
      passCount++;
      console.log(`  ✅ [PASS] ${label} ${detail ? `(${detail})` : ''}`);
    } else if (type === 'WARN') {
      warnCount++;
      console.log(`  ⚠️  [WARN] ${label} ${detail ? `(${detail})` : ''}`);
    } else {
      failCount++;
      console.log(`  ❌ [FAIL] ${label} ${detail ? `(${detail})` : ''}`);
    }
  }

  // 1. Check Compiled Assets
  const compiledCssPath = path.join(themeRoot, 'assets', 'css', 'styles.css');
  if (fs.existsSync(compiledCssPath)) {
    const stats = fs.statSync(compiledCssPath);
    report('PASS', 'Compiled LESS/CSS asset exists', `size: ${(stats.size / 1024).toFixed(1)} KB`);
  } else {
    report('FAIL', 'Compiled LESS/CSS asset missing', 'Run npm run build');
  }

  // 2. Check Browser and Server Health
  let browser;
  try {
    browser = await createBrowser();
    report('PASS', 'Headless Browser initialized');
  } catch (err) {
    report('FAIL', 'Browser launch failed', err.message);
    process.exit(1);
  }

  try {
    const context = await browser.newContext({ ignoreHTTPSErrors: true });
    const page = await context.newPage();

    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    for (const p of PAGES.slice(0, 5)) {
      const url = `${BASE_URL}${p.path}`;
      try {
        const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
        const status = response ? response.status() : 0;
        const html = await page.content();

        if (status === 200) {
          report('PASS', `HTTP 200 on ${p.name}`, url);
        } else {
          report('FAIL', `HTTP ${status} on ${p.name}`, url);
        }

        // Check for PHP notices or errors in body
        const phpErrorMatch = html.match(/(Fatal error|Parse error|Warning:|Notice:)(.*?)(?=<\/strong>|<br|$)/i);
        if (phpErrorMatch) {
          report('WARN', `PHP Warning/Notice detected on ${p.name}`, phpErrorMatch[0].slice(0, 80));
        }

        // Check critical DOM structure
        const hasHeader = await page.$('header#masthead, .site-header, header');
        const hasFooter = await page.$('footer#colophon, .site-footer, footer');
        if (hasHeader && hasFooter) {
          report('PASS', `Standard Header & Footer present on ${p.name}`);
        } else {
          report('WARN', `Missing header or footer element on ${p.name}`);
        }

      } catch (err) {
        report('FAIL', `Failed to load ${p.name}`, err.message);
      }
    }

    if (consoleErrors.length > 0) {
      report('WARN', `${consoleErrors.length} Console error(s) logged on inspected pages`);
    } else {
      report('PASS', 'No client-side JavaScript console errors');
    }

    await context.close();
  } finally {
    await browser.close();
  }

  console.log(`\n------------------------------------------------------`);
  console.log(`📊 Summary: ${passCount} Passed, ${warnCount} Warnings, ${failCount} Failures`);
  console.log(`------------------------------------------------------\n`);

  if (failCount > 0) {
    process.exit(1);
  }
}

runFeedbackLoop().catch(err => {
  console.error('Fatal error in feedback loop runner:', err);
  process.exit(1);
});
