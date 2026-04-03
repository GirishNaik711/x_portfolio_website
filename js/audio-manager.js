/**
 * Audio Manager
 * Plays per-section background music across all five pages.
 * Persists each track's playback position independently via sessionStorage
 * so music resumes from where it left off when navigating back.
 *
 * Track map:
 *   ambient  → Home, About, Contact   (Brian Eno – An Ending Ascent)
 *   experience → Experience           (Ennio Morricone – Ecstasy of Gold)
 *   project    → Project              (Bear McCreary – God of War Main Theme)
 */

const AudioManager = (function() {
  'use strict';

  // ── Track configuration ──────────────────────────────────────────────────
  // Each entry: src (relative to HTML root), pages (pathname suffixes),
  // storageTime / storagePlay (independent sessionStorage keys per track).
  var TRACKS = [
    {
      src:         'assets/sounds/home/Brian_Eno_-_An_Ending_Ascent_Remastered_2019_256kbps.webm',
      pages:       ['/', '/index.html', '/about.html', '/contact.html'],
      storageTime: 'pa_ambient_time',
      storagePlay: 'pa_ambient_playing'
    },
    {
      src:         'assets/sounds/experience/The_Ecstasy_of_Gold_-_Ennio_Morricone_The_Good_the_Bad_and_the_Ugly_High_Quality_Audio_128KBPS.mp4',
      pages:       ['/experience.html'],
      storageTime: 'pa_exp_time',
      storagePlay: 'pa_exp_playing'
    },
    {
      src:         'assets/sounds/project/Bear_McCreary_-_God_of_War_Main_Theme_God_of_War_PlayStation_Soundtrack_128KBPS.mp4',
      pages:       ['/project.html'],
      storageTime: 'pa_proj_time',
      storagePlay: 'pa_proj_playing'
    }
  ];

  var TARGET_VOLUME    = 0.25;
  var FADE_STEP_MS     = 50;
  var FADE_DURATION_MS = 1500;

  // ── State ────────────────────────────────────────────────────────────────
  var audio      = null;
  var track      = null;   // active TRACKS entry for this page
  var playerBtn  = null;
  var fadeTimer  = null;

  // ── Page detection ───────────────────────────────────────────────────────
  function detectTrack() {
    var path = window.location.pathname;
    for (var i = 0; i < TRACKS.length; i++) {
      var t = TRACKS[i];
      for (var j = 0; j < t.pages.length; j++) {
        var p = t.pages[j];
        if (p === '/') {
          // Root — match '/' or a trailing slash with no file extension
          if (path === '/' || (path.slice(-1) === '/' && path.indexOf('.') === -1)) {
            return t;
          }
        } else if (path.slice(-p.length) === p) {
          return t;
        }
      }
    }
    return null;
  }

  // ── sessionStorage helpers ───────────────────────────────────────────────
  function readStoredTime() {
    try {
      var raw = sessionStorage.getItem(track.storageTime);
      var t   = parseFloat(raw);
      return (Number.isFinite(t) && t >= 0) ? t : 0;
    } catch (e) {
      return 0;
    }
  }

  function readShouldPlay() {
    try {
      var val = sessionStorage.getItem(track.storagePlay);
      // null → first visit on this track: attempt autoplay
      // '1'  → was playing when user left
      // '0'  → user had paused
      return val === null || val === '1';
    } catch (e) {
      return true;
    }
  }

  function saveState() {
    if (!audio || !track) return;
    try {
      sessionStorage.setItem(track.storageTime, String(audio.currentTime));
      sessionStorage.setItem(track.storagePlay, audio.paused ? '0' : '1');
    } catch (e) {
      // sessionStorage unavailable (e.g. private browsing with storage blocked) — ignore
    }
  }

  // ── Audio ────────────────────────────────────────────────────────────────
  function fadeIn() {
    clearInterval(fadeTimer);
    audio.volume = 0;
    var step = TARGET_VOLUME / (FADE_DURATION_MS / FADE_STEP_MS);
    fadeTimer = setInterval(function() {
      if (audio.volume + step >= TARGET_VOLUME) {
        audio.volume = TARGET_VOLUME;
        clearInterval(fadeTimer);
      } else {
        audio.volume += step;
      }
    }, FADE_STEP_MS);
  }

  function startPlayback() {
    if (!readShouldPlay()) {
      updatePlayerUI();
      return;
    }
    audio.play()
      .then(fadeIn)
      .catch(function() {
        // Autoplay blocked — player shows in paused state; user can click to start
        updatePlayerUI();
      });
  }

  function initAudio() {
    var savedTime  = readStoredTime();
    var shouldSeek = savedTime > 0;

    audio         = new Audio();
    audio.loop    = true;
    audio.volume  = 0;
    audio.preload = 'auto';

    // Seek to saved position once duration is known
    audio.addEventListener('loadedmetadata', function() {
      if (shouldSeek && savedTime < audio.duration) {
        audio.currentTime = savedTime;
        // Start playing only after the seek has settled
        audio.addEventListener('seeked', startPlayback, { once: true });
      }
    }, { once: true });

    // No seek required — play as soon as enough data is buffered
    if (!shouldSeek) {
      audio.addEventListener('canplay', startPlayback, { once: true });
    }

    audio.addEventListener('play',  updatePlayerUI);
    audio.addEventListener('pause', updatePlayerUI);

    // If the file fails to load, hide the player silently
    audio.addEventListener('error', function() {
      if (playerBtn) playerBtn.style.display = 'none';
    });

    // Set src last — this triggers the loading sequence
    audio.src = track.src;
    audio.load();
  }

  // ── Player UI ────────────────────────────────────────────────────────────
  function injectStyles() {
    if (document.getElementById('ap-styles')) return;

    var style = document.createElement('style');
    style.id  = 'ap-styles';
    style.textContent = [
      '.ap-btn {',
      '  position: fixed;',
      '  bottom: 24px;',
      '  right: 24px;',
      '  z-index: 300;',
      '  display: flex;',
      '  align-items: center;',
      '  gap: 8px;',
      '  background: rgba(28, 28, 28, 0.82);',
      '  backdrop-filter: blur(10px);',
      '  -webkit-backdrop-filter: blur(10px);',
      '  color: #EBEBEB;',
      '  border: 1px solid rgba(235, 235, 235, 0.14);',
      '  border-radius: 100px;',
      '  padding: 9px 14px 9px 10px;',
      '  font-family: "JetBrains Mono", monospace;',
      '  font-size: 10px;',
      '  letter-spacing: 0.08em;',
      '  text-transform: uppercase;',
      '  cursor: pointer;',
      '  opacity: 0.72;',
      '  transition: opacity 0.2s ease, transform 0.2s ease;',
      '  outline: none;',
      '  -webkit-user-select: none;',
      '  user-select: none;',
      '}',
      '.ap-btn:hover { opacity: 1; transform: translateY(-1px); }',
      '.ap-btn:focus-visible {',
      '  outline: 2px solid rgba(235,235,235,0.5);',
      '  outline-offset: 3px;',
      '}',
      '.ap-bars {',
      '  display: flex;',
      '  align-items: flex-end;',
      '  gap: 2.5px;',
      '  height: 13px;',
      '  width: 13px;',
      '  flex-shrink: 0;',
      '}',
      '.ap-bar {',
      '  width: 2.5px;',
      '  background: #EBEBEB;',
      '  border-radius: 1px;',
      '  transform-origin: bottom;',
      '  transition: height 0.2s ease;',
      '}',
      '.ap-btn:not(.ap-playing) .ap-bar:nth-child(1) { height: 5px; }',
      '.ap-btn:not(.ap-playing) .ap-bar:nth-child(2) { height: 10px; }',
      '.ap-btn:not(.ap-playing) .ap-bar:nth-child(3) { height: 6px; }',
      '.ap-btn.ap-playing .ap-bar:nth-child(1) { animation: ap1 0.85s ease-in-out infinite; }',
      '.ap-btn.ap-playing .ap-bar:nth-child(2) { animation: ap2 0.85s ease-in-out 0.18s infinite; }',
      '.ap-btn.ap-playing .ap-bar:nth-child(3) { animation: ap3 0.85s ease-in-out 0.34s infinite; }',
      '@keyframes ap1 { 0%,100%{ height:4px } 50%{ height:13px } }',
      '@keyframes ap2 { 0%,100%{ height:10px } 50%{ height:4px } }',
      '@keyframes ap3 { 0%,100%{ height:6px } 50%{ height:12px } }',
      '@media (prefers-reduced-motion: reduce) {',
      '  .ap-btn.ap-playing .ap-bar { animation: none; height: 8px; }',
      '}'
    ].join('\n');

    document.head.appendChild(style);
  }

  function createPlayerButton() {
    playerBtn = document.createElement('button');
    playerBtn.className = 'ap-btn';
    playerBtn.setAttribute('type', 'button');
    playerBtn.setAttribute('aria-label', 'Play background music');

    var bars = document.createElement('span');
    bars.className = 'ap-bars';
    bars.setAttribute('aria-hidden', 'true');
    for (var i = 0; i < 3; i++) {
      var bar = document.createElement('span');
      bar.className = 'ap-bar';
      bars.appendChild(bar);
    }

    var label = document.createElement('span');
    label.textContent = 'Music';

    playerBtn.appendChild(bars);
    playerBtn.appendChild(label);
    playerBtn.addEventListener('click', handleToggle);
    document.body.appendChild(playerBtn);
  }

  function updatePlayerUI() {
    if (!playerBtn || !audio) return;
    var playing = !audio.paused;
    if (playing) {
      playerBtn.classList.add('ap-playing');
    } else {
      playerBtn.classList.remove('ap-playing');
    }
    playerBtn.setAttribute(
      'aria-label',
      playing ? 'Pause background music' : 'Play background music'
    );
  }

  function handleToggle() {
    if (!audio) return;
    if (audio.paused) {
      audio.play()
        .then(function() {
          fadeIn();
          updatePlayerUI();
        })
        .catch(function() {});
    } else {
      clearInterval(fadeTimer);
      audio.pause();
      updatePlayerUI();
    }
    saveState();
  }

  // ── Init ─────────────────────────────────────────────────────────────────
  function init() {
    track = detectTrack();
    if (!track) return;   // this page has no assigned music — do nothing

    injectStyles();
    createPlayerButton();
    initAudio();

    // Persist position on every navigation away from this page
    window.addEventListener('beforeunload', saveState);

    // Also save on tab switch (safety net)
    document.addEventListener('visibilitychange', function() {
      if (document.hidden) saveState();
    });
  }

  return { init: init };
})();

// Auto-initialize once DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() { AudioManager.init(); });
} else {
  AudioManager.init();
}
