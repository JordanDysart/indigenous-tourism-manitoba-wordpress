# Audit Report: Guide Training Step 2: 7-Day Training Course — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/indigenous-guide-training-program-step-2/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-30`  
**Runtime Health:** `Good (Lightweight Payload; Dimension Attributes Needed)`  

---

## 1. Executive Summary
The Step 2: 7-Day Training Course page delivers a fast, responsive user experience with a lean footprint (< 2.0 MB total weight) and zero JavaScript runtime exceptions. The primary performance enhancements involve declaring explicit `width` and `height` attributes on top feature cards to mitigate Cumulative Layout Shift (CLS) and removing the redundant Bootstrap Icons CDN stylesheet.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Cumulative Layout Shift (CLS) | Top feature cards | **Medium** | 4 of 6 images lack explicit HTML `width` and `height` attributes. | Add explicit dimensions to opening card templates. |
| 2 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 3 | Hero Asset Optimization | Top feature card imagery (`about-itm.jpg`) | **Low** | Global top feature image is transferred as an 841 KB JPEG. | Convert to WebP format (< 120 KB). |
| 4 | Asset Caching & Delivery | Global Scripts | **Low** | Core scripts load efficiently with clean execution flow. | Maintain current caching policies. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed network requests.
- [x] **Total Page Weight:** Lightweight total payload (< 2.0 MB).
- [ ] **Image Dimensions & CLS:** 4 images missing explicit dimensions in HTML.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.
- [x] **Analytics Loading:** Google Tag Manager loads asynchronously.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Declare Image Dimensions on Top Cards:** Add explicit `width` and `height` attributes to top feature card markup.

### 🟡 Medium Priority / Improvements
1. **Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

### 🟢 Low Priority / Polish & Recommendations
1. **Modern Image Formats:** Convert JPG assets to next-gen `.webp` or `.avif` for optimal mobile loading speeds.
