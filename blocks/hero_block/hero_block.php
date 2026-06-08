<?php
/**
 * Hero Block — server-side render template.
 *
 * Full-bleed, viewport-height hero section. The .alignfull class is applied
 * automatically by WordPress because "align": "full" is set in block.json.
 *
 * Variables available:
 *   $attributes  array    Block attributes.
 *   $content     string   Inner block HTML (unused).
 *   $block       WP_Block
 */

$background_image  = isset( $attributes['backgroundImage'] ) ? $attributes['backgroundImage'] : null;
$title             = isset( $attributes['title'] )           ? $attributes['title']           : '';
$overlay_opacity   = isset( $attributes['overlayOpacity'] )  ? (int) $attributes['overlayOpacity']  : 35;
$overlay_color     = isset( $attributes['overlayColor'] )    ? $attributes['overlayColor']    : '#000000';
$text_color        = isset( $attributes['textColor'] )       ? $attributes['textColor']       : '#ffffff';
$min_height        = isset( $attributes['minHeight'] )       ? (int) $attributes['minHeight'] : 70;
$extra_class       = isset( $attributes['className'] )       ? $attributes['className']       : '';
$align             = isset( $attributes['align'] )           ? 'align' . sanitize_html_class( $attributes['align'] ) : 'alignfull';

$bg_style = $background_image && ! empty( $background_image['url'] )
	? sprintf( "background-image:url('%s');", esc_url( $background_image['url'] ) )
	: '';

$section_style = sprintf(
	'%s min-height:%svh;',
	$bg_style,
	esc_attr( $min_height )
);

$overlay_style = sprintf(
	'background-color:%s;opacity:%s;',
	esc_attr( $overlay_color ),
	esc_attr( $overlay_opacity / 100 )
);

$title_style = sprintf( 'color:%s;', esc_attr( $text_color ) );

$classes = trim( 'hero-block ' . $align . ' ' . $extra_class );
?>

<section class="<?php echo esc_attr( $classes ); ?>"
		 style="<?php echo $section_style; ?>"
		 aria-label="<?php echo $title ? esc_attr( $title ) : esc_attr__( 'Page hero', 'itm_indigpro' ); ?>">

	<div class="hero-block-overlay" style="<?php echo $overlay_style; ?>" aria-hidden="true"></div>

	<div class="hero-block-content">
		<?php if ( $title ) : ?>
			<h1 class="hero-block-title" style="<?php echo $title_style; ?>">
				<?php echo esc_html( $title ); ?>
			</h1>
		<?php else : ?>
			<p class="hero-block-placeholder">Set a title in the block sidebar.</p>
		<?php endif; ?>
	</div>

</section>
