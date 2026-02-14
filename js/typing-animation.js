/**
 * Typing Animation
 * Cycles through titles with a typewriter effect
 */

(function() {
  'use strict';

  const titles = ['ML Engineer', 'AI Architect', 'Data Scientist'];
  const typingElement = document.querySelector('.home__typing-text');

  if (!typingElement) return;

  const typeSpeed = 100;      // ms per character when typing
  const deleteSpeed = 50;     // ms per character when deleting
  const pauseDuration = 2000; // ms to pause at end of each title

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      // Deleting characters
      charIndex--;
      typingElement.textContent = currentTitle.substring(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        setTimeout(type, typeSpeed);
      } else {
        setTimeout(type, deleteSpeed);
      }
    } else {
      // Typing characters
      charIndex++;
      typingElement.textContent = currentTitle.substring(0, charIndex);

      if (charIndex === currentTitle.length) {
        // Finished typing, pause then start deleting
        isDeleting = true;
        setTimeout(type, pauseDuration);
      } else {
        setTimeout(type, typeSpeed);
      }
    }
  }

  // Start the animation when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', type);
  } else {
    type();
  }
})();
