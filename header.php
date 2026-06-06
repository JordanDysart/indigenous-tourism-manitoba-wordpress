<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package itm_indigpro
 */

?>

<!doctype html>
<html <?php language_attributes(); ?>>
	<head>
		<!-- Google Analytics -->
		<script type="text/javascript" async src="https://www.googletagmanager.com/gtag/js?id=G-WCHFVCKNFZ&l=dataLayer&cx=c&gtm=45je4cc1v9181164437za200"></script>
		<script type="text/javascript">
		  window.dataLayer = window.dataLayer || [];
		  function gtag(){dataLayer.push(arguments);}
		  gtag('js', new Date());
		  gtag('config', 'G-WCHFVCKNFZ');
		</script>
		<!-- End Google Analytics -->
		
		<meta charset="<?php bloginfo('charset'); ?>">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link
		rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
	</head>

	<body <?php body_class(); ?>>
		<header id="masthead" class="site-header" role="banner">
			<div class="site-header-container">
				<div class="site-header-logo">
					<?php the_custom_logo(); ?>
				</div>
				<nav id="site-navigation" class="main-navigation" role="navigation">
					<button id="bar_menu" class="c-hamburger c-hamburger--htx">
						<span></span>
					</button>
					<?php
						wp_nav_menu(array(
							'theme_location' => 'primary-menu',
							'menu_id'        => 'primary-menu',
							'menu_class'     => 'nav-menu',
							'walker'         => new GAC_Menu_Walker()
						));
					?>
				</nav>
			</div>
		</header>
		<div id="page" class="site">
			<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e('Skip to content', 'itm_indigpro'); ?></a>

			<div id="content" class="site-content">
