# Audit Report: Spence Custom Carving — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/spence-custom-carving/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass (Master Artisan Woodcarving Narrative; Minor Global Menu 404)`  

---

## 1. Executive Summary
The Spence Custom Carving operator profile highlights master Indigenous carver Fred Spence, known across Manitoba for handcrafted wood and soapstone sculptures, wildlife carvings, custom totem projects, and cultural workshops. Outbound links to `spencecustomcarving.com` resolve with HTTP 200 status.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 2 | Artisan Storytelling | Overview Section | **Low** | Inspiring narrative detailing decades of master woodcarving artistry, cultural symbolism, animal sculptures, and educational workshops. | High experiential copy quality. |
| 3 | Contact Coordinates | Overview Section | **Low** | Clear contact base, direct telephone link, and valid external website URL (`https://www.spencecustomcarving.com/`). | Complete contact info. |
| 4 | Media Asset Integrity | Sculpture Photos | **Low** | All 18 image assets return HTTP 200 OK with zero broken paths or staging leaks. | Clean asset delivery. |
| 5 | Cross-Linking | "You Might Like" Section | **Low** | Functional links to partner Indigenous operators. | Strong internal link network. |

---

## 3. Checklist Verification

- [x] **Operator Story & Artistic Offerings:** Rich presentation of custom carvings, totem sculptures, and workshops.
- [x] **External Link Integrity:** `https://www.spencecustomcarving.com/` returns HTTP 200 OK with valid SSL.
- [ ] **Navigation Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** All 18 image assets return HTTP 200 OK.
- [x] **Social Media Presence:** Working links to Facebook, Instagram, LinkedIn, and X.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Custom Commission Inquiry CTA:** Add a dedicated "Inquire for Custom Carving Commission" link pointing directly to custom order requests.

### 🟢 Low Priority / Polish & Recommendations
1. **Workshop Availability:** Mention group booking options and carving demonstration availability for events or schools.
