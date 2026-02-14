/**
 * Navigation Module
 * Handles mobile menu toggle, smooth scrolling, and active states
 */

const Navigation = (function() {
  'use strict';

  // DOM Elements
  let nav = null;
  let navToggle = null;
  let header = null;

  // State
  let isOpen = false;
  let lastScrollY = 0;
  let ticking = false;

  /**
   * Initialize navigation
   */
  function init() {
    // Cache DOM elements
    nav = document.getElementById('mainNav');
    navToggle = document.getElementById('navToggle');
    header = document.getElementById('header');

    if (!nav || !navToggle) {
      console.warn('Navigation elements not found');
      return;
    }

    // Set up event listeners
    setupToggle();
    setupNavLinks();
    setupSmoothScroll();
    setupScrollBehavior();
    setActiveState();
  }

  /**
   * Set up mobile menu toggle
   */
  function setupToggle() {
    navToggle.addEventListener('click', toggleMenu);

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (isOpen && !nav.contains(e.target) && !navToggle.contains(e.target)) {
        closeMenu();
      }
    });
  }

  /**
   * Toggle menu open/closed
   */
  function toggleMenu() {
    isOpen = !isOpen;

    nav.classList.toggle('is-open', isOpen);
    navToggle.classList.toggle('is-active', isOpen);

    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? 'hidden' : '';

    // Update ARIA attributes
    navToggle.setAttribute('aria-expanded', isOpen);

    // Focus management
    if (isOpen) {
      const firstLink = nav.querySelector('.nav__link');
      if (firstLink) firstLink.focus();
    }
  }

  /**
   * Close menu
   */
  function closeMenu() {
    isOpen = false;
    nav.classList.remove('is-open');
    navToggle.classList.remove('is-active');
    document.body.style.overflow = '';
    navToggle.setAttribute('aria-expanded', 'false');
  }

  /**
   * Open menu
   */
  function openMenu() {
    isOpen = true;
    nav.classList.add('is-open');
    navToggle.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    navToggle.setAttribute('aria-expanded', 'true');
  }

  /**
   * Set up nav link click handlers
   */
  function setupNavLinks() {
    const navLinks = nav.querySelectorAll('.nav__link');

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        // Close mobile menu when link is clicked
        if (isOpen) {
          closeMenu();
        }
      });
    });
  }

  /**
   * Set up smooth scrolling for anchor links
   */
  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Skip if just "#"
        if (href === '#') return;

        const target = document.querySelector(href);

        if (target) {
          e.preventDefault();

          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Update URL without jumping
          history.pushState(null, null, href);
        }
      });
    });
  }

  /**
   * Set up scroll behavior (hide/show header)
   */
  function setupScrollBehavior() {
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });
  }

  /**
   * Update header visibility based on scroll direction
   */
  function updateHeader() {
    const scrollY = window.pageYOffset;
    const scrollThreshold = 100;

    // Add shadow when scrolled
    if (scrollY > 10) {
      header.style.boxShadow = '0 1px 0 rgba(0, 0, 0, 0.05)';
    } else {
      header.style.boxShadow = 'none';
    }

    // Hide/show header based on scroll direction (optional)
    // Uncomment below to enable hide on scroll down behavior
    /*
    if (scrollY > lastScrollY && scrollY > scrollThreshold) {
      // Scrolling down
      header.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      header.style.transform = 'translateY(0)';
    }
    */

    lastScrollY = scrollY;
    ticking = false;
  }

  /**
   * Set active state on current page link
   */
  function setActiveState() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav__link, .tab-nav__item');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');

      // Check if this link matches current page
      if (href && (
        currentPath.endsWith(href) ||
        (href === 'index.html' && (currentPath === '/' || currentPath.endsWith('/')))
      )) {
        link.classList.add('nav__link--active', 'tab-nav__item--active');
      } else {
        link.classList.remove('nav__link--active', 'tab-nav__item--active');
      }
    });
  }

  /**
   * Get current menu state
   * @returns {boolean}
   */
  function isMenuOpen() {
    return isOpen;
  }

  /**
   * Destroy navigation and remove event listeners
   */
  function destroy() {
    if (navToggle) {
      navToggle.removeEventListener('click', toggleMenu);
    }
    closeMenu();
  }

  // Public API
  return {
    init,
    toggleMenu,
    openMenu,
    closeMenu,
    isMenuOpen,
    setActiveState,
    destroy
  };
})();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Navigation;
}
