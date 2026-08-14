# Task 12 — The Forks Location Page Template & Feature Showcase

**Status:** `[x]` Completed  
**Priority:** Medium  
**Dependencies:** Task 11 (Banner Block)  
**Target:** Create a dedicated, modular page template (`page-the-forks.php`) to highlight ITM's flagship location, visitor kiosk, artisan retail, and cultural experiences at The Forks in Winnipeg.

---

## 1. Context & Objectives

The Forks in Winnipeg is a sacred meeting place at the confluence of the Red and Assiniboine rivers with over 6,000 years of Indigenous history. Indigenous Tourism Manitoba operates a key hub at The Forks for visitor information, authentic artisan merchandise, cultural workshops, and guided experience bookings.

**Goal:**
Design and implement a structured, modular page template ([page-the-forks.php](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/page-the-forks.php)) with:
1. **Hero Header:** Full-width hero banner highlighting The Forks meeting place.
2. **Interactive Location & Visitor Info Card:** Hours of operation, building/market location, contact, transit/parking directions, and Leaflet/Google map pin.
3. **Pillars / Experience Highlights Grid:**
   - *Shop with Purpose:* Authentic Indigenous art, beadwork, apparel, and gifts.
   - *Plan Your Journey:* Visitor consultation and operator booking assistance.
   - *Cultural Connections:* Workshops, storytellers, and seasonal events.
4. **Interactive Gutenberg Content Area:** Allows site editors to add seasonal news, photo galleries, and promotional banners.
5. **Inquiry / Visit CTA:** Prominent call-to-action for tour bookings and group inquiries.

---

## 2. Technical Specification & File Map

### A. New File: `page-the-forks.php`
- Template Name: `The Forks Location Hub`
- Structure:
  ```php
  <?php
  /**
   * Template Name: The Forks Location Hub
   * Description: Custom showcase template for ITM at The Forks.
   */
  get_header(); ?>

  <main id="primary" class="site-main forks-page-template">
      <!-- 1. Hero Section -->
      <?php get_template_part('template-parts/forks/hero'); ?>

      <!-- 2. Location & Visitor Quick Info Bar -->
      <?php get_template_part('template-parts/forks/visitor-info'); ?>

      <!-- 3. Experience Highlights Grid (Culture, Retail, Experiences) -->
      <?php get_template_part('template-parts/forks/highlights'); ?>

      <!-- 4. Dynamic Page Content (Gutenberg Blocks) -->
      <section class="forks-content-wrapper">
          <div class="content-container">
              <?php while ( have_posts() ) : the_post(); the_content(); endwhile; ?>
          </div>
      </section>

      <!-- 5. Location CTA -->
      <?php get_template_part('template-parts/forks/cta'); ?>
  </main>

  <?php get_footer(); ?>
  ```

### B. New LESS Styles: `assets/less/pages/_forks.less`
- Custom cards with `@radius-lg: 16px`, `@color-orange` accents, and responsive two-column / three-column grid layouts.
- Import into `assets/less/style.less`.

### C. Assets Needed (To be provided by client / user):
- Hero photography of ITM at The Forks.
- Retail store / kiosk photos.
- Exact operating hours and market booth location copy.

---

## 3. Acceptance Criteria & QA Checklist

- [ ] Template selectable in WordPress Page Editor attributes under **Template > The Forks Location Hub**.
- [ ] Responsive layout looks polished on Desktop (1280px), Tablet (768px), and Mobile (375px).
- [ ] Map/directions card clearly displays address and operating hours.
- [ ] Dynamic Gutenberg content area allows adding custom blocks below the structured highlights.
- [ ] All colors and fonts adhere strictly to the canonical design system.
