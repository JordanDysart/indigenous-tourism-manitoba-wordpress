# Audit Report: Experience Map — Marketing & Conversion

**Page URL:** `https://indigenoustourismmanitoba.ca/experience-map/`  
**Audit Concern:** `marketing`  
**Date Audited:** `2026-08-30`  
**Conversion Readiness:** `Good (Individual CTAs Active; Regional Filters Needed)`  

---

## 1. Executive Summary
The Experience Map provides an interactive spatial discovery tool for travelers planning itineraries across Manitoba. All 22 operator cards feature dedicated "Find Out More" conversion buttons routing visitors to detailed single profiles. Key marketing improvements include adding regional filter toggles (to help users zoom directly to Churchill, Interlake, or Winnipeg), providing an opening introductory headline (`<h1>`), and declaring `<meta name="description">` and social Open Graph tags.

---

## 2. Detailed Findings

| # | Focus Area | Current State | Identified Gap / Opportunity | Recommended Solution |
|---|---|---|---|---|
| 1 | Regional Map Filtering | Map shows all pins simultaneously | Travelers planning a specific regional trip (e.g. Churchill northern adventure) must manually search and zoom. | Add quick regional filter pills (Northern Manitoba, Interlake, Eastman, Winnipeg Area) that dynamically re-center the map and filter the list below. |
| 2 | Introductory Value Prop | Jumps directly to map canvas | Lacks an opening headline and trip planning orientation. | Add an opening headline: `<h1>Explore Indigenous Experiences Across Manitoba</h1>` with brief instructions. |
| 3 | SEO & Search Snippet | `<meta name="description">` missing | Search engines lack a concise summary of the interactive map tool. | Add an engaging meta description (e.g. "Use the interactive Indigenous Tourism Manitoba Experience Map to discover authentic cultural tours, lodgings, and artisan shops across the province."). |
| 4 | Social Share Previews | Open Graph / Twitter cards missing | Social shares lack branded preview cards and visual map thumbnails. | Implement standard `og:title`, `og:description`, and `og:image`. |

---

## 3. Checklist Verification

- [x] **Core Utility:** Clear spatial representation of Indigenous tourism businesses throughout Manitoba.
- [ ] **Search Engine Metadata:** Meta description is missing.
- [ ] **Social Media Meta Tags:** Open Graph tags are missing.
- [x] **Conversion Callouts:** All 22 cards feature explicit "Find Out More" CTA buttons.
- [ ] **Regional Segmentation:** No regional filter chips to segment operators geographically.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Implement Meta Description & OG Tags:** Add targeted 155-character description and Open Graph tags to `<head>`.
2. **Add Header Headline & Orientation:** Insert an explicit `<h1>` title and 1-sentence prompt above the map.

### 🟡 Medium Priority / Improvements
1. **Implement Regional Filter Chips:** Add filter buttons to sort operators by tourism region (Northern, Central, Interlake, Eastman, Winnipeg).

### 🟢 Low Priority / Polish & Recommendations
1. **Directions / Routing Integration:** Add a "Get Directions" link in Leaflet marker popups opening Google Maps directly.
