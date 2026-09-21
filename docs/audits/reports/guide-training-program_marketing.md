# Audit Report: Indigenous Guide Training Program — Marketing & Conversion

**Page URL:** `https://indigenoustourismmanitoba.ca/guide-training-program/`  
**Audit Concern:** `marketing`  
**Date Audited:** `2026-08-30`  
**Conversion Readiness:** `Good (High-Intent Inquiry CTA; Broken Sub-Button & Missing Metadata)`  

---

## 1. Executive Summary
The Indigenous Guide Training Program page provides a compelling educational overview with clear sequential pathways ("Explore Step 1", "Step 2", "Step 3") and a direct primary inquiry CTA ("Inquire Now"). The main marketing improvements are correcting the broken "More Opportunities" button link (which routes to a 404 error page), adding guide graduate social proof, and declaring `<meta name="description">` and social Open Graph tags.

---

## 2. Detailed Findings

| # | Focus Area | Current State | Identified Gap / Opportunity | Recommended Solution |
|---|---|---|---|---|
| 1 | Broken CTA Link | "More Opportunities" button | Points to non-existent `/indigenous-guide-training-program-more-learning-opportunities/` (**HTTP 404**). | Point button to `#additional-learning-opportunities` anchor or update target URL. |
| 2 | Lead Inquiry Funnel | "Inquire Now" button | Primary conversion button routes smoothly to `/itm-indigenous-guide-training-program-inquiry-form/`. | Maintain prominent placement. |
| 3 | Social Proof & Outcomes | Zero graduate testimonials | Prospective guides cannot see career outcomes or operator hiring stories. | Add 2 graduate spotlight quotes with photos detailing their journey into professional guiding. |
| 4 | SEO & Search Snippet | `<meta name="description">` missing | Search engines lack a concise summary of the training certification curriculum. | Add a targeted meta description (e.g. "Become a certified Indigenous tour guide in Manitoba. Discover our 3-step accredited training pathway covering storytelling, safety, and field practicum."). |
| 5 | Social Share Previews | Open Graph / Twitter cards missing | Shared links render generic social preview cards without imagery. | Implement standard `og:title`, `og:description`, and `og:image`. |

---

## 3. Checklist Verification

- [x] **Primary Conversion Goal:** "Inquire Now" button connects directly to active inquiry form.
- [x] **Curriculum Step Navigation:** Step 1, 2, and 3 have dedicated exploration buttons.
- [ ] **Link Integrity on CTAs:** "More Opportunities" button returns HTTP 404.
- [ ] **Search Engine Metadata:** Meta description is missing.
- [ ] **Social Media Meta Tags:** Open Graph tags are missing.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Broken "More Opportunities" Button:** Change button target from `/indigenous-guide-training-program-more-learning-opportunities/` to `#additional-learning-opportunities`.
2. **Implement Meta Description & OG Tags:** Add targeted 155-character description and Open Graph tags to `<head>`.

### 🟡 Medium Priority / Improvements
1. **Add Graduate Testimonials:** Feature 2 authentic guide graduate quotes highlighting employability and mentorship.
2. **Training Dates Callout:** Add a prominent banner highlighting upcoming cohort start dates.

### 🟢 Low Priority / Polish & Recommendations
1. **Downloadable Course Syllabus:** Add a "Download Course Syllabus PDF" button for community career coordinators.
