<?php
/**
 * Custom Walker class to modify the structure of WordPress navigation menus.
 *
 * Footer_Menu_Walker extends Walker_Nav_Menu to customize the display of menu items in the footer.
 * The walker converts top-level menu items into `<h4>` titles and makes sub-menu items retain their links.
 * The dropdown behavior is applied only on mobile devices using CSS.
 */
class Footer_Menu_Walker extends Walker_Nav_Menu {

    /**
     * Start level.
     *
     * Opens a new submenu `<ul>` element for mobile dropdown.
     * 
     * @param string $output The output string that will hold the HTML.
     * @param int    $depth The current level of the menu.
     * @param array  $args Additional arguments for the menu.
     */
    function start_lvl( &$output, $depth = 0, $args = null ) {
        $indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';

        // Add class for mobile dropdown behavior
        $submenu_class = 'sub-menu mobile-dropdown';  // This will be used to style the mobile dropdown
        $output .= "\n$indent<ul class=\"$submenu_class\">\n";
    }

    /**
     * Start element.
     *
     * This method outputs the opening `<li>` tag and wraps the item in `<h4>` for top-level items.
     * For submenu items, links are retained.
     *
     * @param string $output The output string that will hold the HTML.
     * @param object $item The current menu item object.
     * @param int    $depth The current level of the menu.
     * @param array  $args Additional arguments for the menu.
     * @param int    $id The ID of the menu item.
     */
    function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
        $classes = empty( $item->classes ) ? array() : (array) $item->classes;
        $classes[] = 'menu-item-' . $item->ID;
        $classes = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item, $args ) );
        $classes = $classes ? ' class="' . esc_attr( $classes ) . '"' : '';

        // Opening <li> tag
        $output .= '<li' . $classes . '>';

        // Add <h4> only for top-level menu items (depth 0)
        if ($depth === 0) {
            $output .= '<h4 class="footer-menu-title">' . esc_html( $item->title ) . '<span class="submenu-toggle"><i class="bi bi-chevron-right"></i></span></h4>';
        } else {
            $output .= '<a href="' . esc_url( $item->url ) . '">' . esc_html( $item->title ) . '</a>';
        }
    }

    /**
     * End element.
     *
     * Closes the `<li>` tag for each menu item.
     *
     * @param string $output The output string that will hold the HTML.
     * @param object $item The current menu item object.
     * @param int    $depth The current level of the menu.
     * @param array  $args Additional arguments for the menu.
     */
    function end_el( &$output, $item, $depth = 0, $args = null ) {
        $output .= '</li>';
    }
}
?>
