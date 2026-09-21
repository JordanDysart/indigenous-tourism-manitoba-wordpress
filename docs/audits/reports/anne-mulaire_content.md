# Audit Report: Anne Mulaire — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/anne-mulaire/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass (Engaging Operator Narrative & Valid Outbound Links; Minor Global Menu 404)`  

---

## 1. Executive Summary
The Anne Mulaire profile delivers an authentic, comprehensive portrayal of the Métis luxury fashion house, emphasizing zero-waste sustainable manufacturing, Indigenous heritage, and the Winnipeg boutique shopping experience. All operator links, contact coordinates, and media assets load cleanly with HTTP 200 status.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 2 | Brand Storytelling | Narrative Bio | **Low** | Inspiring story of Andréanne Mulaire Dandeneau, sustainable fashion, and cultural heritage. | High storytelling quality. |
| 3 | Contact Coordinates | Sidebar Details | **Low** | Accurate phone numbers, email link, boutique location in Winnipeg, and valid website link (`https://annemulaire.ca/`). | Complete contact info. |
| 4 | Media Asset Integrity | Photo Showcase | **Low** | All 19 image assets return HTTP 200 OK with zero broken paths or staging leaks. | Clean assets. |
| 5 | Cross-Linking | "You Might Like" Section | **Low** | Active links to recommended Indigenous operators (Agowiidiwinan Centre, Bistro on Notre Dame, Borealis Beading). | Strong internal link network. |

---

## 3. Checklist Verification

- [x] **Operator Story & Overview:** Detailed background on Métis fashion, collections, and boutique.
- [x] **External Link Integrity:** `https://annemulaire.ca/` returns HTTP 200 OK.
- [ ] **Navigation Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** All 19 image assets return HTTP 200 OK.
- [x] **Social Media Presence:** Working links to Facebook, Instagram, LinkedIn, and X.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Boutique Hours of Operation:** State physical store hours (e.g. Wednesday–Saturday 10:00 AM – 5:00 PM) alongside the address for visiting shoppers.

### 🟢 Low Priority / Polish & Recommendations
1. **Curated Shopping Highlights:** Add a brief feature list of signature items (e.g., "Eco-friendly outerwear", "Bamboo leggings", "Bespoke Métis coats").
