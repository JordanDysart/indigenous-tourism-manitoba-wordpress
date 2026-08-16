import { createBrowser, BASE_URL } from './config.js';

async function auditGutenbergEditor() {
	const browser = await createBrowser();
	const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

	console.log('Logging in to WordPress Admin...');
	await page.goto(`${BASE_URL}/wp-login.php`, { waitUntil: 'networkidle' });
	await page.fill('#user_login', 'jdysart');
	await page.fill('#user_pass', 'adminpass123');
	await page.click('#wp-submit');
	await page.waitForNavigation({ waitUntil: 'networkidle' });

	console.log('Login successful! URL:', page.url());

	const pageIdsToTest = [
		{ id: 2, name: 'Home' },
		{ id: 22, name: 'About ITM' },
		{ id: 283, name: 'Reconciliation' },
		{ id: 463, name: 'Things To Do' },
		{ id: 435, name: 'Our Team' },
		{ id: 2367, name: 'Become a Member' },
		{ id: 2373, name: 'Member Benefits' },
		{ id: 605, name: 'Contact Us' },
		{ id: 1769, name: 'Privacy Policy' },
		{ id: 1518, name: 'New Account Request' },
		{ id: 2572, name: 'Guide Training Inquiry Form' },
		{ id: 2734, name: 'Guide Training Hub' },
		{ id: 2534, name: 'Guide Training Step 1' },
		{ id: 2537, name: 'Guide Training Step 2' },
		{ id: 2542, name: 'Guide Training Step 3' },
		{ id: 2676, name: 'Guide Training More Opportunities' },
	];

	const validationErrors = [];

	for (const p of pageIdsToTest) {
		console.log(`\n📄 Testing Editor for Post ${p.id} (${p.name})...`);
		const consoleLogs = [];

		const listener = (msg) => {
			const text = msg.text();
			if (
				text.includes('Block validation') ||
				text.includes('invalid') ||
				text.includes('deprecated') ||
				msg.type() === 'error' ||
				msg.type() === 'warning'
			) {
				consoleLogs.push(`[${msg.type()}] ${text}`);
			}
		};

		page.on('console', listener);

		await page.goto(`${BASE_URL}/wp-admin/post.php?post=${p.id}&action=edit`, {
			waitUntil: 'domcontentloaded',
			timeout: 30000,
		});

		// Wait for editor container
		try {
			await page.waitForSelector('.edit-post-visual-editor, .block-editor-layout__content, iframe[name="editor-canvas"]', {
				timeout: 12000,
			});
		} catch (e) {
			console.log('   Editor container wait timeout');
		}

		await page.waitForTimeout(3000);

		// Get canvas context (iframe if present, else page)
		const iframeEl = await page.$('iframe[name="editor-canvas"]');
		const canvas = iframeEl ? await iframeEl.contentFrame() : page;

		// Look for invalid block warnings in the canvas DOM
		const invalidBlockElements = await canvas.$$eval(
			'.block-editor-warning, .has-warning, [aria-label*="Block: Warning"], .block-editor-block-list__block[data-type*="invalid"]',
			(els) =>
				els.map((el) => ({
					text: el.innerText.trim(),
					className: el.className,
				}))
		).catch(() => []);

		// Check for "This block contains unexpected or invalid content"
		const invalidTexts = await canvas.$$eval(
			'*:has-text("unexpected or invalid content")',
			(els) => els.map((el) => el.innerText.trim())
		).catch(() => []);

		console.log(`   DOM Warnings Found in Canvas: ${invalidBlockElements.length}`);
		if (invalidBlockElements.length > 0) {
			console.log('   Warning elements:', JSON.stringify(invalidBlockElements, null, 2));
		}
		if (invalidTexts.length > 0) {
			console.log('   Invalid text matches:', invalidTexts);
		}

		if (invalidBlockElements.length > 0 || invalidTexts.length > 0) {
			validationErrors.push({
				post: p,
				warnings: invalidBlockElements,
			});
		}

		page.off('console', listener);
	}

	await browser.close();

	console.log('\n======================================================');
	console.log(`Audit Finished. Total Posts with Invalid Blocks: ${validationErrors.length}`);
	console.log('======================================================');
}

auditGutenbergEditor().catch(console.error);
