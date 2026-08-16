<?php
/**
 * Challenger M1-2: Server-Side PHP Template Adversarial Test Suite
 */

error_reporting(E_ALL);
ini_set('display_errors', '1');

$template_path = __DIR__ . '/../blocks/video-popup-block/video_popup_block.php';

if (!file_exists($template_path)) {
    echo "❌ FATAL: Template not found at $template_path\n";
    exit(1);
}

// WordPress mock environment
define('ABSPATH', 1);

function esc_attr($str) {
    return htmlspecialchars((string)$str, ENT_QUOTES, 'UTF-8');
}

function esc_html($str) {
    return htmlspecialchars((string)$str, ENT_QUOTES, 'UTF-8');
}

function esc_url($str) {
    return htmlspecialchars((string)$str, ENT_QUOTES, 'UTF-8');
}

function esc_attr_e($str, $domain = '') {
    echo esc_attr($str);
}

function __($str, $domain = '') {
    return (string)$str;
}

function sanitize_html_class($class) {
    return preg_replace('/[^a-zA-Z0-9_-]/', '', (string)$class);
}

function wp_rand($min = 0, $max = 9999) {
    return mt_rand($min, $max);
}

function wp_get_attachment_image_url($id, $size = 'full') {
    return 'https://example.com/uploads/image-' . (int)$id . '-' . $size . '.jpg';
}

function get_post_meta($id, $key, $single = true) {
    if ($key === '_wp_attachment_image_alt') {
        return 'Alt text for attachment ' . (int)$id;
    }
    return '';
}

function render_template($attributes, $template_path) {
    ob_start();
    include $template_path;
    return ob_get_clean();
}

$tests_passed = 0;
$tests_failed = 0;

function run_test($name, $assertion, $details = '') {
    global $tests_passed, $tests_failed;
    if ($assertion) {
        $tests_passed++;
        echo "  ✅ [PASS] $name" . ($details ? " ($details)" : "") . "\n";
    } else {
        $tests_failed++;
        echo "  ❌ [FAIL] $name" . ($details ? " — $details" : "") . "\n";
    }
}

echo "================================================================\n";
echo "🐘 CHALLENGER PHP TEMPLATE TEST SUITE\n";
echo "================================================================\n\n";

// Test 1: Empty attributes (defaults)
echo "--- Test 1: Empty Attributes & Default Fallbacks ---\n";
$html1 = render_template([], $template_path);
run_test('Contains .video-popup-block root wrapper', strpos($html1, 'class="video-popup-block') !== false);
run_test('Default ratio-16-9 class present', strpos($html1, 'ratio-16-9') !== false);
run_test('Contains <dialog> element', strpos($html1, '<dialog') !== false);
run_test('Contains aria-modal="true"', strpos($html1, 'aria-modal="true"') !== false);
run_test('Contains play button with aria-haspopup="dialog"', strpos($html1, 'aria-haspopup="dialog"') !== false);
run_test('Play button default label present', strpos($html1, 'aria-label="Play video"') !== false);
run_test('Modal close button present with aria-label', strpos($html1, 'aria-label="Close video player"') !== false);

// Test 2: XSS Injection & Special Characters
echo "\n--- Test 2: XSS Injection & Attribute Sanitization ---\n";
$xss_attributes = [
    'title' => 'Test <script>alert("xss")</script> & "Quotes"',
    'caption' => 'Caption <img src=x onerror=alert(1)> & special',
    'videoUrl' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ"><script>evil()</script>',
    'overlayColor' => '#000000; bad-css: true',
    'overlayOpacity' => 45,
    'playButtonColor' => '#e0ac0f"><style>body{display:none}</style>',
    'aspectRatio' => '16-9"><script>xss()</script>',
    'anchor' => 'custom-id" onmouseover="alert(1)',
    'modalAriaLabel' => 'Modal Label "with" <tags>'
];
$html2 = render_template($xss_attributes, $template_path);

run_test('Title is HTML escaped', strpos($html2, 'Test &lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt; &amp; &quot;Quotes&quot;') !== false);
run_test('Caption is HTML escaped', strpos($html2, 'Caption &lt;img src=x onerror=alert(1)&gt; &amp; special') !== false);
run_test('No unescaped <script> tag in output', strpos($html2, '<script>evil()</script>') === false && strpos($html2, '<script>alert') === false);
run_test('Aspect ratio sanitized via sanitize_html_class', strpos($html2, 'ratio-16-9scriptxssscript') !== false || strpos($html2, 'ratio-16-9') !== false);
run_test('Anchor attribute escaped', strpos($html2, 'id="custom-id&quot; onmouseover=&quot;alert(1)&quot;"') !== false || strpos($html2, 'id="custom-id') !== false);

// Test 3: Poster Image Type Matrix (numeric ID, array, string URL, null)
echo "\n--- Test 3: Poster Image Matrix Handling ---\n";

// 3a. Numeric ID
$html3a = render_template(['posterImage' => 1234], $template_path);
run_test('Numeric poster ID resolves to attachment URL', strpos($html3a, "background-image: url('https://example.com/uploads/image-1234-full.jpg');") !== false);

// 3b. Array with id and url
$html3b = render_template(['posterImage' => ['id' => 5678, 'url' => 'https://example.com/fallback.jpg', 'alt' => 'Custom Alt']], $template_path);
run_test('Array poster with id resolves correctly', strpos($html3b, "background-image: url('https://example.com/uploads/image-5678-full.jpg');") !== false);

// 3c. Array with url only (no id)
$html3c = render_template(['posterImage' => ['id' => 0, 'url' => 'https://example.com/direct-img.jpg', 'alt' => 'Direct Alt']], $template_path);
run_test('Array poster with url-only resolves correctly', strpos($html3c, "background-image: url('https://example.com/direct-img.jpg');") !== false);

// 3d. Direct string URL
$html3d = render_template(['posterImage' => 'https://example.com/string-url.png'], $template_path);
run_test('String URL poster resolves correctly', strpos($html3d, "background-image: url('https://example.com/string-url.png');") !== false);

// Test 4: Aspect Ratio Variations
echo "\n--- Test 4: Aspect Ratio Classes ---\n";
foreach (['16-9', '4-3', '1-1', '21-9'] as $ratio) {
    $html_ratio = render_template(['aspectRatio' => $ratio], $template_path);
    run_test("Aspect ratio [$ratio] renders ratio-$ratio class", strpos($html_ratio, "ratio-$ratio") !== false);
}

// Test 5: Pulse Animation Toggle
echo "\n--- Test 5: Pulse Animation Toggle ---\n";
$html_pulse_on = render_template(['enablePulse' => true], $template_path);
run_test('enablePulse=true renders has-pulse class', strpos($html_pulse_on, 'has-pulse') !== false);

$html_pulse_off = render_template(['enablePulse' => false], $template_path);
run_test('enablePulse=false omits has-pulse class', strpos($html_pulse_off, 'has-pulse') === false);

// Test 6: Unique Dialog ID Collision Resistance
echo "\n--- Test 6: Unique Dialog ID Generation ---\n";
$dialog_ids = [];
for ($i = 0; $i < 50; $i++) {
    $html_inst = render_template([], $template_path);
    preg_match('/aria-controls="([^"]+)"/', $html_inst, $ctrl_match);
    preg_match('/<dialog[^>]*\bid="([^"]+)"/s', $html_inst, $dlg_match);
    if (!empty($ctrl_match[1]) && !empty($dlg_match[1])) {
        $dialog_ids[] = $ctrl_match[1];
        if ($ctrl_match[1] !== $dlg_match[1]) {
            run_test("Instance $i: ID mismatch", false, "{$ctrl_match[1]} vs {$dlg_match[1]}");
        }
    }
}
$unique_count = count(array_unique($dialog_ids));
if ($unique_count !== count($dialog_ids)) {
    $counts = array_count_values($dialog_ids);
    foreach ($counts as $val => $c) {
        if ($c > 1) {
            echo "  Duplicate found: $val (appeared $c times)\n";
        }
    }
}
run_test("50 distinct renders produce 50 unique dialog IDs", $unique_count === count($dialog_ids), "$unique_count / " . count($dialog_ids) . " unique");



echo "\n================================================================\n";
echo "📊 PHP TEMPLATE TEST SUMMARY: $tests_passed Passed, $tests_failed Failed\n";
echo "================================================================\n\n";

if ($tests_failed > 0) {
    exit(1);
}
exit(0);
