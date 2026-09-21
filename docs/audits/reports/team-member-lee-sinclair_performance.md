# Audit Report: Lee Sinclair Profile — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/team-member/lee-sinclair/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-31`  
**Runtime Health:** `Good (1.96 MB Total Image Payload; 33.9 KB Headshot Portrait; Clean Console)`  

---

## 1. Executive Summary
The single team member profile for Lee Sinclair demonstrates excellent runtime stability with zero JavaScript console errors or runtime exceptions. Her featured portrait (`lee_sinclair.jpg`) is well-optimized at 33.9 KB (750x677 px), keeping the total page weight to 1.96 MB. Performance enhancements include eliminating redundant Bootstrap Icons stylesheets, adopting WebP generation across uploads, and adding missing image dimensions to global navigation elements.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Image Optimization | `lee_sinclair.jpg` | **Low** | Portrait is 33.9 KB (750x677 px). Converting to WebP will further trim payload to < 15 KB. | Implement WebP conversion for featured portrait assets. |
| 2 | Total Image Payload | Page-Wide Media Payload | **Medium** | Combined image payload is **1.96 MB** across 7 assets. | Implement WebP conversion and responsive `srcset` delivery across featured and header assets. |
| 3 | Cumulative Layout Shift (CLS) | Feature / Menu Images | **Medium** | 4 of 7 global images lack explicit HTML `width` and `height` attributes. | Add explicit dimensions to global header/feature cards. |
| 4 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 5 | Runtime Scripts | Theme and Analytics Scripts | **Low** | Scripts execute cleanly with zero console exceptions. | High runtime stability. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed network requests.
- [x] **Profile Headshot Weight:** 33.9 KB (very compact dimension).
- [ ] **Image Dimensions & CLS:** 4 global images missing explicit dimensions in HTML.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.
- [x] **Analytics Loading:** Google Tag Manager loads asynchronously.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css` in `functions.php`.

### 🟡 Medium Priority / Improvements
1. **Add Dimensions to Header Assets:** Ensure all global navigation and card images output explicit `width` and `height`.
2. **WebP Delivery:** Serve modern `.webp` variants for featured team portrait uploads.

### 🟢 Low Priority / Polish & Recommendations
1. **Apply Image Fetch Priority:** Set `fetchpriority="high"` on the featured profile headshot.
