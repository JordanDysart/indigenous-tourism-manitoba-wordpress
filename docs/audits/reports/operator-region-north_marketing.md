# Audit Report: North Region Archive — Marketing & Conversion

**Page URL:** `https://indigenoustourismmanitoba.ca/operator-region/north/`  
**Audit Concern:** `marketing`  
**Date Audited:** `2026-08-31`  
**Conversion Readiness:** `Moderate (High-Appeal Sub-Arctic Hub; Missing Region Switcher, Category Badges, & SEO Meta)`  

---

## 1. Executive Summary
The North region operator taxonomy archive showcases world-class bucket-list experiences in Northern Manitoba and Churchill (Kikiwak Inn, Wapusk Adventures, and Sub-Arctic Tours). While listing cards link directly to individual operator profiles, the directory lacks horizontal region switcher pills, category and activity micro-badges (Cree hospitality hotel vs. dog mushing / aurora tours vs. polar bear / beluga expeditions), and essential search engine meta descriptions and Open Graph social sharing tags.

---

## 2. Detailed Findings

| # | Focus Area | Current State | Identified Gap / Opportunity | Recommended Solution |
|---|---|---|---|---|
| 1 | Regional Cross-Navigation | Static 3-card grid | Travelers cannot easily switch between regions (e.g., jump from North to Central or West). | Implement horizontal region filter switcher pills above the card grid. |
| 2 | Card Micro-Copy & Category Badges | Image and business title only | Cards do not distinguish between sub-Arctic safari tours, champion dog mushing, and First Nations hospitality lodging. | Render category micro-badges beneath titles (e.g. *"First Nations Hotel"*, *"Dogsledding & Northern Lights"*, *"Sub-Arctic & Polar Bear Tours"*). |
| 3 | Regional Experience Map CTA | Absent on archive | Travelers planning expeditions to Churchill and The Pas lack a quick route to the interactive map. | Add a banner CTA linking to `/experience-map/?region=north` with mapped pins for all 3 northern operators. |
| 4 | SEO & Search Snippet | `<meta name="description">` missing | Search engines lack a rich description for bucket-list Indigenous tourism in Northern Manitoba and Churchill. | Add a targeted meta description (e.g. "Discover sub-Arctic Indigenous tourism in Northern Manitoba. Experience champion dogsledding in Churchill, polar bear and beluga tours, and Cree hospitality at Kikiwak Inn."). |
| 5 | Social Share Previews | Open Graph / Twitter cards missing | Shared links render generic social cards without sub-Arctic photography. | Implement standard `og:title`, `og:description`, and `og:image` tags. |

---

## 3. Checklist Verification

- [x] **Value Proposition:** Direct showcase of 3 iconic sub-Arctic and northern Indigenous operators.
- [x] **Card Clickability:** All 3 operator cards route directly to detailed operator profiles.
- [ ] **Region Cross-Navigation:** Lacks filter tabs or region switcher pills.
- [ ] **Experience Map Linkage:** No direct link to view North region operators on the interactive map.
- [ ] **Search Engine Metadata:** Meta description is missing.
- [ ] **Social Media Meta Tags:** Open Graph tags are missing.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Implement Meta Description & OG Tags:** Add targeted 155-character description and Northern Manitoba / Churchill showcase Open Graph image to `<head>`.

### 🟡 Medium Priority / Improvements
1. **Add Region Filter Navigation:** Deploy horizontal region pills (Central, East, North, West) above the archive grid for easy switching.
2. **Add Category Micro-Labels:** Render category tags (Lodging, Dogsledding, Wildlife Tours) on each operator card.

### 🟢 Low Priority / Polish & Recommendations
1. **Add North Map CTA Banner:** Embed a quick link button to explore Northern Manitoba and Churchill locations on `/experience-map/`.
