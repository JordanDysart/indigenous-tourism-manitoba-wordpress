# Task 10 — Operator Directory Dynamic Filtering & Native Taxonomies

**Status:** `[x]` Completed  
**Priority:** High  
**Dependencies:** None  
**Target:** Restore dynamic filtering on `/operators` by category and region using native Gutenberg blocks and AJAX without ACF Pro dependencies.

---

## 1. Context & Objectives

The `/operators` page is the primary directory where site visitors discover Indigenous businesses, lodges, culinary venues, and tours across Manitoba.
Currently:
- The page content in the database uses `wp:acf/operator-search-block` which was an ACF Pro block and does not render natively.
- Taxonomies `operator_category` and `operator_region` are already registered directly in `functions.php`.
- The AJAX endpoint `ajax_filter_operators()` exists in `functions.php` but needs refinement and styling.

**Goal:**
1. Re-register `relish/operator-search-block` as a native WordPress block via `block.json`.
2. Connect live AJAX filtering to dynamically update the operator card grid without a full page refresh.
3. Sync filter state to browser URL search parameters (`?category=culinary&region=central`) for deep-linking and browser history navigation.
4. Render empty states ("No operators found in this region") and loading skeleton states.

---

## 2. Technical Specification & File Map

### A. Modified File: `blocks/operator-search-block/block.json`
- Update schema to register native block:
  ```json
  {
    "$schema": "https://schemas.wp.org/trunk/block.json",
    "apiVersion": 3,
    "name": "relish/operator-search-block",
    "version": "1.0.0",
    "title": "Operator Filter & Search",
    "category": "widgets",
    "icon": "filter",
    "description": "Category and Region filter bar for Operator directory.",
    "keywords": ["operator", "filter", "category", "region"],
    "textdomain": "itm_indigpro",
    "render": "file:./operator_search_block.php",
    "editorScript": "file:./index.js"
  }
  ```

### B. Modified File: `add-blocks.php`
- Add `register_block_type( get_template_directory() . '/blocks/operator-search-block/block.json' );` inside the `init` action hook.
- Remove old `acf_register_block_type` calls for `operator-search-block`.

### C. Modified File: `blocks/operator-search-block/operator_search_block.php`
- Render accessible dropdown select elements or custom styled UI controls populated dynamically via `get_terms('operator_category')` and `get_terms('operator_region')`.
- Include hidden input fields or clean select markup with `id="operator_region_select"` and `id="operator_category_select"`.
- Provide an interactive "Reset Filters" action button.

### D. Modified File: `functions.php` (`ajax_filter_operators`)
- Enhance `ajax_filter_operators()`:
  - Query operators matching taxonomy term IDs.
  - Return standardized card markup matching the canonical design system:
    - 1:1 Aspect ratio thumbnail with `object-fit: cover`.
    - Region label in `@color-orange` (`#da5225`).
    - Operator title in Ubuntu bold.
    - Permalink to `/operator/slug/`.
  - Handle empty query results gracefully with friendly messaging.

### E. Modified File: `js/theme.js`
- Wire AJAX request triggered on dropdown selection change or "Filter" button click.
- Use `history.pushState()` to update URL query params when filters change.
- On page load, read `window.location.search` to pre-select dropdown filters if arriving via a shared link.

---

## 3. Acceptance Criteria & QA Checklist

- [ ] `/operators` page displays the Filter Bar at the top of the directory.
- [ ] Changing Region (e.g. "Central") or Category (e.g. "Culinary") updates the operator cards immediately via AJAX.
- [ ] URL in address bar updates to `/operators/?region=central&category=culinary`.
- [ ] Visiting `/operators/?region=central` directly loads filtered results on initial page render.
- [ ] If no operators match the filter, a clean empty state message is shown with a "Reset Filters" button.
- [ ] No ACF Pro plugin is required for filtering to work.
- [ ] Card layout is responsive (4 columns desktop, 2 columns tablet, 1 column mobile).
