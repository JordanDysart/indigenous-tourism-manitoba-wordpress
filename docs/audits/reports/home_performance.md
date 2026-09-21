# Audit Report: Home — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-29`  
**Runtime Health:** `Warnings & Heavy Asset Bottlenecks Detected`  

---

## 1. Executive Summary
The homepage executes with clean JavaScript execution without fatal runtime crashes, but suffers from significant asset delivery bottlenecks. Over **5.8 MB** of uncompressed raster images are transferred on initial page load (including a single 1.66MB PNG conference graphic), 9 of 15 images lack explicit `width`/`height` attributes risking Cumulative Layout Shift (CLS), and duplicate icon stylesheets (`bootstrap-icons` loaded twice from different sources) add redundant network overhead.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Heavy Asset Payload | Conference Graphic (`Web-callout-block-2026-ITM-Conference-1.png`) | **High** | The conference callout graphic is transferred as a **1.66 MB** uncompressed PNG. | Convert image to modern WebP format and compress with 82% quality (target size: < 150 KB). |
| 2 | Heavy Asset Payload | Operator & Story Imagery (`about-itm.jpg`, `SharecuteriePicnic...jpg`, `beading...jpg`) | **High** | Multiple photographs exceed 500KB - 850KB each, bringing total page image weight above 5.8 MB. | Enable WebP generation / responsive `srcset` with WordPress image sub-sizes. |
| 3 | Cumulative Layout Shift (CLS) | Top feature cards & operator cards | **Medium** | **9 out of 15 images** lack explicit `width` and `height` attributes in HTML markup. | Add explicit `width` and `height` attributes or CSS `aspect-ratio` to container classes (`featured-operator-card-image`). |
| 4 | Duplicate Stylesheet Loading | Bootstrap Icons (`areoi-bootstrap-icons-css` & `bootstrap-icons-css`) | **Medium** | Bootstrap Icons v1.11.3 is loaded twice: once via the plugin directory and once via jsdelivr CDN. | Deregister the redundant CDN enqueue in `functions.php` / theme setup. |
| 5 | Render-Blocking Scripts | Theme & plugin JS bundles | **Low** | Scripts (`fancybox.umd.js`, `theme.js`, `blocks.js`) are loaded synchronously in page body without `defer`. | Add `defer` attribute via `script_loader_tag` filter for non-critical scripts. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** No fatal script errors or uncaught JavaScript exceptions detected.
- [ ] **Image Weight & Compression:** Multiple images exceed 500KB - 1.6MB; WebP compression is not utilized.
- [ ] **Image Dimensions & CLS:** 9 images missing HTML `width` / `height` tags.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded twice.
- [x] **Asynchronous Analytics:** Google Tag Manager and Cloudflare Web Analytics load asynchronously (`async` / `defer`).

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Compress & Modernize Conference Callout Banner:** Re-upload `Web-callout-block-2026-ITM-Conference-1.png` as WebP (< 150KB) to instantly reduce initial page load payload by over 1.5MB.
2. **Deduplicate Bootstrap Icons:** Remove the secondary CDN enqueue of `bootstrap-icons.min.css` in theme asset hooks.

### 🟡 Medium Priority / Improvements
1. **Inject Explicit Image Dimensions:** Ensure block templates and custom card HTML render explicit `width` and `height` attributes to eliminate layout reflows during page rendering.
2. **Batch WebP Compression:** Run a lossless image optimization pass on `/wp-content/uploads/` imagery.

### 🟢 Low Priority / Polish & Recommendations
1. **Add `defer` to Non-Critical Enqueues:** Apply `defer` to `theme.js`, `animated-menu.js`, and `fancybox.js` for smoother initial painting.
