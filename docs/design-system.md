# ITM Theme — Design System Checklist

---

## Font files

Self-hosted font files: `assets/fonts/`
`@font-face` declarations: `assets/less/global/_fonts.less`
Imported in: `assets/less/style.less`

**Fonts confirmed:**
- **Nunito Sans** — variable font, weights 200–900. Primary: body text and UI.
- **Ubuntu** — static files, weights 300/400/500/700. Secondary: headings.

Both `.woff2` + `.ttf` files are in `assets/fonts/`.

---

## Implementation order

1. ~~Fonts~~ done -> ~~Typography~~ done -> ~~Colors~~ done -> ~~Spacing (partial)~~ done -> ~~Links~~ done -> ~~Buttons~~ done -> Forms
2. ~~Header nav~~ done -> ~~Mobile nav~~ done -> ~~Footer nav~~ done
3. Hero / Banner block -> Card + Card grid -> Everything else

---

## Atomic components

### 1. Color palette `[x]`
Defined in `assets/less/global/_variables.less`

| Variable | Hex | Usage |
|---|---|---|
| `@color-orange` | `#da5225` | Primary accent |
| `@color-gold` | `#E0AC0F` | Selected states, nav active |
| `@color-gold-dark` | `#dca12b` | Accent lines |
| `@color-maroon` | `#610000` | Nav links desktop |
| `@color-blue` | `#116E95` | Hover states |
| `@color-dark` | `#212B36` | Dark backgrounds |
| `@color-body-text` | `#404040` | Body copy |
| `@color-mid-gray` | `#637381` | Secondary text |
| `@color-light-gray` | `#919eab` | Placeholders |
| `@color-off-white` | `#f9f9f9` | Light backgrounds |

### 2. Typography `[x]`
File: `assets/less/global/_typography.less`
- Body: Nunito Sans, 16px, line-height 1.5, `@color-body-text`
- Headings H1–H6: Ubuntu, sizes 2.5rem → 1rem
- Utilities: `.lead`, `.text-small`, `.sr-only`, `.list-unstyled`, `.dashed-line`

### 3. Spacing `[~]`
`@gap: 20px` base, breakpoints defined. Full spacing scale (`@space-xs` etc.) not yet done.

### 4. Links `[x]`
File: `assets/less/global/_links.less`
Classes: `.link-orange`, `.link-maroon`, `.link-gold`, `.link-subtle`, `.link-underline`, `.link-view-all`

### 5. Buttons `[x]`
File: `assets/less/global/_buttons.less`
Variants: `.btn--primary`, `.btn--dark`, `.btn--gold`, `.btn--outline`, `.btn--ghost`
Sizes: `.btn--sm`, `.btn--lg`, `.btn--full`

### 6. Forms `[ ]`
File to create: `assets/less/global/_forms.less`

### 7–12. Tags, Lists, Dividers, Icons, Images, Focus
Partially handled in `_typography.less`. Dedicated files not yet created.

---

## Molecular components

### Navigation `[x]`
- **Desktop header nav** — `assets/less/navigation/menu.less`
- **Mobile nav** — `assets/less/navigation/animated-menu.less`
- **Footer nav** — `assets/less/navigation/footer-menu.less`

### Page sections `[ ]`
- **Hero / banner** — `assets/less/blocks/banner_block.less`
- **Section header row** — not yet done
- **Mission / Vision / Outlook cards** — not yet done
- **CTA banner** — not yet done
- **Video section** — not yet done

### Content cards `[ ]`
- **Operator card** — `assets/less/blocks/operator_block_list.less`
- **Card grid** — not yet done

### Operator-specific `[~]`
- **Operator map block** — `assets/less/blocks/operator_block_map.less`
- **Operator search / filter** — `assets/less/blocks/operator_search_block.less`
- **Operator detail page** — `assets/less/template-parts/content-operator.less`

### Global layout `[ ]`
- **Site header** — see navigation
- **Site footer** — see navigation
- **Page wrapper** — max-width `@content-width: 1244px`
- **Two-column content + sidebar** — not yet done
