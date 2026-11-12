/**
 * Test Suite for Mobile Navigation Drawer, Accordion Submenu Toggles, and Desktop Mega Menu Layouts
 */
import path from 'path';
import { BASE_URL, createBrowser, screenshotsDir } from './config.js';

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

async function runMobileNavTests() {
  console.log(`\n======================================================`);
  console.log(`📱 Mobile Navigation & Dropdown Accordion Test Suite`);
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

  const screenWidths = [375, 768];

  for (const width of screenWidths) {
    console.log(`\n--- Testing Mobile Viewport: ${width}px x 812px ---`);
    const context = await browser.newContext({
      viewport: { width, height: 812 },
      hasTouch: true,
    });
    const page = await context.newPage();

    const pageErrors = [];
    page.on('pageerror', err => {
      pageErrors.push(err.message);
      console.error(`  [Browser PageError] ${err.message}`);
    });
    page.on('console', msg => {
      if (msg.type() === 'error') {
        const text = msg.text();
        if (text.includes('SyntaxError') || text.includes('querySelector') || text.includes('navigation.js')) {
          pageErrors.push(text);
          console.error(`  [Browser Console Error] ${text}`);
        }
      }
    });

    try {
      await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });

      // Check for zero SyntaxError or navigation runtime errors
      assert(pageErrors.length === 0, `Zero SyntaxErrors or navigation errors during page load at ${width}px`, pageErrors.join('; '));

      // 1. Hamburger button presence and state
      const hamburger = await page.$('#bar_menu');
      assert(hamburger !== null, `Hamburger button #bar_menu is present at ${width}px`);

      const initialHamburgerAria = await page.$eval('#bar_menu', el => el.getAttribute('aria-expanded'));
      assert(initialHamburgerAria === 'false', 'Initial hamburger aria-expanded is "false"');

      // 2. Click Hamburger to open drawer
      await hamburger.click();
      await page.waitForTimeout(350);

      const isToggled = await page.$eval('#site-navigation', el => el.classList.contains('toggled'));
      const isHamburgerActive = await page.$eval('#bar_menu', el => el.classList.contains('is-active'));
      const openedHamburgerAria = await page.$eval('#bar_menu', el => el.getAttribute('aria-expanded'));

      assert(isToggled, 'Navigation container has .toggled class after click');
      assert(isHamburgerActive, 'Hamburger has .is-active class');
      assert(openedHamburgerAria === 'true', 'Hamburger aria-expanded is "true"');

      // 3. Inspect menu parents and accordion toggle buttons
      const parentCount = await page.$$eval('.mega-menu-parent, .menu-item-has-children', els => els.length);
      console.log(`  ℹ️ Found ${parentCount} menu items with submenus.`);

      if (parentCount > 0) {
        // Test first menu parent toggle via chevron button
        const firstParent = await page.$('.mega-menu-parent, .menu-item-has-children');
        const firstToggleBtn = await firstParent.$('.submenu-toggle-btn');
        assert(firstToggleBtn !== null, 'Submenu toggle chevron button exists');

        // Click first chevron toggle
        await firstToggleBtn.click();
        await page.waitForTimeout(300);

        const isFirstOpen = await page.evaluate(el => el.classList.contains('open'), firstParent);
        const firstAriaExpanded = await page.evaluate(el => el.getAttribute('aria-expanded'), firstToggleBtn);
        const firstPanelHidden = await page.evaluate(el => {
          const p = el.querySelector('.mega-menu-panel');
          return p ? p.getAttribute('aria-hidden') : null;
        }, firstParent);

        const firstPanelDisplay = await page.evaluate(el => {
          const p = el.querySelector('.mega-menu-panel');
          return p ? window.getComputedStyle(p).display : null;
        }, firstParent);

        assert(isFirstOpen, 'First menu parent has .open class after toggle click');
        assert(firstAriaExpanded === 'true', 'Chevron button aria-expanded updated to "true"');
        assert(firstPanelHidden === 'false', 'Mega menu panel aria-hidden is "false"');
        assert(firstPanelDisplay === 'block', `Mega menu panel is display:block (was: ${firstPanelDisplay})`);

        const mobileContentDir = await page.evaluate(el => {
          const c = el.querySelector('.mega-menu-content');
          return c ? window.getComputedStyle(c).flexDirection : null;
        }, firstParent);
        assert(mobileContentDir === 'column', `Mobile mega-menu-content retains flex-direction: column (was: ${mobileContentDir})`);

        // 4. Test Single Active Accordion: Click second parent (if exists)
        if (parentCount > 1) {
          const allParents = await page.$$('.mega-menu-parent, .menu-item-has-children');
          const secondParent = allParents[1];
          const secondLink = await secondParent.$('a');

          // Click second parent link on mobile
          await secondLink.click();
          await page.waitForTimeout(300);

          const isSecondOpen = await page.evaluate(el => el.classList.contains('open'), secondParent);
          const wasFirstClosed = await page.evaluate(el => !el.classList.contains('open'), firstParent);
          const firstAriaAfterSwitch = await page.evaluate(el => el.getAttribute('aria-expanded'), firstToggleBtn);

          assert(isSecondOpen, 'Second menu item opened via parent link click');
          assert(wasFirstClosed, 'Single Active Accordion: First menu item automatically closed');
          assert(firstAriaAfterSwitch === 'false', 'First chevron button aria-expanded reset to "false"');
        }

        // 5. Test close drawer resets all accordions
        await page.evaluate(() => document.getElementById('bar_menu').click());
        await page.waitForTimeout(350);

        const drawerClosed = await page.$eval('#site-navigation', el => !el.classList.contains('toggled'));
        const allClosed = await page.$$eval('.mega-menu-parent.open, .menu-item-has-children.open', els => els.length === 0);

        assert(drawerClosed, 'Drawer closed on hamburger click');
        assert(allClosed, 'All open accordions collapsed when drawer closed');
      }
    } catch (err) {
      console.error(`Error during test at ${width}px:`, err.message);
      failedTests++;
    } finally {
      await context.close();
    }
  }

  // Desktop Viewport Test
  console.log(`\n--- Testing Desktop Viewport: 1280px x 800px ---`);
  const desktopContext = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  const desktopPage = await desktopContext.newPage();
  const desktopErrors = [];
  desktopPage.on('pageerror', err => {
    desktopErrors.push(err.message);
    console.error(`  [Desktop PageError] ${err.message}`);
  });
  desktopPage.on('console', msg => {
    if (msg.type() === 'error') {
      const text = msg.text();
      if (text.includes('SyntaxError') || text.includes('querySelector') || text.includes('navigation.js')) {
        desktopErrors.push(text);
        console.error(`  [Desktop Console Error] ${text}`);
      }
    }
  });

  try {
    await desktopPage.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    assert(desktopErrors.length === 0, 'Zero SyntaxErrors or navigation errors during desktop page load at 1280px', desktopErrors.join('; '));

    const firstMenuParent = await desktopPage.$('.mega-menu-parent, .menu-item-has-children');
    if (firstMenuParent) {
      const parentLink = await firstMenuParent.$('a');
      assert(parentLink !== null, 'Desktop menu item direct link found');

      // Test hover / mouseenter
      await firstMenuParent.hover();
      await desktopPage.waitForTimeout(200);

      const isHoverActive = await desktopPage.evaluate(el => el.classList.contains('is-active'), firstMenuParent);
      const hoverAria = await desktopPage.evaluate(el => el.getAttribute('aria-expanded'), parentLink);
      assert(isHoverActive, 'Desktop menu parent has .is-active class on hover');
      assert(hoverAria === 'true', 'Desktop menu item has aria-expanded="true" on hover');

      // Test escape key closes menu
      await desktopPage.keyboard.press('Escape');
      await desktopPage.waitForTimeout(200);

      const isClosedAfterEscape = await desktopPage.evaluate(el => !el.classList.contains('is-active'), firstMenuParent);
      const escapeAria = await desktopPage.evaluate(el => el.getAttribute('aria-expanded'), parentLink);
      assert(isClosedAfterEscape, 'Desktop menu parent closed after pressing Escape');
      assert(escapeAria === 'false', 'Desktop menu item has aria-expanded="false" after Escape');
    }

    // Single-Column Mega Menu Geometry & Alignment Test (e.g., About ITM)
    const singleColParent = await desktopPage.evaluateHandle(() => {
      const parents = Array.from(document.querySelectorAll('.nav-menu > li.mega-menu-parent'));
      return (
        parents.find(li => {
          const text = li.querySelector(':scope > a, :scope > .menu-item')?.textContent?.trim() || '';
          return text === 'About ITM' && li.querySelectorAll('li.mega-menu-column').length === 1;
        }) ||
        parents.find(li => li.querySelectorAll('li.mega-menu-column').length === 1) ||
        null
      );
    });
    const singleColEl = singleColParent.asElement();
    assert(singleColEl !== null, 'Found a 1-column desktop mega menu parent (e.g., About ITM)');

    if (singleColEl) {
      await singleColEl.hover();
      await desktopPage.waitForTimeout(300);

      const singleColMetrics = await desktopPage.evaluate(parentEl => {
        const title = parentEl.querySelector(':scope > a, :scope > .menu-item')?.textContent?.trim() || '';
        const content = parentEl.querySelector('.mega-menu-content');
        const columnsList = parentEl.querySelector('ul.mega-menu-columns');
        const col = parentEl.querySelector('li.mega-menu-column');
        const featured = parentEl.querySelector('.mega-menu-featured');
        const contentStyle = content ? window.getComputedStyle(content) : null;
        const listStyle = columnsList ? window.getComputedStyle(columnsList) : null;
        const colRect = col ? col.getBoundingClientRect() : null;
        const featuredRect = featured ? featured.getBoundingClientRect() : null;

        return {
          title,
          hasCols1Class: content ? content.classList.contains('mega-menu-cols-1') : false,
          justifyContent: contentStyle ? contentStyle.justifyContent : null,
          gapCss: contentStyle ? contentStyle.columnGap || contentStyle.gap : null,
          listFlexGrow: listStyle ? listStyle.flexGrow : null,
          colWidth: colRect ? Math.round(colRect.width) : null,
          horizontalGapPx:
            colRect && featuredRect ? Math.round(featuredRect.left - colRect.right) : null,
          panelBottom: parentEl.querySelector('.mega-menu-panel')
            ? Math.ceil(parentEl.querySelector('.mega-menu-panel').getBoundingClientRect().bottom)
            : 520,
        };
      }, singleColEl);

      assert(
        singleColMetrics.hasCols1Class,
        `1-column mega menu ("${singleColMetrics.title}") has .mega-menu-cols-1 class`
      );
      assert(
        singleColMetrics.justifyContent === 'flex-end',
        `1-column mega menu ("${singleColMetrics.title}") computed justify-content is "flex-end"`,
        `got: ${singleColMetrics.justifyContent}`
      );
      assert(
        singleColMetrics.listFlexGrow === '0',
        `1-column ul.mega-menu-columns does not stretch (flex-grow: 0)`,
        `got: ${singleColMetrics.listFlexGrow}`
      );
      assert(
        singleColMetrics.colWidth !== null && singleColMetrics.colWidth >= 220 && singleColMetrics.colWidth <= 300,
        `1-column li.mega-menu-column width is compact (220px-300px)`,
        `got: ${singleColMetrics.colWidth}px`
      );
      assert(
        singleColMetrics.horizontalGapPx !== null &&
          singleColMetrics.horizontalGapPx >= 48 &&
          singleColMetrics.horizontalGapPx <= 120,
        `1-column horizontal gap to featured card is compact (<= 120px)`,
        `got: ${singleColMetrics.horizontalGapPx}px`
      );

      // Capture verification screenshot of open 1-column mega menu dropdown
      const screenshotPath = path.join(screenshotsDir, 'mega-menu-1col-desktop.png');
      const clipHeight = Math.min(800, Math.max(480, singleColMetrics.panelBottom + 32));
      await desktopPage.screenshot({
        path: screenshotPath,
        clip: { x: 0, y: 0, width: 1280, height: clipHeight },
      });
      console.log(`  📸 Saved 1-column desktop mega menu screenshot: ${screenshotPath}`);

      await desktopPage.keyboard.press('Escape');
      await desktopPage.waitForTimeout(200);
    }

    // Multi-Column (3-Column Explore & 2-Column) Mega Menu Regression Test
    const multiColResults = await desktopPage.evaluate(() => {
      const parents = Array.from(document.querySelectorAll('.nav-menu > li.mega-menu-parent'));
      return parents
        .filter(li => li.querySelectorAll('li.mega-menu-column').length >= 2)
        .map(li => {
          const title = li.querySelector(':scope > a, :scope > .menu-item')?.textContent?.trim() || '';
          const colCount = li.querySelectorAll('li.mega-menu-column').length;
          const content = li.querySelector('.mega-menu-content');
          const columnsList = li.querySelector('ul.mega-menu-columns');
          const contentStyle = content ? window.getComputedStyle(content) : null;
          const listStyle = columnsList ? window.getComputedStyle(columnsList) : null;
          return {
            title,
            colCount,
            hasExpectedClass: content ? content.classList.contains(`mega-menu-cols-${colCount}`) : false,
            justifyContent: contentStyle ? contentStyle.justifyContent : null,
            listFlexGrow: listStyle ? listStyle.flexGrow : null,
          };
        });
    });

    const exploreMenu = multiColResults.find(m => m.title === 'Explore' || m.colCount === 3);
    assert(exploreMenu !== undefined, 'Found 3-column Explore mega menu on desktop');
    if (exploreMenu) {
      assert(
        exploreMenu.hasExpectedClass && exploreMenu.colCount === 3,
        `3-column "${exploreMenu.title}" mega menu has .mega-menu-cols-3 class`
      );
      assert(
        exploreMenu.justifyContent === 'space-between',
        `3-column "${exploreMenu.title}" mega menu retains justify-content: space-between`,
        `got: ${exploreMenu.justifyContent}`
      );
      assert(
        exploreMenu.listFlexGrow === '1',
        `3-column "${exploreMenu.title}" ul.mega-menu-columns retains flex-grow: 1`,
        `got: ${exploreMenu.listFlexGrow}`
      );
    }

    for (const multi of multiColResults.filter(m => m !== exploreMenu)) {
      assert(
        multi.hasExpectedClass,
        `${multi.colCount}-column "${multi.title}" mega menu has .mega-menu-cols-${multi.colCount} class`
      );
      assert(
        multi.justifyContent === 'space-between',
        `${multi.colCount}-column "${multi.title}" mega menu retains justify-content: space-between`,
        `got: ${multi.justifyContent}`
      );
    }
  } catch (err) {
    console.error('Error during desktop navigation test:', err.message);
    failedTests++;
  } finally {
    await desktopContext.close();
  }

  await browser.close();

  console.log(`\n======================================================`);
  console.log(`Test Summary: ${passedTests} passed, ${failedTests} failed (Total: ${totalTests})`);
  console.log(`======================================================\n`);

  if (failedTests > 0) {
    process.exit(1);
  }
}

runMobileNavTests();
