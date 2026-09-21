# Audit Report: Edna Nabess Profile — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/team-member/edna-nabess/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-31`  
**Runtime Health:** `Good (1.98 MB Total Image Payload; 56.7 KB Headshot Portrait; Clean Console)`  

---

## 1. Executive Summary
The single team member profile for Edna Nabess exhibits clean runtime execution with zero JavaScript errors or console exceptions. Her featured portrait (`edna.jpg`) is well-optimized at 56.7 KB (1000x960 px), contributing to a total page payload of 1.98 MB. Performance recommendations focus on WebP image generation, font stylesheet deduplication, and adding explicit HTML dimensions to global header/card imagery.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Image Optimization | `edna.jpg` | **Low** | Portrait is 56.7 KB (1000x960 px). Converting to WebP will further trim payload to < 25 KB. | Implement WebP conversion for featured portrait assets. |
| 2 | Total Image Payload | Page-Wide Media Payload | **Medium** | Combined image payload is **1.98 MB** across 7 assets. | Implement WebP conversion and responsive `srcset` delivery across featured and header assets. |
| 3 | Cumulative Layout Shift (CLS) | Feature / Menu Images | **Medium** | 4 of 7 global images lack explicit HTML `width` and `height` attributes. | Add explicit dimensions to global header/feature cards. |
| 4 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 5 | Runtime Scripts | Theme and Analytics Scripts | **Low** | Scripts execute cleanly with zero console exceptions. | High runtime stability. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed network requests.
- [x] **Profile Headshot Weight:** 56.7 KB (compact dimension).
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
