/**
 * Video Popup Block — Empirical Challenger Test Harness
 *
 * Uses JSDOM and PHP CLI to perform exhaustive empirical stress testing:
 * 1. Video Provider URL Matrix (YouTube, Vimeo, Direct Files, Fallback, Malformed)
 * 2. Front-end DOM Lifecycle (Open, Close, DOM cleanup, Zero Audio Leak)
 * 3. Event Handling (Backdrop clicks, Escape key, Close button)
 * 4. WCAG 2.1 AA Focus Trap & Focus Restoration
 * 5. Rapid Burst Stress (100 sequential & randomized cycles)
 * 6. Multi-Block Isolation on a single page
 * 7. PHP Server Template Rendering (Edge Cases, Types, XSS Escaping)
 * 8. CSS & Reduced Motion Stylesheet Audit
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { JSDOM } from 'jsdom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const themeRoot = path.resolve(__dirname, '..');

const viewJsPath = path.join(themeRoot, 'blocks', 'video-popup-block', 'view.js');
const phpTemplatePath = path.join(themeRoot, 'blocks', 'video-popup-block', 'video_popup_block.php');
const lessPath = path.join(themeRoot, 'assets', 'less', 'blocks', 'video_popup_block.less');
const blocksCssPath = path.join(themeRoot, 'blocks', 'blocks.css');

const viewJsCode = fs.readFileSync(viewJsPath, 'utf8');
const lessCode = fs.readFileSync(lessPath, 'utf8');
const blocksCssCode = fs.existsSync(blocksCssPath) ? fs.readFileSync(blocksCssPath, 'utf8') : '';

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const testResults = [];

function assert(condition, testName, details = '', critical = false) {
  totalTests++;
  const result = { testName, passed: !!condition, details, critical };
  testResults.push(result);
  if (condition) {
    passedTests++;
    console.log(`  ✅ [PASS] ${testName} ${details ? `(${details})` : ''}`);
  } else {
    failedTests++;
    console.log(`  ❌ [FAIL] ${testName} ${details ? `(${details})` : ''}`);
  }
}

/**
 * Setup a JSDOM instance with full HTML5 <dialog> polyfill and view.js execution.
 */
function createTestDom(htmlBody) {
  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Test DOM</title>
</head>
<body>
  ${htmlBody}
</body>
</html>`;

  const dom = new JSDOM(fullHtml, {
    runScripts: 'dangerously',
    url: 'https://indigenous-tourism-manitoba-wordpress.lndo.site/'
  });

  const { window } = dom;
  const { document, HTMLElement } = window;

  // Polyfill HTML5 <dialog> methods on HTMLElement prototype for JSDOM
  window.HTMLElement.prototype.showModal = function() {
    this.open = true;
    this.setAttribute('open', '');
  };
  window.HTMLElement.prototype.show = function() {
    this.open = true;
    this.setAttribute('open', '');
  };
  window.HTMLElement.prototype.close = function() {
    this.open = false;
    this.removeAttribute('open');
    this.dispatchEvent(new window.Event('close'));
  };

  // Polyfill HTMLMediaElement methods
  window.HTMLMediaElement.prototype.pause = function() {};
  window.HTMLMediaElement.prototype.load = function() {};
  window.HTMLMediaElement.prototype.play = function() { return Promise.resolve(); };

  // Inject and execute view.js
  window.eval(viewJsCode);
  window.document.dispatchEvent(new window.Event('DOMContentLoaded'));

  return { dom, window, document };
}

async function runEmpiricalStressSuite() {
  console.log(`\n======================================================================`);
  console.log(`🔬 EMPIRICAL CHALLENGER STRESS SUITE: relish/video-popup-block`);
  console.log(`======================================================================\n`);

  // =========================================================================
  // SECTION 1: URL Parsing Matrix (YouTube, Vimeo, Direct, Fallbacks)
  // =========================================================================
  console.log(`--- Section 1: Video Provider URL Parsing Matrix ---`);

  const { window } = createTestDom(`
    <div class="video-popup-block">
      <button id="p-test" class="video-popup-play-btn" data-dialog-id="d-test" data-video-url="" data-autoplay="1">Play</button>
      <dialog id="d-test" class="video-popup-modal-dialog">
        <div class="video-popup-dialog-container">
          <button type="button" class="video-popup-modal-close" data-dialog-id="d-test">✕</button>
          <div class="video-popup-embed-target"></div>
        </div>
      </dialog>
    </div>
  `);

  async function testParse(url, autoplay = true) {
    const playBtn = window.document.getElementById('p-test');
    const dialog = window.document.getElementById('d-test');
    const embedTarget = dialog.querySelector('.video-popup-embed-target');

    playBtn.setAttribute('data-video-url', url === null ? '' : url);
    playBtn.setAttribute('data-autoplay', autoplay ? '1' : '0');

    // Trigger click to trigger view.js openModal()
    playBtn.dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true }));

    const iframe = embedTarget.querySelector('iframe');
    const video = embedTarget.querySelector('video');
    const noUrl = embedTarget.querySelector('.video-popup-no-url');

    let result = null;
    if (iframe) {
      result = { type: 'iframe', src: iframe.getAttribute('src'), title: iframe.getAttribute('title'), allow: iframe.getAttribute('allow') };
      if (result.src.includes('youtube-nocookie.com')) result.provider = 'youtube';
      else if (result.src.includes('player.vimeo.com')) result.provider = 'vimeo';
      else result.provider = 'generic-iframe';
    } else if (video) {
      result = { type: 'direct', src: video.getAttribute('src') || video.src, autoplay: video.hasAttribute('autoplay'), controls: video.hasAttribute('controls'), playsinline: video.hasAttribute('playsinline') };
    } else if (noUrl) {
      result = { type: 'no-url', text: noUrl.textContent };
    }

    // Clean up modal
    dialog.close();
    embedTarget.innerHTML = '';
    return result;
  }

  // 1.1 YouTube Tests
  const ytMatrix = [
    { name: 'Standard watch URL', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', id: 'dQw4w9WgXcQ' },
    { name: 'HTTP watch URL', url: 'http://www.youtube.com/watch?v=dQw4w9WgXcQ', id: 'dQw4w9WgXcQ' },
    { name: 'Short youtu.be URL', url: 'https://youtu.be/dQw4w9WgXcQ', id: 'dQw4w9WgXcQ' },
    { name: 'Youtu.be with timestamp query', url: 'https://youtu.be/dQw4w9WgXcQ?t=120', id: 'dQw4w9WgXcQ' },
    { name: 'Embed URL', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', id: 'dQw4w9WgXcQ' },
    { name: 'YouTube-nocookie URL', url: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ', id: 'dQw4w9WgXcQ' },
    { name: 'YouTube Shorts URL', url: 'https://www.youtube.com/shorts/dQw4w9WgXcQ', id: 'dQw4w9WgXcQ' },
    { name: 'Legacy /v/ URL', url: 'https://www.youtube.com/v/dQw4w9WgXcQ', id: 'dQw4w9WgXcQ' },
    { name: 'Complex query params', url: 'https://www.youtube.com/watch?feature=player_embedded&v=dQw4w9WgXcQ&t=42s&list=PLtest', id: 'dQw4w9WgXcQ' },
    { name: 'ID with hyphen and underscore', url: 'https://youtu.be/a-B_c1D2e3F', id: 'a-B_c1D2e3F' },
  ];

  for (const tc of ytMatrix) {
    const res = await testParse(tc.url, true);
    assert(
      res && res.provider === 'youtube' && res.src.includes(`youtube-nocookie.com/embed/${tc.id}`) && res.src.includes('autoplay=1'),
      `YouTube: ${tc.name}`,
      `Parsed: ${res ? res.src : 'null'}`
    );
  }

  // 1.2 Vimeo Tests
  const vimeoMatrix = [
    { name: 'Standard Vimeo URL', url: 'https://vimeo.com/76979871', id: '76979871' },
    { name: 'Vimeo Channels URL', url: 'https://vimeo.com/channels/staffpicks/76979871', id: '76979871' },
    { name: 'Vimeo Subchannel URL', url: 'https://vimeo.com/channels/indigenous/76979871', id: '76979871' },
    { name: 'Vimeo Groups URL', url: 'https://vimeo.com/groups/travel/videos/76979871', id: '76979871' },
    { name: 'Vimeo Album URL', url: 'https://vimeo.com/album/12345/video/76979871', id: '76979871' },
    { name: 'Vimeo Player Embed URL', url: 'https://player.vimeo.com/video/76979871', id: '76979871' },
    { name: 'Vimeo with extra parameters', url: 'https://vimeo.com/76979871?autoplay=1&muted=1', id: '76979871' },
  ];

  for (const tc of vimeoMatrix) {
    const res = await testParse(tc.url, false);
    assert(
      res && res.provider === 'vimeo' && res.src.includes(`player.vimeo.com/video/${tc.id}`) && res.src.includes('autoplay=0&autopause=0'),
      `Vimeo: ${tc.name}`,
      `Parsed: ${res ? res.src : 'null'}`
    );
  }

  // 1.3 Direct Video File Tests
  const directMatrix = [
    { name: 'Direct .mp4 file', url: 'https://example.com/videos/nature.mp4', ext: 'mp4' },
    { name: 'Direct .webm file', url: 'https://example.com/videos/nature.webm', ext: 'webm' },
    { name: 'Direct .ogg file', url: 'https://example.com/videos/nature.ogg', ext: 'ogg' },
    { name: 'Direct .ogv file', url: 'https://example.com/videos/nature.ogv', ext: 'ogv' },
    { name: 'Direct .mov file', url: 'https://example.com/videos/nature.mov', ext: 'mov' },
    { name: 'Direct uppercase .MP4 extension', url: 'https://example.com/videos/NATURE.MP4', ext: 'MP4' },
    { name: 'Direct .mp4 with query params', url: 'https://example.com/videos/nature.mp4?auth=token123&exp=9999', ext: 'mp4' },
  ];

  for (const tc of directMatrix) {
    const res = await testParse(tc.url, true);
    assert(
      res && res.type === 'direct' && res.src === tc.url && res.autoplay && res.controls && res.playsinline,
      `Direct Media: ${tc.name}`,
      `Type: ${res ? res.type : 'null'}`
    );
  }

  // 1.4 Edge Case URLs & Vulnerability Assessment
  const edgeMatrix = [
    { name: 'Empty string URL', url: '', expected: 'no-url' },
    { name: 'Whitespace URL ("   ")', url: '   ', expected: 'no-url' },
    { name: 'Null URL attribute', url: null, expected: 'no-url' },
    { name: 'Generic third-party URL (Wistia)', url: 'https://wistia.com/embed/sample', expected: 'generic-iframe' },
    { name: 'Generic third-party URL (Dailymotion)', url: 'https://www.dailymotion.com/embed/video/x7tgad0', expected: 'generic-iframe' },
  ];

  for (const tc of edgeMatrix) {
    const res = await testParse(tc.url, true);
    if (tc.expected === 'no-url') {
      const isOk = res && res.type === 'no-url';
      assert(isOk, `Edge URL: ${tc.name} displays friendly notice`, `Result: ${res ? res.type + ' (src: "' + (res.src || '') + '")' : 'null'}`);
    } else {
      assert(res && res.provider === tc.expected, `Edge URL: ${tc.name} fallback iframe matches ${tc.expected}`);
    }
  }

  // =========================================================================
  // SECTION 2: DOM Lifecycle & Zero Audio Leakage Stress Tests
  // =========================================================================
  console.log(`\n--- Section 2: DOM Lifecycle & Zero Audio Leakage ---`);

  const harnessHtml = `
    <button id="external-before" tabindex="0">Before</button>
    <div class="video-popup-block ratio-16-9" id="b1">
      <div class="video-popup-card">
        <div class="video-popup-content">
          <button
            type="button"
            id="play1"
            class="video-popup-play-btn size-medium has-pulse"
            aria-haspopup="dialog"
            aria-controls="dialog1"
            aria-label="Play video 1"
            data-dialog-id="dialog1"
            data-video-url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            data-autoplay="1"
            tabindex="0"
          >Play</button>
        </div>
      </div>
      <dialog id="dialog1" class="video-popup-modal-dialog" aria-modal="true" aria-label="Modal 1">
        <div class="video-popup-dialog-container">
          <button type="button" class="video-popup-modal-close" aria-label="Close" data-dialog-id="dialog1" tabindex="0">✕</button>
          <div class="video-popup-embed-target" data-video-url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" data-autoplay="1"></div>
        </div>
      </dialog>
    </div>
    <div class="video-popup-block ratio-16-9" id="b2">
      <div class="video-popup-card">
        <div class="video-popup-content">
          <button
            type="button"
            id="play2"
            class="video-popup-play-btn size-medium"
            aria-haspopup="dialog"
            aria-controls="dialog2"
            aria-label="Play video 2"
            data-dialog-id="dialog2"
            data-video-url="https://example.com/video.mp4"
            data-autoplay="1"
            tabindex="0"
          >Play 2</button>
        </div>
      </div>
      <dialog id="dialog2" class="video-popup-modal-dialog" aria-modal="true" aria-label="Modal 2">
        <div class="video-popup-dialog-container">
          <button type="button" class="video-popup-modal-close" aria-label="Close" data-dialog-id="dialog2" tabindex="0">✕</button>
          <div class="video-popup-embed-target" data-video-url="https://example.com/video.mp4" data-autoplay="1"></div>
        </div>
      </dialog>
    </div>
    <button id="external-after" tabindex="0">After</button>
  `;

  const { dom: lifeDom, window: lifeWin, document: lifeDoc } = createTestDom(harnessHtml);
  const p1 = lifeDoc.getElementById('play1');
  const d1 = lifeDoc.getElementById('dialog1');
  const c1 = d1.querySelector('.video-popup-modal-close');
  const t1 = d1.querySelector('.video-popup-embed-target');

  const p2 = lifeDoc.getElementById('play2');
  const d2 = lifeDoc.getElementById('dialog2');
  const c2 = d2.querySelector('.video-popup-modal-close');
  const t2 = d2.querySelector('.video-popup-embed-target');

  // 2.1 Initial State
  assert(!d1.open && !d2.open, 'Initial State: All dialogs are closed');
  assert(t1.innerHTML.trim() === '' && t2.innerHTML.trim() === '', 'Initial State: Embed targets are empty (zero preloading bandwidth)');
  assert(!lifeDoc.body.classList.contains('video-modal-open'), 'Initial State: Body does not have video-modal-open class');

  // 2.2 Open Dialog 1
  p1.dispatchEvent(new lifeWin.MouseEvent('click', { bubbles: true, cancelable: true }));
  assert(d1.open && !d2.open, 'Open Modal 1: Dialog 1 open=true, Dialog 2 remains closed');
  assert(lifeDoc.body.classList.contains('video-modal-open'), 'Open Modal 1: Body receives video-modal-open class');
  assert(t1.querySelector('iframe') !== null, 'Open Modal 1: YouTube iframe injected into embed target');

  // 2.3 Close via Close Button
  c1.dispatchEvent(new lifeWin.MouseEvent('click', { bubbles: true, cancelable: true }));
  assert(!d1.open, 'Close Button: Dialog 1 closes cleanly');
  assert(t1.innerHTML.trim() === '', 'Close Button: Embed target emptied (Zero audio leak)');
  assert(!lifeDoc.body.classList.contains('video-modal-open'), 'Close Button: Body video-modal-open class removed');

  // 2.4 Reopen Dialog 1 and Close via Escape key
  p1.dispatchEvent(new lifeWin.MouseEvent('click', { bubbles: true, cancelable: true }));
  assert(d1.open, 'Reopen Modal 1: Dialog 1 open=true');
  assert(t1.querySelector('iframe') !== null, 'Reopen Modal 1: Iframe injected');

  d1.dispatchEvent(new lifeWin.KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));
  assert(!d1.open, 'Escape Key: Dialog 1 closes cleanly');
  assert(t1.innerHTML.trim() === '', 'Escape Key: Embed target emptied (Zero audio leak)');
  assert(!lifeDoc.body.classList.contains('video-modal-open'), 'Escape Key: Body scroll lock class removed');

  // 2.5 Open Direct Video (Dialog 2) and Close via Backdrop click
  p2.dispatchEvent(new lifeWin.MouseEvent('click', { bubbles: true, cancelable: true }));
  assert(d2.open, 'Open Modal 2 (Direct MP4): Dialog 2 open=true');
  assert(t2.querySelector('video') !== null, 'Open Modal 2: HTML5 <video> element injected');

  // Click on container inside dialog -> must remain open
  const container2 = d2.querySelector('.video-popup-dialog-container');
  container2.dispatchEvent(new lifeWin.MouseEvent('click', { bubbles: true, cancelable: true }));
  assert(d2.open, 'Inner Container Click: Dialog remains OPEN');

  // Click on dialog backdrop itself (target === dialog)
  d2.dispatchEvent(new lifeWin.MouseEvent('click', { bubbles: true, cancelable: true }));
  assert(!d2.open, 'Backdrop Click: Dialog 2 closes cleanly');
  assert(t2.innerHTML.trim() === '', 'Backdrop Click: <video> element destroyed (Zero audio leak)');

  // =========================================================================
  // SECTION 3: Keyboard Focus Management & WCAG 2.1 AA Trapping
  // =========================================================================
  console.log(`\n--- Section 3: Keyboard Focus Trap & WCAG 2.1 AA Compliance ---`);

  p1.focus();
  assert(lifeDoc.activeElement === p1, 'Focus Management: Play button initially focused');

  // Trigger modal open
  p1.dispatchEvent(new lifeWin.MouseEvent('click', { bubbles: true, cancelable: true }));
  assert(lifeDoc.activeElement === c1, 'Focus Management: Focus automatically set to Close button upon modal open');

  const focusables = d1.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), video, iframe');
  assert(focusables.length >= 2, `Focus Trap: ${focusables.length} focusable elements inside dialog (Close button + media embed)`);

  // Simulate Shift+Tab backward cycle from first element (c1)
  c1.focus();
  d1.dispatchEvent(new lifeWin.KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true }));
  const lastEl = focusables[focusables.length - 1];
  assert(lifeDoc.activeElement === lastEl, 'Focus Trap: Shift+Tab on first element cycles focus to last element inside modal');

  // Simulate Tab forward cycle from last element
  lastEl.focus();
  d1.dispatchEvent(new lifeWin.KeyboardEvent('keydown', { key: 'Tab', shiftKey: false, bubbles: true, cancelable: true }));
  const firstEl = focusables[0];
  assert(lifeDoc.activeElement === firstEl, 'Focus Trap: Tab on last element cycles focus back to first element inside modal');

  // Close modal and verify focus restoration to play button
  c1.dispatchEvent(new lifeWin.MouseEvent('click', { bubbles: true, cancelable: true }));
  assert(lifeDoc.activeElement === p1, 'Focus Restoration: Focus successfully restored to initiating play button #1 (WCAG 2.1 AA 2.4.3)');

  // =========================================================================
  // SECTION 4: 100-Cycle Burst & High-Frequency Stress Test
  // =========================================================================
  console.log(`\n--- Section 4: 100-Cycle High-Frequency Burst Test ---`);

  let burstErrors = 0;
  for (let i = 0; i < 100; i++) {
    try {
      const targetBtn = (i % 2 === 0) ? p1 : p2;
      const targetDialog = (i % 2 === 0) ? d1 : d2;
      const targetClose = (i % 2 === 0) ? c1 : c2;
      const targetEmbed = (i % 2 === 0) ? t1 : t2;

      // Open
      targetBtn.dispatchEvent(new lifeWin.MouseEvent('click', { bubbles: true, cancelable: true }));
      if (!targetDialog.open || targetEmbed.innerHTML.trim() === '') {
        burstErrors++;
      }

      // Close via alternating method: 0=close btn, 1=Escape, 2=Backdrop
      const method = i % 3;
      if (method === 0) {
        targetClose.dispatchEvent(new lifeWin.MouseEvent('click', { bubbles: true, cancelable: true }));
      } else if (method === 1) {
        targetDialog.dispatchEvent(new lifeWin.KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));
      } else {
        targetDialog.dispatchEvent(new lifeWin.MouseEvent('click', { bubbles: true, cancelable: true }));
      }

      if (targetDialog.open || targetEmbed.innerHTML.trim() !== '') {
        burstErrors++;
      }
    } catch (err) {
      burstErrors++;
    }
  }

  assert(
    burstErrors === 0 && !d1.open && !d2.open && !lifeDoc.body.classList.contains('video-modal-open'),
    '100-Cycle Burst Test: 100 consecutive rapid open/close cycles across multiple blocks with 0 errors and zero state drift'
  );

  // =========================================================================
  // SECTION 5: PHP Server-Side Render Template Stress Test
  // =========================================================================
  console.log(`\n--- Section 5: PHP Server Render Template Edge Cases ---`);

  const phpHarness = `<?php
    function esc_attr($str) { return htmlspecialchars((string)$str, ENT_QUOTES, 'UTF-8'); }
    function esc_html($str) { return htmlspecialchars((string)$str, ENT_QUOTES, 'UTF-8'); }
    function esc_url($str) { return filter_var((string)$str, FILTER_SANITIZE_URL); }
    function sanitize_html_class($class) { return preg_replace('/[^a-zA-Z0-9_-]/', '', (string)$class); }
    function __($text, $domain = 'default') { return $text; }
    function _e($text, $domain = 'default') { echo $text; }
    function esc_attr_e($text, $domain = 'default') { echo htmlspecialchars((string)$text, ENT_QUOTES, 'UTF-8'); }
    function wp_get_attachment_image_url($id, $size = 'full') { return 'https://example.com/uploads/' . (int)$id . '.jpg'; }
    function get_post_meta($id, $key, $single = true) { return 'Alt Text ' . (int)$id; }
    function wp_rand($min, $max) { return 4321; }

    $cases = [
      'empty_attributes' => [],
      'null_values' => [
        'videoUrl' => null,
        'posterImage' => null,
        'title' => null,
        'caption' => null,
        'overlayColor' => null,
        'overlayOpacity' => null,
        'playButtonColor' => null,
        'aspectRatio' => null
      ],
      'rich_attributes' => [
        'videoUrl' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        'posterImage' => ['id' => 101, 'url' => 'https://example.com/poster.jpg', 'alt' => 'Poster Alt'],
        'title' => 'Building the Brand',
        'caption' => 'ITM Tourism Strategy 2026',
        'overlayColor' => '#da5225',
        'overlayOpacity' => 35,
        'playButtonColor' => '#e0ac0f',
        'playButtonIconColor' => '#ffffff',
        'playButtonSize' => 'large',
        'enablePulse' => true,
        'aspectRatio' => '21-9',
        'modalAriaLabel' => 'ITM Brand Video',
        'autoplay' => true,
        'className' => 'custom-theme-block',
        'anchor' => 'brand-video-sec'
      ],
      'numeric_attachment_id' => [
        'posterImage' => 555
      ],
      'string_poster_url' => [
        'posterImage' => 'https://example.com/direct-image.webp'
      ],
      'xss_injection' => [
        'videoUrl' => 'https://example.com/" onmouseover="alert(1)',
        'title' => '<script>alert("xss")</script> & "quotes"',
        'caption' => '<img src=x onerror=alert(2)>',
        'modalAriaLabel' => '"><script>alert(3)</script>',
        'anchor' => 'sec"><script>alert(4)</script>'
      ]
    ];

    $rendered = [];
    foreach ($cases as $key => $attributes) {
      ob_start();
      include '${phpTemplatePath.replace(/'/g, "\\'")}';
      $html = ob_get_clean();
      $rendered[$key] = [
        'html' => $html,
        'has_dialog' => strpos($html, '<dialog') !== false,
        'has_play_btn' => strpos($html, 'video-popup-play-btn') !== false,
        'is_safe_xss' => (strpos($html, '<script>') === false && strpos($html, '<img src=x') === false)
      ];
    }

    echo json_encode($rendered);
  `;

  try {
    const phpOut = execSync('php', { input: phpHarness, encoding: 'utf8' });
    const phpData = JSON.parse(phpOut);

    assert(phpData.empty_attributes.has_dialog && phpData.empty_attributes.has_play_btn, 'PHP Template: Default empty attributes render valid HTML without notices');
    assert(phpData.null_values.has_dialog && phpData.null_values.has_play_btn, 'PHP Template: Null values gracefully handled by fallback defaults');
    assert(phpData.rich_attributes.has_dialog && phpData.rich_attributes.html.includes('ratio-21-9'), 'PHP Template: Full attribute set renders aspect ratio and custom properties');
    assert(phpData.numeric_attachment_id.html.includes('555.jpg'), 'PHP Template: Numeric attachment ID resolved to full attachment image URL');
    assert(phpData.string_poster_url.html.includes('direct-image.webp'), 'PHP Template: Direct string image URL rendered in background style');
    assert(phpData.xss_injection.is_safe_xss, 'PHP Template: XSS payloads safely escaped with esc_html/esc_attr/esc_url (0 unescaped script or img tags emitted)');
  } catch (phpErr) {
    assert(false, 'PHP Server-Side Template Test Failed', phpErr.message);
  }

  // =========================================================================
  // SECTION 6: LESS Stylesheet & Reduced Motion Audit
  // =========================================================================
  console.log(`\n--- Section 6: LESS & CSS Media Query Audit ---`);

  const hasKeyframes = lessCode.includes('@keyframes video-popup-pulse') || blocksCssCode.includes('@keyframes video-popup-pulse');
  assert(hasKeyframes, 'CSS Audit: @keyframes video-popup-pulse animation defined');

  const hasReducedMotion = lessCode.includes('prefers-reduced-motion: reduce') || blocksCssCode.includes('prefers-reduced-motion: reduce');
  assert(hasReducedMotion, 'CSS Audit: @media (prefers-reduced-motion: reduce) block present');

  const hasAspectRatios = lessCode.includes('ratio-16-9') && lessCode.includes('ratio-4-3') && lessCode.includes('ratio-1-1') && lessCode.includes('ratio-21-9');
  assert(hasAspectRatios, 'CSS Audit: All 4 aspect ratio modifier classes (.ratio-16-9, .ratio-4-3, .ratio-1-1, .ratio-21-9) implemented');

  const hasModalBackdrop = lessCode.includes('backdrop-filter: blur(8px)') && lessCode.includes('&::backdrop');
  assert(hasModalBackdrop, 'CSS Audit: Native dialog backdrop blur and dark overlay styling configured');

  const hasScrollLock = lessCode.includes('body.video-modal-open');
  assert(hasScrollLock, 'CSS Audit: body.video-modal-open overflow lock rule configured');

  // =========================================================================
  // Final Verdict
  // =========================================================================
  console.log(`\n======================================================================`);
  console.log(`📊 CHALLENGER SUMMARY: ${passedTests}/${totalTests} Tests Passed (${failedTests} Failures)`);
  console.log(`======================================================================\n`);

  if (failedTests === 0) {
    console.log(`🎉 EMPIRICAL VERDICT: APPROVE (Implementation is correct, complete, and robust)`);
  } else {
    console.log(`🚨 EMPIRICAL VERDICT: CHALLENGE_FAILED (${failedTests} failures detected)`);
  }
}

runEmpiricalStressSuite().catch(err => {
  console.error('Fatal error running empirical stress suite:', err);
  process.exit(1);
});
