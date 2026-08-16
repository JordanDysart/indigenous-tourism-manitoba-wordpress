<?php
/**
 * Hero Block (Full Width) — Server-Side Render Template.
 *
 * Full-bleed, viewport-height hero section with optional brand hoop overlay
 * and nested Gutenberg InnerBlocks support.
 *
 * Variables available:
 *   $attributes  array    Block attributes.
 *   $content     string   Rendered InnerBlocks HTML content.
 *   $block       WP_Block The block instance.
 */

$background_image   = isset( $attributes['backgroundImage'] ) ? $attributes['backgroundImage'] : null;
$title              = isset( $attributes['title'] )            ? $attributes['title']            : '';
$show_hoop_overlay  = isset( $attributes['showHoopOverlay'] )  ? (bool) $attributes['showHoopOverlay'] : true;
$overlay_opacity    = isset( $attributes['overlayOpacity'] )   ? (int) $attributes['overlayOpacity']   : 25;
$overlay_color      = isset( $attributes['overlayColor'] )     ? $attributes['overlayColor']     : '#000000';
$min_height         = isset( $attributes['minHeight'] )        ? (int) $attributes['minHeight']        : 60;
$content_alignment  = isset( $attributes['contentAlignment'] ) ? sanitize_html_class( $attributes['contentAlignment'] ) : 'center';
$vertical_alignment = isset( $attributes['verticalAlignment'] ) ? sanitize_html_class( $attributes['verticalAlignment'] ) : 'middle';
$extra_class        = isset( $attributes['className'] )        ? $attributes['className']        : '';

// Dynamic attachment ID resolution
$bg_url = '';
if ( is_numeric( $background_image ) ) {
	$bg_url = wp_get_attachment_image_url( (int) $background_image, 'full' );
} elseif ( is_array( $background_image ) ) {
	if ( ! empty( $background_image['id'] ) ) {
		$resolved = wp_get_attachment_image_url( (int) $background_image['id'], 'full' );
		if ( $resolved ) {
			$bg_url = $resolved;
		}
	}
	if ( empty( $bg_url ) && ! empty( $background_image['url'] ) ) {
		$bg_url = $background_image['url'];
	}
}

$bg_style = $bg_url ? sprintf( "background-image:url('%s');", esc_url( $bg_url ) ) : '';
$section_style = sprintf( '%s min-height:%svh;', $bg_style, esc_attr( $min_height ) );
$overlay_style = sprintf( 'background-color:%s;opacity:%s;', esc_attr( $overlay_color ), esc_attr( $overlay_opacity / 100 ) );

$classes = trim( sprintf(
	'hero-block alignfull text-align-%s valign-%s %s %s',
	$content_alignment,
	$vertical_alignment,
	$show_hoop_overlay ? 'has-hoop-overlay' : '',
	$extra_class
) );
?>

<section class="<?php echo esc_attr( $classes ); ?>" style="<?php echo $section_style; ?>">
	<div class="hero-block-overlay" style="<?php echo $overlay_style; ?>" aria-hidden="true"></div>

	<?php if ( $show_hoop_overlay ) : ?>
		<div class="hero-block-hoop-overlay" aria-hidden="true">
			<div class="hero-hoop-graphic"></div>
		</div>
	<?php endif; ?>

	<div class="hero-block-container">
		<?php if ( ! empty( $content ) ) : ?>
			<?php echo $content; ?>
		<?php elseif ( ! empty( $title ) ) : ?>
			<h1 class="hero-block-title"><?php echo esc_html( $title ); ?></h1>
		<?php endif; ?>
	</div>
</section>
