# Audit Report: Manitoba Indigenous Cultural Education Centre Inc. — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/manitoba-indigenous-cultural-education-centre-inc/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass (Comprehensive Cultural Education & Library Overview; Minor Global Menu 404)`  

---

## 1. Executive Summary
The Manitoba Indigenous Cultural Education Centre Inc. (MICEC) profile provides an informative overview of Manitoba's dedicated Indigenous cultural resource institution. The copy describes language classes, traditional craft workshops, cultural presentations, and a library archive housing over 10,000 titles. All operator contact coordinates and outbound links resolve with HTTP 200 status.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 2 | Educational Mandate | Centre Overview | **Low** | Well-crafted narrative detailing language programs, cultural workshops, lending library, and museum collection. | High educational copy quality. |
| 3 | Contact Coordinates | Overview Section | **Low** | Clear address (119 Sutherland Ave, Winnipeg), active telephone link, and valid website URL (`https://micec.com`). | Complete contact info. |
| 4 | Media Asset Integrity | Workshop & Facility Photos | **Low** | All 19 image assets return HTTP 200 OK with zero broken paths or staging leaks. | Clean asset delivery. |
| 5 | Cross-Linking | "You Might Like" Section | **Low** | Functional links to partner Indigenous operators. | Strong internal link network. |

---

## 3. Checklist Verification

- [x] **Operator Story & Educational Offerings:** Clear presentation of workshops, library resources, and cultural education programs.
- [x] **External Link Integrity:** `https://micec.com` returns HTTP 200 OK with valid SSL.
- [ ] **Navigation Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** All 19 image assets return HTTP 200 OK.
- [x] **Social Media Presence:** Working links to Facebook, Instagram, LinkedIn, and X.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Workshop Registration Callout:** Add a direct link or notice for schools, corporate groups, and travelers interested in booking custom cultural workshops.

### 🟢 Low Priority / Polish & Recommendations
1. **Library Visiting Guidelines:** Clarify public borrowing and research access hours for visitors and students.
