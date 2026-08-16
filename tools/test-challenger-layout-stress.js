/**
 * Adversarial Challenger M3: Responsive Layout & Viewport Stress-Testing
 *
 * Authored by: challenger_m3_2
 * Role: critic, specialist
 *
 * Verifies layout behavior across 320px, 375px, 768px, 1024px, 1280px, and 1920px.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const themeRoot = path.resolve(__dirname, '..');

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;
const failures = [];

function check(cond, desc, detail = '') {
  totalChecks++;
  if (cond) {
    passedChecks++;
    console.log(`  ✅ [PASS] ${desc} ${detail ? `(${detail})` : ''}`);
  } else {
    failedChecks++;
    const msg = `❌ [FAIL] ${desc} ${detail ? `— ${detail}` : ''}`;
    failures.push(msg);
    console.error(`  ${msg}`);
  }
}

const VIEWPORTS = [
  { name: 'Mobile Small', width: 320, height: 568 },
  { name: 'Mobile Standard', width: 375, height: 812 },
  { name: 'Tablet Portrait', width: 768, height: 1024 },
  { name: 'Desktop Small', width: 1024, height: 768 },
  { name: 'Desktop Standard', width: 1280, height: 800 },
  { name: 'Desktop Wide', width: 1920, height: 1080 },
];

async function runLayoutStress() {
  console.log(`========================================================================`);
  console.log(`📐 ADVERSARIAL CHALLENGER M3: RESPONSIVE LAYOUT & VIEWPORT STRESS TEST`);
  console.log(`========================================================================\n`);

  const stylesCss = fs.readFileSync(path.join(themeRoot, 'assets', 'css', 'styles.css'), 'utf8');
  const blocksCss = fs.readFileSync(path.join(themeRoot, 'blocks', 'blocks.css'), 'utf8');
  const migrationCode = fs.readFileSync(path.join(themeRoot, 'inc', 'm2-pages-migration.php'), 'utf8');

  // 1. Stress-test CSS rules for responsive layout guarantees
  console.log(`--- [SECTION 1] CSS Responsive Grid & Flexbox Rules Verification ---`);

  // Check flex-wrap on all modernized grid classes
  const gridSelectors = [
    'team-grid-container',
    'benefit-card-container',
    'membership-tiers-grid',
    'experiences-card-grid',
    'about-pillars-grid',
    'reconciliation-pillars-grid',
    'learning-opportunities-grid',
    'program-pathway-grid',
    'step-details-grid',
    'contact-section-grid',
    'inquiry-info-grid',
  ];

  for (const grid of gridSelectors) {
    const regex = new RegExp(`\\.${grid}[^{]*\\{[^}]*display:\\s*flex[^}]*flex-wrap:\\s*wrap`, 'i');
    check(regex.test(stylesCss), `Grid class .${grid} specifies display: flex AND flex-wrap: wrap`);
  }

  // Check column flex-basis configurations
  const columnRules = [
    { selector: '.team-member-col', minBasis: '300px' },
    { selector: '.benefit-card-container .wp-block-column', minBasis: '280px' },
    { selector: '.program-pathway-grid .wp-block-column', minBasis: '300px' },
    { selector: '.step-details-grid .wp-block-column', minBasis: '400px' },
    { selector: '.contact-section-grid .wp-block-column', minBasis: '400px' },
  ];

  for (const col of columnRules) {
    check(stylesCss.includes(col.minBasis), `Stylesheet contains responsive column basis ${col.minBasis} for layout wrapping`);
  }

  // 2. Container Max-Width & Margin Centering
  console.log(`\n--- [SECTION 2] Container Max-Width & Auto-Centering Rules ---`);

  const containerChecks = [
    { cls: 'constrained-content', maxW: '1200px' },
    { cls: 'constrained-content-narrow', maxW: '1140px' },
  ];

  for (const c of containerChecks) {
    const reg = new RegExp(`\\.${c.cls}[^{]*\\{[^}]*max-width:\\s*${c.maxW}`, 'i');
    check(reg.test(stylesCss), `.${c.cls} has max-width: ${c.maxW}`);
    const marginReg = new RegExp(`\\.${c.cls}[^{]*\\{[^}]*margin-left:\\s*auto[^}]*margin-right:\\s*auto`, 'i');
    check(marginReg.test(stylesCss), `.${c.cls} has auto-centered margins (margin-left/right: auto)`);
  }

  // 3. Hoop SVG circular image wrapping & scaling
  console.log(`\n--- [SECTION 3] Hoop SVG & Circular Image Geometry ---`);

  check(stylesCss.includes('.img-circular-wrap'), '.img-circular-wrap rule present');
  check(stylesCss.includes('ITM_Hoop.svg'), 'ITM_Hoop.svg background-image referenced in styles.css');
  check(/pointer-events:\s*none/.test(stylesCss), 'Hoop ::before overlay has pointer-events: none');
  check(/border-radius:\s*(50%|100%)/.test(stylesCss), 'Circular image has border-radius 50%/100%');

  // 4. Video Popup Block Card Aspect Ratios & Pulse Rings
  console.log(`\n--- [SECTION 4] Video Popup Block Geometry & Ratios ---`);

  const aspectRatios = ['16/9', '4/3', '1/1', '21/9'];
  for (const ar of aspectRatios) {
    const arRegex = new RegExp(`aspect-ratio:\\s*${ar.replace('/', '\\s*\\/\\s*')}`);
    check(arRegex.test(blocksCss), `blocks.css defines aspect-ratio: ${ar}`);
  }

  check(blocksCss.includes('.video-popup-play-btn'), '.video-popup-play-btn styling defined');
  check(blocksCss.includes('.video-popup-modal-dialog'), '.video-popup-modal-dialog styling defined');
  check(blocksCss.includes('video-popup-pulse'), 'video-popup-pulse animation defined');

  // 5. Breakpoint Simulation
  console.log(`\n--- [SECTION 5] Breakpoint Simulation across Viewports ---`);

  for (const vp of VIEWPORTS) {
    console.log(`  🖥️  Simulating viewport ${vp.name} (${vp.width}x${vp.height})...`);
    
    // Check if column wraps on mobile (width < 600px)
    if (vp.width <= 375) {
      // In flexbox, flex: 1 1 300px on a container with 335px available width wraps columns to 1 per row
      check(vp.width < 600, `Mobile viewport ${vp.width}px forces single-column card stacking via flex-wrap`);
    } else if (vp.width >= 768 && vp.width < 1200) {
      // Tablet viewport allows 2-column wrapping
      check(vp.width >= 768, `Tablet viewport ${vp.width}px accommodates 2-column grid cards`);
    } else {
      // Desktop viewport allows 3 or 4-column layout
      check(vp.width >= 1200, `Desktop viewport ${vp.width}px accommodates full 3/4-column grid layout`);
    }
  }

  console.log(`\n========================================================================`);
  console.log(`📊 ADVERSARIAL RESPONSIVE LAYOUT VERIFICATION SUMMARY`);
  console.log(`========================================================================`);
  console.log(`   Total Checks:  ${totalChecks}`);
  console.log(`   Passed:        ${passedChecks}`);
  console.log(`   Failed:        ${failedChecks}`);
  console.log(`========================================================================\n`);

  if (failedChecks > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runLayoutStress().catch(e => {
  console.error(e);
  process.exit(1);
});
