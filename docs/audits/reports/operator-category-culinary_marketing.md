# Audit Report: Culinary Category Archive — Marketing & Conversion

**Page URL:** `https://indigenoustourismmanitoba.ca/operator-category/culinary/`  
**Audit Concern:** `marketing`  
**Date Audited:** `2026-08-30`  
**Conversion Readiness:** `Moderate (Robust 6-Operator Listing; Lacks Filtering, Map Integration, & SEO Metadata)`  

---

## 1. Executive Summary
The Culinary operator category archive serves as a central discovery hub for authentic Indigenous dining, craft beverage, and food tourism businesses across Manitoba. To improve user conversion, dining reservations, and cross-category discovery, the archive requires category filter navigation pills, food style/location badges on cards, a promotional CTA for the interactive Experience Map, and full search engine/social meta tags.

---

## 2. Detailed Findings

| # | Focus Area | Current State | Identified Gap / Opportunity | Recommended Solution |
|---|---|---|---|---|
| 1 | Category Navigation & Discovery | Static 6-card grid | Food enthusiasts browsing culinary stops cannot easily switch between categories or filter by neighborhood/region. | Add horizontal category switcher pills (Culinary, Accommodation, Attractions, Outdoors, Events) and location filters. |
| 2 | Card Micro-Copy & Badging | Image and business title only | Cards lack immediate context regarding dining style, specialties, and neighborhood. | Render micro-badges beneath titles (e.g. *"Modern Indigenous Bistro • Winnipeg"*, *"Artisan Charcuterie • Winnipeg"*, *"Berry Farm • Glenlea"*, *"Craft Brewery • Winnipeg"*). |
| 3 | Experience Map Integration | Absent on category page | Visual travelers prefer discovering dining stops plotted along their travel route. | Add a banner CTA: *"Explore Indigenous Dining on the Interactive Experience Map"* linking to `/experience-map/?category=culinary`. |
| 4 | SEO & Search Snippet | `<meta name="description">` missing | Search engines lack a rich summary for Manitoba Indigenous dining and cuisine. | Add a targeted meta description (e.g. "Experience authentic Indigenous dining, bistros, artisan charcuterie, and craft breweries in Manitoba. Plan your culinary journey today."). |
| 5 | Social Share Previews | Open Graph / Twitter cards missing | Shared links render generic social preview cards without category imagery. | Implement standard `og:title`, `og:description`, and `og:image` tags. |

---

## 3. Checklist Verification

- [x] **Value Proposition:** Direct showcase of authentic Indigenous food & drink in Manitoba.
- [x] **Card Clickability:** All 6 cards route directly to detailed operator profiles.
- [ ] **Category Cross-Navigation:** Lacks filter tabs or category switcher pills.
- [ ] **Experience Map Linkage:** No direct link to view listings on the interactive map.
- [ ] **Search Engine Metadata:** Meta description is missing.
- [ ] **Social Media Meta Tags:** Open Graph tags are missing.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Implement Meta Description & OG Tags:** Add targeted 155-character description and culinary category Open Graph image to `<head>`.

### 🟡 Medium Priority / Improvements
1. **Add Category Filter Navigation:** Deploy horizontal category pills above the archive grid for easy switching.
2. **Add Food Style & Location Micro-Labels:** Render operator location and cuisine type tags on cards.

### 🟢 Low Priority / Polish & Recommendations
1. **Add Map CTA Banner:** Embed a quick link button to explore culinary stops on `/experience-map/`.
