# Audit Report: Accommodation Category Archive — Marketing & Conversion

**Page URL:** `https://indigenoustourismmanitoba.ca/operator-category/accommodation/`  
**Audit Concern:** `marketing`  
**Date Audited:** `2026-08-30`  
**Conversion Readiness:** `Moderate (Clean 4-Operator Listing; Lacks Filtering, Experience Map Link, & Metadata)`  

---

## 1. Executive Summary
The Accommodation category directory connects travelers with authentic Indigenous places to stay in Manitoba. To maximize booking conversion and user engagement, the archive should introduce subcategory/regional filter pills, display quick amenity badges on listing cards, integrate a link to the interactive Experience Map, and deploy targeted SEO meta descriptions.

---

## 2. Detailed Findings

| # | Focus Area | Current State | Identified Gap / Opportunity | Recommended Solution |
|---|---|---|---|---|
| 1 | Category Discovery & Navigation | Static 4-card grid | Travelers browsing lodging options cannot easily filter by region or switch to other categories. | Add category navigation pills (Accommodation, Culinary, Outdoors, Attractions, etc.) and regional filter chips. |
| 2 | Card Micro-Copy & Badging | Image and business title only | Cards lack quick context on accommodation style, setting, and location. | Display metadata snippets beneath titles (e.g. *"Urban Hotel • Winnipeg"*, *"Lakeside Geodesic Domes • Grand Beach"*, *"Riverside Retreat • Whitemouth"*). |
| 3 | Experience Map Integration | Absent on category page | Visual travelers prefer seeing lodging options plotted geographically on a map. | Add a banner CTA: *"View Accommodation on the Interactive Experience Map"* linking to `/experience-map/?category=accommodation`. |
| 4 | SEO & Search Snippet | `<meta name="description">` missing | Search engines lack a rich summary for Manitoba Indigenous lodging. | Add a targeted meta description (e.g. "Explore authentic Indigenous accommodations in Manitoba. Stay in luxury urban hotels, lakeside geodesic domes, eco-retreats, and northern lodges."). |
| 5 | Social Share Previews | Open Graph / Twitter cards missing | Shared links render generic social preview cards without category imagery. | Implement standard `og:title`, `og:description`, and `og:image`. |

---

## 3. Checklist Verification

- [x] **Value Proposition:** Direct showcase of authentic Indigenous places to stay in Manitoba.
- [x] **Card Clickability:** All cards route directly to detailed operator profiles.
- [ ] **Category Cross-Navigation:** Lacks filter tabs or category switcher pills.
- [ ] **Experience Map Linkage:** No direct link to view listings on the interactive map.
- [ ] **Search Engine Metadata:** Meta description is missing.
- [ ] **Social Media Meta Tags:** Open Graph tags are missing.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Implement Meta Description & OG Tags:** Add targeted 155-character description and accommodation category Open Graph image to `<head>`.

### 🟡 Medium Priority / Improvements
1. **Add Category Filter Navigation:** Deploy horizontal category pills above the archive grid for easy category switching.
2. **Add Region & Style Micro-Labels:** Render operator location and accommodation type tags on cards.

### 🟢 Low Priority / Polish & Recommendations
1. **Add Map CTA Banner:** Embed a quick link button to explore accommodations on `/experience-map/`.
