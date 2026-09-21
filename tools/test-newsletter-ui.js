/**
 * Test Newsletter UI and AJAX integration (Desktop and Mobile)
 */
import { BASE_URL, createBrowser } from './config.js';

async function testNewsletterForm() {
  console.log('\n======================================================');
  console.log('📬 Testing Footer Newsletter Bar on:', BASE_URL);
  console.log('======================================================\n');

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
    // 1. Desktop Test
    const context = await browser.newContext({
      ignoreHTTPSErrors: true,
      viewport: { width: 1280, height: 900 }
    });
    const page = await context.newPage();

    console.log('Navigating to Home Page (Desktop)...');
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });

    const bar = await page.$('.site-footer__newsletter-bar');
    if (!bar) {
      throw new Error('Newsletter bar .site-footer__newsletter-bar not found in footer!');
    }
    console.log('✅ Newsletter bar found in footer.');

    const title = await page.$eval('.site-footer__newsletter-title', el => el.textContent.trim());
    console.log('✅ Newsletter title:', title);

    const emailInput = await page.$('#itm-newsletter-email');
    const submitBtn = await page.$('#itm-newsletter-submit');
    if (!emailInput || !submitBtn) {
      throw new Error('Email input or submit button not found!');
    }

    // Test empty submission
    await submitBtn.click();
    await page.waitForTimeout(400);
    const errorFeedback = await page.$eval('#itm-newsletter-feedback', el => el.textContent.trim());
    console.log('✅ Invalid submit feedback:', errorFeedback);

    // Test valid AJAX submission
    await emailInput.fill('newsletter_desktop@indigenoustourismmanitoba.ca');
    await submitBtn.click();
    await page.waitForSelector('#itm-newsletter-feedback.is-success', { timeout: 10000 });
    const successFeedback = await page.$eval('#itm-newsletter-feedback', el => el.textContent.trim());
    console.log('✅ Valid submit feedback:', successFeedback);

    // Screenshot desktop footer
    const footerElement = await page.$('.site-footer');
    if (footerElement) {
      await footerElement.screenshot({ path: 'docs/screenshots/footer-newsletter-desktop.png' });
      console.log('✅ Desktop screenshot saved to docs/screenshots/footer-newsletter-desktop.png');
    }
    await context.close();

    // 2. Mobile Test (375px)
    const mobileContext = await browser.newContext({
      ignoreHTTPSErrors: true,
      viewport: { width: 375, height: 812 },
      isMobile: true,
    });
    const mobilePage = await mobileContext.newPage();
    console.log('Navigating to Home Page (Mobile 375px)...');
    await mobilePage.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });

    const mobileInput = await mobilePage.$('#itm-newsletter-email');
    const mobileSubmit = await mobilePage.$('#itm-newsletter-submit');
    await mobileInput.fill('newsletter_mobile@indigenoustourismmanitoba.ca');
    await mobileSubmit.click();
    await mobilePage.waitForSelector('#itm-newsletter-feedback.is-success', { timeout: 10000 });

    const mobileFooter = await mobilePage.$('.site-footer');
    if (mobileFooter) {
      await mobileFooter.screenshot({ path: 'docs/screenshots/footer-newsletter-mobile.png' });
      console.log('✅ Mobile screenshot saved to docs/screenshots/footer-newsletter-mobile.png');
    }
    await mobileContext.close();

    console.log('\n🎉 ALL DESKTOP & MOBILE NEWSLETTER TESTS PASSED SUCCESSFULLY!\n');
  } catch (err) {
    console.error('❌ Test failed:', err);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

testNewsletterForm();
