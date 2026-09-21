# Audit Report: Borealis Beading — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/borealis-beading/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass (Authentic Cultural Storytelling & Valid Outbound Links; Minor Global Menu 404)`  

---

## 1. Executive Summary
The Borealis Beading operator profile presents an authentic cultural experience narrative highlighting Melanie Gamache's hands-on Métis beading, quillwork workshops, and oral storytelling traditions in Sainte-Geneviève, Manitoba. All operator contact details, website links, and gallery assets return HTTP 200 status.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 2 | Cultural Narrative | Workshop Bio | **Low** | Beautiful storytelling detailing traditional Métis floral beading, quill art, and community circles. | High cultural copy quality. |
| 3 | Contact Coordinates | Sidebar Details | **Low** | Working phone number, email link, Sainte-Geneviève location, and valid website link (`https://www.borealisbeading.ca/`). | Complete contact info. |
| 4 | Media Asset Integrity | Workshop & Craft Photos | **Low** | All 19 image assets return HTTP 200 OK with zero broken paths or staging leaks. | Clean assets. |
| 5 | Cross-Linking | "You Might Like" Section | **Low** | Active links to recommended Indigenous operators (Agowiidiwinan Centre, Anne Mulaire, Bistro on Notre Dame). | Strong internal link network. |

---

## 3. Checklist Verification

- [x] **Operator Story & Overview:** Detailed background on Melanie Gamache, workshops, and Métis traditions.
- [x] **External Link Integrity:** `https://www.borealisbeading.ca/` returns HTTP 200 OK.
- [ ] **Navigation Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** All 19 image assets return HTTP 200 OK.
- [x] **Social Media Presence:** Working links to Facebook, Instagram, LinkedIn, and X.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Workshop Booking Clarity:** Add a brief note regarding group sizes, advance booking lead times, and private vs. public scheduled workshops.

### 🟢 Low Priority / Polish & Recommendations
1. **Travel Distance Notice:** Note that Sainte-Geneviève is approximately 35 minutes east of Winnipeg to assist tourists with itinerary planning.
