# Audit Report: South Region Archive — Marketing & Conversion

**Page URL:** `https://indigenoustourismmanitoba.ca/operator-region/south/`  
**Audit Concern:** `marketing`  
**Date Audited:** `2026-08-31`  
**Conversion Readiness:** `Moderate (Charming Agri-Tourism Feature; Missing Region Filter Switcher, Category Badges, & SEO Meta)`  

---

## 1. Executive Summary
The South region operator taxonomy archive showcases Prairie Berry, a premier Métis family berry farm, artisanal market, and farm-to-table culinary destination in Glenlea / Red River Valley. While the listing card routes directly to Prairie Berry's profile, the single-item archive page lacks horizontal region switcher navigation, activity micro-badges (*"Métis Farm-to-Table & Agri-Tourism"*), an interactive map embed/link, and essential SEO meta descriptions and Open Graph social sharing tags.

---

## 2. Detailed Findings

| # | Focus Area | Current State | Identified Gap / Opportunity | Recommended Solution |
|---|---|---|---|---|
| 1 | Regional Cross-Navigation | Static 1-card grid | Travelers viewing South cannot easily browse adjacent regions (Central, East, West, North). | Implement horizontal region filter switcher pills above the card grid. |
| 2 | Card Micro-Copy & Category Badges | Image and business title only | The card does not highlight farm-to-table dining, U-pick berries, or seasonal workshops. | Render category micro-badges beneath titles (e.g. *"Métis Agri-Tourism & Farm-to-Table Dining"*). |
| 3 | Regional Experience Map CTA | Absent on archive | Travelers planning culinary day trips south of Winnipeg lack quick access to map directions. | Add a banner CTA linking to `/experience-map/?region=south` with Prairie Berry's mapped location. |
| 4 | SEO & Search Snippet | `<meta name="description">` missing | Search engines lack a rich description for Indigenous agri-tourism and culinary experiences in Southern Manitoba. | Add a targeted meta description (e.g. "Discover Indigenous agri-tourism in Southern Manitoba. Visit Prairie Berry in Glenlea for fresh berry picking, farm-to-table dining, and Métis cultural events."). |
| 5 | Social Share Previews | Open Graph / Twitter cards missing | Shared links render generic social cards without farm imagery. | Implement standard `og:title`, `og:description`, and `og:image` tags. |

---

## 3. Checklist Verification

- [x] **Value Proposition:** Direct showcase of authentic Indigenous agri-tourism in Southern Manitoba.
- [x] **Card Clickability:** Prairie Berry card routes directly to detailed operator profile.
- [ ] **Region Cross-Navigation:** Lacks filter tabs or region switcher pills.
- [ ] **Experience Map Linkage:** No direct link to view South region operators on the interactive map.
- [ ] **Search Engine Metadata:** Meta description is missing.
- [ ] **Social Media Meta Tags:** Open Graph tags are missing.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Implement Meta Description & OG Tags:** Add targeted 155-character description and Prairie Berry farm showcase Open Graph image to `<head>`.

### 🟡 Medium Priority / Improvements
1. **Add Region Filter Navigation:** Deploy horizontal region pills (Central, East, North, South, West) above the archive grid for easy switching.
2. **Add Category Micro-Labels:** Render category tags (Agri-Tourism, Culinary, Farm Dining) on the operator card.

### 🟢 Low Priority / Polish & Recommendations
1. **Add South Map CTA Banner:** Embed a quick link button to explore Southern Manitoba farm locations on `/experience-map/`.
