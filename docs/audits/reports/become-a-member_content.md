# Audit Report: Become a Member — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/become-a-member/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Good (Thorough Membership Criteria; Minor Global Menu 404)`  

---

## 1. Executive Summary
The Become a Member page provides a comprehensive, authoritative membership onboarding portal. It clearly defines the 2026-27 membership categories (TOO Accredited, Non-Accredited Emerging Businesses, and Industry Partners), associated annual dues, Indigenous ownership verification guidelines, and Market Readiness checklists. All media assets resolve properly with zero broken paths.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/` or publish the missing page. |
| 2 | Membership Tier Clarity | Categories & Pricing | **Low** | Clear breakdown of annual dues ($99 for Accredited, $0 for Emerging, $250 for Industry Partners) with explicit eligibility requirements. | High editorial clarity. |
| 3 | Market Readiness Criteria | Checklist Module | **Low** | Comprehensive market-ready criteria (insurance, operating licenses, booking mechanisms) clearly explained to applicants. | Transparent guidelines. |
| 4 | Digital Application Form | Gravity Forms Embed | **Low** | Seamless integration with clear input prompts and digital signature canvas. | Robust application flow. |

---

## 3. Checklist Verification

- [x] **Membership Tiers & Pricing:** Explicit pricing, eligibility, and category definitions.
- [x] **Market Readiness Guidelines:** Clear operational and insurance standards listed.
- [ ] **Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** All 8 image assets return HTTP 200 OK.
- [x] **Form Logic Completeness:** All required contact, business, and certification fields are present.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update the broken `/indigenous-guide-training-program-more-learning-opportunities/` link in WordPress Menus.

### 🟡 Medium Priority / Improvements
1. **Downloadable PDF Member Kit:** Add a link to download the complete ITM Member Benefits & Standards PDF package for offline review.

### 🟢 Low Priority / Polish & Recommendations
1. **Member FAQ Accordion:** Add a brief FAQ accordion addressing common questions regarding Indigenous ownership verification and payment methods.
