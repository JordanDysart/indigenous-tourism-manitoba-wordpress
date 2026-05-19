<?php
/**
 * Custom Walker class for the footer navigation menu.
 */
class Footer_Menu_Walker extends Walker_Nav_Menu {

	function start_lvl(&$output, $depth = 0, $args = null) {
		$output .= '<ul class="sub-menu mobile-dropdown">' . "\n";
	}

	function start_el(&$output, $item, $depth = 0, $args = null, $id = 0) {
		$classes = empty($item->classes) ? [] : (array) $item->classes;

		if ($depth === 0) {
			$output .= '<li class="' . esc_attr(implode(' ', $classes)) . '">';
			$output .= '<h4 class="footer-menu-title">';
			$output .= esc_html($item->title);
			$output .= '<span class="submenu-toggle"><i class="bi bi-chevron-right"></i></span>';
			$output .= '</h4>';
		} else {
			$output .= '<li class="' . esc_attr(implode(' ', $classes)) . '">';
			$output .= '<a href="' . esc_url($item->url) . '">' . esc_html($item->title) . '</a>';
		}
	}

	function end_el(&$output, $item, $depth = 0, $args = null) {
		$output .= '</li>' . "\n";
	}
}
