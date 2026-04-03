/**
 * Experience Page Module
 * Handles header transparency on scroll.
 * Horizontal scroll logic removed — page uses editorial vertical layout.
 */

const ExperienceScroll = (function () {
  'use strict';

  const config = {
    scrollThreshold: 50
  };

  let header = null;

  function updateHeader(scrollY) {
    if (!header) return;
    header.classList.toggle('is-scrolled', scrollY > config.scrollThreshold);
  }

  function onScroll() {
    requestAnimationFrame(function () {
      updateHeader(window.pageYOffset);
    });
  }

  function init() {
    header = document.getElementById('header');

    window.addEventListener('scroll', onScroll, { passive: true });

    // Run once on load to set correct initial state
    updateHeader(window.pageYOffset);
  }

  function destroy() {
    window.removeEventListener('scroll', onScroll);
    header = null;
  }

  return { init, destroy };
})();

document.addEventListener('DOMContentLoaded', function () {
  ExperienceScroll.init();

  if (typeof Animations !== 'undefined') {
    Animations.init();
  }
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ExperienceScroll;
}
