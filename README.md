# OMACON V2 Landing Page

A single-page landing site for the OMACON conference.

## Project Structure

```
OMACON V2/
├── index.html    # Complete page (HTML, CSS, JavaScript)
├── fonts/        # Custom fonts
│   ├── ClashGrotesk-Variable.ttf
│   ├── JetBrainsMono-Bold.ttf
│   ├── JetBrainsMono-Medium.ttf
│   └── JetBrainsMono-Regular.ttf
└── README.md
```

## Setup

1. Open index.html in a browser

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript** - Scroll-based animations, IntersectionObserver
- **Fonts** - Clash Grotesk (headings), JetBrains Mono (body)

## Features

- Sticky CTA bar with scroll behavior
- Scroll-triggered fade-in animations
- Animated collapsing lines in manifesto section
- Fan-out animation for House Rules
- Pink noise hover effect on speaker cards
- Fully responsive (desktop, tablet, mobile)

## Colors

| Name       | Hex       |
|------------|-----------|
| Beige      | `#F8F5F2` |
| Dark Blue  | `#0D0826` |
| Pink       | `#FF8AFF` |
| Black      | `#1a1a1a` |

## Notes

- All styles and scripts are inline in `index.html`
- Fonts are self-hosted in the `/fonts` directory
- No external dependencies or build process required
