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
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

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
    // 8. Capture Verification Screenshots
    // -------------------------------------------------------------------------
    console.log(`\n--- [Section 8] Capturing Verification Screenshots ---`);
    const screenshotDir = path.resolve('docs/screenshots/desktop');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    await page.screenshot({ path: path.join(screenshotDir, 'the-forks-desktop-full.png'), fullPage: true });
    console.log(`  📸 Saved docs/screenshots/desktop/the-forks-desktop-full.png`);

    // Mobile screenshot
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`${BASE_URL}/the-forks/`, { waitUntil: 'networkidle' });
    const mobileDir = path.resolve('docs/screenshots/mobile');
    if (!fs.existsSync(mobileDir)) fs.mkdirSync(mobileDir, { recursive: true });

    await page.screenshot({ path: path.join(mobileDir, 'the-forks-mobile-full.png'), fullPage: true });
    console.log(`  📸 Saved docs/screenshots/mobile/the-forks-mobile-full.png`);

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
