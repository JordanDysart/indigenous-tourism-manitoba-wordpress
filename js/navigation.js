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

  // 1. Dynamic Header Height & Scroll-aware Fixed Header
  if (header) {
    const updateHeaderHeight = () => {
      const height = header.offsetHeight;
      if (height > 0) {
        document.documentElement.style.setProperty('--site-header-height', height + 'px');
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight, { passive: true });
    window.addEventListener('load', updateHeaderHeight);

    let isFixed = false;
    window.addEventListener('scroll', () => {
      const shouldBeFixed = window.scrollY > 20;
      if (shouldBeFixed !== isFixed) {
        isFixed = shouldBeFixed;
        if (isFixed) {
          header.classList.add('fixed');
        } else {
          header.classList.remove('fixed');
        }
        requestAnimationFrame(updateHeaderHeight);
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

  // 5. Desktop Mega Menu Hover Intent & Debounced Dismissal (300ms buffer)
  let activeLeaveTimer = null;

  menuParents.forEach((parent) => {
    const link = parent.querySelector('> a');
    if (!link) return;

    const showMenu = () => {
      if (window.innerWidth < 1200) return;
      if (activeLeaveTimer) {
        clearTimeout(activeLeaveTimer);
        activeLeaveTimer = null;
      }
      // Close sibling menus immediately
      menuParents.forEach((p) => {
        if (p !== parent) {
          p.classList.remove('is-active');
          const siblingLink = p.querySelector('> a');
          if (siblingLink) siblingLink.setAttribute('aria-expanded', 'false');
        }
      });
      parent.classList.add('is-active');
      link.setAttribute('aria-expanded', 'true');
    };

    const hideMenuWithDelay = () => {
      if (window.innerWidth < 1200) return;
      if (activeLeaveTimer) clearTimeout(activeLeaveTimer);
      activeLeaveTimer = setTimeout(() => {
        parent.classList.remove('is-active');
        link.setAttribute('aria-expanded', 'false');
      }, 300); // 300ms buffer allows user to travel from root nav item into dropdown
    };

    parent.addEventListener('mouseenter', showMenu);
    parent.addEventListener('mouseleave', hideMenuWithDelay);

    parent.addEventListener('focusin', showMenu);
    parent.addEventListener('focusout', (e) => {
      if (window.innerWidth >= 1200 && !parent.contains(e.relatedTarget)) {
        hideMenuWithDelay();
      }
    });
  });
})();
