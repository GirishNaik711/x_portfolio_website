/**
 * Animations Module
 * Handles scroll-triggered animations, word animations, and count-up effects
 */

const Animations = (function() {
  'use strict';

  // Configuration
  const config = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  // Store observer instance
  let observer = null;

  // Loading screen configuration
  const loadingConfig = {
    initialDelay: 1500,    // Time before text starts splitting
    splitDuration: 1000,   // Duration of split animation
    holdDuration: 1500,    // Time to show the split state with placeholder
    fadeOutDuration: 600   // Time for loading screen to fade out
  };

  /**
   * Initialize loading screen with text-split animation
   */
  function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (!loadingScreen) return;

    // Create and add custom cursor
    const cursor = document.createElement('div');
    cursor.className = 'loading-screen__cursor';
    cursor.textContent = 'Loading...';
    document.body.appendChild(cursor);

    // Track mouse position for custom cursor
    function updateCursor(e) {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    }

    document.addEventListener('mousemove', updateCursor);

    // Prevent scrolling during loading
    document.body.style.overflow = 'hidden';

    // Animation sequence
    setTimeout(() => {
      // Step 1: Start the split animation
      loadingScreen.classList.add('is-split');

      setTimeout(() => {
        // Step 2: Begin transition out
        loadingScreen.classList.add('is-transitioning');

        setTimeout(() => {
          // Step 3: Hide loading screen
          loadingScreen.classList.add('is-hidden');

          // Remove cursor and restore normal cursor
          cursor.remove();
          document.removeEventListener('mousemove', updateCursor);
          document.body.style.cursor = '';

          // Re-enable scrolling
          document.body.style.overflow = '';

          // Clean up loading screen from DOM after transition
          setTimeout(() => {
            loadingScreen.remove();
          }, loadingConfig.fadeOutDuration);

        }, loadingConfig.holdDuration);

      }, loadingConfig.splitDuration);

    }, loadingConfig.initialDelay);
  }

  /**
   * Initialize Intersection Observer for scroll animations
   */
  function initScrollAnimations() {
    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback: show all elements
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.classList.add('is-visible');
      });
      return;
    }

    // Create observer
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');

          // Handle word animations
          if (entry.target.classList.contains('word-animate')) {
            animateWords(entry.target);
          }

          // Handle count-up animations
          const countElements = entry.target.querySelectorAll('.count-up');
          countElements.forEach(el => animateCountUp(el));

          // Handle highlight animations
          const highlightElements = entry.target.querySelectorAll('.highlight');
          highlightElements.forEach(el => el.classList.add('is-visible'));

          // Handle SVG draw animations
          if (entry.target.classList.contains('svg-draw')) {
            entry.target.classList.add('is-visible');
          }

          // Optionally unobserve after animation (for performance)
          // observer.unobserve(entry.target);
        }
      });
    }, config);

    // Observe all elements with animation classes
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });

    // Also observe word-animate elements
    document.querySelectorAll('.word-animate').forEach(el => {
      observer.observe(el);
    });

    // Observe SVG draw elements
    document.querySelectorAll('.svg-draw').forEach(el => {
      observer.observe(el);
    });
  }

  /**
   * Animate words one by one
   * @param {HTMLElement} container - Container with words to animate
   */
  function animateWords(container) {
    const words = container.querySelectorAll('.word');

    words.forEach((word, index) => {
      setTimeout(() => {
        word.style.opacity = '1';
        word.style.transform = 'translateY(0)';
      }, index * 50);
    });
  }

  /**
   * Split text into words and wrap each in a span
   * Call this on elements that need word-by-word animation
   * @param {HTMLElement} element - Element containing text to split
   */
  function splitIntoWords(element) {
    const text = element.textContent;
    const words = text.split(' ');

    element.innerHTML = words.map(word =>
      `<span class="word">${word}</span>`
    ).join(' ');
  }

  /**
   * Animate number count-up effect
   * @param {HTMLElement} element - Element with data-target attribute
   */
  function animateCountUp(element) {
    const target = parseInt(element.getAttribute('data-target'), 10);

    if (isNaN(target)) return;

    const duration = 2000; // 2 seconds
    const start = 0;
    const startTime = performance.now();

    function updateCount(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const current = Math.floor(start + (target - start) * easeOut);
      element.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        element.textContent = target;
      }
    }

    requestAnimationFrame(updateCount);
  }

  /**
   * Add parallax effect to elements
   * @param {string} selector - CSS selector for parallax elements
   */
  function initParallax(selector = '.parallax') {
    const elements = document.querySelectorAll(selector);

    if (elements.length === 0) return;

    // Debounced scroll handler
    let ticking = false;

    function updateParallax() {
      const scrollY = window.pageYOffset;

      elements.forEach(el => {
        const speed = parseFloat(getComputedStyle(el).getPropertyValue('--parallax-speed')) || 0.5;
        const rect = el.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const offset = (scrollY - elementTop) * speed;

        el.style.transform = `translateY(${offset}px)`;
      });

      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  /**
   * Initialize page transition effects
   */
  function initPageTransitions() {
    const transition = document.getElementById('pageTransition');
    if (!transition) return;

    // Fade out on page load
    window.addEventListener('load', () => {
      transition.classList.remove('is-active');
    });

    // Fade in before navigating
    document.querySelectorAll('a:not([target="_blank"]):not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"])').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        // Skip if same page or external link
        if (!href || href === '#' || href.startsWith('http')) return;

        e.preventDefault();
        transition.classList.add('is-active');

        setTimeout(() => {
          window.location.href = href;
        }, 300);
      });
    });
  }

  /**
   * Add hover tilt effect to cards
   * @param {string} selector - CSS selector for tilt elements
   */
  function initTiltEffect(selector = '.card') {
    const cards = document.querySelectorAll(selector);

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }

  /**
   * Initialize character-by-character animation
   * @param {HTMLElement} element - Element to animate
   */
  function initCharacterAnimation(element) {
    const text = element.textContent;
    const chars = text.split('');

    element.innerHTML = chars.map((char, i) =>
      char === ' ' ? ' ' : `<span class="char" style="transition-delay: ${i * 30}ms">${char}</span>`
    ).join('');
  }

  /**
   * Refresh animations (useful after dynamic content load)
   */
  function refresh() {
    if (observer) {
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        if (!el.classList.contains('is-visible')) {
          observer.observe(el);
        }
      });
    }
  }

  /**
   * Destroy observer and clean up
   */
  function destroy() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  }

  /**
   * Initialize all animation features
   */
  function init() {
    // Initialize loading screen first (if on homepage)
    initLoadingScreen();

    initScrollAnimations();
    initPageTransitions();

    // Initialize particle network for homepage
    if (typeof ParticleNetwork !== 'undefined') {
      ParticleNetwork.init();
    }

    // Optional: Enable these if you want the effects
    // initParallax();
    // initTiltEffect();
  }

  // Public API
  return {
    init,
    refresh,
    destroy,
    animateCountUp,
    animateWords,
    splitIntoWords,
    initParallax,
    initTiltEffect,
    initCharacterAnimation,
    initLoadingScreen
  };
})();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Animations;
}
