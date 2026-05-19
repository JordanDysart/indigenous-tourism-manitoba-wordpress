<?php
// Get field values
$title_group = get_field('title_group');
$description_group = get_field('description_group');

if ($title_group) {
  $title = $title_group['title'];
  $text_color = $title_group['text_color']?: '#000';
  $font_size = $title_group['font_size'];

  $style = '';
  if ($text_color) {
      $style .= 'color: ' . esc_attr($text_color) . ';';
  }
  if ($font_size) {
      $style .= 'font-size: ' . floatval($font_size) . 'em;';
  }
}

if ($description_group) {

  $description_title = $description_group['text_body'];
  $description_text_color = $description_group['color_text_body'];
  $description_font_size = $description_group['font_size'];
  $description_font_weight = $description_group['font_weight'];
  $description_font_size = $description_group['font_size'];

  $description_style = '';
  if ($description_text_color) {
    $description_style .= 'color: ' . esc_attr($description_text_color) . ';';
  }
  if ($description_font_size) {
    $description_style .= 'font-size: ' . floatval($description_font_size) . 'em;';
  }
  if ($description_font_weight) {
    $description_style .= 'font-weight:' . esc_attr($description_font_weight). ';';
  }
}
$background_image = get_field('background_image');
$overlay_opacity = get_field('overlay_opacity') ?: 20;
$overlay_color = get_field('overlay_color') ?: '#000';
$main_image = get_field('main_image');
$text_alignment = get_field('text_alignment');

$text_alignment_class = $text_alignment ? 'text-align-' . $text_alignment : 'text-align-left';

// Get the selected block class

$block_class = isset($block['className']) ? $block['className'] : '';
?>

<div class="banner-block <?php echo esc_attr($block_class . ' ' . $text_alignment_class); ?>" style="background-image: url('<?php echo esc_url($background_image['url']); ?>');">
    <div class="banner-block-overlay" style="background-color: <?php echo esc_attr($overlay_color); ?>; opacity: <?php echo esc_attr($overlay_opacity / 100); ?>;"></div>
    <div class="banner-block-content">
        <div class="banner-block-row-text">
          <?php if ($title): ?>
              <h2 class="banner-block-title"  style="<?php echo esc_attr($style); ?>"><?php echo esc_html($title); ?></h2>
          <?php endif; ?>
  
          <?php if ($description_title): ?>
              <p class="banner-block-description" style="<?php echo esc_attr($description_style); ?>"><?php echo esc_html($description_title); ?></p>
          <?php endif; ?>
        </div>

        <div class="banner-block-row-image">
          <?php if ($main_image): ?>
            <img class="banner-block-cover-image" src="<?php echo get_template_directory_uri(); ?>/blocks/banner_block/ITM_Hoop.svg" alt="Static Content Image">
            <img class="banner-block-image" src="<?php echo esc_url($main_image['url']); ?>" alt="<?php echo esc_attr($main_image['alt']); ?>">
          <?php endif; ?>
        </div>
    </div>
</div>
