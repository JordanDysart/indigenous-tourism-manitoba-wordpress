/**
 * Explore Indigenous for ITM Members Page & Booking Form E2E Test Suite
 *
 * Verifies across Desktop (1280x800), Tablet (768x1024), and Mobile (375x812):
 * - HTTP 200 on /explore-indigenous-for-itm-members/
 * - Canonical migration entry in inc/m2-pages-migration.php with zero .lndo.site hardlinks
 * - Hero H1, hoop overlay, CTAs (#booking-request & /become-a-member/), and public-showcase positioning
 * - Pill badge geometry (9999px) & circular 1:1 icon containers (100%) across all 3 viewports
 * - Member benefit overview cards (4), bookable event-format cards (5), venue hours & guidelines
 * - All content imagery decoded (naturalWidth > 0) with descriptive alt attributes and zero .lndo.site hardlinks
 * - Modular [itm_member_space_booking_form] (.member-booking-form-card):
 *   - Explicit <label> associations & initial aria-invalid="false" accessibility state
 *   - Client-side validation on empty submit (focus routing, aria-invalid="true", visible error feedback)
 *   - Server-side AJAX validation on missing/invalid fields (400) & invalid nonce rejection (403)
 *   - End-to-end AJAX form submission returning visible confirmation message & resetting form fields
 * - Cross-links on /member-benefits/ and /the-forks/ (.ambassador-contact-card)
 * - Zero horizontal overflow across all 3 viewports + full-page screenshots in docs/screenshots/
 */

import { BASE_URL, createBrowser, themeRoot } from './config.js';
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
  console.log(`\n==================================================================`);
  console.log(`📍 Explore Indigenous for ITM Members — E2E Verification Suite`);
  console.log(`==================================================================\n`);

  // ---------------------------------------------------------------------------
  // 0. Static Source Verification (inc/m2-pages-migration.php)
  // ---------------------------------------------------------------------------
  console.log(`--- [Section 0] Canonical Source Entry in inc/m2-pages-migration.php ---`);
  const migrationPath = path.join(themeRoot, 'inc', 'm2-pages-migration.php');
  const migrationSrc = fs.readFileSync(migrationPath, 'utf8');
  const slugMatch = migrationSrc.match(
    /(\d+)\s*=>\s*\[\s*'title'\s*=>\s*'Explore Indigenous for ITM Members',\s*'slug'\s*=>\s*'explore-indigenous-for-itm-members',\s*'content'\s*=>\s*'([\s\S]*?)'\s*,\n\s*\],/m
  );
  assert(!!slugMatch, 'Canonical single-quoted entry found in inc/m2-pages-migration.php', slugMatch ? `Page ID: ${slugMatch[1]}` : '');
  if (slugMatch) {
    const rawPageContent = slugMatch[2];
    assert(!rawPageContent.includes('.lndo.site'), 'Zero .lndo.site URLs in inc/m2-pages-migration.php entry');
    assert(rawPageContent.includes('[itm_member_space_booking_form]'), 'Modular [itm_member_space_booking_form] shortcode embedded in canonical content');
  }

  const browser = await createBrowser();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, ignoreHTTPSErrors: true });

  try {
    // -------------------------------------------------------------------------
    // 1. HTTP Status & Hero Section
    // -------------------------------------------------------------------------
    console.log(`\n--- [Section 1] Page Load, Hero Section & Positioning ---`);
    const response = await page.goto(`${BASE_URL}/explore-indigenous-for-itm-members/`, {
      waitUntil: 'networkidle',
      timeout: 25000,
    });
    assert(response && response.status() === 200, 'HTTP 200 on /explore-indigenous-for-itm-members/', `Status: ${response?.status()}`);

    const heroBlock = await page.$('.hero-block.member-forks-hero');
    assert(!!heroBlock, 'Hero block (.hero-block.member-forks-hero) rendered');

    const h1Text = (await page.textContent('h1'))?.trim() || '';
    assert(h1Text === 'Explore Indigenous for ITM Members', 'Hero H1 matches exact title', h1Text);

    const hasHoop = await page.$('.hero-block-hoop-overlay .hero-hoop-graphic');
    assert(!!hasHoop, 'Brand hoop overlay rendered in hero');

    const primaryCtaHref = await page.$eval('.member-forks-hero a[href="#booking-request"]', el => el.getAttribute('href'));
    assert(primaryCtaHref === '#booking-request', 'Primary hero CTA targets #booking-request', primaryCtaHref);

    const secondaryCtaHref = await page.$eval('.member-forks-hero a[href="/become-a-member/"]', el => el.getAttribute('href'));
    assert(secondaryCtaHref === '/become-a-member/', 'Secondary hero CTA links to /become-a-member/', secondaryCtaHref);

    // Positioning accuracy: public-facing showcase open to visitors, bookable by members
    const mainBodyText = ((await page.textContent('main, #content')) || '').toLowerCase();
    assert(
      mainBodyText.includes('public-facing') && mainBodyText.includes('the forks market') && mainBodyText.includes('member benefit'),
      'Copy clearly communicates public-facing showcase at The Forks Market + ITM member booking benefit'
    );
    assert(
      !mainBodyText.includes('closed to the public') && !mainBodyText.includes('members-only store'),
      'Space is accurately described as open to the public (not closed or members-only)'
    );

    // -------------------------------------------------------------------------
    // 2. Content Sections, Cards, Imagery & Zero .lndo.site Hardlinks
    // -------------------------------------------------------------------------
    console.log(`\n--- [Section 2] Content Sections, Event Formats & Media Assets ---`);
    const valueCards = await page.$$('.member-value-card');
    assert(valueCards.length === 4, '4 Member value-pillar cards rendered in Section 1', `Found: ${valueCards.length}`);

    const formatCards = await page.$$('.event-format-card');
    assert(formatCards.length === 5, '5 Bookable event-format cards rendered in Section 2', `Found: ${formatCards.length}`);

    const formatTitles = await page.$$eval('.event-format-card .format-title', els => els.map(e => e.textContent.trim()));
    assert(
      formatTitles.some(t => t.includes('Workshops')) &&
        formatTitles.some(t => t.includes('Cultural Storytelling')) &&
        formatTitles.some(t => t.includes('Product Launches')) &&
        formatTitles.some(t => t.includes('Operator Pop-Ups')) &&
        formatTitles.some(t => t.includes('Gatherings')),
      'All 5 expected member event format categories present',
      formatTitles.join(' | ')
    );

    const hoursText = ((await page.textContent('.venue-hours-box')) || '').replace(/\s+/g, ' ').trim();
    assert(
      hoursText.includes('Thursday') && hoursText.includes('Sunday') && hoursText.includes('10:00 AM') && hoursText.includes('6:00 PM'),
      'Venue details include standard Thu–Sun 10:00 AM – 6:00 PM public operating hours'
    );

    const prospectiveCard = await page.$('.prospective-member-card');
    assert(!!prospectiveCard, 'Not Yet an ITM Member callout card rendered alongside booking form');

    const prospectiveBecomeLink = await page.$('.prospective-member-card a[href="/become-a-member/"]');
    const prospectiveBenefitsLink = await page.$('.prospective-member-card a[href="/member-benefits/"]');
    assert(!!prospectiveBecomeLink && !!prospectiveBenefitsLink, 'Prospective member card links to /become-a-member/ and /member-benefits/');

    const managerEmailHref = await page.$eval('.space-manager-sidebar-card a[href^="mailto:"]', el => el.getAttribute('href'));
    assert(
      managerEmailHref && managerEmailHref.includes('ambassadormgr@indigenoustourismmanitoba.ca'),
      'Space Manager contact card links to ambassadormgr@indigenoustourismmanitoba.ca',
      managerEmailHref
    );

    // Check zero .lndo.site hardlinks in page content (hero + sections)
    const contentHardlinks = await page.$$eval(
      '.hero-block, .hero-block *, .member-forks-overview-section, .member-forks-overview-section *, .member-forks-formats-section *, .member-forks-guidelines-section *, .member-forks-booking-section *',
      els =>
        els
          .flatMap(el =>
            ['src', 'srcset', 'style'].map(attr => ({
              tag: el.tagName,
              cls: el.className,
              attr,
              val: el.getAttribute(attr) || '',
            }))
          )
          .filter(item => item.val.includes('.lndo.site'))
    );
    assert(
      contentHardlinks.length === 0,
      'Zero .lndo.site hardlinks in raw src, srcset, or style attributes across page sections',
      contentHardlinks.length ? JSON.stringify(contentHardlinks) : 'All root-relative /wp-content/uploads/... paths'
    );

    // -------------------------------------------------------------------------
    // 3. Booking Form Accessibility, Validation & End-to-End AJAX Submission
    // -------------------------------------------------------------------------
    console.log(`\n--- [Section 3] Booking Form Accessibility, Validation & AJAX Submission ---`);
    const formCard = await page.$('#booking-request .member-booking-form-card');
    const bookingForm = await page.$('#itm-space-booking-form');
    assert(!!formCard && !!bookingForm, 'Modular .member-booking-form-card and #itm-space-booking-form present inside #booking-request');

    // Verify accessible <label> associations & initial aria-invalid="false"
    const controlAudit = await page.$$eval(
      '#itm-space-booking-form input:not([type="hidden"]), #itm-space-booking-form select, #itm-space-booking-form textarea',
      controls =>
        controls
          .filter(ctrl => ctrl.name !== 'hp_check')
          .map(ctrl => ({
            name: ctrl.name,
            id: ctrl.id,
            type: ctrl.type,
            hasExplicitLabel: !!(ctrl.labels && ctrl.labels.length > 0 && ctrl.labels[0].textContent.trim().length > 0),
            ariaInvalid: ctrl.getAttribute('aria-invalid'),
          }))
    );

    assert(controlAudit.length >= 9, 'All expected booking form controls rendered', `Controls: ${controlAudit.length}`);
    assert(
      controlAudit.every(c => c.hasExplicitLabel),
      '100% of visible form controls have an explicit non-empty <label>',
      controlAudit.map(c => `${c.name}:${c.hasExplicitLabel}`).join(', ')
    );
    assert(
      controlAudit.every(c => c.ariaInvalid === 'false'),
      'All form controls start with aria-invalid="false" before user interaction'
    );

    // 3a. Client-side validation on empty submit
    await page.click('#itm-space-booking-submit');
    const emptySubmitState = await page.evaluate(() => {
      const feedback = document.querySelector('#itm-space-booking-feedback');
      const businessInput = document.querySelector('#itm_booking_business_name');
      const activeId = document.activeElement ? document.activeElement.id : '';
      const invalidFields = document.querySelectorAll('#itm-space-booking-form .booking-field.is-invalid').length;
      return {
        feedbackVisible: feedback ? feedback.classList.contains('is-visible') && feedback.classList.contains('is-error') : false,
        feedbackText: feedback ? feedback.textContent.trim() : '',
        businessAriaInvalid: businessInput ? businessInput.getAttribute('aria-invalid') : '',
        businessDescribedBy: businessInput ? businessInput.getAttribute('aria-describedby') || '' : '',
        activeId,
        invalidFields,
      };
    });

    assert(
      emptySubmitState.feedbackVisible && emptySubmitState.invalidFields >= 6,
      'Empty submit triggers client-side validation error state without premature network post',
      `Invalid fields: ${emptySubmitState.invalidFields}`
    );
    assert(
      emptySubmitState.businessAriaInvalid === 'true' &&
        emptySubmitState.businessDescribedBy.includes('itm_booking_business_name_error') &&
        emptySubmitState.activeId === 'itm_booking_business_name',
      'Empty submit sets aria-invalid="true", links aria-describedby error ID, and moves focus to first invalid field'
    );

    // 3b. Server-side validation check (invalid email / missing fields & invalid nonce)
    const serverValidationCheck = await page.evaluate(async () => {
      const nonceInput = document.querySelector('[name="itm_space_booking_nonce_field"]');
      const validNonce = nonceInput ? nonceInput.value : '';

      // Test 1: Bad nonce -> 403
      const badNonceBody = new URLSearchParams({
        action: 'itm_space_booking_request',
        nonce: 'invalid_nonce_token',
        business_name: 'Test Org',
      });
      const badNonceRes = await fetch('/wp-admin/admin-ajax.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: badNonceBody.toString(),
      });
      const badNonceJson = await badNonceRes.json();

      // Test 2: Valid nonce, invalid email -> 400
      const badEmailBody = new URLSearchParams({
        action: 'itm_space_booking_request',
        nonce: validNonce,
        business_name: 'Test Indigenous Tours',
        contact_name: 'Alex Keeper',
        email: 'not-an-email',
        membership_status: 'Current ITM Member',
        event_title: 'Workshop Test',
        event_format: 'Workshop / Demonstration',
        preferred_dates: 'May 20, 2027',
        event_description: 'Tables for 12 guests',
      });
      const badEmailRes = await fetch('/wp-admin/admin-ajax.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: badEmailBody.toString(),
      });
      const badEmailJson = await badEmailRes.json();

      return {
        badNonceStatus: badNonceRes.status,
        badNonceSuccess: badNonceJson.success,
        badEmailStatus: badEmailRes.status,
        badEmailSuccess: badEmailJson.success,
        badEmailCode: badEmailJson.data?.code || '',
      };
    });

    assert(
      serverValidationCheck.badNonceStatus === 403 && serverValidationCheck.badNonceSuccess === false,
      'Server-side AJAX rejects invalid nonce with HTTP 403'
    );
    assert(
      serverValidationCheck.badEmailStatus === 400 &&
        serverValidationCheck.badEmailSuccess === false &&
        serverValidationCheck.badEmailCode === 'invalid_email',
      'Server-side AJAX rejects invalid email payload with HTTP 400 (invalid_email)'
    );

    // 3c. End-to-End Valid UI Form Fill & AJAX Submission
    await page.fill('#itm_booking_business_name', 'Northern Lights Cultural Tours (E2E Test)');
    await page.fill('#itm_booking_contact_name', 'Jordan Test Organizer');
    await page.fill('#itm_booking_email', 'e2e-member-test@indigenoustourismmanitoba.ca');
    await page.fill('#itm_booking_phone', '(204) 555-0142');
    await page.check('#itm_booking_membership_status_1');
    await page.fill('#itm_booking_event_title', 'Interactive Birchbark & Storytelling Showcase');
    await page.selectOption('#itm_booking_event_format', 'Workshop / Demonstration');
    await page.fill('#itm_booking_preferred_dates', 'Saturday, June 19, 2027 • 1:00 PM – 4:00 PM');
    await page.fill('#itm_booking_guest_count', '20 guests');
    await page.fill(
      '#itm_booking_event_description',
      'Hands-on public cultural workshop introducing northern Manitoba travel itineraries. Requesting 2 display tables and 12 chairs.'
    );

    const [ajaxResponse] = await Promise.all([
      page.waitForResponse(
        res => res.url().includes('admin-ajax.php') && res.request().method() === 'POST',
        { timeout: 15000 }
      ),
      page.click('#itm-space-booking-submit'),
    ]);

    const ajaxJson = await ajaxResponse.json();
    assert(
      ajaxResponse.status() === 200 && ajaxJson && ajaxJson.success === true,
      'End-to-end AJAX booking request returns HTTP 200 and success: true',
      ajaxJson?.data?.logged_local ? 'Logged cleanly in local dev environment' : 'Delivered via wp_mail'
    );

    await page.waitForSelector('#itm-space-booking-feedback.is-visible.is-success', { timeout: 5000 });
    const postSubmitState = await page.evaluate(() => {
      const feedback = document.querySelector('#itm-space-booking-feedback');
      const businessVal = document.querySelector('#itm_booking_business_name')?.value || '';
      const businessAriaInvalid = document.querySelector('#itm_booking_business_name')?.getAttribute('aria-invalid') || '';
      return {
        feedbackText: feedback ? feedback.textContent.trim() : '',
        ariaLive: feedback ? feedback.getAttribute('aria-live') : '',
        businessVal,
        businessAriaInvalid,
      };
    });

    assert(
      postSubmitState.feedbackText.includes('Miigwech / Thank you!') && postSubmitState.ariaLive === 'polite',
      'Visible polite confirmation message rendered after successful submission',
      postSubmitState.feedbackText.slice(0, 72) + '...'
    );
    assert(
      postSubmitState.businessVal === '' && postSubmitState.businessAriaInvalid === 'false',
      'Form resets cleanly and restores aria-invalid="false" after successful submission'
    );

    // -------------------------------------------------------------------------
    // 4. Cross-Links Verification (/member-benefits/ and /the-forks/)
    // -------------------------------------------------------------------------
    console.log(`\n--- [Section 4] Cross-Link Verification on Related Pages ---`);
    const mbRes = await page.goto(`${BASE_URL}/member-benefits/`, { waitUntil: 'networkidle', timeout: 20000 });
    assert(mbRes && mbRes.status() === 200, 'HTTP 200 on /member-benefits/');
    const mbCrossLink = await page.$(
      '.benefit-card--featured-forks a[href*="/explore-indigenous-for-itm-members/"], a[href*="/explore-indigenous-for-itm-members/"]'
    );
    assert(!!mbCrossLink, '/member-benefits/ features callout linking to /explore-indigenous-for-itm-members/');

    const tfRes = await page.goto(`${BASE_URL}/the-forks/`, { waitUntil: 'networkidle', timeout: 20000 });
    assert(tfRes && tfRes.status() === 200, 'HTTP 200 on /the-forks/');
    const tfCrossLink = await page.$('.ambassador-contact-card a[href*="/explore-indigenous-for-itm-members/"]');
    assert(!!tfCrossLink, '/the-forks/ .ambassador-contact-card includes button linking to /explore-indigenous-for-itm-members/');

    // -------------------------------------------------------------------------
    // 5. Multi-Viewport Geometry, Pill Radius, Image Decode & Overflow Checks
    // -------------------------------------------------------------------------
    console.log(`\n--- [Section 5] Responsive Viewports (1280px, 768px, 375px) & Screenshots ---`);

    const pillSelectors = [
      { selector: '.member-forks-hero-badge', label: '.member-forks-hero-badge', minCount: 1 },
      { selector: '.member-forks-section-badge', label: '.member-forks-section-badge', minCount: 4 },
      { selector: '.format-tag', label: '.format-tag', minCount: 5 },
      { selector: '.venue-badge', label: '.venue-badge', minCount: 1 },
      { selector: '.form-card-badge', label: '.form-card-badge', minCount: 1 },
      { selector: '.prospective-badge', label: '.prospective-badge', minCount: 1 },
    ];

    const circularSelectors = [
      { selector: '.value-card-icon', label: '.value-card-icon', expectedSize: 44 },
      { selector: '.format-icon-wrap', label: '.format-icon-wrap', expectedSize: 52 },
      { selector: '.step-number-circle', label: '.step-number-circle', expectedSize: 36 },
    ];

    const viewports = [
      { name: 'Desktop', key: 'desktop', width: 1280, height: 800 },
      { name: 'Tablet', key: 'tablet', width: 768, height: 1024 },
      { name: 'Mobile', key: 'mobile', width: 375, height: 812 },
    ];

    for (const vp of viewports) {
      console.log(`\n  [Viewport: ${vp.name} (${vp.width}x${vp.height})]`);
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(`${BASE_URL}/explore-indigenous-for-itm-members/`, {
        waitUntil: 'networkidle',
        timeout: 25000,
      });

      // Dismiss third-party Constant Contact popup overlay if injected during headless capture,
      // trigger lazy-loaded images, and wait for decode
      await page.evaluate(async () => {
        document
          .querySelectorAll('.ctct-popup-wrapper, .ctct-popup-overlay, [class*="ctct-popup"]')
          .forEach(el => el.remove());
        const imgs = Array.from(document.querySelectorAll('img'));
        for (const img of imgs) {
          img.loading = 'eager';
          img.scrollIntoView({ block: 'center' });
          if (!img.complete) {
            await new Promise(resolve => {
              img.addEventListener('load', resolve, { once: true });
              img.addEventListener('error', resolve, { once: true });
              setTimeout(resolve, 5000);
            });
          }
          if (typeof img.decode === 'function') {
            await img.decode().catch(() => {});
          }
        }
        window.scrollTo(0, 0);
      });

      const contentImgs = await page.$$eval(
        '.member-forks-overview-section img, .member-forks-booking-section img',
        imgs =>
          imgs.map(img => ({
            src: img.getAttribute('src') || '',
            alt: (img.getAttribute('alt') || '').trim(),
            complete: img.complete,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
          }))
      );

      assert(
        contentImgs.length >= 2 && contentImgs.every(i => i.complete && i.naturalWidth > 0 && i.naturalHeight > 0 && i.alt.length >= 15),
        `${vp.name}: All page content images decoded cleanly with descriptive alt text`,
        contentImgs.map(i => `${i.src.split('/').pop()} [${i.naturalWidth}x${i.naturalHeight}]`).join(', ')
      );

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
            };
          })
        );

        const allPill =
          results.length >= item.minCount &&
          results.every(r => r.borderRadius === '9999px' && r.borderTopLeftRadius === '9999px' && !r.borderRadius.includes('%'));

        assert(
          allPill,
          `${vp.name}: ${item.label} computes to 9999px pill radius (count >= ${item.minCount})`,
          `Found ${results.length}: ${results.map(r => `${r.borderRadius} [${r.width}x${r.height}]`).slice(0, 3).join(', ')}`
        );
      }

      for (const icon of circularSelectors) {
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

        const allCircular =
          iconResults.length > 0 &&
          iconResults.every(
            r => r.borderRadius === '100%' && r.width === icon.expectedSize && r.height === icon.expectedSize
          );

        assert(
          allCircular,
          `${vp.name}: ${icon.label} remains 1:1 circular (${icon.expectedSize}x${icon.expectedSize}, 100%)`,
          iconResults.map(r => `${r.borderRadius} [${r.width}x${r.height}]`).slice(0, 2).join(', ')
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

      if (vp.key === 'desktop') {
        const sideBySide = await page.evaluate(() => {
          const mainEl = document.querySelector('.member-booking-main');
          const sideEl = document.querySelector('.member-booking-sidebar');
          if (!mainEl || !sideEl) return null;
          const m = mainEl.getBoundingClientRect();
          const s = sideEl.getBoundingClientRect();
          return { mainRight: Math.round(m.right), sideLeft: Math.round(s.left), mainTop: Math.round(m.top), sideTop: Math.round(s.top) };
        });
        assert(
          !!sideBySide && sideBySide.sideLeft >= sideBySide.mainRight && Math.abs(sideBySide.mainTop - sideBySide.sideTop) < 20,
          'Desktop: Booking form and Prospective Member sidebar render side-by-side in 2-column grid',
          sideBySide ? `main.right=${sideBySide.mainRight}px, sidebar.left=${sideBySide.sideLeft}px` : ''
        );
      }

      const shotDir = path.resolve(themeRoot, `docs/screenshots/${vp.key}`);
      if (!fs.existsSync(shotDir)) {
        fs.mkdirSync(shotDir, { recursive: true });
      }
      const shotPath = path.join(shotDir, `explore-indigenous-for-itm-members-${vp.key}-full.png`);
      await page.screenshot({ path: shotPath, fullPage: true });
      console.log(`  📸 Saved docs/screenshots/${vp.key}/explore-indigenous-for-itm-members-${vp.key}-full.png`);
    }
  } catch (err) {
    console.error('Fatal error during test execution:', err);
    failedTests++;
  } finally {
    await browser.close();
  }

  console.log(`\n==================================================================`);
  console.log(`📊 Explore Indigenous for ITM Members — Test Summary`);
  console.log(`   Total Tests:  ${totalTests}`);
  console.log(`   Passed Tests: ${passedTests}`);
  console.log(`   Failed Tests: ${failedTests}`);
  console.log(`==================================================================\n`);

  if (failedTests > 0) {
    process.exit(1);
  }
}

runTests();
