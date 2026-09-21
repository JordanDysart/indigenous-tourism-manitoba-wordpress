# Audit Report: East Region Archive — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/operator-region/east/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-31`  
**Overall Status:** `Pass with Content Recommendations (Focused 3-Operator Regional Roster; Missing Regional Narrative Copy; Minor Global Menu 404)`  

---

## 1. Executive Summary
The East region operator taxonomy archive showcases premier Indigenous tourism experiences rooted in the Canadian Shield, boreal forests, and waterways of Eastern Manitoba. The directory features Whiteshell Petroforms Authentic Indigenous Tours (sacred teachings and geology in Whiteshell Provincial Park), Borealis Beading (immersive Métis beadwork workshops in Ste. Geneviève), and Moon Gate Guest House (eco-retreat and wellness lodging along the Whitemouth River). All 3 listing cards link directly to complete operator profiles. Adding an introductory narrative celebrating ancient rock teachings, traditional Métis craftsmanship, and serene wilderness hospitality will enrich visitor engagement.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Regional Description | Taxonomy Header | **Medium** | The archive page lacks an introductory description contextualizing Eastern Manitoba's sacred rock alignments (petroforms), boreal waterways, Métis artisanal traditions, and tranquil eco-retreats. | Add a descriptive paragraph in WordPress (Region Description) and render `<?php the_archive_description('<div class="taxonomy-description lead">', '</div>'); ?>`. |
| 2 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 3 | Operator Directory Accuracy | Grid Listings | **Low** | 3 active operators accurately represent the East region across guided cultural tours, craft workshops, and wellness lodging. | Complete and accurate directory. |
| 4 | Media Asset Integrity | Card Thumbnails | **Low** | All 9 image assets return HTTP 200 OK with zero broken paths or staging leaks. | Clean asset delivery. |

---

## 3. Checklist Verification

- [x] **Listing Accuracy:** 3 valid regional operators listed with active single-page profiles.
- [ ] **Region Description Text:** Archive lacks introductory editorial text.
- [ ] **Navigation Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** All 9 image assets return HTTP 200 OK.
- [x] **Social Media Presence:** Working links to Facebook, Instagram, LinkedIn, and X.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Add Introductory Lead Paragraph:** Populate the WordPress term description for "East" (e.g. *"Experience the mystical beauty and ancient heritage of Eastern Manitoba. Journey through sacred petroform teachings in Whiteshell, participate in authentic Métis beadwork workshops, and unwind at eco-friendly riverfront retreats along the Whitemouth River."*).

### 🟢 Low Priority / Polish & Recommendations
1. **Region Switcher Tabs:** Provide quick filter buttons allowing users to switch between operator regions (Central, East, North, West).
