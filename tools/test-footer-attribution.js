/**
 * Test Suite for Footer Attribution & Midflight Link (TASK-2026-012)
 */
import { BASE_URL, createBrowser, normalizeHex } from './config.js';

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, name, detail = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✅ [PASS] ${name} ${detail ? `(${detail})` : ''}`);
  } else {
    failedTests++;
    console.log(`  ❌ [FAIL] ${name} ${detail ? `— ${detail}` : ''}`);
  }
}

async function runFooterAttributionTests() {
  console.log(`\n======================================================`);
  console.log(`🦶 Footer Attribution & Midflight Link Test Suite`);
  console.log(`======================================================\n`);

  let browser;
  try {
    browser = await createBrowser();
  } catch (err) {
    console.error('Failed to create browser:', err.message);
    process.exit(1);
  }

  const viewports = [
    { name: 'Desktop', width: 1280, height: 800 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Mobile', width: 375, height: 812 },
  ];

  for (const vp of viewports) {
    console.log(`\n--- Testing ${vp.name} Viewport: ${vp.width}px x ${vp.height}px ---`);
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();

    try {
      await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });

      // 1. Territory link element presence and properties
      const link = await page.$('.site-footer__territory a');
      assert(link !== null, `${vp.name}: Territory link element exists in footer`);

      if (link) {
        const text = await page.evaluate(el => el.innerText.trim(), link);
        assert(
          text === 'Website Proudly Built in Treaty One Territory',
          `${vp.name}: Link text is "Website Proudly Built in Treaty One Territory"`,
          `actual: "${text}"`
        );

        const href = await page.evaluate(el => el.getAttribute('href'), link);
        assert(href === 'https://midflight.ca/', `${vp.name}: Link points to "https://midflight.ca/"`, `actual: "${href}"`);

        const target = await page.evaluate(el => el.getAttribute('target'), link);
        assert(target === '_blank', `${vp.name}: Target is "_blank"`, `actual: "${target}"`);

        const rel = await page.evaluate(el => el.getAttribute('rel'), link);
        assert(rel.includes('noopener') && rel.includes('noreferrer'), `${vp.name}: Rel has "noopener noreferrer"`, `actual: "${rel}"`);

        // Color check: matches privacy policy color (#9ca3af)
        const computedColor = await page.evaluate(el => window.getComputedStyle(el).color, link);
        const hexColor = normalizeHex(computedColor);
        assert(
          hexColor === '#9ca3af',
          `${vp.name}: Link color matches privacy policy link color (#9ca3af)`,
          `actual: ${computedColor} (${hexColor})`
        );

        // Hover state check
        await link.hover();
        await page.waitForTimeout(250);
        const hoverColor = await page.evaluate(el => window.getComputedStyle(el).color, link);
        const hoverHex = normalizeHex(hoverColor);
        assert(
          hoverHex === '#e0ac0f',
          `${vp.name}: Link hover color transitions to @color-gold (#e0ac0f)`,
          `actual: ${hoverColor} (${hoverHex})`
        );
      }

      // Zero horizontal footer overflow check
      const footerFits = await page.evaluate(() => {
        const footer = document.querySelector('.site-footer');
        const bottomContainer = document.querySelector('.site-footer__bottom-container');
        const docW = document.documentElement.clientWidth;
        const footerW = footer ? footer.getBoundingClientRect().width : 0;
        const containerW = bottomContainer ? bottomContainer.getBoundingClientRect().width : 0;
        return footerW <= docW + 1 && containerW <= docW + 1;
      });
      assert(footerFits, `${vp.name}: Footer and bottom bar fit within viewport without horizontal overflow`);
    } catch (err) {
      console.error(`Error on ${vp.name}:`, err.message);
      failedTests++;
    } finally {
      await context.close();
    }
  }

  await browser.close();

  console.log(`\n======================================================`);
  console.log(`Test Summary: ${passedTests} passed, ${failedTests} failed (Total: ${totalTests})`);
  console.log(`======================================================\n`);

  if (failedTests > 0) {
    process.exit(1);
  }
}

runFooterAttributionTests();
