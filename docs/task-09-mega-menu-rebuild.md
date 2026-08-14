# Task 09 — Rebuild Header Mega Menu (Accessible & Controllable)

**Status:** `[x]` Completed  
**Priority:** High  
**Dependencies:** None (Stream 1 from Stabilization Plan)  
**Target:** Replace buggy single-dropdown toggle menu with an accessible, multi-column CSS Grid mega menu with editor-managed thumbnail images.

---

## 1. Context & Objectives

The current header navigation on production is buggy:
- It dumps children into an unconstrained flex row that wraps chaotically and breaks on categories with many links (e.g. "Explore" with 15 sub-items).
- It relies on click-toggle events on desktop rather than intuitive hover/focus states, and locks the body scroll unpredictably via `enableMenu`.
- It attempts to pull thumbnails from `$item->object_id` (post thumbnail), failing for taxonomy terms, custom links, and non-post items.

**Goal:**
Deliver an accessible (WCAG 2.1 AA), responsive mega menu with:
1. **Desktop:** Multi-column CSS Grid panel (`.mega-menu-panel`) revealed on hover and keyboard `:focus-within`.
2. **Editor Controls:** Image picker inside WordPress Admin (**Appearance > Menus**) using `wp_nav_menu_item_custom_fields` storing attachment IDs in `wp_postmeta`.
3. **Mobile:** Smooth accordion drawer with hamburger toggle.
4. **Keyboard Accessibility:** Arrow key / Tab navigation, `Escape` key close, and proper `aria-expanded` attributes.

---

## 2. Technical Specification & File Map

### A. New File: `inc/mega-menu-meta.php`
- Hook `wp_nav_menu_item_custom_fields` to render an image upload/select field for depth 0 and depth 1 menu items.
- Hook `wp_update_nav_menu_item` to sanitize and save `_itm_menu_image_id` postmeta.
- Enqueue WordPress media library script (`wp_enqueue_media()`) on the `nav-menus.php` admin page.

### B. Modified File: `inc/class-header-menu-walker.php`
- Update `GAC_Menu_Walker` (or `ITM_Mega_Menu_Walker`):
  - In `start_lvl()`: For depth 0 items with children, emit `<div class="mega-menu-panel"><div class="mega-menu-grid"><ul class="sub-menu">`.
  - In `start_el()`:
    - Retrieve custom menu image using `get_post_meta($item->ID, '_itm_menu_image_id', true)`.
    - If present, render `<div class="menu-item-card"><img src="..." alt="..."><span class="menu-item-title">...</span></div>`.
  - In `end_lvl()`: Close `.mega-menu-grid` and `.mega-menu-panel` wrapper divs.

### C. Modified File: `assets/less/navigation/menu.less`
- Replace legacy flex styling with modern CSS Grid:
  ```less
  .mega-menu-panel {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: #ffffff;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
    border-top: 3px solid @color-orange;
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
    transition: all 250ms ease;
    z-index: 99;

    .mega-menu-grid {
      max-width: @content-width;
      margin: 0 auto;
      padding: 32px @gap;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
    }
  }

  .nav-menu > li:hover .mega-menu-panel,
  .nav-menu > li:focus-within .mega-menu-panel {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  ```

### D. Modified File: `js/navigation.js`
- Remove scroll-locking body class (`enableMenu`) on desktop.
- Add keyboard trap & `Escape` key handler to dismiss open dropdowns.
- Mobile drawer accordion handling with height transitions.

---

## 3. Acceptance Criteria & QA Checklist

- [ ] In **Appearance > Menus**, admin can click "Upload/Select Image" for any menu item.
- [ ] Top-level desktop items smoothly reveal multi-column grid panel on hover.
- [ ] Categories with many items (e.g. "Explore" with 15 links) are cleanly laid out in organized columns (e.g. Experiences, Categories, Regions) without overflowing.
- [ ] Tabbing through menu items with keyboard opens panels and highlights focus indicators with `@color-gold`.
- [ ] Pressing `Escape` closes the active mega panel.
- [ ] Mobile hamburger toggle opens slide drawer; clicking parent items expands accordion without horizontal overflow.
- [ ] Multi-breakpoint screenshots verified via `npm run screenshot`.
