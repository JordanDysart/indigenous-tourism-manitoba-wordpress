# Indigenous Tourism Manitoba (ITM) — Style Guide & Design System

**Theme:** `kiwatinook` (`itm_indigpro`)  
**Date:** 2026-08-14  
**Audited Base URL:** https://indigenous-tourism-manitoba-wordpress.lndo.site

---

## 1. Brand Color Palette (Canonical)

Defined in `assets/less/global/_variables.less`:

| Token | HEX | LESS Variable | Purpose & Usage Guidelines |
|---|---|---|---|
| **Primary Accent** | `#da5225` | `@color-orange` | Region badges, primary CTA buttons (`.btn--primary`), active accents |
| **Gold Highlight** | `#E0AC0F` | `@color-gold` | Selected states, focus rings (`:focus-visible`), nav active indicator |
| **Dark Gold** | `#dca12b` | `@color-gold-dark` | Accent lines, blockquote borders, decorative dividers |
| **Maroon** | `#610000` | `@color-maroon` | Desktop top-level nav links, dark headings |
| **Deep Blue** | `#116E95` | `@color-blue` | Button hover states, text link hover states |
| **Charcoal Dark** | `#212B36` | `@color-dark` | Dark section backgrounds, dark headings (H1–H6), dark buttons |
| **Body Charcoal** | `#404040` | `@color-body-text` | Default paragraph copy and general text |
| **Map Olive** | `#605e43` | `@color-map-bg` | Operator map panel background |
| **Mid Gray** | `#637381` | `@color-mid-gray` | Secondary text, captions, author/date meta |
| **Light Gray** | `#919eab` | `@color-light-gray` | Input borders, placeholders, disabled states |
| **Off White** | `#f9f9f9` | `@color-off-white` | Alternating section backgrounds, card containers |

---

## 2. Typography Hierarchy

Fonts loaded via self-hosted files in `assets/fonts/` and declared in `assets/less/global/_fonts.less`:
- **Primary Body Font:** `Nunito Sans` (weights 200–900 variable)
- **Secondary Display / Heading Font:** `Ubuntu` (weights 300, 400, 500, 700 static)

### Heading Scale

| Element | Font | Size (rem) | Size (px) | Weight | Line Height | Color |
|---|---|---|---|---|---|---|
| `h1` | Ubuntu | 2.5rem | 40px | 700 | 1.25 | `#212B36` (`@color-dark`) |
| `h2` | Ubuntu | 2.0rem | 32px | 700 | 1.25 | `#212B36` (`@color-dark`) |
| `h3` | Ubuntu | 1.5rem | 24px | 700 | 1.25 | `#212B36` (`@color-dark`) |
| `h4` | Ubuntu | 1.25rem | 20px | 700 | 1.25 | `#212B36` (`@color-dark`) |
| `h5` | Ubuntu | 1.125rem | 18px | 700 | 1.25 | `#212B36` (`@color-dark`) |
| `h6` | Ubuntu | 1.0rem | 16px | 700 | 1.25 | `#212B36` (`@color-dark`) |
| `p` | Nunito Sans | 1.0rem | 16px | 400 | 1.6 | `#404040` (`@color-body-text`) |
| `.lead` | Nunito Sans | 1.125rem | 18px | 300 | 1.6 | `#404040` (`@color-body-text`) |
| `small` | Nunito Sans | 0.875rem | 14px | 400 | 1.5 | `#637381` (`@color-mid-gray`) |

---

## 3. Button System

Defined in `assets/less/global/_buttons.less`:

- **Base Class:** `.btn` (Height: 48px, Padding: 8px 22px, Radius: 8px, Font: Nunito Sans 800)
- **Variants:**
  - `.btn--primary`: Background `#da5225` (`@color-orange`), Color: `#fff`, Hover: `#116E95` (`@color-blue`).
  - `.btn--dark`: Background `#212B36` (`@color-dark`), Color: `#fff`, Hover: Lighten 10%.
  - `.btn--gold`: Background `#E0AC0F` (`@color-gold`), Color: `#212B36`, Hover: `#B3200E`.
  - `.btn--outline`: Background: `transparent`, Border: `2px solid #da5225`, Color: `#da5225`.
  - `.btn--ghost`: Background: `transparent`, Border-bottom: `1px solid #da5225`, Color: `#da5225`.
- **Sizes:**
  - `.btn--sm`: Padding 8px 14px, Font size 0.875rem (14px).
  - `.btn--lg`: Height 56px, Padding 12px 32px, Font size 1.125rem (18px).
  - `.btn--full`: Width 100%.

---

## 4. Layout & Grid Standards

- **Max Content Width:** `1244px` (`@content-width`)
- **Narrow Content Width:** `1140px` (`@content-width-narrow`)
- **Base Grid Gap:** `20px` (`@gap`)
- **Fixed Header Clearance:** `110px` (`@header-height`)
- **Border Radius Scale:**
  - `@radius-sm: 5px` (small badges, tags)
  - `@radius-md: 8px` (buttons, input fields)
  - `@radius-lg: 16px` (operator cards, container panels)
  - `@radius-xl: 40px` (hero banners)
  - `@radius-full: 100%` (circular avatars, marker badges)

---

## 5. Style Preservation vs Upkeep Degradation Audit

### ✅ Canonical Styles to PRESERVE

1. **Brand Palette:**
   - Consistent use of Primary Orange (`#da5225`) and Gold (`#E0AC0F`).
2. **Typography System:**
   - Bold display Ubuntu headings with Nunito Sans body.
3. **Operator Architecture:**
   - Clean custom post type (`operator`) with structured taxonomies (`operator_category`, `operator_region`).
4. **Button & Interaction Polish:**
   - Standard 48px height buttons with smooth 250ms cubic-bezier transition to blue hover state.

---

### ⚠️ Site Degradation Patterns to REFACTOR

1. **Hard-coded Inline Styles in Content & Templates:**
   - *Issue:* Post templates and Gutenberg content contain inline styles such as `style="color:#da5225;font-size:1.13rem;font-weight:700"`.
   - *Fix:* Remove inline style declarations and bind semantic CSS classes (`.taxonomy-operator_region`, `.operator-title`).
2. **Flat Images Containing Burned-In Text:**
   - *Issue:* Full-width sections using raster PNG images (`Group-4.png`, `Group-5.png`) with graphic text baked into the pixels.
   - *Fix:* Replace with the native `relish/banner-block` rendering responsive, accessible HTML headings and body over background imagery.
3. **Orphaned Page-Builder Markup:**
   - *Issue:* Legacy markup containing `kt-row-layout` (Kadence) and `wp-block-getwid-*` containers.
   - *Fix:* Sanitize post content in WordPress editor to use native core and theme blocks.
4. **Unstructured Footer Navigation:**
   - *Issue:* Flat link dump with broken ACF social links.
   - *Fix:* Implement two-column footer + Customizer-driven social SVG icons + dedicated auto-generated `page-sitemap.php`.

---

## 6. Feedback & Verification Workflow

1. Run build: `npm run build`
2. Run style audit: `npm run audit:styles`
3. Capture screenshots: `npm run screenshot`
4. Rebuild style guide: `npm run build:styleguide`
5. Open interactive style guide: `open docs/styleguide/index.html`
