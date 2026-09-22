/**
 * Navigation & Mega Menu Accessibility Handler
 * Supports smooth desktop hover/focus states, keyboard accessibility (Tab, Escape),
 * and accessible single-accordion mobile drawer navigation.
 *
 * @package kiwatinook
 */
(function () {
  'use strict';

  const header = document.getElementById('masthead');
  const navContainer = document.getElementById('site-navigation');
  if (!navContainer) return;

  const hamburger = document.getElementById('bar_menu') || navContainer.querySelector('.c-hamburger');
  const menuParents = navContainer.querySelectorAll('.mega-menu-parent, .menu-item-has-children');

  // Helper: check if currently in mobile viewport (< 1200px)
  const isMobileViewport = () => window.innerWidth < 1200;

  // Helper: safely get direct anchor element
  const getDirectAnchor = (el) => (el ? (el.querySelector(':scope > a') || el.querySelector('a')) : null);

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

  // Helper: Close all open mobile submenus and reset ARIA attributes
  const closeAllMobileSubmenus = (exceptParent) => {
    menuParents.forEach((p) => {
      if (p !== exceptParent && p.classList.contains('open')) {
        p.classList.remove('open');
        const btn = p.querySelector('.submenu-toggle-btn');
        const link = getDirectAnchor(p);
        const panel = p.querySelector('.mega-menu-panel');

        if (btn) btn.setAttribute('aria-expanded', 'false');
        if (link) link.setAttribute('aria-expanded', 'false');
        if (panel) panel.setAttribute('aria-hidden', 'true');
      }
    });
  };

  // Helper: Toggle a specific parent's mobile accordion
  const toggleMobileSubmenu = (parent) => {
    const isOpen = parent.classList.contains('open');
    const toggleBtn = parent.querySelector('.submenu-toggle-btn');
    const parentLink = getDirectAnchor(parent);
    const panel = parent.querySelector('.mega-menu-panel');

    if (!isOpen) {
      // Single active accordion rule: collapse all other submenus first
      closeAllMobileSubmenus(parent);

      parent.classList.add('open');
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
      if (parentLink) parentLink.setAttribute('aria-expanded', 'true');
      if (panel) panel.setAttribute('aria-hidden', 'false');
    } else {
      parent.classList.remove('open');
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
      if (parentLink) parentLink.setAttribute('aria-expanded', 'false');
      if (panel) panel.setAttribute('aria-hidden', 'true');
    }
  };

  // 2. Mobile Drawer Toggle
  if (hamburger) {
    hamburger.setAttribute('aria-controls', 'site-navigation');
    hamburger.setAttribute('aria-expanded', 'false');

    hamburger.addEventListener('click', (e) => {
      e.preventDefault();
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      const willBeExpanded = !isExpanded;

      hamburger.classList.toggle('is-active', willBeExpanded);
      navContainer.classList.toggle('toggled', willBeExpanded);
      hamburger.setAttribute('aria-expanded', willBeExpanded ? 'true' : 'false');

      if (isMobileViewport()) {
        document.body.classList.toggle('mobile-menu-active', willBeExpanded);
      }

      if (!willBeExpanded) {
        closeAllMobileSubmenus(null);
      }
    });
  }

  // 3. Mobile Submenu Accordion & ARIA Management
  menuParents.forEach((parent) => {
    const toggleBtn = parent.querySelector('.submenu-toggle-btn');
    const parentLink = getDirectAnchor(parent);
    const panel = parent.querySelector('.mega-menu-panel');

    // Initialize initial ARIA state for submenus
    if (panel) {
      panel.setAttribute('aria-hidden', 'true');
    }
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileSubmenu(parent);
      });
    }

    if (parentLink) {
      parentLink.setAttribute('aria-expanded', 'false');
      parentLink.addEventListener('click', (e) => {
        if (isMobileViewport()) {
          // On mobile, tapping parent with children opens/closes accordion
          e.preventDefault();
          e.stopPropagation();
          toggleMobileSubmenu(parent);
        }
      });
    }
  });

  // 4. Responsive Viewport Transition (Desktop <-> Mobile)
  window.addEventListener('resize', () => {
    if (!isMobileViewport()) {
      // Switched to desktop: ensure drawer and accordions reset cleanly
      if (navContainer.classList.contains('toggled')) {
        navContainer.classList.remove('toggled');
        if (hamburger) {
          hamburger.classList.remove('is-active');
          hamburger.setAttribute('aria-expanded', 'false');
        }
        document.body.classList.remove('mobile-menu-active');
      }
      closeAllMobileSubmenus(null);
    }
  }, { passive: true });

  // 5. Keyboard Accessibility: Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllMobileSubmenus(null);

      menuParents.forEach((p) => {
        p.classList.remove('is-active');
        const link = getDirectAnchor(p);
        if (link) link.setAttribute('aria-expanded', 'false');
      });

      if (navContainer.classList.contains('toggled')) {
        navContainer.classList.remove('toggled');
        if (hamburger) {
          hamburger.classList.remove('is-active');
          hamburger.setAttribute('aria-expanded', 'false');
          hamburger.focus();
        }
        document.body.classList.remove('mobile-menu-active');
      }
    }
  });

  // 6. Desktop Mega Menu Hover Intent & Debounced Dismissal (300ms buffer)
  let activeLeaveTimer = null;

  menuParents.forEach((parent) => {
    const link = getDirectAnchor(parent);
    const panel = parent.querySelector('.mega-menu-panel');
    if (!link) return;

    const showMenu = () => {
      if (isMobileViewport()) return;
      if (activeLeaveTimer) {
        clearTimeout(activeLeaveTimer);
        activeLeaveTimer = null;
      }
      // Close sibling menus immediately
      menuParents.forEach((p) => {
        if (p !== parent) {
          p.classList.remove('is-active');
          const siblingLink = getDirectAnchor(p);
          const siblingPanel = p.querySelector('.mega-menu-panel');
          if (siblingLink) siblingLink.setAttribute('aria-expanded', 'false');
          if (siblingPanel) siblingPanel.setAttribute('aria-hidden', 'true');
        }
      });
      parent.classList.add('is-active');
      link.setAttribute('aria-expanded', 'true');
      if (panel) panel.setAttribute('aria-hidden', 'false');
    };

    const hideMenuWithDelay = () => {
      if (isMobileViewport()) return;
      if (activeLeaveTimer) clearTimeout(activeLeaveTimer);
      activeLeaveTimer = setTimeout(() => {
        parent.classList.remove('is-active');
        link.setAttribute('aria-expanded', 'false');
        if (panel) panel.setAttribute('aria-hidden', 'true');
      }, 300); // 300ms buffer allows smooth transit into panel
    };

    parent.addEventListener('mouseenter', showMenu);
    parent.addEventListener('mouseleave', hideMenuWithDelay);

    parent.addEventListener('focusin', showMenu);
    parent.addEventListener('focusout', (e) => {
      if (!isMobileViewport() && !parent.contains(e.relatedTarget)) {
        hideMenuWithDelay();
      }
    });
  });
})();
