# Audit Report: Reconciliation — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/reconciliation/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-29`  
**Runtime Health:** `Good (Image Optimization & CLS Dimensions Needed)`  

---

## 1. Executive Summary
The Reconciliation page runs with zero JavaScript runtime errors and efficient script execution. However, asset delivery can be improved: several uncompressed photographic assets (such as `SpenceFProfile-scaled.jpg` at 537 KB and `FCA486D3...jpeg` at 444 KB) contribute to a ~3.17 MB total media payload, and 10 of 12 images lack explicit HTML `width`/`height` dimensions creating Cumulative Layout Shift (CLS) risk during initial rendering.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Image Asset Weight | Featured operator images (`SpenceFProfile-scaled.jpg`, `FCA486D3...jpeg`) | **Medium** | Several photographic assets exceed 400KB - 540KB each. | Convert to WebP format (< 100 KB) with proper responsive sub-sizes. |
| 2 | Cumulative Layout Shift (CLS) | Banner block & operator cards | **Medium** | **10 of 12 images** lack explicit `width` and `height` attributes in HTML. | Declare explicit dimensions (`width` / `height`) on banner block and `.featured-operator-card-image` templates. |
| 3 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons v1.11.3 is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 4 | Script Loading Efficiency | Theme JS bundles | **Low** | Scripts (`fancybox.umd.js`, `theme.js`, `blocks.js`) load synchronously without `defer`. | Apply `defer` attribute to non-critical asset enqueues. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero JavaScript runtime crashes or failed requests.
- [ ] **Image Compression:** Multiple images exceed 400KB - 840KB; WebP compression not active.
- [ ] **Image Dimensions & CLS:** 10 images missing explicit dimensions in HTML.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.
- [x] **Analytics Loading:** Google Tag Manager loads asynchronously.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Declare Image Dimensions on Operator Cards:** Add explicit `width` and `height` attributes to the featured operator card grid template to eliminate layout jumping.

### 🟡 Medium Priority / Improvements
1. **Compress Featured Images:** Run a WebP compression pass on `SpenceFProfile-scaled.jpg` and `FCA486D3-AC50...jpeg`.
2. **Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

### 🟢 Low Priority / Polish & Recommendations
1. **Native Lazy Loading:** Ensure `loading="lazy"` is applied to lower operator cards.
