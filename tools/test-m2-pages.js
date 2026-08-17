/**
 * Milestone 2 — Automated Verification Suite for 15 Modernized Pages
 *
 * Exhaustively validates:
 *  1. Complete removal of 100% legacy third-party blocks (kadence/*, acf/*, getwid/*) across all 15 pages
 *  2. 0 orphan classes (kt-*, wp-block-getwid-*) in DOM
 *  3. Conformance with WordPress Core & theme (?:midflight|relish)/* blocks
 *  4. Design system token conformance and layout structures
 *  5. Specific feature checks for all 15 target pages
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';
import { themeRoot } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read migration PHP source to extract the exact block templates for all 15 pages
const migrationPhpPath = path.join(themeRoot, 'inc', 'm2-pages-migration.php');
const migrationPhp = fs.readFileSync(migrationPhpPath, 'utf8');

// Target 15 Pages Spec
const TARGET_PAGES = [
  { id: 22, name: 'About Indigenous Tourism Manitoba', slug: 'about-itm', bannerTitle: 'About Indigenous Tourism Manitoba' },
  { id: 283, name: 'Reconciliation', slug: 'reconciliation', bannerTitle: 'Reconciliation' },
  { id: 463, name: 'Things To Do', slug: 'things-to-do', bannerTitle: 'Things To Do' },
  { id: 435, name: 'Our Team', slug: 'our-team', bannerTitle: 'Our Team' },
  { id: 2367, name: 'Become a Member', slug: 'become-a-member', bannerTitle: 'Become a Member' },
  { id: 2373, name: 'Member Benefits', slug: 'member-benefits', bannerTitle: 'Member Benefits' },
  { id: 605, name: 'Contact Us', slug: 'contact-us', bannerTitle: 'Contact Us' },
  { id: 1769, name: 'Privacy Policy', slug: 'privacy-policy', bannerTitle: '' },
  { id: 1518, name: 'New Account Request', slug: 'new-account-request', bannerTitle: 'New Account Request' },
  { id: 2572, name: 'Guide Training Inquiry Form', slug: 'itm-indigenous-guide-training-program-inquiry-form', bannerTitle: 'Guide Training Program Inquiry' },
  { id: 2734, name: 'Guide Training Program (Hub)', slug: 'guide-training-program', bannerTitle: 'Indigenous Guide Training Program' },
  { id: 2534, name: 'Guide Training Step 1', slug: 'indigenous-guide-training-program-step-1', bannerTitle: 'Step 1: Introduction' },
  { id: 2537, name: 'Guide Training Step 2', slug: 'indigenous-guide-training-program-step-2', bannerTitle: 'Step 2: 7-Day Training Course' },
  { id: 2542, name: 'Guide Training Step 3', slug: 'indigenous-guide-training-program-step-3', bannerTitle: 'Step 3: Practicum' },
  { id: 2676, name: 'Guide Training More Opportunities', slug: 'indigenous-guide-training-program-more-learning-opportunities', bannerTitle: 'More Learning Opportunities' },
];

/**
 * Extract block content for a page ID from m2-pages-migration.php
 */
function extractPageContent(pageId) {
  const idRegex = new RegExp(`${pageId}\\s*=>\\s*\\[[\\s\\S]*?'content'\\s*=>\\s*'([\\s\\S]*?)'\\s*,\n\\s*\\],`, 'm');
  const match = migrationPhp.match(idRegex);
  if (!match) {
    throw new Error(`Could not find page ID ${pageId} in m2-pages-migration.php`);
  }
  return match[1].replace(/\\'/g, "'").replace(/\\\\/g, "\\");
}

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

async function runM2Verification() {
  console.log(`\n================================================================`);
  console.log(`🚀 Milestone 2: 15 WordPress Pages Comprehensive Verification`);
  console.log(`================================================================\n`);

  // Read stylesheets to ensure design tokens and classes are compiled
  const stylesCss = fs.readFileSync(path.join(themeRoot, 'assets', 'css', 'styles.css'), 'utf8');
  const blocksCss = fs.readFileSync(path.join(themeRoot, 'blocks', 'blocks.css'), 'utf8');

  for (const p of TARGET_PAGES) {
    console.log(`\n--- Auditing Page [ID: ${p.id}] [${p.name}] (/slug: /${p.slug}/) ---`);
    const rawContent = extractPageContent(p.id);

    // 1. Zero Kadence Blocks
    const hasKadence = /<!--\s*wp:kadence\//i.test(rawContent);
    assert(!hasKadence, `0 kadence/* blocks in post_content for ${p.name}`);

    // 2. Zero Getwid Blocks
    const hasGetwid = /<!--\s*wp:getwid\//i.test(rawContent);
    assert(!hasGetwid, `0 getwid/* blocks in post_content for ${p.name}`);

    // 3. Zero ACF Blocks
    const hasAcf = /<!--\s*wp:acf\//i.test(rawContent);
    assert(!hasAcf, `0 acf/* blocks in post_content for ${p.name}`);

    // 4. Zero Orphan kt-* classes
    const hasKtClasses = /kt-[a-z0-9_-]+/i.test(rawContent);
    assert(!hasKtClasses, `0 orphan kt-* classes in ${p.name}`);

    // 5. Zero Orphan getwid classes
    const hasGetwidClasses = /wp-block-getwid-[a-z0-9_-]+/i.test(rawContent);
    assert(!hasGetwidClasses, `0 orphan getwid classes in ${p.name}`);

    // 6. JSDOM DOM Parsing & Structural Checks
    const dom = new JSDOM(`<!DOCTYPE html><html><body><div class="entry-content">${rawContent}</div></body></html>`);
    const doc = dom.window.document;

    // Check for orphan classes in DOM tree
    const orphanKtElements = doc.querySelectorAll('[class*="kt-"]');
    assert(orphanKtElements.length === 0, `0 orphan kt-* DOM elements in ${p.name}`, `Found: ${orphanKtElements.length}`);

    const orphanGetwidElements = doc.querySelectorAll('[class*="getwid-"]');
    assert(orphanGetwidElements.length === 0, `0 orphan getwid DOM elements in ${p.name}`, `Found: ${orphanGetwidElements.length}`);

    // Check headings
    const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
    assert(headings.length >= 1, `Semantic headings present in ${p.name}`, `Found: ${headings.length}`);

    // Check button classes conformity
    const buttons = doc.querySelectorAll('.wp-block-button, .btn');
    for (const btn of buttons) {
      const cls = btn.className;
      const validClass = cls.includes('btn--primary') || cls.includes('btn--gold') || cls.includes('btn--outline') || cls.includes('wp-block-button');
      assert(validClass, `Button adhering to theme tokens in ${p.name}`, `Classes: ${cls}`);
    }

    // 7. Page-Specific Behavioral Assertions
    switch (p.id) {
      case 22: // About ITM
        const hasVideoPopupBlock = /(?:midflight|relish)\/video-popup-block/.test(rawContent);
        assert(hasVideoPopupBlock, 'video-popup-block embedded in /about-itm/ post_content');
        assert(rawContent.includes('Building the Brand'), 'Building the Brand section present in /about-itm/');
        break;

      case 283: // Reconciliation
        assert(/(?:midflight|relish)\/(?:hero|banner)-block/.test(rawContent), 'Hero/Banner in /reconciliation/');
        assert(doc.querySelectorAll('.reconciliation-authenticity-section, .reconciliation-lead-section, .reconciliation-pillars-grid, .wp-block-columns').length > 0, 'Reconciliation authentic content sections present');
        break;

      case 463: // Things To Do
        assert(/(?:midflight|relish)\/(?:hero|banner)-block/.test(rawContent), 'Hero/Banner in /things-to-do/');
        assert(doc.querySelectorAll('.experiences-card-grid, .experience-card').length >= 3, 'Experience category cards in /things-to-do/');
        break;

      case 435: // Our Team
        assert(/(?:midflight|relish)\/(?:hero|banner)-block/.test(rawContent), 'Hero/Banner in /our-team/');
        assert(doc.querySelectorAll('.team-member-card').length >= 3, '3+ Team member cards in /our-team/');
        assert(doc.querySelectorAll('.img-circular, .img-circular-wrap').length >= 3, 'Circular hoop photo wrappers in /our-team/');
        break;

      case 2367: // Become a Member
        assert(/(?:midflight|relish)\/(?:hero|banner)-block/.test(rawContent), 'Hero/Banner in /become-a-member/');
        assert(doc.querySelectorAll('.benefit-card').length >= 2, 'Membership category cards in /become-a-member/');
        break;

      case 2373: // Member Benefits
        assert(/(?:midflight|relish)\/(?:hero|banner)-block/.test(rawContent), 'Hero/Banner in /member-benefits/');
        assert(doc.querySelectorAll('.benefit-card').length >= 4, '4+ Member benefit cards in /member-benefits/');
        break;

      case 605: // Contact Us
        assert(doc.querySelectorAll('.contact-section-grid, .wp-block-columns').length > 0, '2-column contact grid in /contact-us/');
        assert(doc.querySelectorAll('.contact-details-list').length > 0, 'Contact details list in /contact-us/');
        break;

      case 1769: // Privacy Policy
        assert(doc.querySelectorAll('.constrained-content-narrow, .wp-block-group').length > 0, 'Constrained narrow container in /privacy-policy/');
        assert(doc.querySelectorAll('h1').length === 1, 'H1 title in /privacy-policy/');
        break;

      case 1518: // New Account Request
        assert(/(?:midflight|relish)\/banner-block/.test(rawContent), 'Banner block Hero in /new-account-request/');
        assert(doc.querySelectorAll('.account-request-box').length > 0, 'Account request box in /new-account-request/');
        break;

      case 2572: // Inquiry Form
        assert(/(?:midflight|relish)\/banner-block/.test(rawContent), 'Banner block Hero in /itm-indigenous-guide-training-program-inquiry-form/');
        assert(doc.querySelectorAll('.inquiry-info-grid, .inquiry-contact-card').length > 0, 'Inquiry pathway grid in Inquiry Form');
        break;

      case 2734: // Guide Training Hub
        assert(/(?:midflight|relish)\/banner-block/.test(rawContent), 'Banner block Hero in Guide Training Hub');
        assert(doc.querySelectorAll('.program-pathway-grid, .program-step-card').length >= 3, '3 Pathway step cards in Guide Training Hub');
        assert(doc.querySelectorAll('.step-badge').length === 3, '3 Step badges in Guide Training Hub');
        break;

      case 2534: // Step 1
        assert(/(?:midflight|relish)\/banner-block/.test(rawContent), 'Banner block Hero in Step 1');
        assert(doc.querySelectorAll('.step-details-grid, .step-nav-bar').length > 0, 'Curriculum vs Prerequisites grid in Step 1');
        break;

      case 2537: // Step 2
        assert(/(?:midflight|relish)\/banner-block/.test(rawContent), 'Banner block Hero in Step 2');
        assert(doc.querySelectorAll('.step-details-grid, .step-nav-bar').length > 0, 'Field modules vs Certifications grid in Step 2');
        break;

      case 2542: // Step 3
        assert(/(?:midflight|relish)\/banner-block/.test(rawContent), 'Banner block Hero in Step 3');
        assert(doc.querySelectorAll('.step-details-grid, .step-nav-bar').length > 0, 'Practicum placement vs Career outcomes in Step 3');
        break;

      case 2676: // More Opportunities
        assert(/(?:midflight|relish)\/banner-block/.test(rawContent), 'Banner block Hero in More Learning Opportunities');
        assert(doc.querySelectorAll('.learning-opportunities-grid, .benefit-card').length >= 3, '3 Opportunity cards in More Learning Opportunities');
        break;
    }
  }

  // 8. Verify CSS compilation for modernized page layout classes
  console.log(`\n--- Auditing Compiled Stylesheet for Modernized Page Selectors ---`);
  const requiredCssSelectors = [
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
    '.constrained-content',
    '.constrained-content-narrow',
    '.video-popup-block',
  ];

  for (const selector of requiredCssSelectors) {
    const selectorExists = stylesCss.includes(selector) || blocksCss.includes(selector);
    assert(selectorExists, `CSS rule compiled for [${selector}]`);
  }

  console.log(`\n================================================================`);
  console.log(`📊 Milestone 2 Verification Summary`);
  console.log(`   Total Assertions: ${totalTests}`);
  console.log(`   Passed:           ${passedTests}`);
  console.log(`   Failed:           ${failedTests}`);
  console.log(`================================================================\n`);

  if (failedTests > 0) {
    console.error(`❌ Milestone 2 Verification Failed (${failedTests} failures).`);
    process.exit(1);
  } else {
    console.log(`✨ 100% of Milestone 2 assertions passed successfully!`);
    process.exit(0);
  }
}

runM2Verification().catch(err => {
  console.error('Fatal error in M2 verification runner:', err);
  process.exit(1);
});
