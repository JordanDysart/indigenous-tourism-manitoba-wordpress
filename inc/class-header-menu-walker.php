<?php

/**
 * Custom Walker class for Accessible Multi-Column Mega Menu Navigation.
 *
 * Emits semantic HTML with multi-column category/region layouts and a prominent
 * Sanity CMS-style right-side featured showcase card.
 *
 * @package kiwatinook
 */

if (! defined('ABSPATH')) {
    exit;
}

class GAC_Menu_Walker extends Walker_Nav_Menu
{

    /**
     * Stores the current top-level (depth 0) menu item.
     *
     * @var WP_Post|null
     */
    protected $current_top_item = null;

    /**
     * Starts the list before the elements are added.
     *
     * @param string   $output Used to append additional content (passed by reference).
     * @param int      $depth  Depth of menu item. Used for padding.
     * @param stdClass $args   An object of wp_nav_menu() arguments.
     */
    public function start_lvl(&$output, $depth = 0, $args = null)
    {
        $indent = str_repeat("\t", $depth);

        if (0 === $depth) {
            $output .= "\n$indent<div class=\"mega-menu-panel\" role=\"region\" aria-label=\"Submenu\">\n";
            $output .= "$indent\t<div class=\"mega-menu-container\">\n";
            $output .= "$indent\t\t<div class=\"mega-menu-content\">\n";
            $output .= "$indent\t\t\t<ul class=\"sub-menu mega-menu-columns\">\n";
        } else {
            $output .= "\n$indent<ul class=\"nested-menu\">\n";
        }
    }

    /**
     * Ends the list after the elements are added.
     *
     * @param string   $output Used to append additional content (passed by reference).
     * @param int      $depth  Depth of menu item. Used for padding.
     * @param stdClass $args   An object of wp_nav_menu() arguments.
     */
    public function end_lvl(&$output, $depth = 0, $args = null)
    {
        $indent = str_repeat("\t", $depth);

        if (0 === $depth) {
            $output .= "$indent\t\t\t</ul>\n"; // Close mega-menu-columns

            // Render the Right-Side Featured Showcase Card (Sanity CMS Pattern)
            $featured = $this->get_featured_card_data($this->current_top_item);
            if (! empty($featured)) {
                $output .= "$indent\t\t\t<div class=\"mega-menu-featured\">\n";
                $output .= "$indent\t\t\t\t<div class=\"mega-menu-featured-card\">\n";

                if (! empty($featured['image_url'])) {
                    $output .= "$indent\t\t\t\t\t<div class=\"mega-menu-featured-media\">\n";
                    $output .= "$indent\t\t\t\t\t\t<img src=\"" . esc_url($featured['image_url']) . "\" alt=\"" . esc_attr($featured['title']) . "\" loading=\"lazy\" />\n";
                    if (! empty($featured['badge'])) {
                        $output .= "$indent\t\t\t\t\t\t<span class=\"mega-menu-featured-badge\">" . esc_html($featured['badge']) . "</span>\n";
                    }
                    $output .= "$indent\t\t\t\t\t</div>\n";
                }

                $output .= "$indent\t\t\t\t\t<div class=\"mega-menu-featured-body\">\n";
                if (empty($featured['image_url']) && ! empty($featured['badge'])) {
                    $output .= "$indent\t\t\t\t\t\t<span class=\"mega-menu-featured-badge\">" . esc_html($featured['badge']) . "</span>\n";
                }
                if (! empty($featured['title'])) {
                    $output .= "$indent\t\t\t\t\t\t<h3 class=\"mega-menu-featured-title\">" . esc_html($featured['title']) . "</h3>\n";
                }
                if (! empty($featured['description'])) {
                    $output .= "$indent\t\t\t\t\t\t<p class=\"mega-menu-featured-desc\">" . esc_html($featured['description']) . "</p>\n";
                }
                if (! empty($featured['button_url']) && ! empty($featured['button_text'])) {
                    $output .= "$indent\t\t\t\t\t\t<a href=\"" . esc_url($featured['button_url']) . "\" class=\"mega-menu-featured-btn\">" . esc_html($featured['button_text']) . " <i class=\"bi bi-arrow-right\"></i></a>\n";
                }
                $output .= "$indent\t\t\t\t\t</div>\n";
                $output .= "$indent\t\t\t\t</div>\n";
                $output .= "$indent\t\t\t</div>\n";
            }

            $output .= "$indent\t\t</div>\n"; // Close mega-menu-content
            $output .= "$indent\t</div>\n";    // Close mega-menu-container
            $output .= "$indent</div>\n";       // Close mega-menu-panel
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
    public function start_el(&$output, $item, $depth = 0, $args = null, $id = 0)
    {
        $indent = ($depth) ? str_repeat("\t", $depth) : '';

        if (0 === $depth) {
            $this->current_top_item = $item;
        }

        $classes   = empty($item->classes) ? array() : (array) $item->classes;
        $classes[] = 'menu-item-' . $item->ID;

        if (0 === $depth && in_array('menu-item-has-children', $classes, true)) {
            $classes[] = 'mega-menu-parent';
        } elseif (1 === $depth) {
            $classes[] = 'mega-menu-column';
        }

        $class_names = implode(' ', array_filter($classes));
        $class_names = $class_names ? ' class="' . esc_attr($class_names) . '"' : '';
        $id_attr     = ! empty($item->ID) ? ' id="menu-item-' . esc_attr($item->ID) . '"' : '';

        $output .= $indent . '<li' . $id_attr . $class_names . '>';

        // Anchor link attributes
        $atts           = array();
        $atts['title']  = ! empty($item->attr_title) ? $item->attr_title : '';
        $atts['target'] = ! empty($item->target) ? $item->target : '';
        if ('_blank' === $item->target && empty($item->xfn)) {
            $atts['rel'] = 'noopener noreferrer';
        } else {
            $atts['rel'] = $item->xfn;
        }
        $atts['href'] = ! empty($item->url) ? $item->url : '';

        if (0 === $depth && in_array('menu-item-has-children', $classes, true)) {
            $atts['aria-haspopup'] = 'true';
            $atts['aria-expanded'] = 'false';
        }

        $atts_str = '';
        foreach ($atts as $attr => $value) {
            if (! empty($value)) {
                $value     = ('href' === $attr) ? esc_url($value) : esc_attr($value);
                $atts_str .= ' ' . $attr . '="' . $value . '"';
            }
        }

        $title = apply_filters('the_title', $item->title, $item->ID);
        $has_valid_url = ! empty($item->url) && '#' !== trim($item->url);

        $item_output = '';

        if (1 === $depth) {
            // Depth 1: Column Header
            if ($has_valid_url) {
                $item_output .= '<a' . $atts_str . ' class="mega-menu-column-heading-link">';
                $item_output .= '<span class="mega-menu-column-heading">' . esc_html($title) . '</span>';
                $item_output .= '</a>';
            } else {
                $item_output .= '<div class="mega-menu-column-header">';
                $item_output .= '<span class="mega-menu-column-heading">' . esc_html($title) . '</span>';
                $item_output .= '</div>';
            }
        } else {
            // Depth 0 or Depth 2+ Link
            if ($has_valid_url) {
                $item_output .= '<a' . $atts_str . '>';
            } else {
                $item_output .= '<div class="menu-item toggle-item">';
            }

            $item_output .= '<span class="submenu-item">' . esc_html($title) . '</span>';

            // Submenu chevron toggle for mobile drawer
            if (0 === $depth && in_array('menu-item-has-children', $classes, true)) {
                $item_output .= '<button class="submenu-toggle-btn" aria-label="' . esc_attr__('Toggle Submenu', 'kiwatinook') . '"><i class="bi bi-chevron-down"></i></button>';
            }

            if ($has_valid_url) {
                $item_output .= '</a>';
            } else {
                $item_output .= '</div>';
            }
        }

        $output .= apply_filters('walker_nav_menu_start_el', $item_output, $item, $depth, $args);
    }

    /**
     * Ends the element output.
     *
     * @param string   $output Used to append additional content (passed by reference).
     * @param WP_Post  $item   Page data object. Not used.
     * @param int      $depth  Depth of page. Not Used.
     * @param stdClass $args   An object of wp_nav_menu() arguments.
     */
    public function end_el(&$output, $item, $depth = 0, $args = null)
    {
        $output .= "</li>\n";
    }

    /**
     * Returns curated showcase card data for the right side of the mega menu.
     *
     * @param WP_Post|null $parent_item
     * @return array
     */
    protected function get_featured_card_data($parent_item)
    {
        if (! $parent_item) {
            return [];
        }

        $slug = sanitize_title($parent_item->title);
        $featured = [];

        switch ($slug) {
            case 'explore':
            case 'things-to-do':
                $image_url = wp_get_attachment_image_url(3072, 'large');
                if (! $image_url) {
                    $image_url = '/wp-content/uploads/2026/08/whiteshell-petroforms-resized-1.jpg';
                }
                $featured = [
                    'badge'       => __('Featured Destination', 'kiwatinook'),
                    'title'       => __('Discover Authentic Experiences', 'kiwatinook'),
                    'description' => __('Connect with Indigenous culture, guided wilderness tours, authentic cuisine, and traditional arts across Manitoba.', 'kiwatinook'),
                    'image_url'   => $image_url,
                    'button_text' => __('Explore All Operators', 'kiwatinook'),
                    'button_url'  => '/operators/',
                ];
                break;

            case 'about-itm':
            case 'about':
                $image_url = wp_get_attachment_image_url(422, 'large');
                if (! $image_url) {
                    $image_url = '/wp-content/uploads/2024/10/about-itm.jpg';
                }
                $featured = [
                    'badge'       => __('About ITM', 'kiwatinook'),
                    'title'       => __('Empowering Indigenous Voices', 'kiwatinook'),
                    'description' => __('Growing and supporting authentic Indigenous tourism entrepreneurs and communities across Manitoba.', 'kiwatinook'),
                    'image_url'   => $image_url,
                    'button_text' => __('Our Vision & Purpose', 'kiwatinook'),
                    'button_url'  => '/about-itm/',
                ];
                break;

            case 'guide-training-program':
            case 'guide-training':
                $image_url = wp_get_attachment_image_url(2975, 'large');
                if (! $image_url) {
                    $image_url = '/wp-content/uploads/2026/03/20250704-ReannaKhan540.jpg';
                }
                $featured = [
                    'badge'       => __('Training Pathway', 'kiwatinook'),
                    'title'       => __('Become a Certified Guide', 'kiwatinook'),
                    'description' => __('Tuition-free, culturally-grounded training program with hands-on wilderness modules and paid placements.', 'kiwatinook'),
                    'image_url'   => $image_url,
                    'button_text' => __('Inquire & Apply', 'kiwatinook'),
                    'button_url'  => '/itm-indigenous-guide-training-program-inquiry-form/',
                ];
                break;

            case 'membership':
                $image_url = wp_get_attachment_image_url(2716, 'large');
                if (! $image_url) {
                    $image_url = '/wp-content/uploads/2025/05/4-1.png';
                }
                $featured = [
                    'badge'       => __('Partner With Us', 'kiwatinook'),
                    'title'       => __('Grow Your Tourism Business', 'kiwatinook'),
                    'description' => __('Join Manitoba\'s premier Indigenous tourism network with dedicated marketing programs and grant support.', 'kiwatinook'),
                    'image_url'   => $image_url,
                    'button_text' => __('Become a Member', 'kiwatinook'),
                    'button_url'  => '/become-a-member/',
                ];
                break;
        }

        return apply_filters('itm_mega_menu_featured_card', $featured, $parent_item);
    }
}
