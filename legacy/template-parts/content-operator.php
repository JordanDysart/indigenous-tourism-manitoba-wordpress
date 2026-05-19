<?php
$operator_id = get_the_ID(); // Get the current operator ID
$operator_title = get_the_title($operator_id);
$operator_description = get_post_field('post_content', $operator_id);

$operator_website = get_field('operator_website', $operator_id);
$operator_phone_number = get_field('operator_phone_number', $operator_id);
$operator_business_email = get_field('operator_business_email', $operator_id);
$operator_location = get_field('operator_location', $operator_id);
$operator_address = get_field('operator_address', $operator_id);
$operator_region = get_field('operator_region', $operator_id);
$operator_category = get_field('operator_category', $operator_id);

$operator_short_description = get_field('operator_short_description', $operator_id);
$operator_feature_image = get_field('operator_feature_image', $operator_id);
$operator_photos = get_field('operator_photos',$operator_id);

$operator_coordinates_latitude = get_field('operator_coordinates_latitude', $operator_id);
$operator_coordinates_longitude = get_field('operator_coordinates_longitude', $operator_id);
$operator_coordinates_altitude = get_field('operator_coordinates_altitude', $operator_id);
?>

<div class="operator-content">
    <div class="operator-content-lead">
        <?php if ($operator_feature_image): ?>
            <div class="operator-content-feature-image">
                <img data-fancybox="gallery" width="100%" height="100%" src="<?php echo esc_url($operator_feature_image['url']); ?>" alt="<?php echo esc_attr($operator_feature_image['alt']); ?>" />
            </div>
        <?php endif; ?>
    
        <?php if($operator_photos): ?>
            <div class="operator-content-feature-images">
                <?php foreach($operator_photos as $photo): ?>
                    <div class="operator-content-feature-images-grid">
                        <img data-fancybox="gallery" width="100%" height="auto" src="<?php echo esc_url($photo['url']); ?>" alt="<?php echo esc_attr($photo['alt']); ?>" />
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>

    <div class="operator-content-body">
        <div class="operator-content-body-row-left">
            <h1 class="operator-title"><?php echo esc_html($operator_title); ?></h1>
    
            <?php if ($operator_description): ?>
                <?php echo apply_filters('the_content', $operator_description); ?>
            <?php endif; ?>

            <hr class="dashed-line">

            <div class="site-footer-social-links">
                <?php
                    // Retrieve the Footer Menu object
                    $footer_menu = wp_get_nav_menu_object('footer-menu'); // Call name 

                    // Check if the Footer Menu exists
                    if ($footer_menu) {
                        // Fetch social links field associated with the menu
                        $social_links = get_field('social_media_links', 'menu_' . $footer_menu->term_id);

                        // Check if social links are available
                        if ($social_links) {
                            echo '<ul class="social-links">';
                            echo ' <p class="social-share">Share:</p>';
                            // Loop through and display each social link
                            foreach ($social_links as $link) {
                                $icon_url = esc_url($link['social_link_icon']['url']);
                                $url = esc_url($link['social_link_url']);
                                $title_link = esc_html($link['title_link']); // Alternative or additional title
                                echo '<li class="social-links-item">';
                                // Render social link with icon and title
                                echo '<a href="' . $url . '" title="' . $title_link . '" target="_blank" class="icon-bg">';
                                echo '<img src="' . $icon_url . '" alt="' . $title . '" class="social-icon" />';
                                echo '</a>';
                                echo '</li>';
                            }

                            echo '</ul>'; // End of social links container
                        } else {
                            echo 'No social links available.'; // Message if no links are found
                        }
                    } else {
                        echo 'Footer menu not found.'; // Message if the Footer Menu is not found
                    }
                ?>
            </div>
        </div>
        <div class="operator-content-body-row-right">
            <div class="operator-content-body-row-right-card">
                <h3>Discover <?php echo esc_html($operator_category); ?></h3>
                <ul>
                    <li>
                        <?php if ($operator_address): ?>
                            <p class="operator-content-body-info">Address:</p>
                            <p class="operator-content-body-result"><?php echo esc_html($operator_address); ?></p>
                        <?php endif; ?>
                    </li>
                    <li>
                        <?php if ($operator_location): ?>
                            <p class="operator-content-body-info">City: </p>
                            <p class="operator-content-body-result"><?php echo esc_html($operator_location); ?></p>
                        <?php endif; ?>
                    </li>
                    <li>
                        <?php if ($operator_phone_number): ?>
                            <p class="operator-content-body-info">Phone: </p>
                            <p class="operator-content-body-result"><?php echo esc_html($operator_phone_number); ?></p>
                        <?php endif; ?>
                    </li>
                    <li>
                        <?php if ($operator_business_email): ?>
                            <p class="operator-content-body-info">Email: </p>
                            <a class="operator-content-body-result mail" href="mailto:<?php echo esc_html($operator_business_email); ?>"><?php echo esc_html($operator_business_email); ?></a>
                        <?php endif; ?>
                    </li>
                </ul>
                <div class="operator-content-body-row-right-card-button">
                    <p>Find Out More</p>
                    <?php if ($operator_website): ?>
                        <a href="<?php echo esc_url($operator_website); ?>" target="_blank">Visit Website</a>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>
    <div>
        <?php echo do_shortcode("[reblex id='1826']"); ?>
    </div>
</div>
