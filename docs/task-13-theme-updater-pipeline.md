# Task 13 — Automated Theme Updater & GitHub Release Pipeline

**Status:** `[x]` Completed  
**Priority:** High (Required before moving to production)  
**Dependencies:** None  
**Target:** Enable seamless, one-click theme updates directly from WordPress Admin (**Appearance > Themes**) using [Plugin Update Checker](https://github.com/YahnisElsts/plugin-update-checker) connected to GitHub Releases.

---

## 1. Context & Objectives

When the theme is deployed to production (e.g. on Plesk / Apache hosting), we need a safe, manageable way to ship theme updates without requiring manual FTP/SFTP file uploads or full-site redeployments.
`inc/plugin-updates.php` already integrates `Plugin Update Checker v5` targeting `https://github.com/JordanDysart/indigenous-tourism-manitoba-wordpress/`.

**Goal:**
1. Finalize and verify `inc/plugin-updates.php` configuration.
2. Build an automated release packaging script (`npm run package:release`) that compiles production assets and generates a clean `kiwatinook.zip` containing only production theme files (excluding `node_modules`, `.git`, source maps, dev scripts).
3. Create a GitHub Actions workflow (`.github/workflows/release-theme.yml`) that triggers on new Git tags (e.g. `v1.0.1`), packages the theme, and attaches `kiwatinook.zip` as a release asset.
4. Document the `wp-config.php` token configuration for private repository authentication.

---

## 2. Technical Specification & File Map

### A. Modified File: `inc/plugin-updates.php`
- Verify theme metadata detection:
  ```php
  <?php
  if ( ! defined( 'ABSPATH' ) ) {
      exit;
  }

  require_once get_template_directory() . '/inc/plugin-update-checker/plugin-update-checker.php';

  use YahnisElsts\PluginUpdateChecker\v5\PucFactory;

  $itm_theme_updater = PucFactory::buildUpdateChecker(
      'https://github.com/JordanDysart/indigenous-tourism-manitoba-wordpress/',
      get_template_directory() . '/style.css',
      'kiwatinook'
  );

  // Private repository PAT authentication (configured in production wp-config.php)
  if ( defined( 'ITM_INDIGPRO_UPDATE_TOKEN' ) && ITM_INDIGPRO_UPDATE_TOKEN !== '' ) {
      $itm_theme_updater->setAuthentication( ITM_INDIGPRO_UPDATE_TOKEN );
  }

  // Instruct PUC to download the attached zip asset from the release rather than git source archive
  $itm_theme_updater->getVcsApi()->enableReleaseAssets();
  ```

### B. New Script: `tools/package-release.js` & NPM Command (`npm run package:release`)
- Script workflow:
  1. Runs `npm run build` to ensure fresh JS and CSS bundles.
  2. Creates a clean staging folder with necessary theme files:
     - Root PHP templates (`functions.php`, `header.php`, `footer.php`, `index.php`, `page.php`, `single.php`, `add-blocks.php`, `style.css`, `screenshot.png`)
     - `inc/` directory (including PUC)
     - `blocks/` (compiled block assets and render PHP)
     - `assets/css/` and `assets/fonts/`
     - `js/` and `languages/`
  3. Omits: `node_modules/`, `.git/`, `.github/`, `docs/`, `tools/`, source LESS files, Gulp files.
  4. Archives into `dist/kiwatinook.zip`.

### C. New GitHub Actions Workflow: `.github/workflows/release-theme.yml`
- Triggers on push tags matching `v*` (e.g. `git tag v1.0.1 && git push origin v1.0.1`).
- Installs Node dependencies, runs build, packages `kiwatinook.zip`, and creates a GitHub Release with the attached zip file.

### D. Production Setup Instruction
In production `wp-config.php`:
```php
// GitHub Personal Access Token for Theme Updates (read access to repo)
define('ITM_INDIGPRO_UPDATE_TOKEN', 'github_pat_xxxxxxxxxxxxxxxxxxxx');
```

---

## 3. Acceptance Criteria & QA Checklist

- [ ] `npm run package:release` generates a valid `dist/kiwatinook.zip` with clean internal folder structure `kiwatinook/...`.
- [ ] In WordPress Admin (**Appearance > Themes**), checking for updates queries GitHub Releases.
- [ ] When a new release tag is published on GitHub, WordPress shows "There is a new version of kiwatinook available. View version X.X.X details or update now."
- [ ] Clicking "Update Now" downloads and installs the release zip seamlessly without fatal errors.
