<?php
/**
 * Video Popup Block — Server-side render template.
 *
 * Variables available (set by WordPress core):
 *   $attributes array   Block attributes from block.json.
 *   $content    string  Inner block HTML.
 *   $block      WP_Block
 */

// Attributes extraction with safe defaults
$video_url             = isset( $attributes['videoUrl'] )            ? trim( $attributes['videoUrl'] )              : '';
$poster_image          = isset( $attributes['posterImage'] )         ? $attributes['posterImage']                   : null;
$title                 = isset( $attributes['title'] )               ? trim( $attributes['title'] )                 : '';
$caption               = isset( $attributes['caption'] )             ? trim( $attributes['caption'] )               : '';
$overlay_color         = isset( $attributes['overlayColor'] )        ? $attributes['overlayColor']                  : '#000000';
$overlay_opacity       = isset( $attributes['overlayOpacity'] )      ? (int) $attributes['overlayOpacity']          : 25;
$play_button_color     = isset( $attributes['playButtonColor'] )      ? $attributes['playButtonColor']               : '#e0ac0f';
$play_button_icon_color= isset( $attributes['playButtonIconColor'] )  ? $attributes['playButtonIconColor']           : '#ffffff';
$play_button_size      = isset( $attributes['playButtonSize'] )       ? $attributes['playButtonSize']                : 'medium';
$enable_pulse          = isset( $attributes['enablePulse'] )          ? (bool) $attributes['enablePulse']            : true;
$aspect_ratio          = isset( $attributes['aspectRatio'] )          ? $attributes['aspectRatio']                   : '16-9';
$modal_aria_label      = isset( $attributes['modalAriaLabel'] )       ? trim( $attributes['modalAriaLabel'] )        : 'Video player modal';
$autoplay              = isset( $attributes['autoplay'] )            ? (bool) $attributes['autoplay']               : true;
$extra_class           = isset( $attributes['className'] )           ? $attributes['className']                     : '';
$anchor                = isset( $attributes['anchor'] )              ? $attributes['anchor']                        : '';

// Image resolution
$poster_url = '';
$poster_alt = '';

if ( is_numeric( $poster_image ) ) {
	$img_id     = (int) $poster_image;
	$poster_url = wp_get_attachment_image_url( $img_id, 'full' );
	$poster_alt = get_post_meta( $img_id, '_wp_attachment_image_alt', true );
} elseif ( is_array( $poster_image ) ) {
	if ( ! empty( $poster_image['id'] ) ) {
		$img_id     = (int) $poster_image['id'];
		$poster_url = wp_get_attachment_image_url( $img_id, 'full' );
		if ( ! $poster_url && ! empty( $poster_image['url'] ) ) {
			$poster_url = $poster_image['url'];
		}
		$poster_alt = ! empty( $poster_image['alt'] ) ? $poster_image['alt'] : get_post_meta( $img_id, '_wp_attachment_image_alt', true );
	} elseif ( ! empty( $poster_image['url'] ) ) {
		$poster_url = $poster_image['url'];
		$poster_alt = ! empty( $poster_image['alt'] ) ? $poster_image['alt'] : '';
	}
} elseif ( is_string( $poster_image ) && ! empty( $poster_image ) ) {
	$poster_url = $poster_image;
}

// Generate unique dialog ID
static $video_popup_instance_counter = 0;
$video_popup_instance_counter++;
$dialog_id = 'video-popup-dialog-' . $video_popup_instance_counter . '-' . wp_rand( 1000, 9999 );

$bg_style = $poster_url
	? sprintf( "background-image: url('%s');", esc_url( $poster_url ) )
	: '';

$ratio_class = 'ratio-' . sanitize_html_class( $aspect_ratio );
$size_class  = 'size-' . sanitize_html_class( $play_button_size );
$pulse_class = $enable_pulse ? 'has-pulse' : '';

$wrapper_classes = trim( sprintf( 'video-popup-block %s %s', $ratio_class, $extra_class ) );
$anchor_attr     = ! empty( $anchor ) ? sprintf( 'id="%s"', esc_attr( $anchor ) ) : '';

$play_btn_aria = $title ? sprintf( __( 'Play video: %s', 'itm_indigpro' ), $title ) : __( 'Play video', 'itm_indigpro' );
?>

<div class="<?php echo esc_attr( $wrapper_classes ); ?>" <?php echo $anchor_attr; ?>>
	<div class="video-popup-card" style="<?php echo $bg_style; ?>">
		<div
			class="video-popup-overlay"
			style="background-color: <?php echo esc_attr( $overlay_color ); ?>; opacity: <?php echo esc_attr( $overlay_opacity / 100 ); ?>;"
		></div>

		<div class="video-popup-content">
			<button
				type="button"
				class="video-popup-play-btn <?php echo esc_attr( trim( $size_class . ' ' . $pulse_class ) ); ?>"
				aria-haspopup="dialog"
				aria-controls="<?php echo esc_attr( $dialog_id ); ?>"
				aria-label="<?php echo esc_attr( $play_btn_aria ); ?>"
				data-dialog-id="<?php echo esc_attr( $dialog_id ); ?>"
				data-video-url="<?php echo esc_attr( $video_url ); ?>"
				data-autoplay="<?php echo $autoplay ? '1' : '0'; ?>"
				style="--play-btn-bg: <?php echo esc_attr( $play_button_color ); ?>; --play-btn-icon: <?php echo esc_attr( $play_button_icon_color ); ?>;"
			>
				<span class="video-popup-play-icon-wrap" aria-hidden="true">
					<svg
						class="video-popup-play-icon"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M8 5.14v13.72a1 1 0 001.5.86l11-6.86a1 1 0 000-1.72l-11-6.86a1 1 0 00-1.5.86z"
							fill="currentColor"
						/>
					</svg>
				</span>
			</button>

			<?php if ( ! empty( $title ) ) : ?>
				<h3 class="video-popup-title">
					<?php echo esc_html( $title ); ?>
				</h3>
			<?php endif; ?>

			<?php if ( ! empty( $caption ) ) : ?>
				<p class="video-popup-caption">
					<?php echo esc_html( $caption ); ?>
				</p>
			<?php endif; ?>
		</div>
	</div>

	<dialog
		id="<?php echo esc_attr( $dialog_id ); ?>"
		class="video-popup-modal-dialog"
		aria-modal="true"
		aria-label="<?php echo esc_attr( $modal_aria_label ); ?>"
	>
		<div class="video-popup-dialog-container">
			<button
				type="button"
				class="video-popup-modal-close"
				aria-label="<?php esc_attr_e( 'Close video player', 'itm_indigpro' ); ?>"
				data-dialog-id="<?php echo esc_attr( $dialog_id ); ?>"
			>
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<line x1="18" y1="6" x2="6" y2="18"></line>
					<line x1="6" y1="6" x2="18" y2="18"></line>
				</svg>
			</button>

			<div
				class="video-popup-embed-target"
				data-video-url="<?php echo esc_attr( $video_url ); ?>"
				data-autoplay="<?php echo $autoplay ? '1' : '0'; ?>"
			></div>
		</div>
	</dialog>
</div>
