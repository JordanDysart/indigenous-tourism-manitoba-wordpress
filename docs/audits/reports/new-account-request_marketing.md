# Audit Report: New Account Request — Marketing & Conversion

**Page URL:** `https://indigenoustourismmanitoba.ca/new-account-request/`  
**Audit Concern:** `marketing`  
**Date Audited:** `2026-08-30`  
**Conversion Readiness:** `Moderate (Clear Intent; Email Handoff Friction & Metadata Gaps)`  

---

## 1. Executive Summary
The New Account Request page serves as an administrative onboarding touchpoint for operators seeking to manage their directory profile and access member resources. While it presents a straightforward explanation of requirements and a link to review member benefits, relying on a manual email compose action creates unnecessary friction. Embedding a streamlined on-page form, adding an existing member login link, and declaring `<meta name="description">` tags will enhance the conversion experience.

---

## 2. Detailed Findings

| # | Focus Area | Current State | Identified Gap / Opportunity | Recommended Solution |
|---|---|---|---|---|
| 1 | Lead Capture Friction | "Email Membership Team" button | Users without a configured default mail client encounter broken click handlers. | Replace mailto button with an embedded 4-field quick-intake form (Business Name, Contact, Email, Community). |
| 2 | Existing Member Pathway | No login link present | Existing operators arriving here looking to log in are not provided a login route. | Add a secondary prompt: "Already registered? [Log in to your account](/login/)". |
| 3 | SEO & Search Snippet | `<meta name="description">` missing | Search engines lack a concise summary of the operator account request process. | Add a targeted meta description (e.g. "Request an Indigenous Tourism Manitoba member account to manage your business listing, update photos, and access partner resources."). |
| 4 | Social Share Previews | Open Graph / Twitter cards missing | Shared links render generic social preview cards without imagery. | Implement standard `og:title`, `og:description`, and `og:image`. |

---

## 3. Checklist Verification

- [x] **Value Proposition Clarity:** Clearly explains account capabilities (manage listing, update photos, access resources).
- [ ] **Search Engine Metadata:** Meta description is missing.
- [ ] **Social Media Meta Tags:** Open Graph tags are missing.
- [ ] **Frictionless Lead Capture:** Relies on manual email client launching rather than on-page form.
- [x] **Secondary Exploration Action:** Link to `/member-benefits/` is available.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Implement Meta Description & OG Tags:** Add targeted 155-character description and Open Graph tags to `<head>`.

### 🟡 Medium Priority / Improvements
1. **Embed On-Page Intake Form:** Replace the email button with an embedded Gravity Form to capture submissions instantly.
2. **Add Member Login Link:** Add a clear login redirect for active members.

### 🟢 Low Priority / Polish & Recommendations
1. **Portal Feature Highlights:** Add 3 bullet points highlighting specific portal capabilities (Update business hours, upload tour photos, access grant templates).
