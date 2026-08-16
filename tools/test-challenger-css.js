/**
 * Challenger M1-2: CSS Compilation & Styling Rules Adversarial Auditor
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const themeRoot = path.resolve(__dirname, '..');

const blocksCssPath = path.join(themeRoot, 'blocks', 'blocks.css');
const stylesCssPath = path.join(themeRoot, 'assets', 'css', 'styles.css');
const lessPath = path.join(themeRoot, 'assets', 'less', 'blocks', 'video_popup_block.less');

let passedTests = 0;
let failedTests = 0;

function assert(condition, desc, details = '') {
  if (condition) {
    passedTests++;
    console.log(`  ✅ [PASS] ${desc} ${details ? `(${details})` : ''}`);
  } else {
    failedTests++;
    console.log(`  ❌ [FAIL] ${desc} ${details ? `— ${details}` : ''}`);
  }
}

console.log(`================================================================`);
console.log(`🎨 CHALLENGER CSS & ANIMATION AUDITOR`);
console.log(`================================================================\n`);

const blocksCss = fs.readFileSync(blocksCssPath, 'utf8');
const stylesCss = fs.readFileSync(stylesCssPath, 'utf8');
const lessSrc = fs.readFileSync(lessPath, 'utf8');

// 1. File size checks
console.log(`--- [1] Compiled CSS Files Integrity ---`);
assert(blocksCss.length > 30000, 'blocks/blocks.css is compiled and non-empty', `${blocksCss.length} bytes`);
assert(stylesCss.length > 50000, 'assets/css/styles.css is compiled and non-empty', `${stylesCss.length} bytes`);

// 2. Pulse Keyframe Animation
console.log(`\n--- [2] Pulse Animation Keyframes & Properties ---`);
assert(blocksCss.includes('@keyframes video-popup-pulse'), '@keyframes video-popup-pulse is compiled into blocks.css');
assert(blocksCss.includes('transform: scale(1.7)') || blocksCss.includes('transform:scale(1.7)'), 'Pulse keyframes scale expands to 1.7');
assert(blocksCss.includes('opacity: 0') || blocksCss.includes('opacity:0'), 'Pulse keyframes fade opacity to 0');
assert(blocksCss.includes('.video-popup-play-btn.has-pulse::before') || blocksCss.includes('.video-popup-play-btn.has-pulse:before'), 'Pulse ::before pseudo-element rule exists');
assert(blocksCss.includes('.video-popup-play-btn.has-pulse::after') || blocksCss.includes('.video-popup-play-btn.has-pulse:after'), 'Pulse ::after pseudo-element rule exists');
assert(blocksCss.includes('2.4s') && blocksCss.includes('1.2s'), 'Pulse duration (2.4s) and delay (1.2s) compiled correctly');

// 3. Prefers-Reduced-Motion
console.log(`\n--- [3] Prefers Reduced Motion Accessibility ---`);
assert(blocksCss.includes('prefers-reduced-motion: reduce') || blocksCss.includes('prefers-reduced-motion:reduce'), 'prefers-reduced-motion media query present');
assert(blocksCss.includes('animation: none !important') || blocksCss.includes('animation:none!important'), 'Pulse animation disabled under reduced motion');
assert(blocksCss.includes('display: none !important') || blocksCss.includes('display:none!important'), 'Pseudo pulse rings hidden under reduced motion');

// 4. Aspect Ratios
console.log(`\n--- [4] Aspect Ratio Classes ---`);
assert(blocksCss.includes('aspect-ratio: 16 / 9') || blocksCss.includes('aspect-ratio:16/9') || blocksCss.includes('aspect-ratio: 16/9'), 'ratio-16-9 aspect ratio compiled');
assert(blocksCss.includes('aspect-ratio: 4 / 3') || blocksCss.includes('aspect-ratio:4/3') || blocksCss.includes('aspect-ratio: 4/3'), 'ratio-4-3 aspect ratio compiled');
assert(blocksCss.includes('aspect-ratio: 1 / 1') || blocksCss.includes('aspect-ratio:1/1') || blocksCss.includes('aspect-ratio: 1/1'), 'ratio-1-1 aspect ratio compiled');
assert(blocksCss.includes('aspect-ratio: 21 / 9') || blocksCss.includes('aspect-ratio:21/9') || blocksCss.includes('aspect-ratio: 21/9'), 'ratio-21-9 aspect ratio compiled');

// 5. Modal Dialog & Backdrop
console.log(`\n--- [5] Lightbox Dialog & Backdrop ---`);
assert(blocksCss.includes('dialog.video-popup-modal-dialog'), 'dialog.video-popup-modal-dialog selector compiled');
assert(blocksCss.includes('backdrop-filter: blur(8px)') || blocksCss.includes('backdrop-filter:blur(8px)'), 'Backdrop blur (8px) compiled');
assert(blocksCss.includes('.video-popup-modal-close'), '.video-popup-modal-close selector compiled');
assert(blocksCss.includes('body.video-modal-open'), 'body.video-modal-open scroll lock style compiled');

// 6. Responsive Breakpoint Rules
console.log(`\n--- [6] Responsive Mobile Breakpoint Styles ---`);
assert(blocksCss.includes('max-width: 37.5em') || blocksCss.includes('max-width:37.5em') || blocksCss.includes('max-width: 600px'), 'Mobile breakpoint media query (@breakpoint-sm = 37.5em / 600px) compiled');


console.log(`\n================================================================`);
console.log(`📊 CSS AUDIT SUMMARY: ${passedTests} Passed, ${failedTests} Failed`);
console.log(`================================================================\n`);

if (failedTests > 0) {
  process.exit(1);
}
process.exit(0);
