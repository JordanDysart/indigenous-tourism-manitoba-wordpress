/**
 * Test Suite for Mobile Navigation Drawer and Accordion Submenu Toggles
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

    try {
      await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });

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

  await browser.close();

  console.log(`\n======================================================`);
  console.log(`Test Summary: ${passedTests} passed, ${failedTests} failed (Total: ${totalTests})`);
  console.log(`======================================================\n`);

  if (failedTests > 0) {
    process.exit(1);
  }
}

runMobileNavTests();
