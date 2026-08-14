<?php
/**
 * Self-hosted theme update checks via GitHub Releases.
 *
 * Uses the vendored Plugin Update Checker library (inc/plugin-update-checker/)
 * to poll github.com/JordanDysart/indigenous-tourism-manitoba-wordpress for
 * new tagged releases and surface them as a normal "Update Now" action under
 * Appearance > Themes, sourcing the update zip from each GitHub Release's
 * attached asset rather than an auto-generated tag/branch source snapshot.
 *
 * @package itm_indigpro
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once get_template_directory() . '/inc/plugin-update-checker/plugin-update-checker.php';

use YahnisElsts\PluginUpdateChecker\v5\PucFactory;

$itm_indigpro_update_checker = PucFactory::buildUpdateChecker(
	'https://github.com/JordanDysart/indigenous-tourism-manitoba-wordpress/',
	// Must resolve to the theme root (where style.css lives) so PUC detects this
	// as a theme, not a plugin. This file lives in inc/, so __FILE__ would put
	// PUC's dirname() check in inc/ instead — it needs the theme's style.css.
	get_template_directory() . '/style.css',
	'kiwatinook'  // Must match the theme's installed directory slug.
);

// Private repo: PUC needs read access to list releases and download the
// release zip asset. The token lives only in wp-config.php (outside this
// repo, never committed) — see docs/task-08-self-hosted-theme-updates.md.
if ( defined( 'ITM_INDIGPRO_UPDATE_TOKEN' ) && ITM_INDIGPRO_UPDATE_TOKEN !== '' ) {
	$itm_indigpro_update_checker->setAuthentication( ITM_INDIGPRO_UPDATE_TOKEN );
}

// Ship updates from the zip asset attached to each GitHub Release rather
// than an auto-generated tag source archive.
$itm_indigpro_update_checker->getVcsApi()->enableReleaseAssets();
