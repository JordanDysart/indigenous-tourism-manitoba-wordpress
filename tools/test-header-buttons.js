/**
 * Test Suite for Button Styling, Header Sizing, and Mega Menu Alignment
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
  console.log(`🔘 Button Styling, Header Sizing & Mega Menu Test Suite`);
  console.log(`======================================================\n`);

  const browser = await createBrowser();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  try {
    // -------------------------------------------------------------------------
    // 1. Button Styling Tests on /things-to-do/
    // -------------------------------------------------------------------------
    console.log(`--- Test Section 1: WordPress Core Button Styling ---`);
    await page.goto(`${BASE_URL}/things-to-do/`, { waitUntil: 'networkidle' });

    const buttonInspection = await page.evaluate(() => {
      const buttonWrapper = document.querySelector('.wp-block-button');
      if (!buttonWrapper) return null;
      const wrapCs = window.getComputedStyle(buttonWrapper);
      const link = buttonWrapper.querySelector('.wp-block-button__link, .wp-element-button') || buttonWrapper;
      const linkCs = window.getComputedStyle(link);

      return {
        wrapperBg: wrapCs.backgroundColor,
        wrapperPadding: wrapCs.padding,
        wrapperBorder: wrapCs.borderWidth,
        linkBg: linkCs.backgroundColor,
        linkColor: linkCs.color,
        linkPadding: linkCs.padding,
        linkRadius: linkCs.borderRadius,
        linkText: link.innerText.trim(),
      };
    });

    assert(buttonInspection !== null, 'Found .wp-block-button on /things-to-do/');
    if (buttonInspection) {
      // Wrapper must be transparent (rgba(0, 0, 0, 0)) to avoid double nested box!
      const isWrapTransparent = buttonInspection.wrapperBg === 'rgba(0, 0, 0, 0)' || buttonInspection.wrapperBg === 'transparent';
      assert(isWrapTransparent, 'Button outer wrapper has transparent background (no outer rectangular box)', buttonInspection.wrapperBg);
      assert(buttonInspection.wrapperPadding === '0px', 'Button outer wrapper has 0px padding', buttonInspection.wrapperPadding);

      // Inner link must have theme color and styling
      const hasOrangeBg = buttonInspection.linkBg.includes('218, 82, 37') || buttonInspection.linkBg.includes('rgb(');
      assert(hasOrangeBg, 'Button link has colored background', buttonInspection.linkBg);
      assert(buttonInspection.linkColor === 'rgb(255, 255, 255)', 'Button link text is white (#ffffff)', buttonInspection.linkColor);
      assert(buttonInspection.linkRadius === '8px' || buttonInspection.linkRadius === '6px' || buttonInspection.linkRadius.includes('px'), 'Button has rounded corners', buttonInspection.linkRadius);
    }

    // Capture screenshot of Culture & Heritage card with button
    const cardEl = await page.$('.experience-category-card, .wp-block-columns');
    if (cardEl) {
      await cardEl.scrollIntoViewIfNeeded();
      await page.screenshot({ path: 'docs/screenshots/desktop/things-to-do-button-fixed.png' });
    }

    // -------------------------------------------------------------------------
    // 2. Hero Banner Top Bleed & Internal Header Offset Padding Tests
    // -------------------------------------------------------------------------
    console.log(`\n--- Test Section 2: Hero Banner Top Bleed & Internal Header Offset Padding ---`);
    await page.goto(`${BASE_URL}/things-to-do/`, { waitUntil: 'networkidle' });

    const layoutCheck = await page.evaluate(() => {
      const header = document.querySelector('#masthead');
      const pageEl = document.querySelector('#page');
      const hero = document.querySelector('.hero-block, .banner-block');
      const heroContainer = document.querySelector('.hero-block-container, .banner-block-content');

      const headerHeight = header ? header.offsetHeight : 0;
      const pagePaddingTop = pageEl ? parseFloat(window.getComputedStyle(pageEl).paddingTop) : 0;
      const heroRect = hero ? hero.getBoundingClientRect() : null;
      const heroContainerPaddingTop = heroContainer ? parseFloat(window.getComputedStyle(heroContainer).paddingTop) : 0;

      return {
        headerHeight,
        pagePaddingTop,
        heroTop: heroRect ? heroRect.top : null,
        heroContainerPaddingTop,
      };
    });

    assert(layoutCheck.headerHeight > 60 && layoutCheck.headerHeight < 120, 'Header at rest is within standard height range (60px-110px)', `${layoutCheck.headerHeight}px`);
    assert(layoutCheck.pagePaddingTop === 0, '#page container top padding is 0px (offset moved into hero banner)', `${layoutCheck.pagePaddingTop}px`);
    assert(layoutCheck.heroTop !== null && layoutCheck.heroTop <= 5, 'Hero banner extends to top of viewport (y <= 5px)', `${layoutCheck.heroTop}px`);
    assert(layoutCheck.heroContainerPaddingTop >= layoutCheck.headerHeight, 'Hero inner container top padding includes header offset to center text below nav', `Hero container paddingTop: ${layoutCheck.heroContainerPaddingTop}px >= Header: ${layoutCheck.headerHeight}px`);

    // Test on scroll
    await page.evaluate(() => window.scrollBy(0, 400));
    await page.waitForTimeout(300);

    const scrolledHeader = await page.evaluate(() => {
      const header = document.querySelector('#masthead');
      return {
        isFixed: header.classList.contains('fixed'),
        height: header.offsetHeight,
      };
    });

    assert(scrolledHeader.isFixed, 'Header receives .fixed class on scroll');
    assert(scrolledHeader.height > 55 && scrolledHeader.height <= layoutCheck.headerHeight, 'Scrolled header height is smooth and compact', `${scrolledHeader.height}px`);

    // -------------------------------------------------------------------------
    // 3. Mega Menu Dropdown Alignment, Multi-Column & Featured Showcase Tests
    // -------------------------------------------------------------------------
    console.log(`\n--- Test Section 3: Mega Menu Multi-Column & Featured Showcase ---`);
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

    const megaMenuAlignment = await page.evaluate(() => {
      const header = document.querySelector('#masthead');
      const megaPanel = document.querySelector('.mega-menu-panel');
      if (!header || !megaPanel) return null;

      const headerRect = header.getBoundingClientRect();
      const panelCs = window.getComputedStyle(megaPanel);

      return {
        headerBottom: headerRect.bottom,
        panelTopProp: panelCs.top,
        panelTopComputed: parseFloat(panelCs.top),
      };
    });

    assert(megaMenuAlignment !== null, 'Found .mega-menu-panel in DOM');
    if (megaMenuAlignment) {
      const alignmentDiff = Math.abs(megaMenuAlignment.panelTopComputed - megaMenuAlignment.headerBottom);
      assert(alignmentDiff <= 4, 'Mega menu top position is flush with header bottom border (no overlap, no gap)', `Header Bottom: ${megaMenuAlignment.headerBottom}px, Mega Menu Top: ${megaMenuAlignment.panelTopComputed}px`);
    }

    // Inspect the "Explore" mega menu parent
    const exploreMenuItem = await page.evaluateHandle(() => {
      const items = Array.from(document.querySelectorAll('.mega-menu-parent'));
      return items.find(i => i.innerText.includes('Explore')) || items[0];
    });

    assert(!!exploreMenuItem, 'Found "Explore" mega-menu-parent in navigation');

    if (exploreMenuItem) {
      // Step A: Hover item -> Panel becomes visible
      await exploreMenuItem.hover();
      await page.waitForTimeout(100);

      const exploreData = await page.evaluate(() => {
        const exploreParent = Array.from(document.querySelectorAll('.mega-menu-parent')).find(i => i.innerText.includes('Explore'));
        if (!exploreParent) return null;
        const panel = exploreParent.querySelector('.mega-menu-panel');
        if (!panel) return null;

        const columns = Array.from(panel.querySelectorAll('.mega-menu-column')).map(col => ({
          heading: col.querySelector('.mega-menu-column-heading')?.innerText?.trim(),
          linksCount: col.querySelectorAll('.nested-menu a').length,
          links: Array.from(col.querySelectorAll('.nested-menu a')).map(a => a.innerText.trim()),
        }));

        const featured = panel.querySelector('.mega-menu-featured');
        const featuredCard = featured ? {
          title: featured.querySelector('.mega-menu-featured-title')?.innerText?.trim(),
          badge: featured.querySelector('.mega-menu-featured-badge')?.innerText?.trim(),
          desc: featured.querySelector('.mega-menu-featured-desc')?.innerText?.trim(),
          btnText: featured.querySelector('.mega-menu-featured-btn')?.innerText?.trim(),
          btnHref: featured.querySelector('.mega-menu-featured-btn')?.getAttribute('href'),
          hasImg: !!featured.querySelector('img'),
          imgSrc: featured.querySelector('img')?.getAttribute('src'),
        } : null;

        return {
          isVisible: window.getComputedStyle(panel).visibility === 'visible',
          columnsCount: columns.length,
          columns,
          featuredCard,
        };
      });

      assert(exploreData && exploreData.isVisible, 'Explore mega menu panel is visible on hover');
      assert(exploreData && exploreData.columnsCount >= 2, 'Explore mega menu has multi-column layout (>=2 columns)', `Found ${exploreData?.columnsCount} columns`);
      
      const regionCol = exploreData?.columns?.find(c => c.heading && c.heading.toLowerCase().includes('region'));
      assert(!!regionCol && regionCol.linksCount >= 4, '"By Region" column exists with region links', `Count: ${regionCol?.linksCount}`);

      const categoryCol = exploreData?.columns?.find(c => c.heading && c.heading.toLowerCase().includes('category'));
      assert(!!categoryCol && categoryCol.linksCount >= 4, '"By Category" column exists with category links', `Count: ${categoryCol?.linksCount}`);

      assert(!!exploreData?.featuredCard, 'Right-side featured showcase card exists in Explore mega menu');
      assert(exploreData?.featuredCard?.hasImg, 'Featured showcase card has an image', exploreData?.featuredCard?.imgSrc);
      assert(exploreData?.featuredCard?.btnHref === '/operators/', 'Featured card button links to /operators/', exploreData?.featuredCard?.btnHref);

      await page.screenshot({ path: 'docs/screenshots/desktop/mega-menu-explore-columns.png' });

      // Step B: Move cursor away (to top left of page) -> Panel remains visible during 150ms buffer
      await page.mouse.move(10, 10);
      await page.waitForTimeout(100);
      const isStillVisibleDuringBuffer = await page.evaluate(() => {
        const exploreParent = Array.from(document.querySelectorAll('.mega-menu-parent')).find(i => i.innerText.includes('Explore'));
        const panel = exploreParent ? exploreParent.querySelector('.mega-menu-panel') : null;
        if (!panel) return false;
        const cs = window.getComputedStyle(panel);
        return cs.visibility === 'visible' && parseFloat(cs.opacity) > 0;
      });
      assert(isStillVisibleDuringBuffer, 'Mega menu panel stays open during hover-intent buffer delay (100ms after mouse leave)');

      // Step C: Wait past 400ms buffer -> Panel closes
      await page.waitForTimeout(450);
      const isHiddenAfterDelay = await page.evaluate(() => {
        const exploreParent = Array.from(document.querySelectorAll('.mega-menu-parent')).find(i => i.innerText.includes('Explore'));
        const panel = exploreParent ? exploreParent.querySelector('.mega-menu-panel') : null;
        if (!panel) return true;
        const cs = window.getComputedStyle(panel);
        return cs.visibility === 'hidden' || parseFloat(cs.opacity) === 0;
      });
      assert(isHiddenAfterDelay, 'Mega menu panel closes gracefully after hover delay expires (450ms)');

      // Step D: Re-open and hover down into the panel using the hover bridge
      await exploreMenuItem.hover();
      await page.waitForTimeout(50);
      // Move mouse down into the Explore dropdown column area
      await page.mouse.move(500, 200);
      await page.waitForTimeout(100);
      const isStillOpenInsidePanel = await page.evaluate(() => {
        const exploreParent = Array.from(document.querySelectorAll('.mega-menu-parent')).find(i => i.innerText.includes('Explore'));
        const panel = exploreParent ? exploreParent.querySelector('.mega-menu-panel') : null;
        if (!panel) return false;
        const cs = window.getComputedStyle(panel);
        return cs.visibility === 'visible' && parseFloat(cs.opacity) > 0;
      });
      assert(isStillOpenInsidePanel, 'Mega menu panel stays interactive and open while navigating inside panel');
    }

    // Capture screenshots for each top-level menu item
    const menuNames = ['About ITM', 'Explore', 'Guide Training Program', 'Membership'];
    for (const name of menuNames) {
      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(100);

      const navItem = await page.evaluateHandle((menuName) => {
        const items = Array.from(document.querySelectorAll('.mega-menu-parent'));
        return items.find(i => i.innerText.includes(menuName)) || null;
      }, name);

      if (navItem) {
        await navItem.hover();
        await page.waitForTimeout(250);
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        await page.screenshot({ path: `docs/screenshots/desktop/mega-menu-${slug}.png` });
      }
    }

  } catch (err) {
    assert(false, 'Exception during test execution', err.message);
  } finally {
    await browser.close();
  }

  console.log(`\n------------------------------------------------------`);
  console.log(`📊 Header, Buttons & Mega Menu Summary: ${passedTests} Passed, ${failedTests} Failures`);
  console.log(`------------------------------------------------------\n`);

  if (failedTests > 0) {
    process.exit(1);
  }
}

runTests();
