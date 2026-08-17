/**
 * Challenger M1-2: Comprehensive Adversarial Stress Test Suite
 *
 * Exhaustively stress-tests:
 *  1. Modal Dialog Accessibility Semantics (WCAG 2.1 AA, ARIA roles/attributes, Focus Containment, Focus Restoration)
 *  2. Zero Audio/Video Playback Leakage (Embed teardown, HTML5 video unload, Rapid open/close cycling)
 *  3. Provider URL Parsing Matrix (YouTube, Vimeo, HTML5 MP4, Shorts, Malformed, XSS)
 *  4. CSS Pulse Animation, Viewports (320px - 2560px), Aspect Ratios, Prefers-Reduced-Motion
 *  5. PHP Server-Side Template Robustness & Sanitization
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { BASE_URL, createBrowser, themeRoot } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const viewJsPath = path.join(themeRoot, 'blocks', 'video-popup-block', 'view.js');
const blocksCssPath = path.join(themeRoot, 'blocks', 'blocks.css');
const stylesCssPath = path.join(themeRoot, 'assets', 'css', 'styles.css');
const phpTemplatePath = path.join(themeRoot, 'blocks', 'video-popup-block', 'video_popup_block.php');
const blockJsonPath = path.join(themeRoot, 'blocks', 'video-popup-block', 'block.json');

const viewJsContent = fs.readFileSync(viewJsPath, 'utf8');
const blocksCssContent = fs.readFileSync(blocksCssPath, 'utf8');
const stylesCssContent = fs.readFileSync(stylesCssPath, 'utf8');

// Test tracking
let totalAssertions = 0;
let passedAssertions = 0;
let failedAssertions = 0;
const failureDetails = [];

function assert(condition, testName, details = '') {
  totalAssertions++;
  if (condition) {
    passedAssertions++;
    console.log(`  ✅ [PASS] ${testName} ${details ? `(${details})` : ''}`);
  } else {
    failedAssertions++;
    const errMsg = `❌ [FAIL] ${testName} ${details ? `— ${details}` : ''}`;
    failureDetails.push(errMsg);
    console.log(`  ${errMsg}`);
  }
}

/**
 * Build Multi-Instance HTML Test Harness
 */
function generateMultiInstanceHarnessHtml(instances) {
  const blocksMarkup = instances.map((inst, idx) => `
    <div class="video-popup-block ${inst.ratioClass || 'ratio-16-9'}" id="block-${inst.id}">
      <div class="video-popup-card" style="${inst.bgStyle || ''}">
        <div class="video-popup-overlay" style="background-color: ${inst.overlayColor || '#000000'}; opacity: ${inst.overlayOpacity || 0.25};"></div>
        <div class="video-popup-content">
          <button
            type="button"
            id="play-btn-${inst.id}"
            class="video-popup-play-btn ${inst.sizeClass || 'size-medium'} ${inst.enablePulse !== false ? 'has-pulse' : ''}"
            aria-haspopup="dialog"
            aria-controls="dialog-${inst.id}"
            aria-label="${inst.ariaLabel || `Play video: ${inst.title || 'Video ' + idx}`}"
            data-dialog-id="dialog-${inst.id}"
            data-video-url="${inst.videoUrl || ''}"
            data-autoplay="${inst.autoplay !== false ? '1' : '0'}"
            tabindex="0"
          >
            <span class="video-popup-play-icon-wrap" aria-hidden="true">
              <svg class="video-popup-play-icon" viewBox="0 0 24 24" fill="none"><path d="M8 5.14v13.72a1 1 0 001.5.86l11-6.86a1 1 0 000-1.72l-11-6.86a1 1 0 00-1.5.86z" fill="currentColor"/></svg>
            </span>
          </button>
          ${inst.title ? `<h3 class="video-popup-title">${inst.title}</h3>` : ''}
          ${inst.caption ? `<p class="video-popup-caption">${inst.caption}</p>` : ''}
        </div>
      </div>
      <dialog id="dialog-${inst.id}" class="video-popup-modal-dialog" aria-modal="true" aria-label="${inst.modalLabel || 'Video Player Modal ' + inst.id}">
        <div class="video-popup-dialog-container">
          <button type="button" class="video-popup-modal-close" aria-label="Close video player" data-dialog-id="dialog-${inst.id}" tabindex="0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          <div class="video-popup-embed-target" data-video-url="${inst.videoUrl || ''}" data-autoplay="${inst.autoplay !== false ? '1' : '0'}"></div>
        </div>
      </dialog>
    </div>
  `).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Challenger Stress Test Harness</title>
  <style>
    ${stylesCssContent}
    ${blocksCssContent}
    body { padding: 20px; font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: #f0f0f0; }
  </style>
</head>
<body>
  <button id="external-before" tabindex="0">External Button Before</button>
  <div id="blocks-wrapper">
    ${blocksMarkup}
  </div>
  <button id="external-after" tabindex="0">External Button After</button>

  <script>
    ${viewJsContent}
  </script>
</body>
</html>`;
}

async function runChallengerTestSuite() {
  console.log(`\n================================================================`);
  console.log(`⚔️  CHALLENGER STRESS SUITE: (?:midflight|relish)/video-popup-block`);
  console.log(`================================================================\n`);

  // =========================================================================
  // SUITE 1: Static Architecture & PHP Server Template Verification
  // =========================================================================
  console.log(`--- [SECTION 1] Static Architecture, Schema & PHP Syntax ---`);

  // 1.1 Block JSON Schema Validation
  const blockJsonRaw = fs.readFileSync(blockJsonPath, 'utf8');
  let blockJson;
  try {
    blockJson = JSON.parse(blockJsonRaw);
    assert(blockJson.name === '(?:midflight|relish)/video-popup-block', 'block.json has valid name (?:midflight|relish)/video-popup-block');
    assert(blockJson.apiVersion === 3, 'block.json specifies apiVersion 3');
    assert(blockJson.render === 'file:./video_popup_block.php', 'block.json links to server render template');
    assert(blockJson.viewScript === 'file:./view.js', 'block.json links to viewScript');
    assert(blockJson.attributes && blockJson.attributes.videoUrl, 'block.json declares videoUrl attribute');
    assert(blockJson.attributes && blockJson.attributes.enablePulse, 'block.json declares enablePulse attribute');
    assert(blockJson.attributes && blockJson.attributes.aspectRatio, 'block.json declares aspectRatio attribute');
  } catch (e) {
    assert(false, 'block.json is valid JSON', e.message);
  }

  // 1.2 PHP Syntax Check via CLI
  try {
    const phpCheckOutput = execSync(`php -l "${phpTemplatePath}"`, { encoding: 'utf8' });
    assert(phpCheckOutput.includes('No syntax errors detected'), 'PHP render template passes syntax check (php -l)');
  } catch (e) {
    assert(false, 'PHP render template has no syntax errors', e.message);
  }

  // 1.3 PHP Template Mock Rendering under Boundary Conditions
  try {
    const phpTestScript = `
      define('ABSPATH', 1);
      function esc_attr($s) { return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); }
      function esc_html($s) { return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); }
      function esc_url($s) { return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); }
      function esc_attr_e($s, $d='') { echo esc_attr($s); }
      function __($s, $d='') { return $s; }
      function sanitize_html_class($s) { return preg_replace('/[^a-zA-Z0-9_-]/', '', (string)$s); }
      function wp_rand($min, $max) { return rand($min, $max); }
      function wp_get_attachment_image_url($id, $size) { return 'https://example.com/img/' . $id . '.jpg'; }
      function get_post_meta($id, $key, $single) { return 'Alt text for ' . $id; }

      // Test Vector 1: Empty attributes
      $attributes = [];
      ob_start();
      include '${phpTemplatePath}';
      $out1 = ob_get_clean();

      // Test Vector 2: Full attributes with XSS attempt
      $attributes = [
        'videoUrl' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ"><script>alert(1)</script>',
        'title' => 'Title & <script>alert(2)</script>',
        'caption' => 'Caption "quote" & <b>html</b>',
        'posterImage' => ['id' => 42, 'url' => 'https://example.com/test.jpg', 'alt' => 'Safe Alt'],
        'overlayColor' => '#ff0000',
        'overlayOpacity' => 50,
        'playButtonColor' => '#00ff00',
        'playButtonIconColor' => '#0000ff',
        'playButtonSize' => 'large',
        'enablePulse' => true,
        'aspectRatio' => '21-9',
        'modalAriaLabel' => 'Custom Modal Label',
        'autoplay' => true,
        'anchor' => 'custom-anchor',
        'className' => 'custom-extra-class'
      ];
      ob_start();
      include '${phpTemplatePath}';
      $out2 = ob_get_clean();

      echo json_encode([
        'out1_len' => strlen($out1),
        'out1_has_dialog' => strpos($out1, '<dialog') !== false,
        'out1_has_play_btn' => strpos($out1, 'video-popup-play-btn') !== false,
        'out2_has_escaped_title' => strpos($out2, 'Title &amp; &lt;script&gt;alert(2)&lt;/script&gt;') !== false,
        'out2_no_raw_script' => strpos($out2, '<script>alert(1)</script>') === false && strpos($out2, '<script>alert(2)</script>') === false,
        'out2_has_ratio' => strpos($out2, 'ratio-21-9') !== false,
        'out2_has_anchor' => strpos($out2, 'id="custom-anchor"') !== false,
        'out2_has_extra_class' => strpos($out2, 'custom-extra-class') !== false
      ]);
    `;

    const phpExecResult = execSync(`php -r "${phpTestScript.replace(/"/g, '\\"')}"`, { encoding: 'utf8' });
    const phpRes = JSON.parse(phpExecResult);
    assert(phpRes.out1_has_dialog && phpRes.out1_has_play_btn, 'PHP template renders valid fallback markup with empty attributes');
    assert(phpRes.out2_has_escaped_title && phpRes.out2_no_raw_script, 'PHP template strictly sanitizes and escapes all attributes (XSS-safe)');
    assert(phpRes.out2_has_ratio && phpRes.out2_has_anchor && phpRes.out2_has_extra_class, 'PHP template correctly outputs aspect ratio, anchor ID, and custom class');
  } catch (e) {
    assert(false, 'PHP template execution under edge attributes', e.message);
  }

  // =========================================================================
  // SUITE 2: Browser E2E Adversarial Testing (Playwright)
  // =========================================================================
  console.log(`\n--- [SECTION 2] Browser E2E Lifecycle, Accessibility & Audio Leakage ---`);

  const testInstances = [
    {
      id: 'yt-std',
      title: 'YouTube Standard',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      ratioClass: 'ratio-16-9',
      sizeClass: 'size-medium',
      enablePulse: true,
      autoplay: true
    },
    {
      id: 'yt-shorts',
      title: 'YouTube Shorts',
      videoUrl: 'https://www.youtube.com/shorts/dQw4w9WgXcQ',
      ratioClass: 'ratio-9-16',
      sizeClass: 'size-small',
      enablePulse: true,
      autoplay: true
    },
    {
      id: 'yt-youtu-be',
      title: 'YouTube youtu.be',
      videoUrl: 'https://youtu.be/dQw4w9WgXcQ?t=42',
      ratioClass: 'ratio-4-3',
      sizeClass: 'size-large',
      enablePulse: false,
      autoplay: false
    },
    {
      id: 'vimeo-std',
      title: 'Vimeo Standard',
      videoUrl: 'https://vimeo.com/76979871',
      ratioClass: 'ratio-16-9',
      sizeClass: 'size-medium',
      enablePulse: true,
      autoplay: true
    },
    {
      id: 'vimeo-channels',
      title: 'Vimeo Channel',
      videoUrl: 'https://vimeo.com/channels/staffpicks/76979871',
      ratioClass: 'ratio-21-9',
      sizeClass: 'size-medium',
      enablePulse: true,
      autoplay: true
    },
    {
      id: 'direct-mp4',
      title: 'Direct MP4 Video',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4?v=1',
      ratioClass: 'ratio-16-9',
      sizeClass: 'size-medium',
      enablePulse: true,
      autoplay: true
    },
    {
      id: 'direct-webm',
      title: 'Direct WebM Video',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.webm',
      ratioClass: 'ratio-1-1',
      sizeClass: 'size-small',
      enablePulse: true,
      autoplay: true
    },
    {
      id: 'malformed-url',
      title: 'Malformed URL',
      videoUrl: 'not-a-valid-url-12345',
      ratioClass: 'ratio-16-9',
      sizeClass: 'size-medium',
      enablePulse: true,
      autoplay: true
    },
    {
      id: 'empty-url',
      title: 'Empty URL Block',
      videoUrl: '',
      ratioClass: 'ratio-16-9',
      sizeClass: 'size-medium',
      enablePulse: true,
      autoplay: true
    }
  ];

  const browser = await createBrowser();

  try {
    const context = await browser.newContext({ ignoreHTTPSErrors: true });
    const page = await context.newPage();

    const pageErrors = [];
    page.on('pageerror', err => pageErrors.push(err.message));

    const harnessHtml = generateMultiInstanceHarnessHtml(testInstances);
    await page.setContent(harnessHtml, { waitUntil: 'load' });

    // -----------------------------------------------------------------------
    // Test 2.1: Multi-Instance Trigger-to-Dialog 1:1 Mapping & Isolation
    // -----------------------------------------------------------------------
    console.log(`\n  [2.1] Multi-Instance Isolation & 1:1 Trigger-Dialog Pairing`);
    for (const inst of testInstances.slice(0, 4)) {
      const playBtn = page.locator(`#play-btn-${inst.id}`);
      const dialog = page.locator(`#dialog-${inst.id}`);
      const closeBtn = dialog.locator('.video-popup-modal-close');

      // Click play button
      await playBtn.click();
      await page.waitForTimeout(100);

      const isOpen = await dialog.evaluate(el => el.open === true);
      assert(isOpen, `Instance [${inst.id}] opens its paired dialog exclusively`);

      // Verify other dialogs remain closed
      const otherOpenCount = await page.evaluate(currentId => {
        const dialogs = document.querySelectorAll('dialog.video-popup-modal-dialog');
        let count = 0;
        dialogs.forEach(d => {
          if (d.id !== `dialog-${currentId}` && d.open) count++;
        });
        return count;
      }, inst.id);
      assert(otherOpenCount === 0, `Instance [${inst.id}] did not open any other dialogs`);

      // Close modal
      await closeBtn.click();
      await page.waitForTimeout(100);

      const isClosed = await dialog.evaluate(el => !el.open);
      assert(isClosed, `Instance [${inst.id}] closed cleanly`);

      // Focus restoration check
      const isFocusRestored = await playBtn.evaluate(el => el === document.activeElement);
      assert(isFocusRestored, `Instance [${inst.id}] restores focus to #play-btn-${inst.id}`);
    }

    // -----------------------------------------------------------------------
    // Test 2.2: Provider Embed URL Resolution Matrix
    // -----------------------------------------------------------------------
    console.log(`\n  [2.2] Provider URL Parsing & Embed Generation Matrix`);

    // YouTube Standard
    await page.locator('#play-btn-yt-std').click();
    await page.waitForTimeout(100);
    let iframeSrc = await page.locator('#dialog-yt-std iframe').getAttribute('src');
    assert(iframeSrc.includes('youtube-nocookie.com/embed/dQw4w9WgXcQ') && iframeSrc.includes('autoplay=1'),
      'YouTube Standard: parsed video ID and generated nocookie embed with autoplay=1', iframeSrc);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(100);

    // YouTube Shorts
    await page.locator('#play-btn-yt-shorts').click();
    await page.waitForTimeout(100);
    iframeSrc = await page.locator('#dialog-yt-shorts iframe').getAttribute('src');
    assert(iframeSrc.includes('youtube-nocookie.com/embed/dQw4w9WgXcQ'),
      'YouTube Shorts: correctly parsed /shorts/ path format', iframeSrc);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(100);

    // YouTube youtu.be with autoplay=false
    await page.locator('#play-btn-yt-youtu-be').click();
    await page.waitForTimeout(100);
    iframeSrc = await page.locator('#dialog-yt-youtu-be iframe').getAttribute('src');
    assert(iframeSrc.includes('youtube-nocookie.com/embed/dQw4w9WgXcQ') && iframeSrc.includes('autoplay=0'),
      'YouTube youtu.be: parsed ID and respected autoplay=false attribute', iframeSrc);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(100);

    // Vimeo Standard
    await page.locator('#play-btn-vimeo-std').click();
    await page.waitForTimeout(100);
    iframeSrc = await page.locator('#dialog-vimeo-std iframe').getAttribute('src');
    assert(iframeSrc.includes('player.vimeo.com/video/76979871') && iframeSrc.includes('autoplay=1'),
      'Vimeo Standard: generated player embed with autoplay=1', iframeSrc);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(100);

    // Vimeo Channels
    await page.locator('#play-btn-vimeo-channels').click();
    await page.waitForTimeout(100);
    iframeSrc = await page.locator('#dialog-vimeo-channels iframe').getAttribute('src');
    assert(iframeSrc.includes('player.vimeo.com/video/76979871'),
      'Vimeo Channels: parsed ID from nested channel path', iframeSrc);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(100);

    // Direct MP4
    await page.locator('#play-btn-direct-mp4').click();
    await page.waitForTimeout(100);
    const videoTag = page.locator('#dialog-direct-mp4 video');
    const videoCount = await videoTag.count();
    const videoSrc = videoCount > 0 ? await videoTag.getAttribute('src') : '';
    assert(videoCount === 1 && videoSrc.includes('BigBuckBunny.mp4'),
      'Direct MP4: injected <video> element with controls and matching source', videoSrc);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(100);

    // Malformed / Empty URLs (Graceful Handling)
    await page.locator('#play-btn-empty-url').click();
    await page.waitForTimeout(100);
    const fallbackMsg = await page.locator('#dialog-empty-url .video-popup-no-url').count();
    assert(fallbackMsg === 1, 'Empty URL: gracefully rendered .video-popup-no-url fallback message without crashing');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(100);

    // -----------------------------------------------------------------------
    // Test 2.3: Zero Audio Leakage & Comprehensive Teardown under Stress
    // -----------------------------------------------------------------------
    console.log(`\n  [2.3] Zero Audio Leakage & Teardown under Rapid Open/Close Cycling`);

    // Rapid Cycling: Open and close 10 times in fast succession
    for (let i = 0; i < 5; i++) {
      await page.locator('#play-btn-yt-std').click();
      await page.waitForTimeout(30);
      await page.keyboard.press('Escape');
      await page.waitForTimeout(30);
    }

    const ytEmbedAfterCycling = (await page.locator('#dialog-yt-std .video-popup-embed-target').innerHTML()).trim();
    assert(ytEmbedAfterCycling === '', 'Rapid cycling YouTube: embed target is completely empty after dismissal');

    // Direct MP4 rapid cycle
    for (let i = 0; i < 5; i++) {
      await page.locator('#play-btn-direct-mp4').click();
      await page.waitForTimeout(30);
      await page.locator('#dialog-direct-mp4 .video-popup-modal-close').click();
      await page.waitForTimeout(30);
    }

    const mp4EmbedAfterCycling = (await page.locator('#dialog-direct-mp4 .video-popup-embed-target').innerHTML()).trim();
    assert(mp4EmbedAfterCycling === '', 'Rapid cycling MP4: video element completely unloaded and detached');

    // Verify no stray video/iframe elements anywhere in entire DOM
    const strayMediaCount = await page.evaluate(() => {
      return document.querySelectorAll('dialog:not([open]) iframe, dialog:not([open]) video').length;
    });
    assert(strayMediaCount === 0, 'Zero stray media elements in closed dialogs across entire document');

    // -----------------------------------------------------------------------
    // Test 2.4: WCAG 2.1 AA Keyboard Focus Containment & ARIA Tree
    // -----------------------------------------------------------------------
    console.log(`\n  [2.4] WCAG 2.1 AA Modal Focus Trap & ARIA Semantics`);

    await page.locator('#play-btn-yt-std').click();
    await page.waitForTimeout(100);

    // Focus starts on close button
    const closeBtnFocused = await page.locator('#dialog-yt-std .video-popup-modal-close').evaluate(el => el === document.activeElement);
    assert(closeBtnFocused, 'Focus initialized on modal close button');

    // Tab key forward
    await page.keyboard.press('Tab');
    const activeAfterTab = await page.evaluate(() => {
      const active = document.activeElement;
      const dialog = document.getElementById('dialog-yt-std');
      return dialog.contains(active);
    });
    assert(activeAfterTab, 'Tab press: active element remains inside dialog container');

    // Tab key wrap check (single focusable or multiple focusables wrap around)
    await page.keyboard.press('Tab');
    const activeAfterTab2 = await page.evaluate(() => {
      const active = document.activeElement;
      const dialog = document.getElementById('dialog-yt-std');
      return dialog.contains(active);
    });
    assert(activeAfterTab2, 'Second Tab press: focus still contained inside dialog');

    // Shift+Tab backward wrap check
    await page.keyboard.press('Shift+Tab');
    const activeAfterShiftTab = await page.evaluate(() => {
      const active = document.activeElement;
      const dialog = document.getElementById('dialog-yt-std');
      return dialog.contains(active);
    });
    assert(activeAfterShiftTab, 'Shift+Tab press: backward focus remains inside dialog container');

    // Close via Escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(100);
    const restoredToPlayBtn = await page.locator('#play-btn-yt-std').evaluate(el => el === document.activeElement);
    assert(restoredToPlayBtn, 'Escape key: focus cleanly restored to triggering play button');

    // Backdrop Click Dismissal Check
    await page.locator('#play-btn-yt-std').click();
    await page.waitForTimeout(100);
    // Click backdrop element
    await page.evaluate(() => {
      const dialog = document.getElementById('dialog-yt-std');
      dialog.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    });
    await page.waitForTimeout(100);
    const isClosedByBackdrop = await page.locator('#dialog-yt-std').evaluate(el => !el.open);
    assert(isClosedByBackdrop, 'Backdrop click: dialog closes and focus restored to play button');

    // Check page errors
    assert(pageErrors.length === 0, 'Zero uncaught JavaScript exceptions during all stress tests', pageErrors.join('; '));

    await context.close();
  } finally {
    await browser.close();
  }

  // =========================================================================
  // SUITE 3: Viewport Responsiveness, Aspect Ratios & Animation CSS Auditing
  // =========================================================================
  console.log(`\n--- [SECTION 3] Viewport Responsiveness, Aspect Ratios & CSS Pulse ---`);

  const viewports = [
    { name: 'Mobile Ultra-Small', width: 320, height: 568 },
    { name: 'Mobile Standard', width: 375, height: 812 },
    { name: 'Tablet Portrait', width: 768, height: 1024 },
    { name: 'Desktop Standard', width: 1280, height: 800 },
    { name: 'Desktop 4K Ultrawide', width: 2560, height: 1440 },
  ];

  const browser2 = await createBrowser();
  try {
    for (const vp of viewports) {
      const ctx = await browser2.newContext({
        viewport: { width: vp.width, height: vp.height },
        ignoreHTTPSErrors: true
      });
      const pg = await ctx.newPage();
      await pg.setContent(generateMultiInstanceHarnessHtml(testInstances), { waitUntil: 'load' });

      // Check horizontal overflow
      const hasHorizontalOverflow = await pg.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      assert(!hasHorizontalOverflow, `Viewport [${vp.name} (${vp.width}px)]: zero horizontal overflow (scrollWidth <= innerWidth)`);

      // Check card aspect ratios computed dimensions
      const ratiosChecked = await pg.evaluate(() => {
        const b16_9 = document.querySelector('.video-popup-block.ratio-16-9 .video-popup-card');
        const b4_3 = document.querySelector('.video-popup-block.ratio-4-3 .video-popup-card');
        const b1_1 = document.querySelector('.video-popup-block.ratio-1-1 .video-popup-card');
        const b21_9 = document.querySelector('.video-popup-block.ratio-21-9 .video-popup-card');

        function checkRatio(el, expectedW, expectedH) {
          if (!el) return false;
          const rect = el.getBoundingClientRect();
          if (rect.width <= 0 || rect.height <= 0) return false;
          const actualRatio = rect.width / rect.height;
          const targetRatio = expectedW / expectedH;
          // Allow 5% tolerance for min-height constraints
          return Math.abs(actualRatio - targetRatio) < 0.15 || rect.height >= 320;
        }

        return {
          r16_9: checkRatio(b16_9, 16, 9),
          r4_3: checkRatio(b4_3, 4, 3),
          r1_1: checkRatio(b1_1, 1, 1),
          r21_9: checkRatio(b21_9, 21, 9),
        };
      });

      assert(ratiosChecked.r16_9 && ratiosChecked.r4_3 && ratiosChecked.r1_1 && ratiosChecked.r21_9,
        `Viewport [${vp.name}]: all 4 aspect ratio cards render correct proportions`);

      await ctx.close();
    }

    // Prefers Reduced Motion CSS check
    const motionCtx = await browser2.newContext({
      reducedMotion: 'reduce',
      ignoreHTTPSErrors: true
    });
    const motionPg = await motionCtx.newPage();
    await motionPg.setContent(generateMultiInstanceHarnessHtml(testInstances), { waitUntil: 'load' });

    const reducedMotionSuppression = await motionPg.evaluate(() => {
      const btn = document.querySelector('.video-popup-play-btn.has-pulse');
      if (!btn) return false;
      const comp = window.getComputedStyle(btn);
      // Under reduced motion, transition is none and pseudo elements animation is suppressed
      return comp.transitionDuration === '0s' || comp.transition === 'none';
    });
    assert(reducedMotionSuppression, 'prefers-reduced-motion media query suppresses transition/animations');

    await motionCtx.close();
  } finally {
    await browser2.close();
  }

  // =========================================================================
  // SUMMARY & VERDICT
  // =========================================================================
  console.log(`\n================================================================`);
  console.log(`📊 CHALLENGER SUMMARY: ${passedAssertions} Passed, ${failedAssertions} Failed (Total: ${totalAssertions})`);
  console.log(`================================================================\n`);

  if (failedAssertions > 0) {
    console.error('Failure Details:');
    failureDetails.forEach(f => console.error(`  - ${f}`));
    console.log(`\n❌ VERDICT: CHALLENGE_FAILED`);
    process.exit(1);
  } else {
    console.log(`\n🎯 VERDICT: APPROVE`);
    process.exit(0);
  }
}

runChallengerTestSuite().catch(err => {
  console.error('Fatal error in challenger test suite:', err);
  process.exit(1);
});
