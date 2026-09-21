<?php
/**
 * The template for displaying single posts (News mentions & Newsletters).
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package kiwatinook
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

ob_start();
echo do_shortcode( '[breadcrumb]' );
$breadcrumb_html = ob_get_clean();
if ( ! empty( $breadcrumb_html ) ) {
	echo $breadcrumb_html;
}
?>

<div id="primary" class="content-area">
	<main id="main" class="site-main">

	<?php
	while ( have_posts() ) :
		the_post();

		$categories     = get_the_category();
		$posts_page_id  = (int) get_option( 'page_for_posts' );
		$all_url        = $posts_page_id ? get_permalink( $posts_page_id ) : home_url( '/updates/' );
		?>

		<header class="single-post-hero">
			<div class="single-post-hero__inner">
				<div class="single-post-hero__meta">
					<?php if ( ! empty( $categories ) ) : ?>
						<div class="single-post-hero__categories">
							<?php foreach ( $categories as $cat ) : ?>
								<a href="<?php echo esc_url( get_category_link( $cat->term_id ) ); ?>" class="itm-post-card__category">
									<?php echo esc_html( $cat->name ); ?>
								</a>
							<?php endforeach; ?>
						</div>
					<?php endif; ?>
					<time class="single-post-hero__date" datetime="<?php echo esc_attr( get_the_date( 'c' ) ); ?>">
						<?php echo esc_html( get_the_date( 'F j, Y' ) ); ?>
					</time>
				</div>

				<?php the_title( '<h1 class="single-post-hero__title">', '</h1>' ); ?>
			</div>
		</header>

		<article id="post-<?php the_ID(); ?>" <?php post_class( 'single-post-article' ); ?>>
			<?php if ( has_post_thumbnail() ) : ?>
				<div class="single-post-article__featured-image itm-post-card__media" style="margin-bottom: 2.5rem; border-radius: 12px; overflow: hidden;">
					<?php the_post_thumbnail( 'large', array( 'alt' => get_the_title() ) ); ?>
				</div>
			<?php endif; ?>

			<div class="entry-content">
				<?php
				the_content();

				wp_link_pages( array(
					'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'kiwatinook' ),
					'after'  => '</div>',
				) );
				?>
			</div><!-- .entry-content -->

			<footer class="single-post-article__footer">
				<a href="<?php echo esc_url( $all_url ); ?>" class="link-view-all">
					&larr; <?php esc_html_e( 'Back to All Updates', 'kiwatinook' ); ?>
				</a>

				<div class="single-post-article__nav">
					<?php
					the_post_navigation( array(
						'prev_text' => '<span class="nav-subtitle">' . esc_html__( 'Previous:', 'kiwatinook' ) . '</span> <span class="nav-title">%title</span>',
						'next_text' => '<span class="nav-subtitle">' . esc_html__( 'Next:', 'kiwatinook' ) . '</span> <span class="nav-title">%title</span>',
					) );
					?>
				</div>
			</footer>
		</article>

		<?php
	endwhile;
	?>

	</main><!-- #main -->
</div><!-- #primary -->

<?php
get_footer();
