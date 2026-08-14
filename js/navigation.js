/**
 * Navigation & Mega Menu Accessibility Handler
 * Supports smooth desktop hover/focus states, keyboard accessibility (Tab, Escape),
 * and mobile drawer accordion navigation.
 */
(function () {
  const header = document.getElementById('masthead');
  const navContainer = document.getElementById('site-navigation');
  if (!navContainer) return;

  const hamburger = document.getElementById('bar_menu') || navContainer.querySelector('.c-hamburger');
  const menuContainer = navContainer.querySelector('.menu-primary-menu-container') || navContainer.querySelector('ul.nav-menu');
  const menuParents = navContainer.querySelectorAll('.mega-menu-parent, .menu-item-has-children');

  // 1. Scroll-aware fixed header
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        header.classList.add('fixed');
      } else {
        header.classList.remove('fixed');
      }
    }, { passive: true });
  }

  // 2. Mobile Drawer Toggle
  if (hamburger) {
    hamburger.addEventListener('click', (e) => {
      e.preventDefault();
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.classList.toggle('is-active');
      navContainer.classList.toggle('toggled');
      hamburger.setAttribute('aria-expanded', !isExpanded);

      if (window.innerWidth < 1200) {
        document.body.classList.toggle('mobile-menu-active');
      }
    });
  }

  // 3. Submenu Accordion for Mobile / Chevron Clicks
  menuParents.forEach((parent) => {
    const toggleBtn = parent.querySelector('.submenu-toggle-btn');
    const parentLink = parent.querySelector('> a');

    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        parent.classList.toggle('open');
        const isNowOpen = parent.classList.contains('open');
        if (parentLink) parentLink.setAttribute('aria-expanded', isNowOpen);
      });
    }
  });

  // 4. Keyboard Accessibility: Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      menuParents.forEach((p) => {
        p.classList.remove('open');
        const link = p.querySelector('> a');
        if (link) link.setAttribute('aria-expanded', 'false');
      });

      if (navContainer.classList.contains('toggled')) {
        navContainer.classList.remove('toggled');
        if (hamburger) {
          hamburger.classList.remove('is-active');
          hamburger.setAttribute('aria-expanded', 'false');
        }
        document.body.classList.remove('mobile-menu-active');
      }
    }
  });

  // 5. Update aria-expanded on focus/hover
  menuParents.forEach((parent) => {
    const link = parent.querySelector('> a');
    if (!link) return;

    parent.addEventListener('mouseenter', () => {
      if (window.innerWidth >= 1200) {
        link.setAttribute('aria-expanded', 'true');
      }
    });

    parent.addEventListener('mouseleave', () => {
      if (window.innerWidth >= 1200) {
        link.setAttribute('aria-expanded', 'false');
      }
    });

    parent.addEventListener('focusin', () => {
      if (window.innerWidth >= 1200) {
        link.setAttribute('aria-expanded', 'true');
      }
    });

    parent.addEventListener('focusout', (e) => {
      if (window.innerWidth >= 1200 && !parent.contains(e.relatedTarget)) {
        link.setAttribute('aria-expanded', 'false');
      }
    });
  });
})();
