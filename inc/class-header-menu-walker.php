<?php
/**
 * Custom Walker class for Accessible Mega Menu navigation.
 *
 * Emits semantic HTML with CSS Grid panels at depth 0, custom thumbnail preview cards at depth 1,
 * and keyboard accessibility ARIA attributes.
 *
 * @package itm_indigpro
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class GAC_Menu_Walker extends Walker_Nav_Menu {

	/**
	 * Starts the list before the elements are added.
	 *
	 * @param string   $output Used to append additional content (passed by reference).
	 * @param int      $depth  Depth of menu item. Used for padding.
	 * @param stdClass $args   An object of wp_nav_menu() arguments.
	 */
	public function start_lvl( &$output, $depth = 0, $args = null ) {
		$indent = str_repeat( "\t", $depth );

		if ( 0 === $depth ) {
			$output .= "\n$indent<div class=\"mega-menu-panel\" role=\"region\" aria-label=\"Submenu\">\n";
			$output .= "$indent\t<div class=\"mega-menu-container\">\n";
			$output .= "$indent\t\t<ul class=\"sub-menu mega-menu-grid\">\n";
		} else {
			$output .= "\n$indent<ul class=\"nested-menu\">\n";
		}
	}

	/**
	 * Ends the list of after the elements are added.
	 *
	 * @param string   $output Used to append additional content (passed by reference).
	 * @param int      $depth  Depth of menu item. Used for padding.
	 * @param stdClass $args   An object of wp_nav_menu() arguments.
	 */
	public function end_lvl( &$output, $depth = 0, $args = null ) {
		$indent = str_repeat( "\t", $depth );

		if ( 0 === $depth ) {
			$output .= "$indent\t\t</ul>\n";
			$output .= "$indent\t</div>\n";
			$output .= "$indent</div>\n";
		} else {
			$output .= "$indent</ul>\n";
		}
	}

	/**
	 * Starts the element output.
	 *
	 * @param string   $output Used to append additional content (passed by reference).
	 * @param WP_Post  $item   Menu item data object.
	 * @param int      $depth  Depth of menu item. Used for padding.
	 * @param stdClass $args   An object of wp_nav_menu() arguments.
	 * @param int      $id     Current item ID.
	 */
	public function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
		$indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';

		$classes   = empty( $item->classes ) ? array() : (array) $item->classes;
		$classes[] = 'menu-item-' . $item->ID;

		// Check for custom menu image meta or fallback post thumbnail
		$image_id = get_post_meta( $item->ID, '_itm_menu_image_id', true );
		if ( empty( $image_id ) && ! empty( $item->object_id ) && has_post_thumbnail( $item->object_id ) ) {
			$image_id = get_post_thumbnail_id( $item->object_id );
		}

		$has_image = ! empty( $image_id );
		if ( $has_image ) {
			$classes[] = 'has-thumbnail';
		}

		if ( 0 === $depth && in_array( 'menu-item-has-children', $classes, true ) ) {
			$classes[] = 'mega-menu-parent';
		}

		// Inject logo in slide menu on mobile/drawer if first item
		if ( 0 === $depth && 1 === (int) $item->menu_order ) {
			$output .= '<li class="site-header-logo site-header-logo-slide">';
			ob_start();
			the_custom_logo();
			$output .= ob_get_clean();
			$output .= '</li>';
		}

		$class_names = implode( ' ', array_filter( $classes ) );
		$class_names = $class_names ? ' class="' . esc_attr( $class_names ) . '"' : '';

		$id_attr = ! empty( $item->ID ) ? ' id="menu-item-' . esc_attr( $item->ID ) . '"' : '';

		$output .= $indent . '<li' . $id_attr . $class_names . '>';

		// Attributes for the anchor link
		$atts           = array();
		$atts['title']  = ! empty( $item->attr_title ) ? $item->attr_title : '';
		$atts['target'] = ! empty( $item->target ) ? $item->target : '';
		if ( '_blank' === $item->target && empty( $item->xfn ) ) {
			$atts['rel'] = 'noopener noreferrer';
		} else {
			$atts['rel'] = $item->xfn;
		}
		$atts['href'] = ! empty( $item->url ) ? $item->url : '';

		if ( 0 === $depth && in_array( 'menu-item-has-children', $classes, true ) ) {
			$atts['aria-haspopup'] = 'true';
			$atts['aria-expanded'] = 'false';
		}

		$atts_str = '';
		foreach ( $atts as $attr => $value ) {
			if ( ! empty( $value ) ) {
				$value     = ( 'href' === $attr ) ? esc_url( $value ) : esc_attr( $value );
				$atts_str .= ' ' . $attr . '="' . $value . '"';
			}
		}

		$title = apply_filters( 'the_title', $item->title, $item->ID );

		// Render link or toggle container
		$item_output = '';

		if ( ! empty( $item->url ) && '#' !== $item->url ) {
			$item_output .= '<a' . $atts_str . '>';
		} else {
			$item_output .= '<div class="menu-item toggle-item">';
		}

		// Depth 1 with image preview card
		if ( 1 === $depth && $has_image ) {
			$img_src = wp_get_attachment_image_src( $image_id, 'medium' );
			if ( $img_src ) {
				$item_output .= '<span class="menu-card-img-wrap"><img src="' . esc_url( $img_src[0] ) . '" alt="' . esc_attr( $title ) . '" loading="lazy" class="menu-card-thumb" /></span>';
			}
		}

		$item_output .= '<span class="submenu-item">' . esc_html( $title ) . '</span>';

		// Submenu chevron toggle for mobile / dropdown
		if ( 0 === $depth && in_array( 'menu-item-has-children', $classes, true ) ) {
			$item_output .= '<button class="submenu-toggle-btn" aria-label="' . esc_attr__( 'Toggle Submenu', 'itm_indigpro' ) . '"><i class="bi bi-chevron-down"></i></button>';
		}

		if ( ! empty( $item->url ) && '#' !== $item->url ) {
			$item_output .= '</a>';
		} else {
			$item_output .= '</div>';
		}

		$output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
	}

	/**
	 * Ends the element output.
	 *
	 * @param string   $output Used to append additional content (passed by reference).
	 * @param WP_Post  $item   Page data object. Not used.
	 * @param int      $depth  Depth of page. Not Used.
	 * @param stdClass $args   An object of wp_nav_menu() arguments.
	 */
	public function end_el( &$output, $item, $depth = 0, $args = null ) {
		$output .= "</li>\n";
	}
}
