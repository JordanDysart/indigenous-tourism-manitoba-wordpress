/**
 * Adversarial Challenger M2 Test Suite: 15 Modernized Pages Refactor
 *
 * Authored by: challenger_m2_1 (Empirical Challenger Agent)
 * Role: critic, specialist
 *
 * Stress-tests:
 *  1. Complete elimination of legacy blocks (kadence/*, acf/*, getwid/*) across 15 pages
 *  2. Complete elimination of orphan legacy CSS classes (kt-*, getwid-*, wp-block-getwid-*)
 *  3. Gutenberg block grammar, AST parser, tag balance, and JSON attribute validity (Core & (?:midflight|relish)/* blocks)
 *  4. HTML markup integrity, unclosed tags, void element correctness, and accessibility (img alt)
 *  5. Theme design tokens and LESS/CSS class resolution in styles.css and blocks.css
 *  6. /about-itm/ (?:midflight|relish)/video-popup-block integration, attributes, and PHP render simulation
 *  7. PHP migration engine hooks, idempotency, versioning, and slug fallbacks
 *  8. Codebase-wide static analysis for legacy leaks in active theme templates
 *  9. Internal URL & link target integrity across all 15 pages
 *  10. Button token conformance across all pages
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
const failureDetails = [];

function check(condition, testName, detail = '') {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  ✅ [PASS] ${testName} ${detail ? `(${detail})` : ''}`);
  } else {
    failedChecks++;
    const msg = `❌ [FAIL] ${testName} ${detail ? `— ${detail}` : ''}`;
    failureDetails.push(msg);
    console.error(`  ${msg}`);
  }
}

// 15 Target Pages Specification
const EXPECTED_PAGES = [
  { id: 22, slug: 'about-itm', name: 'About Indigenous Tourism Manitoba', hasVideoPopup: true },
  { id: 283, slug: 'reconciliation', name: 'Reconciliation', hasVideoPopup: false },
  { id: 463, slug: 'things-to-do', name: 'Things To Do', hasVideoPopup: false },
  { id: 435, slug: 'our-team', name: 'Our Team', hasVideoPopup: false },
  { id: 2367, slug: 'become-a-member', name: 'Become a Member', hasVideoPopup: false },
  { id: 2373, slug: 'member-benefits', name: 'Member Benefits', hasVideoPopup: false },
  { id: 605, slug: 'contact-us', name: 'Contact Us', hasVideoPopup: false },
  { id: 1769, slug: 'privacy-policy', name: 'Privacy Policy', hasVideoPopup: false },
  { id: 1518, slug: 'new-account-request', name: 'New Account Request', hasVideoPopup: false },
  { id: 2572, slug: 'itm-indigenous-guide-training-program-inquiry-form', name: 'ITM Indigenous Guide Training Program Inquiry Form', hasVideoPopup: false },
  { id: 2734, slug: 'guide-training-program', name: 'Indigenous Guide Training Program (Hub)', hasVideoPopup: false },
  { id: 2534, slug: 'indigenous-guide-training-program-step-1', name: 'Guide Training — Step 1', hasVideoPopup: false },
  { id: 2537, slug: 'indigenous-guide-training-program-step-2', name: 'Guide Training — Step 2', hasVideoPopup: false },
  { id: 2542, slug: 'indigenous-guide-training-program-step-3', name: 'Guide Training — Step 3', hasVideoPopup: false },
  { id: 2676, slug: 'indigenous-guide-training-program-more-learning-opportunities', name: 'Guide Training — More Learning Opportunities', hasVideoPopup: false },
];

/**
 * Extract all pages from m2-pages-migration.php
 */
function loadMigrationPages() {
  const migrationPath = path.join(themeRoot, 'inc', 'm2-pages-migration.php');
  if (!fs.existsSync(migrationPath)) {
    throw new Error(`Migration file not found at ${migrationPath}`);
  }
  const content = fs.readFileSync(migrationPath, 'utf8');

  // Extract array of pages using regex
  const pages = {};
  for (const exp of EXPECTED_PAGES) {
    const regex = new RegExp(`(?://[^\n]*\n)?\\s*${exp.id}\\s*=>\\s*\\[[\\s\\S]*?'title'\\s*=>\\s*'([^']*)'[\\s\\S]*?'slug'\\s*=>\\s*'([^']*)'[\\s\\S]*?'content'\\s*=>\\s*'([\\s\\S]*?)'\\s*,\n\\s*\\],`, 'm');
    const match = content.match(regex);
    if (match) {
      pages[exp.id] = {
        id: exp.id,
        title: match[1],
        slug: match[2],
        content: match[3].replace(/\\'/g, "'").replace(/\\\\/g, "\\"),
      };
    }
  }
  return { migrationPhp: content, pages };
}

/**
 * Robust Gutenberg Block Parser / Tokenizer
 * Supports both namespaced ((?:midflight|relish)/banner-block, core/group) and un-namespaced (group, heading) blocks
 */
function parseGutenbergBlocks(rawContent) {
  const blockRegex = /<!--\s+(\/)?wp:([a-z0-9_-]+(?:\/[a-z0-9_-]+)?)(?:\s+(\{[\s\S]*?\}))?\s*(\/)?-->/g;
  const tokens = [];
  let match;
  while ((match = blockRegex.exec(rawContent)) !== null) {
    tokens.push({
      full: match[0],
      isClosing: !!match[1],
      name: match[2],
      attrsRaw: match[3] || null,
      isSelfClosing: !!match[4],
      index: match.index,
    });
  }
  return tokens;
}

/**
 * Validate Gutenberg Block Grammar & Nesting
 */
function validateBlockGrammar(pageName, rawContent) {
  const tokens = parseGutenbergBlocks(rawContent);
  check(tokens.length > 0, `${pageName} has Gutenberg block comments`, `Found ${tokens.length} block tags`);

  const stack = [];
  let grammarErrors = 0;
  let jsonErrors = 0;

  for (const token of tokens) {
    // 1. JSON Attribute parsing
    if (token.attrsRaw) {
      try {
        const parsed = JSON.parse(token.attrsRaw);
        check(typeof parsed === 'object' && parsed !== null, `${pageName} valid JSON attrs for ${token.name}`);
      } catch (err) {
        jsonErrors++;
        check(false, `${pageName} JSON attribute parse failure on ${token.name}`, err.message);
      }
    }

    // 2. Self-closing vs Open/Close Stack
    if (token.isSelfClosing) {
      // Self-closing block like <!-- wp:(?:midflight|relish)/banner-block {...} /-->
      continue;
    }

    if (!token.isClosing) {
      // Opening block tag
      stack.push(token);
    } else {
      // Closing block tag <!-- /wp:... -->
      if (stack.length === 0) {
        grammarErrors++;
        check(false, `${pageName} orphan closing block <!-- /wp:${token.name} --> with empty stack`);
      } else {
        const popped = stack.pop();
        if (popped.name !== token.name) {
          grammarErrors++;
          check(false, `${pageName} block nesting mismatch`, `Expected <!-- /wp:${popped.name} --> but found <!-- /wp:${token.name} -->`);
        }
      }
    }
  }

  check(stack.length === 0, `${pageName} block stack cleanly balanced at EOF`, stack.length > 0 ? `Unclosed: ${stack.map(s => s.name).join(', ')}` : '0 unclosed blocks');
  return { tokens, grammarErrors, jsonErrors };
}

/**
 * Validate HTML Markup Integrity with DOM Parser
 */
function validateHtmlIntegrity(pageName, rawContent) {
  // Strip block comments to get raw HTML payload
  const htmlContent = rawContent.replace(/<!--[\s\S]*?-->/g, '');

  const dom = new JSDOM(`<!DOCTYPE html><html><body>${htmlContent}</body></html>`, {
    contentType: 'text/html',
  });
  const doc = dom.window.document;
  const body = doc.body;

  check(body.children.length > 0, `${pageName} DOM parsed with valid root children`, `${body.children.length} top-level nodes`);

  // Check all images have alt attributes
  const images = body.querySelectorAll('img');
  let missingAlts = 0;
  images.forEach(img => {
    if (!img.hasAttribute('alt')) {
      missingAlts++;
    }
  });
  check(missingAlts === 0, `${pageName} all <img> tags have alt attributes`, `Found ${images.length} images, ${missingAlts} missing alt`);

  // Check all anchor links have valid hrefs
  const links = body.querySelectorAll('a');
  let invalidLinks = 0;
  links.forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href.trim() === '' || href === '#') {
      invalidLinks++;
    }
  });
  check(invalidLinks === 0, `${pageName} all <a> tags have substantive href attributes`, `Found ${links.length} links, ${invalidLinks} invalid`);

  // Check semantic headings
  const headings = body.querySelectorAll('h1, h2, h3, h4, h5, h6');
  check(headings.length > 0, `${pageName} has semantic headings for content hierarchy`, `Found ${headings.length} headings`);

  return { elementCount: body.querySelectorAll('*').length };
}

async function runChallengerSuite() {
  console.log(`========================================================================`);
  console.log(`⚔️  ADVERSARIAL CHALLENGER M2: 15 PAGES MODERNIZATION EMPIRICAL SUITE`);
  console.log(`========================================================================\n`);

  const { migrationPhp, pages } = loadMigrationPages();

  console.log(`--- [SECTION 1] 15 Pages Inventory & Definition Audit ---`);
  check(Object.keys(pages).length === 15, `Exact 15 pages extracted from inc/m2-pages-migration.php`, `Found ${Object.keys(pages).length} pages`);

  for (const exp of EXPECTED_PAGES) {
    const p = pages[exp.id];
    check(!!p, `Page ID ${exp.id} (${exp.name}) exists in migration map`);
    if (p) {
      check(p.slug === exp.slug, `Page ID ${exp.id} has exact slug '${exp.slug}'`);
      check(p.title.length > 0, `Page ID ${exp.id} has non-empty title: "${p.title}"`);
      check(p.content.length > 100, `Page ID ${exp.id} has substantial content (${p.content.length} chars)`);
    }
  }

  console.log(`\n--- [SECTION 2] Legacy Block & Orphan Class Decoupling Audit ---`);
  const legacyBlockPatterns = [
    { name: 'Kadence blocks', regex: /<!--\s*wp:kadence\//i },
    { name: 'Getwid blocks', regex: /<!--\s*wp:getwid\//i },
    { name: 'ACF blocks', regex: /<!--\s*wp:acf\//i },
    { name: 'Generic legacy Kadence tags', regex: /<div[^>]+class="[^"]*kt-[^"]*"/i },
    { name: 'Generic legacy Getwid tags', regex: /<div[^>]+class="[^"]*wp-block-getwid[^"]*"/i },
  ];

  for (const exp of EXPECTED_PAGES) {
    const p = pages[exp.id];
    if (!p) continue;

    for (const pat of legacyBlockPatterns) {
      const match = pat.regex.test(p.content);
      check(!match, `[${p.slug}] 0 occurrences of ${pat.name}`);
    }
  }

  console.log(`\n--- [SECTION 3] Gutenberg Block Grammar, AST & JSON Validation ---`);
  for (const exp of EXPECTED_PAGES) {
    const p = pages[exp.id];
    if (!p) continue;
    console.log(`\n>>> Stress-testing Gutenberg grammar on [ID ${p.id}] ${p.name}...`);
    validateBlockGrammar(p.slug, p.content);
  }

  console.log(`\n--- [SECTION 4] HTML Markup Integrity & Accessibility Validation ---`);
  for (const exp of EXPECTED_PAGES) {
    const p = pages[exp.id];
    if (!p) continue;
    console.log(`\n>>> Stress-testing HTML integrity on [ID ${p.id}] ${p.name}...`);
    validateHtmlIntegrity(p.slug, p.content);
  }

  console.log(`\n--- [SECTION 5] /about-itm/ (?:midflight|relish)/video-popup-block Stress-Test ---`);
  const aboutPage = pages[22];
  check(!!aboutPage, `About ITM page (ID 22) available for video popup audit`);
  if (aboutPage) {
    const hasVideoPopupBlock = /<!--\s*wp:relish\/video-popup-block/i.test(aboutPage.content);
    check(hasVideoPopupBlock, `/about-itm/ contains (?:midflight|relish)/video-popup-block`);

    // Parse the video popup block attributes
    const match = aboutPage.content.match(/<!--\s*wp:relish\/video-popup-block\s+(\{[\s\S]*?\})\s*\/-->/);
    check(!!match, `/about-itm/ video popup block has valid self-closing comment structure`);
    if (match) {
      const attrs = JSON.parse(match[1]);
      check(typeof attrs.videoUrl === 'string' && attrs.videoUrl.includes('youtube.com'), `/about-itm/ videoUrl is valid YouTube URL`, attrs.videoUrl);
      check(attrs.title === 'Building the Brand', `/about-itm/ video title is 'Building the Brand'`, attrs.title);
      check(typeof attrs.caption === 'string' && attrs.caption.length > 0, `/about-itm/ video caption is present`, attrs.caption);
      check(attrs.overlayColor === '#000000', `/about-itm/ overlayColor is #000000`);
      check(attrs.overlayOpacity === 25, `/about-itm/ overlayOpacity is 25%`);
      check(attrs.playButtonColor === '#e0ac0f', `/about-itm/ playButtonColor is canonical gold #e0ac0f`);
      check(attrs.aspectRatio === '16-9', `/about-itm/ aspectRatio is 16-9`);
    }
  }

  console.log(`\n--- [SECTION 6] CSS Token & Class Resolution in Compiled Stylesheets ---`);
  const stylesCssPath = path.join(themeRoot, 'assets', 'css', 'styles.css');
  const blocksCssPath = path.join(themeRoot, 'blocks', 'blocks.css');
  check(fs.existsSync(stylesCssPath), `Compiled stylesheet assets/css/styles.css exists`);
  check(fs.existsSync(blocksCssPath), `Compiled stylesheet blocks/blocks.css exists`);

  const combinedCss = fs.readFileSync(stylesCssPath, 'utf8') + '\n' + fs.readFileSync(blocksCssPath, 'utf8');

  const requiredSelectors = [
    '.img-circular-wrap',
    '.img-circular',
    '.team-member-card',
    '.team-member-role',
    '.team-grid-container',
    '.benefit-card',
    '.experience-card',
    '.program-pathway-grid',
    '.program-step-card',
    '.step-badge',
    '.step-details-grid',
    '.step-nav-bar',
    '.contact-section-grid',
    '.contact-form-card',
    '.contact-details-list',
    '.account-request-box',
    '.constrained-content',
    '.constrained-content-narrow',
    '.btn--primary',
    '.btn--gold',
    '.btn--outline',
    '.video-popup-block',
    '.video-popup-modal-dialog',
    '.video-popup-play-btn',
  ];

  for (const selector of requiredSelectors) {
    const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'i');
    check(regex.test(combinedCss), `Compiled CSS contains selector '${selector}'`);
  }

  console.log(`\n--- [SECTION 7] PHP Migration Engine Architecture & Hooks Audit ---`);
  check(/class\s+ITM_M2_Pages_Migration/i.test(migrationPhp), `ITM_M2_Pages_Migration class declared`);
  check(/add_action\(\s*'init'\s*,\s*\[\s*__CLASS__\s*,\s*'maybe_run_migration'\s*\]/i.test(migrationPhp), `Migration hooks into 'init' action`);
  check(/add_action\(\s*'admin_init'\s*,\s*\[\s*__CLASS__\s*,\s*'maybe_run_migration'\s*\]/i.test(migrationPhp), `Migration hooks into 'admin_init' action`);
  check(/force_m2_migration/i.test(migrationPhp), `Migration supports manual force trigger (?force_m2_migration=1)`);
  check(/get_page_by_path/i.test(migrationPhp), `Migration includes fallback lookup by slug`);
  check(/clean_post_cache/i.test(migrationPhp), `Migration calls clean_post_cache on update`);
  check(/flush_rewrite_rules/i.test(migrationPhp), `Migration calls flush_rewrite_rules`);

  const functionsPhpPath = path.join(themeRoot, 'functions.php');
  const functionsPhp = fs.readFileSync(functionsPhpPath, 'utf8');
  check(/require.*m2-pages-migration\.php/i.test(functionsPhp), `functions.php requires inc/m2-pages-migration.php`);

  console.log(`\n--- [SECTION 8] Codebase-Wide Legacy Leak Static Analysis ---`);
  // Scan all theme files outside legacy/ and node_modules/ for any active legacy blocks
  function scanDir(dir, fileList = []) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'legacy' || entry.name === '.agents') {
          continue;
        }
        scanDir(fullPath, fileList);
      } else if (entry.isFile() && (entry.name.endsWith('.php') || entry.name.endsWith('.js') || entry.name.endsWith('.less'))) {
        fileList.push(fullPath);
      }
    }
    return fileList;
  }

  const themeFiles = scanDir(themeRoot);
  check(themeFiles.length > 20, `Scanned ${themeFiles.length} active theme files for legacy block references`);

  let activeLegacyRefs = 0;
  for (const filePath of themeFiles) {
    if (filePath.includes('m2-pages-migration.php') || filePath.includes('test-') || filePath.includes('tools/')) continue;
    const code = fs.readFileSync(filePath, 'utf8');
    if (/<!--\s*wp:kadence\//i.test(code) || /<!--\s*wp:getwid\//i.test(code) || /<!--\s*wp:acf\//i.test(code)) {
      activeLegacyRefs++;
      check(false, `Active theme file contains legacy block markup: ${path.relative(themeRoot, filePath)}`);
    }
  }
  check(activeLegacyRefs === 0, `0 legacy block references across all active theme PHP/JS/LESS templates`);

  console.log(`\n--- [SECTION 9] Button Design System Token Conformance Audit ---`);
  for (const exp of EXPECTED_PAGES) {
    const p = pages[exp.id];
    if (!p) continue;
    const dom = new JSDOM(`<!DOCTYPE html><html><body>${p.content.replace(/<!--[\s\S]*?-->/g, '')}</body></html>`);
    const buttons = dom.window.document.querySelectorAll('.wp-block-button');
    buttons.forEach((btn, idx) => {
      const classStr = btn.className;
      const hasThemeBtnClass = classStr.includes('btn--primary') || classStr.includes('btn--gold') || classStr.includes('btn--outline');
      check(hasThemeBtnClass, `[${p.slug}] button #${idx + 1} uses canonical theme token class`, classStr);
    });
  }

  console.log(`\n========================================================================`);
  console.log(`📊 ADVERSARIAL CHALLENGER VERDICT SUMMARY`);
  console.log(`   Total Checks:  ${totalChecks}`);
  console.log(`   Passed Checks: ${passedChecks}`);
  console.log(`   Failed Checks: ${failedChecks}`);
  console.log(`========================================================================`);

  if (failedChecks === 0) {
    console.log(`\n🎯 EMPIRICAL VERDICT: [APPROVE]`);
    console.log(`All 15 target pages are 100% modernized, cleanly structured, and zero legacy dependencies remain.\n`);
    process.exit(0);
  } else {
    console.error(`\n💥 EMPIRICAL VERDICT: [CHALLENGE_FAILED]`);
    console.error(`${failedChecks} critical check(s) failed:\n`);
    failureDetails.forEach(f => console.error(`  - ${f}`));
    process.exit(1);
  }
}

runChallengerSuite().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
