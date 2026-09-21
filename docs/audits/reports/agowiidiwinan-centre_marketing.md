# Audit Report: Agowiidiwinan Centre — Marketing & Conversion

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/agowiidiwinan-centre/`  
**Audit Concern:** `marketing`  
**Date Audited:** `2026-08-30`  
**Conversion Readiness:** `Moderate (Compelling Cultural Showcase; Outbound Link & Meta Improvements Needed)`  

---

## 1. Executive Summary
The Agowiidiwinan Centre operator profile page presents a vivid cultural narrative and gallery showcasing Treaty education at The Forks in Winnipeg. Converting interest into physical visits and online bookings can be strengthened by rectifying the broken SSL link on the primary "Visit Website" CTA, adding explicit "Plan Your Visit" guidance, and injecting missing search and social graph metadata.

---

## 2. Detailed Findings

| # | Focus Area | Current State | Identified Gap / Opportunity | Recommended Solution |
|---|---|---|---|---|
| 1 | Outbound Conversion Funnel | "Visit Website" button | Link points to `https://www.trcm.ca`, which triggers an SSL certificate warning and high bounce rates. | Update URL custom field to `https://trcm.ca` for seamless lead handoff. |
| 2 | Direct Booking / Visit CTA | Single "Visit Website" link | Travelers seeking to schedule educational tours or visit hours have no prominent booking CTA. | Add secondary CTA: *"Book an Educational Tour"* or *"Plan Your Visit"*. |
| 3 | Category Discovery | "Tours & Guiding" taxonomy tag | Helps travelers discover similar guided experiences across Manitoba. | High category cross-promotion. |
| 4 | SEO & Search Snippet | `<meta name="description">` missing | Search engines lack a rich description of Treaty exhibits and tours at The Forks. | Add a targeted meta description (e.g. "Discover Treaty history, interactive exhibits, and guided cultural tours at the Agowiidiwinan Centre located in The Forks, Winnipeg."). |
| 5 | Social Share Previews | Open Graph / Twitter cards missing | Shared links render generic social preview cards without imagery. | Implement standard `og:title`, `og:description`, and `og:image`. |

---

## 3. Checklist Verification

- [x] **Compelling Cultural Narrative:** Rich storytelling on Treaty history and Indigenous heritage.
- [x] **Visual Gallery:** Engaging photo assets highlighting exhibits.
- [ ] **Friction-Free CTA:** Outbound website link triggers an SSL warning in browsers.
- [ ] **Search Engine Metadata:** Meta description is missing.
- [ ] **Social Media Meta Tags:** Open Graph tags are missing.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Operator CTA Link:** Update website URL to `https://trcm.ca` in WP Admin to prevent SSL bounce-offs.
2. **Implement Meta Description & OG Tags:** Add targeted 155-character description and Open Graph tags to `<head>`.

### 🟡 Medium Priority / Improvements
1. **Add "Plan Your Visit" Callout Box:** Display admission details, tour group booking requirements, and hours of operation.

### 🟢 Low Priority / Polish & Recommendations
1. **Experience Review Snippets:** Feature visitor quotes or educational tour testimonials.
