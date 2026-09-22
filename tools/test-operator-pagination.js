/**
 * Test Suite for Operator Directory Pagination Styling (TASK-2026-009)
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

async function testOperatorPagination() {
  console.log(`\n======================================================`);
  console.log(`📄 Operator Directory Pagination Test Suite`);
  console.log(`======================================================\n`);

  let browser;
  try {
    browser = await createBrowser();
  } catch (err) {
    console.error('Failed to create browser:', err.message);
    process.exit(1);
  }

  if (!browser) {
    console.log('Browser unavailable.');
    process.exit(1);
  }

  try {
    // -------------------------------------------------------------------------
    // 1. Desktop Page 1 Tests
    // -------------------------------------------------------------------------
    console.log(`--- Testing /operators/ (Desktop - Page 1) ---`);
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto(`${BASE_URL}/operators/`, { waitUntil: 'domcontentloaded', timeout: 30000 });

    // Dismiss any overlays
    await page.evaluate(() => {
      document.querySelectorAll('.ctct-popup-overlay, #ctct_overlay, .ctct-form-embed').forEach(el => el.remove());
    });

    const paginationNav = await page.$('.wp-block-query-pagination');
    assert(paginationNav !== null, 'Pagination navigation element .wp-block-query-pagination found in DOM');

    // Test Active Page State (.current)
    const currentStyles = await page.evaluate(() => {
      const el = document.querySelector('.wp-block-query-pagination .page-numbers.current');
      if (!el) return null;
      const cs = window.getComputedStyle(el);
      return {
        borderRadius: cs.borderRadius,
        backgroundColor: cs.backgroundColor,
        color: cs.color,
        fontWeight: cs.fontWeight,
        minHeight: cs.minHeight,
        minWidth: cs.minWidth,
        text: el.innerText.trim(),
      };
    });

    assert(currentStyles !== null, 'Current active page item .page-numbers.current found');
    assert(currentStyles.borderRadius === '8px', 'Current page has 8px border-radius', currentStyles.borderRadius);
    assert(normalizeHex(currentStyles.backgroundColor) === '#212b36', 'Current page has brand dark navy background (#212b36)', currentStyles.backgroundColor);
    assert(normalizeHex(currentStyles.color) === '#ffffff', 'Current page has white text color (#ffffff)', currentStyles.color);
    assert(parseInt(currentStyles.fontWeight) >= 700, 'Current page has bold font weight', currentStyles.fontWeight);

    // Test Inactive Page Link
    const page2Styles = await page.evaluate(() => {
      const el = document.querySelector('.wp-block-query-pagination a.page-numbers');
      if (!el) return null;
      const cs = window.getComputedStyle(el);
      return {
        borderRadius: cs.borderRadius,
        borderWidth: cs.borderWidth,
        cursor: cs.cursor,
        minHeight: cs.minHeight,
        minWidth: cs.minWidth,
        text: el.innerText.trim(),
      };
    });

    assert(page2Styles !== null, 'Inactive page link found in pagination numbers');
    assert(page2Styles.borderRadius === '8px', 'Inactive page button has 8px border-radius', page2Styles.borderRadius);
    assert(page2Styles.cursor === 'pointer', 'Inactive page button has pointer cursor', page2Styles.cursor);

    // Test Next Button Label & Arrow
    const nextStyles = await page.evaluate(() => {
      const el = document.querySelector('.wp-block-query-pagination-next');
      if (!el) return null;
      const cs = window.getComputedStyle(el);
      const beforeContent = window.getComputedStyle(el, '::before').content;
      return {
        borderRadius: cs.borderRadius,
        minHeight: cs.minHeight,
        beforeContent,
        cursor: cs.cursor,
      };
    });

    assert(nextStyles !== null, 'Next button .wp-block-query-pagination-next found');
    assert(nextStyles.borderRadius === '8px', 'Next button has 8px border-radius', nextStyles.borderRadius);
    assert(nextStyles.beforeContent.includes('Next'), 'Next button formats clear readable "Next" label via ::before', nextStyles.beforeContent);

    // -------------------------------------------------------------------------
    // 2. Desktop Page 2 Tests (Previous button & Page 2 Active)
    // -------------------------------------------------------------------------
    console.log(`\n--- Testing /operators/?query-0-page=2 (Desktop - Page 2) ---`);
    await page.goto(`${BASE_URL}/operators/?query-0-page=2`, { waitUntil: 'domcontentloaded', timeout: 30000 });

    const prevStyles = await page.evaluate(() => {
      const el = document.querySelector('.wp-block-query-pagination-previous');
      if (!el) return null;
      const cs = window.getComputedStyle(el);
      const afterContent = window.getComputedStyle(el, '::after').content;
      return {
        borderRadius: cs.borderRadius,
        afterContent,
        cursor: cs.cursor,
      };
    });

    assert(prevStyles !== null, 'Previous button .wp-block-query-pagination-previous found on Page 2');
    assert(prevStyles.borderRadius === '8px', 'Previous button has 8px border-radius', prevStyles.borderRadius);
    assert(prevStyles.afterContent.includes('Previous'), 'Previous button formats clear readable "Previous" label via ::after', prevStyles.afterContent);

    const page2Current = await page.evaluate(() => {
      const el = document.querySelector('.wp-block-query-pagination .page-numbers.current');
      return el ? el.innerText.trim() : '';
    });
    assert(page2Current === '2', 'Page 2 correctly shows as active page item', `current: "${page2Current}"`);

    await page.close();

    // -------------------------------------------------------------------------
    // 3. Mobile Responsive Viewports (375px & 360px)
    // -------------------------------------------------------------------------
    console.log(`\n--- Testing Pagination on Mobile Viewports (360px & 375px) ---`);
    for (const width of [360, 375]) {
      const mobilePage = await browser.newPage({ viewport: { width, height: 812 } });
      await mobilePage.goto(`${BASE_URL}/operators/`, { waitUntil: 'domcontentloaded', timeout: 30000 });

      const mobileMetrics = await mobilePage.evaluate(() => {
        const scrollW = document.documentElement.scrollWidth;
        const clientW = document.documentElement.clientWidth;
        const noOverflow = scrollW <= clientW;

        const nav = document.querySelector('.wp-block-query-pagination');
        const navRect = nav ? nav.getBoundingClientRect() : null;

        return {
          noOverflow,
          scrollW,
          clientW,
          navFound: nav !== null,
          navWidth: navRect ? navRect.width : 0,
        };
      });

      assert(mobileMetrics.noOverflow, `Zero horizontal overflow on /operators/ at ${width}px`, `scroll: ${mobileMetrics.scrollW}px, client: ${mobileMetrics.clientW}px`);
      assert(mobileMetrics.navFound, `Pagination nav found and visible on ${width}px mobile screen`);
      assert(mobileMetrics.navWidth <= width, `Pagination container width (${Math.round(mobileMetrics.navWidth)}px) fits inside ${width}px screen`);

      await mobilePage.close();
    }

  } catch (err) {
    console.error('Error during test execution:', err.message);
    failedTests++;
  } finally {
    await browser.close();
  }

  console.log(`\n======================================================`);
  console.log(`Test Summary: ${passedTests} passed, ${failedTests} failed (Total: ${totalTests})`);
  console.log(`======================================================\n`);

  if (failedTests > 0) {
    process.exit(1);
  }
}

testOperatorPagination();
