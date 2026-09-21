# Audit Report: East Region Archive — Marketing & Conversion

**Page URL:** `https://indigenoustourismmanitoba.ca/operator-region/east/`  
**Audit Concern:** `marketing`  
**Date Audited:** `2026-08-31`  
**Conversion Readiness:** `Moderate (High-Appeal Cultural Wilderness Hub; Missing Region Filter Switcher, Category Badges, & SEO Meta)`  

---

## 1. Executive Summary
The East region operator taxonomy archive showcases unique nature-based and cultural learning experiences in Eastern Manitoba (Whiteshell Petroforms Authentic Indigenous Tours, Borealis Beading, and Moon Gate Guest House). While listing cards link directly to individual operator profiles, the directory lacks horizontal region switcher pills, category and activity micro-badges (guided spiritual tour vs. workshop vs. wellness lodging), and essential search engine meta descriptions and Open Graph social sharing tags.

---

## 2. Detailed Findings

| # | Focus Area | Current State | Identified Gap / Opportunity | Recommended Solution |
|---|---|---|---|---|
| 1 | Regional Cross-Navigation | Static 3-card grid | Travelers cannot easily switch between regions (e.g., jump from East to Central or North). | Implement horizontal region filter switcher pills above the card grid. |
| 2 | Card Micro-Copy & Category Badges | Image and business title only | Cards do not distinguish between guided tours, hands-on craft workshops, and eco-lodging. | Render category micro-badges beneath titles (e.g. *"Guided Sacred Tour"*, *"Métis Beadwork Workshop"*, *"Eco-Retreat & Lodging"*). |
| 3 | Regional Experience Map CTA | Absent on archive | Travelers planning road trips through Whiteshell and Eastern Manitoba lack a quick route to the interactive map. | Add a banner CTA linking to `/experience-map/?region=east` with mapped pins for all 3 operators. |
| 4 | SEO & Search Snippet | `<meta name="description">` missing | Search engines lack a rich description for Indigenous tourism in Eastern Manitoba and Whiteshell Provincial Park. | Add a targeted meta description (e.g. "Explore Indigenous tourism in Eastern Manitoba. Experience sacred Whiteshell petroform tours, authentic Métis beadwork workshops, and riverfront eco-retreats."). |
| 5 | Social Share Previews | Open Graph / Twitter cards missing | Shared links render generic social cards without region imagery. | Implement standard `og:title`, `og:description`, and `og:image` tags. |

---

## 3. Checklist Verification

- [x] **Value Proposition:** Direct showcase of 3 authentic Indigenous experiences in Eastern Manitoba.
- [x] **Card Clickability:** All 3 operator cards route directly to detailed operator profiles.
- [ ] **Region Cross-Navigation:** Lacks filter tabs or region switcher pills.
- [ ] **Experience Map Linkage:** No direct link to view East region operators on the interactive map.
- [ ] **Search Engine Metadata:** Meta description is missing.
- [ ] **Social Media Meta Tags:** Open Graph tags are missing.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Implement Meta Description & OG Tags:** Add targeted 155-character description and Eastern Manitoba showcase Open Graph image to `<head>`.

### 🟡 Medium Priority / Improvements
1. **Add Region Filter Navigation:** Deploy horizontal region pills (Central, East, North, West) above the archive grid for easy switching.
2. **Add Category Micro-Labels:** Render category tags (Guided Tours, Workshops, Eco-Retreat) on each operator card.

### 🟢 Low Priority / Polish & Recommendations
1. **Add East Map CTA Banner:** Embed a quick link button to explore East region locations on `/experience-map/`.
