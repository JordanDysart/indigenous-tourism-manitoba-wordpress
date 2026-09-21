# Audit Report: Teekca’s Boutique — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/teekcas-boutique/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Action Required (Critical Broken Website Link; Rebranding & New Domain Identified)`  

---

## 1. Executive Summary
The Teekca’s Boutique operator profile highlights a premier Indigenous-owned retail business in Winnipeg (locations at The Forks Market and St. Vital Centre), specializing in handcrafted moccasins, mukluks, soapstone carvings, Pendleton blankets, ribbon skirts, and Indigenous artisan jewelry. **Critical Finding:** The outbound website link `https://teekcasboutique.com/` is dead (`Connection refused`). Investigation reveals the operator has rebranded their e-commerce storefront to **Teekca's Atâwêkamik** at `https://www.teekcasatawekamik.com`.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Broken Outbound Link | "Visit Website" Button | **Critical** | `<a href="https://teekcasboutique.com/">Visit Website</a>` produces a connection refused error. | Update outbound URL in WP Admin to `https://www.teekcasatawekamik.com`. |
| 2 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 3 | Brand Nomenclature | Overview Section | **Medium** | Store profile does not mention their updated dual brand name "Teekca's Atâwêkamik". | Add "Also known as Teekca's Atâwêkamik" to assist shoppers searching online. |
| 4 | Store Locations Copy | Overview Section | **Low** | Mentions locations at The Forks Market and Winnipeg retail centers with telephone contact. | Clear retail presence. |
| 5 | Media Asset Integrity | Product Photos | **Low** | All 16 image assets return HTTP 200 OK with zero broken paths or staging leaks. | Clean asset delivery. |

---

## 3. Checklist Verification

- [x] **Operator Story & Retail Offerings:** Rich presentation of moccasins, beadwork, jewelry, and crafts.
- [ ] **External Link Integrity:** `https://teekcasboutique.com/` fails with connection refused (**Critical**).
- [ ] **Navigation Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** All 16 image assets return HTTP 200 OK.
- [x] **Social Media Presence:** Working links to Facebook, Instagram, LinkedIn, and X.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Broken Outbound Website URL:** Immediately update the operator website field in WordPress to `https://www.teekcasatawekamik.com`.
2. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Update Store Branding & Storefront Details:** Clarify physical store addresses (The Forks Market 2nd floor, St. Vital Centre) and link to online shop categories.

### 🟢 Low Priority / Polish & Recommendations
1. **Social Link Update:** Add direct link to their active Facebook page `https://www.facebook.com/teekcasatawekamik`.
