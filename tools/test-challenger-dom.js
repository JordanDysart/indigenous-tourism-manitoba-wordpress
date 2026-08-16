/**
 * Challenger M1-2: Frontend DOM, Lifecycle & WCAG Accessibility Adversarial Test Suite
 *
 * Uses jsdom to execute exhaustive in-memory DOM simulation, lifecycle audits,
 * keyboard trapping, zero-audio-leak teardown, and edge-case probing.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const themeRoot = path.resolve(__dirname, '..');

const viewJsPath = path.join(themeRoot, 'blocks', 'video-popup-block', 'view.js');
const viewJsCode = fs.readFileSync(viewJsPath, 'utf8');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failureMessages = [];

function check(condition, description, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✅ [PASS] ${description} ${details ? `(${details})` : ''}`);
  } else {
    failedTests++;
    const msg = `❌ [FAIL] ${description} ${details ? `— ${details}` : ''}`;
    failureMessages.push(msg);
    console.log(`  ${msg}`);
  }
}

/**
 * Helper to build a JSDOM environment with HTML5 <dialog> polyfill/mock support
 */
function createDomEnvironment(htmlBody) {
  const dom = new JSDOM(`<!DOCTYPE html><html><head></head><body>${htmlBody}</body></html>`, {
    runScripts: 'dangerously',
    url: 'https://example.com/'
  });

  const { window } = dom;

  // Add HTMLDialogElement methods to JSDOM if not natively present
  if (!window.HTMLDialogElement.prototype.showModal) {
    window.HTMLDialogElement.prototype.showModal = function() {
      this.open = true;
      this.setAttribute('open', '');
    };
    window.HTMLDialogElement.prototype.close = function() {
      this.open = false;
      this.removeAttribute('open');
    };
  }

  // Add HTMLMediaElement stubs to silence JSDOM warnings
  window.HTMLMediaElement.prototype.pause = function() { this.paused = true; };
  window.HTMLMediaElement.prototype.load = function() { this.src = ''; };
  window.HTMLMediaElement.prototype.play = function() { this.paused = false; return Promise.resolve(); };


  // Execute view.js within window context
  const scriptEl = window.document.createElement('script');
  scriptEl.textContent = viewJsCode;
  window.document.body.appendChild(scriptEl);

  // Trigger initVideoPopups
  if (typeof window.initVideoPopups === 'function') {
    window.initVideoPopups();
  }

  return { dom, window, document: window.document };
}


console.log(`================================================================`);
console.log(`🧪 CHALLENGER DOM & LIFECYCLE ADVERSARIAL SUITE`);
console.log(`================================================================\n`);

// ---------------------------------------------------------------------------
// TEST SUITE 1: Video Provider URL Parsing Matrix
// ---------------------------------------------------------------------------
console.log(`--- [1] Video Provider URL Parsing & Embed Generation Matrix ---`);

const urlTestMatrix = [
  // YouTube formats
  { input: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', autoplay: true, expectedType: 'youtube', expectedId: 'dQw4w9WgXcQ', desc: 'YouTube standard watch URL' },
  { input: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=120s&feature=emb_title', autoplay: true, expectedType: 'youtube', expectedId: 'dQw4w9WgXcQ', desc: 'YouTube watch URL with query params' },
  { input: 'https://youtu.be/dQw4w9WgXcQ', autoplay: false, expectedType: 'youtube', expectedId: 'dQw4w9WgXcQ', expectedAutoplay: '0', desc: 'YouTube youtu.be short URL with autoplay=0' },
  { input: 'https://www.youtube.com/shorts/dQw4w9WgXcQ', autoplay: true, expectedType: 'youtube', expectedId: 'dQw4w9WgXcQ', desc: 'YouTube shorts URL' },
  { input: 'https://www.youtube.com/embed/dQw4w9WgXcQ', autoplay: true, expectedType: 'youtube', expectedId: 'dQw4w9WgXcQ', desc: 'YouTube embed URL' },
  { input: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ', autoplay: true, expectedType: 'youtube', expectedId: 'dQw4w9WgXcQ', desc: 'YouTube nocookie embed URL' },

  // Vimeo formats
  { input: 'https://vimeo.com/76979871', autoplay: true, expectedType: 'vimeo', expectedId: '76979871', desc: 'Vimeo standard video URL' },
  { input: 'https://vimeo.com/channels/staffpicks/76979871', autoplay: true, expectedType: 'vimeo', expectedId: '76979871', desc: 'Vimeo channels URL' },
  { input: 'https://vimeo.com/groups/name/videos/76979871', autoplay: true, expectedType: 'vimeo', expectedId: '76979871', desc: 'Vimeo groups URL' },
  { input: 'https://player.vimeo.com/video/76979871?autoplay=1', autoplay: false, expectedType: 'vimeo', expectedId: '76979871', expectedAutoplay: '0', desc: 'Vimeo player URL' },

  // Direct video formats
  { input: 'https://example.com/video.mp4', autoplay: true, expectedType: 'direct', desc: 'Direct .mp4 video' },
  { input: 'https://example.com/video.mp4?token=abc123xyz', autoplay: true, expectedType: 'direct', desc: 'Direct .mp4 with query params' },
  { input: 'https://example.com/video.webm', autoplay: true, expectedType: 'direct', desc: 'Direct .webm video' },
  { input: 'https://example.com/video.ogg', autoplay: true, expectedType: 'direct', desc: 'Direct .ogg video' },
  { input: 'https://example.com/video.mov', autoplay: true, expectedType: 'direct', desc: 'Direct .mov video' },

  // Fallback & Malformed
  { input: 'https://example.com/custom-embed-page', autoplay: true, expectedType: 'iframe', desc: 'Generic fallback iframe' },
  { input: '', autoplay: true, expectedType: 'none', desc: 'Empty URL (graceful message)' },
  { input: null, autoplay: true, expectedType: 'none', desc: 'Null URL (graceful message)' }
];

for (const vector of urlTestMatrix) {
  const blockHtml = `
    <div class="video-popup-block">
      <button type="button" id="test-btn" class="video-popup-play-btn" data-dialog-id="test-dlg" data-video-url="${vector.input || ''}" data-autoplay="${vector.autoplay ? '1' : '0'}">Play</button>
      <dialog id="test-dlg" class="video-popup-modal-dialog" aria-modal="true">
        <button type="button" class="video-popup-modal-close" data-dialog-id="test-dlg">✕</button>
        <div class="video-popup-embed-target"></div>
      </dialog>
    </div>
  `;

  const { document } = createDomEnvironment(blockHtml);
  const btn = document.getElementById('test-btn');
  const dlg = document.getElementById('test-dlg');
  const target = dlg.querySelector('.video-popup-embed-target');

  btn.click();

  if (vector.expectedType === 'youtube') {
    const iframe = target.querySelector('iframe');
    const src = iframe ? iframe.getAttribute('src') : '';
    const hasId = src.includes(`youtube-nocookie.com/embed/${vector.expectedId}`);
    const hasAutoplay = vector.expectedAutoplay === '0' ? src.includes('autoplay=0') : src.includes('autoplay=1');
    check(iframe && hasId && hasAutoplay, `Provider [YouTube]: ${vector.desc}`);
  } else if (vector.expectedType === 'vimeo') {
    const iframe = target.querySelector('iframe');
    const src = iframe ? iframe.getAttribute('src') : '';
    const hasId = src.includes(`player.vimeo.com/video/${vector.expectedId}`);
    const hasAutoplay = vector.expectedAutoplay === '0' ? src.includes('autoplay=0') : src.includes('autoplay=1');
    check(iframe && hasId && hasAutoplay, `Provider [Vimeo]: ${vector.desc}`);
  } else if (vector.expectedType === 'direct') {
    const video = target.querySelector('video');
    const src = video ? video.getAttribute('src') : '';
    const hasControls = video ? video.hasAttribute('controls') : false;
    const hasPlaysinline = video ? video.hasAttribute('playsinline') : false;
    check(video && src === vector.input && hasControls && hasPlaysinline, `Provider [Direct HTML5]: ${vector.desc}`);
  } else if (vector.expectedType === 'iframe') {
    const iframe = target.querySelector('iframe');
    check(iframe && iframe.getAttribute('src') === vector.input, `Provider [Fallback Iframe]: ${vector.desc}`);
  } else if (vector.expectedType === 'none') {
    const noUrl = target.querySelector('.video-popup-no-url');
    check(noUrl !== null, `Provider [Empty/Null URL]: ${vector.desc} handled without throwing exception`);
  }
}

// ---------------------------------------------------------------------------
// TEST SUITE 2: WCAG 2.1 AA Focus Containment & Trap Dynamics
// ---------------------------------------------------------------------------
console.log(`\n--- [2] WCAG 2.1 AA Modal Focus Trap & Keyboard Navigation ---`);

const focusTrapHtml = `
  <button id="before-modal" tabindex="0">Before</button>
  <div class="video-popup-block">
    <button type="button" id="trigger-btn" class="video-popup-play-btn" data-dialog-id="trap-dlg" data-video-url="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Play</button>
    <dialog id="trap-dlg" class="video-popup-modal-dialog" aria-modal="true" aria-label="Trap Dialog">
      <button type="button" id="close-btn" class="video-popup-modal-close" data-dialog-id="trap-dlg" tabindex="0">✕</button>
      <div class="video-popup-embed-target"></div>
      <a href="#" id="extra-link" tabindex="0">Extra Focusable Link Inside Modal</a>
    </dialog>
  </div>
  <button id="after-modal" tabindex="0">After</button>
`;

const env2 = createDomEnvironment(focusTrapHtml);
const { document: doc2, window: win2 } = env2;

const triggerBtn = doc2.getElementById('trigger-btn');
const trapDlg = doc2.getElementById('trap-dlg');
const closeBtn = doc2.getElementById('close-btn');
const extraLink = doc2.getElementById('extra-link');

// 2.1 Initial Open & Focus Placement
triggerBtn.click();
check(trapDlg.open === true, 'Modal opens on trigger click');
check(doc2.activeElement === closeBtn, 'Focus automatically shifts to close button upon opening');

// 2.2 Tab Cycling Forward
// Tab from close-btn -> should move to extra-link (last element)
doc2.activeElement.blur();
extraLink.focus();
check(doc2.activeElement === extraLink, 'Focus moved to last element in dialog');

// Tab key on last element -> wraps to first element (close-btn)
const tabEventOnLast = new win2.KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
trapDlg.dispatchEvent(tabEventOnLast);
check(doc2.activeElement === closeBtn, 'Tab key on last focusable element wraps back to first element (close button)');

// 2.3 Shift+Tab Cycling Backward
// Shift+Tab key on first element (close-btn) -> wraps to last element (extra-link)
const shiftTabEventOnFirst = new win2.KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true });
trapDlg.dispatchEvent(shiftTabEventOnFirst);
check(doc2.activeElement === extraLink, 'Shift+Tab key on first focusable element wraps backward to last element');

// 2.4 Focus Restoration on Dismissal Methods
// Method A: Close button click
closeBtn.click();
check(trapDlg.open === false, 'Modal closed via close button');
check(doc2.activeElement === triggerBtn, 'Focus restored to initiating play button after close button click');

// Method B: Escape key press
triggerBtn.click();
check(trapDlg.open === true, 'Modal reopened for Escape test');
const escEvent = new win2.KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true });
trapDlg.dispatchEvent(escEvent);
check(trapDlg.open === false, 'Modal closed via Escape keydown');
check(doc2.activeElement === triggerBtn, 'Focus restored to play button after Escape key dismissal');

// Method C: Native HTML5 cancel event
triggerBtn.click();
check(trapDlg.open === true, 'Modal reopened for cancel event test');
const cancelEvent = new win2.Event('cancel', { bubbles: true, cancelable: true });
trapDlg.dispatchEvent(cancelEvent);
check(trapDlg.open === false, 'Modal closed via native cancel event');
check(doc2.activeElement === triggerBtn, 'Focus restored to play button after cancel event');

// Method D: Backdrop click
triggerBtn.click();
check(trapDlg.open === true, 'Modal reopened for backdrop click test');
const backdropClick = new win2.MouseEvent('click', { bubbles: true, cancelable: true });
trapDlg.dispatchEvent(backdropClick);
check(trapDlg.open === false, 'Modal closed via backdrop click on dialog');
check(doc2.activeElement === triggerBtn, 'Focus restored to play button after backdrop click');

// ---------------------------------------------------------------------------
// TEST SUITE 3: Zero Audio Leakage, Video Teardown & Rapid Stress Concurrency
// ---------------------------------------------------------------------------
console.log(`\n--- [3] Zero Audio Leakage & Teardown under Rapid Concurrency ---`);

const teardownHtml = `
  <div class="video-popup-block" id="block-mp4">
    <button type="button" id="play-mp4" class="video-popup-play-btn" data-dialog-id="dlg-mp4" data-video-url="https://example.com/stream.mp4">Play MP4</button>
    <dialog id="dlg-mp4" class="video-popup-modal-dialog" aria-modal="true">
      <button type="button" id="close-mp4" class="video-popup-modal-close" data-dialog-id="dlg-mp4">✕</button>
      <div class="video-popup-embed-target" id="target-mp4"></div>
    </dialog>
  </div>
`;

const env3 = createDomEnvironment(teardownHtml);
const { document: doc3, window: win3 } = env3;

const playMp4 = doc3.getElementById('play-mp4');
const dlgMp4 = doc3.getElementById('dlg-mp4');
const closeMp4 = doc3.getElementById('close-mp4');
const targetMp4 = doc3.getElementById('target-mp4');

// Open HTML5 video modal
playMp4.click();
const videoEl = targetMp4.querySelector('video');
let pauseCalled = false;
let loadCalled = false;
if (videoEl) {
  videoEl.pause = () => { pauseCalled = true; };
  videoEl.load = () => { loadCalled = true; };
}

// Close HTML5 video modal
closeMp4.click();
check(pauseCalled, 'HTML5 <video>.pause() invoked on modal dismissal to kill audio stream');
check(loadCalled, 'HTML5 <video>.load() invoked to detach media buffer');
check(targetMp4.innerHTML === '', 'HTML5 embed target completely emptied on modal close');

// Stress Test: 100 Rapid Open/Close Cycles
let rapidFailures = 0;
for (let i = 0; i < 100; i++) {
  playMp4.click();
  if (!dlgMp4.open || targetMp4.children.length === 0) rapidFailures++;
  closeMp4.click();
  if (dlgMp4.open || targetMp4.innerHTML !== '') rapidFailures++;
}
check(rapidFailures === 0, '100 rapid sequential open/close cycles executed with 0 DOM corruption or leaked elements');

// ---------------------------------------------------------------------------
// TEST SUITE 4: Multi-Instance Isolation (10 Independent Blocks)
// ---------------------------------------------------------------------------
console.log(`\n--- [4] Multi-Instance Isolation Across 10 Blocks ---`);

let multiHtml = '';
for (let i = 1; i <= 10; i++) {
  multiHtml += `
    <div class="video-popup-block" id="block-${i}">
      <button type="button" id="play-${i}" class="video-popup-play-btn" data-dialog-id="dlg-${i}" data-video-url="https://www.youtube.com/watch?v=video_${i}">Play ${i}</button>
      <dialog id="dlg-${i}" class="video-popup-modal-dialog" aria-modal="true">
        <button type="button" id="close-${i}" class="video-popup-modal-close" data-dialog-id="dlg-${i}">✕</button>
        <div class="video-popup-embed-target" id="target-${i}"></div>
      </dialog>
    </div>
  `;
}

const env4 = createDomEnvironment(multiHtml);
const { document: doc4 } = env4;

let multiIsolationPass = true;
for (let i = 1; i <= 10; i++) {
  const pBtn = doc4.getElementById(`play-${i}`);
  const dEl = doc4.getElementById(`dlg-${i}`);
  const cBtn = doc4.getElementById(`close-${i}`);
  const tEl = doc4.getElementById(`target-${i}`);

  pBtn.click();

  // Verify only this dialog is open and has iframe
  const isOpen = dEl.open;
  const hasIframe = tEl.querySelector('iframe') !== null;
  const otherOpenCount = doc4.querySelectorAll('dialog[open]').length;

  if (!isOpen || !hasIframe || otherOpenCount !== 1) {
    multiIsolationPass = false;
  }

  cBtn.click();

  const isClosed = !dEl.open;
  const isCleaned = tEl.innerHTML === '';
  const isFocusBack = doc4.activeElement === pBtn;

  if (!isClosed || !isCleaned || !isFocusBack) {
    multiIsolationPass = false;
  }
}

check(multiIsolationPass, '10 independent video popup blocks maintain strict 1:1 dialog isolation and focus pairing');

// ---------------------------------------------------------------------------
// TEST SUITE 5: Body Scroll-Lock Management
// ---------------------------------------------------------------------------
console.log(`\n--- [5] Body Scroll-Lock Class Lifecycle ---`);

const env5 = createDomEnvironment(teardownHtml);
const { document: doc5 } = env5;

const p5 = doc5.getElementById('play-mp4');
const c5 = doc5.getElementById('close-mp4');

check(!doc5.body.classList.contains('video-modal-open'), 'Body does not have video-modal-open initially');
p5.click();
check(doc5.body.classList.contains('video-modal-open'), 'Body receives video-modal-open class on open');
c5.click();
check(!doc5.body.classList.contains('video-modal-open'), 'Body video-modal-open class removed on close');

// ---------------------------------------------------------------------------
// SUMMARY
// ---------------------------------------------------------------------------
console.log(`\n================================================================`);
console.log(`📊 DOM & LIFECYCLE SUMMARY: ${passedTests} Passed, ${failedTests} Failed (Total: ${totalTests})`);
console.log(`================================================================\n`);

if (failedTests > 0) {
  failureMessages.forEach(f => console.error(f));
  process.exit(1);
}
process.exit(0);
