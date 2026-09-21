# Audit Report: Contact Us — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/contact-us/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass (Comprehensive Contact Details & Active Form; Minor Global Menu 404)`  

---

## 1. Executive Summary
The Contact Us page provides thorough, transparent organizational contact information including the physical office address in Winnipeg, local and toll-free telephone numbers, social media channels, and a fully functional Gravity Forms inquiry form. All media assets load reliably with HTTP 200 status.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 2 | Contact Coordinates | Contact Info Sidebar | **Low** | Clear address (Portage Ave, Winnipeg), telephone numbers, and email link. | Excellent contact transparency. |
| 3 | Inquiry Form Fields | Gravity Forms Embed | **Low** | Form contains fields for Full Name, Email, Phone, Subject, and Message with CAPTCHA protection. | Complete form structure. |
| 4 | Media Asset Integrity | Visual Elements | **Low** | All 6 images return HTTP 200 OK with zero broken paths or staging leaks. | Clean assets. |

---

## 3. Checklist Verification

- [x] **Contact Coordinates:** Physical address, local/toll-free phone, and email listed.
- [x] **Interactive Contact Form:** Active Gravity Forms embed.
- [ ] **Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** All 6 image assets return HTTP 200 OK.
- [x] **Social Media Links:** Active links to Facebook, Instagram, and LinkedIn.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Interactive Google Map:** Embed a responsive map or direct Google Maps directions link for the Portage Avenue office.
2. **Office Hours:** Display public office / inquiry operating hours (e.g. Monday–Friday 9:00 AM – 4:30 PM CST).

### 🟢 Low Priority / Polish & Recommendations
1. **Departmental Contact Routing:** Add a dropdown selector to the form (General Inquiries, Membership, Marketing/Events, Media/Press) to route emails directly to relevant staff.
