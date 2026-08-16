# Project: ITM Kiwatinook Theme Modernization & Video Popup Block

## Architecture
The ITM Kiwatinook theme is a custom WordPress theme for Indigenous Tourism Manitoba built on native WordPress block architecture (Gutenberg) with zero external page builder dependencies.
- **Build System**: Webpack via `@wordpress/scripts` with dynamic block auto-discovery (`blocks/*/edit.js` -> `blocks/*/index.js`), Gulp for LESS compilation (`assets/less/**/*.less` -> `assets/css/styles.css` and `assets/less/blocks/*.less` -> `blocks/blocks.css`).
- **Block Registration**: Standard `block.json` with PHP server-side rendering (`render: "file:./[block_name].php"`) registered in `add-blocks.php`.
- **Design Tokens**: Canonical LESS tokens in `assets/less/global/_variables.less` (`@color-orange: #da5225`, `@color-gold: #e0ac0f`, `@color-dark: #212b36`, fonts `Ubuntu` and `Nunito Sans`).
- **Database & Content Model**: Standard Gutenberg serialized block markup stored in MariaDB `wp_posts` (`post_type='page'`).
- **Test & Verification**: Playwright headless browser test harness (`tools/feedback-loop.js`), style degradation auditor (`tools/audit-styles.js`), multi-breakpoint screenshot generator (`tools/capture-screenshots.js`), and production comparison tool (`tools/compare-production.js`).

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | `relish/video-popup-block` schema & registration | `block.json` schema, metadata, attributes, and `add-blocks.php` registration | M1 (DONE) | ORIGINAL_REQUEST §1, Survey 1 |
| 2 | Video Popup Block React Editor Component | `edit.js` with `InspectorControls`, `MediaUpload`, poster image selector, color/opacity controls | M1 (DONE) | ORIGINAL_REQUEST §1, Survey 1 |
| 3 | Video Popup Block PHP Server-side Template | `video_popup_block.php` rendering cover thumbnail, SVG pulse play button, and accessible `<dialog>` | M1 (DONE) | ORIGINAL_REQUEST §1, Survey 1 |
| 4 | Video Popup Modal Controller & Lifecycle | `view.js` / front-end JS managing dynamic iframe/video embed, autoplay on open, zero-audio-leak cleanup on close, and WCAG focus trap / ESC handling | M1 (DONE) | ORIGINAL_REQUEST §1, Survey 1 |
| 5 | Video Popup LESS Styles & Animations | `assets/less/blocks/video_popup_block.less` with pulse ring animation, backdrop styling, and `prefers-reduced-motion` | M1 (DONE) | ORIGINAL_REQUEST §1, Survey 1 |
| 6 | Modernize `/about-itm/` (Building the Brand) | Replace legacy video popup with `relish/video-popup-block` | M2 (DONE) | ORIGINAL_REQUEST §2, Survey 2 |
| 7 | Modernize Core Pages (`/reconciliation/`, `/our-team/`, `/things-to-do/`) | Replace Kadence/Getwid/ACF blocks with `core/group`, `core/columns`, `core/gallery`, `relish/banner-block` | M2 (DONE) | ORIGINAL_REQUEST §2, Survey 2 |
| 8 | Modernize Membership & Legal Pages (`/become-a-member/`, `/member-benefits/`, `/privacy-policy/`, `/new-account-request/`, `/contact-us/`) | Replace Kadence layouts, buttons, and iconlists with native core equivalents preserving exact styling | M2 (DONE) | ORIGINAL_REQUEST §2, Survey 2 |
| 9 | Modernize Guide Training Suite (Hub, Steps 1-3, More Opportunities, Inquiry Form) | Replace raster text banners with `relish/banner-block` and native columns/buttons across 6 training pages | M2 (DONE) | ORIGINAL_REQUEST §2, Survey 2 |
| 10 | Asset Build Verification | Run `npm run build` ensuring 0 compilation errors across JS and CSS | M3 | ORIGINAL_REQUEST §3, Survey 3 |
| 11 | Automated Health Check Verification | Run `npm run feedback:test` ensuring HTTP 200, 0 PHP errors/warnings, and DOM header/footer integrity | M3 | ORIGINAL_REQUEST §3, Survey 3 |
| 12 | Style Degradation & Orphan Class Audit | Run `npm run audit:styles` verifying 0 orphan `kt-*` and `getwid-*` classes on refactored pages | M3 | ORIGINAL_REQUEST §3, Survey 3 |
| 13 | Multi-Breakpoint Visual Screenshot Verification | Run `npm run screenshot` to generate Desktop (1280px), Tablet (768px), and Mobile (375px) screenshots in `docs/screenshots/` | M3 | ORIGINAL_REQUEST §3, Survey 3 |
| 14 | Video Modal Interactive E2E Playwright Tests | Test modal opening, YouTube/Vimeo embed injection, autoplay, ESC key dismissal, zero audio leak, and focus management | M3 | ORIGINAL_REQUEST §3, Survey 3 |
| 15 | Adversarial Edge-Case Hardening (Tier 5) | Validate behavior with invalid URLs, missing poster images, reduced motion, mobile touch, and extreme viewports | M4 | Project Pattern, Survey 3 |
| 16 | Forensic Integrity Audit | Static analysis and runtime validation ensuring authentic implementation with 0 cheating | M4 | Project Pattern, Hard Constraints |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Native Video Modal Popup Block (`relish/video-popup-block`) | Implement `block.json`, `edit.js`, `video_popup_block.php`, `view.js`, `video_popup_block.less`, register in `add-blocks.php` | none | DONE |
| 2 | 15 WordPress Pages Refactoring | Update `wp_posts` across all 15 target pages to replace `kadence/*`, `acf/*`, and `getwid/*` blocks with native Core and `relish/*` blocks | M1 | DONE |
| 3 | Comprehensive E2E Verification & Visual Parity | Execute `npm run build`, `npm run feedback:test`, `npm run audit:styles`, `npm run screenshot`, and interactive video modal Playwright tests | M2 | DONE |
| 4 | Adversarial Hardening & Forensic Audit | Challenger adversarial testing (Tier 5) and Forensic Integrity Audit verification | M3 | IN_PROGRESS |

## Interface Contracts
### `relish/video-popup-block` ↔ WordPress Block Editor & Core Theme
- **Block Name**: `relish/video-popup-block`
- **Category**: `widgets`
- **Attributes**:
  - `videoUrl` (string): YouTube, Vimeo, or direct MP4/WebM URL.
  - `posterImage` (object with `id`, `url`, `alt`) or `thumbnailUrl` (string).
  - `title` (string): Title text displayed over card.
  - `caption` (string): Caption text displayed under title.
  - `overlayColor` (string, default `#000000`): Hex color.
  - `overlayOpacity` (number, default `25`): Percent opacity.
  - `playButtonColor` (string, default `#e0ac0f`): Hex color for pulse button.
  - `enablePulse` (boolean, default `true`): Enable/disable pulse ring animation.
  - `aspectRatio` (string, default `16-9`): CSS aspect ratio (`ratio-16-9`, `ratio-4-3`, `ratio-1-1`, `ratio-21-9`).
- **PHP Render Template**: Emits `.video-popup-block`, cover image, overlay, `.video-popup-play-btn.has-pulse`, and `<dialog class="video-popup-modal-dialog">` with embed container and close button.
- **Front-end Controller**: Dynamic embed injection on modal open, full DOM teardown on modal close, focus management (trap tab, restore focus on trigger), `Escape` key listener.

### Page Refactor Content Contract
- All 15 pages in `wp_posts` must contain ONLY:
  - Native Core blocks (`core/group`, `core/columns`, `core/heading`, `core/paragraph`, `core/image`, `core/gallery`, `core/buttons`, `core/button`, `core/list`, `core/spacer`, `core/shortcode`, `core/cover`)
  - Native Theme blocks (`relish/banner-block`, `relish/hero-block`, `relish/operator-search-block`, `relish/video-popup-block`)
- Zero occurrences of `<!-- wp:kadence/`, `<!-- wp:acf/`, or `<!-- wp:getwid/`.
- Zero orphan `kt-*` or `wp-block-getwid-*` CSS classes.

## Code Layout
- `blocks/video-popup-block/`: Native Video Modal Popup block implementation (DONE)
  - `block.json`: Gutenberg metadata schema
  - `edit.js`: React editor component
  - `video_popup_block.php`: PHP render callback
  - `view.js`: Front-end modal lifecycle & accessibility script
- `assets/less/blocks/video_popup_block.less`: LESS styling for card, pulse animation, and modal dialog (DONE)
- `inc/m2-pages-migration.php`: Complete 15-page Gutenberg modernizations (DONE)
- `assets/less/pages/modernized-pages.less`: Responsive page styling and design tokens (DONE)
- `add-blocks.php`: Block registration registry (DONE)
- `tools/`: Build, test, feedback, and screenshot automation scripts (DONE)
- `docs/screenshots/`: Visual verification screenshot baselines
