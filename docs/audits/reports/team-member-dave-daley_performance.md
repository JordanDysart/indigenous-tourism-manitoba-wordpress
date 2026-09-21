# Audit Report: Dave Daley Profile — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/team-member/dave-daley/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-31`  
**Runtime Health:** `Excellent (1.93 MB Total Image Payload; 8.2 KB Headshot Portrait; Clean Console)`  

---

## 1. Executive Summary
The single team member profile for Dave Daley demonstrates top-tier runtime health with zero JavaScript console errors or runtime exceptions. His featured portrait (`david-daley-652x652@2x-320x320-1.jpg`) is exceptionally well-sized and compressed at only 8.2 KB (320x320 px), contributing to a total page payload of 1.93 MB. Performance optimizations focus on eliminating duplicate font stylesheets and providing explicit HTML dimensions for global navigation cards.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Image Optimization | `david-daley-652x652@2x-320x320-1.jpg` | **Pass** | Portrait is extremely lightweight (8.2 KB at 320x320 px). | Exemplary image sizing. |
| 2 | Total Image Payload | Page-Wide Media Payload | **Medium** | Combined image payload is **1.93 MB** across 7 assets. | Implement WebP conversion and responsive `srcset` delivery across featured and header assets. |
| 3 | Cumulative Layout Shift (CLS) | Feature / Menu Images | **Medium** | 4 of 7 global images lack explicit HTML `width` and `height` attributes. | Add explicit dimensions to global header/feature cards. |
| 4 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 5 | Runtime Scripts | Theme and Analytics Scripts | **Low** | Scripts execute cleanly with zero console exceptions. | High runtime stability. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed network requests.
- [x] **Profile Headshot Weight:** 8.2 KB (superbly optimized).
- [ ] **Image Dimensions & CLS:** 4 global images missing explicit dimensions in HTML.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.
- [x] **Analytics Loading:** Google Tag Manager loads asynchronously.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css` in `functions.php`.

### 🟡 Medium Priority / Improvements
1. **Add Dimensions to Header Assets:** Ensure all global navigation and card images output explicit `width` and `height`.

### 🟢 Low Priority / Polish & Recommendations
1. **Apply Image Fetch Priority:** Set `fetchpriority="high"` on the featured profile headshot to maximize LCP score.
