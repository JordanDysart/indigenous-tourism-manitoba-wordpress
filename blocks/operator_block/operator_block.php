<section
    class="content-operators-map">

    <?php
    echo do_shortcode('[leaflet-map lat=49.88531957670153 lng=-97.17762828465725 scrollwheel [zoomhomemap fit|!fit]');

    $chosen_operators = itm_get_field('operators_to_display');

    if ($chosen_operators) {
        echo '<div class="content-operators-map-tabs-container">
                <h3 class="content-operators-map-title">Operators</h3>
                <ul class="content-operators-map-tabs-list">';

        $markers = '';

        foreach ($chosen_operators as $index => $operator_id) {
            $operator_title = get_the_title($operator_id);
            $operator_short_description = itm_get_field('operator_short_description', $operator_id);
            $operator_website = itm_get_field('operator_website', $operator_id);
            $operator_coordinates_latitude = itm_get_field('operator_coordinates_latitude', $operator_id);
            $operator_coordinates_longitude = itm_get_field('operator_coordinates_longitude', $operator_id);
            $operator_feature_image = itm_normalize_image( itm_get_field('operator_feature_image', $operator_id) );
            $operator_location = itm_get_field('operator_location', $operator_id);
            //$operator_category = itm_get_field('operator_category', $operator_id);
            //$operator_region = itm_get_field('operator_region', $operator_id);
            $operator_category = wp_get_post_terms($operator_id,'operator_category');
            $operator_region = wp_get_post_terms($operator_id,'operator_region');
			
            $operator_link = get_permalink($operator_id);

            $marker_icon = get_template_directory_uri() . '/blocks/operator_block/hoop-marker.png';
            $marker_shadow = get_template_directory_uri() . '/blocks/operator_block/hoop-marker-shadow.png';

            if ($operator_coordinates_latitude && $operator_coordinates_longitude) {
                $popup_content = '<div class="content-operators-map-popup">';
                if ($operator_feature_image) {
                    $popup_content .= '<img class="block-map-overlay" width="60" height="60" src="' . esc_url($operator_feature_image['url']) . '" alt="' . esc_attr($operator_title) . '">';
                }

                $popup_content .= '<div class="popup-content-description"><div class="popup-content"><h3 class="popup-title">' . esc_html($operator_title) . '</h3><p class="popup-description">' . esc_html($operator_short_description) . '</p><a class="popup-link" href="' . esc_url($operator_link) . '">Read More</a></div></div>';
                $popup_content .= '</div>';

                echo do_shortcode(
                    sprintf(
                        '[leaflet-marker id=marker-%s lat=%s lng=%s iconUrl="%s" iconSize="80,80" iconAnchor="40,80" shadowUrl="%s" shadowSize="80,80" shadowAnchor="40,80" _leaflet_id]%s[/leaflet-marker]',
                        $index,
                        esc_attr($operator_coordinates_latitude),
                        esc_attr($operator_coordinates_longitude),
                        esc_url($marker_icon),
                        esc_url($marker_shadow),
                        wp_kses_post($popup_content)
                    )
                );

                ?>
                <li class="content-operators-map-tabs-list-items operator-tab" data-lat="<?php echo esc_attr($operator_coordinates_latitude); ?>" data-lng="<?php echo esc_attr($operator_coordinates_longitude); ?>" data-index="marker-<?php echo $index; ?>">
                    <div class="block-map">
                        <div class="block-map-image">
                            <div class="block-map-divided"></div>
                            <div class="block-map-overlayStatic"></div>
                            <?php if ($operator_feature_image): ?>
                                <img
                                class="block-map-overlay" width="500" height="200" src="<?php echo esc_url($operator_feature_image['url']); ?>" alt="<?php echo esc_attr($operator_title); ?>">
                        <?php endif; ?>
                        </div>
                        <div class="block-map-content">
                            <div class="block-map-content-close">
                                <h2 class="block-map-content-title"><?php echo esc_html($operator_title); ?></h2>
                                <p class="block-map-content-location"><?php echo esc_html($operator_location); ?></p>
                            </div>
                            <div class="block-map-content-open">
                                <p class="block-map-content-category"><?php foreach($operator_category as $term) { echo $term->name .' '; } ?></p>
                                <p class="block-map-content-region"><?php foreach($operator_region as $term) { echo $term->name .' '; } ?></p>
                                <a class="block-map-content-button" href="<?php echo esc_url($operator_link); ?>" target="_blank" rel="noopener noreferrer">Find Out More</a>
                            </div>
                        </div>

                    </div>
                </li>
                <?php
            }
        }

        echo do_shortcode('[cluster]' . $markers . '[/cluster][zoomhomemap]');

        echo '</ul></div>';
    } else {
        echo '<p>No operators available to display.</p>';
    }
    ?>
</section>

