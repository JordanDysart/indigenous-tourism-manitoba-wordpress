<?php
/**
 * Banner Block — server-side render template.
 *
 * Variables available (set by WordPress core):
 *   $attributes  array   Block attributes from block.json.
 *   $content     string  Inner block HTML (empty — this block has no inner blocks).
 *   $block       WP_Block
 */

$title                  = isset( $attributes['title'] )                  ? $attributes['title']                  : '';
$text_color             = isset( $attributes['textColor'] )              ? $attributes['textColor']              : '#ffffff';
$font_size              = isset( $attributes['fontSize'] )               ? (float) $attributes['fontSize']       : 2;
$description            = isset( $attributes['description'] )            ? $attributes['description']            : '';
$description_color      = isset( $attributes['descriptionColor'] )       ? $attributes['descriptionColor']       : '#ffffff';
$description_font_size  = isset( $attributes['descriptionFontSize'] )    ? (float) $attributes['descriptionFontSize'] : 1;
$description_font_weight= isset( $attributes['descriptionFontWeight'] )  ? $attributes['descriptionFontWeight']  : 'normal';
$background_image       = isset( $attributes['backgroundImage'] )        ? $attributes['backgroundImage']        : null;
$overlay_opacity        = isset( $attributes['overlayOpacity'] )         ? (int) $attributes['overlayOpacity']   : 20;
$overlay_color          = isset( $attributes['overlayColor'] )           ? $attributes['overlayColor']           : '#000000';
$main_image             = isset( $attributes['mainImage'] )              ? $attributes['mainImage']              : null;
$text_alignment         = isset( $attributes['textAlignment'] )          ? $attributes['textAlignment']          : 'left';
$extra_class            = isset( $attributes['className'] )              ? $attributes['className']              : '';

// Styles
$title_style = sprintf(
	'color:%s;font-size:%sem;',
	esc_attr( $text_color ),
	esc_attr( $font_size )
);

$description_style = sprintf(
	'color:%s;font-size:%sem;font-weight:%s;',
	esc_attr( $description_color ),
	esc_attr( $description_font_size ),
	esc_attr( $description_font_weight )
);

$text_alignment_class = 'text-align-' . sanitize_html_class( $text_alignment );

$bg_style = $background_image && ! empty( $background_image['url'] )
	? sprintf( "background-image:url('%s');", esc_url( $background_image['url'] ) )
	: '';
?>

<div class="banner-block <?php echo esc_attr( trim( $extra_class . ' ' . $text_alignment_class ) ); ?>" style="<?php echo $bg_style; ?>">

	<div class="banner-block-overlay" style="background-color:<?php echo esc_attr( $overlay_color ); ?>;opacity:<?php echo esc_attr( $overlay_opacity / 100 ); ?>;"></div>

	<div class="banner-block-content">

		<div class="banner-block-row-text">
			<?php if ( $title ) : ?>
				<h2 class="banner-block-title" style="<?php echo $title_style; ?>">
					<?php echo esc_html( $title ); ?>
				</h2>
			<?php endif; ?>

			<?php if ( $description ) : ?>
				<p class="banner-block-description" style="<?php echo $description_style; ?>">
					<?php echo esc_html( $description ); ?>
				</p>
			<?php endif; ?>
		</div>

		<?php if ( $main_image && ! empty( $main_image['url'] ) ) : ?>
			<div class="banner-block-row-image">
				<img
					class="banner-block-cover-image"
					src="<?php echo esc_url( get_template_directory_uri() ); ?>/blocks/banner_block/ITM_Hoop.svg"
					alt=""
					aria-hidden="true"
				>
				<img
					class="banner-block-image"
					src="<?php echo esc_url( $main_image['url'] ); ?>"
					alt="<?php echo esc_attr( $main_image['alt'] ?? '' ); ?>"
				>
			</div>
		<?php endif; ?>

	</div>
</div>
