<?php
/**
 * PHP-Level Adversarial Challenger M2 Test Harness
 *
 * Tests PHP runtime execution, mock WordPress environment,
 * block parsing, and server-side template rendering for /about-itm/.
 */

$theme_root = dirname( __DIR__ );

// Mock essential WordPress functions if not loaded
if ( ! function_exists( 'esc_attr' ) ) {
	function esc_attr( $text ) {
		return htmlspecialchars( (string) $text, ENT_QUOTES, 'UTF-8' );
	}
}
if ( ! function_exists( 'esc_html' ) ) {
	function esc_html( $text ) {
		return htmlspecialchars( (string) $text, ENT_QUOTES, 'UTF-8' );
	}
}
if ( ! function_exists( 'esc_url' ) ) {
	function esc_url( $url ) {
		return filter_var( (string) $url, FILTER_SANITIZE_URL );
	}
}
if ( ! function_exists( 'esc_attr_e' ) ) {
	function esc_attr_e( $text, $domain = 'default' ) {
		echo esc_attr( $text );
	}
}
if ( ! function_exists( '__' ) ) {
	function __( $text, $domain = 'default' ) {
		return (string) $text;
	}
}
if ( ! function_exists( '_e' ) ) {
	function _e( $text, $domain = 'default' ) {
		echo (string) $text;
	}
}
if ( ! function_exists( 'sanitize_html_class' ) ) {
	function sanitize_html_class( $class, $fallback = '' ) {
		// Strip leading/trailing whitespace and invalid chars
		$sanitized = preg_replace( '|[^\w_-]|', '', (string) $class );
		return $sanitized ? $sanitized : $fallback;
	}
}
if ( ! function_exists( 'wp_json_encode' ) ) {
	function wp_json_encode( $data, $options = 0, $depth = 512 ) {
		return json_encode( $data, $options, $depth );
	}
}
if ( ! function_exists( 'wp_rand' ) ) {
	function wp_rand( $min = 0, $max = 0 ) {
		return rand( $min, $max );
	}
}
if ( ! function_exists( 'wp_get_attachment_image_url' ) ) {
	function wp_get_attachment_image_url( $id, $size = 'full' ) {
		return 'https://example.com/wp-content/uploads/test-' . $id . '.jpg';
	}
}
if ( ! function_exists( 'get_post_meta' ) ) {
	function get_post_meta( $id, $key = '', $single = false ) {
		return 'Test Image Alt';
	}
}
if ( ! function_exists( 'add_action' ) ) {
	function add_action( $hook, $callback, $priority = 10 ) {
		// Mock registration
	}
}

// Define ABSPATH to allow inc/m2-pages-migration.php to load
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', $theme_root . '/' );
}

require_once $theme_root . '/inc/m2-pages-migration.php';

$total_tests = 0;
$passed_tests = 0;
$failed_tests = 0;

function assert_test( $condition, $name, $detail = '' ) {
	global $total_tests, $passed_tests, $failed_tests;
	$total_tests++;
	if ( $condition ) {
		$passed_tests++;
		echo "  ✅ [PASS] {$name}" . ( $detail ? " ({$detail})" : '' ) . "\n";
	} else {
		$failed_tests++;
		echo "  ❌ [FAIL] {$name}" . ( $detail ? " — {$detail}" : '' ) . "\n";
	}
}

echo "========================================================================\n";
echo "🐘 ADVERSARIAL CHALLENGER M2: PHP RUNTIME & RENDER HARNESS\n";
echo "========================================================================\n\n";

echo "--- [1] ITM_M2_Pages_Migration Data Integrity ---\n";
$pages = ITM_M2_Pages_Migration::get_pages_content();
assert_test( is_array( $pages ), 'get_pages_content() returns array' );
assert_test( count( $pages ) === 15, 'Exact 15 pages returned in migration array', count( $pages ) . ' pages' );

$expected_slugs = [
	22   => 'about-itm',
	283  => 'reconciliation',
	463  => 'things-to-do',
	435  => 'our-team',
	2367 => 'become-a-member',
	2373 => 'member-benefits',
	605  => 'contact-us',
	1769 => 'privacy-policy',
	1518 => 'new-account-request',
	2572 => 'itm-indigenous-guide-training-program-inquiry-form',
	2734 => 'guide-training-program',
	2534 => 'indigenous-guide-training-program-step-1',
	2537 => 'indigenous-guide-training-program-step-2',
	2542 => 'indigenous-guide-training-program-step-3',
	2676 => 'indigenous-guide-training-program-more-learning-opportunities',
];

foreach ( $expected_slugs as $id => $slug ) {
	assert_test( isset( $pages[ $id ] ), "Page ID {$id} exists in migration dataset" );
	if ( isset( $pages[ $id ] ) ) {
		assert_test( $pages[ $id ]['slug'] === $slug, "Page ID {$id} slug matches '{$slug}'" );
		assert_test( ! empty( $pages[ $id ]['title'] ), "Page ID {$id} has non-empty title" );
		assert_test( ! empty( $pages[ $id ]['content'] ), "Page ID {$id} has non-empty content" );
	}
}

echo "\n--- [2] Video Popup Block PHP Server-side Render Simulation for /about-itm/ ---\n";
$about_content = $pages[22]['content'];
preg_match( '/<!--\s*wp:relish\/video-popup-block\s+(\{[\s\S]*?\})\s*\/-->/', $about_content, $video_match );
assert_test( ! empty( $video_match ), 'relish/video-popup-block tag found in /about-itm/' );

if ( ! empty( $video_match ) ) {
	$attributes = json_decode( $video_match[1], true );
	assert_test( is_array( $attributes ), 'Attributes parsed as valid PHP associative array' );
	assert_test( isset( $attributes['videoUrl'] ), 'videoUrl attribute present' );

	// Simulate rendering blocks/video-popup-block/video_popup_block.php
	ob_start();
	include $theme_root . '/blocks/video-popup-block/video_popup_block.php';
	$rendered_html = ob_get_clean();

	assert_test( ! empty( $rendered_html ), 'video_popup_block.php rendered non-empty HTML output' );
	assert_test( strpos( $rendered_html, 'video-popup-block' ) !== false, 'Rendered HTML contains class .video-popup-block' );
	assert_test( strpos( $rendered_html, 'video-popup-play-btn' ) !== false, 'Rendered HTML contains .video-popup-play-btn' );
	assert_test( strpos( $rendered_html, '<dialog' ) !== false, 'Rendered HTML contains accessible HTML5 <dialog>' );
	assert_test( strpos( $rendered_html, 'video-popup-modal-dialog' ) !== false, 'Rendered HTML contains .video-popup-modal-dialog' );
	assert_test( strpos( $rendered_html, 'Building the Brand' ) !== false, 'Rendered HTML contains title "Building the Brand"' );
	assert_test( strpos( $rendered_html, 'data-video-url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"' ) !== false, 'Rendered HTML preserves YouTube videoUrl in data attribute' );
	assert_test( strpos( $rendered_html, 'aria-label="Close video player"' ) !== false, 'Rendered HTML includes accessible close button aria-label' );
}

echo "\n--- [3] Idempotency & State Versioning Constants ---\n";
assert_test( defined( 'ITM_M2_Pages_Migration::MIGRATION_VERSION' ), 'ITM_M2_Pages_Migration::MIGRATION_VERSION constant defined' );
assert_test( ITM_M2_Pages_Migration::MIGRATION_VERSION === '2.1.0', 'Migration version is 2.1.0' );

echo "\n========================================================================\n";
echo "📊 PHP RUNTIME SUMMARY\n";
echo "   Total Tests:  {$total_tests}\n";
echo "   Passed Tests: {$passed_tests}\n";
echo "   Failed Tests: {$failed_tests}\n";
echo "========================================================================\n";

if ( $failed_tests === 0 ) {
	echo "\n🎯 PHP VERDICT: [APPROVE]\n\n";
	exit( 0 );
} else {
	echo "\n💥 PHP VERDICT: [CHALLENGE_FAILED]\n\n";
	exit( 1 );
}
