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
	 * 
	 * Opens a new submenu `<ul>` element, with a custom CSS class based on the menu depth.
	 *
	 * @param string $output Appends the new submenu opening `<ul>` to the output string.
	 * @param int    $depth  Indicates the depth of the current menu item.
	 * @param array  $args   Additional arguments for the menu.
	 */
	function start_lvl(&$output, $depth = 0, $args = null) {
		$indent = str_repeat("\t", $depth);
		$submenu_class = $depth === 0 ? 'sub-menu' : 'nested-menu';
		$output .= "\n$indent<ul class=\"$submenu_class\">\n";
	}

	/**
	 * Start element.
	 *
	 * Outputs the opening `<li>` tag for each menu item, adds thumbnails for second-level items,
	 * includes the custom site logo at the first item, and manages link or span tags for each item.
	 *
	 * @param string $output Appends the menu item to the output string.
	 * @param object $item   The current menu item object.
	 * @param int    $depth  The depth of the current menu item.
	 * @param array  $args   Additional arguments for the menu.
	 * @param int    $id     The menu item ID.
	 */
	function start_el(&$output, $item, $depth = 0, $args = null, $id = 0) {
		// Adds custom classes to the `<li>` element based on menu item properties.
		$li_classes = implode(" ", $item->classes);

		// Appends 'has-thumbnail' class for second-level items with a featured image.
		if ($depth === 1 && has_post_thumbnail($item->object_id)) {
			$li_classes .= ' has-thumbnail';
		}

		// Renders the custom logo for the first menu item at the root level.
		if ($depth === 0 && $item->menu_order == 1) {
			$output .= '<li class="site-header-logo site-header-logo-slide">';
			ob_start();
			the_custom_logo();
			$output .= ob_get_clean();
			$output .= '</li>';
		}

		$output .= "<li class='$li_classes'>";

		// Creates either a link or a span, depending on the menu item's URL.
		if ($item->url && $item->url != '#') {
			$output .= '<a href="' . esc_url($item->url) . '" tabindex="0">';
		} else {
			$output .= '<div class="menu-item toggle-item">';
			// Adds a toggle icon for submenu items at the root level with child elements.
			if ($depth === 0 && in_array('menu-item-has-children', $item->classes)) {
				$output .= '<span class="submenu-toggle"><i class="bi bi-chevron-right"></i></span>';
			}
		}

		// Adds a thumbnail image for second-level items if available.
		if ($depth === 1 && has_post_thumbnail($item->object_id)) {
			$output .= get_the_post_thumbnail($item->object_id, 'medium');
		}

		// Displays the menu item's title text.
		$output .= '<span class="submenu-item">' .esc_html($item->title) . '</span>';

		// Closes either the `<a>` or `<span>` tag for the menu item.
		if ($item->url && $item->url != '#') {
			$output .= '</a>';
		} else {
			$output .= '</div>';
		}

		
	}

	/**
	 * End element.
	 * 
	 * Closes the `<li>` element for each menu item.
	 *
	 * @param string $output Appends the closing `</li>` tag to the output string.
	 * @param object $item   The current menu item object.
	 * @param int    $depth  The depth of the current menu item.
	 * @param array  $args   Additional arguments for the menu.
	 */
	function end_el(&$output, $item, $depth = 0, $args = null) {
		$output .= "</li>";
	}
}
