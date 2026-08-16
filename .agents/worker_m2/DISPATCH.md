## 2026-08-15T21:14:46Z

You are worker_m2 (Worker agent for Milestone 2: 15 WordPress Pages Modernization).
Your working directory is `/Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/.agents/worker_m2`.
Workspace directory: `/Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook`.
Authoritative request: `/Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/ORIGINAL_REQUEST.md`.
Project plan: `/Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/PROJECT.md`.
Survey findings: `/Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/.agents/explorer_survey_2/handoff.md`.

MANDATORY: Read `ORIGINAL_REQUEST.md`, `PROJECT.md`, and `.agents/explorer_survey_2/handoff.md` before starting.

DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your mission:
Systematically refactor all 15 target WordPress pages to eliminate 100% of legacy third-party plugin block dependencies (`kadence/*`, `acf/*`, `getwid/*`) while preserving full visual parity and design system token conformance:

Target 15 Pages:
1. `/about-itm/` (Page ID 22) — Replace legacy video popup with `relish/video-popup-block` in "Building the Brand" section.
2. `/reconciliation/` (Page ID 283) — Replace Kadence rowlayout/advancedheading/acf-banner with `relish/banner-block`, `core/group`, `core/columns`, `core/buttons`.
3. `/things-to-do/` (Page ID 463) — Replace Kadence/ACF/Getwid images-stack with `relish/banner-block`, `core/group`, `core/columns`, `core/gallery`.
4. `/our-team/` (Page ID 435) — Replace Getwid section/custom-post-type with `core/group`, `core/columns`, `core/image` with circular hoop wrapper (`.img-circular`), `core/heading`, `core/paragraph`.
5. `/become-a-member/` (Page ID 2367) — Replace Kadence rows/buttons with `relish/banner-block`, `core/group`, `core/columns`, `core/buttons` + `core/button` (`.btn--primary`, `.btn--gold`).
6. `/member-benefits/` (Page ID 2373) — Replace Kadence rowlayouts and 87 orphan classes with `relish/banner-block`, `core/group` (cards), `core/columns`, `core/buttons`.
7. `/contact-us/` (Page ID 605) — Replace Kadence iconlists with `core/group`, `core/columns` (2-col info + form), `core/list`, `core/heading`.
8. `/privacy-policy/` (Page ID 1769) — Replace Kadence rows with `core/group` (constrained narrow width `1140px`), semantic headings, paragraphs, lists.
9. `/new-account-request/` (Page ID 1518) — Replace Kadence rows with `core/group`, headings, native form embed.
10. `/itm-indigenous-guide-training-program-inquiry-form/` (Page ID 2572) — Replace Kadence image/rows with `core/image`, `core/group`, native inquiry form embed.
11. `/guide-training-program/` (Page ID 2734) — Replace raster text banners with `relish/banner-block` (Hero), `.program-pathway-grid` (`core/columns` + `core/group`), `core/buttons`.
12. `/indigenous-guide-training-program-step-1/` (Page ID 2534) — Replace raster text banners with `relish/banner-block` (Hero with HTML text overlay), `core/columns` (Curriculum vs Prerequisites), `core/buttons` (Step Navigation).
13. `/indigenous-guide-training-program-step-2/` (Page ID 2537) — Replace raster text banners with `relish/banner-block`, `core/columns`, `core/group`, `core/buttons`.
14. `/indigenous-guide-training-program-step-3/` (Page ID 2542) — Replace raster text banners with `relish/banner-block`, `core/columns`, `core/group`, `core/buttons` (Apply / Inquire CTA).
15. `/indigenous-guide-training-program-more-learning-opportunities/` (Page ID 2676) — Replace Kadence rows/headings with `core/group`, `core/columns` (Opportunity card grid), `core/buttons`.

Execution Steps:
- Update `post_content` in `wp_posts` for all 15 pages using a clean migration script, WP-CLI, or MySQL queries.
- Ensure any accompanying CSS adjustments in `assets/less/` are compiled via `npm run build`.
- Verify with `npm run feedback:test` (all 15 pages HTTP 200, 0 PHP errors).
- Verify with `npm run audit:styles` (orphan class count drops to 0 across refactored pages).
- Verify with `npm run screenshot` (generates full-page visual screenshots across Desktop, Tablet, and Mobile).
- Verify with `npm test` / `node tools/test-e2e-all.js`.
- Write your completion report to `/Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/.agents/worker_m2/handoff.md` and send a completion message with the path when done.
