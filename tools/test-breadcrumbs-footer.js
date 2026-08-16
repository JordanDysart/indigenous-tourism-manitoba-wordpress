/**
 * Breadcrumbs, Redesigned Footer & Human-Readable Sitemap Test Suite
 */
import { createBrowser, BASE_URL } from './config.js';

let browser;
let passCount = 0;
let failCount = 0;

function assert(condition, message, details = '') {
	if (condition) {
		console.log(`  ✅ [PASS] ${message} ${details ? `(${details})` : ''}`);
		passCount++;
	} else {
		console.error(`  ❌ [FAIL] ${message} ${details ? `(${details})` : ''}`);
		failCount++;
	}
}

async function runTests() {
	console.log('\n======================================================');
	console.log('🍞 Breadcrumbs, Redesigned Footer & Sitemap Suite');
	console.log('======================================================\n');

	browser = await createBrowser();
	const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

	try {
		// --- Test Section 1: Breadcrumbs on Single Operator ---
		console.log('--- Test Section 1: Breadcrumbs on Single Operator ---');
		await page.goto(`${BASE_URL}/operator/prairie-berry/`, { waitUntil: 'networkidle' });

		const bodyText = await page.evaluate(() => document.body.innerText);
		assert(!bodyText.includes('[breadcrumb]'), 'Zero unparsed [breadcrumb] shortcode text in DOM');

		const breadcrumbs = await page.$('.breadcrumb-container');
		assert(breadcrumbs !== null, 'Found .breadcrumb-container on /operator/prairie-berry/');

		const breadcrumbLinks = await page.evaluate(() => {
			const items = Array.from(document.querySelectorAll('.breadcrumb-container ol li'));
			return items.map((li) => ({
				text: li.querySelector('span[itemprop="name"]')?.innerText || li.innerText,
				href: li.querySelector('a')?.getAttribute('href'),
			}));
		});

		assert(breadcrumbLinks.length >= 2, `Breadcrumb has at least 2 items (Found ${breadcrumbLinks.length})`);
		assert(breadcrumbLinks[0]?.text?.includes('Operators'), `First crumb is Operators (${breadcrumbLinks[0]?.text})`);
		assert(breadcrumbLinks[0]?.href?.includes('/operators'), `First crumb links to /operators/ (${breadcrumbLinks[0]?.href})`);
		assert(breadcrumbLinks[1]?.text?.includes('Prairie Berry'), `Second crumb is Prairie Berry (${breadcrumbLinks[1]?.text})`);

		// --- Test Section 2: Redesigned 4-Column Modern Footer ---
		console.log('\n--- Test Section 2: Redesigned 4-Column Modern Footer ---');
		await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

		const footer = await page.$('footer.site-footer');
		assert(footer !== null, 'Found footer.site-footer in DOM');

		const footerBrand = await page.evaluate(() => {
			const logo = document.querySelector('.site-footer__logo img');
			const tagline = document.querySelector('.site-footer__tagline')?.textContent?.trim();
			const mission = document.querySelector('.site-footer__mission')?.textContent?.trim();
			const socialLinks = Array.from(document.querySelectorAll('.site-footer__social-link')).map((a) => a.getAttribute('href'));
			return {
				hasLogo: Boolean(logo && logo.getAttribute('src')),
				logoSrc: logo?.getAttribute('src'),
				tagline,
				hasMission: Boolean(mission && mission.length > 20),
				socialCount: socialLinks.length,
				socialLinks,
			};
		});

		assert(footerBrand.hasLogo, `Footer brand logo present (${footerBrand.logoSrc})`);
		assert(footerBrand.tagline === 'Adventure to Understanding', `Footer tagline matches expected (${footerBrand.tagline})`);
		assert(footerBrand.hasMission, 'Footer mission narrative present');
		assert(footerBrand.socialCount >= 4, `Footer has at least 4 social media links (Found ${footerBrand.socialCount})`);

		const footerNavCols = await page.evaluate(() => {
			const headings = Array.from(document.querySelectorAll('.site-footer__nav-heading')).map((h) => h.textContent.trim());
			const links = Array.from(document.querySelectorAll('.site-footer__nav-list a')).map((a) => ({
				text: a.textContent.trim(),
				href: a.getAttribute('href'),
			}));
			return { headings, linkCount: links.length, links };
		});

		assert(footerNavCols.headings.includes('Explore'), 'Footer has "Explore" navigation column');
		assert(footerNavCols.headings.includes('About ITM'), 'Footer has "About ITM" navigation column');
		assert(footerNavCols.headings.some((h) => h.includes('Programs')), 'Footer has "Programs & Members" column');
		assert(footerNavCols.linkCount >= 10, `Footer contains structured navigation links (Count: ${footerNavCols.linkCount})`);

		const footerBottom = await page.evaluate(() => {
			const copyright = document.querySelector('.site-footer__copyright')?.textContent?.trim();
			const territory = document.querySelector('.site-footer__territory')?.textContent?.trim();
			const legalLinks = Array.from(document.querySelectorAll('.site-footer__legal a')).map((a) => a.getAttribute('href'));
			return { copyright, territory, legalLinks };
		});

		const currentYear = new Date().getFullYear().toString();
		assert(footerBottom.copyright?.includes(currentYear), `Footer copyright includes current year (${footerBottom.copyright})`);
		assert(footerBottom.territory?.includes('Treaty One'), `Footer contains Treaty One territory acknowledgment (${footerBottom.territory})`);
		assert(footerBottom.legalLinks.some((l) => l?.includes('/privacy-policy')), 'Footer legal links include Privacy Policy');
		assert(footerBottom.legalLinks.some((l) => l?.includes('/sitemap')), 'Footer legal links include Sitemap');

		// --- Test Section 3: Human-Readable Sitemap Page ---
		console.log('\n--- Test Section 3: Human-Readable Sitemap Page ---');
		const sitemapResponse = await page.goto(`${BASE_URL}/sitemap/`, { waitUntil: 'networkidle' });
		assert(sitemapResponse.status() === 200, `Sitemap page returns HTTP 200 (Status: ${sitemapResponse.status()})`);

		const sitemapData = await page.evaluate(() => {
			const cards = Array.from(document.querySelectorAll('.sitemap-card')).map((card) => ({
				badge: card.querySelector('.sitemap-card__badge')?.textContent?.trim(),
				title: card.querySelector('.sitemap-card__title')?.textContent?.trim(),
				linksCount: card.querySelectorAll('.sitemap-list li a').length,
			}));
			return {
				cardsCount: cards.length,
				cards,
			};
		});

		assert(sitemapData.cardsCount >= 6, `Sitemap contains organized category cards (Count: ${sitemapData.cardsCount})`);
		assert(sitemapData.cards.some((c) => c.badge === 'Explore'), 'Sitemap has Explore card');
		assert(sitemapData.cards.some((c) => c.badge === 'Regions'), 'Sitemap has Regions card');
		assert(sitemapData.cards.some((c) => c.badge === 'Categories'), 'Sitemap has Categories card');
		assert(sitemapData.cards.some((c) => c.badge === 'Training'), 'Sitemap has Guide Training card');
		assert(sitemapData.cards.some((c) => c.badge === 'About ITM'), 'Sitemap has About ITM card');
		assert(sitemapData.cards.some((c) => c.badge === 'Industry'), 'Sitemap has Industry / Membership card');

		// Take screenshots
		console.log('\n--- Capturing Verification Screenshots ---');
		await page.goto(`${BASE_URL}/operator/prairie-berry/`, { waitUntil: 'networkidle' });
		const bcEl = await page.$('.breadcrumb-container');
		if (bcEl) {
			await bcEl.screenshot({ path: 'docs/screenshots/components/breadcrumbs-desktop.png' });
			console.log('  📸 Saved docs/screenshots/components/breadcrumbs-desktop.png');
		}

		await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
		await page.evaluate(() => {
			const header = document.querySelector('#masthead');
			if (header) header.style.display = 'none';
		});
		const footerEl = await page.$('.site-footer');
		if (footerEl) {
			await footerEl.scrollIntoViewIfNeeded();
			await page.waitForTimeout(500);
			await footerEl.screenshot({ path: 'docs/screenshots/components/footer-redesigned-desktop.png' });
			console.log('  📸 Saved docs/screenshots/components/footer-redesigned-desktop.png');
		}

		// Mobile Footer
		await page.setViewportSize({ width: 390, height: 844 });
		await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
		await page.evaluate(() => {
			const header = document.querySelector('#masthead');
			if (header) header.style.display = 'none';
		});
		const footerMobileEl = await page.$('.site-footer');
		if (footerMobileEl) {
			await footerMobileEl.scrollIntoViewIfNeeded();
			await page.waitForTimeout(500);
			await footerMobileEl.screenshot({ path: 'docs/screenshots/components/footer-redesigned-mobile.png' });
			console.log('  📸 Saved docs/screenshots/components/footer-redesigned-mobile.png');
		}

		// Sitemap Desktop
		await page.setViewportSize({ width: 1440, height: 900 });
		await page.goto(`${BASE_URL}/sitemap/`, { waitUntil: 'networkidle' });
		await page.screenshot({ path: 'docs/screenshots/desktop/sitemap-desktop-full.png', fullPage: true });
		console.log('  📸 Saved docs/screenshots/desktop/sitemap-desktop-full.png');
	} catch (error) {
		console.error('Fatal error during test run:', error);
		failCount++;
	} finally {
		if (browser) {
			await browser.close();
		}
	}

	console.log('\n------------------------------------------------------');
	console.log(`📊 Summary: ${passCount} Passed, ${failCount} Failures`);
	console.log('------------------------------------------------------\n');

	if (failCount > 0) {
		process.exit(1);
	}
}

runTests();
