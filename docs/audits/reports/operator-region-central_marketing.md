# Audit Report: Central Region Archive — Marketing & Conversion

**Page URL:** `https://indigenoustourismmanitoba.ca/operator-region/central/`  
**Audit Concern:** `marketing`  
**Date Audited:** `2026-08-31`  
**Conversion Readiness:** `Moderate (Robust 13-Operator Hub; Missing Region Filter Switcher, Category Badges, & SEO Meta)`  

---

## 1. Executive Summary
The Central region operator taxonomy archive represents the core urban and cultural hub of Indigenous Tourism Manitoba, featuring 13 operators spanning boutique accommodations (Wyndham Garden Winnipeg Airport), authentic Indigenous dining (Feast Cafe Bistro, Bistro on Notre Dame, Shelly's Bistro, Sharecuterie, Nonsuch Brewing), fashion & art retail (Anne Mulaire, Teekca's Boutique, Spence Custom Carving), cultural centers (MICEC, Agowiidiwinan Centre), outdoor excursions (Nature's Edge Tourism), and major annual gatherings (Manito Ahbee Festival). While listing cards link directly to individual operator profiles, the directory lacks horizontal region switcher pills, category micro-badges, and essential search engine meta descriptions and Open Graph social sharing tags.

---

## 2. Detailed Findings

| # | Focus Area | Current State | Identified Gap / Opportunity | Recommended Solution |
|---|---|---|---|---|
| 1 | Regional Cross-Navigation | Static 13-card grid | Travelers cannot easily switch between regions (e.g., jump from Central to North or West). | Implement horizontal region filter switcher pills above the card grid. |
| 2 | Card Micro-Copy & Category Badges | Image and business title only | Cards do not distinguish between dining, retail, hotel, outdoor tour, or cultural center. | Render category micro-badges beneath titles (e.g. *"Culinary"*, *"Hotel & Accommodations"*, *"Retail & Gifts"*, *"Cultural Festival"*). |
| 3 | Regional Experience Map CTA | Absent on archive | Travelers planning Winnipeg itineraries lack a quick route to the interactive map. | Add a banner CTA linking to `/experience-map/?region=central` with mapped pins for all 13 operators. |
| 4 | SEO & Search Snippet | `<meta name="description">` missing | Search engines lack a rich description for Indigenous tourism experiences in Winnipeg and Central Manitoba. | Add a targeted meta description (e.g. "Discover 13+ Indigenous-owned businesses in Winnipeg and Central Manitoba. Explore authentic dining, boutique shopping, First Nations cultural centres, and urban hotels."). |
| 5 | Social Share Previews | Open Graph / Twitter cards missing | Shared links render generic social cards without region imagery. | Implement standard `og:title`, `og:description`, and `og:image` tags. |

---

## 3. Checklist Verification

- [x] **Value Proposition:** Direct showcase of 13 authentic Indigenous experiences in Winnipeg & Central Manitoba.
- [x] **Card Clickability:** All 13 operator cards route directly to detailed operator profiles.
- [ ] **Region Cross-Navigation:** Lacks filter tabs or region switcher pills.
- [ ] **Experience Map Linkage:** No direct link to view Central region operators on the interactive map.
- [ ] **Search Engine Metadata:** Meta description is missing.
- [ ] **Social Media Meta Tags:** Open Graph tags are missing.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Implement Meta Description & OG Tags:** Add targeted 155-character description and Winnipeg/Central showcase Open Graph image to `<head>`.

### 🟡 Medium Priority / Improvements
1. **Add Region Filter Navigation:** Deploy horizontal region pills (Central, East, North, West) above the archive grid for easy switching.
2. **Add Category Micro-Labels:** Render category tags (Dining, Lodging, Retail, Tours) on each operator card.

### 🟢 Low Priority / Polish & Recommendations
1. **Add Central Map CTA Banner:** Embed a quick link button to explore Central region locations on `/experience-map/`.
