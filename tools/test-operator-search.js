/**
 * Test Suite for Operator Search Block: Taxonomy Dropdowns, AJAX Queries & Mobile Grid
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

async function runOperatorSearchTests() {
  console.log(`\n======================================================`);
  console.log(`🔍 Operator Search Block Test Suite`);
  console.log(`======================================================\n`);

  let browser;
  try {
    browser = await createBrowser();
  } catch (err) {
    console.error('Failed to create browser:', err.message);
    return;
  }

  if (!browser) {
    console.log('Browser unavailable.');
    return;
  }

  try {
    // -------------------------------------------------------------------------
    // 1. Desktop Test: Dropdowns, AJAX Filtering & Reset
    // -------------------------------------------------------------------------
    const desktopPage = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    console.log('Navigating to /operators/ on Desktop...');
    await desktopPage.goto(`${BASE_URL}/operators/`, { waitUntil: 'domcontentloaded', timeout: 30000 });

    const searchWrapper = await desktopPage.$('#operator-search-wrapper');
    assert(searchWrapper !== null, 'Operator search block container #operator-search-wrapper found');

    const regionDropdown = await desktopPage.$('#operator_region_dropdown');
    assert(regionDropdown !== null, 'Region taxonomy dropdown #operator_region_dropdown found');

    const categoryDropdown = await desktopPage.$('#operator_category_dropdown');
    assert(categoryDropdown !== null, 'Category taxonomy dropdown #operator_category_dropdown found');

    const searchBtn = await desktopPage.$('#operator_search_btn');
    assert(searchBtn !== null, 'Search button #operator_search_btn found');

    // Remove any third-party popups or overlays if present
    await desktopPage.evaluate(() => {
      document.querySelectorAll('.ctct-popup-overlay, #ctct_overlay, .ctct-form-embed').forEach(el => el.remove());
    });

    // Scroll search wrapper into view
    await desktopPage.evaluate(() => {
      const el = document.getElementById('operator-search-wrapper');
      if (el) el.scrollIntoView({ block: 'center' });
    });
    await desktopPage.waitForTimeout(300);

    // Test Opening Region Dropdown
    await desktopPage.evaluate(() => {
      document.querySelector('#operator_region_dropdown .dropdown-header')?.click();
    });
    await desktopPage.waitForTimeout(300);
    const isRegionOpen = await desktopPage.$eval('#operator_region_dropdown', el => el.classList.contains('open'));
    assert(isRegionOpen, 'Region dropdown opens on header click');

    // Test Selecting a Region Option
    const regionOptions = await desktopPage.$$('#operator_region_dropdown .dropdown-option');
    console.log(`  ℹ️ Found ${regionOptions.length} region options in dropdown.`);
    assert(regionOptions.length >= 1, 'Region options exist in dropdown');

    if (regionOptions.length > 1) {
      await desktopPage.evaluate(() => {
        const opts = document.querySelectorAll('#operator_region_dropdown .dropdown-option');
        if (opts.length > 1) opts[1].click();
      });
      await desktopPage.waitForTimeout(800);

      const selectedRegionText = await desktopPage.$eval('#selected_region', el => el.textContent.trim());
      assert(selectedRegionText !== 'All Regions', 'Selected region label updated in header', selectedRegionText);

      // Verify AJAX container populated
      const resultsHtml = await desktopPage.$eval('#operator_results', el => el.innerHTML);
      assert(resultsHtml.length > 0, 'AJAX query returned and populated #operator_results');

      // Verify Reset button is displayed
      const isResetVisible = await desktopPage.$eval('#operator_reset_btn', el => window.getComputedStyle(el).display !== 'none');
      assert(isResetVisible, 'Reset button became visible after applying filter');

      // Test Reset button
      await desktopPage.evaluate(() => {
        document.querySelector('#operator_reset_btn')?.click();
      });
      await desktopPage.waitForTimeout(500);

      const resetRegionText = await desktopPage.$eval('#selected_region', el => el.textContent.trim());
      assert(resetRegionText === 'All Regions', 'Reset button restored Region to "All Regions"');
    }

    await desktopPage.close();

    // -------------------------------------------------------------------------
    // 2. Mobile Responsive Test (375px)
    // -------------------------------------------------------------------------
    console.log('\nNavigating to /operators/ on Mobile (375px)...');
    const mobileContext = await browser.newContext({
      viewport: { width: 375, height: 812 },
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(`${BASE_URL}/operators/`, { waitUntil: 'domcontentloaded', timeout: 30000 });

    // Remove overlays and scroll
    await mobilePage.evaluate(() => {
      document.querySelectorAll('.ctct-popup-overlay, #ctct_overlay, .ctct-form-embed').forEach(el => el.remove());
      const el = document.getElementById('operator-search-wrapper');
      if (el) el.scrollIntoView({ block: 'center' });
    });
    await mobilePage.waitForTimeout(300);

    const mobileSearchLayout = await mobilePage.evaluate(() => {
      const el = document.querySelector('.operator-search');
      if (!el) return null;
      const cs = window.getComputedStyle(el);
      return {
        flexDirection: cs.flexDirection,
        alignItems: cs.alignItems
      };
    });

    assert(mobileSearchLayout !== null, 'Mobile operator search bar found');
    assert(mobileSearchLayout.flexDirection === 'column', 'Search bar stacks into column layout on mobile', mobileSearchLayout.flexDirection);

    // Test Mobile Category Dropdown Click & Selection
    await mobilePage.evaluate(() => {
      document.querySelector('#operator_category_dropdown .dropdown-header')?.click();
    });
    await mobilePage.waitForTimeout(300);

    const isCatOpen = await mobilePage.$eval('#operator_category_dropdown', el => el.classList.contains('open'));
    assert(isCatOpen, 'Category dropdown opens on mobile tap');

    const catOptions = await mobilePage.$$('#operator_category_dropdown .dropdown-option');
    console.log(`  ℹ️ Found ${catOptions.length} category options in dropdown.`);

    if (catOptions.length > 1) {
      await mobilePage.evaluate(() => {
        const opts = document.querySelectorAll('#operator_category_dropdown .dropdown-option');
        if (opts.length > 1) opts[1].click();
      });
      await mobilePage.waitForTimeout(800);

      const mobileResultsVisible = await mobilePage.$eval('#operator_results', el => window.getComputedStyle(el).display !== 'none');
      assert(mobileResultsVisible, 'Mobile AJAX results container displayed after filtering');
    }

    await mobileContext.close();

  } catch (err) {
    console.error('Error during test:', err.message);
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

runOperatorSearchTests();
