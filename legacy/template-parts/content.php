<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package itm_indigpro
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="entry-header alignfull">
		<div class="entry-header-container wrap">
			<div
				class="entry-header-left">
				<?php if ('post' === get_post_type()): ?>
					<div
						class="entry-meta"><?php
						echo '<p class="published-date"> ' . get_the_date() . '</p>';
						?>
					</div>
					<!-- .entry-meta -->
			<?php endif; ?>
				<?php the_title('<h1 class="entry-title">', '</h1>');
				$tags = get_the_tags();
				if ($tags) {
					echo '<div class="entry-tags">';
					foreach ($tags as $tag) {
						echo '<span class="entry-tags-item">' . esc_html($tag->name) . '</span>';
					}
					echo '</div><!-- .entry-tags -->';
				} ?>
			</div>

			<div
				class="entry-header-right"><?php
				itm_indigpro_post_thumbnail();
				?>
			</div>
		</div>

	</header>
	<!-- .entry-header -->


	<div class="main-content">
		<div
			class="entry-content"><?php
			the_content(sprintf(
				wp_kses(
					/* translators: %s: Name of current post. Only visible to screen readers */
					__('Continue reading<span class="screen-reader-text"> "%s"</span>', 'itm_indigpro'),
					array(
						'span' => array(
							'class' => array(),
						),
					)
				),
				get_the_title()
			));

			wp_link_pages(array(
				'before' => '<div class="page-links">' . esc_html__('Pages:', 'itm_indigpro'),
				'after' => '</div>',
			));
			?>
		</div>
		<div
			class="entry-quote"><?php
			$post_id = get_the_ID();
			$post_quote = get_post_meta($post_id, 'quote', true);

			if (!empty($post_quote)) {
				echo '<div class="custom-quote">';
				echo esc_html($post_quote);
				echo '</div>';
			} else {
				echo '<div class="custom-quote"></div>';
			}
			?>
		</div>
	</div>


	<footer
		class="entry-footer"><?php itm_indigpro_entry_footer(); ?>
	</footer>
	<!-- .entry-footer -->
</article>
<!-- #post-<?php the_ID(); ?> -->

