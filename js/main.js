/**
 * Main Application Entry Point
 * Initializes all modules and handles global functionality
 */

(function() {
  'use strict';

  // ---------------------------------------------------------------------------
  // EmailJS credentials — Replace with your EmailJS credentials
  // ---------------------------------------------------------------------------
  var EMAILJS_SERVICE_ID  = 'Yservice_ycguo1b';   // Replace with your EmailJS credentials
  var EMAILJS_TEMPLATE_ID = 'template_a6eqmde';  // Replace with your EmailJS credentials
  var EMAILJS_PUBLIC_KEY  = 'VdeX-G4miDBt49Ur9';   // Replace with your EmailJS credentials

  /**
   * Homepage Navigation Hover Effect
   * Updates watermark text on nav item hover
   */
  const HomeNav = (function() {
    let nav, items, watermark;

    function init() {
      nav = document.querySelector('.home__nav');
      if (!nav) return;

      items = document.querySelectorAll('.home__nav-item');
      watermark = document.querySelector('.home__nav-watermark');

      if (!watermark || !items.length) return;

      items.forEach(item => {
        item.addEventListener('mouseenter', handleItemHover);
      });

      nav.addEventListener('mouseleave', handleNavLeave);
    }

    function handleItemHover(e) {
      const label = e.currentTarget.dataset.label;
      if (label && watermark) {
        watermark.textContent = label;
      }
    }

    function handleNavLeave() {
      if (watermark) {
        watermark.textContent = '';
      }
    }

    return { init };
  })();

  /**
   * Initialize application when DOM is ready
   */
  function init() {
    // Initialize EmailJS SDK
    if (typeof emailjs !== 'undefined') {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    // Initialize homepage navigation
    HomeNav.init();

    // Initialize navigation
    if (typeof Navigation !== 'undefined') {
      Navigation.init();
    }

    // Initialize animations
    if (typeof Animations !== 'undefined') {
      Animations.init();
    }

    // Initialize any additional features
    initFormHandling();
    initLazyLoading();
    initAccessibility();

    // Log initialization (remove in production)
    console.log('Portfolio initialized');
  }

  /**
   * Handle form submissions via EmailJS
   */
  function initFormHandling() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('[type="submit"]');
        const originalLabel = submitBtn ? submitBtn.textContent : null;

        // Disable button to prevent double-submission
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Sending...';
        }

        // Guard: fall back gracefully if EmailJS was not loaded
        if (typeof emailjs === 'undefined') {
          showNotification('Email service unavailable. Please try again later.', 'error');
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalLabel;
          }
          return;
        }

        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
          .then(function() {
            showNotification('Message sent successfully!', 'success');
            form.reset();
          })
          .catch(function() {
            showNotification('Failed to send. Please try again.', 'error');
          })
          .finally(function() {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.textContent = originalLabel;
            }
          });
      });
    });
  }

  /**
   * Show notification message
   * @param {string} message - Message to display
   * @param {string} type - Type of notification (success, error, info)
   */
  function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
      <span>${message}</span>
      <button class="notification__close" aria-label="Close">&times;</button>
    `;

    // Add styles dynamically
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 16px 24px;
      background-color: ${type === 'success' ? '#22C55E' : type === 'error' ? '#EF4444' : '#1C1C1C'};
      color: white;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 12px;
      z-index: 9999;
      animation: slideIn 0.3s ease;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;

    // Add animation keyframes if not exists
    if (!document.getElementById('notification-styles')) {
      const style = document.createElement('style');
      style.id = 'notification-styles';
      style.textContent = `
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
        .notification__close {
          background: none;
          border: none;
          color: white;
          font-size: 20px;
          cursor: pointer;
          padding: 0;
          line-height: 1;
        }
      `;
      document.head.appendChild(style);
    }

    // Append to body
    document.body.appendChild(notification);

    // Close button handler
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', () => {
      removeNotification(notification);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
      removeNotification(notification);
    }, 5000);
  }

  /**
   * Remove notification with animation
   * @param {HTMLElement} notification
   */
  function removeNotification(notification) {
    notification.style.animation = 'slideOut 0.3s ease forwards';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }

  /**
   * Initialize lazy loading for images
   */
  function initLazyLoading() {
    // Check for native lazy loading support
    if ('loading' in HTMLImageElement.prototype) {
      // Browser supports native lazy loading
      document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
        img.loading = 'lazy';
      });
    } else {
      // Fallback to Intersection Observer
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  /**
   * Initialize accessibility features
   */
  function initAccessibility() {
    // Skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(skipLink.getAttribute('href'));
        if (target) {
          target.tabIndex = -1;
          target.focus();
        }
      });
    }

    // Keyboard navigation for cards
    document.querySelectorAll('.card').forEach(card => {
      const link = card.querySelector('a, .card__cta');
      if (link) {
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            link.click();
          }
        });
      }
    });

    // Focus visible polyfill behavior
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });

    // Add styles for keyboard focus
    const focusStyles = document.createElement('style');
    focusStyles.textContent = `
      .keyboard-navigation *:focus {
        outline: 2px solid var(--color-text-primary);
        outline-offset: 2px;
      }
      .keyboard-navigation *:focus:not(:focus-visible) {
        outline: none;
      }
    `;
    document.head.appendChild(focusStyles);
  }

  /**
   * Utility: Debounce function
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in ms
   * @returns {Function}
   */
  function debounce(func, wait = 100) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Utility: Throttle function
   * @param {Function} func - Function to throttle
   * @param {number} limit - Limit time in ms
   * @returns {Function}
   */
  function throttle(func, limit = 100) {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  /**
   * Handle window resize
   */
  const handleResize = debounce(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth >= 1024 && typeof Navigation !== 'undefined') {
      Navigation.closeMenu();
    }
  }, 250);

  window.addEventListener('resize', handleResize);

  /**
   * Handle visibility change (tab switching)
   */
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // Page is hidden (user switched tabs)
      // Pause any animations if needed
    } else {
      // Page is visible again
      // Resume animations if needed
    }
  });

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose utilities globally if needed
  window.PortfolioUtils = {
    debounce,
    throttle,
    showNotification
  };
})();
