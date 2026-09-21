# Audit Report: Events Category Archive — Marketing & Conversion

**Page URL:** `https://indigenoustourismmanitoba.ca/operator-category/events/`  
**Audit Concern:** `marketing`  
**Date Audited:** `2026-08-30`  
**Conversion Readiness:** `Moderate (Accurate Operator Feature; Lacks Category Switcher, Events Hub Bridge, & SEO Metadata)`  

---

## 1. Executive Summary
The Events operator category archive showcases Indigenous festivals and cultural event organizers in Manitoba (featuring Manito Ahbee Festival). To maximize visitor engagement, ticket conversions, and cross-category discovery, the archive requires category filter navigation pills, festival timing badges, a direct promotional bridge to the full ITM Events Calendar (`/events/`), and search engine/social share metadata.

---

## 2. Detailed Findings

| # | Focus Area | Current State | Identified Gap / Opportunity | Recommended Solution |
|---|---|---|---|---|
| 1 | Category Navigation & Discovery | Static single-card grid | Cultural tourists cannot easily switch between categories or explore related cultural experiences. | Add horizontal category switcher pills (Events, Attractions, Accommodation, Culinary, Outdoors) above the archive. |
| 2 | Calendar Cross-Promotion | Absent on category archive | Visitors looking for current festival dates need an immediate pathway to live event listings. | Add a prominent banner CTA: *"Looking for upcoming dates? Explore our full [ITM Events Calendar](/events/)."* |
| 3 | Card Micro-Copy & Badging | Image and business title only | Cards lack immediate context regarding event format, seasonality, and location. | Render micro-badges beneath titles (e.g. *"Annual Cultural Festival & Pow Wow • May • Winnipeg"*). |
| 4 | SEO & Search Snippet | `<meta name="description">` missing | Search engines lack a rich summary for Manitoba Indigenous festivals and cultural celebrations. | Add a targeted meta description (e.g. "Discover Indigenous festivals, pow wows, and cultural event organizers across Manitoba. Plan your cultural journey with Indigenous Tourism Manitoba."). |
| 5 | Social Share Previews | Open Graph / Twitter cards missing | Shared links render generic social preview cards without category imagery. | Implement standard `og:title`, `og:description`, and `og:image` tags. |

---

## 3. Checklist Verification

- [x] **Value Proposition:** Direct showcase of authentic Indigenous cultural events in Manitoba.
- [x] **Card Clickability:** Manito Ahbee Festival card routes directly to the detailed profile.
- [ ] **Category Cross-Navigation:** Lacks filter tabs or category switcher pills.
- [ ] **Events Calendar Linkage:** No direct link to live event calendar (`/events/`).
- [ ] **Search Engine Metadata:** Meta description is missing.
- [ ] **Social Media Meta Tags:** Open Graph tags are missing.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Implement Meta Description & OG Tags:** Add targeted 155-character description and event category Open Graph image to `<head>`.

### 🟡 Medium Priority / Improvements
1. **Add Events Calendar Cross-Link:** Deploy a banner directing visitors to `/events/` for active festival schedules.
2. **Add Category Filter Navigation:** Deploy horizontal category pills above the archive grid for easy switching.

### 🟢 Low Priority / Polish & Recommendations
1. **Add Event Seasonality Badges:** Render event timing tags (e.g., "Annual Spring Festival") on cards.
