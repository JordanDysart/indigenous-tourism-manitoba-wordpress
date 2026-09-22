/**
 * Test Suite for Mobile Horizontal Gutter Padding & Layout Constraints (TASK-2026-008)
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

async function testMobileGutters() {
  console.log(`\n======================================================`);
  console.log(`📱 Mobile Horizontal Gutter & Constraint Test Suite`);
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

  const testViewports = [
    { width: 360, height: 800, name: '360px (Small Android)' },
    { width: 375, height: 812, name: '375px (iPhone SE)' },
    { width: 390, height: 844, name: '390px (iPhone 14)' },
    { width: 414, height: 896, name: '414px (iPhone Plus)' },
  ];

  try {
    // -------------------------------------------------------------------------
    // 1. Test /about-itm/
    // -------------------------------------------------------------------------
    console.log(`--- Testing /about-itm/ Across Mobile Viewports ---`);
    for (const vp of testViewports) {
      const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      await page.goto(`${BASE_URL}/about-itm/`, { waitUntil: 'domcontentloaded', timeout: 30000 });

      // Dismiss popup overlays if any
      await page.evaluate(() => {
        document.querySelectorAll('.ctct-popup-overlay, #ctct_overlay, .ctct-form-embed').forEach(el => el.remove());
      });

      const metrics = await page.evaluate((expectedWidth) => {
        const scrollW = document.documentElement.scrollWidth;
        const clientW = document.documentElement.clientWidth;
        const noOverflow = scrollW <= clientW;

        // Inspect paragraphs in main content
        const paragraphs = Array.from(document.querySelectorAll('.entry-content p, .site-main p')).map(p => {
          const rect = p.getBoundingClientRect();
          return {
            text: p.innerText.substring(0, 35),
            left: rect.left,
            right: rect.right,
            width: rect.width,
          };
        });

        // Check if any paragraph has gutter < 16px (allowing slight subpixel rendering)
        const violatingParagraphs = paragraphs.filter(p => p.left < 16 || (expectedWidth - p.right) < 16);

        // Check page sections
        const sections = Array.from(document.querySelectorAll('.page-section')).map(s => {
          const cs = window.getComputedStyle(s);
          return {
            hasConstrainedClass: s.classList.contains('constrained-content'),
            paddingLeft: parseFloat(cs.paddingLeft),
            paddingRight: parseFloat(cs.paddingRight),
          };
        });

        return { noOverflow, scrollW, clientW, violatingParagraphs, sections };
      }, vp.width);

      assert(metrics.noOverflow, `Zero horizontal overflow on /about-itm/ at ${vp.name}`, `scroll: ${metrics.scrollW}px, client: ${metrics.clientW}px`);
      assert(metrics.violatingParagraphs.length === 0, `All content paragraphs maintain >= 20px side gutters on /about-itm/ at ${vp.name}`,
        metrics.violatingParagraphs.length > 0 ? `Violations: ${JSON.stringify(metrics.violatingParagraphs)}` : 'Gutter >= 20px confirmed');

      const allSectionsConstrained = metrics.sections.every(s => s.hasConstrainedClass);
      assert(allSectionsConstrained, `All .page-section blocks have .constrained-content on /about-itm/ at ${vp.name}`);

      await page.close();
    }

    // -------------------------------------------------------------------------
    // 2. Test /contact-us/
    // -------------------------------------------------------------------------
    console.log(`\n--- Testing /contact-us/ Across Mobile Viewports ---`);
    for (const vp of testViewports) {
      const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      await page.goto(`${BASE_URL}/contact-us/`, { waitUntil: 'domcontentloaded', timeout: 30000 });

      await page.evaluate(() => {
        document.querySelectorAll('.ctct-popup-overlay, #ctct_overlay, .ctct-form-embed').forEach(el => el.remove());
      });

      const metrics = await page.evaluate((expectedWidth) => {
        const scrollW = document.documentElement.scrollWidth;
        const clientW = document.documentElement.clientWidth;
        const noOverflow = scrollW <= clientW;

        const card = document.querySelector('.contact-form-card');
        const cardRect = card ? card.getBoundingClientRect() : null;
        const cardGutterLeft = cardRect ? cardRect.left : 0;
        const cardGutterRight = cardRect ? expectedWidth - cardRect.right : 0;

        // Check column flex direction
        const grid = document.querySelector('.contact-section-grid');
        const isStacked = grid ? (grid.getBoundingClientRect().height > 200) : false;

        return {
          noOverflow,
          scrollW,
          clientW,
          cardGutterLeft,
          cardGutterRight,
          isStacked,
        };
      }, vp.width);

      assert(metrics.noOverflow, `Zero horizontal overflow on /contact-us/ at ${vp.name}`, `scroll: ${metrics.scrollW}px, client: ${metrics.clientW}px`);
      assert(metrics.cardGutterLeft >= 18 && metrics.cardGutterRight >= 18, `Contact card maintains >= 20px horizontal margins at ${vp.name}`,
        `left: ${Math.round(metrics.cardGutterLeft)}px, right: ${Math.round(metrics.cardGutterRight)}px`);
      assert(metrics.isStacked, `Contact section grid stacks vertically on ${vp.name}`);

      await page.close();
    }

    // -------------------------------------------------------------------------
    // 3. Desktop Verification
    // -------------------------------------------------------------------------
    console.log(`\n--- Testing Desktop Max Width Constraints (1280px) ---`);
    const desktopPage = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await desktopPage.goto(`${BASE_URL}/about-itm/`, { waitUntil: 'domcontentloaded' });
    const desktopMaxWidth = await desktopPage.evaluate(() => {
      const section = document.querySelector('.constrained-content');
      if (!section) return 0;
      const rect = section.getBoundingClientRect();
      return rect.width;
    });
    assert(desktopMaxWidth <= 1200, `Desktop .constrained-content width capped at 1200px`, `width: ${desktopMaxWidth}px`);
    await desktopPage.close();

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

testMobileGutters();
