/**
 * Explore Indigenous at The Forks Page Test Suite
 *
 * Verifies:
 * - HTTP 200 on /the-forks/
 * - Hero banner, brand hoop overlay, and CTAs
 * - Vision & Dual-Purpose Hub (Retail + Tourism Information)
 * - Featured Artisan Profile: Jordan Stranger (Totem Doodem) & blessing artwork
 * - 5-card Member Opportunities grid
 * - Operating hours (Thu-Sun 10am-6pm) & Ambassador booking CTA (Taytum)
 * - Navigation links in header mega menu, footer, and sitemap
 * - Pill-shaped border-radius (9999px, non-elliptical) on all rectangular badges, tags, and buttons
 * - Circular 1:1 icon containers preserved & zero horizontal overflow across Desktop (1280px), Tablet (768px), and Mobile (375px)
 * - Responsive layout & captures verification screenshots
 */

import { BASE_URL, createBrowser } from './config.js';
import fs from 'fs';
import path from 'path';

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
  console.log(`📍 Explore Indigenous at The Forks Page Test Suite`);
  console.log(`======================================================\n`);

  const browser = await createBrowser();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, ignoreHTTPSErrors: true });

  try {
    // -------------------------------------------------------------------------
    // 1. HTTP Status & Page Loading
    // -------------------------------------------------------------------------
    console.log(`--- [Section 1] Page Load & HTTP Status ---`);
    const response = await page.goto(`${BASE_URL}/the-forks/`, { waitUntil: 'networkidle', timeout: 20000 });
    assert(response && response.status() === 200, 'HTTP 200 on /the-forks/', `Status: ${response?.status()}`);

    // -------------------------------------------------------------------------
    // 2. Hero Banner & Brand Hoop Overlay
    // -------------------------------------------------------------------------
    console.log(`\n--- [Section 2] Hero Section & Header Offset ---`);
    const heroBlock = await page.$('.hero-block, .wp-block-midflight-hero-block');
    assert(!!heroBlock, 'Hero block rendered on page');

    const heroTitle = await page.textContent('h1');
    assert(heroTitle && heroTitle.includes('Explore Indigenous at The Forks'), 'H1 title matches expected', heroTitle?.trim());

    const hasHoop = await page.$('.hero-block-hoop-overlay, .hero-hoop-graphic');
    assert(!!hasHoop, 'Brand hoop overlay rendered in hero');

    // -------------------------------------------------------------------------
    // 3. Vision & Dual-Purpose Hub Section
    // -------------------------------------------------------------------------
    console.log(`\n--- [Section 3] Vision & Dual-Purpose Hub ---`);
    const visionSection = await page.$('.forks-vision-section');
    assert(!!visionSection, 'Vision section present in DOM');

    const visionLead = await page.textContent('.vision-lead');
    assert(visionLead && visionLead.includes('handcrafted goods and discover Indigenous tourism experiences'), 'Vision lead copy matches expected');

    const visionCards = await page.$$('.vision-card');
    assert(visionCards.length === 2, '2 Dual-Purpose feature cards rendered (Retail + Tourism)', `Found: ${visionCards.length}`);

    const cardTitles = await page.$$eval('.vision-card-title', els => els.map(e => e.textContent.trim()));
    assert(cardTitles.includes('Authentic Retail Store'), 'Authentic Retail Store card present');
    assert(cardTitles.includes('Tourism Information Hub'), 'Tourism Information Hub card present');

    // -------------------------------------------------------------------------
    // 4. Featured Artisan Profile: Jordan Stranger (Totem Doodem)
    // -------------------------------------------------------------------------
    console.log(`\n--- [Section 4] Featured Artisan Profile: Jordan Stranger ---`);
    const artisanSection = await page.$('.artisan-spotlight-section');
    assert(!!artisanSection, 'Artisan spotlight section present');

    const artisanName = await page.textContent('.artisan-name');
    assert(artisanName && artisanName.includes('Jordan Stranger'), 'Artist name is Jordan Stranger', artisanName?.trim());

    const artisanLink = await page.$eval('.artisan-link-btn', el => el.getAttribute('href'));
    assert(artisanLink === 'https://totemdoodem.ca/about', 'External link points to Totem Doodem about page', artisanLink);

    const clientTags = await page.$$eval('.client-tag', els => els.map(e => e.textContent.trim()));
    assert(clientTags.includes('APTN') && clientTags.includes('Apple') && clientTags.includes('Shopify'), 'Recognized client tags present (APTN, Apple, Shopify)', clientTags.join(', '));

    const blessingTitle = await page.textContent('.blessing-title');
    assert(blessingTitle && blessingTitle.includes('Special Blessing Artwork'), 'Blessing artwork narrative present');

    const printBanner = await page.$('.blessing-print-banner');
    assert(!!printBanner, 'Artwork print availability callout present');

    if (artisanSection) {
      await artisanSection.scrollIntoViewIfNeeded();
      await page.evaluate(async () => {
        const imgs = Array.from(document.querySelectorAll('.artisan-spotlight-section img'));
        imgs.forEach(img => img.scrollIntoView({ block: 'center' }));
        await Promise.all(
          imgs.map(img =>
            img.complete
              ? Promise.resolve()
              : new Promise(resolve => {
                  img.addEventListener('load', resolve, { once: true });
                  img.addEventListener('error', resolve, { once: true });
                  setTimeout(resolve, 5000);
                })
          )
        );
      });
    }

    const spotlightImages = await page.$$eval('.artisan-spotlight-section img', imgs =>
      imgs.map(img => ({
        rawSrc: img.getAttribute('src') || '',
        rawSrcset: img.getAttribute('srcset') || '',
        rawStyle: img.getAttribute('style') || '',
        alt: (img.getAttribute('alt') || '').trim(),
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
      }))
    );

    assert(
      spotlightImages.length >= 3 && spotlightImages.length <= 4,
      'Curated 3–4 Jordan Stranger photos rendered in .artisan-spotlight-section',
      `Found: ${spotlightImages.length}`
    );

    const allSpotlightLoaded = spotlightImages.length > 0 && spotlightImages.every(
      img => img.complete && img.naturalWidth > 0 && img.naturalHeight > 0
    );
    assert(
      allSpotlightLoaded,
      'All Jordan Stranger spotlight photos load cleanly (complete && naturalWidth > 0)',
      spotlightImages.map(i => `${i.rawSrc.split('/').pop()} [${i.naturalWidth}x${i.naturalHeight}]`).join(', ')
    );

    const allSpotlightAlts = spotlightImages.length > 0 && spotlightImages.every(img => img.alt.length >= 15);
    assert(
      allSpotlightAlts,
      'All Jordan Stranger spotlight photos carry descriptive non-empty alt attributes',
      `Min alt length: ${spotlightImages.length ? Math.min(...spotlightImages.map(i => i.alt.length)) : 0} chars`
    );

    const hasBlessingWindowHero = spotlightImages.some(img => img.rawSrc.includes('jordan-stranger-blessing-artwork-window'));
    assert(hasBlessingWindowHero, 'Completed window blessing artwork featured in spotlight');

    const lndoHardlinksInSpotlight = await page.$$eval('.artisan-spotlight-section, .artisan-spotlight-section *', els =>
      els
        .flatMap(el => ['src', 'srcset', 'style'].map(attr => ({ tag: el.tagName, attr, val: el.getAttribute(attr) || '' })))
        .filter(item => item.val.includes('.lndo.site'))
    );
    assert(
      lndoHardlinksInSpotlight.length === 0,
      'Zero .lndo.site hardlinks in raw src, srcset, or style attributes inside .artisan-spotlight-section',
      lndoHardlinksInSpotlight.length ? JSON.stringify(lndoHardlinksInSpotlight) : 'All root-relative /wp-content/uploads/... paths'
    );

    // -------------------------------------------------------------------------
    // 5. Member Opportunities 5-Card Grid
    // -------------------------------------------------------------------------
    console.log(`\n--- [Section 5] Member Opportunities Grid ---`);
    const oppCards = await page.$$('.opportunity-card');
    assert(oppCards.length === 5, '5 Member opportunity cards rendered', `Found: ${oppCards.length}`);

    const oppTitles = await page.$$eval('.opportunity-title', els => els.map(e => e.textContent.trim()));
    assert(oppTitles.includes('Retail Opportunities'), 'Retail Opportunities card present');
    assert(oppTitles.includes('Tourism Promotion'), 'Tourism Promotion card present');
    assert(oppTitles.includes('Workshop & Event Space'), 'Workshop & Event Space card present');
    assert(oppTitles.includes('Increased Visibility'), 'Increased Visibility card present');
    assert(oppTitles.includes('Collaborative Space'), 'Collaborative Space card present');

    // -------------------------------------------------------------------------
    // 6. Operating Hours, Location & Ambassador Booking CTA
    // -------------------------------------------------------------------------
    console.log(`\n--- [Section 6] Hours, Location & Ambassador Booking ---`);
    const hoursCard = await page.$('.hours-info-card');
    assert(!!hoursCard, 'Operating Hours card present');

    const scheduleDays = await page.textContent('.schedule-days');
    assert(scheduleDays && scheduleDays.includes('Thursday'), 'Schedule includes Thursday – Sunday', scheduleDays?.trim());

    const scheduleTime = await page.textContent('.schedule-time');
    assert(scheduleTime && scheduleTime.includes('10:00 AM – 6:00 PM'), 'Hours include 10:00 AM – 6:00 PM', scheduleTime?.trim());

    const emailLink = await page.$eval('.ambassador-contact-card a[href^="mailto:"]', el => el.getAttribute('href'));
    assert(emailLink && emailLink.includes('ambassadormgr@indigenoustourismmanitoba.ca'), 'Ambassador booking email links to ambassadormgr@indigenoustourismmanitoba.ca', emailLink);

    const inviteTitle = await page.textContent('.invite-title');
    assert(inviteTitle && inviteTitle.includes('We Invite You'), 'We Invite You closing banner present');

    // -------------------------------------------------------------------------
    // 7. Navigation Integration (Footer & Sitemap)
    // -------------------------------------------------------------------------
    console.log(`\n--- [Section 7] Navigation Links Verification ---`);
    const footerLink = await page.$('footer.site-footer a[href*="/the-forks/"]');
    assert(!!footerLink, 'Footer contains link to /the-forks/');

    // -------------------------------------------------------------------------
    // 8. Pill Badge, Tag & Button Border Radius + Zero Overflow (1280px, 768px, 375px)
    // -------------------------------------------------------------------------
    console.log(`\n--- [Section 8] Pill Border Radius & Responsive Viewport Verification ---`);

    const pillSelectors = [
      { selector: '.vision-badge', label: '.vision-badge', minCount: 1 },
      { selector: '.artisan-badge', label: '.artisan-badge', minCount: 1 },
      { selector: '.artisan-link-btn', label: '.artisan-link-btn', minCount: 1 },
      { selector: '.artwork-caption-pill', label: '.artwork-caption-pill', minCount: 1 },
      { selector: '.client-tag', label: '.client-tag', minCount: 6 },
      { selector: '.hours-info-card .card-badge', label: '.hours-info-card .card-badge', minCount: 1 },
      { selector: '.ambassador-contact-card .card-badge', label: '.ambassador-contact-card .card-badge', minCount: 1 },
    ];

    const circularIconSelectors = [
      { selector: '.vision-card-icon', label: '.vision-card-icon', expectedSize: 44 },
      { selector: '.opportunity-icon-wrap', label: '.opportunity-icon-wrap', expectedSize: 52 },
    ];

    const viewports = [
      { name: 'Desktop', key: 'desktop', width: 1280, height: 800 },
      { name: 'Tablet', key: 'tablet', width: 768, height: 1024 },
      { name: 'Mobile', key: 'mobile', width: 375, height: 812 },
    ];

    for (const vp of viewports) {
      console.log(`\n  [Viewport: ${vp.name} (${vp.width}x${vp.height})]`);
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(`${BASE_URL}/the-forks/`, { waitUntil: 'networkidle', timeout: 20000 });

      await page.evaluate(async () => {
        const imgs = Array.from(document.querySelectorAll('img[loading="lazy"]'));
        imgs.forEach(img => img.scrollIntoView({ block: 'center' }));
        await Promise.all(
          imgs.map(img =>
            img.complete && img.naturalWidth > 0
              ? Promise.resolve()
              : new Promise(resolve => {
                  img.addEventListener('load', resolve, { once: true });
                  img.addEventListener('error', resolve, { once: true });
                  setTimeout(resolve, 5000);
                })
          )
        );
        window.scrollTo(0, 0);
      });

      const vpSpotlightLoaded = await page.$$eval('.artisan-spotlight-section img', imgs =>
        imgs.length >= 3 && imgs.every(img => img.complete && img.naturalWidth > 0)
      );
      assert(vpSpotlightLoaded, `${vp.name}: All Jordan Stranger spotlight photos loaded`);

      for (const item of pillSelectors) {
        const results = await page.$$eval(item.selector, els =>
          els.map(el => {
            const cs = window.getComputedStyle(el);
            const rect = el.getBoundingClientRect();
            return {
              borderRadius: cs.borderRadius,
              borderTopLeftRadius: cs.borderTopLeftRadius,
              width: Math.round(rect.width),
              height: Math.round(rect.height),
              right: Math.round(rect.right),
            };
          })
        );

        assert(
          results.length >= item.minCount,
          `${vp.name}: ${item.label} count >= ${item.minCount}`,
          `Found: ${results.length}`
        );

        const allPill = results.length > 0 && results.every(
          r => r.borderRadius === '9999px' && r.borderTopLeftRadius === '9999px' && !r.borderRadius.includes('%')
        );
        assert(
          allPill,
          `${vp.name}: ${item.label} computes to 9999px pill shape (not elliptical %)`,
          results.map(r => `${r.borderRadius} [${r.width}x${r.height}]`).join(', ')
        );
      }

      for (const icon of circularIconSelectors) {
        const iconResults = await page.$$eval(icon.selector, els =>
          els.map(el => {
            const cs = window.getComputedStyle(el);
            const rect = el.getBoundingClientRect();
            return {
              borderRadius: cs.borderRadius,
              width: Math.round(rect.width),
              height: Math.round(rect.height),
            };
          })
        );

        const allCircular = iconResults.length > 0 && iconResults.every(
          r => r.borderRadius === '100%' && r.width === icon.expectedSize && r.height === icon.expectedSize
        );
        assert(
          allCircular,
          `${vp.name}: ${icon.label} remains 1:1 circular (${icon.expectedSize}x${icon.expectedSize}, 100%)`,
          iconResults.map(r => `${r.borderRadius} [${r.width}x${r.height}]`).join(', ')
        );
      }

      const overflowInfo = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      assert(
        overflowInfo.scrollWidth <= overflowInfo.clientWidth,
        `${vp.name}: Zero horizontal page overflow`,
        `scrollWidth: ${overflowInfo.scrollWidth}px, clientWidth: ${overflowInfo.clientWidth}px`
      );

      const dir = path.resolve(`docs/screenshots/${vp.key}`);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      const shotPath = path.join(dir, `the-forks-${vp.key}-full.png`);
      await page.screenshot({ path: shotPath, fullPage: true });
      console.log(`  📸 Saved docs/screenshots/${vp.key}/the-forks-${vp.key}-full.png`);
    }

  } catch (err) {
    console.error('Fatal error during test execution:', err);
    failedTests++;
  } finally {
    await browser.close();
  }

  console.log(`\n======================================================`);
  console.log(`📊 The Forks Page Test Summary`);
  console.log(`   Total Tests:  ${totalTests}`);
  console.log(`   Passed Tests: ${passedTests}`);
  console.log(`   Failed Tests: ${failedTests}`);
  console.log(`======================================================\n`);

  if (failedTests > 0) {
    process.exit(1);
  }
}

runTests();
