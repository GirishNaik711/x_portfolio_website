# Portfolio Website

A minimalist, typography-driven portfolio website with clean semantic HTML, modern CSS, and smooth animations.

## Features

- **Clean Design**: Minimalist aesthetic with focus on typography and whitespace
- **Responsive**: Mobile-first approach with fluid typography and layouts
- **Smooth Animations**: Scroll-triggered animations, page transitions, and micro-interactions
- **Accessible**: Semantic HTML, keyboard navigation, and ARIA support
- **Performance**: No external dependencies, optimized CSS/JS, lazy loading ready
- **Easy Customization**: Well-organized code with CSS custom properties

## File Structure

```
project-root/
├── index.html              # Home page
├── about.html              # About page
├── works.html              # Works/Projects page
├── contact.html            # Contact page
├── playground.html         # Experimental projects page
├── css/
│   ├── styles.css          # Main styles & design system
│   ├── animations.css      # Animation keyframes & classes
│   └── responsive.css      # Responsive breakpoints
├── js/
│   ├── main.js             # Main entry point
│   ├── navigation.js       # Mobile nav & smooth scroll
│   └── animations.js       # Scroll animations & effects
├── assets/
│   ├── illustrations/
│   │   ├── hero-illustration.svg
│   │   ├── working-person.svg
│   │   └── decorative-elements.svg
│   └── fonts/
│       └── fonts.css       # Google Fonts import
├── README.md
└── .gitignore
```

## Getting Started

### Prerequisites

- A modern web browser
- A local web server (optional, but recommended)

### Installation

1. Clone or download this repository
2. Open `index.html` in your browser, or
3. Serve with a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (npx)
npx serve

# Using VS Code
# Install "Live Server" extension and click "Go Live"
```

4. Visit `http://localhost:8000` in your browser

## Customization

### Placeholders to Replace

Search and replace these placeholders with your information:

| Placeholder | Description | Location |
|-------------|-------------|----------|
| `[YOUR NAME]` | Your name | All HTML files |
| `[YOUR BIO]` | Your biography | index.html, about.html |
| `[YOUR LOCATION]` | Your city/country | All HTML files |
| `[YOUR EMAIL]` | Contact email | contact.html |
| `[YOUR_HANDLE]` | Social media usernames | All HTML files |
| `[YOUR URL]` | Your website URL | index.html (meta tags) |
| `[PROJECT NAME]` | Project titles | works.html, playground.html |
| `[PROJECT DESCRIPTION]` | Project details | works.html |
| `[AWARD NAME]` | Award titles | about.html |
| `[CLIENT NAME]` | Client names | about.html |
| `[EXPERIMENT NAME]` | Experiment titles | playground.html |
| `[BOOK TITLE]` | Currently reading | about.html |
| `[FUN FACT]` | Personal fun fact | about.html |
| `[YOUR INTERESTS]` | Your hobbies | about.html |
| `[MONTH YEAR]` | Availability date | contact.html |

### Design Tokens

Customize the design by editing CSS custom properties in `css/styles.css`:

```css
:root {
  /* Colors */
  --color-bg: #EBEBEB;
  --color-text-primary: #1C1C1C;
  --color-text-secondary: #4A4A4A;
  --color-text-muted: #7A7A7A;

  /* Typography */
  --font-sans: 'Inter', sans-serif;
  --font-serif: 'DM Serif Display', serif;

  /* Spacing */
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2rem;
  /* ... */
}
```

### Adding Project Images

Replace the placeholder `.card__image` backgrounds:

```css
/* In your custom CSS or inline */
.card__image {
  background-image: url('path/to/your/image.jpg');
  background-size: cover;
  background-position: center;
}
```

Or add images directly in HTML:

```html
<div class="card__image">
  <img src="path/to/your/image.jpg" alt="Project description" loading="lazy">
</div>
```

### Changing Fonts

Edit `assets/fonts/fonts.css` to use different Google Fonts:

```css
@import url('https://fonts.googleapis.com/css2?family=YOUR_FONT&display=swap');

:root {
  --font-family-sans: 'Your Font', sans-serif;
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Tips

1. **Optimize Images**: Compress images before adding to the project
2. **Enable Caching**: Configure server caching headers
3. **Minify CSS/JS**: Use build tools for production
4. **Use WebP**: Convert images to WebP format for smaller sizes

## Deployment

### Static Hosting Options

- **Netlify**: Drag and drop deployment
- **Vercel**: Connect to Git repository
- **GitHub Pages**: Free hosting from GitHub
- **Cloudflare Pages**: Fast global CDN

### Example Netlify Deployment

1. Create account at netlify.com
2. Drag project folder to deploy area
3. Get your custom URL

## Accessibility

This template follows accessibility best practices:

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Focus visible indicators
- Color contrast compliance
- Reduced motion support

## License

This project is open source and available under the MIT License.

## Credits

- **Typography**: [Google Fonts](https://fonts.google.com)
  - Inter by Rasmus Andersson
  - DM Serif Display by Colophon Foundry
- **Inspiration**: [huyml.co](https://huyml.co)

---

Built with vanilla HTML, CSS, and JavaScript.
