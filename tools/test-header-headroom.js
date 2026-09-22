/**
 * Test Suite for Floating Header Top Headroom & Clearance (TASK-2026-010)
 * Verifies that hero banners, hoop overlays, search bars, and non-hero pages
 * have proper top clearance below the floating fixed header across viewports.
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

async function runHeaderHeadroomTests() {
  console.log(`\n======================================================`);
  console.log(`📐 Page Top Headroom & Floating Header Test Suite`);
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

  const testPages = [
    { url: '/', type: 'hero', name: 'Home Page' },
    { url: '/about-itm/', type: 'hero', name: 'About ITM' },
    { url: '/things-to-do/', type: 'hero', name: 'Things To Do' },
    { url: '/operators/', type: 'standard', name: 'Operators Directory' },
    { url: '/privacy-policy/', type: 'standard', name: 'Privacy Policy' },
    { url: '/contact-us/', type: 'banner', name: 'Contact Us' },
    { url: '/operator/prairie-berry/', type: 'standard', name: 'Single Operator' },
  ];

  for (const vp of viewports) {
    console.log(`\n--- Testing ${vp.name} Viewport: ${vp.width}px x ${vp.height}px ---`);
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();

    for (const tp of testPages) {
      try {
        await page.goto(BASE_URL + tp.url, { waitUntil: 'domcontentloaded', timeout: 30000 });

        const metrics = await page.evaluate(() => {
          const header = document.querySelector('.site-header');
          const headerBottom = header ? header.getBoundingClientRect().bottom : 0;
          const hero = document.querySelector('.hero-block');
          const heroContainer = hero ? hero.querySelector('.hero-block-container') : null;
          const hoop = document.querySelector('.hero-hoop-graphic');
          const banner = document.querySelector('.banner-block');
          const searchWrapper = document.getElementById('operator-search-wrapper');
          const firstHeading = document.querySelector('main h1, main h2, .hero-block-title, .banner-block-title, .page-title, .operator-title, h1');

          return {
            headerBottom,
            heroContainerTop: heroContainer ? heroContainer.getBoundingClientRect().top : null,
            hoopTop: hoop ? hoop.getBoundingClientRect().top : null,
            bannerTop: banner ? banner.getBoundingClientRect().top : null,
            searchWrapperTop: searchWrapper ? searchWrapper.getBoundingClientRect().top : null,
            firstHeadingTop: firstHeading ? firstHeading.getBoundingClientRect().top : null,
            firstHeadingText: firstHeading ? firstHeading.innerText.trim().slice(0, 30) : '',
          };
        });

        // 1. Header has valid height
        assert(metrics.headerBottom > 50, `${tp.name} (${vp.name}): Header has valid height`, `bottom: ${Math.round(metrics.headerBottom)}px`);

        // 2. Specific checks by template type
        if (tp.type === 'hero') {
          // Hero hoop overlay is not cut off by top header
          if (metrics.hoopTop !== null) {
            assert(
              metrics.hoopTop >= (metrics.headerBottom - 5),
              `${tp.name} (${vp.name}): Hero hoop overlay is not clipped behind header`,
              `hoopTop: ${Math.round(metrics.hoopTop)}px >= headerBottom: ${Math.round(metrics.headerBottom)}px`
            );
          }
          // Hero inner text container starts safely below header
          assert(
            metrics.heroContainerTop >= metrics.headerBottom,
            `${tp.name} (${vp.name}): Hero content container clears header`,
            `containerTop: ${Math.round(metrics.heroContainerTop)}px >= headerBottom: ${Math.round(metrics.headerBottom)}px`
          );
        } else if (tp.type === 'banner') {
          // Top banner content clears header
          assert(
            metrics.firstHeadingTop >= metrics.headerBottom,
            `${tp.name} (${vp.name}): Banner heading clears header`,
            `headingTop: ${Math.round(metrics.firstHeadingTop)}px >= headerBottom: ${Math.round(metrics.headerBottom)}px`
          );
        } else {
          // Standard non-hero page: First heading or search bar must clear header
          if (metrics.searchWrapperTop !== null) {
            assert(
              metrics.searchWrapperTop >= metrics.headerBottom,
              `${tp.name} (${vp.name}): Search bar clears header without scrolling`,
              `searchTop: ${Math.round(metrics.searchWrapperTop)}px >= headerBottom: ${Math.round(metrics.headerBottom)}px`
            );
          }
          if (metrics.firstHeadingTop !== null) {
            assert(
              metrics.firstHeadingTop >= metrics.headerBottom,
              `${tp.name} (${vp.name}): Standard heading clears header`,
              `headingTop: ${Math.round(metrics.firstHeadingTop)}px >= headerBottom: ${Math.round(metrics.headerBottom)}px ("${metrics.firstHeadingText}")`
            );
          }
        }
      } catch (err) {
        console.error(`Error on ${tp.name} at ${vp.name}:`, err.message);
        failedTests++;
      }
    }

    await context.close();
  }

  await browser.close();

  console.log(`\n======================================================`);
  console.log(`Test Summary: ${passedTests} passed, ${failedTests} failed (Total: ${totalTests})`);
  console.log(`======================================================\n`);

  if (failedTests > 0) {
    process.exit(1);
  }
}

runHeaderHeadroomTests();
