# Audit Report: New Account Request — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/new-account-request/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass (Clear Onboarding Instructions; Form Embed Opportunity)`  

---

## 1. Executive Summary
The New Account Request page provides concise and actionable instructions for Indigenous tourism operators in Manitoba seeking login credentials to manage directory listings and access member resources. The copy clearly outlines the required application details and sets a realistic 2-business-day turnaround expectation. All images load reliably with zero broken paths.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/` or publish the missing page. |
| 2 | Data Intake Mechanism | Account Request Box | **Medium** | Users are currently instructed to draft an email manually rather than completing an integrated intake form. | Embed a lightweight 4-field Gravity Form (Business Name, Contact Person, Email, Community Affiliation) to streamline submissions. |
| 3 | SLA & Expectation Setting | Timeline Notice | **Low** | Clear commitment to deliver credentials within two business days. | High transparency. |
| 4 | Media Asset Integrity | Visual Elements | **Low** | All 6 images return HTTP 200 OK with zero broken paths or staging leaks. | Clean assets. |

---

## 3. Checklist Verification

- [x] **Clarity of Instructions:** Explicit list of required application details.
- [x] **Spelling & Grammar:** Professional and clean editorial copy.
- [ ] **Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** All 6 image assets return HTTP 200 OK.
- [x] **Turnaround SLA:** Explicitly declared 2-business-day timeline.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update the broken `/indigenous-guide-training-program-more-learning-opportunities/` link in WordPress Menus.

### 🟡 Medium Priority / Improvements
1. **Replace Email Link with On-Page Form:** Embed a dedicated 4-field "Request Portal Access" form directly on the page to prevent email friction and missing fields.

### 🟢 Low Priority / Polish & Recommendations
1. **Direct Member Login Link:** Add a "Already Have An Account? [Log In Here](/login/)" link for existing members who navigated here by mistake.
