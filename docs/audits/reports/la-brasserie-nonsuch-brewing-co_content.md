# Audit Report: La Brasserie Nonsuch Brewing Co. — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/la-brasserie-nonsuch-brewing-co/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass (Rich Craft Brewing Narrative & Valid Outbound Links; Minor Global Menu 404)`  

---

## 1. Executive Summary
The La Brasserie Nonsuch Brewing Co. profile delivers an engaging and culturally grounded narrative about the Métis/Francophone-owned craft brewery located in Winnipeg's historic Exchange District. The text highlights artisanal European brewing styles, spring water sourcing, and localized culinary offerings. All operator links and physical location details resolve accurately with HTTP 200 responses.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 2 | Brewing Storytelling | Taproom Bio | **Low** | Inspiring narrative covering European brewing methods, pure Manitoba spring water, and community gathering spaces. | High cultural copy quality. |
| 3 | Contact Coordinates | Overview Section | **Low** | Clear address (125 Pacific Ave, Winnipeg), active telephone link, and valid website URL (`https://www.nonsuch.beer/`). | Complete contact info. |
| 4 | Media Asset Integrity | Brewery & Pairing Photos | **Low** | All 19 image assets return HTTP 200 OK with zero broken paths or staging leaks. | Clean asset delivery. |
| 5 | Cross-Linking | "You Might Like" Section | **Low** | Active links to recommended Indigenous operators in Winnipeg and beyond. | Strong internal link network. |

---

## 3. Checklist Verification

- [x] **Operator Story & Craft Overview:** Rich profile covering Nonsuch's Indigenous & Métis founders and craft beers.
- [x] **External Link Integrity:** `https://www.nonsuch.beer/` returns HTTP 200 OK with valid SSL.
- [ ] **Navigation Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** All 19 image assets return HTTP 200 OK.
- [x] **Social Media Presence:** Working links to Facebook, Instagram, LinkedIn, and X.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Taproom Tasting & Hours:** Display current taproom hours and brewery tour availability to assist evening/weekend visitors in the Exchange District.

### 🟢 Low Priority / Polish & Recommendations
1. **Signature Brews & Bannock Pairing:** Call out signature award-winning beers (e.g., Belgian Strong Ale, Baltic Porter) paired with locally sourced bannock.
