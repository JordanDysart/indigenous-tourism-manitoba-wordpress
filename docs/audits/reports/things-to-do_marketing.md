# Audit Report: Things To Do — Marketing & Conversion

**Page URL:** `https://indigenoustourismmanitoba.ca/things-to-do/`  
**Audit Concern:** `marketing`  
**Date Audited:** `2026-08-30`  
**Conversion Readiness:** `Good (Clear Funnel CTAs; Deep Linking Needed)`  

---

## 1. Executive Summary
The Things To Do page functions as an effective trip planning hub with dedicated conversion pathways across three core experience categories (Culture & Heritage, Outdoor & Nature, and Culinary Traditions) plus an interactive map launch button. To maximize traveler conversions, the category CTA buttons should deep-link directly into pre-filtered category archives rather than the generic unfiltered `/operators/` directory, and search engine `<meta name="description">` and social share tags must be added.

---

## 2. Detailed Findings

| # | Focus Area | Current State | Identified Gap / Opportunity | Recommended Solution |
|---|---|---|---|---|
| 1 | Category Funnel Routing | All 3 pillar buttons link to `/operators/` | Travelers clicking "Explore Culinary" or "View Outdoor" land on the full unfiltered 22-operator list. | Deep-link buttons to filtered taxonomy URLs or pass category query parameters (e.g. `/operators/?category=culinary`). |
| 2 | SEO & Search Snippet | `<meta name="description">` missing | Search engines lack a concise summary of tourism activities. | Add an enticing meta description (e.g. "Plan your trip with Indigenous Tourism Manitoba: explore cultural heritage sites, authentic guided outdoor adventures, and culinary traditions."). |
| 3 | Social Share Previews | Open Graph / Twitter cards missing | Social shares lack branded rich preview cards and imagery. | Implement standard `og:title`, `og:description`, and `og:image`. |
| 4 | Seasonal Campaign Block | Static evergreen pillars | No seasonal feature highlights (e.g., Winter Northern Lights & Sledding, Summer Pow Wow Trail). | Introduce a dynamic seasonal showcase widget above the category grid. |

---

## 3. Checklist Verification

- [x] **Clear Value Proposition:** Clear gateway for travelers seeking activities across Manitoba.
- [ ] **Search Engine Metadata:** Meta description is missing.
- [ ] **Social Media Meta Tags:** Open Graph tags are missing.
- [x] **Primary Conversion Actions:** Distinct action buttons present for each experience category and the map.
- [ ] **Friction-Free Deep Linking:** Pillar buttons link to generic `/operators/` instead of filtered views.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Implement Meta Description & OG Tags:** Add targeted 155-character description and Open Graph tags to `<head>`.
2. **Deep-Link Category CTAs:** Route pillar buttons to categorized operator listings rather than the generic archive.

### 🟡 Medium Priority / Improvements
1. **Add Seasonal Campaign Spotlight:** Highlight timely seasonal itineraries (e.g., Fall harvest & cultural tours).

### 🟢 Low Priority / Polish & Recommendations
1. **Interactive Map Embed:** Embed a lightweight preview of the experience map directly on the page above the CTA button.
