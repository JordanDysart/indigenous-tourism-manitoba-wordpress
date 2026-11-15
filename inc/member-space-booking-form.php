<?php
/**
 * Modular Interim Event Space Booking Form for ITM Members
 *
 * Provides the [itm_member_space_booking_form] shortcode and AJAX handlers
 * (`itm_space_booking_request`) for the "Explore Indigenous for ITM Members"
 * utility page (/explore-indigenous-for-itm-members/).
 *
 * Architectural Note:
 * Built as a self-contained module so it can later be replaced or member-gated
 * when the dedicated Member-Only Booking System (IDEA-20261111-001) is introduced.
 *
 * @package kiwatinook
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! defined( 'ITM_MEMBER_SPACE_BOOKING_EMAIL' ) ) {
	define( 'ITM_MEMBER_SPACE_BOOKING_EMAIL', 'ambassadormgr@indigenoustourismmanitoba.ca' );
}

/**
 * Allowed ITM Membership Status options.
 *
 * @return array<string, string>
 */
function itm_get_space_booking_membership_statuses() {
	return array(
		'Current ITM Member'              => __( 'Current ITM Member', 'kiwatinook' ),
		'Interested in Becoming a Member' => __( 'Interested in Becoming a Member', 'kiwatinook' ),
	);
}

/**
 * Allowed Event Format options.
 *
 * @return array<string, string>
 */
function itm_get_space_booking_event_formats() {
	return array(
		'Workshop / Demonstration'     => __( 'Workshop / Demonstration', 'kiwatinook' ),
		'Cultural Programming'         => __( 'Cultural Programming', 'kiwatinook' ),
		'Product Showcase / Launch'    => __( 'Product Showcase / Launch', 'kiwatinook' ),
		'Operator Pop-Up'              => __( 'Operator Pop-Up', 'kiwatinook' ),
		'Small Gathering / Reception'  => __( 'Small Gathering / Reception', 'kiwatinook' ),
		'Other'                        => __( 'Other', 'kiwatinook' ),
	);
}

/**
 * Register client-side booking form script (enqueued only when shortcode renders).
 */
function itm_register_space_booking_assets() {
	$script_rel  = '/js/member-space-booking.js';
	$script_path = get_template_directory() . $script_rel;

	wp_register_script(
		'itm-member-space-booking',
		get_template_directory_uri() . $script_rel,
		array(),
		file_exists( $script_path ) ? (string) filemtime( $script_path ) : '1.0.0',
		true
	);

	wp_localize_script(
		'itm-member-space-booking',
		'itmSpaceBooking',
		array(
			'ajaxurl' => admin_url( 'admin-ajax.php' ),
			'nonce'   => wp_create_nonce( 'itm_space_booking_nonce' ),
		)
	);
}
add_action( 'wp_enqueue_scripts', 'itm_register_space_booking_assets' );

/**
 * Detect whether WordPress is running on a local development host
 * (mirrors host check in inc/newsletter.php).
 *
 * @return bool
 */
function itm_is_local_booking_environment() {
	$host = wp_parse_url( home_url(), PHP_URL_HOST );
	return is_string( $host ) && (
		'localhost' === $host ||
		'127.0.0.1' === $host ||
		false !== strpos( $host, '.lndo.site' ) ||
		false !== strpos( $host, '.local' ) ||
		false !== strpos( $host, '.test' )
	);
}

/**
 * Register AJAX handlers for interim space booking requests.
 */
add_action( 'wp_ajax_itm_space_booking_request', 'itm_handle_space_booking_ajax_request' );
add_action( 'wp_ajax_nopriv_itm_space_booking_request', 'itm_handle_space_booking_ajax_request' );

/**
 * AJAX callback for [itm_member_space_booking_form].
 */
function itm_handle_space_booking_ajax_request() {
	$honeypot = isset( $_POST['hp_check'] ) ? sanitize_text_field( wp_unslash( $_POST['hp_check'] ) ) : '';

	// 1. Anti-spam honeypot check (return silent success to bots).
	if ( '' !== $honeypot ) {
		wp_send_json_success(
			array(
				'message' => esc_html__( 'Miigwech / Thank you! Your event space booking request has been received.', 'kiwatinook' ),
			)
		);
	}

	// 2. Nonce verification (accept `nonce` or `itm_space_booking_nonce_field`).
	$nonce_verified = check_ajax_referer( 'itm_space_booking_nonce', 'nonce', false );
	if ( ! $nonce_verified ) {
		$nonce_verified = check_ajax_referer( 'itm_space_booking_nonce', 'itm_space_booking_nonce_field', false );
	}

	if ( ! $nonce_verified ) {
		wp_send_json_error(
			array(
				'code'    => 'invalid_nonce',
				'message' => esc_html__( 'Security verification failed. Please refresh the page and submit your request again.', 'kiwatinook' ),
			),
			403
		);
	}

	// 3. Sanitize all input fields.
	$business_name     = isset( $_POST['business_name'] ) ? sanitize_text_field( wp_unslash( $_POST['business_name'] ) ) : '';
	$contact_name      = isset( $_POST['contact_name'] ) ? sanitize_text_field( wp_unslash( $_POST['contact_name'] ) ) : '';
	$raw_email         = isset( $_POST['email'] ) ? sanitize_text_field( wp_unslash( $_POST['email'] ) ) : '';
	$email             = sanitize_email( $raw_email );
	$phone             = isset( $_POST['phone'] ) ? sanitize_text_field( wp_unslash( $_POST['phone'] ) ) : '';
	$membership_status = isset( $_POST['membership_status'] ) ? sanitize_text_field( wp_unslash( $_POST['membership_status'] ) ) : '';
	$event_title       = isset( $_POST['event_title'] ) ? sanitize_text_field( wp_unslash( $_POST['event_title'] ) ) : '';
	$event_format      = isset( $_POST['event_format'] ) ? sanitize_text_field( wp_unslash( $_POST['event_format'] ) ) : '';
	$preferred_dates   = isset( $_POST['preferred_dates'] ) ? sanitize_text_field( wp_unslash( $_POST['preferred_dates'] ) ) : '';
	$guest_count       = isset( $_POST['guest_count'] ) ? sanitize_text_field( wp_unslash( $_POST['guest_count'] ) ) : '';
	$event_description = isset( $_POST['event_description'] ) ? sanitize_textarea_field( wp_unslash( $_POST['event_description'] ) ) : '';

	// Strip CR/LF from header-adjacent fields to prevent email header injection.
	$safe_contact_name  = trim( str_replace( array( "\r", "\n" ), ' ', $contact_name ) );
	$safe_business_name = trim( str_replace( array( "\r", "\n" ), ' ', $business_name ) );
	$safe_event_title   = trim( str_replace( array( "\r", "\n" ), ' ', $event_title ) );

	// 4. Server-side required & allowlist validation.
	$allowed_statuses = itm_get_space_booking_membership_statuses();
	$allowed_formats  = itm_get_space_booking_event_formats();

	if ( '' === $safe_business_name ) {
		wp_send_json_error(
			array(
				'code'    => 'missing_business_name',
				'field'   => 'business_name',
				'message' => esc_html__( 'Please enter your business or organization name.', 'kiwatinook' ),
			),
			400
		);
	}

	if ( '' === $safe_contact_name ) {
		wp_send_json_error(
			array(
				'code'    => 'missing_contact_name',
				'field'   => 'contact_name',
				'message' => esc_html__( 'Please enter a contact person name.', 'kiwatinook' ),
			),
			400
		);
	}

	if ( empty( $email ) || ! is_email( $email ) ) {
		wp_send_json_error(
			array(
				'code'    => 'invalid_email',
				'field'   => 'email',
				'message' => esc_html__( 'Please provide a valid email address.', 'kiwatinook' ),
			),
			400
		);
	}

	if ( '' === $membership_status || ! isset( $allowed_statuses[ $membership_status ] ) ) {
		wp_send_json_error(
			array(
				'code'    => 'invalid_membership_status',
				'field'   => 'membership_status',
				'message' => esc_html__( 'Please select your ITM membership status.', 'kiwatinook' ),
			),
			400
		);
	}

	if ( '' === $safe_event_title ) {
		wp_send_json_error(
			array(
				'code'    => 'missing_event_title',
				'field'   => 'event_title',
				'message' => esc_html__( 'Please enter a proposed event title.', 'kiwatinook' ),
			),
			400
		);
	}

	if ( '' === $event_format || ! isset( $allowed_formats[ $event_format ] ) ) {
		wp_send_json_error(
			array(
				'code'    => 'invalid_event_format',
				'field'   => 'event_format',
				'message' => esc_html__( 'Please select an event format.', 'kiwatinook' ),
			),
			400
		);
	}

	if ( '' === $preferred_dates ) {
		wp_send_json_error(
			array(
				'code'    => 'missing_preferred_dates',
				'field'   => 'preferred_dates',
				'message' => esc_html__( 'Please share your preferred date(s) and time window.', 'kiwatinook' ),
			),
			400
		);
	}

	if ( '' === $event_description ) {
		wp_send_json_error(
			array(
				'code'    => 'missing_event_description',
				'field'   => 'event_description',
				'message' => esc_html__( 'Please describe your event concept and space setup needs.', 'kiwatinook' ),
			),
			400
		);
	}

	// 5. Compose & dispatch notification email to Space Manager.
	$recipient = apply_filters( 'itm_member_space_booking_recipient', ITM_MEMBER_SPACE_BOOKING_EMAIL );
	$subject   = sprintf(
		'[Explore Indigenous Booking Request] %s — %s',
		$safe_event_title,
		$safe_business_name
	);

	$body_lines = array(
		'New Explore Indigenous Event Space Booking Request',
		'===================================================',
		'',
		'Business / Organization: ' . $safe_business_name,
		'Contact Person:          ' . $safe_contact_name,
		'Email Address:           ' . $email,
		'Phone Number:            ' . ( '' !== $phone ? $phone : 'Not provided' ),
		'ITM Membership Status:   ' . $membership_status,
		'',
		'Event Details',
		'---------------------------------------------------',
		'Event Title:             ' . $safe_event_title,
		'Event Format:            ' . $event_format,
		'Preferred Date & Time:   ' . $preferred_dates,
		'Estimated Attendance:    ' . ( '' !== $guest_count ? $guest_count : 'Not specified' ),
		'',
		'Event Description & Space Setup Needs:',
		$event_description,
		'',
		'---------------------------------------------------',
		'Submitted from: ' . home_url( '/explore-indigenous-for-itm-members/' ),
		'Timestamp:      ' . current_time( 'mysql' ),
	);

	$headers = array(
		'Content-Type: text/plain; charset=UTF-8',
		sprintf( 'Reply-To: %s <%s>', $safe_contact_name, $email ),
	);

	$mail_sent     = wp_mail( $recipient, $subject, implode( "\n", $body_lines ), $headers );
	$is_local_host = itm_is_local_booking_environment();

	$confirmation_message = esc_html__(
		'Miigwech / Thank you! Your Explore Indigenous event space request has been received. Our Space Manager will review availability and follow up with you within 2–3 business days.',
		'kiwatinook'
	);

	if ( $mail_sent ) {
		wp_send_json_success(
			array(
				'delivered' => true,
				'message'   => $confirmation_message,
			)
		);
	}

	// In local dev environments (*.lndo.site / localhost) where local mail transport may not be active,
	// log cleanly and return confirmation JSON for reliable E2E verification.
	if ( $is_local_host ) {
		error_log(
			sprintf(
				'[ITM Member Space Booking][Local Dev] Inquiry logged for %s <%s> | Org: %s | Event: %s (%s) | Dates: %s',
				$safe_contact_name,
				$email,
				$safe_business_name,
				$safe_event_title,
				$event_format,
				$preferred_dates
			)
		);

		$recent_requests = get_option( 'itm_recent_space_booking_requests', array() );
		if ( ! is_array( $recent_requests ) ) {
			$recent_requests = array();
		}
		$recent_requests[] = array(
			'business_name'     => $safe_business_name,
			'contact_name'      => $safe_contact_name,
			'email'             => $email,
			'membership_status' => $membership_status,
			'event_title'       => $safe_event_title,
			'event_format'      => $event_format,
			'preferred_dates'   => $preferred_dates,
			'submitted_at'      => current_time( 'mysql' ),
		);
		if ( count( $recent_requests ) > 20 ) {
			$recent_requests = array_slice( $recent_requests, -20 );
		}
		update_option( 'itm_recent_space_booking_requests', $recent_requests, false );

		wp_send_json_success(
			array(
				'delivered'    => false,
				'logged_local' => true,
				'message'      => $confirmation_message,
			)
		);
	}

	wp_send_json_error(
		array(
			'code'    => 'mail_delivery_failed',
			'message' => esc_html__(
				'We could not transmit your request right now. Please email Space Manager Taytum directly at ambassadormgr@indigenoustourismmanitoba.ca.',
				'kiwatinook'
			),
		),
		500
	);
}

/**
 * Render the modular [itm_member_space_booking_form] shortcode.
 *
 * @param array $atts Shortcode attributes.
 * @return string Rendered HTML markup.
 */
function itm_member_space_booking_form_shortcode( $atts = array() ) {
	wp_enqueue_script( 'itm-member-space-booking' );

	$statuses = itm_get_space_booking_membership_statuses();
	$formats  = itm_get_space_booking_event_formats();

	ob_start();
	?>
	<div class="member-booking-form-card" id="itm-member-booking-module" data-booking-module="interim-v1">
		<div class="member-booking-form-card__header">
			<span class="form-card-badge"><?php esc_html_e( 'Member Event Space Inquiry', 'kiwatinook' ); ?></span>
			<h3 id="itm-space-booking-heading" class="form-card-title"><?php esc_html_e( 'Submit a Space Booking Request', 'kiwatinook' ); ?></h3>
			<p class="form-card-intro">
				<?php esc_html_e( 'Share your proposed dates, event format, and setup details below. Fields marked', 'kiwatinook' ); ?>
				<span class="required-mark" aria-hidden="true">*</span>
				<?php esc_html_e( 'are required.', 'kiwatinook' ); ?>
			</p>
		</div>

		<form
			id="itm-space-booking-form"
			class="itm-space-booking-form"
			action="<?php echo esc_url( admin_url( 'admin-ajax.php' ) ); ?>"
			method="post"
			aria-labelledby="itm-space-booking-heading"
			novalidate
		>
			<?php wp_nonce_field( 'itm_space_booking_nonce', 'itm_space_booking_nonce_field' ); ?>
			<input type="hidden" name="action" value="itm_space_booking_request" />

			<!-- Anti-spam Honeypot -->
			<div class="booking-hp-wrap" aria-hidden="true">
				<label for="itm_booking_hp_check"><?php esc_html_e( 'Leave this field empty', 'kiwatinook' ); ?></label>
				<input type="text" name="hp_check" id="itm_booking_hp_check" value="" tabindex="-1" autocomplete="off" />
			</div>

			<div class="booking-form-grid">
				<!-- Row 1: Business / Organization Name + Contact Person Name -->
				<div class="booking-field">
					<label for="itm_booking_business_name" class="booking-label">
						<?php esc_html_e( 'Business / Organization Name', 'kiwatinook' ); ?>
						<span class="required-mark" aria-hidden="true">*</span>
					</label>
					<input
						type="text"
						id="itm_booking_business_name"
						name="business_name"
						class="booking-input"
						placeholder="<?php esc_attr_e( 'e.g., Borealis Beading or Wapusk Adventures', 'kiwatinook' ); ?>"
						autocomplete="organization"
						maxlength="160"
						required
						aria-invalid="false"
						data-error="itm_booking_business_name_error"
					/>
					<span id="itm_booking_business_name_error" class="booking-field-error">
						<i class="bi bi-exclamation-circle-fill" aria-hidden="true"></i>
						<?php esc_html_e( 'Error: Please enter your business or organization name.', 'kiwatinook' ); ?>
					</span>
				</div>

				<div class="booking-field">
					<label for="itm_booking_contact_name" class="booking-label">
						<?php esc_html_e( 'Contact Person Name', 'kiwatinook' ); ?>
						<span class="required-mark" aria-hidden="true">*</span>
					</label>
					<input
						type="text"
						id="itm_booking_contact_name"
						name="contact_name"
						class="booking-input"
						placeholder="<?php esc_attr_e( 'Full name of primary organizer', 'kiwatinook' ); ?>"
						autocomplete="name"
						maxlength="120"
						required
						aria-invalid="false"
						data-error="itm_booking_contact_name_error"
					/>
					<span id="itm_booking_contact_name_error" class="booking-field-error">
						<i class="bi bi-exclamation-circle-fill" aria-hidden="true"></i>
						<?php esc_html_e( 'Error: Please enter a contact person name.', 'kiwatinook' ); ?>
					</span>
				</div>

				<!-- Row 2: Email Address + Phone Number -->
				<div class="booking-field">
					<label for="itm_booking_email" class="booking-label">
						<?php esc_html_e( 'Email Address', 'kiwatinook' ); ?>
						<span class="required-mark" aria-hidden="true">*</span>
					</label>
					<input
						type="email"
						id="itm_booking_email"
						name="email"
						class="booking-input"
						placeholder="<?php esc_attr_e( 'you@organization.ca', 'kiwatinook' ); ?>"
						autocomplete="email"
						autocorrect="off"
						autocapitalize="none"
						spellcheck="false"
						maxlength="160"
						required
						aria-invalid="false"
						data-error="itm_booking_email_error"
					/>
					<span id="itm_booking_email_error" class="booking-field-error">
						<i class="bi bi-exclamation-circle-fill" aria-hidden="true"></i>
						<?php esc_html_e( 'Error: Please enter a valid email address.', 'kiwatinook' ); ?>
					</span>
				</div>

				<div class="booking-field">
					<label for="itm_booking_phone" class="booking-label">
						<?php esc_html_e( 'Phone Number', 'kiwatinook' ); ?>
						<span class="optional-tag"><?php esc_html_e( '(Optional)', 'kiwatinook' ); ?></span>
					</label>
					<input
						type="tel"
						id="itm_booking_phone"
						name="phone"
						class="booking-input"
						placeholder="<?php esc_attr_e( '(204) 555-0199', 'kiwatinook' ); ?>"
						autocomplete="tel"
						maxlength="40"
						aria-invalid="false"
					/>
				</div>

				<!-- Row 3: ITM Membership Status (Full-Width Accessible Radio Group) -->
				<div class="booking-field booking-field--full">
					<fieldset class="booking-fieldset" aria-describedby="itm_booking_membership_hint">
						<legend class="booking-label booking-legend">
							<?php esc_html_e( 'ITM Membership Status', 'kiwatinook' ); ?>
							<span class="required-mark" aria-hidden="true">*</span>
						</legend>
						<span id="itm_booking_membership_hint" class="booking-field-hint">
							<?php esc_html_e( 'Event space booking is an ITM member benefit. Prospective members are welcome to inquire while applying.', 'kiwatinook' ); ?>
						</span>
						<div class="booking-radio-group">
							<?php
							$idx = 0;
							foreach ( $statuses as $value => $label ) :
								$idx++;
								$radio_id = 'itm_booking_membership_status_' . $idx;
								?>
								<div class="booking-radio-option">
									<input
										type="radio"
										id="<?php echo esc_attr( $radio_id ); ?>"
										name="membership_status"
										value="<?php echo esc_attr( $value ); ?>"
										required
										aria-invalid="false"
										data-error="itm_booking_membership_status_error"
									/>
									<label for="<?php echo esc_attr( $radio_id ); ?>" class="booking-radio-label">
										<?php echo esc_html( $label ); ?>
									</label>
								</div>
							<?php endforeach; ?>
						</div>
						<span id="itm_booking_membership_status_error" class="booking-field-error">
							<i class="bi bi-exclamation-circle-fill" aria-hidden="true"></i>
							<?php esc_html_e( 'Error: Please select your ITM membership status.', 'kiwatinook' ); ?>
						</span>
					</fieldset>
				</div>

				<!-- Row 4: Event Title + Event Format -->
				<div class="booking-field">
					<label for="itm_booking_event_title" class="booking-label">
						<?php esc_html_e( 'Event Title', 'kiwatinook' ); ?>
						<span class="required-mark" aria-hidden="true">*</span>
					</label>
					<input
						type="text"
						id="itm_booking_event_title"
						name="event_title"
						class="booking-input"
						placeholder="<?php esc_attr_e( 'e.g., Red River Métis Floral Beading Workshop', 'kiwatinook' ); ?>"
						maxlength="180"
						required
						aria-invalid="false"
						data-error="itm_booking_event_title_error"
					/>
					<span id="itm_booking_event_title_error" class="booking-field-error">
						<i class="bi bi-exclamation-circle-fill" aria-hidden="true"></i>
						<?php esc_html_e( 'Error: Please enter a proposed title for your event.', 'kiwatinook' ); ?>
					</span>
				</div>

				<div class="booking-field">
					<label for="itm_booking_event_format" class="booking-label">
						<?php esc_html_e( 'Event Format', 'kiwatinook' ); ?>
						<span class="required-mark" aria-hidden="true">*</span>
					</label>
					<select
						id="itm_booking_event_format"
						name="event_format"
						class="booking-select"
						required
						aria-invalid="false"
						data-error="itm_booking_event_format_error"
					>
						<option value=""><?php esc_html_e( 'Select an event format...', 'kiwatinook' ); ?></option>
						<?php foreach ( $formats as $value => $label ) : ?>
							<option value="<?php echo esc_attr( $value ); ?>"><?php echo esc_html( $label ); ?></option>
						<?php endforeach; ?>
					</select>
					<span id="itm_booking_event_format_error" class="booking-field-error">
						<i class="bi bi-exclamation-circle-fill" aria-hidden="true"></i>
						<?php esc_html_e( 'Error: Please choose an event format.', 'kiwatinook' ); ?>
					</span>
				</div>

				<!-- Row 5: Preferred Date(s) & Time Window + Estimated Guest Count -->
				<div class="booking-field">
					<label for="itm_booking_preferred_dates" class="booking-label">
						<?php esc_html_e( 'Preferred Date(s) & Time Window', 'kiwatinook' ); ?>
						<span class="required-mark" aria-hidden="true">*</span>
					</label>
					<input
						type="text"
						id="itm_booking_preferred_dates"
						name="preferred_dates"
						class="booking-input"
						placeholder="<?php esc_attr_e( 'e.g., Saturday, June 12 • 1:00 PM – 4:00 PM', 'kiwatinook' ); ?>"
						maxlength="200"
						required
						aria-invalid="false"
						data-error="itm_booking_preferred_dates_error"
					/>
					<span id="itm_booking_preferred_dates_error" class="booking-field-error">
						<i class="bi bi-exclamation-circle-fill" aria-hidden="true"></i>
						<?php esc_html_e( 'Error: Please share your preferred date(s) and time window.', 'kiwatinook' ); ?>
					</span>
				</div>

				<div class="booking-field">
					<label for="itm_booking_guest_count" class="booking-label">
						<?php esc_html_e( 'Estimated Guest / Attendance Count', 'kiwatinook' ); ?>
						<span class="optional-tag"><?php esc_html_e( '(Optional)', 'kiwatinook' ); ?></span>
					</label>
					<input
						type="text"
						id="itm_booking_guest_count"
						name="guest_count"
						class="booking-input"
						placeholder="<?php esc_attr_e( 'e.g., 15–25 participants or drop-in public flow', 'kiwatinook' ); ?>"
						maxlength="60"
						aria-invalid="false"
					/>
				</div>

				<!-- Row 6: Event Description & Space Setup Needs -->
				<div class="booking-field booking-field--full">
					<label for="itm_booking_event_description" class="booking-label">
						<?php esc_html_e( 'Event Description & Space Setup Needs', 'kiwatinook' ); ?>
						<span class="required-mark" aria-hidden="true">*</span>
					</label>
					<span id="itm_booking_description_hint" class="booking-field-hint">
						<?php esc_html_e( 'Tell us about your event goals, public engagement format, tables/seating needed, and any display or audio-visual requirements.', 'kiwatinook' ); ?>
					</span>
					<textarea
						id="itm_booking_event_description"
						name="event_description"
						class="booking-textarea"
						rows="4"
						maxlength="3000"
						placeholder="<?php esc_attr_e( 'Describe your planned workshop, showcase, or cultural programming and any setup needs...', 'kiwatinook' ); ?>"
						required
						aria-invalid="false"
						aria-describedby="itm_booking_description_hint"
						data-error="itm_booking_event_description_error"
					></textarea>
					<span id="itm_booking_event_description_error" class="booking-field-error">
						<i class="bi bi-exclamation-circle-fill" aria-hidden="true"></i>
						<?php esc_html_e( 'Error: Please describe your event concept and space setup needs.', 'kiwatinook' ); ?>
					</span>
				</div>
			</div>

			<div class="booking-form-actions">
				<button type="submit" id="itm-space-booking-submit" class="btn btn--primary btn--lg booking-submit-btn">
					<span class="btn-text"><?php esc_html_e( 'Submit Booking Request', 'kiwatinook' ); ?></span>
					<span class="btn-spinner" aria-hidden="true"></span>
				</button>
				<p class="booking-privacy-note">
					<?php esc_html_e( 'Inquiries are routed directly to our Explore Indigenous Space Manager at Indigenous Tourism Manitoba.', 'kiwatinook' ); ?>
				</p>
			</div>

			<div id="itm-space-booking-feedback" class="booking-form-feedback" role="status" aria-live="polite"></div>
		</form>
	</div>
	<?php
	return ob_get_clean();
}
add_shortcode( 'itm_member_space_booking_form', 'itm_member_space_booking_form_shortcode' );
