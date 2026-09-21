# Audit Report: Guide Training Inquiry Form — Marketing & Conversion

**Page URL:** `https://indigenoustourismmanitoba.ca/itm-indigenous-guide-training-program-inquiry-form/`  
**Audit Concern:** `marketing`  
**Date Audited:** `2026-08-30`  
**Conversion Readiness:** `Needs Improvement (Severe Conversion Friction Due to Missing Form)`  

---

## 1. Executive Summary
The Guide Training Program Inquiry Form serves as the terminal conversion endpoint for the entire 3-step training curriculum. However, because no interactive form exists on the page, candidates are asked to manually email the training team. This creates severe conversion friction, especially for mobile visitors without default mail client configurations. Replacing the mailto button with an embedded web form and declaring `<meta name="description">` tags will dramatically increase lead capture.

---

## 2. Detailed Findings

| # | Focus Area | Current State | Identified Gap / Opportunity | Recommended Solution |
|---|---|---|---|---|
| 1 | Lead Capture Funnel | Mailto action button only | Visitors on mobile or webmail must manually open email clients to compose a message, causing massive bounce rates. | Embed an instant on-page web form (Name, Email, Phone, Community, Step interest). |
| 2 | Value Proposition & Funding | Mentions travel subsidies | Explicitly mentioning funding support for Manitoba First Nations, Métis, and Inuit candidates lowers barrier to entry. | Keep funding notice highlighted in a high-contrast callout box. |
| 3 | SEO & Search Snippet | `<meta name="description">` missing | Search engines lack a concise summary of the application process. | Add a targeted meta description (e.g. "Apply for the Indigenous Guide Training Program in Manitoba. Submit your expression of interest for accredited guiding courses and mentorship."). |
| 4 | Social Share Previews | Open Graph / Twitter cards missing | Shared links render generic social preview cards without imagery. | Implement standard `og:title`, `og:description`, and `og:image`. |

---

## 3. Checklist Verification

- [ ] **On-Page Form Capture:** Missing interactive web form (causes severe drop-off).
- [x] **Community Funding Callout:** Clearly notes financial and travel support options.
- [x] **Navigation Hub Link:** "Back to Training Hub" button present.
- [ ] **Search Engine Metadata:** Meta description is missing.
- [ ] **Social Media Meta Tags:** Open Graph tags are missing.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Deploy Embedded Inquiry Form:** Add a Contact Form 7 / WPForms block directly into the right column to capture leads instantly without external email app dependency.
2. **Implement Meta Description & OG Tags:** Add targeted 155-character description and Open Graph tags to `<head>`.

### 🟡 Medium Priority / Improvements
1. **Applicant Testimonial:** Add a brief quote or photo from a past training cohort graduate next to the inquiry form.

### 🟢 Low Priority / Polish & Recommendations
1. **Response Time Expectation:** Add a note stating "Our team typically replies within 2 business days" below the submit button.
