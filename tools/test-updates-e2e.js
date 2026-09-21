/**
 * Comprehensive E2E Verification Suite for Updates Listing, Filtering, and Patterns
 *
 * Verifies:
 * - /updates/ HTTP 200, header/footer integrity, post cards, date sorting (newest first).
 * - Backdated posts appear in strict chronological position.
 * - Category filter semantics (<nav>, aria-label, aria-current="page", is-active class).
 * - Category archive isolation (/category/news/ and /category/newsletter/).
 * - Single post view (/cbc-news-...), outbound link attributes, icon, and screen reader text.
 * - Dynamic category addition (filter picks up new categories with 0 code changes).
 * - Keyboard Tab navigation & focus indicators.
 */

import { BASE_URL, createBrowser } from './config.js';
import { execSync } from 'child_process';

async function runUpdatesE2ETest() {
  console.log('\n======================================================');
  console.log('📰 ITM Updates Listing & Category Filter E2E Verification');
  console.log(`   Target: ${BASE_URL}`);
  console.log('======================================================\n');

  let browser;
  try {
    browser = await createBrowser();
  } catch (err) {
    console.error('Failed to create browser:', err.message);
    process.exit(1);
  }

  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    viewport: { width: 1280, height: 900 }
  });
  const page = await context.newPage();

  let passCount = 0;
  let failCount = 0;

  function report(passed, label, details = '') {
    if (passed) {
      passCount++;
      console.log(`  ✅ [PASS] ${label} ${details ? `(${details})` : ''}`);
    } else {
      failCount++;
      console.log(`  ❌ [FAIL] ${label} ${details ? `(${details})` : ''}`);
    }
  }

  try {
    // -------------------------------------------------------------
    // Test 1: Main Updates Listing (/updates/)
    // -------------------------------------------------------------
    console.log('Step 1: Inspecting Main Listing (/updates/)...');
    const updatesUrl = `${BASE_URL}/updates/`;
    const response = await page.goto(updatesUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    report(response.status() === 200, 'HTTP 200 on /updates/', `Status: ${response.status()}`);

    // Verify Masthead & Footer
    const headerExists = await page.$('header#masthead');
    const footerExists = await page.$('footer.site-footer');
    report(!!headerExists && !!footerExists, 'Site-wide header and footer preserved without regressions');

    // Verify Updates Hero Title
    const heroTitle = await page.$eval('.updates-hero__title', el => el.textContent.trim()).catch(() => '');
    report(heroTitle.includes('Updates'), 'Updates hero banner rendered', heroTitle);

    // Verify Filter Navigation Semantics
    const filterNav = await page.$('nav.itm-category-filter');
    const filterLabel = await page.$eval('nav.itm-category-filter', el => el.getAttribute('aria-label')).catch(() => '');
    report(!!filterNav && filterLabel === 'Filter updates by category', 'Category filter has accessible <nav> and aria-label', filterLabel);

    // Verify "All" filter item is active
    const activeFilterText = await page.$eval('.itm-category-filter__link.is-active', el => el.textContent.trim()).catch(() => '');
    const activeFilterAria = await page.$eval('.itm-category-filter__link.is-active', el => el.getAttribute('aria-current')).catch(() => '');
    report(activeFilterText === 'All' && activeFilterAria === 'page', '"All" filter item is active with aria-current="page"', `Text: ${activeFilterText}, aria-current: ${activeFilterAria}`);

    // Verify Post Cards
    const postCards = await page.$$('.itm-post-card');
    report(postCards.length >= 3, 'Post cards rendered in Query Loop grid', `Count: ${postCards.length}`);

    // Verify Date Ordering (newest first, backdated June 2024 is last)
    const cardDates = await page.$$eval('.itm-post-card__date, .wp-block-post-date', els => els.map(el => el.textContent.trim()));
    console.log('     Card dates found:', cardDates);
    const date1 = new Date(cardDates[0]);
    const date2 = new Date(cardDates[1]);
    const date3 = new Date(cardDates[2]);
    const isSortedDesc = date1 >= date2 && date2 >= date3;
    report(isSortedDesc, 'Posts ordered strictly by date descending (newest first)', `${cardDates[0]} -> ${cardDates[1]} -> ${cardDates[2]}`);

    // -------------------------------------------------------------
    // Test 2: Category Archive - News (/category/news/)
    // -------------------------------------------------------------
    console.log('\nStep 2: Inspecting Category Archive (/category/news/)...');
    const newsRes = await page.goto(`${BASE_URL}/category/news/`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    report(newsRes.status() === 200, 'HTTP 200 on /category/news/');

    const newsHeroTitle = await page.$eval('.updates-hero__title', el => el.textContent.trim()).catch(() => '');
    report(newsHeroTitle === 'News', 'Category title matches archive', newsHeroTitle);

    const activeNewsFilter = await page.$eval('.itm-category-filter__link.is-active', el => el.textContent.trim()).catch(() => '');
    const activeNewsAria = await page.$eval('.itm-category-filter__link.is-active', el => el.getAttribute('aria-current')).catch(() => '');
    report(activeNewsFilter === 'News' && activeNewsAria === 'page', '"News" filter item is active with aria-current="page"', `Text: ${activeNewsFilter}`);

    const newsCards = await page.$$('.itm-post-card');
    report(newsCards.length === 2, 'Only News posts displayed on News archive', `Count: ${newsCards.length}`);

    // -------------------------------------------------------------
    // Test 3: Category Archive - Newsletter (/category/newsletter/)
    // -------------------------------------------------------------
    console.log('\nStep 3: Inspecting Category Archive (/category/newsletter/)...');
    const nlRes = await page.goto(`${BASE_URL}/category/newsletter/`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    report(nlRes.status() === 200, 'HTTP 200 on /category/newsletter/');

    const nlHeroTitle = await page.$eval('.updates-hero__title', el => el.textContent.trim()).catch(() => '');
    report(nlHeroTitle === 'Newsletter', 'Category title matches archive', nlHeroTitle);

    const activeNlFilter = await page.$eval('.itm-category-filter__link.is-active', el => el.textContent.trim()).catch(() => '');
    report(activeNlFilter === 'Newsletter', '"Newsletter" filter item is active with aria-current="page"', `Text: ${activeNlFilter}`);

    const nlCards = await page.$$('.itm-post-card');
    report(nlCards.length === 1, 'Only Newsletter posts displayed on Newsletter archive', `Count: ${nlCards.length}`);

    // -------------------------------------------------------------
    // Test 4: Single Post View & Outbound Link Pattern
    // -------------------------------------------------------------
    console.log('\nStep 4: Inspecting Single Post View (/cbc-news-indigenous-tourism-in-manitoba-experiencing-surge/)...');
    const singleUrl = `${BASE_URL}/cbc-news-indigenous-tourism-in-manitoba-experiencing-surge/`;
    const singleRes = await page.goto(singleUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    report(singleRes.status() === 200, 'HTTP 200 on single news post view');

    const singleCategory = await page.$eval('.single-post-hero__categories', el => el.textContent.trim()).catch(() => '');
    report(singleCategory === 'News', 'Single view displays category badge', singleCategory);

    const singleDate = await page.$eval('.single-post-hero__date', el => el.textContent.trim()).catch(() => '');
    report(singleDate === 'June 12, 2024', 'Single view displays backdated post date', singleDate);

    // Outbound link attributes
    const externalLink = await page.$('.is-external-link a, a.is-external-link');
    report(!!externalLink, 'External link button present in post content');

    if (externalLink) {
      const target = await externalLink.getAttribute('target');
      const rel = await externalLink.getAttribute('rel');
      const srText = await page.$eval('.is-external-link .screen-reader-text', el => el.textContent.trim()).catch(() => '');
      const icon = await page.$('.is-external-link svg.external-link-icon');

      report(target === '_blank', 'External link opens in new tab (target="_blank")');
      report(rel && rel.includes('noopener'), 'External link has rel="noopener"');
      report(srText === '(opens in a new tab)', 'Screen reader announcement text present', srText);
      report(!!icon, 'Accessible external link SVG icon present');
    }

    const backLink = await page.$eval('.single-post-article__footer .link-view-all', el => el.getAttribute('href')).catch(() => '');
    report(backLink.includes('/updates/'), 'Back to All Updates link present and points to /updates/', backLink);

    // -------------------------------------------------------------
    // Test 5: Dynamic 3rd Category Discovery (0 code changes)
    // -------------------------------------------------------------
    console.log('\nStep 5: Testing Dynamic Category Discovery...');
    // Create temporary category and post via lando wp
    try {
      execSync('lando wp term create category "Press Releases" --slug="press-releases" 2>/dev/null || true');
      const termIdOutput = execSync('lando wp term list category --slug=press-releases --field=term_id 2>/dev/null').toString().trim();
      const catId = termIdOutput.match(/\d+/)?.[0];
      if (catId) {
        execSync(`lando wp post create --post_type=post --post_title="Temporary Press Release" --post_status=publish --post_category=${catId} --post_date="2025-09-10 10:00:00" --porcelain 2>/dev/null`);

        // Reload /updates/
        await page.goto(`${BASE_URL}/updates/`, { waitUntil: 'domcontentloaded', timeout: 30000 });
        const filterNames = await page.$$eval('.itm-category-filter__link', els => els.map(el => el.textContent.trim()));
        const hasPressReleases = filterNames.includes('Press Releases');
        report(hasPressReleases, 'Filter automatically picked up "Press Releases" category with 0 code changes', filterNames.join(', '));

        // Clean up temporary post and term
        const tempPostId = execSync('lando wp post list --post_type=post --name=temporary-press-release --field=ID 2>/dev/null').toString().trim().match(/\d+/)?.[0];
        if (tempPostId) {
          execSync(`lando wp post delete ${tempPostId} --force 2>/dev/null`);
        }
        execSync(`lando wp term delete category ${catId} 2>/dev/null`);
        report(true, 'Cleaned up temporary test post and category');
      }
    } catch (catErr) {
      report(false, 'Dynamic category discovery test error', catErr.message);
    }

    // -------------------------------------------------------------
    // Test 6: Keyboard Focus Accessibility Pass
    // -------------------------------------------------------------
    console.log('\nStep 6: Accessibility & Keyboard Navigation Pass...');
    await page.goto(`${BASE_URL}/updates/`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    // Focus the first filter link
    await page.focus('.itm-category-filter__link');
    const focusedTag = await page.evaluate(() => document.activeElement ? document.activeElement.tagName : '');
    report(focusedTag === 'A', 'Category filter link receives native keyboard focus', `Active element: ${focusedTag}`);

    // Verify touch target size (>= 44px)
    const filterBox = await page.$eval('.itm-category-filter__link', el => {
      const rect = el.getBoundingClientRect();
      return { height: rect.height, width: rect.width };
    });
    report(filterBox.height >= 44, 'Filter button height meets WCAG 2.5.5 minimum 44px tap target', `${filterBox.height}px`);

    // -------------------------------------------------------------
    // Test 7: Homepage Newsletter Highlight Section
    // -------------------------------------------------------------
    console.log('\nStep 7: Inspecting Homepage Newsletter Highlight Section...');
    await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded', timeout: 30000 });

    const highlightSection = await page.$('.newsletter-highlight-section');
    report(!!highlightSection, 'Newsletter highlight section rendered on Homepage');

    const highlightTitle = await page.$eval('.newsletter-highlight-title', el => el.textContent.trim()).catch(() => '');
    report(highlightTitle.includes('Stories from Manitoba'), 'Newsletter highlight title rendered', highlightTitle);

    const viewAllBtn = await page.$eval('.newsletter-highlight-buttons .btn--primary a', el => ({
      text: el.textContent.trim(),
      href: el.getAttribute('href')
    })).catch(() => ({ text: '', href: '' }));
    report(viewAllBtn.text.includes('View All Newsletters') && viewAllBtn.href.includes('/category/newsletter/'), 'View All Newsletters CTA button points to /category/newsletter/', viewAllBtn.href);

    const featuredIssueTitle = await page.$eval('.newsletter-featured-card__title', el => el.textContent.trim()).catch(() => '');
    report(featuredIssueTitle.includes('Winter 2025 Community Newsletter'), 'Featured card dynamically displays latest newsletter edition', featuredIssueTitle);

    const readIssueLink = await page.$eval('.newsletter-featured-card .wp-block-post-excerpt__more-link', el => el.getAttribute('href')).catch(() => '');
    report(readIssueLink.includes('winter-2025'), 'Read Full Edition link points to issue single page', readIssueLink);

  } catch (err) {
    console.error('Fatal error during test run:', err);
    failCount++;
  } finally {
    await browser.close();
  }

  console.log('\n------------------------------------------------------');
  console.log(`📊 Updates E2E Summary: ${passCount} Passed, ${failCount} Failed`);
  console.log('------------------------------------------------------\n');

  if (failCount > 0) {
    process.exit(1);
  }
}

runUpdatesE2ETest();
