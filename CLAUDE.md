# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a collection of web development projects focusing on CNP (Crypto Ninja Partners) themed websites:

- **Root level files** (`index.html`, `style.css`, `script.js`): Simple CNP character showcase site featuring artwork by @asahikimama
- **windsurf-cnp-site/**: Professional CNP medication handbook landing page (Japanese)
- **my-website/**: Basic template website structure

## Technology Stack

All projects use vanilla web technologies:
- HTML5 with semantic markup
- CSS3 (CSS Grid, Flexbox, CSS Variables)
- Vanilla JavaScript (ES6+)
- External libraries: Font Awesome icons, Google Fonts (Noto Sans JP)

## Key Features Across Projects

- **Responsive Design**: Mobile-first approach with breakpoints at 768px and 1200px
- **Japanese Language Support**: All content in Japanese with proper font handling
- **CNP Character Integration**: Features various CNP characters (Panda, Cat, Rabbit, Fox, Dog, Bear)
- **Interactive Elements**: Smooth scrolling, hamburger menus, form validation, accordion FAQs

## Development Commands

This repository contains static HTML/CSS/JavaScript files with no build process. To work with these projects:

1. **Local Development**: Use a local web server (e.g., `python -m http.server` or Live Server extension)
2. **File Editing**: Direct editing of HTML, CSS, and JavaScript files
3. **Testing**: Open files directly in browsers or use local server

## Main Project Details

### Root CNP Showcase Site
- **Purpose**: Display CNP characters and artwork by @asahikimama
- **Key files**: `index.html`, `style.css`, `script.js`
- **Features**: Character gallery, artist information, contact form

### Windsurf CNP Site (`windsurf-cnp-site/`)
- **Purpose**: Professional medical app landing page promoting CNP medication handbook
- **Target audience**: Healthcare professionals and patients
- **Design**: Clean, medical-themed with blue (#2196F3) and green (#4CAF50) color scheme
- **Key sections**: Hero, service benefits, testimonials, FAQ, contact forms

## Design System

### Colors (from windsurf-cnp-site)
- Primary Blue: `#2196F3`
- Secondary Green: `#4CAF50`
- Accent Orange: `#FF9800`

### Typography
- Font Family: Noto Sans JP (multiple weights: 300, 400, 500, 700)
- Emphasis on readability for Japanese text

## File Organization

```
/
├── index.html, style.css, script.js  # Root showcase site
├── 1.png                           # Main artwork
├── windsurf-cnp-site/             # Professional landing page
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── images/                    # Asset folder
│   └── README.md                  # Detailed project documentation
└── my-website/                    # Basic template
```

## Important Notes

- All projects are static websites requiring no build process
- Images may need proper paths when moving between local/production environments
- CNP character images reference external URLs that may need fallback handling
- Contact forms are frontend-only and require backend integration for functionality