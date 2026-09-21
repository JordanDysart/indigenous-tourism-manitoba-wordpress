# Audit Report: Home — Marketing & Conversion

**Page URL:** `https://indigenoustourismmanitoba.ca/`  
**Audit Concern:** `marketing`  
**Date Audited:** `2026-08-29`  
**Conversion Readiness:** `Moderate`  

---

## 1. Executive Summary
The homepage establishes clear organizational identity ("Adventure to Understanding") and provides balanced pathways for its two core audiences: leisure travelers looking for authentic experiences and Indigenous entrepreneurs seeking membership and training. However, the site suffers from severe organic marketing gaps—notably a completely missing `<meta name="description">` tag and absent Open Graph social share tags—along with opportunities to strengthen above-the-fold CTA prominence and traveler social proof.

---

## 2. Detailed Findings

| # | Focus Area | Current State | Identified Gap / Opportunity | Recommended Solution |
|---|---|---|---|---|
| 1 | SEO & Discoverability | `<meta name="description">` missing | Search engine result pages (SERPs) generate unstructured snippets, depressing click-through rates. | Add compelling meta description (e.g. "Discover authentic Indigenous experiences, cultural tours, artisan markets, and hospitality across Manitoba with Indigenous Tourism Manitoba."). |
| 2 | Social Share Previews | No Open Graph (`og:*`) or Twitter Card tags | Sharing homepage links on social media, messaging apps, or LinkedIn displays a blank or unstyled link without preview images. | Configure standard OG tags: `og:title`, `og:description`, `og:image` (featuring high-impact Manitoba Indigenous tourism photography), and `og:url`. |
| 3 | Hero CTA Hierarchy | 4 feature cards above headline; no primary hero button | First-time visitors are presented with 4 cards before seeing a clear primary action button above the fold. | Add a dual-action hero CTA banner directly below or beside the main headline: "Explore Experiences" (Primary) and "Become a Member" (Secondary). |
| 4 | Social Proof & Trust | Operator showcases present, but no testimonials | The page showcases operators but lacks traveler reviews, visitor testimonials, or partner endorsements. | Add a curated "Visitor Experiences" quote snippet or partner badging section (e.g. Travel Manitoba, ITAC endorsement) to increase conversion confidence. |
| 5 | Conference CTA Phrasing | Generic "Register" button label | Button links to external registration engine (`3common.com`), but copy lacks specific event context. | Update CTA button copy from "Register" to "Register for Conference" or "Get Conference Tickets" to clarify user expectation. |

---

## 3. Checklist Verification

- [x] **5-Second Value Proposition:** Clear brand tagline ("Adventure to Understanding") and mission statement.
- [ ] **Search Engine Metadata:** Meta description is completely missing from HTML `<head>`.
- [ ] **Social Media Meta Tags:** Open Graph (`og:image`, `og:title`, `og:description`) and Twitter cards are not implemented.
- [x] **Audience Routing:** Clear distinct pathways for both tourists (`/things-to-do/`, `/experience-map/`) and operators (`/become-a-member/`, `/member-benefits/`).
- [x] **Multimedia Engagement:** Video play modal button provides interactive storytelling.
- [ ] **Social Proof / Reviews:** Lacks direct visitor reviews or community partner endorsement badges.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Implement SEO & Open Graph Meta Tags:** Install or configure Yoast/RankMath/theme meta hooks to output `<meta name="description">` and `og:image` with a high-resolution 1200x630px branded hero image.
2. **Clarify External Conference CTA:** Update button text from "Register" to "Register for Conference" so users know they are navigating to the event ticket platform.

### 🟡 Medium Priority / Improvements
1. **Above-the-Fold Action Hierarchy:** Add prominent primary CTA buttons directly below the main welcome statement to capture immediate visitor interest.
2. **Incorporate Authentic Social Proof:** Add a 2-column testimonial block featuring traveler feedback from authentic Indigenous tours and experiences.

### 🟢 Low Priority / Polish & Recommendations
1. **Newsletter / Guide Capture:** Consider adding a "Download the Manitoba Indigenous Travel Guide" lead magnet popup or inline banner for visitors not ready to book immediately.
