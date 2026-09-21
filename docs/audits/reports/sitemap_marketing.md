# Audit Report: Sitemap — Marketing & Navigation Architecture

**Page URL:** `https://indigenoustourismmanitoba.ca/sitemap/`  
**Audit Concern:** `marketing`  
**Date Audited:** `2026-08-30`  
**Crawl & Discovery Readiness:** `Good (Deep Architecture Distribution; 404 Links Need Removal)`  

---

## 1. Executive Summary
The HTML Sitemap serves a strategic dual role: providing lost visitors with an immediate directory of key destinations and enabling search crawlers to discover deep regional and category landing pages. Fixing dead taxonomy links is essential to preserve crawl budget and organic search authority.

---

## 2. Detailed Findings

| # | Focus Area | Current State | Identified Gap / Opportunity | Recommended Solution |
|---|---|---|---|---|
| 1 | Crawl Budget & Authority | 2 broken directory links | Dead links (`/operator-region/winnipeg/`, `/interlake/`) waste search engine crawl equity. | Remove or correct dead taxonomy links immediately. |
| 2 | Lost Visitor Recovery | Static link lists | Visitors arriving via dead ends or search have no interactive way to filter destinations. | Add an in-page search bar or keyword filter at the top of the directory. |
| 3 | SEO & Search Snippet | `<meta name="description">` missing | Search engines lack a concise summary of the site map. | Add a targeted meta description (e.g. "Browse the complete directory of Indigenous Tourism Manitoba experiences, regional guides, training programs, and operator resources."). |
| 4 | Social Share Previews | Open Graph / Twitter cards missing | Shared links render generic social preview cards without imagery. | Implement standard `og:title`, `og:description`, and `og:image`. |

---

## 3. Checklist Verification

- [x] **Internal Link Equity:** Distributes crawl equity to deep category and regional archives.
- [ ] **Clean Link Flow:** Contains 2 dead links returning HTTP 404.
- [ ] **Search Engine Metadata:** Meta description is missing.
- [ ] **Social Media Meta Tags:** Open Graph tags are missing.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Remove / Fix 404 Taxonomy Links:** Clean up dead links to preserve crawl efficiency.
2. **Implement Meta Description & OG Tags:** Add targeted 155-character description and Open Graph tags to `<head>`.

### 🟡 Medium Priority / Improvements
1. **Interactive Site Search:** Embed a search box above the directory lists.

### 🟢 Low Priority / Polish & Recommendations
1. **Featured Experiences Spotlight:** Highlight 3 top-trending cultural tours at the top of the directory page.
