# ACF Dependency Map

This document tracks every place the theme uses ACF functions and the recommended
native WordPress replacement for each. The goal is to eliminate the ACF Pro
dependency over time so the theme can run on any WordPress install.

## Current guard status

All `get_field()` calls in template files now go through `itm_get_field()` (defined
in `functions.php`). This wrapper delegates to ACF when it is active and falls back
to `get_post_meta()` for post-based fields. Block-level fields (no `$post_id`)
return `null` without ACF.

---

## Group A — Operator post meta fields
**Status: Guards in place. `itm_get_field()` fallback already works via `get_post_meta()`.**

| Field key | Type | Used in |
|---|---|---|
| `operator_website` | URL | `content-operator.php`, `taxonomy.php`, operator blocks |
| `operator_phone_number` | Text | `content-operator.php`, `taxonomy.php` |
| `operator_business_email` | Email | `content-operator.php`, `taxonomy.php` |
| `operator_location` | Text | `content-operator.php`, `taxonomy.php`, operator map block |
| `operator_address` | Text | `content-operator.php`, `taxonomy.php` |
| `operator_short_description` | Textarea | `content-operator.php`, `taxonomy.php`, operator map block |
| `operator_coordinates_latitude` | Number | `content-operator.php`, `taxonomy.php`, operator map block |
| `operator_coordinates_longitude` | Number | `content-operator.php`, `taxonomy.php`, operator map block |
| `operator_coordinates_altitude` | Number | `content-operator.php`, `taxonomy.php` |

### Image fields (extra step required)
ACF image fields return an array. The native `get_post_meta()` fallback returns only the attachment ID.
Migration path: replace usages with `wp_get_attachment_image_src()`.

| Field key | Type | Used in |
|---|---|---|
| `operator_feature_image` | Image (array) | `content-operator.php`, `taxonomy.php`, operator map block |
| `operator_photos` | Gallery (array of arrays) | `content-operator.php`, `taxonomy.php` |

---

## Group B — Operator taxonomy fields
**Status: Redundant. Use `wp_get_post_terms()` instead.**

| Field key | Replacement |
|---|---|
| `operator_region` | `wp_get_post_terms( $post_id, 'operator_region' )` |
| `operator_category` | `wp_get_post_terms( $post_id, 'operator_category' )` |

---

## Group C — Banner block fields
**Status: Hard guard in place. Block shows placeholder without ACF.**

Migration path: rewrite as native Gutenberg block with `block.json` attributes.

| Field key | ACF type | Gutenberg attribute type |
|---|---|---|
| `title_group.title` | Group > Text | `string` |
| `title_group.text_color` | Group > Color Picker | `string` |
| `title_group.font_size` | Group > Number | `number` |
| `description_group.text_body` | Group > Textarea | `string` |
| `description_group.color_text_body` | Group > Color | `string` |
| `description_group.font_size` | Group > Number | `number` |
| `description_group.font_weight` | Group > Select | `string` |
| `background_image` | Image | `object` |
| `overlay_opacity` | Number (default 20) | `number` |
| `overlay_color` | Color (default #000) | `string` |
| `main_image` | Image | `object` |
| `text_alignment` | Select | `string` |

---

## Group D — Operator map block field
**Status: `itm_get_field()` guard in place. Returns null without ACF.**

| Field key | ACF type | Gutenberg attribute type |
|---|---|---|
| `operators_to_display` | Post Object / Relationship | `array` of post IDs |

---

## Group E — Social links (footer menu term field)
**Status: `itm_get_field()` guard in place. Returns null without ACF.**

| Field key | ACF type | Location |
|---|---|---|
| `social_media_links` | Repeater | `footer-menu` nav menu term |

---

## Summary

| Group | Fields | Status | Effort |
|---|---|---|---|
| A — Operator scalar meta | 9 fields | Fallback working | Low |
| A — Operator image meta | 2 fields | Fallback returns ID not array | Medium |
| B — Taxonomy fields | 2 fields | Redundant, delete ACF calls | Low |
| C — Banner block | 12 sub-fields | Needs full block rewrite | High |
| D — Operator map selector | 1 field | Needs block attribute | Medium |
| E — Social links repeater | 1 repeater | Needs options page | Medium |
