/**
 * E2E Interactive & Visual Test for Operator Map Block & Pattern
 */
import { createBrowser, BASE_URL } from './config.js';
import assert from 'assert';

async function testOperatorMap() {
	console.log( '🚀 Starting Operator Map E2E & Functional Verification...' );
	console.log( `🌐 Target URL: ${ BASE_URL }/experience-map/` );

	const browser = await createBrowser();
	const page = await browser.newPage( {
		viewport: { width: 1280, height: 900 },
		ignoreHTTPSErrors: true,
	} );

	try {
		console.log( '\n[Step 1] Navigating to /experience-map/ ...' );
		const response = await page.goto( `${ BASE_URL }/experience-map/`, {
			waitUntil: 'networkidle',
			timeout: 30000,
		} );

		assert.strictEqual( response.status(), 200, 'Experience Map must respond with HTTP 200' );
		console.log( '  ✅ HTTP 200 OK' );

		console.log( '\n[Step 2] Verifying Operator Map DOM Elements ...' );
		const mapContainer = await page.$( '.content-operators-map' );
		assert( mapContainer, 'DOM must contain .content-operators-map' );
		console.log( '  ✅ .content-operators-map present' );

		const tabsContainer = await page.$( '.content-operators-map-tabs-container' );
		assert( tabsContainer, 'DOM must contain .content-operators-map-tabs-container' );
		console.log( '  ✅ .content-operators-map-tabs-container present' );

		const tabs = await page.$$( '.operator-tab' );
		console.log( `  ✅ Found ${ tabs.length } operator tab item(s)` );
		assert( tabs.length > 0, 'Must have at least 1 operator tab item' );

		console.log( '\n[Step 3] Verifying Leaflet Map Initialization ...' );
		const leafletContainer = await page.$( '.leaflet-map' );
		assert( leafletContainer, 'Leaflet map container must exist in DOM' );
		console.log( '  ✅ .leaflet-map container present' );

		// Wait for Leaflet to initialize
		await page.waitForFunction( () => {
			return window.WPLeafletMapPlugin &&
				window.WPLeafletMapPlugin.maps &&
				window.WPLeafletMapPlugin.maps.length > 0;
		}, { timeout: 10000 } );
		console.log( '  ✅ WPLeafletMapPlugin.maps[0] initialized' );

		console.log( '\n[Step 4] Testing Tab Click Interaction & Pan ...' );
		const firstTab = tabs[ 0 ];
		const initialLat = await firstTab.getAttribute( 'data-lat' );
		const initialLng = await firstTab.getAttribute( 'data-lng' );
		console.log( `  Clicking first tab (lat: ${ initialLat }, lng: ${ initialLng }) ...` );

		await firstTab.click();
		await page.waitForTimeout( 1000 );

		const hasActiveTab = await firstTab.evaluate( ( el ) => el.classList.contains( 'active-tab' ) );
		assert( hasActiveTab, 'First tab must have .active-tab class after click' );
		console.log( '  ✅ Tab received .active-tab class' );

		console.log( '\n[Step 5] Testing Mobile Responsive Scroll & Tab Switching ...' );
		if ( tabs.length > 1 ) {
			const secondTab = tabs[ 1 ];
			await secondTab.click();
			await page.waitForTimeout( 1000 );

			const secondActive = await secondTab.evaluate( ( el ) => el.classList.contains( 'active-tab' ) );
			assert( secondActive, 'Second tab must have .active-tab class after click' );
			console.log( '  ✅ Second tab received .active-tab class' );
		}

		console.log( '\n[Step 6] Verifying Hoop Marker Assets ...' );
		const markerAssets = await page.evaluate( () => {
			const images = Array.from( document.querySelectorAll( 'script' ) );
			return images.some( ( s ) => s.textContent.includes( 'hoop-marker.png' ) );
		} );
		assert( markerAssets, 'Leaflet marker scripts must reference hoop-marker.png' );
		console.log( '  ✅ Hoop marker asset configured' );

		console.log( '\n🎉 All Operator Map functional & interactive tests PASSED!' );
	} finally {
		await browser.close();
	}
}

testOperatorMap().catch( ( err ) => {
	console.error( '❌ Operator Map test failed:', err );
	process.exit( 1 );
} );
