/**
 * Experience Page - Horizontal Scroll Module
 * Handles scroll-driven horizontal timeline and header transparency
 */

const ExperienceScroll = (function() {
  'use strict';

  // Configuration
  const config = {
    scrollThreshold: 50,    // Pixels scrolled before header becomes opaque
    mobileBreakpoint: 1024  // Below this width, use vertical layout
  };

  // DOM references
  let section = null;
  let viewport = null;
  let track = null;
  let header = null;

  // Calculated dimensions
  let sectionTop = 0;
  let sectionHeight = 0;
  let trackWidth = 0;
  let viewportWidth = 0;

  /**
   * Check if we should use horizontal scroll (desktop only)
   */
  function shouldUseHorizontalScroll() {
    return window.innerWidth > config.mobileBreakpoint;
  }

  /**
   * Calculate and cache dimensions for scroll calculations
   */
  function calculateDimensions() {
    if (!section || !track || !viewport) return;

    const rect = section.getBoundingClientRect();
    sectionTop = rect.top + window.pageYOffset;
    sectionHeight = section.offsetHeight;
    trackWidth = track.scrollWidth;
    viewportWidth = viewport.offsetWidth;
  }

  /**
   * Calculate scroll progress within the horizontal section (0-1)
   */
  function getScrollProgress() {
    const scrollY = window.pageYOffset;
    const scrollableDistance = sectionHeight - window.innerHeight;

    if (scrollableDistance <= 0) return 0;

    const scrolledInSection = scrollY - sectionTop;
    return Math.max(0, Math.min(1, scrolledInSection / scrollableDistance));
  }

  /**
   * Update track horizontal position based on scroll progress
   */
  function updateTrackPosition(progress) {
    if (!track || !shouldUseHorizontalScroll()) return;

    // Calculate maximum translation needed
    const maxTranslate = trackWidth - viewportWidth + 100; // 100px padding
    const translateX = -progress * maxTranslate;

    track.style.transform = `translateX(${translateX}px)`;
  }

  /**
   * Handle header transparency on scroll
   */
  function updateHeader(scrollY) {
    if (!header) return;

    if (scrollY > config.scrollThreshold) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  /**
   * Main update function - runs on each scroll frame
   */
  function update() {
    const scrollY = window.pageYOffset;

    // Always update header
    updateHeader(scrollY);

    // Only update horizontal scroll on desktop
    if (!shouldUseHorizontalScroll()) return;

    const progress = getScrollProgress();
    updateTrackPosition(progress);
  }

  /**
   * Scroll event handler with RAF
   */
  function onScroll() {
    requestAnimationFrame(update);
  }

  /**
   * Resize event handler
   */
  function onResize() {
    calculateDimensions();

    // Reset transform if switching to mobile
    if (!shouldUseHorizontalScroll() && track) {
      track.style.transform = 'none';
    }

    update();
  }

  /**
   * Initialize the module
   */
  function init() {
    // Get DOM references
    section = document.getElementById('experienceHorizontal');
    viewport = document.getElementById('experienceViewport');
    track = document.getElementById('experienceTrack');
    header = document.getElementById('header');

    if (!section || !viewport || !track) {
      console.warn('ExperienceScroll: Required elements not found');
      return;
    }

    // Calculate initial dimensions
    calculateDimensions();

    // Add event listeners
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    // Initial update
    update();
  }

  /**
   * Destroy the module and clean up
   */
  function destroy() {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);

    section = null;
    viewport = null;
    track = null;
    header = null;
  }

  // Public API
  return {
    init,
    destroy
  };
})();

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  ExperienceScroll.init();

  // Also initialize Animations module for scroll animations
  if (typeof Animations !== 'undefined') {
    Animations.init();
  }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ExperienceScroll;
}
