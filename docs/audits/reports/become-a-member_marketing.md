# Audit Report: Become a Member — Marketing & Conversion

**Page URL:** `https://indigenoustourismmanitoba.ca/become-a-member/`  
**Audit Concern:** `marketing`  
**Date Audited:** `2026-08-30`  
**Conversion Readiness:** `Good (High-Intent Application Form; Friction & Proof Gaps)`  

---

## 1. Executive Summary
The Become a Member page serves as ITM's primary B2B operator conversion hub. It successfully pairs an upstream research button ("Discover Member Benefits") with a full digital application form. Key marketing opportunities include reducing form completion friction (which currently spans 90+ field elements on a single page), integrating member operator testimonials for social proof, and declaring organic search `<meta name="description">` and social Open Graph tags.

---

## 2. Detailed Findings

| # | Focus Area | Current State | Identified Gap / Opportunity | Recommended Solution |
|---|---|---|---|---|
| 1 | Form Completion Friction | 90+ form fields on a single page | High cognitive load and abandonment risk for busy business owners. | Convert Gravity Forms to a multi-page step wizard (Step 1: Contact, Step 2: Category, Step 3: Criteria & Signature) with a progress bar. |
| 2 | Social Proof & Operator Quotes | Zero member testimonials | Missing credibility proof demonstrating how ITM membership helped existing operators grow bookings. | Embed 2–3 short operator quotes with headshots (e.g. from Feast Cafe Bistro or Borealis Beading) along the sidebar. |
| 3 | SEO & Search Snippet | `<meta name="description">` missing | Search engines produce empty or unstructured SERP snippets. | Add a targeted meta description (e.g. "Join Indigenous Tourism Manitoba to access marketing promotion, business development grants, training programs, and network opportunities."). |
| 4 | Social Share Previews | Open Graph / Twitter cards missing | Social sharing produces generic link cards without branded imagery. | Implement standard `og:title`, `og:description`, and `og:image`. |

---

## 3. Checklist Verification

- [x] **Primary Conversion Goal:** Full digital membership registration form with online submission.
- [x] **Upstream Research CTA:** Direct link to `/member-benefits/` provided.
- [ ] **Search Engine Metadata:** Meta description is missing.
- [ ] **Social Media Meta Tags:** Open Graph tags are missing.
- [ ] **Social Proof / Case Studies:** No operator testimonials or membership growth stats present.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Implement Meta Description & OG Tags:** Add targeted 155-character description and Open Graph tags to `<head>`.
2. **Convert Form to Multi-Step Wizard:** Enable Gravity Forms pagination/steps to decrease perceived form friction.

### 🟡 Medium Priority / Improvements
1. **Add Member Testimonials:** Feature 2 authentic member quotes highlighting tangible promotional benefits.
2. **Pre-Application Eligibility Widget:** Add a 3-question interactive modal ("Which membership tier is right for you?").

### 🟢 Low Priority / Polish & Recommendations
1. **Application Confirmation Email:** Ensure custom branded auto-responder email is configured with onboarding next steps.
