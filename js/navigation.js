(function() {
  var container, button, menu, links, i, len, body, header;

  header = document.getElementById('masthead');

  container = document.getElementById("site-navigation");
  if (!container) {
    return;
  }

  button = container.getElementsByTagName("button")[0];
  if ("undefined" === typeof button) {
    return;
  }

  body = document.body;

  menu = container.getElementsByTagName("ul")[0];

  // Hide menu toggle button if menu is empty and return early.
  if ("undefined" === typeof menu) {
    button.style.display = "none";
    return;
  }

  menu.setAttribute("aria-expanded", "false");
  if (-1 === menu.className.indexOf("nav-menu")) {
    menu.className += " nav-menu";
  }

  window.addEventListener('scroll', () => {
    console.log(header.offsetTop)
    if (window.scrollY > header.offsetTop + 30) {
      header.classList.add('fixed');
    } else {
      header.classList.remove('fixed');
    }
  });

  button.onclick = function() {
    if (-1 !== container.className.indexOf("toggled")) {
      container.className = container.className.replace(" toggled", "");
      button.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-expanded", "false");
      body.classList.remove("enableMenu");
    } else {
      container.className += " toggled";
      button.setAttribute("aria-expanded", "true");
      menu.setAttribute("aria-expanded", "true");
      body.classList.add("enableMenu");
    }
  };

  // Get all the link elements within the menu.
  links = menu.getElementsByTagName("a");

  // // Each time a menu link is focused or blurred, toggle focus.
  // for (i = 0, len = links.length; i < len; i++) {
  //   links[i].addEventListener("focus", toggleFocus, true);
  //   links[i].addEventListener("blur", toggleFocus, true);
  // }

  /**
	 * Sets or removes .focus class on an element.
	 */
  function toggleFocus() {
    var self = this;

    // Move up through the ancestors of the current link until we hit .nav-menu.
    while (-1 === self.className.indexOf("nav-menu")) {
      // On li elements toggle the class .focus.
      if ("li" === self.tagName.toLowerCase()) {
        if (-1 !== self.className.indexOf("focus")) {
          self.className = self.className.replace(" focus", "");
        } else {
          self.className += " focus";
        }
      }
      self = self.parentElement;
    }
  }

  /**
	 * Enables submenu access on touch devices.
	 */
  (function(container) {
    var touchStartFn,
      i,
      parentLink = container.querySelectorAll(
        ".menu-item-has-children > a, .page_item_has_children > a"
      ),
      toggleIcons = container.querySelectorAll(".submenu-toggle");

    if ("ontouchstart" in window) {
      touchStartFn = function(e) {
        var menuItem = this.parentNode,
          i;

        if (!menuItem.classList.contains("focus")) {
          e.preventDefault();
          for (i = 0; i < menuItem.parentNode.children.length; ++i) {
            if (menuItem === menuItem.parentNode.children[i]) {
              continue;
            }
            menuItem.parentNode.children[i].classList.remove("focus");
          }
          menuItem.classList.add("focus");

          var subMenu = menuItem.querySelector(".sub-menu");
          if (subMenu) {
            subMenu.style.maxHeight = "100vh";
            subMenu.style.opacity = "1";
            animateMenuItems(subMenu, true);
          }
        } else {
          menuItem.classList.remove("focus");

          var subMenu = menuItem.querySelector(".sub-menu");
          if (subMenu) {
            subMenu.style.maxHeight = null;
            subMenu.style.opacity = "0";
            animateMenuItems(subMenu, false);
          }
        }
      };

      for (i = 0; i < parentLink.length; ++i) {
        parentLink[i].addEventListener("touchstart", touchStartFn, false);
      }
    }

    // Add click event to toggle icons to open/close submenus
    toggleIcons.forEach(function(icon) {
      icon.addEventListener("click", function(e) {
        e.preventDefault();
        const menuItem = icon.closest(".menu-item-has-children");

        if (menuItem.classList.contains("focus")) {
          menuItem.classList.remove("focus");
          body.classList.remove("enableMenu");
          var subMenu = menuItem.querySelector(".sub-menu");
          if (subMenu) {
            subMenu.style.maxHeight = null;
            subMenu.style.opacity = "0";
            animateMenuItems(subMenu, false);
          }
        } else {
          var subMenu = menuItem.querySelector(".sub-menu");
          if (subMenu) {
            subMenu.style.maxHeight = "100vh";
            subMenu.style.opacity = "1";
            animateMenuItems(subMenu, true);
          }
          menuItem.classList.add("focus");
          body.classList.add("enableMenu");
        }
      });
    });

    // Function to animate submenu items
    function animateMenuItems(subMenu, isOpening) {
      const menuItems = subMenu.querySelectorAll("li");
      menuItems.forEach((item, index) => {
        item.style.transition = `opacity 0.5s ease ${index *
          0.1}s, transform 0.5s ease ${index * 0.1}s`;
        if (isOpening) {
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        } else {
          item.style.opacity = "0";
          item.style.transform = "translateY(20px)";
          item.style.transitionDelay = "0s";
        }
      });
    }
  })(container);
})();
