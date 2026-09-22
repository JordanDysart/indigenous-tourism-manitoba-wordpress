<?php
/**
 * Template part for displaying "THE TEA" Newsletter Archive
 *
 * Provides a responsive 3-column issue archive grid and integrated Constant Contact signup module.
 *
 * @package kiwatinook
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// 1. Query for published newsletter issues in category 'newsletter' or 'the-tea'
$newsletter_paged = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;
$archive_query_args = array(
	'post_type'      => 'post',
	'post_status'    => 'publish',
	'posts_per_page' => 12,
	'paged'          => $newsletter_paged,
	'tax_query'      => array(
		'relation' => 'OR',
		array(
			'taxonomy' => 'category',
			'field'    => 'slug',
			'terms'    => array( 'newsletter', 'the-tea' ),
		),
		array(
			'taxonomy' => 'post_tag',
			'field'    => 'slug',
			'terms'    => array( 'newsletter', 'the-tea' ),
		),
	),
);

$newsletter_query = new WP_Query( $archive_query_args );

// Fallback curated issues if no posts are published yet in the database
$fallback_issues = array(
	array(
		'title'       => __( 'THE TEA - Fall & Harvest Edition', 'kiwatinook' ),
		'date'        => 'September 2024',
		'issue_num'   => 'Vol. 3, Issue 2',
		'summary'     => __( 'Celebrating autumn harvest traditions, fall backcountry expeditions, and welcoming new Indigenous operators across Treaty 1, 2, and 5 territories.', 'kiwatinook' ),
		'link'        => '#',
		'download'    => '#',
	),
	array(
		'title'       => __( 'THE TEA - Spring & Summer Edition', 'kiwatinook' ),
		'date'        => 'May 2024',
		'issue_num'   => 'Vol. 3, Issue 1',
		'summary'     => __( 'Powwow trail announcements, land-based culinary tours, and recap of our annual Indigenous Tourism Manitoba Provincial Industry Summit.', 'kiwatinook' ),
		'link'        => '#',
		'download'    => '#',
	),
	array(
		'title'       => __( 'THE TEA - Winter Solstice Edition', 'kiwatinook' ),
		'date'        => 'December 2023',
		'issue_num'   => 'Vol. 2, Issue 4',
		'summary'     => __( 'Stories from northern winter lodges, authentic dog-sledding adventures, storytelling beneath the aurora borealis, and annual community milestones.', 'kiwatinook' ),
		'link'        => '#',
		'download'    => '#',
	),
	array(
		'title'       => __( 'THE TEA - Autumn Equinox Edition', 'kiwatinook' ),
		'date'        => 'October 2023',
		'issue_num'   => 'Vol. 2, Issue 3',
		'summary'     => __( 'Exploring indigenous culinary traditions, wild rice harvesting on sacred waterways, and provincial partner promotions.', 'kiwatinook' ),
		'link'        => '#',
		'download'    => '#',
	),
	array(
		'title'       => __( 'THE TEA - National Indigenous History Month', 'kiwatinook' ),
		'date'        => 'June 2023',
		'issue_num'   => 'Vol. 2, Issue 2',
		'summary'     => __( 'Spotlighting artisan cooperatives, traditional hand drum teachings, and youth leadership in sustainable ecotourism across Manitoba.', 'kiwatinook' ),
		'link'        => '#',
		'download'    => '#',
	),
	array(
		'title'       => __( 'THE TEA - Inaugural Spring Edition', 'kiwatinook' ),
		'date'        => 'March 2023',
		'issue_num'   => 'Vol. 2, Issue 1',
		'summary'     => __( 'The maiden release of THE TEA publication: sharing member stories, upcoming cultural experiences, and our collective vision for indigenous hospitality.', 'kiwatinook' ),
		'link'        => '#',
		'download'    => '#',
	),
);
?>

<section class="newsletter-archive page-section constrained-content" aria-label="<?php esc_attr_e( 'THE TEA Newsletter Archive', 'kiwatinook' ); ?>">
	<!-- Archive Header -->
	<header class="newsletter-archive__header">
		<span class="newsletter-archive__badge"><?php esc_html_e( 'Community Updates & Insights', 'kiwatinook' ); ?></span>
		<h1 class="newsletter-archive__title"><?php esc_html_e( 'THE TEA Newsletter Archive', 'kiwatinook' ); ?></h1>
		<p class="newsletter-archive__desc">
			<?php esc_html_e( 'Explore past editions of THE TEA, the official digital publication of Indigenous Tourism Manitoba. Discover inspiring stories from Indigenous operators, seasonal travel recommendations, cultural insights, and member opportunities across Manitoba.', 'kiwatinook' ); ?>
		</p>
	</header>

	<!-- Constant Contact Subscription Module -->
	<section class="newsletter-archive__subscribe-section" aria-label="<?php esc_attr_e( 'Subscribe to THE TEA', 'kiwatinook' ); ?>">
		<div class="newsletter-archive__subscribe-card">
			<div class="newsletter-archive__subscribe-intro">
				<span class="newsletter-archive__subscribe-pill"><?php esc_html_e( 'Stay Informed', 'kiwatinook' ); ?></span>
				<h2 class="newsletter-archive__subscribe-heading"><?php esc_html_e( 'Subscribe to THE TEA', 'kiwatinook' ); ?></h2>
				<p class="newsletter-archive__subscribe-subtext">
					<?php esc_html_e( 'Receive digital editions of THE TEA, seasonal invitations, and community highlights delivered straight to your inbox.', 'kiwatinook' ); ?>
				</p>
			</div>

			<!-- Constant Contact Universal Embed Container (Utilizing active _ctct_m token) -->
			<div class="newsletter-archive__ctct-container">
				<div class="ctct-inline-form" data-form-id="0e1ea91fdfd5a3260d6f165551b021ed"></div>
			</div>

			<!-- Fallback / Native Subscription Form -->
			<form id="the-tea-newsletter-form" class="newsletter-archive__form itm-newsletter-form" method="post" novalidate>
				<?php wp_nonce_field( 'itm_newsletter_nonce', 'itm_newsletter_nonce_field' ); ?>
				<div class="site-footer__hp-wrap" aria-hidden="true" style="display:none;">
					<input type="text" name="itm_hp_check" id="the_tea_hp_check" tabindex="-1" autocomplete="off" />
				</div>
				<div class="newsletter-archive__input-wrap">
					<label for="the-tea-email" class="screen-reader-text"><?php esc_html_e( 'Email Address', 'kiwatinook' ); ?></label>
					<input
						type="email"
						id="the-tea-email"
						name="email"
						class="newsletter-archive__input"
						placeholder="<?php esc_attr_e( 'Enter your email address', 'kiwatinook' ); ?>"
						required
						autocomplete="email"
					/>
					<button type="submit" id="the-tea-submit" class="newsletter-archive__submit-btn">
						<span class="btn-text"><?php esc_html_e( 'Subscribe Now', 'kiwatinook' ); ?></span>
						<span class="btn-spinner" aria-hidden="true"></span>
					</button>
				</div>
				<p class="newsletter-archive__consent">
					<?php esc_html_e( 'By subscribing, you agree to receive digital newsletters from Indigenous Tourism Manitoba. You can unsubscribe at any time.', 'kiwatinook' ); ?>
				</p>
				<div id="the-tea-newsletter-feedback" class="newsletter-archive__feedback" role="status" aria-live="polite"></div>
			</form>
		</div>
	</section>

	<!-- Issues Grid Section -->
	<section class="newsletter-archive__issues" aria-label="<?php esc_attr_e( 'Past Editions of THE TEA', 'kiwatinook' ); ?>">
		<div class="newsletter-archive__issues-toolbar">
			<h2 class="newsletter-archive__issues-heading"><?php esc_html_e( 'Past Editions', 'kiwatinook' ); ?></h2>
			<span class="newsletter-archive__issues-count">
				<?php
				$total_issues = $newsletter_query->have_posts() ? $newsletter_query->found_posts : count( $fallback_issues );
				echo esc_html( sprintf( _n( '%d Edition Available', '%d Editions Available', $total_issues, 'kiwatinook' ), $total_issues ) );
				?>
			</span>
		</div>

		<div class="newsletter-archive__grid">
			<?php
			if ( $newsletter_query->have_posts() ) :
				while ( $newsletter_query->have_posts() ) :
					$newsletter_query->the_post();
					$issue_id       = get_the_ID();
					$issue_title    = get_the_title();
					$issue_date     = get_the_date( 'F Y' );
					$issue_pdf_url  = get_post_meta( $issue_id, '_newsletter_pdf_url', true );
					$issue_ext_url  = get_post_meta( $issue_id, '_newsletter_external_url', true );
					$read_url       = ! empty( $issue_ext_url ) ? $issue_ext_url : get_permalink();
					$has_pdf        = ! empty( $issue_pdf_url );
					$issue_sublabel = get_post_meta( $issue_id, '_newsletter_edition_number', true );
					?>
					<article id="newsletter-issue-<?php echo esc_attr( $issue_id ); ?>" class="newsletter-card">
						<div class="newsletter-card__media">
							<?php if ( has_post_thumbnail( $issue_id ) ) : ?>
								<a href="<?php echo esc_url( $read_url ); ?>" tabindex="-1" aria-hidden="true">
									<?php echo get_the_post_thumbnail( $issue_id, 'medium_large', array( 'class' => 'newsletter-card__thumbnail', 'loading' => 'lazy', 'alt' => esc_attr( $issue_title ) ) ); ?>
								</a>
							<?php else : ?>
								<!-- Accessible Fallback Cover Art -->
								<a href="<?php echo esc_url( $read_url ); ?>" class="newsletter-card__fallback-cover" tabindex="-1" aria-hidden="true">
									<div class="newsletter-card__fallback-emblem">
										<span class="newsletter-card__fallback-wordmark">THE TEA</span>
										<span class="newsletter-card__fallback-sub"><?php esc_html_e( 'Indigenous Tourism Manitoba', 'kiwatinook' ); ?></span>
									</div>
									<div class="newsletter-card__fallback-date"><?php echo esc_html( $issue_date ); ?></div>
								</a>
							<?php endif; ?>
							<span class="newsletter-card__badge"><?php echo esc_html( ! empty( $issue_sublabel ) ? $issue_sublabel : __( 'Newsletter', 'kiwatinook' ) ); ?></span>
						</div>

						<div class="newsletter-card__content">
							<div class="newsletter-card__meta">
								<time class="newsletter-card__date" datetime="<?php echo esc_attr( get_the_date( 'c' ) ); ?>">
									<i class="bi bi-calendar3" aria-hidden="true"></i> <?php echo esc_html( $issue_date ); ?>
								</time>
							</div>

							<h3 class="newsletter-card__title">
								<a href="<?php echo esc_url( $read_url ); ?>">
									<?php echo esc_html( $issue_title ); ?>
								</a>
							</h3>

							<div class="newsletter-card__summary">
								<?php
								$excerpt = get_the_excerpt();
								echo esc_html( wp_trim_words( $excerpt, 22, '...' ) );
								?>
							</div>

							<div class="newsletter-card__actions">
								<a href="<?php echo esc_url( $read_url ); ?>" class="btn btn--primary newsletter-card__btn-read">
									<span><?php esc_html_e( 'Read Edition', 'kiwatinook' ); ?></span>
									<span class="screen-reader-text">: <?php echo esc_html( $issue_title ); ?></span>
									<i class="bi bi-arrow-right" aria-hidden="true"></i>
								</a>

								<?php if ( $has_pdf ) : ?>
									<a href="<?php echo esc_url( $issue_pdf_url ); ?>" class="btn btn--outline newsletter-card__btn-pdf" target="_blank" rel="noopener noreferrer" download>
										<i class="bi bi-file-earmark-pdf" aria-hidden="true"></i>
										<span><?php esc_html_e( 'PDF', 'kiwatinook' ); ?></span>
										<span class="screen-reader-text">: <?php echo esc_html( sprintf( __( 'Download PDF of %s', 'kiwatinook' ), $issue_title ) ); ?></span>
									</a>
								<?php endif; ?>
							</div>
						</div>
					</article>
					<?php
				endwhile;
				wp_reset_postdata();
			else :
				// Fallback curated issues display
				foreach ( $fallback_issues as $index => $fallback ) :
					?>
					<article class="newsletter-card">
						<div class="newsletter-card__media">
							<a href="<?php echo esc_url( $fallback['link'] ); ?>" class="newsletter-card__fallback-cover" tabindex="-1" aria-hidden="true">
								<div class="newsletter-card__fallback-emblem">
									<span class="newsletter-card__fallback-wordmark">THE TEA</span>
									<span class="newsletter-card__fallback-sub"><?php esc_html_e( 'Indigenous Tourism Manitoba', 'kiwatinook' ); ?></span>
								</div>
								<div class="newsletter-card__fallback-date"><?php echo esc_html( $fallback['date'] ); ?></div>
							</a>
							<span class="newsletter-card__badge"><?php echo esc_html( $fallback['issue_num'] ); ?></span>
						</div>

						<div class="newsletter-card__content">
							<div class="newsletter-card__meta">
								<time class="newsletter-card__date">
									<i class="bi bi-calendar3" aria-hidden="true"></i> <?php echo esc_html( $fallback['date'] ); ?>
								</time>
							</div>

							<h3 class="newsletter-card__title">
								<a href="<?php echo esc_url( $fallback['link'] ); ?>">
									<?php echo esc_html( $fallback['title'] ); ?>
								</a>
							</h3>

							<p class="newsletter-card__summary">
								<?php echo esc_html( $fallback['summary'] ); ?>
							</p>

							<div class="newsletter-card__actions">
								<a href="<?php echo esc_url( $fallback['link'] ); ?>" class="btn btn--primary newsletter-card__btn-read">
									<span><?php esc_html_e( 'Read Edition', 'kiwatinook' ); ?></span>
									<span class="screen-reader-text">: <?php echo esc_html( $fallback['title'] ); ?></span>
									<i class="bi bi-arrow-right" aria-hidden="true"></i>
								</a>

								<a href="<?php echo esc_url( $fallback['download'] ); ?>" class="btn btn--outline newsletter-card__btn-pdf" target="_blank" rel="noopener noreferrer">
									<i class="bi bi-file-earmark-pdf" aria-hidden="true"></i>
									<span><?php esc_html_e( 'PDF', 'kiwatinook' ); ?></span>
									<span class="screen-reader-text">: <?php echo esc_html( sprintf( __( 'Download PDF of %s', 'kiwatinook' ), $fallback['title'] ) ); ?></span>
								</a>
							</div>
						</div>
					</article>
					<?php
				endforeach;
			endif;
			?>
		</div>
	</section>
</section>
