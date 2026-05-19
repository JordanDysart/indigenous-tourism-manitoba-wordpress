<?php
$operator_id = get_the_ID();
$operator_title = get_the_title($operator_id);
$operator_description = get_post_field('post_content', $operator_id);
$operator_website = itm_get_field('operator_website', $operator_id);
$operator_phone_number = itm_get_field('operator_phone_number', $operator_id);
$operator_business_email = itm_get_field('operator_business_email', $operator_id);
$operator_location = itm_get_field('operator_location', $operator_id);
$operator_address = itm_get_field('operator_address', $operator_id);
$operator_region = itm_get_field('operator_region', $operator_id);
$operator_category = itm_get_field('operator_category', $operator_id);
$operator_short_description = itm_get_field('operator_short_description', $operator_id);
$operator_feature_image = itm_get_field('operator_feature_image', $operator_id);
$operator_photos = itm_get_field('operator_photos', $operator_id);
$operator_coordinates_latitude = itm_get_field('operator_coordinates_latitude', $operator_id);
$operator_coordinates_longitude = itm_get_field('operator_coordinates_longitude', $operator_id);
$operator_coordinates_altitude = itm_get_field('operator_coordinates_altitude', $operator_id);
?>

<?php
get_header();

echo do_shortcode("[breadcrumb]");

$current_term = get_queried_object();

if ( ! $current_term || ! isset( $current_term->taxonomy ) ) {
    echo '<p>Not Found Term Taxonomy.</p>';
    get_footer();
    exit;
}

$args = array(
    'post_type' => 'operator',
    'posts_per_page' => -1,
    'tax_query' => array(
        array(
            'taxonomy' => $current_term->taxonomy,
            'field'    => 'slug',
            'terms'    => $current_term->slug,
        ),
    ),
);

$filtered_query = new WP_Query( $args );

echo '<ul class="columns-4 operator-list-module-items wp-block-post-template is-layout-grid wp-container-core-post-template-is-layout-1 wp-block-post-template-is-layout-grid">';

if ( $filtered_query->have_posts() ) {
    while ( $filtered_query->have_posts() ) {
        $filtered_query->the_post();

        $operator_category = wp_get_post_terms(get_the_ID(), 'operator_category');
        $operator_region = wp_get_post_terms(get_the_ID(), 'operator_region');
        $thumbnail_url = get_the_post_thumbnail_url(get_the_ID(), 'full');

        echo '<li class="wp-block-post post-' . esc_attr(get_the_ID()) . ' operator type-operator status-publish has-post-thumbnail hentry '
            . (!empty($operator_category) ? 'operator_category-' . sanitize_html_class($operator_category[0]->slug) . ' ' : '')
            . (!empty($operator_region) ? 'operator_region-' . sanitize_html_class($operator_region[0]->slug) : '') . '">';

        if ($thumbnail_url) {
            echo '<figure style="aspect-ratio:1;width:300px;height:300px;" class="wp-block-post-featured-image">';
            echo '<a href="' . esc_url(get_permalink()) . '" target="_self" style="height:300px">';
            echo '<img loading="lazy" decoding="async" src="' . esc_url($thumbnail_url) . '" class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="' . esc_attr(get_the_title()) . '" style="width:100%;height:100%;object-fit:cover;">';
            echo '</a>';
            echo '</figure>';
        }

        if (!empty($operator_region)) {
            echo '<div style="color:#da5225;font-size:1.13rem;font-style:normal;font-weight:700" class="taxonomy-operator_region has-link-color wp-elements-f73f0efa918dea6e52bc4da62e4f3cf0 wp-block-post-terms has-text-color">';
            echo '<a href="' . esc_url(get_term_link($operator_region[0])) . '" rel="tag">' . esc_html($operator_region[0]->name) . '</a>';
            echo '</div>';
        }

        echo '<h2 style="font-size:1.13rem;font-style:normal;font-weight:700;" class="has-link-color wp-elements-992cb9ba7baa2105e31fa2add54a631a wp-block-post-title has-text-color has-black-color">';
        echo '<a href="' . esc_url(get_permalink()) . '" target="_self">' . esc_html(get_the_title()) . '</a>';
        echo '</h2>';

        echo '</li>';
    }

    wp_reset_postdata();
} else {
    echo '<p>No found Taxonomy.</p>';
}
echo '</ul>';

get_footer();
?>
