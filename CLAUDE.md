# Portfolio Website — Project Context

## Overview

Personal portfolio for Girish Naik (Digital Designer & Developer). Vanilla HTML/CSS/JS, no frameworks. Five pages: Homepage, About, Experience, Projects, Contact. Features a custom loading screen with text-split animation, scroll-triggered animations, typing effect, and smooth page transitions.

## Tech Stack

- HTML5 (semantic)
- CSS3 (custom properties, grid, flexbox, keyframes)
- Vanilla JavaScript (IIFE module pattern)
- No build tools, no bundler, no package manager — static files served directly

---

## File Architecture

```
Project X/
├── index.html              Homepage (loading screen, hero, nav row)
├── about.html              About (bio, expertise, skills, awards, clients)
├── experience.html         Experience (timeline, education, certs)
├── project.html            Projects (cards grid, skills grids)
├── contact.html            Contact (form, FAQ, social links)
├── css/
│   ├── styles.css          Design tokens + all component styles (1641 lines)
│   ├── animations.css      Loading screen, keyframes, scroll/hover animations (629 lines)
│   ├── responsive.css      Breakpoints, touch, print, reduced motion (633 lines)
│   └── pixel-text.css      Pixel font component (unused currently)
├── js/
│   ├── animations.js       Loading screen, scroll observer, page transitions (366 lines)
│   ├── typing-animation.js Homepage typewriter effect (58 lines)
│   ├── navigation.js       Mobile menu, smooth scroll, header behavior (252 lines)
│   ├── main.js             Watermark hover, form handling, notifications, lazy load (341 lines)
│   └── pixel-text.js       Pixel font renderer (unused currently)
├── assets/
│   ├── fonts/fonts.css     Inter + DM Serif Display @font-face
│   └── illustrations/      SVGs (decorative-elements, hero-illustration, working-person)
└── CLAUDE.md               This file
```

---

## Design System (styles.css lines 6-101)

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#EBEBEB` | Page background |
| `--color-bg-alt` | `#E0E0E0` | Alternate background |
| `--color-text-primary` | `#1C1C1C` | Headings, body text |
| `--color-text-secondary` | `#4A4A4A` | Paragraphs |
| `--color-text-muted` | `#7A7A7A` | Labels, captions |
| `--color-border` | `#D0D0D0` | Borders |
| `--color-white` | `#FFFFFF` | Card backgrounds |
| `#22C55E` | (hardcoded) | Status dot green pulse |

### Typography
| Token | Font | Usage |
|-------|------|-------|
| `--font-sans` | Inter | Body text, UI labels |
| `--font-serif` | DM Serif Display | Page titles, headings |
| `--font-mono` | JetBrains Mono | Hero name, typing animation, code |
| `--font-script` | Pinyon Script | Decorative (available, not heavily used) |

### Spacing Scale
`--space-xs` (8px), `--space-sm` (16px), `--space-md` (24px), `--space-lg` (32px), `--space-xl` (48px), `--space-2xl` (64px), `--space-3xl` (96px), `--space-4xl` (128px)

### Z-Index Scale
`--z-base` (1), `--z-dropdown` (100), `--z-sticky` (200), `--z-fixed` (300), `--z-modal` (400), `--z-tooltip` (500). Loading screen uses 10000, page transition uses 9999.

### Breakpoints (responsive.css)
| Name | Width | Key changes |
|------|-------|-------------|
| Mobile (base) | 0-767px | Single column, hamburger menu, small fonts |
| Tablet | 768px+ | 2-3 columns, medium fonts |
| Desktop | 1024px+ | Horizontal nav, 4 columns, hover effects |
| Large Desktop | 1440px+ | Max typography, increased spacing |
| Extra Large | 1920px+ | Container capped at 1600px |

---

## Coding Conventions

### CSS
- BEM naming: `.block__element--modifier`
- Use design tokens for all values (colors, spacing, fonts, transitions)
- Responsive: mobile-first base styles, then `@media (min-width)` overrides
- Transitions: `--transition-fast` (0.15s), `--transition-base` (0.3s), `--transition-slow` (0.5s), `--transition-slower` (0.8s)
- Always include `prefers-reduced-motion` support for new animations

### JavaScript
- IIFE module pattern with public API: `const Module = (function() { ... return { init }; })();`
- No external dependencies
- `document.querySelector` / `querySelectorAll` for DOM
- Event delegation where appropriate
- Modules initialized in main.js `DOMContentLoaded`

### HTML
- Semantic elements: `nav`, `header`, `main`, `section`, `footer`, `figure`
- One `h1` per page
- All images have `alt` text
- Links to external sites use `target="_blank" rel="noopener"`
- Scroll animation elements get `class="animate-on-scroll"` with optional `data-animation` direction

---

## Component-to-File Map

### Homepage (index.html)

| Component | HTML | CSS | JS |
|-----------|------|-----|-----|
| Loading screen overlay | 34-47 | animations.css:9-128 | animations.js:29-81 |
| Loading cursor ("Loading...") | (dynamic) | animations.css:30-42 | animations.js:34-45 |
| Text split animation | 37-46 | animations.css:61-128 | animations.js:50-80 |
| Header (status + social + version) | 56-77 | styles.css:974-1023 | — |
| Hero name "GIRISH NAIK" | 81 | styles.css:1026-1042 | — |
| Typing animation | 82-84 | styles.css:1045-1073 | typing-animation.js:1-58 |
| Nav row (About/Experience/Project/Contact) | 88-110 | styles.css:1076-1171 | main.js:13-46 |
| Nav hover (dark band + watermark) | 89-90 | styles.css:1087-1171 | main.js:13-46 |
| Bottom bio + animation placeholder | 113-130 | styles.css:1173-1215 | — |
| Page transition overlay | 50 | animations.css:414-430 | animations.js:242-267 |
| Homepage responsive | — | styles.css:1221-1320 | — |

### About Page (about.html)

| Component | HTML | CSS | JS |
|-----------|------|-----|-----|
| Fixed header | 25-55 | styles.css:324-375 | navigation.js:22-39, 156-195 |
| Status dot (green pulse) | 29-31 | styles.css:355-361 | — |
| Navigation menu | 40-45 | styles.css:379-411 | navigation.js:44-120, 200-217 |
| Hamburger toggle | 47-51 | styles.css:414-426, responsive.css:99-114 | navigation.js:44-93 |
| Page header ("About Me") | 60-70 | styles.css:690-706 | animations.js:86-113 |
| Title highlight effect | 62-64 | animations.css:608-629 | animations.js:86-113 |
| Word-by-word intro text | 75-83 | animations.css:363-390 | animations.js:146-169 |
| Personal section (3-col grid) | 98-120 | styles.css:246-262 | animations.js:86-113 |
| Visual hero illustration | 125-131 | styles.css:484-495 | animations.js:86-113 |
| Expertise grid (01-04) | 141-178 | styles.css:710-738 | animations.js:86-113 |
| Skills & tools (4-col) | 189-229 | styles.css:246-262 | animations.js:86-113 |
| Awards timeline | 241-284 | styles.css:739-775 | animations.js:86-113 |
| Clients grid (4-col) | 295-304 | styles.css:779-800 | animations.js:86-113 |
| Contact CTA ("Say Hello") | 311-318 | styles.css:804-827 | animations.js:86-113 |
| Tab navigation | 323-330 | styles.css:872-893 | navigation.js:200-217 |
| Footer | 335-351 | styles.css:645-686 | — |

### Experience Page (experience.html)

| Component | HTML | CSS | JS |
|-----------|------|-----|-----|
| Fixed header | 30-60 | styles.css:324-375 | navigation.js:22-39, 156-195 |
| Page header ("My Experience") | 65-74 | styles.css:690-706 | animations.js:86-113 |
| Work experience timeline | 84-158 | styles.css:1325-1414 | animations.js:86-113 |
| Experience item card | 86-108 | styles.css:1331-1414 | animations.js:86-113 |
| Experience item header (flex) | 87-96 | styles.css:1343-1350 | — |
| Experience role/meta (date, location) | 87-95 | styles.css:1367-1382 | — |
| Experience highlights (bullet list) | 102-106 | styles.css:1396-1414 | — |
| Education section (2-col) | 168-187 | styles.css:1417-1446 | animations.js:86-113 |
| Education item card | 169-186 | styles.css:1417-1446 | — |
| Certifications section (3-col) | 198-217 | styles.css:1447-1473 | animations.js:86-113 |
| Certification item (left border) | 199-215 | styles.css:1448-1473 | — |
| Contact CTA | 223-230 | styles.css:804-827 | animations.js:86-113 |
| Tab navigation | 235-242 | styles.css:872-893 | navigation.js:200-217 |
| Footer | 247-261 | styles.css:645-686 | — |

### Project Page (project.html)

| Component | HTML | CSS | JS |
|-----------|------|-----|-----|
| Fixed header | 30-60 | styles.css:324-375 | navigation.js:22-39, 156-195 |
| Page header ("My Projects") | 65-74 | styles.css:690-706 | animations.js:86-113 |
| Featured projects grid (2-col) | 84-157 | styles.css:1479-1483 | animations.js:86-113 |
| Project card | 86-101 | styles.css:1485-1556 | animations.js:86-113 |
| Project card image (hover zoom) | 87-89 | styles.css:1497-1513 | — |
| Project card tags (pills) | 91-94 | styles.css:1519-1532 | — |
| Project card title | 95 | styles.css:1534-1538 | — |
| Project card link | 99 | styles.css:1547-1556 | — |
| Skills section container | 169-320 | styles.css:1558-1622 | animations.js:86-113 |
| Skills category title | 170 | styles.css:1571-1579 | — |
| Skills grid (auto-fill) | 171-208 | styles.css:1581-1585 | — |
| Skill item (icon + name) | 172-177 | styles.css:1587-1621 | — |
| Contact CTA | 327-334 | styles.css:804-827 | animations.js:86-113 |
| Tab navigation | 339-347 | styles.css:872-893 | navigation.js:200-217 |
| Footer | 351-365 | styles.css:645-686 | — |

### Contact Page (contact.html)

| Component | HTML | CSS | JS |
|-----------|------|-----|-----|
| Fixed header | 25-55 | styles.css:324-375 | navigation.js:22-39, 156-195 |
| Page header ("Let's Connect") | 60-70 | styles.css:690-706 | animations.js:86-113 |
| Contact info section (2-col) | 75-101 | styles.css:246-262 | animations.js:86-113 |
| Email CTA link | 77-85 | animations.css:466-486 | — |
| Schedule call button | 95-97 | styles.css:605-641 | — |
| Contact form | 112-177 | styles.css:831-868 | main.js:77-98 |
| Form inputs (name/email/subject/budget) | 115-160 | styles.css:847-868 | main.js:77-98 |
| Form textarea (message) | 163-171 | styles.css:865-868 | main.js:77-98 |
| Form submit button | 173-175 | styles.css:605-641 | main.js:77-98 |
| Success notification (toast) | (dynamic) | (inline styles) | main.js:105-170 |
| FAQ section (2-col) | 188-217 | styles.css:246-262 | animations.js:86-113 |
| Social links (4-col) | 228-241 | styles.css:779-800 | animations.js:86-113 |
| Location section | 247-258 | styles.css:804-827 | animations.js:86-113 |
| Tab navigation | 263-270 | styles.css:872-893 | navigation.js:200-217 |
| Footer | 275-291 | styles.css:645-686 | — |

---

## JavaScript Modules — Public APIs

### Animations (animations.js)
```
init()                    — Initialize all animation features
initLoadingScreen()       — Loading screen sequence (homepage only)
initParallax(selector)    — Scroll-based parallax transforms
initTiltEffect(selector)  — Mouse-tracked 3D card tilt
initCharacterAnimation(el)— Per-character staggered reveal
animateWords(container)   — Word-by-word fade-in
animateCountUp(element)   — Number count-up with easing
splitIntoWords(element)   — Wrap words in spans
refresh()                 — Re-observe after dynamic content
destroy()                 — Disconnect observer
```

### Navigation (navigation.js)
```
init()              — Initialize nav, scroll, active state
toggleMenu()        — Toggle mobile menu
openMenu()          — Open mobile menu
closeMenu()         — Close mobile menu
isMenuOpen()        — Query menu state
setActiveState()    — Mark current page link active
destroy()           — Remove event listeners
```

### Main (main.js)
```
window.PortfolioUtils.debounce(func, wait)
window.PortfolioUtils.throttle(func, limit)
window.PortfolioUtils.showNotification(message, type)
```

### Typing Animation (typing-animation.js)
Cycles through: `['ML Engineer', 'AI Architect', 'Data Scientist']`
Speeds: type 100ms, delete 50ms, pause 2000ms

---

## Animation Timing Reference

### Loading Screen Sequence (animations.js:19-24)
1. `1500ms` — Initial display (text centered)
2. `1000ms` — Text splits apart, placeholder fades in
3. `1500ms` — Hold split state
4. `600ms` — Fade out, remove from DOM

### Scroll Animations
- Observer threshold: 0.1, root margin: -50px bottom
- Stagger delays: `.stagger-1` through `.stagger-8` (100ms intervals)
- Word animation: 50ms per word
- Character animation: 30ms per character

### Key Easing Curves
- Smooth: `cubic-bezier(0.65, 0, 0.35, 1)`
- Standard: `cubic-bezier(0.4, 0, 0.2, 1)`
- Bounce: `cubic-bezier(0.68, -0.55, 0.265, 1.55)`

---

## Quick Lookup: What to Edit

| I want to change... | Edit these files |
|---------------------|-----------------|
| Colors, fonts, spacing | `styles.css` lines 6-101 |
| Homepage hero layout | `index.html`, `styles.css` lines 965-1073 |
| Homepage nav hover effect | `styles.css` lines 1076-1171, `main.js` lines 13-46 |
| Loading screen | `index.html` lines 34-47, `animations.css` lines 9-128, `animations.js` lines 29-81 |
| Typing animation titles | `typing-animation.js` line 8 (titles array) |
| Any page header | target `.html`, `styles.css` lines 690-706 |
| Fixed header / nav bar | target `.html`, `styles.css` lines 322-426, `navigation.js` |
| Mobile menu | `responsive.css` lines 75-114, `navigation.js` lines 44-93 |
| Scroll animations | `animations.css` lines 314-359, `animations.js` lines 86-140 |
| Page transitions | `animations.css` lines 414-430, `animations.js` lines 242-267 |
| Experience timeline | `experience.html`, `styles.css` lines 1324-1414 |
| Education items | `experience.html`, `styles.css` lines 1416-1446 |
| Certifications | `experience.html`, `styles.css` lines 1447-1473 |
| Project cards | `project.html`, `styles.css` lines 1478-1556 |
| Skills grid | `project.html`, `styles.css` lines 1558-1621 |
| Contact form | `contact.html`, `styles.css` lines 829-868, `main.js` lines 77-98 |
| Notifications | `main.js` lines 105-170 |
| Buttons | `styles.css` lines 603-641 |
| Footer | `styles.css` lines 643-686 |
| Tab navigation | `styles.css` lines 872-893 |
| Responsive breakpoints | `responsive.css` (mobile base, 768px, 1024px, 1440px) |
| Adding new keyframe animation | `animations.css` keyframes section (after line 131) |
| Hover effects | `animations.css` lines 462-522 |
| Reduced motion | `animations.css` lines 571-593 |
