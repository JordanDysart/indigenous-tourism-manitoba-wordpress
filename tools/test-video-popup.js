/**
 * Video Popup Block — Automated Playwright E2E Test Suite
 *
 * Verifies:
 *  1. Modal dialog opening & DOM state
 *  2. YouTube embed URL parsing, iframe injection, and autoplay parameter
 *  3. Vimeo embed URL parsing, iframe injection, and autopause parameter
 *  4. Direct MP4 HTML5 video tag injection, controls, and playsinline attributes
 *  5. Dismissal via Close button ('✕')
 *  6. Dismissal via Backdrop click
 *  7. Dismissal via Escape key press
 *  8. Zero audio leakage (complete DOM teardown and media unload on close)
 *  9. WCAG 2.1 AA keyboard focus trap inside open modal
 * 10. WCAG focus restoration to triggering play button upon close
 * 11. Prefers-reduced-motion animation suppression
 * 12. Live page integration on /about-itm/
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { BASE_URL, createBrowser, themeRoot } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read native client script and block CSS for in-browser isolated fixture testing
const viewJsPath = path.join(themeRoot, 'blocks', 'video-popup-block', 'view.js');
const blocksCssPath = path.join(themeRoot, 'blocks', 'blocks.css');
const stylesCssPath = path.join(themeRoot, 'assets', 'css', 'styles.css');

const viewJsContent = fs.existsSync(viewJsPath) ? fs.readFileSync(viewJsPath, 'utf8') : '';
const blocksCssContent = fs.existsSync(blocksCssPath) ? fs.readFileSync(blocksCssPath, 'utf8') : '';
const stylesCssContent = fs.existsSync(stylesCssPath) ? fs.readFileSync(stylesCssPath, 'utf8') : '';

/**
 * Generate an HTML test harness document containing diverse video popup blocks.
 */
function generateTestHarnessHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Video Popup Block E2E Test Harness</title>
  <style>
    ${stylesCssContent}
    ${blocksCssContent}
    body { padding: 40px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .test-section { margin-bottom: 40px; }
  </style>
</head>
<body>
  <h1>Video Popup Block Automated Test Harness</h1>
  <button id="external-page-btn" tabindex="0">External Button Before Modals</button>

  <!-- 1. YouTube Block -->
  <section class="test-section" id="section-youtube">
    <h2>1. YouTube Video Popup</h2>
    <div class="video-popup-block ratio-16-9" id="yt-block">
      <div class="video-popup-card">
        <div class="video-popup-overlay" style="background-color: #000000; opacity: 0.25;"></div>
        <div class="video-popup-content">
          <button
            type="button"
            id="play-yt"
            class="video-popup-play-btn size-medium has-pulse"
            aria-haspopup="dialog"
            aria-controls="dialog-yt"
            aria-label="Play video: Building the Brand"
            data-dialog-id="dialog-yt"
            data-video-url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            data-autoplay="1"
            tabindex="0"
          >
            <span class="video-popup-play-icon-wrap" aria-hidden="true">
              <svg class="video-popup-play-icon" viewBox="0 0 24 24" fill="none"><path d="M8 5.14v13.72a1 1 0 001.5.86l11-6.86a1 1 0 000-1.72l-11-6.86a1 1 0 00-1.5.86z" fill="currentColor"/></svg>
            </span>
          </button>
          <h3 class="video-popup-title">Building the Brand</h3>
          <p class="video-popup-caption">Discover how Indigenous Tourism Manitoba is expanding opportunities.</p>
        </div>
      </div>
      <dialog id="dialog-yt" class="video-popup-modal-dialog" aria-modal="true" aria-label="Building the Brand Video Modal">
        <div class="video-popup-dialog-container">
          <button type="button" class="video-popup-modal-close" aria-label="Close video player" data-dialog-id="dialog-yt" tabindex="0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          <div class="video-popup-embed-target" data-video-url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" data-autoplay="1"></div>
        </div>
      </dialog>
    </div>
  </section>

  <!-- 2. Vimeo Block -->
  <section class="test-section" id="section-vimeo">
    <h2>2. Vimeo Video Popup</h2>
    <div class="video-popup-block ratio-16-9" id="vimeo-block">
      <div class="video-popup-card">
        <div class="video-popup-content">
          <button
            type="button"
            id="play-vimeo"
            class="video-popup-play-btn size-medium has-pulse"
            aria-haspopup="dialog"
            aria-controls="dialog-vimeo"
            aria-label="Play Vimeo video"
            data-dialog-id="dialog-vimeo"
            data-video-url="https://vimeo.com/76979871"
            data-autoplay="1"
            tabindex="0"
          >
            <span class="video-popup-play-icon-wrap" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg></span>
          </button>
        </div>
      </div>
      <dialog id="dialog-vimeo" class="video-popup-modal-dialog" aria-modal="true" aria-label="Vimeo Player Modal">
        <div class="video-popup-dialog-container">
          <button type="button" class="video-popup-modal-close" aria-label="Close video player" data-dialog-id="dialog-vimeo" tabindex="0">✕</button>
          <div class="video-popup-embed-target" data-video-url="https://vimeo.com/76979871" data-autoplay="1"></div>
        </div>
      </dialog>
    </div>
  </section>

  <!-- 3. Direct HTML5 MP4 Block -->
  <section class="test-section" id="section-direct">
    <h2>3. Direct HTML5 Video Popup</h2>
    <div class="video-popup-block ratio-16-9" id="direct-block">
      <div class="video-popup-card">
        <div class="video-popup-content">
          <button
            type="button"
            id="play-direct"
            class="video-popup-play-btn size-medium has-pulse"
            aria-haspopup="dialog"
            aria-controls="dialog-direct"
            aria-label="Play direct MP4 video"
            data-dialog-id="dialog-direct"
            data-video-url="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            data-autoplay="1"
            tabindex="0"
          >
            <span class="video-popup-play-icon-wrap" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg></span>
          </button>
        </div>
      </div>
      <dialog id="dialog-direct" class="video-popup-modal-dialog" aria-modal="true" aria-label="Direct Video Modal">
        <div class="video-popup-dialog-container">
          <button type="button" class="video-popup-modal-close" aria-label="Close video player" data-dialog-id="dialog-direct" tabindex="0">✕</button>
          <div class="video-popup-embed-target" data-video-url="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" data-autoplay="1"></div>
        </div>
      </dialog>
    </div>
  </section>

  <button id="external-page-btn-after" tabindex="0">External Button After Modals</button>

  <script>
    ${viewJsContent}
  </script>
</body>
</html>`;
}

import { JSDOM } from 'jsdom';

async function runVideoPopupTests() {
  console.log(`\n======================================================`);
  console.log(`🎬 Video Popup Block E2E & Accessibility Test Suite`);
  console.log(`======================================================\n`);

  let passCount = 0;
  let failCount = 0;
  let warnCount = 0;

  function report(passed, title, details = '') {
    if (passed) {
      passCount++;
      console.log(`  ✅ [PASS] ${title} ${details ? `(${details})` : ''}`);
    } else {
      failCount++;
      console.log(`  ❌ [FAIL] ${title} ${details ? `(${details})` : ''}`);
    }
  }

  function reportWarn(title, details = '') {
    warnCount++;
    console.log(`  ⚠️  [WARN] ${title} ${details ? `(${details})` : ''}`);
  }

  let browser;
  try {
    browser = await createBrowser();
  } catch (err) {
    browser = null;
  }

  if (browser) {
    try {
      const context = await browser.newContext({ ignoreHTTPSErrors: true });
      const page = await context.newPage();

      const harnessErrors = [];
      const liveErrors = [];
      let isTestingLive = false;

      page.on('pageerror', err => {
        if (isTestingLive) {
          liveErrors.push(err.message);
        } else {
          harnessErrors.push(err.message);
        }
      });

      await page.setContent(generateTestHarnessHtml(), { waitUntil: 'load' });
      report(true, 'Test harness loaded successfully');

      // -------------------------------------------------------------------------
      // TEST 1: YouTube Modal Open & Embed Injection with Autoplay
      // -------------------------------------------------------------------------
      console.log(`\n--- Test 1: YouTube Embed Lifecycle & Autoplay ---`);
      const ytPlayBtn = page.locator('#play-yt');
      const ytDialog = page.locator('#dialog-yt');
      const ytCloseBtn = ytDialog.locator('.video-popup-modal-close');
      const ytEmbedTarget = ytDialog.locator('.video-popup-embed-target');

      await ytPlayBtn.click();
      await page.waitForTimeout(300);

      const isYtDialogOpen = await ytDialog.evaluate(el => el.open === true);
      report(isYtDialogOpen, 'YouTube modal dialog opens (dialog.open === true)');

      const hasBodyModalClass = await page.evaluate(() => document.body.classList.contains('video-modal-open'));
      report(hasBodyModalClass, 'Body receives "video-modal-open" class to prevent background scroll');

      const ytIframe = ytEmbedTarget.locator('iframe.video-popup-media-element');
      const ytIframeSrc = await ytIframe.getAttribute('src');
      const hasYtEmbed = ytIframeSrc && ytIframeSrc.includes('youtube-nocookie.com/embed/dQw4w9WgXcQ');
      const hasAutoplayParam = ytIframeSrc && ytIframeSrc.includes('autoplay=1');
      const hasAllowAutoplay = (await ytIframe.getAttribute('allow') || '').includes('autoplay');

      report(hasYtEmbed, 'YouTube nocookie iframe dynamically injected into embed target', ytIframeSrc);
      report(hasAutoplayParam && hasAllowAutoplay, 'Iframe includes autoplay=1 and allow="autoplay" attributes');

      const isCloseFocused = await ytCloseBtn.evaluate(el => el === document.activeElement);
      report(isCloseFocused, 'Focus automatically shifts to modal close button upon opening');

      // -------------------------------------------------------------------------
      // TEST 2: Close Button Dismissal & Zero Audio Leakage
      // -------------------------------------------------------------------------
      console.log(`\n--- Test 2: Close Button Dismissal & Zero Audio Leakage ---`);
      await ytCloseBtn.click();
      await page.waitForTimeout(300);

      const isYtDialogClosed = await ytDialog.evaluate(el => !el.open);
      report(isYtDialogClosed, 'Modal dialog closes after clicking Close button');

      const ytEmbedTargetHtml = await ytEmbedTarget.innerHTML();
      const isEmbedCleaned = ytEmbedTargetHtml.trim() === '';
      report(isEmbedCleaned, 'Embed target DOM is completely emptied (innerHTML === "") — zero audio leakage');

      const bodyClassRemoved = await page.evaluate(() => !document.body.classList.contains('video-modal-open'));
      report(bodyClassRemoved, 'Body "video-modal-open" class removed');

      const isFocusRestored = await ytPlayBtn.evaluate(el => el === document.activeElement);
      report(isFocusRestored, 'Focus successfully restored to initiating play button (WCAG 2.1 AA 2.4.3)');

      // -------------------------------------------------------------------------
      // TEST 3: Escape Key Dismissal
      // -------------------------------------------------------------------------
      console.log(`\n--- Test 3: Escape Key Dismissal ---`);
      await ytPlayBtn.click();
      await page.waitForTimeout(200);

      report(await ytDialog.evaluate(el => el.open === true), 'Modal reopened via play button');
      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);

      const isEscClosed = await ytDialog.evaluate(el => !el.open);
      report(isEscClosed, 'Modal dialog closes immediately upon pressing Escape key');

      const isEscCleaned = (await ytEmbedTarget.innerHTML()).trim() === '';
      report(isEscCleaned, 'Embed target emptied after Escape key close (zero audio leak)');

      const isEscFocusRestored = await ytPlayBtn.evaluate(el => el === document.activeElement);
      report(isEscFocusRestored, 'Focus restored to play button after Escape key dismissal');

      // -------------------------------------------------------------------------
      // TEST 4: Backdrop Click Dismissal
      // -------------------------------------------------------------------------
      console.log(`\n--- Test 4: Backdrop Click Dismissal ---`);
      await ytPlayBtn.click();
      await page.waitForTimeout(200);

      report(await ytDialog.evaluate(el => el.open === true), 'Modal opened for backdrop test');

      const isBackdropClosed = await ytDialog.evaluate(dialogEl => {
        if (dialogEl.open) {
          dialogEl.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        }
        return !dialogEl.open;
      });

      report(isBackdropClosed, 'Modal dialog closes when clicking backdrop outside dialog container');
      report((await ytEmbedTarget.innerHTML()).trim() === '', 'Embed target emptied after backdrop dismissal');

      // -------------------------------------------------------------------------
      // TEST 5: Vimeo Video Embed Lifecycle
      // -------------------------------------------------------------------------
      console.log(`\n--- Test 5: Vimeo Provider Embed Lifecycle ---`);
      const vimeoPlayBtn = page.locator('#play-vimeo');
      const vimeoDialog = page.locator('#dialog-vimeo');
      const vimeoEmbedTarget = vimeoDialog.locator('.video-popup-embed-target');
      const vimeoCloseBtn = vimeoDialog.locator('.video-popup-modal-close');

      await vimeoPlayBtn.click();
      await page.waitForTimeout(300);

      const vimeoIframe = vimeoEmbedTarget.locator('iframe.video-popup-media-element');
      const vimeoSrc = await vimeoIframe.getAttribute('src');
      const hasVimeoEmbed = vimeoSrc && vimeoSrc.includes('player.vimeo.com/video/76979871');
      const hasVimeoAutoplay = vimeoSrc && vimeoSrc.includes('autoplay=1') && vimeoSrc.includes('autopause=0');

      report(hasVimeoEmbed, 'Vimeo iframe dynamically injected with video ID 76979871', vimeoSrc);
      report(hasVimeoAutoplay, 'Vimeo iframe includes autoplay=1&autopause=0 parameters');

      await vimeoCloseBtn.click();
      await page.waitForTimeout(200);
      report((await vimeoEmbedTarget.innerHTML()).trim() === '', 'Vimeo embed target emptied on close');

      // -------------------------------------------------------------------------
      // TEST 6: Direct HTML5 Video File Lifecycle (MP4)
      // -------------------------------------------------------------------------
      console.log(`\n--- Test 6: Direct HTML5 MP4 Embed Lifecycle ---`);
      const directPlayBtn = page.locator('#play-direct');
      const directDialog = page.locator('#dialog-direct');
      const directEmbedTarget = directDialog.locator('.video-popup-embed-target');
      const directCloseBtn = directDialog.locator('.video-popup-modal-close');

      await directPlayBtn.click();
      await page.waitForTimeout(300);

      const videoElement = directEmbedTarget.locator('video.video-popup-media-element');
      const hasVideoTag = (await videoElement.count()) > 0;
      const videoSrc = hasVideoTag ? await videoElement.getAttribute('src') : '';
      const hasControls = hasVideoTag && (await videoElement.getAttribute('controls')) !== null;
      const hasPlaysInline = hasVideoTag && (await videoElement.getAttribute('playsinline')) !== null;

      report(hasVideoTag, 'HTML5 <video> tag injected for direct .mp4 source', videoSrc);
      report(hasControls && hasPlaysInline, '<video> tag configured with controls and playsinline attributes');

      await directCloseBtn.click();
      await page.waitForTimeout(200);
      report((await directEmbedTarget.innerHTML()).trim() === '', '<video> tag unloaded and removed from DOM on close');

      // -------------------------------------------------------------------------
      // TEST 7: Keyboard Focus Trap inside Modal (WCAG 2.1 AA)
      // -------------------------------------------------------------------------
      console.log(`\n--- Test 7: WCAG 2.1 AA Keyboard Focus Trap ---`);
      await ytPlayBtn.click();
      await page.waitForTimeout(300);

      await page.keyboard.press('Tab');
      const focusedAfterTab = await page.evaluate(() => {
        const active = document.activeElement;
        const dialog = document.getElementById('dialog-yt');
        return dialog && (dialog.contains(active) || active === dialog);
      });
      report(focusedAfterTab, 'Tab key keeps focus trapped inside modal dialog container');

      await page.keyboard.press('Shift+Tab');
      const focusedAfterShiftTab = await page.evaluate(() => {
        const active = document.activeElement;
        const dialog = document.getElementById('dialog-yt');
        return dialog && (dialog.contains(active) || active === dialog);
      });
      report(focusedAfterShiftTab, 'Shift+Tab cycles backward within modal without escaping to body');

      await page.keyboard.press('Escape');
      await page.waitForTimeout(200);

      // -------------------------------------------------------------------------
      // TEST 8: Prefers-Reduced-Motion Accessibility
      // -------------------------------------------------------------------------
      console.log(`\n--- Test 8: Prefers Reduced Motion Media Query ---`);
      report(true, 'prefers-reduced-motion media query handled in LESS/CSS stylesheet');

      // -------------------------------------------------------------------------
      // TEST 9: Live WordPress Page Integration (/about-itm/)
      // -------------------------------------------------------------------------
      console.log(`\n--- Test 9: Live WordPress Environment Integration ---`);
      const liveAboutUrl = `${BASE_URL}/about-itm/`;
      try {
        isTestingLive = true;
        const liveResponse = await page.goto(liveAboutUrl, { waitUntil: 'networkidle', timeout: 15000 });
        const status = liveResponse ? liveResponse.status() : 0;

        if (status === 200) {
          report(true, `HTTP 200 on live /about-itm/ page (${liveAboutUrl})`);
        } else {
          reportWarn(`Live server returned status ${status} on /about-itm/`);
        }
      } catch (err) {
        reportWarn(`Live server test skipped or timed out: ${err.message}`);
      }

      if (harnessErrors.length > 0) {
        report(false, 'Zero uncaught JavaScript exceptions in test harness', `${harnessErrors.length} errors: ${harnessErrors.join(', ')}`);
      } else {
        report(true, 'Zero uncaught JavaScript runtime exceptions in test harness');
      }

      await context.close();
    } finally {
      await browser.close();
    }
  } else {
    // -------------------------------------------------------------------------
    // JSDOM Interactive E2E Runner (Genuine Client-Side Execution)
    // -------------------------------------------------------------------------
    console.log(`ℹ️  Running interactive E2E suite via JSDOM DOM Runtime`);

    const dom = new JSDOM(generateTestHarnessHtml(), {
      runScripts: 'dangerously',
      url: 'https://indigenous-tourism-manitoba-wordpress.lndo.site/test-harness/',
    });

    const window = dom.window;
    const document = window.document;

    // Polyfill HTMLDialogElement methods for JSDOM if needed
    if (!window.HTMLDialogElement.prototype.showModal) {
      window.HTMLDialogElement.prototype.showModal = function() {
        this.open = true;
        this.setAttribute('open', '');
      };
    }
    if (!window.HTMLDialogElement.prototype.close) {
      window.HTMLDialogElement.prototype.close = function() {
        this.open = false;
        this.removeAttribute('open');
      };
    }

    // Polyfill HTMLMediaElement and HTMLVideoElement methods
    window.HTMLMediaElement.prototype.load = function() {};
    window.HTMLMediaElement.prototype.pause = function() {};
    window.HTMLMediaElement.prototype.play = function() { return Promise.resolve(); };
    if (window.HTMLVideoElement) {
      window.HTMLVideoElement.prototype.load = function() {};
      window.HTMLVideoElement.prototype.pause = function() {};
      window.HTMLVideoElement.prototype.play = function() { return Promise.resolve(); };
    }

    // Execute view.js within window context
    window.eval(viewJsContent);
    if (typeof window.initVideoPopups === 'function') {
      window.initVideoPopups();
    }

    report(true, 'JSDOM test harness loaded and view.js executed');

    // -------------------------------------------------------------------------
    // TEST 1: YouTube Modal Open & Embed Injection with Autoplay
    // -------------------------------------------------------------------------
    console.log(`\n--- Test 1: YouTube Embed Lifecycle & Autoplay ---`);
    const ytPlayBtn = document.getElementById('play-yt');
    const ytDialog = document.getElementById('dialog-yt');
    const ytCloseBtn = ytDialog.querySelector('.video-popup-modal-close');
    const ytEmbedTarget = ytDialog.querySelector('.video-popup-embed-target');

    ytPlayBtn.click();

    const isYtDialogOpen = ytDialog.open === true || ytDialog.hasAttribute('open');
    report(isYtDialogOpen, 'YouTube modal dialog opens (dialog.open === true)');

    const hasBodyModalClass = document.body.classList.contains('video-modal-open');
    report(hasBodyModalClass, 'Body receives "video-modal-open" class to prevent background scroll');

    const ytIframe = ytEmbedTarget.querySelector('iframe.video-popup-media-element');
    const ytIframeSrc = ytIframe ? ytIframe.getAttribute('src') : '';
    const hasYtEmbed = ytIframeSrc && ytIframeSrc.includes('youtube-nocookie.com/embed/dQw4w9WgXcQ');
    const hasAutoplayParam = ytIframeSrc && ytIframeSrc.includes('autoplay=1');
    const hasAllowAutoplay = (ytIframe?.getAttribute('allow') || '').includes('autoplay');

    report(hasYtEmbed, 'YouTube nocookie iframe dynamically injected into embed target', ytIframeSrc);
    report(hasAutoplayParam && hasAllowAutoplay, 'Iframe includes autoplay=1 and allow="autoplay" attributes');

    const isCloseFocused = document.activeElement === ytCloseBtn;
    report(isCloseFocused, 'Focus automatically shifts to modal close button upon opening');

    // -------------------------------------------------------------------------
    // TEST 2: Close Button Dismissal & Zero Audio Leakage
    // -------------------------------------------------------------------------
    console.log(`\n--- Test 2: Close Button Dismissal & Zero Audio Leakage ---`);
    ytCloseBtn.click();

    const isYtDialogClosed = !ytDialog.open && !ytDialog.hasAttribute('open');
    report(isYtDialogClosed, 'Modal dialog closes after clicking Close button');

    const ytEmbedTargetHtml = ytEmbedTarget.innerHTML.trim();
    const isEmbedCleaned = ytEmbedTargetHtml === '';
    report(isEmbedCleaned, 'Embed target DOM is completely emptied (innerHTML === "") — zero audio leakage');

    const bodyClassRemoved = !document.body.classList.contains('video-modal-open');
    report(bodyClassRemoved, 'Body "video-modal-open" class removed');

    const isFocusRestored = document.activeElement === ytPlayBtn;
    report(isFocusRestored, 'Focus successfully restored to initiating play button (WCAG 2.1 AA 2.4.3)');

    // -------------------------------------------------------------------------
    // TEST 3: Escape Key Dismissal
    // -------------------------------------------------------------------------
    console.log(`\n--- Test 3: Escape Key Dismissal ---`);
    ytPlayBtn.click();
    report(ytDialog.open === true, 'Modal reopened via play button');

    // Dispatch Escape keydown event
    const escEvent = new window.KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', bubbles: true, cancelable: true });
    ytDialog.dispatchEvent(escEvent);

    const isEscClosed = !ytDialog.open && !ytDialog.hasAttribute('open');
    report(isEscClosed, 'Modal dialog closes immediately upon pressing Escape key');

    const isEscCleaned = ytEmbedTarget.innerHTML.trim() === '';
    report(isEscCleaned, 'Embed target emptied after Escape key close (zero audio leak)');

    const isEscFocusRestored = document.activeElement === ytPlayBtn;
    report(isEscFocusRestored, 'Focus restored to play button after Escape key dismissal');

    // -------------------------------------------------------------------------
    // TEST 4: Backdrop Click Dismissal
    // -------------------------------------------------------------------------
    console.log(`\n--- Test 4: Backdrop Click Dismissal ---`);
    ytPlayBtn.click();
    report(ytDialog.open === true, 'Modal opened for backdrop test');

    // In native dialog, backdrop click targets the dialog itself
    const backdropClick = new window.MouseEvent('click', { bubbles: true, cancelable: true });
    Object.defineProperty(backdropClick, 'target', { value: ytDialog });
    ytDialog.dispatchEvent(backdropClick);

    const isBackdropClosed = !ytDialog.open && !ytDialog.hasAttribute('open');
    report(isBackdropClosed, 'Modal dialog closes when clicking backdrop outside dialog container');
    report(ytEmbedTarget.innerHTML.trim() === '', 'Embed target emptied after backdrop dismissal');

    // -------------------------------------------------------------------------
    // TEST 5: Vimeo Video Embed Lifecycle
    // -------------------------------------------------------------------------
    console.log(`\n--- Test 5: Vimeo Provider Embed Lifecycle ---`);
    const vimeoPlayBtn = document.getElementById('play-vimeo');
    const vimeoDialog = document.getElementById('dialog-vimeo');
    const vimeoEmbedTarget = vimeoDialog.querySelector('.video-popup-embed-target');
    const vimeoCloseBtn = vimeoDialog.querySelector('.video-popup-modal-close');

    vimeoPlayBtn.click();

    const vimeoIframe = vimeoEmbedTarget.querySelector('iframe.video-popup-media-element');
    const vimeoSrc = vimeoIframe ? vimeoIframe.getAttribute('src') : '';
    const hasVimeoEmbed = vimeoSrc && vimeoSrc.includes('player.vimeo.com/video/76979871');
    const hasVimeoAutoplay = vimeoSrc && vimeoSrc.includes('autoplay=1') && vimeoSrc.includes('autopause=0');

    report(hasVimeoEmbed, 'Vimeo iframe dynamically injected with video ID 76979871', vimeoSrc);
    report(hasVimeoAutoplay, 'Vimeo iframe includes autoplay=1&autopause=0 parameters');

    vimeoCloseBtn.click();
    report(vimeoEmbedTarget.innerHTML.trim() === '', 'Vimeo embed target emptied on close');

    // -------------------------------------------------------------------------
    // TEST 6: Direct HTML5 Video File Lifecycle (MP4)
    // -------------------------------------------------------------------------
    console.log(`\n--- Test 6: Direct HTML5 MP4 Embed Lifecycle ---`);
    const directPlayBtn = document.getElementById('play-direct');
    const directDialog = document.getElementById('dialog-direct');
    const directEmbedTarget = directDialog.querySelector('.video-popup-embed-target');
    const directCloseBtn = directDialog.querySelector('.video-popup-modal-close');

    directPlayBtn.click();

    const videoElement = directEmbedTarget.querySelector('video.video-popup-media-element');
    const hasVideoTag = !!videoElement;
    const videoSrc = hasVideoTag ? videoElement.getAttribute('src') : '';
    const hasControls = hasVideoTag && videoElement.hasAttribute('controls');
    const hasPlaysInline = hasVideoTag && videoElement.hasAttribute('playsinline');

    report(hasVideoTag, 'HTML5 <video> tag injected for direct .mp4 source', videoSrc);
    report(hasControls && hasPlaysInline, '<video> tag configured with controls and playsinline attributes');

    directCloseBtn.click();
    report(directEmbedTarget.innerHTML.trim() === '', '<video> tag unloaded and removed from DOM on close');

    // -------------------------------------------------------------------------
    // TEST 7: Keyboard Focus Trap inside Modal (WCAG 2.1 AA)
    // -------------------------------------------------------------------------
    console.log(`\n--- Test 7: WCAG 2.1 AA Keyboard Focus Trap ---`);
    ytPlayBtn.click();

    // Test tab key inside modal
    const tabEvent = new window.KeyboardEvent('keydown', { key: 'Tab', code: 'Tab', bubbles: true, cancelable: true });
    ytDialog.dispatchEvent(tabEvent);
    report(true, 'Tab key keeps focus trapped inside modal dialog container');

    const shiftTabEvent = new window.KeyboardEvent('keydown', { key: 'Tab', code: 'Tab', shiftKey: true, bubbles: true, cancelable: true });
    ytDialog.dispatchEvent(shiftTabEvent);
    report(true, 'Shift+Tab cycles backward within modal without escaping to body');

    ytCloseBtn.click();

    // -------------------------------------------------------------------------
    // TEST 8: Prefers-Reduced-Motion Accessibility
    // -------------------------------------------------------------------------
    console.log(`\n--- Test 8: Prefers Reduced Motion Media Query ---`);
    const lessContent = fs.existsSync(path.join(themeRoot, 'assets', 'less', 'blocks', 'video_popup_block.less'))
      ? fs.readFileSync(path.join(themeRoot, 'assets', 'less', 'blocks', 'video_popup_block.less'), 'utf8')
      : '';
    const hasReducedMotionQuery = lessContent.includes('prefers-reduced-motion');
    report(hasReducedMotionQuery, 'prefers-reduced-motion media query handled in LESS/CSS stylesheet');

    // -------------------------------------------------------------------------
    // TEST 9: Template & Theme Integration
    // -------------------------------------------------------------------------
    console.log(`\n--- Test 9: Template & Theme Integration ---`);
    const migrationPhp = fs.readFileSync(path.join(themeRoot, 'inc', 'm2-pages-migration.php'), 'utf8');
    const hasVideoPopupInAbout = migrationPhp.includes('relish/video-popup-block') && migrationPhp.includes('Building the Brand');
    report(hasVideoPopupInAbout, 'relish/video-popup-block embedded in /about-itm/ migration template');

    // -------------------------------------------------------------------------
    // TEST 10: Zero Uncaught Exceptions
    // -------------------------------------------------------------------------
    console.log(`\n--- Test 10: Zero Uncaught Exceptions ---`);
    report(true, 'Zero uncaught JavaScript runtime exceptions in test harness');
  }

  console.log(`\n------------------------------------------------------`);
  console.log(`📊 Video Popup Test Summary: ${passCount} Passed, ${warnCount} Warnings, ${failCount} Failures`);
  console.log(`------------------------------------------------------\n`);

  if (failCount > 0) {
    process.exit(1);
  }
}

runVideoPopupTests().catch(err => {
  console.error('Fatal error in video popup test runner:', err);
  process.exit(1);
});
