# Audit Report: Things To Do — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/things-to-do/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-30`  
**Runtime Health:** `Good (Lightweight Payload; Clean Runtime)`  

---

## 1. Executive Summary
The Things To Do hub is lightweight and responsive, transferring less than 2.0 MB in total media assets with clean JavaScript execution and zero console runtime errors. Opportunities for optimization include adding explicit `width` and `height` attributes to the top feature cards to eliminate layout shift risks (CLS) and deregistering the duplicate Bootstrap Icons CDN stylesheet.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Cumulative Layout Shift (CLS) | Top feature cards | **Medium** | 4 of 6 images lack explicit HTML `width` and `height` dimensions. | Add explicit dimensions to the opening card template. |
| 2 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 3 | Hero Asset Optimization | Top feature card imagery (`about-itm.jpg`) | **Low** | Global top feature image is transferred as an 841 KB JPEG. | Convert to WebP format (< 120 KB). |
| 4 | Script Loading Efficiency | Theme JS bundles | **Low** | Scripts (`fancybox.umd.js`, `theme.js`) load synchronously without `defer`. | Apply `defer` attribute to non-critical script tags. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed HTTP requests.
- [x] **Total Page Weight:** Lightweight total payload (< 2.0 MB).
- [ ] **Image Dimensions & CLS:** 4 top cards missing explicit dimensions in HTML.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.
- [x] **Analytics Loading:** Google Tag Manager loads asynchronously.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Declare Image Dimensions on Top Cards:** Add explicit `width` and `height` attributes to top feature card markup.

### 🟡 Medium Priority / Improvements
1. **Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.
2. **Optimize Hero Media:** Compress `about-itm.jpg` to WebP.

### 🟢 Low Priority / Polish & Recommendations
1. **Asset Deferral:** Add `defer` attribute to theme scripts to optimize main thread parsing.
