# Audit Report: West Region Archive — Marketing & Conversion

**Page URL:** `https://indigenoustourismmanitoba.ca/operator-region/west/`  
**Audit Concern:** `marketing`  
**Date Audited:** `2026-08-31`  
**Conversion Readiness:** `Moderate (High Distinctiveness Across Glamping & Museum Offerings; Missing Region Switcher, Category Badges, & SEO Meta)`  

---

## 1. Executive Summary
The West region operator taxonomy archive showcases two distinct Indigenous tourism destinations in Western Manitoba: Turtle Village (nature glamping in Riding Mountain / Grandview) and the National Indigenous Residential School Museum of Canada (historic commemorative museum in Long Plain). Both cards route directly to active operator profiles. However, the archive lacks horizontal region switcher navigation, activity micro-badges (*"Eco-Glamping Pods"* vs *"Commemorative Heritage Museum"*), an interactive map embed/link, and essential SEO meta descriptions and Open Graph social sharing tags.

---

## 2. Detailed Findings

| # | Focus Area | Current State | Identified Gap / Opportunity | Recommended Solution |
|---|---|---|---|---|
| 1 | Regional Cross-Navigation | Static 2-card grid | Travelers viewing West cannot easily browse adjacent regions (Central, East, North, South). | Implement horizontal region filter switcher pills above the card grid. |
| 2 | Card Micro-Copy & Category Badges | Image and business title only | Cards do not distinguish between eco-accommodations and commemorative educational museums. | Render category micro-badges beneath titles (e.g. *"Eco-Glamping Pods"*, *"Historic Commemorative Museum"*). |
| 3 | Regional Experience Map CTA | Absent on archive | Travelers planning road trips through Western Manitoba lack quick access to mapped routes. | Add a banner CTA linking to `/experience-map/?region=west` with pinned locations for both operators. |
| 4 | SEO & Search Snippet | `<meta name="description">` missing | Search engines lack a rich description for Indigenous eco-tourism, glamping, and commemorative museums in Western Manitoba. | Add a targeted meta description (e.g. "Explore Indigenous tourism in Western Manitoba. Book luxury glamping pods at Turtle Village in Riding Mountain and visit the National Indigenous Residential School Museum in Long Plain."). |
| 5 | Social Share Previews | Open Graph / Twitter cards missing | Shared links render generic social cards without photography. | Implement standard `og:title`, `og:description`, and `og:image` tags. |

---

## 3. Checklist Verification

- [x] **Value Proposition:** Direct showcase of authentic Indigenous accommodations and commemorative heritage in Western Manitoba.
- [x] **Card Clickability:** Turtle Village and NIRSM cards route directly to detailed operator profiles.
- [ ] **Region Cross-Navigation:** Lacks filter tabs or region switcher pills.
- [ ] **Experience Map Linkage:** No direct link to view West region operators on the interactive map.
- [ ] **Search Engine Metadata:** Meta description is missing.
- [ ] **Social Media Meta Tags:** Open Graph tags are missing.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Implement Meta Description & OG Tags:** Add targeted 155-character description and Western Manitoba showcase Open Graph image to `<head>`.

### 🟡 Medium Priority / Improvements
1. **Add Region Filter Navigation:** Deploy horizontal region pills (Central, East, North, South, West) above the archive grid for easy switching.
2. **Add Category Micro-Labels:** Render category tags (Glamping Accommodations, Attractions, Commemorative Heritage) on operator cards.

### 🟢 Low Priority / Polish & Recommendations
1. **Add West Map CTA Banner:** Embed a quick link button to explore Western Manitoba road trips on `/experience-map/`.
