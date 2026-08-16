# Test Infrastructure & Quality Assurance Specification

**Project:** ITM Kiwatinook WordPress Theme Modernization & Video Modal Popup Block  
**Integrity Mode:** Development  
**Version:** 1.0.0  
**Last Updated:** 2026-08-15  

---

## 1. Executive Summary & Testing Philosophy

This document defines the comprehensive test infrastructure, methodology, and verification matrix for the **ITM Kiwatinook Theme Modernization**. The quality assurance strategy guarantees:
1. **Zero-Dependency Architecture:** Complete decoupling from legacy third-party plugins (`kadence/*`, `acf/*`, `getwid/*`) without layout, styling, or functional regression.
2. **Accessible Native Video Modal Block:** Total WCAG 2.1 AA compliance, robust iframe/video lifecycle management, zero audio leakage upon dismissal, keyboard focus trapping, and graceful handling of diverse video providers (YouTube, Vimeo, MP4/WebM).
3. **Multi-Tier Automated Verification:** Multi-stage quality gates spanning compilation checks, server runtime smoke tests, computed design token audits, multi-breakpoint visual diffing, interactive Playwright E2E browser tests, and adversarial stress tests.

---

## 2. Test Architecture & Directory Layout

The testing system is organized across distinct runners and audit tools within the `tools/` directory, outputting reports and visual artifacts to `docs/`:

```
tools/
├── config.js                  # Shared test configuration (breakpoints, tokens, URLs, browser launch)
├── test-video-popup.js        # Tier 4 Playwright test suite for Video Popup Block lifecycle & accessibility
├── test-e2e-all.js            # Master multi-tier E2E test runner and orchestrator
├── feedback-loop.js           # Tier 2 Server health, HTTP 200, PHP notice, and DOM integrity checks
├── audit-styles.js            # Tier 3 Design system token validation & orphan plugin class auditor
├── capture-screenshots.js     # Tier 3 Multi-breakpoint visual screenshot generator (1280px, 768px, 375px)
├── compare-production.js      # Production parity diffing tool
├── generate-styleguide.js     # Canonical design system HTML & Markdown generator
├── package-release.js         # Production zip packaging verification tool
└── sync-media-from-prod.js    # Media asset synchronization tool

docs/
├── TEST_INFRA.md              # Quality assurance specification (this document)
├── TEST_READY.md              # Test execution summary, status report & checklist
├── screenshots/               # Visual regression baselines across Desktop, Tablet, Mobile, Components
│   ├── desktop/               # 1280x800 fullpage and viewport PNGs
│   ├── tablet/                # 768x1024 fullpage and viewport PNGs
│   ├── mobile/                # 375x812 fullpage and viewport PNGs (touch-enabled)
│   ├── components/            # Isolated header, footer, card grid, filter bar, mobile nav PNGs
│   └── manifest.json          # Complete screenshot catalog & timestamp metadata
└── styleguide/
    ├── style-audit-data.json  # Live DOM style audit results & orphan class inventory
    └── index.html             # Interactive design system styleguide
```

---

## 3. Systematic Test Methodologies

### 3.1 Category-Partition Methodology

The input and operational spaces of the theme components and video modal block are partitioned into discrete functional categories:

| Functional Area | Input Parameter / State | Categories & Partitions | Expected System Behavior |
|---|---|---|---|
| **Video Source Provider** | `videoUrl` format | • YouTube standard (`youtube.com/watch?v=...`)<br>• YouTube short (`youtu.be/...`)<br>• Vimeo standard (`vimeo.com/...`)<br>• Direct HTML5 video (`.mp4`, `.webm`, `.mov`)<br>• Invalid / empty string | Injects sanitized `<iframe>` with `autoplay=1` (YouTube/Vimeo) or `<video controls autoplay>` (Direct). Gracefully prevents crash on empty/invalid URL. |
| **Modal Lifecycle** | Dialog Trigger & Dismissal | • Click pulse play button<br>• Click close '✕' button<br>• Click dialog backdrop overlay<br>• Press `Escape` key<br>• Native `cancel` event | Opens `<dialog>` via `showModal()`. On any dismissal trigger, clears embed target (`innerHTML = ''`), stops all playback, removes `body.video-modal-open`, and returns focus to trigger. |
| **Audio Leakage Prevention** | Post-dismissal DOM state | • Immediate close after open<br>• Rapid open-close cycling<br>• Close during iframe buffer | Embedded iframe/video element is completely detached from DOM. Audio stream terminates immediately; zero background noise. |
| **Accessibility (WCAG 2.1)** | Keyboard & Screen Reader | • `Tab` / `Shift+Tab` cycling<br>• ARIA roles & attributes<br>• `prefers-reduced-motion` | Focus remains trapped inside modal while open. `role="dialog"`, `aria-modal="true"`, and `aria-label` present. Continuous pulse wave animation stops under reduced motion. |
| **Aspect Ratios** | `aspectRatio` attribute | • `16-9` (`ratio-16-9`)<br>• `4-3` (`ratio-4-3`)<br>• `1-1` (`ratio-1-1`)<br>• `21-9` (`ratio-21-9`) | Emits corresponding CSS class and maintains responsive container aspect ratio without letterbox overflow. |
| **Overlay & Styling** | `overlayColor`, `overlayOpacity` | • Default `#000000` @ 25%<br>• Custom hex color<br>• Opacity range 0–100% | Generates inline or class-based rgba/hex overlay styling with precise computed opacity. |
| **Responsive Viewports** | Browser dimensions | • Desktop (1280 × 800)<br>• Tablet (768 × 1024)<br>• Mobile (375 × 812 with touch) | Zero horizontal overflow (`scrollWidth <= innerWidth`), mobile navigation drawer toggles cleanly, responsive grids collapse to single-column. |
| **Page Block Composition** | Post Content (`wp_posts`) | • Modern Core blocks (`core/group`, `core/columns`, `core/buttons`)<br>• Native theme blocks (`relish/*`)<br>• Legacy blocks (`kadence/*`, `acf/*`, `getwid/*`) | Modern pages render cleanly with 0 fatal errors and 0 orphan classes (`kt-*`, `wp-block-getwid-*`). |

---

### 3.2 Boundary Value Analysis (BVA)

Boundary conditions evaluated across the system:

| Boundary Parameter | Lower Boundary (Min) | Nominal / Typical | Upper Boundary (Max) | Stress / Out-of-Bounds |
|---|---|---|---|---|
| **Overlay Opacity** | `0` (Completely transparent) | `25` – `30` (Standard contrast) | `100` (Fully opaque cover) | `< 0` (Clamped to 0) / `> 100` (Clamped to 100) |
| **Viewport Width** | `320px` (Small mobile / iPhone SE) | `768px` (Tablet), `1280px` (Desktop) | `2560px` (4K Ultra-wide) | `< 320px` (No layout breakage, content wraps) |
| **Title / Caption Length** | Empty string `""` (No text rendered) | 20–80 chars (Standard header) | 500+ chars (Multi-paragraph) | Ellipsis / clean container wrapping, no modal spillover |
| **HTTP Response Time** | `50ms` (Local cached) | `200ms – 800ms` | `5000ms` (Lando network idle) | `> 25000ms` (Timeout handled gracefully) |
| **Modal Dismissal Latency** | `0ms` (Instant Escape press) | `500ms – 2000ms` (User watching) | `60000ms+` (Extended watch) | Rapid double-click on play button handled idempotently |

---

### 3.3 Combinatorial & Pairwise Testing Matrix

Pairwise combinations of video modal parameters tested during interactive E2E runs:

| Test Vector ID | Video Provider | Aspect Ratio | Pulse Animation | Dismissal Action | Expected Result |
|---|---|---|---|---|---|
| **TC-PAIR-01** | YouTube (`youtu.be/ID`) | 16:9 | Enabled (`has-pulse`) | Close Button (`.video-popup-modal-close`) | Modal opens, YouTube iframe plays, closes cleanly, audio halts. |
| **TC-PAIR-02** | YouTube (`watch?v=ID`) | 4:3 | Disabled | Backdrop Click (Outside Dialog) | Modal opens, 4:3 container, backdrop click closes, DOM emptied. |
| **TC-PAIR-03** | Vimeo (`vimeo.com/ID`) | 16:9 | Enabled | Escape Key (`KeyboardEvent.Escape`) | Modal opens, Vimeo iframe autoplay, ESC key closes, focus restored. |
| **TC-PAIR-04** | Direct MP4 (`video.mp4`) | 21:9 | Enabled | Close Button | `<video>` tag plays with controls, closes cleanly, video paused/cleared. |
| **TC-PAIR-05** | YouTube (`youtu.be/ID`) | 1:1 | Reduced Motion (`prefers-reduced-motion`) | Escape Key | Pulse animation inactive, modal opens, ESC closes, audio terminates. |
| **TC-PAIR-06** | Invalid Video URL | 16:9 | Enabled | Close Button | Does not throw unhandled exception; modal closes cleanly without console errors. |

---

### 3.4 Real-World Workload Scenarios

1. **User Journey 1: Brand Video Discovery (`/about-itm/`)**
   - Visitor navigates to About ITM page.
   - Scrolls to "Building the Brand" section.
   - Observes animated pulse play button on responsive cover thumbnail.
   - Clicks play button -> Lightbox modal opens with full-screen focus.
   - Video begins autoplaying with sound/controls.
   - Visitor presses `Escape` -> Video immediately terminates, modal closes, and focus returns to play button.
2. **User Journey 2: Mobile Navigation & Operator Exploration (`/operators/`)**
   - Mobile user (375px viewport) loads homepage.
   - Toggles hamburger menu -> Mobile navigation drawer slides open.
   - Navigates to `/operators/` -> Operator search filter and card grid load smoothly.
   - Selects operator card -> Single operator page opens with Leaflet map centered on coordinates.
3. **User Journey 3: Membership Onboarding (`/become-a-member/` & `/member-benefits/`)**
   - User reviews membership tiers, benefits list, and CTA buttons.
   - Verifies cards display consistent typography (Ubuntu headings, Nunito Sans body) and canonical color tokens (`#da5225`, `#e0ac0f`, `#212b36`).

---

## 4. Five-Tier Testing Pyramid

```
                       ┌─────────────────────────┐
                       │  Tier 5: Adversarial &  │
                       │    Forensic Hardening   │
                       └────────────┬────────────┘
                                    │
                       ┌────────────┴────────────┐
                       │ Tier 4: Interactive E2E │
                       │    Playwright Suite     │
                       └────────────┬────────────┘
                                    │
                       ┌────────────┴────────────┐
                       │  Tier 3: Visual Parity  │
                       │   & Style Degradation   │
                       └────────────┬────────────┘
                                    │
                       ┌────────────┴────────────┐
                       │   Tier 2: Health Check  │
                       │   & Server Smoke Tests  │
                       └────────────┬────────────┘
                                    │
                       ┌────────────┴────────────┐
                       │ Tier 1: Build & Asset   │
                       │   Compilation Integrity │
                       └─────────────────────────┘
```

### Tier 1: Build & Asset Compilation Integrity
- **Objective:** Verify 100% successful build of all JavaScript bundles and LESS stylesheets.
- **Commands:** `npm run build` (`npm run build:js && npm run build:css`)
- **Pass Criteria:**
  - `blocks/video-popup-block/index.js` generated from `edit.js`.
  - `blocks/video-popup-block/index.asset.php` generated with dependencies.
  - `assets/css/styles.css` compiled and non-empty (>50 KB).
  - `blocks/blocks.css` compiled and non-empty (>30 KB).
  - 0 Webpack errors, 0 Gulp syntax errors, process exit code 0.

### Tier 2: Health Check & Server Smoke Tests
- **Objective:** Verify local WordPress server responsiveness, HTTP 200 status, and absence of PHP errors.
- **Commands:** `npm run feedback:test` (`node tools/feedback-loop.js`)
- **Pass Criteria:**
  - HTTP 200 across all core URLs (`/`, `/about-itm/`, `/operators/`, `/operator/prairie-berry/`, `/experience-map/`).
  - 0 PHP `Fatal error`, `Parse error`, `Warning`, or `Notice` entries in rendered HTML.
  - Presence of semantic `header#masthead` and `footer#colophon` DOM landmarks.
  - 0 uncaught JavaScript runtime exceptions.

### Tier 3: Visual Parity & Style Degradation Auditing
- **Objective:** Verify design system compliance and complete elimination of legacy plugin footprints.
- **Commands:**
  - `npm run audit:styles` (`node tools/audit-styles.js`)
  - `npm run screenshot` (`node tools/capture-screenshots.js`)
- **Pass Criteria:**
  - 0 orphan `kt-*` classes and 0 `wp-block-getwid-*` classes across modernized pages.
  - Computed typography matches Ubuntu (headings) and Nunito Sans (body).
  - Computed colors adhere to canonical palette (`#da5225`, `#e0ac0f`, `#212b36`, `#404040`).
  - Desktop (1280px), Tablet (768px), and Mobile (375px) screenshots generated in `docs/screenshots/`.
  - `docs/screenshots/manifest.json` updated with complete page/component records.

### Tier 4: Interactive E2E Playwright Suite
- **Objective:** Verify end-to-end browser interactivity, modal lifecycle, video embed generation, and WCAG focus trapping.
- **Commands:** `node tools/test-video-popup.js`
- **Pass Criteria:**
  - Clicking `.video-popup-play-btn` opens `<dialog class="video-popup-modal-dialog">` via `showModal()`.
  - Embed iframe/video generated with `autoplay=1` parameter.
  - Clicking close button (`.video-popup-modal-close`) closes dialog and clears embed container.
  - Clicking dialog backdrop closes dialog and clears embed container.
  - Pressing `Escape` key closes dialog and clears embed container.
  - Zero audio leakage: all media playback stops instantly upon dialog close.
  - Focus trap: keyboard `Tab` cycles exclusively within modal elements while open.
  - Trigger focus restoration: closing modal restores focus to the triggering play button.

### Tier 5: Adversarial Hardening & Forensic Integrity
- **Objective:** Stress-test edge conditions, malformed inputs, reduced-motion preferences, and verify zero cheating / genuine implementation.
- **Commands:** `node tools/test-e2e-all.js`
- **Pass Criteria:**
  - Malformed/empty video URLs do not throw uncaught JavaScript exceptions.
  - `@media (prefers-reduced-motion: reduce)` disables pulse keyframe animations.
  - Zero mock bypasses or facade test shortcuts.

---

## 5. Comprehensive Feature Traceability Matrix (All 16 Features)

| # | Feature Name | Milestone | Tier | Primary Test File / Tool | Verification Assertion / Expected Output |
|---|---|---|---|---|---|
| **1** | `relish/video-popup-block` schema & registration | M1 | Tier 1 | `blocks/video-popup-block/block.json`, `add-blocks.php` | Schema valid JSON, `register_block_type` called in `add-blocks.php`, attributes registered. |
| **2** | Video Popup Block React Editor Component | M1 | Tier 1 | `blocks/video-popup-block/edit.js`, `webpack.config.js` | Webpack compiles `edit.js` to `blocks/video-popup-block/index.js` with 0 syntax errors. |
| **3** | Video Popup Block PHP Server-Side Template | M1 | Tier 2 | `blocks/video-popup-block/video_popup_block.php` | Server renders `.video-popup-block`, cover thumbnail, pulse play button, and `<dialog>` template without PHP warnings. |
| **4** | Video Popup Modal Controller & Lifecycle | M1 | Tier 4 | `tools/test-video-popup.js` | Full lifecycle verified: dynamic embed, autoplay, backdrop click, Escape key close, zero audio leakage, focus trap. |
| **5** | Video Popup LESS Styles & Animations | M1 | Tier 1, 3 | `assets/less/blocks/video_popup_block.less`, `assets/gulpfile.js` | Compiles into `blocks/blocks.css`; pulse wave animation active; reduced-motion rule respected. |
| **6** | Modernize `/about-itm/` (Building the Brand) | M2 | Tier 2, 4 | `tools/feedback-loop.js`, `tools/test-video-popup.js` | Page returns HTTP 200; `relish/video-popup-block` rendered in place of legacy embed; modal operates cleanly. |
| **7** | Modernize Core Pages (`/reconciliation/`, `/our-team/`, `/things-to-do/`) | M2 | Tier 2, 3 | `tools/feedback-loop.js`, `tools/audit-styles.js` | HTTP 200; 0 Kadence/Getwid blocks in `post_content`; 0 orphan classes; valid Core block markup. |
| **8** | Modernize Membership & Legal Pages (`/become-a-member/`, `/member-benefits/`, `/privacy-policy/`, `/new-account-request/`, `/contact-us/`) | M2 | Tier 2, 3 | `tools/feedback-loop.js`, `tools/audit-styles.js` | HTTP 200; 0 orphan `kt-*` classes; buttons adhere to `.btn--primary` / `.btn--gold` design system tokens. |
| **9** | Modernize Guide Training Suite (Hub, Steps 1-3, More Opportunities, Inquiry Form) | M2 | Tier 2, 3 | `tools/feedback-loop.js`, `tools/capture-screenshots.js` | HTTP 200; raster text banners replaced with semantic HTML headings + `relish/banner-block`; 0 missing blocks. |
| **10** | Asset Build Verification | M3 | Tier 1 | `npm run build` | Webpack + Gulp build exits with code 0; `styles.css` and `blocks.css` generated. |
| **11** | Automated Health Check Verification | M3 | Tier 2 | `tools/feedback-loop.js` | 100% HTTP 200 across sampled URLs, 0 PHP warnings/fatals, header/footer DOM landmarks intact. |
| **12** | Style Degradation & Orphan Class Audit | M3 | Tier 3 | `tools/audit-styles.js` | Total orphan `kt-*` and `getwid-*` classes audited; audit data saved to `docs/styleguide/style-audit-data.json`. |
| **13** | Multi-Breakpoint Visual Screenshot Verification | M3 | Tier 3 | `tools/capture-screenshots.js` | Desktop, Tablet, and Mobile PNGs captured for all target pages and UI components in `docs/screenshots/`. |
| **14** | Video Modal Interactive E2E Playwright Tests | M3 | Tier 4 | `tools/test-video-popup.js` | Playwright test passes all assertions for dialog open, autoplay, backdrop dismissal, ESC key dismissal, zero audio leak, and focus trap. |
| **15** | Adversarial Edge-Case Hardening | M4 | Tier 5 | `tools/test-e2e-all.js`, `tools/test-video-popup.js` | Handles YouTube URLs, Vimeo URLs, direct MP4s, malformed URLs, rapid cycling, and reduced motion without uncaught errors. |
| **16** | Forensic Integrity Audit | M4 | Tier 5 | `tools/test-e2e-all.js` | Authenticity verification: genuine DOM rendering, valid CSS files, no mock facades or fabricated pass results. |

---

## 6. Execution Commands & Automation

To run the complete verification suite or individual test tiers:

```bash
# 1. Full E2E Master Test Runner (Orchestrates All 5 Tiers)
node tools/test-e2e-all.js

# 2. Interactive Video Modal Playwright Test
node tools/test-video-popup.js

# 3. Server Health & Smoke Test
npm run feedback:test

# 4. Style & Orphan Class Audit
npm run audit:styles

# 5. Visual Regression Screenshot Generator
npm run screenshot

# 6. Production Parity Comparison
npm run compare:prod

# 7. Asset Compilation Build
npm run build
```

---

## 7. Failure Diagnosis & Troubleshooting Playbook

| Symptom / Error | Root Cause | Remediation Procedure |
|---|---|---|
| `Mach port check-in ... Permission denied` | macOS Playwright sandbox process restriction | Launch Playwright with sandbox bypass (`BypassSandbox: true` in agent tooling or run directly in host terminal). |
| `ERR_CONNECTION_REFUSED` / Server Offline | Local Lando environment is stopped | Start Lando service (`lando start`) or verify `WP_BASE_URL` matches active development host. |
| `PHP Notice: Undefined index ...` | Missing block attribute fallback in PHP template | Ensure `$attributes['attributeName'] ?? 'default'` fallback coalescing in `video_popup_block.php`. |
| Modal does not close on `Escape` | Missing keydown listener or `cancel` event preventDefault | Ensure `document.addEventListener('keydown')` catches `Escape` when modal is open or handle `<dialog>` `cancel` event. |
| Audio continues playing after modal close | `<iframe>` / `<video>` remaining in DOM | In modal close handler, execute `embedTarget.innerHTML = ''` and clear element references immediately. |
| Focus escapes modal on `Tab` | Missing WCAG focus trap listener | Implement `keydown` listener trapping focus between first and last focusable elements in the `<dialog>`. |

---

## 8. Sign-Off & Test Suite Readiness

- **Test Infrastructure Status:** ACTIVE & OPERATIONAL
- **Frameworks:** Playwright 1.60.0, Node.js 20.x, Webpack 5.x (`@wordpress/scripts`), Gulp 5.x
- **Exit Code Protocol:** 0 on success, 1 on any assertion failure
