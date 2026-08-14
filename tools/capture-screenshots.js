/**
 * Automated Screenshot Runner for ITM Theme (kiwatinook)
 * Captures multi-breakpoint full-page and component-level screenshots from the local Lando WordPress environment.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { BASE_URL, PAGES, BREAKPOINTS, createBrowser, screenshotsDir } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const artifactScreenshotsDir = '/Users/jordandysart/.gemini/antigravity/brain/f85324d7-d8ee-4d69-9383-bb4438f8742a/screenshots';

// Ensure output directories exist
['desktop', 'tablet', 'mobile', 'components'].forEach(sub => {
  fs.mkdirSync(path.join(screenshotsDir, sub), { recursive: true });
  fs.mkdirSync(path.join(artifactScreenshotsDir, sub), { recursive: true });
});

function copyToArtifact(srcPath, relativeSubPath) {
  const destPath = path.join(artifactScreenshotsDir, relativeSubPath);
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.copyFileSync(srcPath, destPath);
}

async function captureAll() {
  console.log(`🚀 Starting Screenshot Capture against ${BASE_URL}...`);
  const browser = await createBrowser();
  const manifest = {
    generatedAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    breakpoints: Object.keys(BREAKPOINTS),
    pages: [],
    components: [],
  };

  try {
    for (const [bpKey, bpConfig] of Object.entries(BREAKPOINTS)) {
      console.log(`\n📸 Capturing ${bpConfig.name} breakpoint (${bpConfig.width}x${bpConfig.height})...`);
      
      const context = await browser.newContext({
        viewport: { width: bpConfig.width, height: bpConfig.height },
        deviceScaleFactor: bpConfig.deviceScaleFactor || 1,
        isMobile: !!bpConfig.isMobile,
        hasTouch: !!bpConfig.isMobile,
        ignoreHTTPSErrors: true,
      });

      const page = await context.newPage();

      for (const targetPage of PAGES) {
        const fullUrl = `${BASE_URL}${targetPage.path}`;
        const filenamePrefix = `${targetPage.id}-${bpKey}`;
        const fullpageFilename = `${filenamePrefix}-full.png`;
        const viewportFilename = `${filenamePrefix}-viewport.png`;
        const fullpagePath = path.join(screenshotsDir, bpKey, fullpageFilename);
        const viewportPath = path.join(screenshotsDir, bpKey, viewportFilename);

        process.stdout.write(`  - [${targetPage.name}] (${targetPage.path})... `);

        try {
          await page.goto(fullUrl, { waitUntil: 'networkidle', timeout: 25000 });
          // Short delay for web fonts and animations to settle
          await page.waitForTimeout(1000);

          // Capture viewport
          await page.screenshot({ path: viewportPath, fullPage: false });
          copyToArtifact(viewportPath, path.join(bpKey, viewportFilename));

          // Capture full page
          await page.screenshot({ path: fullpagePath, fullPage: true });
          copyToArtifact(fullpagePath, path.join(bpKey, fullpageFilename));

          console.log(`✅ Saved (${fullpageFilename})`);

          if (bpKey === 'desktop') {
            manifest.pages.push({
              id: targetPage.id,
              name: targetPage.name,
              path: targetPage.path,
              desktopFull: `screenshots/desktop/${fullpageFilename}`,
              desktopViewport: `screenshots/desktop/${viewportFilename}`,
              tabletFull: `screenshots/tablet/${targetPage.id}-tablet-full.png`,
              tabletViewport: `screenshots/tablet/${targetPage.id}-tablet-viewport.png`,
              mobileFull: `screenshots/mobile/${targetPage.id}-mobile-full.png`,
              mobileViewport: `screenshots/mobile/${targetPage.id}-mobile-viewport.png`,
            });
          }
        } catch (err) {
          console.log(`⚠️ Warning: ${err.message}`);
        }
      }

      await context.close();
    }

    // Component-level captures (Desktop & Mobile)
    console.log(`\n🧩 Capturing key UI components...`);
    const compContext = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      ignoreHTTPSErrors: true,
    });
    const compPage = await compContext.newPage();

    // 1. Header & Navigation (Desktop)
    await compPage.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    const headerEl = await compPage.$('header#masthead, .site-header, header');
    if (headerEl) {
      const headerPath = path.join(screenshotsDir, 'components', 'header-desktop.png');
      await headerEl.screenshot({ path: headerPath });
      copyToArtifact(headerPath, 'components/header-desktop.png');
      manifest.components.push({ name: 'Header (Desktop)', file: 'screenshots/components/header-desktop.png' });
      console.log(`  ✅ Header Desktop`);
    }

    // 2. Footer (Desktop)
    const footerEl = await compPage.$('footer#colophon, .site-footer, footer');
    if (footerEl) {
      const footerPath = path.join(screenshotsDir, 'components', 'footer-desktop.png');
      await footerEl.screenshot({ path: footerPath });
      copyToArtifact(footerPath, 'components/footer-desktop.png');
      manifest.components.push({ name: 'Footer (Desktop)', file: 'screenshots/components/footer-desktop.png' });
      console.log(`  ✅ Footer Desktop`);
    }

    // 3. Operator Card Grid & Card (Operators Page)
    await compPage.goto(`${BASE_URL}/operators/`, { waitUntil: 'networkidle' });
    const operatorGrid = await compPage.$('.operator-list-module-items, .wp-block-post-template, .operators-grid');
    if (operatorGrid) {
      const gridPath = path.join(screenshotsDir, 'components', 'operator-card-grid.png');
      await operatorGrid.screenshot({ path: gridPath });
      copyToArtifact(gridPath, 'components/operator-card-grid.png');
      manifest.components.push({ name: 'Operator Card Grid', file: 'screenshots/components/operator-card-grid.png' });
      console.log(`  ✅ Operator Card Grid`);
    }

    const singleCard = await compPage.$('.operator-list-module-items li, .wp-block-post');
    if (singleCard) {
      const cardPath = path.join(screenshotsDir, 'components', 'operator-card-single.png');
      await singleCard.screenshot({ path: cardPath });
      copyToArtifact(cardPath, 'components/operator-card-single.png');
      manifest.components.push({ name: 'Operator Single Card', file: 'screenshots/components/operator-card-single.png' });
      console.log(`  ✅ Operator Single Card`);
    }

    // 4. Operator Filter Bar
    const filterBar = await compPage.$('#operator-filter-form, .operator-search-block, .filter-container');
    if (filterBar) {
      const filterPath = path.join(screenshotsDir, 'components', 'operator-filter-bar.png');
      await filterBar.screenshot({ path: filterPath });
      copyToArtifact(filterPath, 'components/operator-filter-bar.png');
      manifest.components.push({ name: 'Operator Filter Bar', file: 'screenshots/components/operator-filter-bar.png' });
      console.log(`  ✅ Operator Filter Bar`);
    }

    // 5. Mobile Navigation Drawer
    const mobileContext = await browser.newContext({
      viewport: { width: 375, height: 812 },
      isMobile: true,
      hasTouch: true,
      ignoreHTTPSErrors: true,
    });
    const mobPage = await mobileContext.newPage();
    await mobPage.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    const hamburgerBtn = await mobPage.$('.menu-toggle, .navbar-toggler, button[aria-controls="primary-menu"], .hamburger-btn');
    if (hamburgerBtn) {
      await hamburgerBtn.click();
      await mobPage.waitForTimeout(600);
      const mobNavPath = path.join(screenshotsDir, 'components', 'mobile-nav-opened.png');
      await mobPage.screenshot({ path: mobNavPath });
      copyToArtifact(mobNavPath, 'components/mobile-nav-opened.png');
      manifest.components.push({ name: 'Mobile Navigation Drawer', file: 'screenshots/components/mobile-nav-opened.png' });
      console.log(`  ✅ Mobile Nav Drawer`);
    }

    await compContext.close();
    await mobileContext.close();

    // Write manifest
    fs.writeFileSync(
      path.join(screenshotsDir, 'manifest.json'),
      JSON.stringify(manifest, null, 2),
      'utf8'
    );
    fs.writeFileSync(
      path.join(artifactScreenshotsDir, 'manifest.json'),
      JSON.stringify(manifest, null, 2),
      'utf8'
    );

    console.log(`\n✨ Screenshot capture complete! Manifest saved to docs/screenshots/manifest.json`);
  } finally {
    await browser.close();
  }
}

captureAll().catch(err => {
  console.error('Fatal capture error:', err);
  process.exit(1);
});
