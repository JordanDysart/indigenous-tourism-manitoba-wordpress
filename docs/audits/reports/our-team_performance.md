# Audit Report: Our Team — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/our-team/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-29`  
**Runtime Health:** `Good (Fast Asset Delivery; CLS Dimensions Needed)`  

---

## 1. Executive Summary
The Our Team page exhibits exceptional media optimization for its core content: all 11 team member headshots are lightweight, compressed thumbnails ranging between 5.9 KB and 49.9 KB (totaling under 220 KB combined). JavaScript executes without errors. The primary performance opportunity is adding explicit `width` and `height` attributes to the circular headshot `<img>` tags to eliminate layout shift risks (CLS), along with removing the duplicate Bootstrap Icons CDN stylesheet.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Cumulative Layout Shift (CLS) | Team member headshots (`.img-circular.team-photo`) | **Medium** | **15 of 17 images** on the page lack explicit HTML `width` and `height` attributes. | Add `width="300" height="300"` or matching aspect ratio attributes to circular headshot markup in `page-our-team.php` / block template. |
| 2 | Duplicate Stylesheet | Bootstrap Icons (`areoi-bootstrap-icons-css` & `bootstrap-icons-css`) | **Medium** | Bootstrap Icons v1.11.3 is loaded twice (plugin assets + jsdelivr CDN). | Deregister redundant CDN stylesheet enqueue. |
| 3 | Hero Asset Optimization | Top feature card imagery (`about-itm.jpg`) | **Low** | Global top feature image is transferred as an 841 KB JPEG. | Convert to WebP format (< 120 KB). |
| 4 | Script Loading Efficiency | Theme JS bundles | **Low** | Scripts load synchronously in page body without `defer`. | Add `defer` attribute via script loader filters. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero JavaScript runtime crashes or failed requests.
- [x] **Thumbnail Compression:** Team member headshots are exceptionally lightweight (< 50 KB each).
- [ ] **Image Dimensions & CLS:** 15 images missing HTML `width` / `height` attributes.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.
- [x] **Asynchronous Analytics:** Google Tag Manager loads asynchronously.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Add Dimensions to Circular Headshots:** Update the team grid template to output explicit `width` and `height` attributes on each circular portrait image to lock layout geometry.

### 🟡 Medium Priority / Improvements
1. **Deduplicate Font Icons:** Remove redundant CDN enqueue of `bootstrap-icons.min.css`.

### 🟢 Low Priority / Polish & Recommendations
1. **Lazy Loading:** Ensure all headshot images located below the fold use `loading="lazy"`.
