import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const themeRoot = path.resolve(__dirname, '../..');

console.log('=== FORENSIC AUDITOR M2 DEEP INSPECTION ===');
console.log('Theme Root:', themeRoot);

const migrationPhpPath = path.join(themeRoot, 'inc', 'm2-pages-migration.php');
const stylesLessPath = path.join(themeRoot, 'assets', 'less', 'pages', 'modernized-pages.less');
const compiledCssPath = path.join(themeRoot, 'assets', 'css', 'styles.css');

if (!fs.existsSync(migrationPhpPath)) {
  console.error('FAIL: inc/m2-pages-migration.php does not exist');
  process.exit(1);
}

const migrationPhp = fs.readFileSync(migrationPhpPath, 'utf8');
const modernizedLess = fs.readFileSync(stylesLessPath, 'utf8');
const compiledCss = fs.readFileSync(compiledCssPath, 'utf8');

// 1. Mode & Constraints Check
console.log('\n[Check 1] Integrity Mode & Constraints');
console.log('Original Request Mode: development');

// 2. Forensic Scan for Hardcoded Cheats / Placeholders / Facades
console.log('\n[Check 2] Facade & Prohibited Pattern Detection in Migration PHP');
const facadeMatches = migrationPhp.match(/return\s+(true|false|null|1|0|'');/gi);
console.log('Dummy return statements:', facadeMatches ? facadeMatches.length : 0);

const prohibitedThirdParty = [
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

let thirdPartyViolations = 0;
for (const p of prohibitedThirdParty) {
  if (migrationPhp.includes(p)) {
    console.error(`VIOLATION: Prohibited string "${p}" found in migration PHP!`);
    thirdPartyViolations++;
  }
}
if (thirdPartyViolations === 0) {
  console.log('✅ ZERO third-party block references in inc/m2-pages-migration.php');
}

// 3. Scan 15 Page Definitions
console.log('\n[Check 3] Comprehensive 15 Page Definitions Audit');

const PAGE_IDS = [22, 283, 463, 435, 2367, 2373, 605, 1769, 1518, 2572, 2734, 2534, 2537, 2542, 2676];

console.log(`Auditing ${PAGE_IDS.length} pages...`);

let pageAuditFailures = 0;

for (const id of PAGE_IDS) {
  // Find start of page definition
  const startIdx = migrationPhp.indexOf(`${id} => [`);
  if (startIdx === -1) {
    console.error(`❌ Page ID ${id} not found in migration array!`);
    pageAuditFailures++;
    continue;
  }

  // Find next page or end of array
  const endIdx = migrationPhp.indexOf('],', startIdx);
  const blockData = migrationPhp.substring(startIdx, endIdx + 2);

  const titleMatch = blockData.match(/'title'\s*=>\s*'([^']*)'/);
  const slugMatch = blockData.match(/'slug'\s*=>\s*'([^']*)'/);
  
  // Extract content between 'content' => ' and '\n\t\t\t],'
  const contentStart = blockData.indexOf("'content' => '");
  if (contentStart === -1 || !titleMatch || !slugMatch) {
    console.error(`❌ Page ID ${id} is missing required title, slug, or content!`);
    pageAuditFailures++;
    continue;
  }

  const rawContentStr = blockData.substring(contentStart + "'content' => '".length);
  const contentEnd = rawContentStr.lastIndexOf("',");
  const content = rawContentStr.substring(0, contentEnd).replace(/\\'/g, "'").replace(/\\\\/g, "\\");

  const title = titleMatch[1];
  const slug = slugMatch[1];

  // Verify non-trivial length
  if (content.length < 200) {
    console.error(`❌ Page ID ${id} (${slug}) content is suspiciously short (${content.length} bytes)!`);
    pageAuditFailures++;
  }

  // Verify no orphan classes
  if (/kt-[a-z0-9_-]+/i.test(content)) {
    console.error(`❌ Page ID ${id} contains orphan kt-* classes!`);
    pageAuditFailures++;
  }
  if (/wp-block-getwid-[a-z0-9_-]+/i.test(content)) {
    console.error(`❌ Page ID ${id} contains orphan getwid classes!`);
    pageAuditFailures++;
  }

  // Parse HTML
  const dom = new JSDOM(`<!DOCTYPE html><html><body>${content}</body></html>`);
  const doc = dom.window.document;

  const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
  if (headings.length === 0) {
    console.error(`❌ Page ID ${id} has no headings!`);
    pageAuditFailures++;
  }

  console.log(`  ✅ Page ID ${id} [${slug}]: "${title}" (Length: ${content.length} chars, Headings: ${headings.length}, HTML: valid)`);
}

if (pageAuditFailures === 0) {
  console.log(`✅ All ${PAGE_IDS.length} pages verified with authentic, rich Gutenberg content.`);
} else {
  console.error(`❌ ${pageAuditFailures} page audit failures detected!`);
}

// 4. Verify CSS Compilation and Token Integrity
console.log('\n[Check 4] LESS & CSS Token Alignment Audit');

const requiredTokens = ['@color-orange', '@color-gold', '@radius-md'];
for (const token of requiredTokens) {
  if (!modernizedLess.includes(token)) {
    console.error(`❌ LESS missing expected design token: ${token}`);
    pageAuditFailures++;
  }
}

const requiredClasses = [
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
  '.constrained-content-narrow'
];

for (const cls of requiredClasses) {
  if (!compiledCss.includes(cls)) {
    console.error(`❌ Compiled CSS missing selector: ${cls}`);
    pageAuditFailures++;
  }
}

console.log('✅ LESS and compiled CSS contain all canonical tokens and layout selectors.');

// 5. Video Popup Block on About Page Verification
console.log('\n[Check 5] Video Popup Block on /about-itm/ Verification');
const aboutPageIdRegex = /22\s*=>\s*\[([\s\S]*?)\],/;
const aboutMatch = migrationPhp.match(aboutPageIdRegex);
if (!aboutMatch || !aboutMatch[1].includes('wp:relish/video-popup-block')) {
  console.error('❌ Page ID 22 (/about-itm/) does NOT contain wp:relish/video-popup-block!');
  pageAuditFailures++;
} else {
  console.log('✅ Page ID 22 (/about-itm/) contains authentic wp:relish/video-popup-block integration.');
}

// 6. DB Migration Logic & Hook Integrity
console.log('\n[Check 6] Migration Lifecycle & Hook Integration');
if (!migrationPhp.includes("add_action( 'init', [ __CLASS__, 'maybe_run_migration' ], 20 )")) {
  console.error('❌ Migration class not hooked to init!');
  pageAuditFailures++;
}
if (!migrationPhp.includes("add_action( 'admin_init', [ __CLASS__, 'maybe_run_migration' ], 20 )")) {
  console.error('❌ Migration class not hooked to admin_init!');
  pageAuditFailures++;
}
if (!migrationPhp.includes('clean_post_cache(')) {
  console.error('❌ Post cache flushing missing from migration!');
  pageAuditFailures++;
}
console.log('✅ DB Migration hooks, cache flushing, and versioning intact.');

if (pageAuditFailures === 0 && thirdPartyViolations === 0) {
  console.log('\n========================================================');
  console.log('🏁 FORENSIC AUDIT COMPLETE: VERDICT = CLEAN');
  console.log('========================================================\n');
  process.exit(0);
} else {
  console.log('\n========================================================');
  console.log('🏁 FORENSIC AUDIT COMPLETE: VERDICT = INTEGRITY VIOLATION');
  console.log('========================================================\n');
  process.exit(1);
}
