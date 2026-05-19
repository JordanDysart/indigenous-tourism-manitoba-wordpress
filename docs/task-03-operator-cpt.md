# Task 03 — Identify What Registers the Operator CPT

**Status:** `[x]` Done — registered in `functions.php`

---

## Resolution

The `operator` custom post type and both taxonomies (`operator_category`, `operator_region`) are registered directly in `functions.php` via:

- `register_operator_post_type()` hooked on `init`
- `register_operator_taxonomies()` hooked on `init`

No plugin needed. No mystery.

---

## Registered fields

The CPT supports: title, editor, thumbnail. Both taxonomies are hierarchical with `show_in_rest: true`.
