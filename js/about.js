/* ==========================================================================
   About Page - JavaScript
   Image slideshow and interactions
   ========================================================================== */

const AboutPage = (function() {
  'use strict';

  // Configuration
  const config = {
    slideshow: {
      interval: 4000, // milliseconds between slides
      transitionDuration: 1000
    }
  };

  // State
  let slideshowInterval = null;
  let currentSlide = 0;
  let slides = [];

  /**
   * Initialize interests slideshow
   */
  function initSlideshow() {
    const slideshow = document.getElementById('interestsSlideshow');
    if (!slideshow) return;

    slides = slideshow.querySelectorAll('.slideshow-slide');
    if (slides.length <= 1) return;

    // Start automatic slideshow
    startSlideshow();

    // Pause on hover (optional)
    slideshow.addEventListener('mouseenter', stopSlideshow);
    slideshow.addEventListener('mouseleave', startSlideshow);
  }

  /**
   * Start slideshow interval
   */
  function startSlideshow() {
    if (slideshowInterval) return;

    slideshowInterval = setInterval(() => {
      nextSlide();
    }, config.slideshow.interval);
  }

  /**
   * Stop slideshow interval
   */
  function stopSlideshow() {
    if (slideshowInterval) {
      clearInterval(slideshowInterval);
      slideshowInterval = null;
    }
  }

  /**
   * Go to next slide
   */
  function nextSlide() {
    if (slides.length === 0) return;

    // Remove active class from current
    slides[currentSlide].classList.remove('slideshow-slide--active');

    // Move to next slide
    currentSlide = (currentSlide + 1) % slides.length;

    // Add active class to new current
    slides[currentSlide].classList.add('slideshow-slide--active');
  }

  /**
   * Go to specific slide
   */
  function goToSlide(index) {
    if (index < 0 || index >= slides.length) return;

    slides[currentSlide].classList.remove('slideshow-slide--active');
    currentSlide = index;
    slides[currentSlide].classList.add('slideshow-slide--active');
  }

  /**
   * Initialize scroll-triggered section backgrounds
   */
  function initSectionObserver() {
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '-50px 0px'
    });

    sections.forEach(section => observer.observe(section));
  }

  /**
   * Initialize all about page features
   */
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initAll);
    } else {
      initAll();
    }
  }

  function initAll() {
    initSlideshow();
    initSectionObserver();
  }

  /**
   * Cleanup function
   */
  function destroy() {
    stopSlideshow();
  }

  // Public API
  return {
    init,
    destroy,
    nextSlide,
    goToSlide
  };

})();

// Auto-initialize when script loads
AboutPage.init();
