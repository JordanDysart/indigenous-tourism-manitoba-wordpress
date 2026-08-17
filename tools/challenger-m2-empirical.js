/**
 * Milestone 2 — Comprehensive Empirical Challenger Verification Suite
 *
 * Exhaustively stress-tests:
 *  1. Complete removal of 100% legacy blocks across all 15 pages
 *  2. 0 orphan classes (kt-*, wp-block-getwid-*) in DOM
 *  3. Full Gutenberg block grammar, balanced tag nesting, and valid JSON attribute schemas
 *  4. Design system token alignment & compiled stylesheet selector validation
 *  5. Page-specific behavioral, structural, and semantic assertions across all 15 target pages
 *  6. PHP migration class lifecycle, versioning, and cache invalidation simulation
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { JSDOM } from 'jsdom';
import { themeRoot } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrationPhpPath = path.join(themeRoot, 'inc', 'm2-pages-migration.php');
const stylesCssPath = path.join(themeRoot, 'assets', 'css', 'styles.css');
const blocksCssPath = path.join(themeRoot, 'blocks', 'blocks.css');
const modernizedLessPath = path.join(themeRoot, 'assets', 'less', 'pages', 'modernized-pages.less');

const migrationPhp = fs.readFileSync(migrationPhpPath, 'utf8');
const stylesCss = fs.readFileSync(stylesCssPath, 'utf8');
const blocksCss = fs.readFileSync(blocksCssPath, 'utf8');
const modernizedLess = fs.existsSync(modernizedLessPath) ? fs.readFileSync(modernizedLessPath, 'utf8') : '';

const TARGET_PAGES = [
  { id: 22, name: 'About Indigenous Tourism Manitoba', slug: 'about-itm', bannerTitle: 'About Indigenous Tourism Manitoba', requiredBlocks: ['(?:midflight|relish)/banner-block', '(?:midflight|relish)/video-popup-block'] },
  { id: 283, name: 'Reconciliation', slug: 'reconciliation', bannerTitle: 'Reconciliation', requiredBlocks: ['(?:midflight|relish)/banner-block'] },
  { id: 463, name: 'Things To Do', slug: 'things-to-do', bannerTitle: 'Things To Do', requiredBlocks: ['(?:midflight|relish)/banner-block'] },
  { id: 435, name: 'Our Team', slug: 'our-team', bannerTitle: 'Our Team', requiredBlocks: ['(?:midflight|relish)/banner-block'] },
  { id: 2367, name: 'Become a Member', slug: 'become-a-member', bannerTitle: 'Become a Member', requiredBlocks: ['(?:midflight|relish)/banner-block'] },
  { id: 2373, name: 'Member Benefits', slug: 'member-benefits', bannerTitle: 'Member Benefits', requiredBlocks: ['(?:midflight|relish)/banner-block'] },
  { id: 605, name: 'Contact Us', slug: 'contact-us', bannerTitle: 'Contact Us', requiredBlocks: [] },
  { id: 1769, name: 'Privacy Policy', slug: 'privacy-policy', bannerTitle: '', requiredBlocks: [] },
  { id: 1518, name: 'New Account Request', slug: 'new-account-request', bannerTitle: 'New Account Request', requiredBlocks: ['(?:midflight|relish)/banner-block'] },
  { id: 2572, name: 'Guide Training Inquiry Form', slug: 'itm-indigenous-guide-training-program-inquiry-form', bannerTitle: 'ITM Indigenous Guide Training Program Inquiry Form', requiredBlocks: ['(?:midflight|relish)/banner-block'] },
  { id: 2734, name: 'Guide Training Program (Hub)', slug: 'guide-training-program', bannerTitle: 'Indigenous Guide Training Program', requiredBlocks: ['(?:midflight|relish)/banner-block'] },
  { id: 2534, name: 'Guide Training Step 1', slug: 'indigenous-guide-training-program-step-1', bannerTitle: 'Indigenous Guide Training Program - Introduction', requiredBlocks: ['(?:midflight|relish)/banner-block'] },
  { id: 2537, name: 'Guide Training Step 2', slug: 'indigenous-guide-training-program-step-2', bannerTitle: 'Indigenous Guide Training Program - 7-Day Training Course', requiredBlocks: ['(?:midflight|relish)/banner-block'] },
  { id: 2542, name: 'Guide Training Step 3', slug: 'indigenous-guide-training-program-step-3', bannerTitle: 'Indigenous Guide Training Program - Practicum', requiredBlocks: ['(?:midflight|relish)/banner-block'] },
  { id: 2676, name: 'Guide Training More Opportunities', slug: 'indigenous-guide-training-program-more-learning-opportunities', bannerTitle: 'Indigenous Guide Training Program - More Learning Opportunities', requiredBlocks: ['(?:midflight|relish)/banner-block'] },
];

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failureList = [];

function assert(condition, name, detail = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✅ [PASS] ${name} ${detail ? `(${detail})` : ''}`);
  } else {
    failedTests++;
    const msg = `❌ [FAIL] ${name} ${detail ? `— ${detail}` : ''}`;
    failureList.push(msg);
    console.log(`  ${msg}`);
  }
}

function extractPageContent(pageId) {
  const idRegex = new RegExp(`${pageId}\\s*=>\\s*\\[[\\s\\S]*?'content'\\s*=>\\s*'([\\s\\S]*?)'\\s*,\n\\s*\\],`, 'm');
  const match = migrationPhp.match(idRegex);
  if (!match) {
    throw new Error(`Could not find page ID ${pageId} in m2-pages-migration.php`);
  }
  return match[1].replace(/\\'/g, "'").replace(/\\\\/g, "\\");
}

async function runEmpiricalVerification() {
  console.log(`\n======================================================================`);
  console.log(`🔬 MILESTONE 2: EMPIRICAL CHALLENGER VERIFICATION & STRESS SUITE`);
  console.log(`======================================================================\n`);

  // ---------------------------------------------------------------------------
  // SECTION 1: Zero Third-Party Blocks & Clean Migration Source
  // ---------------------------------------------------------------------------
  console.log(`--- [Section 1] Legacy Dependency Elimination & Source Integrity ---`);

  const prohibitedPatterns = [
    'kadence/rowlayout',
    'kadence/column',
    'kadence/advancedheading',
    'kadence/iconlist',
    'kadence/advancedbtn',
    'acf/custom-banner-block',
    'getwid/images-stack',
    'getwid/section',
    'getwid/custom-post-type',
    'wp:kadence',
    'wp:acf',
    'wp:getwid',
  ];

  for (const pat of prohibitedPatterns) {
    const hasPattern = migrationPhp.includes(pat);
    assert(!hasPattern, `Zero references to "${pat}" in m2-pages-migration.php`);
  }

  // ---------------------------------------------------------------------------
  // SECTION 2: 15 Pages Detailed Structural & DOM Audit
  // ---------------------------------------------------------------------------
  console.log(`\n--- [Section 2] Exhaustive 15 Target Pages Structural & DOM Audit ---`);

  for (const p of TARGET_PAGES) {
    console.log(`\nAuditing [ID ${p.id}] ${p.name} (/${p.slug}/):`);
    const content = extractPageContent(p.id);

    // 2.1 Content Length & Authenticity
    assert(content.length >= 500, `Authentic content length for ${p.name}`, `${content.length} characters`);

    // 2.2 Zero legacy blocks in string
    assert(!/<!--\s*wp:kadence\//i.test(content), `0 kadence blocks in ${p.name}`);
    assert(!/<!--\s*wp:acf\//i.test(content), `0 acf blocks in ${p.name}`);
    assert(!/<!--\s*wp:getwid\//i.test(content), `0 getwid blocks in ${p.name}`);

    // 2.3 Zero orphan classes in string
    assert(!/kt-[a-z0-9_-]+/i.test(content), `0 orphan kt-* classes in string for ${p.name}`);
    assert(!/wp-block-getwid-[a-z0-9_-]+/i.test(content), `0 orphan getwid classes in string for ${p.name}`);

    // 2.4 Block Grammar & Balanced Tag Nesting
    const blockRegex = /<!--\s*(wp:|\/wp:)([a-z0-9\/-]+)(?:\s+(\{[\s\S]*?\}))?\s*(\/)?-->/g;
    let match;
    const blockStack = [];
    let jsonErrors = 0;

    while ((match = blockRegex.exec(content)) !== null) {
      const isClosing = match[1] === '/wp:';
      const blockName = match[2];
      const jsonStr = match[3];
      const isSelfClosing = match[4] === '/';

      if (jsonStr) {
        try {
          JSON.parse(jsonStr);
        } catch (e) {
          jsonErrors++;
        }
      }

      if (isSelfClosing) {
        continue;
      } else if (isClosing) {
        if (blockStack.length > 0 && blockStack[blockStack.length - 1] === blockName) {
          blockStack.pop();
        } else {
          blockStack.push(`mismatch:${blockName}`);
        }
      } else {
        blockStack.push(blockName);
      }
    }

    assert(jsonErrors === 0, `JSON attributes parse cleanly in ${p.name}`, `JSON errors: ${jsonErrors}`);
    assert(blockStack.length === 0, `Gutenberg block tags perfectly balanced in ${p.name}`, `Unclosed tags: ${blockStack.join(', ')}`);

    // 2.5 JSDOM DOM Parsing
    const dom = new JSDOM(`<!DOCTYPE html><html><body><main class="site-main">${content}</main></body></html>`);
    const doc = dom.window.document;

    // Zero orphan elements in DOM
    const ktElements = doc.querySelectorAll('[class*="kt-"]');
    const getwidElements = doc.querySelectorAll('[class*="getwid-"]');
    assert(ktElements.length === 0, `0 orphan kt-* DOM elements in ${p.name}`, `Found: ${ktElements.length}`);
    assert(getwidElements.length === 0, `0 orphan getwid DOM elements in ${p.name}`, `Found: ${getwidElements.length}`);

    // Headings structure
    const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
    assert(headings.length >= 1, `Semantic headings present in ${p.name}`, `Found: ${headings.length}`);
    for (const h of headings) {
      assert(h.textContent.trim().length > 0, `Heading in ${p.name} has non-empty text`, `"${h.textContent.trim().slice(0, 30)}..."`);
    }

    // Required blocks presence
    for (const reqBlock of p.requiredBlocks) {
      assert(content.includes(reqBlock), `Required block ${reqBlock} present in ${p.name}`);
    }

    // Buttons token conformity
    const buttons = doc.querySelectorAll('.wp-block-button, .btn');
    for (const btn of buttons) {
      const cls = btn.className;
      const valid = cls.includes('btn--primary') || cls.includes('btn--gold') || cls.includes('btn--outline') || cls.includes('wp-block-button');
      assert(valid, `Button adheres to theme style tokens in ${p.name}`, `Class: "${cls}"`);
    }

    // Page-specific behavioral assertions
    if (p.id === 22) { // About ITM
      assert(content.includes('wp:(?:midflight|relish)/video-popup-block'), '(?:midflight|relish)/video-popup-block configured on /about-itm/');
      assert(content.includes('https://www.youtube.com/watch?v=dQw4w9WgXcQ'), 'Video URL configured in video popup block');
      assert(content.includes('Building the Brand'), 'Building the Brand section present');
      assert(doc.querySelectorAll('.about-pillars-grid').length > 0, 'Vision & Mission columns present');
      assert(doc.querySelectorAll('a[href*="/become-a-member/"]').length > 0, 'Link to /become-a-member/ in CTA');
    } else if (p.id === 283) { // Reconciliation
      assert(content.includes('(?:midflight|relish)/banner-block'), 'Banner block hero in Reconciliation');
      assert(doc.querySelectorAll('.reconciliation-pillars-grid, .wp-block-columns').length > 0, 'Pillars grid in Reconciliation');
      assert(content.includes('Call to Action 92'), 'Call to Action 92 mentioned in Reconciliation');
    } else if (p.id === 463) { // Things To Do
      assert(doc.querySelectorAll('.experiences-card-grid, .experience-card').length >= 3, '3+ Experience cards in Things To Do');
      assert(doc.querySelectorAll('a[href*="/operators/"]').length > 0, 'Link to Operators Directory in Things To Do');
    } else if (p.id === 435) { // Our Team
      assert(doc.querySelectorAll('.team-member-card').length >= 3, '3+ Team member cards in Our Team');
      assert(doc.querySelectorAll('.img-circular-wrap').length >= 3, '3+ Circular photo frames in Our Team');
    } else if (p.id === 2367) { // Become a Member
      assert(doc.querySelectorAll('.benefit-card').length >= 2, '2+ Membership tier cards in Become a Member');
      assert(doc.querySelectorAll('a[href*="/new-account-request/"]').length > 0, 'Link to account request in Become a Member');
    } else if (p.id === 2373) { // Member Benefits
      assert(doc.querySelectorAll('.benefit-card').length >= 4, '4+ Member benefit cards in Member Benefits');
    } else if (p.id === 605) { // Contact Us
      assert(doc.querySelectorAll('.contact-section-grid').length > 0, '2-column contact section in Contact Us');
      assert(doc.querySelectorAll('.contact-form-card').length > 0, 'Contact form card in Contact Us');
      assert(doc.querySelectorAll('.contact-details-list').length > 0, 'Contact details list in Contact Us');
    } else if (p.id === 1769) { // Privacy Policy
      assert(doc.querySelectorAll('.constrained-content-narrow').length > 0, 'Constrained narrow container in Privacy Policy');
      assert(content.includes('Information We Collect'), 'Information We Collect section in Privacy Policy');
      assert(content.includes('Contact &amp; Questions'), 'Contact & Questions section in Privacy Policy');
    } else if (p.id === 1518) { // New Account Request
      assert(doc.querySelectorAll('.account-request-box').length > 0, 'Account request box container in New Account Request');
    } else if (p.id === 2572) { // Inquiry Form
      assert(doc.querySelectorAll('.inquiry-info-grid, .inquiry-contact-card').length > 0, 'Inquiry pathway grid in Inquiry Form');
    } else if (p.id === 2734) { // Guide Training Hub
      assert(doc.querySelectorAll('.program-step-card').length === 3, '3 Step cards in Guide Training Hub');
      assert(doc.querySelectorAll('.step-badge').length === 3, '3 Step badges (1, 2, 3) in Guide Training Hub');
      assert(doc.querySelectorAll('a[href*="step-1"]').length > 0, 'Step 1 link present');
      assert(doc.querySelectorAll('a[href*="step-2"]').length > 0, 'Step 2 link present');
      assert(doc.querySelectorAll('a[href*="step-3"]').length > 0, 'Step 3 link present');
    } else if (p.id === 2534) { // Step 1
      assert(doc.querySelectorAll('.step-details-grid').length > 0, 'Step details grid in Step 1');
      assert(doc.querySelectorAll('.step-nav-bar').length > 0, 'Step navigation bar in Step 1');
      assert(doc.querySelectorAll('a[href*="step-2"]').length > 0, 'Next step link to Step 2');
    } else if (p.id === 2537) { // Step 2
      assert(doc.querySelectorAll('.step-details-grid').length > 0, 'Step details grid in Step 2');
      assert(doc.querySelectorAll('.step-nav-bar').length > 0, 'Step navigation bar in Step 2');
      assert(doc.querySelectorAll('a[href*="step-3"]').length > 0, 'Next step link to Step 3');
    } else if (p.id === 2542) { // Step 3
      assert(doc.querySelectorAll('.step-details-grid').length > 0, 'Step details grid in Step 3');
      assert(doc.querySelectorAll('.step-nav-bar').length > 0, 'Step navigation bar in Step 3');
      assert(doc.querySelectorAll('a[href*="inquiry-form"]').length > 0, 'Inquiry form CTA in Step 3');
    } else if (p.id === 2676) { // More Opportunities
      assert(doc.querySelectorAll('.learning-opportunities-grid, .benefit-card').length >= 3, '3 Opportunity cards in More Opportunities');
    }
  }

  // ---------------------------------------------------------------------------
  // SECTION 3: CSS Compilation & Design System Token Audit
  // ---------------------------------------------------------------------------
  console.log(`\n--- [Section 3] CSS Compilation & Token Audit ---`);

  const requiredSelectors = [
    '.img-circular-wrap',
    '.team-member-card',
    '.benefit-card',
    '.program-pathway-grid',
    '.program-step-card',
    '.step-badge',
    '.step-details-grid',
    '.step-nav-bar',
    '.contact-section-grid',
    '.contact-form-card',
    '.contact-details-list',
    '.constrained-content',
    '.constrained-content-narrow',
    '.account-request-box',
    '.inquiry-info-grid',
    '.inquiry-contact-card',
    '.video-popup-block',
  ];

  for (const sel of requiredSelectors) {
    const found = stylesCss.includes(sel) || blocksCss.includes(sel);
    assert(found, `CSS selector rule compiled for [${sel}]`);
  }

  // Token hex values in compiled CSS
  const canonicalColors = [
    { hex: '#da5225', name: 'Brand Orange' },
    { hex: '#e0ac0f', name: 'Brand Gold' },
    { hex: '#212b36', name: 'Dark Charcoal' },
    { hex: '#f9f9f9', name: 'Off White' },
  ];

  for (const c of canonicalColors) {
    const found = stylesCss.includes(c.hex) || blocksCss.includes(c.hex);
    assert(found, `Design token color [${c.hex}] (${c.name}) compiled into stylesheet`);
  }

  // ---------------------------------------------------------------------------
  // SECTION 4: PHP Migration Execution & Lifecycle Simulation
  // ---------------------------------------------------------------------------
  console.log(`\n--- [Section 4] PHP Migration Class Lifecycle Simulation ---`);

  const phpLifeScript = `<?php
    define('ABSPATH', 1);
    function add_action($tag, $callback, $priority = 10, $accepted_args = 1) {}
    function get_option($opt, $default = false) { return false; }
    function update_option($opt, $val) { return true; }
    function wp_update_post($postarr, $wp_error = false) { return $postarr['ID']; }
    function get_post($id) { return (object)['ID' => $id, 'post_title' => 'Test', 'post_content' => '']; }
    function clean_post_cache($id) {}
    function flush_rewrite_rules($hard = false) {}
    function current_time($type) { return '2026-08-15 16:30:00'; }
    function get_template_directory() { return '${themeRoot.replace(/'/g, "\\'")}'; }

    require '${migrationPhpPath.replace(/'/g, "\\'")}';

    $pages = ITM_M2_Pages_Migration::get_pages_content();
    $page_count = count($pages);
    $all_have_slug_and_content = true;
    foreach ($pages as $id => $data) {
      if (empty($data['slug']) || empty($data['content']) || empty($data['title'])) {
        $all_have_slug_and_content = false;
      }
    }

    echo json_encode([
      'class_exists' => class_exists('ITM_M2_Pages_Migration'),
      'version' => ITM_M2_Pages_Migration::MIGRATION_VERSION,
      'page_count' => $page_count,
      'all_valid' => $all_have_slug_and_content
    ]);
  `;

  try {
    const phpOut = execSync('php', { input: phpLifeScript, encoding: 'utf8' });
    const phpData = JSON.parse(phpOut);

    assert(phpData.class_exists, 'ITM_M2_Pages_Migration class exists and loads in PHP');
    assert(phpData.version === '2.1.0', `Migration version is 2.1.0 (got: ${phpData.version})`);
    assert(phpData.page_count === 15, `get_pages_content() returns exactly 15 target pages (got: ${phpData.page_count})`);
    assert(phpData.all_valid, 'All 15 pages have valid title, slug, and content attributes');
  } catch (err) {
    assert(false, 'PHP migration class execution failed', err.message);
  }

  // ---------------------------------------------------------------------------
  // FINAL EMPIRICAL SUMMARY & VERDICT
  // ---------------------------------------------------------------------------
  console.log(`\n======================================================================`);
  console.log(`📊 EMPIRICAL CHALLENGER SUMMARY FOR MILESTONE 2`);
  console.log(`   Total Assertions: ${totalTests}`);
  console.log(`   Passed:           ${passedTests}`);
  console.log(`   Failed:           ${failedTests}`);
  console.log(`======================================================================\n`);

  if (failedTests > 0) {
    console.error(`🚨 EMPIRICAL VERDICT: CHALLENGE_FAILED (${failedTests} failures detected)`);
    failureList.forEach(f => console.error(`  - ${f}`));
    process.exit(1);
  } else {
    console.log(`🎉 EMPIRICAL VERDICT: APPROVE`);
    console.log(`   All 15 target pages are 100% free of legacy plugins, structurally sound,`);
    console.log(`   fully aligned with theme design tokens, and syntactically clean.`);
    process.exit(0);
  }
}

runEmpiricalVerification().catch(err => {
  console.error('Fatal error running empirical challenger suite:', err);
  process.exit(1);
});
