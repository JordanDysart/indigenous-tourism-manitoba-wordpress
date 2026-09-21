# Audit Report: Attractions Category Archive — Marketing & Conversion

**Page URL:** `https://indigenoustourismmanitoba.ca/operator-category/attractions/`  
**Audit Concern:** `marketing`  
**Date Audited:** `2026-08-30`  
**Conversion Readiness:** `Moderate (Clean 2-Operator Listing; Lacks Filtering, Map CTA, & SEO Metadata)`  

---

## 1. Executive Summary
The Attractions operator category directory showcases prominent cultural landmarks and adventure attractions across Manitoba. To improve user flow and booking/visitation intent, the archive needs cross-category filter pills, location/type badges on operator cards, a promotional CTA for the interactive Experience Map, and complete search engine/social meta tags.

---

## 2. Detailed Findings

| # | Focus Area | Current State | Identified Gap / Opportunity | Recommended Solution |
|---|---|---|---|---|
| 1 | Category Navigation & Discovery | Static 2-card grid | Visitors looking for broader experiences cannot easily switch between categories or filter by region. | Add horizontal category switcher pills (Attractions, Accommodation, Culinary, Outdoors, Events) and regional filters. |
| 2 | Card Micro-Copy & Badging | Image and business title only | Cards lack immediate context regarding attraction type and geographic location. | Render micro-badges beneath titles (e.g. *"Historic Cultural Museum • Portage la Prairie"*, *"Sub-Arctic Wildlife & Tundra Tours • Churchill"*). |
| 3 | Experience Map Integration | Absent on category page | Visual travelers prefer seeing attractions plotted on the map. | Add a banner CTA: *"Explore Attractions on the Interactive Experience Map"* linking to `/experience-map/?category=attractions`. |
| 4 | SEO & Search Snippet | `<meta name="description">` missing | Search engines display generic excerpt snippets for Manitoba Indigenous attractions. | Add a targeted meta description (e.g. "Discover authentic Indigenous attractions, historic landmarks, and cultural museums in Manitoba."). |
| 5 | Social Share Previews | Open Graph / Twitter cards missing | Social shares lack custom titles, descriptions, and category preview imagery. | Implement standard `og:title`, `og:description`, and `og:image` tags. |

---

## 3. Checklist Verification

- [x] **Value Proposition:** Direct showcase of authentic Indigenous attractions in Manitoba.
- [x] **Card Clickability:** All cards route directly to detailed operator profiles.
- [ ] **Category Cross-Navigation:** Lacks filter tabs or category switcher pills.
- [ ] **Experience Map Linkage:** No direct link to view listings on the interactive map.
- [ ] **Search Engine Metadata:** Meta description is missing.
- [ ] **Social Media Meta Tags:** Open Graph tags are missing.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Implement Meta Description & OG Tags:** Add targeted 155-character description and attractions category Open Graph image to `<head>`.

### 🟡 Medium Priority / Improvements
1. **Add Category Filter Navigation:** Deploy horizontal category pills above the archive grid for easy switching.
2. **Add Region & Style Micro-Labels:** Render operator location and attraction type tags on cards.

### 🟢 Low Priority / Polish & Recommendations
1. **Add Map CTA Banner:** Embed a quick link button to explore attractions on `/experience-map/`.
