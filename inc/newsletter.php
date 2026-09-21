<?php
/**
 * Integrated Footer Newsletter Handler & Constant Contact v3 API Integration
 *
 * @package kiwatinook
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Constant Contact Default Target List ID
 * List Name: e-Newsletter
 */
if ( ! defined( 'ITM_CTCT_NEWSLETTER_LIST_ID' ) ) {
	define( 'ITM_CTCT_NEWSLETTER_LIST_ID', '5aa6bf4a-fbb1-11f0-b6d2-0242a2ded4be' );
}

/**
 * Register REST API route for newsletter subscription
 */
function itm_register_newsletter_rest_route() {
	register_rest_route(
		'kiwatinook/v1',
		'/newsletter-signup',
		array(
			'methods'             => 'POST',
			'callback'            => 'itm_handle_newsletter_rest_request',
			'permission_callback' => '__return_true',
		)
	);
}
add_action( 'rest_api_init', 'itm_register_newsletter_rest_route' );

/**
 * REST API Callback
 *
 * @param WP_REST_Request $request REST request object.
 * @return WP_REST_Response
 */
function itm_handle_newsletter_rest_request( $request ) {
	$email    = $request->get_param( 'email' );
	$nonce    = $request->get_param( 'nonce' );
	$honeypot = $request->get_param( 'hp_check' );

	$result = itm_process_newsletter_signup( $email, $nonce, $honeypot );

	$status_code = $result['success'] ? 200 : 400;
	return new WP_REST_Response( $result, $status_code );
}

/**
 * Register AJAX handlers for newsletter subscription
 */
add_action( 'wp_ajax_itm_newsletter_signup', 'itm_handle_newsletter_ajax_request' );
add_action( 'wp_ajax_nopriv_itm_newsletter_signup', 'itm_handle_newsletter_ajax_request' );

/**
 * AJAX Callback
 */
function itm_handle_newsletter_ajax_request() {
	$email    = isset( $_POST['email'] ) ? sanitize_text_field( wp_unslash( $_POST['email'] ) ) : '';
	$nonce    = isset( $_POST['nonce'] ) ? sanitize_text_field( wp_unslash( $_POST['nonce'] ) ) : '';
	$honeypot = isset( $_POST['hp_check'] ) ? sanitize_text_field( wp_unslash( $_POST['hp_check'] ) ) : '';

	$result = itm_process_newsletter_signup( $email, $nonce, $honeypot );

	if ( $result['success'] ) {
		wp_send_json_success( $result );
	} else {
		wp_send_json_error( $result );
	}
}

/**
 * Core processing function for newsletter signup
 *
 * @param string $raw_email Email address.
 * @param string $nonce     Security nonce.
 * @param string $honeypot  Honeypot value.
 * @return array
 */
function itm_process_newsletter_signup( $raw_email, $nonce, $honeypot ) {
	// 1. Check anti-spam honeypot (bots that populate hidden field receive fake success)
	if ( ! empty( $honeypot ) ) {
		return array(
			'success' => true,
			'message' => esc_html__( 'Miigwech / Thank you for subscribing!', 'kiwatinook' ),
		);
	}

	// 2. Nonce verification
	if ( ! wp_verify_nonce( $nonce, 'itm_newsletter_nonce' ) ) {
		return array(
			'success' => false,
			'code'    => 'invalid_nonce',
			'message' => esc_html__( 'Security check failed. Please refresh the page and try again.', 'kiwatinook' ),
		);
	}

	// 3. Email sanitization and format validation
	$email = sanitize_email( $raw_email );
	if ( empty( $email ) || ! is_email( $email ) ) {
		return array(
			'success' => false,
			'code'    => 'invalid_email',
			'message' => esc_html__( 'Please provide a valid email address.', 'kiwatinook' ),
		);
	}

	// 4. Constant Contact API Synchronization
	$api_synced = itm_sync_contact_to_constant_contact( $email, ITM_CTCT_NEWSLETTER_LIST_ID );

	if ( $api_synced['synced'] ) {
		$message = ! empty( $api_synced['message'] ) 
			? $api_synced['message'] 
			: esc_html__( 'Miigwech / Thank you for subscribing!', 'kiwatinook' );

		return array(
			'success' => true,
			'message' => $message,
		);
	}

	// 5. If remote API is temporarily unreachable or requires re-authentication,
	// queue contact locally so no user sign-ups are ever dropped.
	itm_queue_pending_newsletter_signup( $email, ITM_CTCT_NEWSLETTER_LIST_ID, $api_synced['error'] );

	return array(
		'success' => true,
		'message' => esc_html__( 'Miigwech / Thank you for subscribing!', 'kiwatinook' ),
	);
}

/**
 * Synchronize contact with Constant Contact v3 API
 *
 * @param string $email   Contact email address.
 * @param string $list_id Target Constant Contact List UUID.
 * @return array
 */
function itm_sync_contact_to_constant_contact( $email, $list_id ) {
	$access_token = get_option( '_ctct_access_token' );

	if ( empty( $access_token ) ) {
		return array(
			'synced' => false,
			'error'  => 'missing_access_token',
		);
	}

	// Constant Contact v3 Sign-up Form endpoint (upserts contact and attaches to list)
	$api_url = 'https://api.cc.email/v3/contacts/sign_up_form';

	$body = array(
		'email_address'    => $email,
		'list_memberships' => array( $list_id ),
	);

	$args = array(
		'headers'     => array(
			'Authorization' => 'Bearer ' . trim( $access_token ),
			'Content-Type'  => 'application/json; charset=utf-8',
			'Accept'        => 'application/json',
		),
		'body'        => wp_json_encode( $body ),
		'timeout'     => 12,
		'data_format' => 'body',
	);

	$response = wp_remote_post( $api_url, $args );

	if ( is_wp_error( $response ) ) {
		return array(
			'synced' => false,
			'error'  => $response->get_error_message(),
		);
	}

	$status_code = wp_remote_retrieve_response_code( $response );
	$raw_body    = wp_remote_retrieve_body( $response );

	// 200 OK or 201 Created
	if ( 200 === $status_code || 201 === $status_code ) {
		return array(
			'synced'  => true,
			'message' => esc_html__( 'Miigwech / Thank you for subscribing!', 'kiwatinook' ),
		);
	}

	// 409 Conflict (Contact already exists / already subscribed)
	if ( 409 === $status_code ) {
		return array(
			'synced'  => true,
			'message' => esc_html__( 'You are already subscribed to our newsletter. Thank you!', 'kiwatinook' ),
		);
	}

	// Check if token expired (401 Unauthorized)
	if ( 401 === $status_code ) {
		update_option( 'ctct_maybe_needs_reconnected', 'true', false );
	}

	return array(
		'synced' => false,
		'error'  => 'HTTP_' . $status_code . ': ' . substr( $raw_body, 0, 160 ),
	);
}

/**
 * Queue contact locally if Constant Contact API is unavailable
 *
 * @param string $email   Contact email.
 * @param string $list_id List UUID.
 * @param string $reason  Failure reason.
 */
function itm_queue_pending_newsletter_signup( $email, $list_id, $reason = '' ) {
	$pending = get_option( 'itm_pending_newsletter_signups', array() );
	if ( ! is_array( $pending ) ) {
		$pending = array();
	}

	// Avoid duplicate entries in pending queue
	foreach ( $pending as $entry ) {
		if ( isset( $entry['email'] ) && strtolower( $entry['email'] ) === strtolower( $email ) ) {
			return;
		}
	}

	$pending[] = array(
		'email'     => $email,
		'list_id'   => $list_id,
		'timestamp' => current_time( 'mysql' ),
		'reason'    => sanitize_text_field( $reason ),
	);

	update_option( 'itm_pending_newsletter_signups', $pending, false );
}
