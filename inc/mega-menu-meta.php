<?php
/**
 * Mega Menu Custom Meta Fields
 *
 * Adds an image selector to WordPress Navigation Menu items in Appearance > Menus.
 * Saves attachment ID into wp_postmeta as `_itm_menu_image_id`.
 *
 * @package kiwatinook
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Add custom image field to nav menu items in the admin menu editor.
 *
 * @param int      $item_id Nav menu item post ID.
 * @param WP_Post  $item    Nav menu item object.
 * @param int      $depth   Depth of menu item.
 * @param stdClass $args    Menu item args.
 */
function itm_add_menu_item_image_fields( $item_id, $item, $depth, $args ) {
	$image_id  = get_post_meta( $item_id, '_itm_menu_image_id', true );
	$image_url = '';

	if ( ! empty( $image_id ) ) {
		$image_src = wp_get_attachment_image_src( $image_id, 'medium' );
		if ( $image_src ) {
			$image_url = $image_src[0];
		}
	}
	?>
	<p class="field-itm-menu-image description description-wide" style="margin-top: 10px;">
		<label for="edit-menu-item-image-<?php echo esc_attr( $item_id ); ?>">
			<strong><?php esc_html_e( 'Mega Menu Image Preview', 'kiwatinook' ); ?></strong><br />
			<input type="hidden" id="edit-menu-item-image-<?php echo esc_attr( $item_id ); ?>" 
				   name="menu-item-itm-image[<?php echo esc_attr( $item_id ); ?>]" 
				   value="<?php echo esc_attr( $image_id ); ?>" 
				   class="itm-menu-image-id" />
			
			<div class="itm-menu-image-preview-wrapper" style="margin: 8px 0;">
				<img src="<?php echo esc_url( $image_url ); ?>" 
					 class="itm-menu-image-preview" 
					 style="max-width: 150px; height: auto; display: <?php echo ! empty( $image_url ) ? 'block' : 'none'; ?>; border-radius: 6px; border: 1px solid #ccd0d4; margin-bottom: 6px;" 
					 alt="" />
			</div>

			<button type="button" class="button button-secondary itm-upload-menu-image-btn">
				<?php echo ! empty( $image_url ) ? esc_html__( 'Change Image', 'kiwatinook' ) : esc_html__( 'Select Mega Menu Image', 'kiwatinook' ); ?>
			</button>
			<button type="button" class="button-link itm-remove-menu-image-btn" style="color: #b32d2e; margin-left: 8px; display: <?php echo ! empty( $image_url ) ? 'inline-block' : 'none'; ?>;">
				<?php esc_html_e( 'Remove Image', 'kiwatinook' ); ?>
			</button>
		</label>
	</p>
	<?php
}
add_action( 'wp_nav_menu_item_custom_fields', 'itm_add_menu_item_image_fields', 10, 4 );

/**
 * Save custom menu item image meta.
 *
 * @param int $menu_id         Menu ID.
 * @param int $menu_item_db_id Menu item post ID.
 */
function itm_save_menu_item_image_fields( $menu_id, $menu_item_db_id ) {
	if ( isset( $_POST['menu-item-itm-image'][ $menu_item_db_id ] ) ) {
		$image_id = sanitize_text_field( $_POST['menu-item-itm-image'][ $menu_item_db_id ] );
		if ( ! empty( $image_id ) ) {
			update_post_meta( $menu_item_db_id, '_itm_menu_image_id', intval( $image_id ) );
		} else {
			delete_post_meta( $menu_item_db_id, '_itm_menu_image_id' );
		}
	}
}
add_action( 'wp_update_nav_menu_item', 'itm_save_menu_item_image_fields', 10, 2 );

/**
 * Enqueue WordPress media scripts and custom handler on nav-menus.php.
 *
 * @param string $hook Admin page hook.
 */
function itm_enqueue_nav_menu_media_scripts( $hook ) {
	if ( 'nav-menus.php' !== $hook ) {
		return;
	}

	wp_enqueue_media();
	wp_add_inline_script(
		'nav-menu',
		"
		jQuery(document).ready(function($) {
			$(document).on('click', '.itm-upload-menu-image-btn', function(e) {
				e.preventDefault();
				var button = $(this);
				var wrapper = button.closest('.field-itm-menu-image');
				var input = wrapper.find('.itm-menu-image-id');
				var preview = wrapper.find('.itm-menu-image-preview');
				var removeBtn = wrapper.find('.itm-remove-menu-image-btn');

				var frame = wp.media({
					title: 'Select Mega Menu Image',
					button: { text: 'Use this image' },
					multiple: false
				});

				frame.on('select', function() {
					var attachment = frame.state().get('selection').first().toJSON();
					input.val(attachment.id);
					var url = attachment.sizes && attachment.sizes.medium ? attachment.sizes.medium.url : attachment.url;
					preview.attr('src', url).show();
					button.text('Change Image');
					removeBtn.show();
				});

				frame.open();
			});

			$(document).on('click', '.itm-remove-menu-image-btn', function(e) {
				e.preventDefault();
				var button = $(this);
				var wrapper = button.closest('.field-itm-menu-image');
				wrapper.find('.itm-menu-image-id').val('');
				wrapper.find('.itm-menu-image-preview').attr('src', '').hide();
				wrapper.find('.itm-upload-menu-image-btn').text('Select Mega Menu Image');
				button.hide();
			});
		});
		"
	);
}
add_action( 'admin_enqueue_scripts', 'itm_enqueue_nav_menu_media_scripts' );
