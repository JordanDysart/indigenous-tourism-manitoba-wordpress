# Block Rebuild Plan

Goal: replace all Kadence and ACF-dependent blocks with self-contained native
Gutenberg blocks that ship with the theme. No page builder, no ACF Pro required.

---

## How native blocks work (quick reference)

A native Gutenberg block has three parts:

```
blocks/my-block/
  block.json       <- declares name, attributes, which files to load
  render.php       <- PHP renders the front-end (reads from $attributes)
  edit.js          <- JS renders the editor preview + controls sidebar
```

Data lives in block attributes stored in the post content, not in ACF field groups.

---

## Legacy block inventory

| # | Legacy block | Plugin used | Replaces with |
|---|---|---|---|
| 1 | Hero banner | `kadence/rowlayout` + ACF | `relish/banner-block` (existing, convert from ACF) |
| 2 | Operator listing grid | Custom block | `relish/operator_search_block` (already native) |
| 3 | Operator map | Custom block + ACF | `relish/operator_block` (partially native) |
| 4 | Mission/Vision/Outlook card | `kadence/rowlayout` | `relish/statement-card` (new) |
| 5 | Video popup section | `getwid/video-popup` | `relish/video-section` (new) |
| 6 | Membership CTA | `kadence/rowlayout` + button | `relish/cta-banner` (new) |
| 7 | Circular image pair | `kadence/column` + image | Core `image` blocks + CSS class |

---

## Phase 1 — Fix existing blocks

**1a. `relish/banner-block` — convert ACF to native attributes**
- `block.json` — add attributes object and `"render": "file:./banner_block.php"`
- `banner_block.php` — swap `itm_get_field()` for `$attributes['fieldName']`
- `add-blocks.php` — remove duplicate `acf_register_block_type()` call

**1b. `relish/operator_block` — add `operators_to_display` as block attribute**
- `block.json` — add `"operatorsToDisplay": { "type": "array" }`
- `operator_block.php` — read from `$attributes`

---

## Phase 2 — New blocks

**2a. `relish/statement-card`** — icon + label + body, right-golden layout, rounded card
**2b. `relish/video-section`** — poster image + play button, YouTube lightbox
**2c. `relish/cta-banner`** — full-width bg image, white text, gold button

---

## Phase 3 — CSS only

**Circular image pair** — core `image` + `.img-circular` CSS class

---

## Files to create / modify

| File | Action |
|---|---|
| `blocks/banner_block/block.json` | Add attributes, add render key |
| `blocks/banner_block/banner_block.php` | Replace ACF calls with $attributes |
| `blocks/banner_block/edit.js` | Create editor UI |
| `blocks/operator_block/block.json` | Add operatorsToDisplay attribute |
| `blocks/statement-card/block.json` | Create |
| `blocks/statement-card/statement_card.php` | Create |
| `blocks/statement-card/edit.js` | Create |
| `blocks/video-section/block.json` | Create |
| `blocks/video-section/video_section.php` | Create |
| `blocks/video-section/edit.js` | Create |
| `blocks/cta-banner/block.json` | Create |
| `blocks/cta-banner/cta_banner.php` | Create |
| `blocks/cta-banner/edit.js` | Create |
| `add-blocks.php` | Remove ACF calls, update register paths |
