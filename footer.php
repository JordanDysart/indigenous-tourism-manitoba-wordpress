<?php
/**
 * The template for displaying the footer
 *
 * @package itm_indigpro
 */

$footer_background_color = get_theme_mod('footer_background_color', '#000000');
$footer_text_color = get_theme_mod('footer_text_color', '#ffffff');
?>
        </div><!-- #content -->
    </div><!-- #page -->

    <footer class="site-footer">
        <!-- Dynamic inline styles for the footer -->
        <style>
            .site-footer {
                background-color: <?php echo esc_attr($footer_background_color); ?>;
                color: <?php echo esc_attr($footer_text_color); ?>;
            }
            .site-footer a {
                color: <?php echo esc_attr($footer_text_color); ?>;
            }
        </style>

        <div class="site-footer-container">
            <div class="site-footer-container-left">
                <!-- Footer logo section -->
                <div class="site-footer-logo">
                    <?php if (get_theme_mod('footer_logo')) : ?>
                        <a href="<?php echo esc_url(home_url('/')); ?>">
                            <img src="<?php echo esc_url(get_theme_mod('footer_logo')); ?>" alt="<?php bloginfo('name'); ?> Logo">
                        </a>
                    <?php else : ?>
                        <p><?php bloginfo('name'); ?></p>
                    <?php endif; ?>
                </div>
                <h3 class="site-footer-title">Adventure To Understanding</h3>
                <!-- Footer Social Links section -->
                <div class="site-footer-social-links">
                    <?php
                        $footer_menu = wp_get_nav_menu_object('footer-menu');

                        if ($footer_menu) {
                            $social_links = itm_get_field('social_media_links', 'menu_' . $footer_menu->term_id);

                            if ($social_links) {
                                echo '<ul class="social-links">';

                                foreach ($social_links as $link) {
                                    $icon_url = esc_url($link['social_link_icon']['url']);
                                    $url = esc_url($link['social_link_url']);
                                    $title_link = esc_html($link['title_link']);
                                    echo '<li class="social-links-item">';
                                    echo '<a href="' . $url . '" title="' . $title_link . '" target="_blank">';
                                    echo '<img src="' . $icon_url . '" alt="' . $title_link . '" class="social-icon" />';
                                    echo '</a>';
                                    echo '</li>';
                                }

                                echo '</ul>';
                            } else {
                                echo 'No social links available.';
                            }
                        } else {
                            echo 'Footer menu not found.';
                        }
                    ?>
                </div>
            </div>
            <div class="site-footer-container-right">
                <!-- Footer navigation menu -->
                <nav class="site-footer-navigation">
                    <?php
                    if (has_nav_menu('footer-menu')) {
                        wp_nav_menu(array(
                            'theme_location' => 'footer-menu',
                            'container' => false,
                            'menu_id' => 'footer-menu',
                            'walker' => new Footer_Menu_Walker(),
                        ));
                    } else {
                        echo '<p>' . __('Assign a menu to the Footer Menu location.', 'itm_indigpro') . '</p>';
                    }
                    ?>
                </nav>
            </div>
        </div><!-- .site-footer-container -->

        <!-- Footer information section -->
        <div class="footer-divider"></div>

        <div class="footer-row">
            <!-- Left Column -->
            <div class="footer-column">
                <p>© <?php echo date('Y', strtotime('-1 year')); ?> - <?php echo date('Y'); ?>. All rights reserved</p>
            </div>

            <!-- Center Column -->
            <div class="footer-column">
                <a href="https://midflight.ca/" target="_blank"><p>Website Proudly Built in Treaty One Territory by Midflight</p></a>
            </div>

            <!-- Right Column -->
            <div class="footer-column">
                <a href="<?php echo site_url('/privacy-policy'); ?>">Privacy Policy</a>
            </div>
        </div><!-- .site-footer-info -->
    </footer>

    <?php wp_footer(); ?>
</body>
</html>
