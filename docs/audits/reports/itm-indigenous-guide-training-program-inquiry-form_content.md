# Audit Report: Guide Training Inquiry Form — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/itm-indigenous-guide-training-program-inquiry-form/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Needs Improvement (Missing Embedded Form; Manual Email Fallback)`  

---

## 1. Executive Summary
The Guide Training Program Inquiry Form page is designed as the primary registration and intake gateway for aspiring guides. However, no interactive form is currently embedded on the page; it instead prompts visitors to manually send an email to the training team. Adding an embedded contact/intake form with structured fields will streamline registrations and prevent email obfuscation errors.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Functional Gap | Main Body Content | **High** | **Page lacks an interactive form.** Titled "Inquiry Form" but only provides a direct mailto action button. | Embed a structured Contact Form 7 or Gravity Form with fields for Name, Community, Contact Info, and Program Step interest. |
| 2 | Broken Fallback Link | Email Button | **Medium** | Cloudflare email obfuscation fallback `<a href="/cdn-cgi/l/email-protection">` returns **HTTP 404** on static/non-JS clients. | Implementing an on-page web form eliminates dependence on obfuscated mailto links. |
| 3 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 4 | Program Pathways Copy | Pathways Overview | **Low** | Clear concise summary of Step 1 (Intro), Step 2 (7-Day), and Step 3 (Practicum). | Excellent summary content. |
| 5 | Media Asset Integrity | Visual Elements | **Low** | All 6 images return HTTP 200 OK with zero broken paths or staging leaks. | Clean assets. |

---

## 3. Checklist Verification

- [ ] **Interactive Intake Form:** Page currently lacks an interactive HTML `<form>`.
- [x] **Pathways Summary:** Outlines all 3 steps of the guide training curriculum.
- [ ] **Link Integrity (404 Check):** 1 global menu 404 link and 1 Cloudflare email fallback 404 link.
- [x] **Media Asset Health:** All 6 image assets return HTTP 200 OK.
- [x] **Hub Navigation:** Direct button back to `/guide-training-program/` present.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Embed Interactive Inquiry Form:** Add a Contact Form 7 or WPForms block with fields:
   - Full Name
   - Email & Phone Number
   - Indigenous Nation / Community Affiliation
   - Target Program Step (Step 1 Intro, Step 2 7-Day Intensive, Step 3 Practicum)
   - Questions / Expression of Interest
2. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **FAQ Section:** Add 3–4 accordion items answering common applicant questions (e.g. course costs, travel funding, dates).

### 🟢 Low Priority / Polish & Recommendations
1. **Confirmation Messaging:** Configure an automatic email auto-responder confirming receipt of applicant expressions of interest.
