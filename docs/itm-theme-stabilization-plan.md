# ITM Theme — Stabilization Plan

**Goal:** Deliver a working, professional theme that demonstrates competency to the client
and establishes an ongoing support relationship. No page-builder plugins, no orphaned
licenses, no inaccessible content. Everything the theme needs ships with the theme.

---

## Current State Summary

The theme (`itm_indigpro` / kiwatinook) is a classic (non-FSE) WordPress theme built on
Underscores. It has a custom nav walker, a custom block system, and a set of ACF Pro field
groups driving the main interactive components. The previous developer left the project with:

- A header mega menu that depended on a licensed plugin that is no longer available.
- A footer that dumps every nav link with no visual hierarchy.
- A banner/hero block that hard-guards against rendering without ACF Pro.
- An operator map block registered via `acf_register_block_type` — also inert without ACF.
- Client-added full-width images with text placed *inside* the image file — inaccessible,
  unresponsive, and unmaintainable.
- Several planned blocks (`statement-card`, `video-section`, `cta-banner`) that were
  scoped but never built.

The design system (colors, typography, buttons, spacing) is largely done. The LESS/CSS
pipeline is in place. The `Operator` CPT and its taxonomies (`operator_category`,
`operator_region`) are registered directly in `functions.php` — no plugin needed.

---

## Four Work Streams

### 1 — Header Mega Menu

**Problem:** The mega menu was powered by a licensed plugin (MaxMegaMenu or equivalent).
The license is gone. The current `GAC_Menu_Walker` in `inc/class-header-menu-walker.php`
renders a basic dropdown with per-item thumbnail support at depth 1, but has no panel or
image-grid layout.

**Goal:** A fully custom mega menu with:
- Image panels in top-level dropdowns managed by the site editor (not a plugin).
- Keyboard and focus-trap accessibility (WCAG 2.1 AA).
- Mobile-drawer version already wired via the hamburger button.

**Approach:**
- Store mega menu images as WordPress menu item meta using a custom admin UI hook
  (`wp_nav_menu_item_custom_fields`). No ACF, no plugin — the data lives in
  `wp_term_meta` / `wp_postmeta` via the existing `add/update_menu_item_meta` WP API.
- Rewrite `GAC_Menu_Walker` to emit a `<div class="mega-menu-panel">` at depth 0
  for any top-level item that has children + a stored image.
- Image picker in the WP admin Menus screen (Appearance → Menus) via a small JS/PHP
  addition to `functions.php` + a new `inc/mega-menu-meta.php`.
- CSS lives in `assets/less/navigation/menu.less` (already exists).

**Assets needed:**
- No new libraries. Vanilla JS only.
- One new PHP file: `inc/mega-menu-meta.php`.
- Updates to `inc/class-header-menu-walker.php` and `assets/less/navigation/menu.less`.

---

### 2 — Footer Redesign

**Problem:** The footer nav dumps all site links as a flat list with too much visual noise.
The social links field group (`social_media_links`) requires ACF, so the social icons
section currently outputs "No social links available."

**Goal:** A clean two-column footer with:
- Left column: logo, tagline ("Adventure To Understanding"), and social icons.
- Right column: a reduced nav — top-level sections only, max 4–5 items, linking to
  a dedicated **Sitemap page** for users who want the full site index.
- Social icons driven by a simple Theme Customizer option (no ACF needed).
- A dedicated `/sitemap` page template that renders the full link tree.

**Approach:**
- Replace the ACF repeater for social links with Customizer settings
  (`add_setting` / `add_control` in `inc/customizer.php`). Each social platform gets
  a URL field; icons are inline SVG shipped with the theme.
- Trim the footer nav to top-level items only. Remove the `Footer_Menu_Walker`
  dropdown behaviour — footer is not a navigation menu, it is a sitemap index.
- Create `page-sitemap.php` as a custom page template. It auto-generates the full
  link tree from the registered nav menus. No manual maintenance.

**Assets needed:**
- SVG icons for standard social platforms (Facebook, Instagram, X/Twitter, YouTube)
  — inline in a new `inc/social-icons.php` helper.
- Updates to `inc/customizer.php`, `inc/class-footer-menu-walker.php`, `footer.php`.
- New file: `page-sitemap.php`.

---

### 3 — Content Migration (Blocks & Interactive Map)

**Problem:** Three blocks are inert without ACF Pro:
1. `relish/banner-block` — shows a hard-coded error message.
2. `relish/operator_block` (operator map) — registered via `acf_register_block_type`,
   so it does not even appear in the block inserter without ACF.
3. `relish/operator-search-block` — same registration method, same issue.

The operator map also depends on the `leaflet-map` WordPress plugin (shortcodes).
That plugin is not installed locally.

**Goal:** All three blocks work on a clean WordPress install with zero third-party plugins.
The operator map renders using Leaflet.js loaded directly by the theme.

**Approach — Banner block (already partially migrated):**
- A `block.json` exists and is registered via `register_block_type`. The PHP file
  still reads from ACF. Complete the migration: move all 12 field values into
  `block.json` attributes; rewrite `banner_block.php` to read `$attributes`; build
  `edit.js` controls in the sidebar (image picker, color picker, text fields).
- Remove the ACF guard at the top of `banner_block.php`.

**Approach — Operator map block:**
- Re-register as a native block via `block.json` (matching the pattern the banner
  block now uses). Remove `acf_register_block_type` from `add-blocks.php`.
- Replace the `leaflet-map` shortcodes with direct Leaflet.js API calls. Enqueue
  Leaflet CSS + JS from the theme (`assets/vendor/leaflet/`) or a pinned CDN URL.
- The single block attribute is `operatorsToDisplay` (array of post IDs). Build a
  simple post-object picker in `edit.js` using the `@wordpress/data` store.
- `operator_block.php` already reads operator meta via `itm_get_field()` with the
  `get_post_meta()` fallback — no ACF needed on the front end.

**Approach — Operator search/filter block:**
- Re-register as native block. No attribute changes needed; it reads taxonomy terms
  at render time.
- The AJAX handler (`ajax_filter_operators`) in `functions.php` is already ACF-free.

**New blocks to build (from block-rebuild-plan.md, Phase 2):**

| Block | Purpose | Notes |
|---|---|---|
| `relish/statement-card` | Mission / Vision / Outlook cards | Icon + label + body |
| `relish/video-section` | Video with poster + lightbox | YouTube embed |
| `relish/cta-banner` | Full-width CTA with background | Replaces Kadence rows |

**Assets needed:**
- Leaflet.js v1.9.x (download to `assets/vendor/leaflet/` — self-hosted, no plugin).
- Custom hoop marker + shadow PNGs (already exist in `blocks/operator_block/`).
- New `edit.js` files for banner, operator map, and new blocks.
- Updates to `add-blocks.php` to remove all `acf_register_block_type` calls.

---

### 4 — Accessible Image Sections

**Problem:** The client has been adding sections to pages by inserting a flat image file
that has text baked into the pixels. These are:
- Inaccessible (screen readers cannot read the text; fails WCAG 1.1.1, 1.4.3).
- Not responsive (text scales with the image, breaks on mobile).
- Not editable without a designer re-exporting the image.

**Goal:** Replace every instance with a properly structured block that renders real HTML
text over a background image.

**Approach:**
- Audit pages in the database for image blocks where the `alt` text is empty or
  contains what should be heading/paragraph content.
- Replace each with the `relish/banner-block` (once it is fully rebuilt in Stream 3).
  The banner block already supports: background image, overlay color + opacity,
  title, description, text alignment.
- If the client needs a simpler "text on a solid colour" section, the core
  `Cover` block with a background image and real text children is a zero-setup
  accessible alternative they can use immediately.
- Document a short editorial guide (one page, plain language) explaining why images
  with text are inaccessible and how to use the banner block instead.

**Assets needed:**
- Completed `relish/banner-block` (depends on Stream 3).
- One-page editorial guide in `docs/editorial-guide.md`.

---

## Dependency Map

```
Stream 1 (Mega Menu)       — independent, can start now
Stream 2 (Footer)          — independent, can start now
Stream 3 (Blocks + Map)    — banner block first; operator blocks follow
Stream 4 (Image Sections)  — depends on Stream 3 banner block completion
```

---

## Plugin Inventory (target state)

| Plugin | Status | Action |
|---|---|---|
| ACF Pro | Client lost license | Eliminate — replace with native blocks + Customizer |
| leaflet-map | Not installed locally | Eliminate — inline Leaflet.js in theme |
| Kadence Blocks | Data still in DB | Leave post content as-is; blocks render as empty divs (harmless) |
| Getwid | Data still in DB | Same — harmless legacy data |
| WP Rocket | DB tables present, files absent | Re-evaluate on production only |
| AIOSEO | DB tables present, files absent | Re-evaluate on production only |
| Akismet | Inactive | Keep for production, inactive in dev |

---

## Files to Create / Modify

### New files
| File | Stream |
|---|---|
| `inc/mega-menu-meta.php` | 1 |
| `inc/social-icons.php` | 2 |
| `page-sitemap.php` | 2 |
| `assets/vendor/leaflet/leaflet.js` + `.css` | 3 |
| `blocks/banner_block/edit.js` | 3 |
| `blocks/banner_block/block.json` (update) | 3 |
| `blocks/operator_block/block.json` | 3 |
| `blocks/operator_block/edit.js` | 3 |
| `blocks/operator-search-block/block.json` | 3 |
| `blocks/statement-card/block.json` | 3 |
| `blocks/statement-card/statement_card.php` | 3 |
| `blocks/statement-card/edit.js` | 3 |
| `blocks/video-section/block.json` | 3 |
| `blocks/video-section/video_section.php` | 3 |
| `blocks/video-section/edit.js` | 3 |
| `blocks/cta-banner/block.json` | 3 |
| `blocks/cta-banner/cta_banner.php` | 3 |
| `blocks/cta-banner/edit.js` | 3 |
| `docs/editorial-guide.md` | 4 |

### Modified files
| File | Stream | Change |
|---|---|---|
| `inc/class-header-menu-walker.php` | 1 | Mega panel output |
| `assets/less/navigation/menu.less` | 1 | Mega panel layout |
| `header.php` | 1 | Wire mega-menu-meta include |
| `functions.php` | 1, 2 | Include new inc files; Customizer social settings |
| `inc/customizer.php` | 2 | Social icon URL settings |
| `inc/class-footer-menu-walker.php` | 2 | Simplify to top-level only |
| `footer.php` | 2 | Use new social icons helper |
| `add-blocks.php` | 3 | Remove ACF registrations; add native registrations |
| `blocks/banner_block/banner_block.php` | 3 | Read $attributes, remove ACF guard |

---

## Delivery Sequence

1. **Mega menu** (Stream 1) — visible, high-impact, client can see it immediately.
2. **Footer** (Stream 2) — quick win, removes broken social icons section.
3. **Banner block** (Stream 3a) — unlocks Stream 4.
4. **Operator blocks + map** (Stream 3b) — core feature, takes the most time.
5. **Accessible image sections** (Stream 4) — content audit + swap.
6. **New blocks** (Stream 3, Phase 2) — statement-card, video-section, cta-banner.
