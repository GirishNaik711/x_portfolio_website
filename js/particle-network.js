/**
 * Particle Network Module
 * Full-page Canvas 2D particle network with mouse interaction.
 * Dark particles on light background, proximity-based connections.
 * Zero external dependencies.
 */

const ParticleNetwork = (function() {
  'use strict';

  let canvas = null;
  let ctx = null;
  let particles = [];
  let animationId = null;
  let mouse = { x: -9999, y: -9999 };
  let resizeTimer = null;
  let reducedMotion = false;
  let motionQuery = null;

  // Responsive config
  function getConfig() {
    const isMobile = window.innerWidth < 768;
    return {
      particleCount: isMobile ? 40 : 90,
      connectionDist: isMobile ? 100 : 150,
      mouseDist: isMobile ? 120 : 200,
      minRadius: 1.5,
      maxRadius: 3,
      minSpeed: 0.15,
      maxSpeed: 0.5,
      particleColor: '#1C1C1C',
      lineOpacity: 0.15,
      mouseLineOpacity: 0.25
    };
  }

  let config = getConfig();

  /**
   * Create a single particle with random properties
   */
  function createParticle() {
    const angle = Math.random() * Math.PI * 2;
    const speed = config.minSpeed + Math.random() * (config.maxSpeed - config.minSpeed);
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: config.minRadius + Math.random() * (config.maxRadius - config.minRadius)
    };
  }

  /**
   * Populate particle array for current canvas dimensions
   */
  function createParticles() {
    config = getConfig();
    particles = [];
    for (let i = 0; i < config.particleCount; i++) {
      particles.push(createParticle());
    }
  }

  /**
   * Update particle positions, bouncing off edges
   */
  function updateParticles() {
    const w = canvas.width;
    const h = canvas.height;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      // Clamp to bounds
      if (p.x < 0) p.x = 0;
      if (p.x > w) p.x = w;
      if (p.y < 0) p.y = 0;
      if (p.y > h) p.y = h;
    }
  }

  /**
   * Draw all particles and connection lines
   */
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const connDistSq = config.connectionDist * config.connectionDist;
    const mouseDistSq = config.mouseDist * config.mouseDist;
    const len = particles.length;

    // Draw connections between particles
    for (let i = 0; i < len; i++) {
      const a = particles[i];

      for (let j = i + 1; j < len; j++) {
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < connDistSq) {
          const opacity = config.lineOpacity * (1 - distSq / connDistSq);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = 'rgba(28, 28, 28, ' + opacity + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Draw mouse connections
      const mdx = a.x - mouse.x;
      const mdy = a.y - mouse.y;
      const mDistSq = mdx * mdx + mdy * mdy;

      if (mDistSq < mouseDistSq) {
        const opacity = config.mouseLineOpacity * (1 - mDistSq / mouseDistSq);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = 'rgba(28, 28, 28, ' + opacity + ')';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }

    // Draw particles
    ctx.fillStyle = config.particleColor;
    for (let i = 0; i < len; i++) {
      const p = particles[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  /**
   * Main animation loop
   */
  function animate() {
    updateParticles();
    draw();
    animationId = requestAnimationFrame(animate);
  }

  /**
   * Render a single static frame (for reduced motion)
   */
  function renderStaticFrame() {
    draw();
  }

  /**
   * Size canvas to window dimensions (uses devicePixelRatio for sharpness)
   */
  function sizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.scale(dpr, dpr);
  }

  /**
   * Handle resize with debounce
   */
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      sizeCanvas();
      createParticles();
      if (reducedMotion) {
        renderStaticFrame();
      }
    }, 150);
  }

  /**
   * Mouse/touch tracking
   */
  function onMouseMove(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }

  function onMouseLeave() {
    mouse.x = -9999;
    mouse.y = -9999;
  }

  function onTouchMove(e) {
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
  }

  function onTouchEnd() {
    mouse.x = -9999;
    mouse.y = -9999;
  }

  /**
   * Handle reduced motion preference changes
   */
  function onMotionChange() {
    reducedMotion = motionQuery && motionQuery.matches;

    if (reducedMotion) {
      // Stop animation loop, show static frame
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
      renderStaticFrame();
    } else {
      // Resume animation
      if (!animationId) {
        animate();
      }
    }
  }

  /**
   * Initialize the particle network
   */
  function init() {
    canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check reduced motion preference
    motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotion = motionQuery.matches;

    // Size canvas and create particles
    sizeCanvas();
    createParticles();

    // Start animation or render static frame
    if (reducedMotion) {
      renderStaticFrame();
    } else {
      animate();
    }

    // Event listeners
    window.addEventListener('resize', onResize);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('touchmove', onTouchMove, { passive: true });
    document.addEventListener('touchend', onTouchEnd);

    // Listen for live reduced motion changes
    if (motionQuery.addEventListener) {
      motionQuery.addEventListener('change', onMotionChange);
    } else if (motionQuery.addListener) {
      motionQuery.addListener(onMotionChange);
    }
  }

  /**
   * Destroy and clean up
   */
  function destroy() {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }

    window.removeEventListener('resize', onResize);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseleave', onMouseLeave);
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);

    if (motionQuery) {
      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener('change', onMotionChange);
      } else if (motionQuery.removeListener) {
        motionQuery.removeListener(onMotionChange);
      }
    }

    particles = [];
    canvas = null;
    ctx = null;
  }

  /**
   * Manual resize trigger
   */
  function resize() {
    if (canvas && ctx) {
      sizeCanvas();
      createParticles();
      if (reducedMotion) {
        renderStaticFrame();
      }
    }
  }

  // Public API
  return {
    init: init,
    destroy: destroy,
    resize: resize
  };
})();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ParticleNetwork;
}
