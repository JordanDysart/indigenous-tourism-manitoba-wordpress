# Original User Request

## Initial Request — 2026-08-15T20:57:54Z

Build a native, accessible Video Modal Popup block (`relish/video-popup-block`) with a custom cover image, pulse play button, and lightbox modal video player, and systematically refactor remaining WordPress pages to eliminate legacy third-party plugin dependencies (`kadence/*`, `acf/*`, `getwid/*`) while preserving full visual parity with the production site.

Working directory: `/Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook`
Integrity mode: development

## Requirements

### R1. Native Video Modal Popup Block (`relish/video-popup-block`)
- Register a native WordPress Gutenberg block (`relish/video-popup-block`) via `block.json` (zero ACF / Getwid plugin dependency).
- Support block attributes for video URL (YouTube, Vimeo, or direct video file), cover thumbnail image, caption, overlay color/opacity, and play button styling.
- Provide block editor controls in `edit.js` and server-side render template in `video_popup_block.php`.
- Front-end displays a responsive thumbnail card with an animated pulse play button.
- Clicking the play button opens a full-screen accessible modal lightbox (using HTML5 `<dialog>` or native theme modal) playing the embedded video with autoplay.
- Closing the modal (via Close '✕' button, clicking the backdrop, or pressing `Escape`) immediately stops/clears video playback and prevents background audio leakage.

### R2. Systematic Legacy Page Modernization
- Refactor the 15 remaining pages currently containing legacy `kadence/*`, `acf/*`, and `getwid/*` blocks into standard WordPress Core blocks (`core/cover`, `core/group`, `core/columns`, `core/heading`, `core/paragraph`, `core/gallery`, `core/buttons`) and native theme blocks (`relish/banner-block`, `relish/video-popup-block`, `relish/operator-search-block`):
  1. `/reconciliation/` (ID 283)
  2. `/things-to-do/` (ID 463)
  3. `/our-team/` (ID 435)
  4. `/become-a-member/` (ID 2367)
  5. `/member-benefits/` (ID 2373)
  6. `/contact-us/` (ID 605)
  7. `/privacy-policy/` (ID 1769)
  8. `/new-account-request/` (ID 1518)
  9. `/itm-indigenous-guide-training-program-inquiry-form/` (ID 2572)
  10. `/indigenous-guide-training-program-step-1/` (ID 2534)
  11. `/indigenous-guide-training-program-step-2/` (ID 2537)
  12. `/indigenous-guide-training-program-step-3/` (ID 2542)
  13. `/indigenous-guide-training-program-more-learning-opportunities/` (ID 2676)
- Update `/about-itm/` to utilize the new `relish/video-popup-block` in place of the inline embed for the "Building the Brand" section.

### R3. Automated Visual and Functional Verification
- Run `npm run build` to compile all block JavaScript and LESS stylesheets.
- Run `npm run feedback:test` to verify HTTP 200 responses, asset availability, and absence of PHP notices.
- Use Playwright browser tests to verify interactive modal opening, video playback, and escape key dismissal.
- Capture updated full-page visual regression screenshots across Desktop (1280px), Tablet (768px), and Mobile (375px) viewports.

## Acceptance Criteria

### Video Modal Block
- [ ] `relish/video-popup-block` is insertable via the Gutenberg block inserter with sidebar controls for thumbnail and video URL.
- [ ] Clicking the play button opens a modal overlay with the embedded video player.
- [ ] Modal closes cleanly via close button, clicking backdrop, or pressing `Escape`.
- [ ] Video playback stops immediately when the modal is closed.

### Page Modernization
- [ ] All 15 remaining pages are refactored to standard Core and native theme blocks in the local WordPress database.
- [ ] 0 fatal errors, 0 missing block warnings, and 0 broken layout containers when Kadence, Getwid, and ACF plugins are absent.
- [ ] Visual hierarchy, typography, colors, and responsive card layouts match the canonical theme design system.

### Verification
- [ ] `npm run build` compiles with 0 errors.
- [ ] `npm run feedback:test` passes with 0 failures.
- [ ] Playwright visual screenshots refreshed in `docs/screenshots/`.
