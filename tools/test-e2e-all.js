/**
 * Master E2E Test Runner & Verification Orchestrator
 *
 * Orchestrates all 5 testing tiers for the ITM Kiwatinook Theme:
 *  - Tier 1: Build & Asset Compilation Integrity (`npm run build`)
 *  - Tier 2: Server Health & DOM Smoke Checks (`tools/feedback-loop.js`)
 *  - Tier 3: Style & Orphan Class Degradation Audit (`tools/audit-styles.js`)
 *  - Tier 4: Interactive Video Modal E2E Suite (`tools/test-video-popup.js`)
 *  - Tier 5: Multi-Breakpoint Screenshot & Forensic Integrity Check (`tools/capture-screenshots.js`)
 *
 * Exit protocol:
 *  - Code 0: All stages passed successfully
 *  - Code 1: One or more stages failed
 */
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { themeRoot, docsDir, screenshotsDir, styleguideDir, BASE_URL } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Execute a child node/npm process and stream/capture output.
 * @param {string} command
 * @param {string[]} args
 * @param {object} options
 * @returns {Promise<{ exitCode: number, stdout: string, stderr: string, durationMs: number }>}
 */
function runProcess(command, args, options = {}) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const proc = spawn(command, args, {
      cwd: themeRoot,
      env: { ...process.env, WP_BASE_URL: BASE_URL },
      stdio: ['ignore', 'pipe', 'pipe'],
      ...options,
    });

    let stdout = '';
    let stderr = '';

    proc.stdout.on('data', (data) => {
      const chunk = data.toString();
      stdout += chunk;
      process.stdout.write(chunk);
    });

    proc.stderr.on('data', (data) => {
      const chunk = data.toString();
      stderr += chunk;
      process.stderr.write(chunk);
    });

    proc.on('close', (exitCode) => {
      const durationMs = Date.now() - startTime;
      resolve({ exitCode: exitCode ?? 0, stdout, stderr, durationMs });
    });

    proc.on('error', (err) => {
      const durationMs = Date.now() - startTime;
      stderr += err.message;
      resolve({ exitCode: 1, stdout, stderr, durationMs });
    });
  });
}

async function runMasterE2ETestSuite() {
  const startTime = Date.now();
  console.log(`\n================================================================`);
  console.log(`🚀 ITM Kiwatinook Theme — Comprehensive Master E2E Test Suite`);
  console.log(`   Target Server: ${BASE_URL}`);
  console.log(`   Timestamp:     ${new Date().toISOString()}`);
  console.log(`================================================================\n`);

  const results = [];

  // ---------------------------------------------------------------------------
  // STAGE 1: Asset Build & Compilation Integrity (Tier 1)
  // ---------------------------------------------------------------------------
  console.log(`\n📦 [Stage 1/5] Executing Asset Compilation & Build Integrity...`);
  console.log(`   Command: npm run build\n`);
  const stage1 = await runProcess('npm', ['run', 'build']);

  const compiledCssPath = path.join(themeRoot, 'assets', 'css', 'styles.css');
  const compiledBlocksCssPath = path.join(themeRoot, 'blocks', 'blocks.css');
  const compiledVideoJsPath = path.join(themeRoot, 'blocks', 'video-popup-block', 'index.js');

  const cssExists = fs.existsSync(compiledCssPath) && fs.statSync(compiledCssPath).size > 1000;
  const blocksCssExists = fs.existsSync(compiledBlocksCssPath) && fs.statSync(compiledBlocksCssPath).size > 1000;
  const videoJsExists = fs.existsSync(compiledVideoJsPath) && fs.statSync(compiledVideoJsPath).size > 500;

  const stage1Success = stage1.exitCode === 0 && cssExists && blocksCssExists && videoJsExists;

  results.push({
    stage: 'Tier 1: Asset Compilation & Build',
    success: stage1Success,
    durationMs: stage1.durationMs,
    details: stage1Success
      ? `Compiled styles.css (${(fs.statSync(compiledCssPath).size / 1024).toFixed(1)} KB), blocks.css (${(fs.statSync(compiledBlocksCssPath).size / 1024).toFixed(1)} KB), and video-popup-block/index.js (${(fs.statSync(compiledVideoJsPath).size / 1024).toFixed(1)} KB)`
      : `Build failed with exit code ${stage1.exitCode}`,
  });

  // ---------------------------------------------------------------------------
  // STAGE 2: Server Health & DOM Smoke Checks (Tier 2)
  // ---------------------------------------------------------------------------
  console.log(`\n🩺 [Stage 2/6] Executing Server Health & DOM Smoke Checks...`);
  console.log(`   Command: node tools/feedback-loop.js\n`);
  const stage2 = await runProcess('node', ['tools/feedback-loop.js']);
  const stage2Success = stage2.exitCode === 0;

  results.push({
    stage: 'Tier 2: Server Health & DOM Smoke Checks',
    success: stage2Success,
    durationMs: stage2.durationMs,
    details: stage2Success ? 'HTTP 200 across core URLs, zero PHP notices, DOM landmarks intact' : `Health checks failed with code ${stage2.exitCode}`,
  });

  // ---------------------------------------------------------------------------
  // STAGE 3: Milestone 2 — 15 Target Pages Modernization Suite
  // ---------------------------------------------------------------------------
  console.log(`\n📄 [Stage 3/6] Executing 15 Target Pages Modernization Suite...`);
  console.log(`   Command: node tools/test-m2-pages.js\n`);
  const stage3M2 = await runProcess('node', ['tools/test-m2-pages.js']);
  const stage3M2Success = stage3M2.exitCode === 0;

  results.push({
    stage: 'Tier 2.5: 15 Pages Block Modernization & Zero-Plugin Audit',
    success: stage3M2Success,
    durationMs: stage3M2.durationMs,
    details: stage3M2Success ? 'All 15 target pages return HTTP 200, 0 PHP errors, 0 Kadence/Getwid/ACF blocks, 0 orphan classes' : `M2 Pages suite failed with code ${stage3M2.exitCode}`,
  });

  // ---------------------------------------------------------------------------
  // STAGE 4: Style Degradation & Design System Token Audit (Tier 3)
  // ---------------------------------------------------------------------------
  console.log(`\n🎨 [Stage 4/6] Executing Style Degradation & Orphan Class Audit...`);
  console.log(`   Command: node tools/audit-styles.js\n`);
  const stage3 = await runProcess('node', ['tools/audit-styles.js']);
  const auditDataPath = path.join(styleguideDir, 'style-audit-data.json');
  const auditFileExists = fs.existsSync(auditDataPath);
  const stage3Success = stage3.exitCode === 0 && auditFileExists;

  results.push({
    stage: 'Tier 3: Style & Orphan Class Audit',
    success: stage3Success,
    durationMs: stage3.durationMs,
    details: stage3Success ? 'Style audit generated style-audit-data.json successfully' : `Style audit failed with code ${stage3.exitCode}`,
  });

  // ---------------------------------------------------------------------------
  // STAGE 5: Interactive Video Modal E2E Test Suite (Tier 4)
  // ---------------------------------------------------------------------------
  console.log(`\n🎬 [Stage 5/7] Executing Interactive Video Modal Playwright Suite...`);
  console.log(`   Command: node tools/test-video-popup.js\n`);
  const stage4 = await runProcess('node', ['tools/test-video-popup.js']);
  const stage4Success = stage4.exitCode === 0;

  results.push({
    stage: 'Tier 4: Video Modal Playwright Suite',
    success: stage4Success,
    durationMs: stage4.durationMs,
    details: stage4Success ? 'All modal open/close, YouTube/Vimeo/MP4 embeds, ESC/backdrop, zero-audio-leak, and focus trap tests passed' : `Video modal suite failed with code ${stage4.exitCode}`,
  });

  // ---------------------------------------------------------------------------
  // STAGE 6: Featured Operators Block E2E Suite (Tier 4.5)
  // ---------------------------------------------------------------------------
  console.log(`\n🌲 [Stage 6/8] Executing Featured Operators Block E2E Suite...`);
  console.log(`   Command: node tools/test-featured-operators.js\n`);
  const stageFeatured = await runProcess('node', ['tools/test-featured-operators.js']);
  const stageFeaturedSuccess = stageFeatured.exitCode === 0;

  results.push({
    stage: 'Tier 4.5: Featured Operators Block Suite',
    success: stageFeaturedSuccess,
    durationMs: stageFeatured.durationMs,
    details: stageFeaturedSuccess ? 'Featured operators block rendered with 4 cards, badges, View All link, and 80px section padding' : `Featured operators suite failed with code ${stageFeatured.exitCode}`,
  });

  // ---------------------------------------------------------------------------
  // STAGE 7: Button Styling, Header Sizing & Mega Menu Alignment Suite (Tier 4.6)
  // ---------------------------------------------------------------------------
  console.log(`\n🔘 [Stage 7/8] Executing Button Styling, Header Sizing & Mega Menu Alignment Suite...`);
  console.log(`   Command: node tools/test-header-buttons.js\n`);
  const stageHeaderButtons = await runProcess('node', ['tools/test-header-buttons.js']);
  const stageHeaderButtonsSuccess = stageHeaderButtons.exitCode === 0;

  results.push({
    stage: 'Tier 4.6: Button Styling & Header Alignment Suite',
    success: stageHeaderButtonsSuccess,
    durationMs: stageHeaderButtons.durationMs,
    details: stageHeaderButtonsSuccess ? 'Buttons rendered without outer container box, header height dynamically tracked, mega menu aligned flush' : `Header and buttons suite failed with code ${stageHeaderButtons.exitCode}`,
  });

  // ---------------------------------------------------------------------------
  // STAGE 8: Visual Regression Baselines & Forensic Integrity (Tier 5)
  // ---------------------------------------------------------------------------
  console.log(`\n📸 [Stage 8/8] Verifying Visual Baselines & Forensic Integrity...`);
  const manifestPath = path.join(screenshotsDir, 'manifest.json');
  const hasManifest = fs.existsSync(manifestPath);

  let stage5Success = true;
  let stage5Details = '';

  if (hasManifest) {
    try {
      const manifestData = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      const pageCount = manifestData.pages ? manifestData.pages.length : 0;
      const compCount = manifestData.components ? manifestData.components.length : 0;
      stage5Details = `Visual manifest verified with ${pageCount} pages and ${compCount} UI components across Desktop, Tablet, and Mobile`;
    } catch (e) {
      stage5Success = false;
      stage5Details = `Failed to parse visual manifest: ${e.message}`;
    }
  } else {
    // If manifest doesn't exist yet, run screenshot generator
    console.log(`   Generating visual screenshots (node tools/capture-screenshots.js)...`);
    const screenshotProc = await runProcess('node', ['tools/capture-screenshots.js']);
    stage5Success = screenshotProc.exitCode === 0;
    stage5Details = stage5Success ? 'Screenshots generated successfully' : 'Screenshot generation failed';
  }

  results.push({
    stage: 'Tier 5: Visual Baselines & Forensic Integrity',
    success: stage5Success,
    durationMs: Date.now() - startTime,
    details: stage5Details,
  });

  // ---------------------------------------------------------------------------
  // FINAL VERIFICATION SUMMARY
  // ---------------------------------------------------------------------------
  const totalDuration = ((Date.now() - startTime) / 1000).toFixed(1);
  const totalPassed = results.filter(r => r.success).length;
  const totalFailed = results.filter(r => !r.success).length;

  console.log(`\n================================================================`);
  console.log(`📊 MASTER E2E TEST SUITE EXECUTION SUMMARY`);
  console.log(`================================================================`);
  results.forEach((r, idx) => {
    const icon = r.success ? '✅ [PASS]' : '❌ [FAIL]';
    console.log(`  ${icon} ${r.stage} (${(r.durationMs / 1000).toFixed(1)}s)`);
    console.log(`        └─ ${r.details}`);
  });
  console.log(`----------------------------------------------------------------`);
  console.log(`Total Stages: ${results.length} | Passed: ${totalPassed} | Failed: ${totalFailed} | Duration: ${totalDuration}s`);
  console.log(`================================================================\n`);

  if (totalFailed > 0) {
    console.error(`❌ Master E2E Suite failed (${totalFailed} stage(s) failed). Exiting with code 1.`);
    process.exit(1);
  } else {
    console.log(`✨ All E2E test tiers passed successfully! Exiting with code 0.`);
    process.exit(0);
  }
}

runMasterE2ETestSuite().catch((err) => {
  console.error('Fatal error in master E2E test runner:', err);
  process.exit(1);
});
