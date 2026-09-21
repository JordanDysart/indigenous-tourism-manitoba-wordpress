# Audit Report: Manito Ahbee Festival — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/manito-ahbee-festival/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass (Rich Cultural Festival Storytelling; Minor Global Menu 404)`  

---

## 1. Executive Summary
The Manito Ahbee Festival profile provides a compelling cultural narrative regarding North America's premier gathering of Indigenous culture, music, marketplace, and international pow wow competitions. The text explains the sacred petroform heritage of the name Manito Ahbee ("Where the Creator Sits") and provides accurate location details for Red River Exhibition Park. All operator contact coordinates and outbound links resolve with HTTP 200 status.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 2 | Cultural Storytelling | Festival Narrative | **Low** | Exceptional narrative explaining the sacred Whiteshell petroform naming origin, unity, celebration, and intergenerational traditions. | High copy quality. |
| 3 | Contact Coordinates | Overview Section | **Low** | Clear venue coordinates (Red River Exhibition Park, Winnipeg), phone link, and valid festival website URL (`https://www.manitoahbee.com/`). | Complete contact info. |
| 4 | Media Asset Integrity | Festival Photos | **Low** | All 19 image assets return HTTP 200 OK with zero broken paths or staging leaks. | Clean asset delivery. |
| 5 | Cross-Linking | "You Might Like" Section | **Low** | Working recommendation links to partner Indigenous operators. | Strong internal link network. |

---

## 3. Checklist Verification

- [x] **Operator Story & Festival Highlights:** Inspiring copy detailing pow wow events, marketplace, and cultural performances.
- [x] **External Link Integrity:** `https://www.manitoahbee.com/` returns HTTP 200 OK with valid SSL.
- [ ] **Navigation Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** All 19 image assets return HTTP 200 OK.
- [x] **Social Media Presence:** Working links to Facebook, Instagram, LinkedIn, and X.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Annual Event Dates Callout:** Display the upcoming festival dates (e.g. May long weekend annually) prominently to assist visitors planning travel to Winnipeg.

### 🟢 Low Priority / Polish & Recommendations
1. **Pow Wow Etiquette Link:** Add a helpful guide link for first-time pow wow visitors to foster respectful cultural participation.
