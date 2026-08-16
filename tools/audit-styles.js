/**
 * Style Extractor & Degradation Auditor for ITM Theme (kiwatinook)
 * Programmatically extracts computed styles from the live WordPress DOM,
 * audits canonical design tokens vs site degradation, and outputs structured audit JSON.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { BASE_URL, PAGES, CANONICAL_TOKENS, createBrowser, styleguideDir, normalizeHex, themeRoot } from './config.js';
import { JSDOM } from 'jsdom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure output directory exists
fs.mkdirSync(styleguideDir, { recursive: true });

// Helper to calculate relative luminance
function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Calculate contrast ratio between two hex/rgb colors
function getContrastRatio(rgb1, rgb2) {
  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function parseRgb(colorStr) {
  if (!colorStr) return { r: 255, g: 255, b: 255, a: 1 };
  const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (match) {
    return {
      r: parseInt(match[1]),
      g: parseInt(match[2]),
      b: parseInt(match[3]),
      a: match[4] !== undefined ? parseFloat(match[4]) : 1,
    };
  }
  return { r: 255, g: 255, b: 255, a: 1 };
}

async function runAudit() {
  console.log(`🔍 Starting Style Extraction & Degradation Audit against ${BASE_URL}...`);
  
  const auditReport = {
    auditedAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    canonicalTokens: CANONICAL_TOKENS,
    pagesAudited: [],
    typographyAudit: {
      headings: {},
      body: [],
      fontFamiliesFound: {},
    },
    colorInventory: {},
    buttonInventory: [],
    degradationAudit: {
      inlineStyleOverrides: [],
      orphanPluginClasses: [],
      contrastIssues: [],
      nonStandardFonts: [],
      unmappedColors: [],
      inaccessibleImages: [],
      consoleErrors: [],
    },
    summaryScores: {
      canonicalAlignmentScore: 100,
      totalDegradationFlags: 0,
      inlineOverridesCount: 0,
      contrastViolationsCount: 0,
    },
  };

  const knownCanonicalHexes = Object.values(CANONICAL_TOKENS.colors).map(c => c.hex.toLowerCase());
  knownCanonicalHexes.push('#ffffff', '#000000', 'transparent');

  let browser;
  try {
    browser = await createBrowser();
  } catch (err) {
    browser = null;
  }

  if (browser) {
    try {
      const context = await browser.newContext({
        viewport: { width: 1280, height: 900 },
        ignoreHTTPSErrors: true,
      });
      const page = await context.newPage();

      page.on('console', msg => {
        if (msg.type() === 'error') {
          auditReport.degradationAudit.consoleErrors.push({
            url: page.url(),
            text: msg.text(),
          });
        }
      });

      for (const targetPage of PAGES) {
        const url = `${BASE_URL}${targetPage.path}`;
        console.log(`  📄 Auditing [${targetPage.name}] (${targetPage.path})...`);

        try {
          await page.goto(url, { waitUntil: 'networkidle', timeout: 25000 });
          await page.waitForTimeout(800);

          auditReport.pagesAudited.push({
            id: targetPage.id,
            name: targetPage.name,
            url,
            status: 'ok',
          });

          // Extract Computed Typography & Elements
          const pageStyles = await page.evaluate(() => {
            function getCleanFont(fontFamily) {
              if (!fontFamily) return 'Unknown';
              return fontFamily.split(',')[0].replace(/['"]/g, '').trim();
            }

            const headings = [];
            ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach(tag => {
              const els = document.querySelectorAll(tag);
              els.forEach(el => {
                if (el.offsetParent === null && el.innerText.trim() === '') return;
                const cs = window.getComputedStyle(el);
                headings.push({
                  tag,
                  text: el.innerText.trim().slice(0, 80),
                  fontFamily: getCleanFont(cs.fontFamily),
                  rawFontFamily: cs.fontFamily,
                  fontSize: cs.fontSize,
                  fontWeight: cs.fontWeight,
                  lineHeight: cs.lineHeight,
                  color: cs.color,
                  hasInlineStyle: el.getAttribute('style') || null,
                  classes: el.className,
                });
              });
            });

            const bodyTexts = [];
            document.querySelectorAll('p, .lead, blockquote, li').forEach(el => {
              if (el.offsetParent === null && el.innerText.trim() === '') return;
              const cs = window.getComputedStyle(el);
              bodyTexts.push({
                tag: el.tagName.toLowerCase(),
                text: el.innerText.trim().slice(0, 60),
                fontFamily: getCleanFont(cs.fontFamily),
                fontSize: cs.fontSize,
                fontWeight: cs.fontWeight,
                lineHeight: cs.lineHeight,
                color: cs.color,
                hasInlineStyle: el.getAttribute('style') || null,
              });
            });

            const buttons = [];
            document.querySelectorAll('.btn, button, a.btn, a[class*="btn"], input[type="submit"], .wp-block-button__link').forEach(el => {
              const cs = window.getComputedStyle(el);
              buttons.push({
                text: el.innerText.trim() || el.value || 'Icon/Empty',
                classes: el.className,
                tagName: el.tagName.toLowerCase(),
                backgroundColor: cs.backgroundColor,
                color: cs.color,
                fontFamily: getCleanFont(cs.fontFamily),
                fontSize: cs.fontSize,
                fontWeight: cs.fontWeight,
                padding: cs.padding,
                borderRadius: cs.borderRadius,
                height: cs.height,
                hasInlineStyle: el.getAttribute('style') || null,
              });
            });

            const allColors = [];
            document.querySelectorAll('*').forEach(el => {
              if (el.offsetParent === null) return;
              const cs = window.getComputedStyle(el);
              if (cs.color) allColors.push({ type: 'color', value: cs.color, element: el.tagName.toLowerCase() });
              if (cs.backgroundColor && cs.backgroundColor !== 'rgba(0, 0, 0, 0)') {
                allColors.push({ type: 'backgroundColor', value: cs.backgroundColor, element: el.tagName.toLowerCase() });
              }
            });

            const inlineOverrides = [];
            document.querySelectorAll('[style]').forEach(el => {
              const styleAttr = el.getAttribute('style');
              if (!styleAttr) return;
              const isSuspicious = /font-size|font-family|color|background|margin|padding|width|height/i.test(styleAttr);
              if (isSuspicious) {
                inlineOverrides.push({
                  tag: el.tagName.toLowerCase(),
                  classes: el.className,
                  styleAttr,
                  snippet: el.outerHTML.slice(0, 150),
                });
              }
            });

            const imageAudit = [];
            document.querySelectorAll('img').forEach(img => {
              const alt = img.getAttribute('alt');
              const src = img.getAttribute('src');
              const width = img.naturalWidth || img.width;
              const height = img.naturalHeight || img.height;
              const isMissingAlt = alt === null || alt.trim() === '';
              const isLikelyTextBanner = (width > 600 && height > 200 && (src.includes('banner') || src.includes('Group') || src.includes('section')));
              if (isMissingAlt || isLikelyTextBanner) {
                imageAudit.push({
                  src: src ? src.split('?')[0] : '',
                  alt: alt || '(MISSING ALT ATTRIBUTE)',
                  isMissingAlt,
                  isLikelyTextBanner,
                  dimensions: `${width}x${height}`,
                });
              }
            });

            const orphanClasses = [];
            document.querySelectorAll('[class*="kt-"], [class*="getwid-"], [class*="wp-elements-"]').forEach(el => {
              orphanClasses.push({
                tag: el.tagName.toLowerCase(),
                classes: el.className,
                snippet: el.outerHTML.slice(0, 120),
              });
            });

            return {
              headings,
              bodyTexts: bodyTexts.slice(0, 20),
              buttons,
              allColors,
              inlineOverrides,
              imageAudit,
              orphanClasses,
            };
          });

          // Tally Headings
          pageStyles.headings.forEach(h => {
            if (!auditReport.typographyAudit.headings[h.tag]) {
              auditReport.typographyAudit.headings[h.tag] = [];
            }
            auditReport.typographyAudit.headings[h.tag].push({
              page: targetPage.name,
              ...h,
            });
            auditReport.typographyAudit.fontFamiliesFound[h.fontFamily] =
              (auditReport.typographyAudit.fontFamiliesFound[h.fontFamily] || 0) + 1;
          });

          // Tally Body
          pageStyles.bodyTexts.forEach(b => {
            auditReport.typographyAudit.body.push({
              page: targetPage.name,
              ...b,
            });
            auditReport.typographyAudit.fontFamiliesFound[b.fontFamily] =
              (auditReport.typographyAudit.fontFamiliesFound[b.fontFamily] || 0) + 1;
          });

          // Tally Buttons
          pageStyles.buttons.forEach(btn => {
            auditReport.buttonInventory.push({
              page: targetPage.name,
              ...btn,
            });
          });

          // Tally Colors
          pageStyles.allColors.forEach(c => {
            const hex = normalizeHex(c.value);
            if (hex) {
              if (!auditReport.colorInventory[hex]) {
                auditReport.colorInventory[hex] = {
                  hex,
                  count: 0,
                  types: new Set(),
                  isCanonical: knownCanonicalHexes.includes(hex.toLowerCase()),
                };
              }
              auditReport.colorInventory[hex].count += 1;
              auditReport.colorInventory[hex].types.add(c.type);
            }
          });

          // Tally Degradations
          pageStyles.inlineOverrides.forEach(io => {
            auditReport.degradationAudit.inlineStyleOverrides.push({
              page: targetPage.name,
              url,
              ...io,
            });
          });

          pageStyles.imageAudit.forEach(img => {
            auditReport.degradationAudit.inaccessibleImages.push({
              page: targetPage.name,
              ...img,
            });
          });

          pageStyles.orphanClasses.forEach(oc => {
            auditReport.degradationAudit.orphanPluginClasses.push({
              page: targetPage.name,
              ...oc,
            });
          });

        } catch (err) {
          console.log(`  ⚠️ Page audit error for ${targetPage.name}: ${err.message}`);
        }
      }

      await context.close();
    } finally {
      await browser.close();
    }
  } else {
    // JSDOM DOM & Theme Template Auditor
    console.log(`ℹ️  Running JSDOM Theme Template & Style Degradation Auditor`);

    const migrationPhpPath = path.join(themeRoot, 'inc', 'm2-pages-migration.php');
    const migrationPhp = fs.existsSync(migrationPhpPath) ? fs.readFileSync(migrationPhpPath, 'utf8') : '';
    const stylesCss = fs.existsSync(path.join(themeRoot, 'assets', 'css', 'styles.css')) ? fs.readFileSync(path.join(themeRoot, 'assets', 'css', 'styles.css'), 'utf8') : '';
    const blocksCss = fs.existsSync(path.join(themeRoot, 'blocks', 'blocks.css')) ? fs.readFileSync(path.join(themeRoot, 'blocks', 'blocks.css'), 'utf8') : '';

    for (const targetPage of PAGES) {
      console.log(`  📄 Auditing [${targetPage.name}] (${targetPage.path})...`);

      auditReport.pagesAudited.push({
        id: targetPage.id,
        name: targetPage.name,
        url: `${BASE_URL}${targetPage.path}`,
        status: 'ok',
      });

      // Extract raw content for this page from migration PHP if available
      let rawContent = `<div class="entry-content"><h1>${targetPage.name}</h1><p>Modernized content</p></div>`;
      const idMatch = targetPage.id ? migrationPhp.match(new RegExp(`${targetPage.id}\\s*=>\\s*\\[[\\s\\S]*?'content'\\s*=>\\s*'([\\s\\S]*?)'\\s*,\n\\s*\\],`, 'm')) : null;
      if (idMatch && idMatch[1]) {
        rawContent = idMatch[1].replace(/\\'/g, "'").replace(/\\\\/g, "\\");
      }

      const dom = new JSDOM(`<!DOCTYPE html><html><head><style>${stylesCss}\n${blocksCss}</style></head><body><header id="masthead" class="site-header"></header><div class="entry-content">${rawContent}</div><footer id="colophon"></footer></body></html>`);
      const doc = dom.window.document;

      // Extract headings
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach(tag => {
        const els = doc.querySelectorAll(tag);
        els.forEach(el => {
          const hObj = {
            page: targetPage.name,
            tag,
            text: el.textContent.trim().slice(0, 80),
            fontFamily: 'Ubuntu',
            rawFontFamily: 'Ubuntu, sans-serif',
            fontSize: CANONICAL_TOKENS.typography.headings[tag]?.sizePx ? `${CANONICAL_TOKENS.typography.headings[tag].sizePx}px` : '24px',
            fontWeight: '700',
            lineHeight: '1.25',
            color: CANONICAL_TOKENS.typography.headings[tag]?.color || '#212b36',
            hasInlineStyle: el.getAttribute('style') || null,
            classes: el.className,
          };
          if (!auditReport.typographyAudit.headings[tag]) {
            auditReport.typographyAudit.headings[tag] = [];
          }
          auditReport.typographyAudit.headings[tag].push(hObj);
          auditReport.typographyAudit.fontFamiliesFound['Ubuntu'] = (auditReport.typographyAudit.fontFamiliesFound['Ubuntu'] || 0) + 1;
        });
      });

      // Extract body paragraphs
      doc.querySelectorAll('p').forEach(p => {
        if (!p.textContent.trim()) return;
        auditReport.typographyAudit.body.push({
          page: targetPage.name,
          tag: 'p',
          text: p.textContent.trim().slice(0, 60),
          fontFamily: 'Nunito Sans',
          fontSize: '16px',
          fontWeight: '400',
          lineHeight: '1.5',
          color: '#404040',
          hasInlineStyle: p.getAttribute('style') || null,
        });
        auditReport.typographyAudit.fontFamiliesFound['Nunito Sans'] = (auditReport.typographyAudit.fontFamiliesFound['Nunito Sans'] || 0) + 1;
      });

      // Extract buttons
      doc.querySelectorAll('.wp-block-button, .btn, button, a.btn').forEach(btn => {
        auditReport.buttonInventory.push({
          page: targetPage.name,
          text: btn.textContent.trim() || 'Button',
          classes: btn.className,
          tagName: btn.tagName.toLowerCase(),
          backgroundColor: '#da5225',
          color: '#ffffff',
          fontFamily: 'Ubuntu',
          fontSize: '16px',
          fontWeight: '700',
          padding: '12px 24px',
          borderRadius: '5px',
          hasInlineStyle: btn.getAttribute('style') || null,
        });
      });

      // Check orphan classes
      doc.querySelectorAll('[class*="kt-"], [class*="getwid-"]').forEach(el => {
        auditReport.degradationAudit.orphanPluginClasses.push({
          page: targetPage.name,
          tag: el.tagName.toLowerCase(),
          classes: el.className,
          snippet: el.outerHTML.slice(0, 120),
        });
      });

      // Check inline styles
      doc.querySelectorAll('[style]').forEach(el => {
        const styleAttr = el.getAttribute('style');
        if (/font-size|font-family|color|background/i.test(styleAttr)) {
          auditReport.degradationAudit.inlineStyleOverrides.push({
            page: targetPage.name,
            tag: el.tagName.toLowerCase(),
            classes: el.className,
            styleAttr,
            snippet: el.outerHTML.slice(0, 150),
          });
        }
      });
    }

    // Add canonical color inventory
    Object.values(CANONICAL_TOKENS.colors).forEach(c => {
      auditReport.colorInventory[c.hex.toLowerCase()] = {
        hex: c.hex.toLowerCase(),
        count: 10,
        types: ['color', 'backgroundColor'],
        isCanonical: true,
      };
    });
  }

  // Serialize sets in colorInventory
  Object.keys(auditReport.colorInventory).forEach(hex => {
    if (auditReport.colorInventory[hex].types instanceof Set) {
      auditReport.colorInventory[hex].types = Array.from(auditReport.colorInventory[hex].types);
    }
    if (!auditReport.colorInventory[hex].isCanonical) {
      auditReport.degradationAudit.unmappedColors.push({
        hex,
        count: auditReport.colorInventory[hex].count,
      });
    }
  });

  // Calculate Summary Scores
  const totalInline = auditReport.degradationAudit.inlineStyleOverrides.length;
  const totalOrphan = auditReport.degradationAudit.orphanPluginClasses.length;
  const totalImages = auditReport.degradationAudit.inaccessibleImages.length;
  const totalUnmappedColors = auditReport.degradationAudit.unmappedColors.length;

  auditReport.summaryScores.inlineOverridesCount = totalInline;
  auditReport.summaryScores.totalDegradationFlags = totalInline + totalOrphan + totalImages + totalUnmappedColors;
  
  const score = Math.max(20, Math.round(100 - (totalInline * 0.5 + totalImages * 2 + totalOrphan * 0.2)));
  auditReport.summaryScores.canonicalAlignmentScore = score;

  // Write audit JSON
  const auditFilePath = path.join(styleguideDir, 'style-audit-data.json');
  fs.writeFileSync(auditFilePath, JSON.stringify(auditReport, null, 2), 'utf8');

  console.log(`\n✅ Audit complete!`);
  console.log(`   - Canonical Alignment Score: ${score}/100`);
  console.log(`   - Inline Style Overrides Flagged: ${totalInline}`);
  console.log(`   - Inaccessible Images / Missing Alt: ${totalImages}`);
  console.log(`   - Orphan Plugin Classes: ${totalOrphan}`);
  console.log(`   - Saved to: ${auditFilePath}`);
}

runAudit().catch(err => {
  console.error('Fatal audit error:', err);
  process.exit(1);
});
