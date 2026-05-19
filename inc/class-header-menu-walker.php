<?php
/**
 * Custom Walker class to modify the structure of WordPress navigation menus.
 *
 * GAC_Menu_Walker extends Walker_Nav_Menu to customize how submenu levels, menu items,
 * thumbnails, and the site logo are displayed within the menu structure.
 */
class GAC_Menu_Walker extends Walker_Nav_Menu {

	/**
	 * Start level.
	 */
	function start_lvl(&$output, $depth = 0, $args = null) {
		$indent = str_repeat("\t", $depth);
		$submenu_class = $depth === 0 ? 'sub-menu' : 'nested-menu';
		$output .= "\n$indent<ul class=\"$submenu_class\">\n";
	}

	/**
	 * Start element.
	 */
	function start_el(&$output, $item, $depth = 0, $args = null, $id = 0) {
		$li_classes = implode(" ", is_array($item->classes) ? $item->classes : []);

		if ($depth === 1 && has_post_thumbnail($item->object_id)) {
			$li_classes .= ' has-thumbnail';
		}

		if ($depth === 0 && $item->menu_order == 1) {
			$output .= '<li class="site-header-logo site-header-logo-slide">';
			ob_start();
			the_custom_logo();
			$output .= ob_get_clean();
			$output .= '</li>';
		}

		$output .= "<li class='$li_classes'>";

		if ($item->url && $item->url != '#') {
			$output .= '<a href="' . esc_url($item->url) . '" tabindex="0">';
		} else {
			$output .= '<div class="menu-item toggle-item">';
			if ($depth === 0 && in_array('menu-item-has-children', is_array($item->classes) ? $item->classes : [])) {
				$output .= '<span class="submenu-toggle"><i class="bi bi-chevron-right"></i></span>';
			}
		}

		if ($depth === 1 && has_post_thumbnail($item->object_id)) {
			$output .= get_the_post_thumbnail($item->object_id, 'medium');
		}

		$output .= '<span class="submenu-item">' . esc_html($item->title) . '</span>';

		if ($item->url && $item->url != '#') {
			$output .= '</a>';
		} else {
			$output .= '</div>';
		}
	}

	/**
	 * End element.
	 */
	function end_el(&$output, $item, $depth = 0, $args = null) {
		$output .= "</li>";
	}
}
