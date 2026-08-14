/**
 * Production vs Local Parity Comparison Tool
 * Crawls https://indigenoustourismmanitoba.ca/ and compares assets, pages, and menus against local environment.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { BASE_URL, PAGES, BREAKPOINTS, createBrowser, screenshotsDir, docsDir } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROD_URL = 'https://indigenoustourismmanitoba.ca';
const prodScreenshotsDir = path.join(screenshotsDir, 'production');
const artifactScreenshotsDir = '/Users/jordandysart/.gemini/antigravity/brain/f85324d7-d8ee-4d69-9383-bb4438f8742a/screenshots/production';

fs.mkdirSync(prodScreenshotsDir, { recursive: true });
fs.mkdirSync(artifactScreenshotsDir, { recursive: true });

function copyToArtifact(srcPath, filename) {
  const destPath = path.join(artifactScreenshotsDir, filename);
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.copyFileSync(srcPath, destPath);
}

async function runComparison() {
  console.log(`\n======================================================`);
  console.log(`🌐 Comparing Production (${PROD_URL}) with Local (${BASE_URL})`);
  console.log(`======================================================\n`);

  const browser = await createBrowser();
  const comparisonReport = {
    generatedAt: new Date().toISOString(),
    productionUrl: PROD_URL,
    localUrl: BASE_URL,
    pagesCompared: [],
    missingMediaAssets: [],
    menuAnalysis: {
      productionMenuType: '',
      productionMenuClasses: [],
      productionMenuItems: [],
      localMenuItems: [],
      differences: [],
    },
  };

  try {
    const prodContext = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      ignoreHTTPSErrors: true,
    });
    const prodPage = await prodContext.newPage();

    // 1. Capture Production Pages & Check Missing Assets
    for (const p of PAGES.slice(0, 7)) {
      const prodPageUrl = `${PROD_URL}${p.path}`;
      console.log(`📸 Inspecting Production: ${p.name} (${prodPageUrl})...`);

      try {
        const res = await prodPage.goto(prodPageUrl, { waitUntil: 'networkidle', timeout: 30000 });
        await prodPage.waitForTimeout(1000);

        const prodViewportName = `${p.id}-prod-viewport.png`;
        const prodViewportPath = path.join(prodScreenshotsDir, prodViewportName);
        await prodPage.screenshot({ path: prodViewportPath });
        copyToArtifact(prodViewportPath, prodViewportName);

        // Extract images and assets
        const pageAssets = await prodPage.evaluate(() => {
          const imgs = Array.from(document.querySelectorAll('img')).map(img => img.src);
          const bgImgs = Array.from(document.querySelectorAll('*'))
            .map(el => window.getComputedStyle(el).backgroundImage)
            .filter(bg => bg && bg.startsWith('url'))
            .map(bg => bg.replace(/url\(['"]?(.*?)['"]?\)/i, '$1'));
          return { imgs, bgImgs };
        });

        comparisonReport.pagesCompared.push({
          id: p.id,
          name: p.name,
          status: res ? res.status() : 0,
          prodScreenshot: `screenshots/production/${prodViewportName}`,
          assetsCount: pageAssets.imgs.length + pageAssets.bgImgs.length,
        });

        console.log(`  ✅ Captured (${prodViewportName})`);
      } catch (err) {
        console.log(`  ⚠️ Failed to capture ${p.name}: ${err.message}`);
      }
    }

    // 2. Deep Dive into Production Header / Mega Menu
    console.log(`\n🔍 Analyzing Production Mega Menu Structure...`);
    await prodPage.goto(PROD_URL, { waitUntil: 'networkidle' });
    
    const menuStructure = await prodPage.evaluate(() => {
      const nav = document.querySelector('#site-navigation, .main-navigation, header nav');
      const menuItems = Array.from(document.querySelectorAll('.nav-menu > li, #primary-menu > li')).map(li => {
        const text = li.innerText.split('\n')[0].trim();
        const hasChildren = li.classList.contains('menu-item-has-children') || !!li.querySelector('ul');
        const childLinks = Array.from(li.querySelectorAll('ul li a')).map(a => a.innerText.trim());
        const images = Array.from(li.querySelectorAll('img')).map(img => img.src);
        return { text, hasChildren, childLinks, images, classes: li.className };
      });
      return {
        navClass: nav ? nav.className : 'none',
        menuItems,
      };
    });

    comparisonReport.menuAnalysis.productionMenuItems = menuStructure.menuItems;

    // Hover or click each menu item to see if dropdowns open on production
    const prodNavItems = await prodPage.$$('.nav-menu > li, #primary-menu > li');
    for (let i = 0; i < prodNavItems.length; i++) {
      try {
        const item = prodNavItems[i];
        const text = await item.innerText();
        const cleanText = text.split('\n')[0].trim().replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
        
        // Hover over menu item
        await item.hover();
        await prodPage.waitForTimeout(500);

        // Capture dropdown state
        const menuCropName = `menu-hover-${cleanText || i}.png`;
        const menuCropPath = path.join(prodScreenshotsDir, menuCropName);
        await prodPage.screenshot({ path: menuCropPath });
        copyToArtifact(menuCropPath, menuCropName);
      } catch (e) {}
    }

    await prodContext.close();

    // 3. Compare with Local Mega Menu
    const localContext = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      ignoreHTTPSErrors: true,
    });
    const localPage = await localContext.newPage();
    await localPage.goto(BASE_URL, { waitUntil: 'networkidle' });

    const localMenuStructure = await localPage.evaluate(() => {
      const menuItems = Array.from(document.querySelectorAll('.nav-menu > li, #primary-menu > li')).map(li => {
        const text = li.innerText.split('\n')[0].trim();
        const hasChildren = li.classList.contains('menu-item-has-children') || !!li.querySelector('ul');
        const childLinks = Array.from(li.querySelectorAll('ul li a')).map(a => a.innerText.trim());
        const images = Array.from(li.querySelectorAll('img')).map(img => img.src);
        return { text, hasChildren, childLinks, images, classes: li.className };
      });
      return menuItems;
    });

    comparisonReport.menuAnalysis.localMenuItems = localMenuStructure;
    await localContext.close();

    // Save report
    const reportPath = path.join(docsDir, 'production-parity-analysis.json');
    fs.writeFileSync(reportPath, JSON.stringify(comparisonReport, null, 2), 'utf8');

    console.log(`\n✅ Production comparison complete! Saved to docs/production-parity-analysis.json\n`);

  } finally {
    await browser.close();
  }
}

runComparison().catch(err => {
  console.error('Fatal comparison error:', err);
  process.exit(1);
});
