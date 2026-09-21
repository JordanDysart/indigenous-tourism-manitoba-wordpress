# Audit Report: Our Operators — Marketing & Conversion

**Page URL:** `https://indigenoustourismmanitoba.ca/operators/`  
**Audit Concern:** `marketing`  
**Date Audited:** `2026-08-29`  
**Conversion Readiness:** `Moderate`  

---

## 1. Executive Summary
The Our Operators page serves as the core commercial directory of Indigenous Tourism Manitoba, connecting visitors to 22 authentic businesses. Conversion into individual operator profiles is straightforward via visual image cards. However, the page lacks an introductory value proposition and headline (`<h1>`), offers no closing call-to-action for operators wishing to list their businesses, and misses essential organic search `<meta name="description">` and social Open Graph tags.

---

## 2. Detailed Findings

| # | Focus Area | Current State | Identified Gap / Opportunity | Recommended Solution |
|---|---|---|---|---|
| 1 | Introductory Value Prop | Directory starts immediately at card grid | No intro headline or paragraph orienting travelers on how to explore and book authentic experiences. | Add an opening hero header: `<h1>Explore Authentic Indigenous Experiences</h1>` with a 2-sentence intro and category filter pills. |
| 2 | SEO & Search Snippet | `<meta name="description">` missing | Search engines generate arbitrary directory snippet fragments. | Add a targeted meta description (e.g. "Browse authentic Indigenous tourism operators across Manitoba—from cultural tours and culinary dining to outdoor adventures and artisan boutiques."). |
| 3 | Operator Acquisition CTA | No bottom conversion block | Indigenous business owners browsing the directory have no direct prompt to join the network. | Add a closing banner after pagination: "Are You an Indigenous Tourism Operator? [Become an ITM Member](/become-a-member/)". |
| 4 | Social Share Previews | Open Graph / Twitter cards missing | Shared links lack rich cards and featured image previews. | Implement `og:title`, `og:description`, and `og:image`. |
| 5 | Filter Usability | Search & Reset buttons present | Text search alone requires user typing; category browsing is friction-heavy. | Add quick-filter chips for top sectors (Accommodations, Culinary, Outdoor, Art & Culture). |

---

## 3. Checklist Verification

- [x] **Core Directory Purpose:** Clear focus on showcasing authentic Indigenous tourism businesses.
- [ ] **Search Engine Metadata:** Meta description is missing.
- [ ] **Social Media Meta Tags:** Open Graph tags are missing.
- [x] **Card Click-Throughs:** All operator cards provide clear navigation to detailed profiles.
- [ ] **Dual-Audience Conversion:** Lacks an operator acquisition CTA for prospective members.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Implement Meta Description & OG Tags:** Add targeted 155-character description to `<head>`.
2. **Add "List Your Business" Bottom CTA:** Insert a member recruitment banner after pagination linking to `/become-a-member/`.

### 🟡 Medium Priority / Improvements
1. **Add Directory Header & Intro:** Add an explicit `<h1>` with brief intro copy.
2. **Category Filter Chips:** Implement visual category filter buttons at the top of the grid.

### 🟢 Low Priority / Polish & Recommendations
1. **Map View Toggle:** Add a "View on Map" toggle button linking directly to `/experience-map/`.
