<?php
/**
 * Mega Menu Structure Migration
 *
 * Configures the Primary Menu with multi-column hierarchy for Explore,
 * About ITM, and Membership.
 *
 * @package kiwatinook
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class ITM_Menu_Structure_Migration {

	const MENU_VERSION = '1.2.0';

	public static function init() {
		// Menu migrations are completely disabled for production.
	}

	public static function maybe_run_migration() {
		// Menu migrations are completely disabled for production.
	}

	public static function run_migration() {
		$menu = wp_get_nav_menu_object( 'primary-menu' );
		if ( ! $menu ) {
			$menu_id = wp_create_nav_menu( 'Primary Menu' );
		} else {
			$menu_id = $menu->term_id;
		}

		// Delete existing menu items to rebuild clean hierarchy
		$existing_items = wp_get_nav_menu_items( $menu_id );
		if ( ! empty( $existing_items ) ) {
			foreach ( $existing_items as $item ) {
				wp_delete_post( $item->ID, true );
			}
		}

		$order = 1;

		// ---------------------------------------------------------------------
		// 1. About ITM (Top-Level)
		// ---------------------------------------------------------------------
		$about_parent_id = wp_update_nav_menu_item( $menu_id, 0, [
			'menu-item-title'   => __( 'About ITM', 'kiwatinook' ),
			'menu-item-url'     => '/about-itm/',
			'menu-item-type'    => 'custom',
			'menu-item-status'  => 'publish',
			'menu-item-position'=> $order++,
		] );

		$about_col_id = wp_update_nav_menu_item( $menu_id, 0, [
			'menu-item-title'   => __( 'About ITM', 'kiwatinook' ),
			'menu-item-url'     => '#',
			'menu-item-type'    => 'custom',
			'menu-item-status'  => 'publish',
			'menu-item-parent-id' => $about_parent_id,
			'menu-item-position'=> $order++,
		] );

		$about_links = [
			[ 'title' => __( 'Who We Are', 'kiwatinook' ), 'url' => '/about-itm/' ],
			[ 'title' => __( 'Meet Our Team', 'kiwatinook' ), 'url' => '/our-team/' ],
			[ 'title' => __( 'Reconciliation', 'kiwatinook' ), 'url' => '/reconciliation/' ],
			[ 'title' => __( 'Our Operators', 'kiwatinook' ), 'url' => '/operators/' ],
			[ 'title' => __( 'ITM Events', 'kiwatinook' ), 'url' => '/events/' ],
		];

		foreach ( $about_links as $link ) {
			wp_update_nav_menu_item( $menu_id, 0, [
				'menu-item-title'   => $link['title'],
				'menu-item-url'     => $link['url'],
				'menu-item-type'    => 'custom',
				'menu-item-status'  => 'publish',
				'menu-item-parent-id' => $about_col_id,
				'menu-item-position'=> $order++,
			] );
		}

		// ---------------------------------------------------------------------
		// 2. Explore (Top-Level with Columns: By Region, By Category, Highlights)
		// ---------------------------------------------------------------------
		$explore_parent_id = wp_update_nav_menu_item( $menu_id, 0, [
			'menu-item-title'   => __( 'Explore', 'kiwatinook' ),
			'menu-item-url'     => '/things-to-do/',
			'menu-item-type'    => 'custom',
			'menu-item-status'  => 'publish',
			'menu-item-position'=> $order++,
		] );

		// Column 1: By Region
		$region_col_id = wp_update_nav_menu_item( $menu_id, 0, [
			'menu-item-title'   => __( 'By Region', 'kiwatinook' ),
			'menu-item-url'     => '#',
			'menu-item-type'    => 'custom',
			'menu-item-status'  => 'publish',
			'menu-item-parent-id' => $explore_parent_id,
			'menu-item-position'=> $order++,
		] );

		$regions = [
			[ 'title' => __( 'Central', 'kiwatinook' ), 'url' => '/operator-region/central/' ],
			[ 'title' => __( 'East', 'kiwatinook' ), 'url' => '/operator-region/east/' ],
			[ 'title' => __( 'North', 'kiwatinook' ), 'url' => '/operator-region/north/' ],
			[ 'title' => __( 'South', 'kiwatinook' ), 'url' => '/operator-region/south/' ],
			[ 'title' => __( 'West', 'kiwatinook' ), 'url' => '/operator-region/west/' ],
		];

		foreach ( $regions as $reg ) {
			wp_update_nav_menu_item( $menu_id, 0, [
				'menu-item-title'   => $reg['title'],
				'menu-item-url'     => $reg['url'],
				'menu-item-type'    => 'custom',
				'menu-item-status'  => 'publish',
				'menu-item-parent-id' => $region_col_id,
				'menu-item-position'=> $order++,
			] );
		}

		// Column 2: By Category
		$category_col_id = wp_update_nav_menu_item( $menu_id, 0, [
			'menu-item-title'   => __( 'By Category', 'kiwatinook' ),
			'menu-item-url'     => '#',
			'menu-item-type'    => 'custom',
			'menu-item-status'  => 'publish',
			'menu-item-parent-id' => $explore_parent_id,
			'menu-item-position'=> $order++,
		] );

		$categories = [
			[ 'title' => __( 'Accommodation', 'kiwatinook' ), 'url' => '/operator-category/accommodation/' ],
			[ 'title' => __( 'Culinary', 'kiwatinook' ), 'url' => '/operator-category/culinary/' ],
			[ 'title' => __( 'Outdoors & Adventure', 'kiwatinook' ), 'url' => '/operator-category/outdoors-and-adventures/' ],
			[ 'title' => __( 'Tours & Guiding', 'kiwatinook' ), 'url' => '/operator-category/tour-and-related-services/' ],
			[ 'title' => __( 'Workshops, Art & Culture', 'kiwatinook' ), 'url' => '/operator-category/workshops-art-culture/' ],
			[ 'title' => __( 'Attractions & Museums', 'kiwatinook' ), 'url' => '/operator-category/attractions/' ],
			[ 'title' => __( 'Events & Gatherings', 'kiwatinook' ), 'url' => '/operator-category/events/' ],
			[ 'title' => __( 'Retail & Authentic Crafts', 'kiwatinook' ), 'url' => '/operator-category/retail-and-other/' ],
		];

		foreach ( $categories as $cat ) {
			wp_update_nav_menu_item( $menu_id, 0, [
				'menu-item-title'   => $cat['title'],
				'menu-item-url'     => $cat['url'],
				'menu-item-type'    => 'custom',
				'menu-item-status'  => 'publish',
				'menu-item-parent-id' => $category_col_id,
				'menu-item-position'=> $order++,
			] );
		}

		// Column 3: Highlights
		$highlights_col_id = wp_update_nav_menu_item( $menu_id, 0, [
			'menu-item-title'   => __( 'Highlights', 'kiwatinook' ),
			'menu-item-url'     => '#',
			'menu-item-type'    => 'custom',
			'menu-item-status'  => 'publish',
			'menu-item-parent-id' => $explore_parent_id,
			'menu-item-position'=> $order++,
		] );

		$highlights = [
			[ 'title' => __( 'Things To Do', 'kiwatinook' ), 'url' => '/things-to-do/' ],
			[ 'title' => __( 'Explore Indigenous (The Forks)', 'kiwatinook' ), 'url' => '/the-forks/' ],
			[ 'title' => __( 'Experience Map', 'kiwatinook' ), 'url' => '/experience-map/' ],
			[ 'title' => __( 'All Operators Directory', 'kiwatinook' ), 'url' => '/operators/' ],
		];

		foreach ( $highlights as $hl ) {
			wp_update_nav_menu_item( $menu_id, 0, [
				'menu-item-title'   => $hl['title'],
				'menu-item-url'     => $hl['url'],
				'menu-item-type'    => 'custom',
				'menu-item-status'  => 'publish',
				'menu-item-parent-id' => $highlights_col_id,
				'menu-item-position'=> $order++,
			] );
		}

		// ---------------------------------------------------------------------
		// 3. Membership (Top-Level with Columns: Membership, Membership Benefits)
		// ---------------------------------------------------------------------
		$member_parent_id = wp_update_nav_menu_item( $menu_id, 0, [
			'menu-item-title'   => __( 'Membership', 'kiwatinook' ),
			'menu-item-url'     => '/become-a-member/',
			'menu-item-type'    => 'custom',
			'menu-item-status'  => 'publish',
			'menu-item-position'=> $order++,
		] );

		// Column 1: Membership
		$member_col_id = wp_update_nav_menu_item( $menu_id, 0, [
			'menu-item-title'     => __( 'Membership', 'kiwatinook' ),
			'menu-item-url'       => '#',
			'menu-item-type'      => 'custom',
			'menu-item-status'    => 'publish',
			'menu-item-parent-id' => $member_parent_id,
			'menu-item-position'  => $order++,
		] );

		$member_links = [
			[ 'title' => __( 'Become a Member', 'kiwatinook' ), 'url' => '/become-a-member/' ],
			[ 'title' => __( 'New Account Request', 'kiwatinook' ), 'url' => '/new-account-request/' ],
		];

		foreach ( $member_links as $mlink ) {
			wp_update_nav_menu_item( $menu_id, 0, [
				'menu-item-title'     => $mlink['title'],
				'menu-item-url'       => $mlink['url'],
				'menu-item-type'      => 'custom',
				'menu-item-status'    => 'publish',
				'menu-item-parent-id' => $member_col_id,
				'menu-item-position'  => $order++,
			] );
		}

		// Column 2: Membership Benefits
		$member_benefits_col_id = wp_update_nav_menu_item( $menu_id, 0, [
			'menu-item-title'     => __( 'Membership Benefits', 'kiwatinook' ),
			'menu-item-url'       => '#',
			'menu-item-type'      => 'custom',
			'menu-item-status'    => 'publish',
			'menu-item-parent-id' => $member_parent_id,
			'menu-item-position'  => $order++,
		] );

		$member_benefits_links = [
			[ 'title' => __( 'Member Benefits', 'kiwatinook' ), 'url' => '/member-benefits/' ],
			[ 'title' => __( 'Explore Indigenous for ITM Members', 'kiwatinook' ), 'url' => '/explore-indigenous-for-itm-members/' ],
		];

		foreach ( $member_benefits_links as $mblink ) {
			wp_update_nav_menu_item( $menu_id, 0, [
				'menu-item-title'     => $mblink['title'],
				'menu-item-url'       => $mblink['url'],
				'menu-item-type'      => 'custom',
				'menu-item-status'    => 'publish',
				'menu-item-parent-id' => $member_benefits_col_id,
				'menu-item-position'  => $order++,
			] );
		}

		// ---------------------------------------------------------------------
		// 4. Contact Us (Direct Top-Level Link)
		// ---------------------------------------------------------------------
		wp_update_nav_menu_item( $menu_id, 0, [
			'menu-item-title'   => __( 'Contact Us', 'kiwatinook' ),
			'menu-item-url'     => '/contact-us/',
			'menu-item-type'    => 'custom',
			'menu-item-status'  => 'publish',
			'menu-item-position'=> $order++,
		] );

		// Set primary-menu theme location
		$locations = get_theme_mod( 'nav_menu_locations' );
		$locations['primary-menu'] = $menu_id;
		set_theme_mod( 'nav_menu_locations', $locations );

		update_option( 'itm_menu_structure_version', self::MENU_VERSION );
	}
}

// ITM_Menu_Structure_Migration::init();
