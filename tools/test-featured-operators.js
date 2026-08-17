/**
 * Featured Operators Block Test Suite
 *
 * Tests the (?:midflight|relish)/featured-operators-block on the Home page and in isolation:
 * - Block rendering, section padding & background
 * - Header title & View All quick link
 * - 4-column responsive operator card grid
 * - Image loading, region/category badges, and permalinks
 */

import { BASE_URL, createBrowser } from './config.js';

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

async function runTests() {
  console.log(`\n======================================================`);
  console.log(`🌲 Featured Operators Block E2E Test Suite`);
  console.log(`======================================================\n`);

  const browser = await createBrowser();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  try {
    const response = await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle', timeout: 20000 });
    assert(response && response.status() === 200, 'HTTP 200 on Home Page');

    // 1. Block Container & Layout Checks
    const block = await page.$('.featured-operators-block');
    assert(!!block, '(?:midflight|relish)/featured-operators-block rendered on Home page');

    const blockStyles = await page.evaluate(() => {
      const el = document.querySelector('.featured-operators-block');
      if (!el) return null;
      const cs = window.getComputedStyle(el);
      return {
        paddingTop: parseInt(cs.paddingTop, 10),
        paddingBottom: parseInt(cs.paddingBottom, 10),
        hasFullBleed: el.classList.contains('alignfull'),
        hasBgOffWhite: el.classList.contains('bg-off-white'),
      };
    });

    assert(blockStyles && blockStyles.paddingTop >= 60, 'Section padding-top >= 60px (proper spacing)', `${blockStyles?.paddingTop}px`);
    assert(blockStyles && blockStyles.paddingBottom >= 60, 'Section padding-bottom >= 60px', `${blockStyles?.paddingBottom}px`);
    assert(blockStyles && blockStyles.hasFullBleed, 'Block has alignfull class for edge breakout');

    // 2. Header & Quick Link Checks
    const headerData = await page.evaluate(() => {
      const title = document.querySelector('.featured-operators-title');
      const viewAll = document.querySelector('.featured-operators-view-all .view-all-link');
      return {
        titleText: title ? title.innerText.trim() : '',
        viewAllText: viewAll ? viewAll.innerText.trim() : '',
        viewAllHref: viewAll ? viewAll.getAttribute('href') : '',
      };
    });

    assert(headerData.titleText === 'Discover Authentic Experiences', 'Header title matches expected copy', headerData.titleText);
    assert(headerData.viewAllText.includes('View All'), '"View All" quick link rendered with label', headerData.viewAllText);
    assert(headerData.viewAllHref.includes('/operators/'), '"View All" link points to /operators/', headerData.viewAllHref);

    // 3. Card Grid Assertions
    const cards = await page.$$('.featured-operator-card');
    assert(cards.length === 4, 'Exactly 4 featured operator cards rendered', `Found ${cards.length}`);

    const cardDetails = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.featured-operator-card')).map(card => {
        const link = card.querySelector('a.featured-operator-card-link');
        const img = card.querySelector('img.featured-operator-card-image');
        const badge = card.querySelector('.featured-operator-card-badge');
        const title = card.querySelector('.featured-operator-card-title');
        return {
          hasLink: !!link && !!link.getAttribute('href'),
          href: link ? link.getAttribute('href') : '',
          hasImg: !!img && !!img.getAttribute('src'),
          hasBadge: !!badge && badge.innerText.trim().length > 0,
          badgeText: badge ? badge.innerText.trim() : '',
          hasTitle: !!title && title.innerText.trim().length > 0,
          titleText: title ? title.innerText.trim() : '',
        };
      });
    });

    cardDetails.forEach((c, idx) => {
      assert(c.hasTitle, `Card #${idx + 1} has title`, c.titleText);
      assert(c.hasBadge, `Card #${idx + 1} has region/category badge`, c.badgeText);
      assert(c.hasImg, `Card #${idx + 1} has featured image`);
      assert(c.hasLink && c.href.includes('/operator/'), `Card #${idx + 1} links to single operator permalink`, c.href);
    });

  } catch (err) {
    assert(false, 'Exception during test execution', err.message);
  } finally {
    await browser.close();
  }

  console.log(`\n------------------------------------------------------`);
  console.log(`📊 Featured Operators Summary: ${passedTests} Passed, ${failedTests} Failures`);
  console.log(`------------------------------------------------------\n`);

  if (failedTests > 0) {
    process.exit(1);
  }
}

runTests();
