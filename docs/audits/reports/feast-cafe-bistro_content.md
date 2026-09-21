# Audit Report: Feast Cafe Bistro — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/feast-cafe-bistro/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass (Compelling Culinary Storytelling; Critical External SSL Advisory)`  

---

## 1. Executive Summary
The Feast Cafe Bistro operator profile celebrates Chef Christa Bruneau-Guenther (Peguis First Nation) and her nationally acclaimed restaurant in Winnipeg's West End. The profile provides an appetizing overview of modern Indigenous comfort food, catering services, and community impact. All page imagery and telephone coordinates are functional. Notably, outbound testing revealed that the operator's official website (`feastcafebistro.com`) uses a self-signed SSL certificate, which triggers browser security warnings.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | External Operator SSL | Outbound Link (`feastcafebistro.com`) | **High** | The operator's domain uses a self-signed SSL certificate, causing browser SSL errors (`CERTIFICATE_VERIFY_FAILED`). | Contact operator to provision a free Let's Encrypt / CA-validated SSL certificate. |
| 2 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 3 | Culinary Storytelling | Restaurant Bio | **Low** | Inspiring narrative covering Chef Christa, Peguis First Nation roots, and traditional foods with modern flair. | High cultural copy quality. |
| 4 | Contact Coordinates | Overview Section | **Low** | Clear address (587 Ellice Ave, Winnipeg), active telephone link, and email contact info. | Complete location details. |
| 5 | Media Asset Integrity | Food & Interior Photography | **Low** | All 18 image assets return HTTP 200 OK with zero broken paths or staging leaks. | Clean asset delivery. |

---

## 3. Checklist Verification

- [x] **Operator Story & Culinary Highlights:** Engaging coverage of modern Indigenous dining in Winnipeg.
- [ ] **External Operator SSL Certificate:** `feastcafebistro.com` has a self-signed certificate.
- [ ] **Navigation Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** All 18 image assets return HTTP 200 OK.
- [x] **Social Media Presence:** Working links to Facebook, Instagram, LinkedIn, and X.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Notify Operator Regarding SSL:** Inform Feast Cafe Bistro that `https://www.feastcafebistro.com/` has an invalid self-signed certificate so they can renew/install a valid CA certificate.
2. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Operating Hours Notice:** Display weekly breakfast, lunch, and dinner operating hours on the overview card to reduce customer bounce.

### 🟢 Low Priority / Polish & Recommendations
1. **Catering & Group Dining Highlight:** Mention catering capabilities for corporate and tourist groups visiting Winnipeg.
