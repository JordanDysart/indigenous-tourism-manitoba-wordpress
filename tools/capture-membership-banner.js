import { createBrowser, BASE_URL } from './config.js';

async function capture() {
	const browser = await createBrowser();

	// Desktop
	const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
	await desktopPage.goto(BASE_URL + '/', { waitUntil: 'networkidle' });
	await desktopPage.evaluate(() => {
		const el = document.querySelector('.membership-cta-section');
		if (el) el.scrollIntoView({ block: 'center' });
	});
	await desktopPage.waitForTimeout(2000);
	const bannerEl = await desktopPage.$('.membership-cta-section');
	if (bannerEl) {
		await bannerEl.screenshot({ path: 'docs/screenshots/components/membership-reveal-banner-desktop.png' });
	}
	await desktopPage.screenshot({ path: 'docs/screenshots/desktop/home-membership-reveal-full.png', fullPage: true });

	// Mobile
	const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
	await mobilePage.goto(BASE_URL + '/', { waitUntil: 'networkidle' });
	await mobilePage.evaluate(() => {
		const el = document.querySelector('.membership-cta-section');
		if (el) el.scrollIntoView({ block: 'center' });
	});
	await mobilePage.waitForTimeout(2000);
	const bannerMobileEl = await mobilePage.$('.membership-cta-section');
	if (bannerMobileEl) {
		await bannerMobileEl.screenshot({ path: 'docs/screenshots/components/membership-reveal-banner-mobile.png' });
	}

	await browser.close();
	console.log('Membership banner screenshots captured successfully!');
}

capture().catch(console.error);
