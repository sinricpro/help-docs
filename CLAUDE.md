# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the documentation site for SinricPro, an IoT Cloud Platform. The site is built using Jekyll (Ruby-based static site generator) and hosted on GitHub Pages. It provides comprehensive documentation for developers using the SinricPro platform including tutorials, API guides, device templates, and integrations.

## Development Commands

### Local Development
```bash
# Install dependencies
bundle install

# Run development server (auto-reloads on changes)
bundle exec jekyll serve

# Alternative: Use Docker for development
docker-compose up
```

### Build Commands
```bash
# Build production site
bundle exec jekyll build

# Build with environment variable
JEKYLL_ENV=production bundle exec jekyll build
```

### Windows Development
Use the provided batch file for convenience:
```bash
start.bat
```

## Site Architecture

### Content Organization
- **Root pages**: Main navigation pages in `/pages/` directory
- **Device documentation**: `/pages/devices/` - Documentation for specific IoT devices
- **Device templates**: `/pages/device-templates/capabilities/` - Capability-based templates
- **Tutorials**: `/pages/tutorials/` - Step-by-step guides organized by category
- **Actions**: `/pages/actions/` - API action documentation
- **Integrations**: Platform integration guides (IFTTT, Homebridge, Node-RED)

### Key Site Structure
```
├── _config.yml           # Jekyll configuration
├── _data/                # Data files (sidebar links, etc.)
├── _includes/            # Reusable HTML components
├── _layouts/             # Page templates
├── _sass/                # Styling
├── pages/                # Main content pages
│   ├── devices/          # Device-specific documentation
│   ├── device-templates/ # Template capabilities
│   ├── tutorials/        # Tutorial content
│   └── actions/          # API actions
├── public/               # Static assets (CSS, JS, images)
└── _site/                # Generated site (ignored in git)
```

### Jekyll Configuration
- **Environment**: Set to `production` for builds
- **Plugins**: Uses `jekyll-seo-tag` and `jekyll-sitemap`
- **Markdown**: Kramdown processor with Rouge syntax highlighting
- **Navigation**: Auto-generated from page `weight` frontmatter (lower = higher priority)

### Content Conventions
- All pages use frontmatter with `title` and `weight` properties
- Images stored in `/public/img/` with organized subdirectories
- Videos stored in `/public/video/`
- Technical diagrams in `_drawings/` (Fritzing files, sequence diagrams)

### Navigation System
The sidebar navigation is automatically generated from pages with:
- `layout: page` in frontmatter
- `title` property defined
- Sorted by `weight` (ascending order)

## Content Types

### Device Documentation
Each device type has standardized documentation covering:
- Device setup and wiring
- Code examples
- Voice assistant integration
- Troubleshooting

### Capability Templates
Modular capability system with individual pages for:
- Brightness, Color, Power controls
- Sensors (motion, contact, temperature)
- Media controls, Locks, Thermostats
- Custom device types

### Tutorial Structure
Tutorials are categorized by:
- Hardware type (switches, sensors, etc.)
- Platform (Arduino, Raspberry Pi, ESP32)
- Integration type (voice assistants, home automation)

## Development Notes

### Jekyll Dependencies
- Ruby-based Jekyll 4.3.0+ (CloudFlare Pages deployment)
- Modern Jekyll plugins and gem versions
- Webrick server for local development
- YAML linting available via `yaml-lint` gem
- Jekyll Polyglot 1.8+ for multi-language support

### Asset Management
- CSS: Compiled from Sass in `_sass/`
- JavaScript: Custom scripts in `/public/js/`
- Images: Organized by feature/tutorial in `/public/img/`

### SEO and Analytics
- Google Analytics tracking configured
- Jekyll SEO tag plugin for meta tags
- Sitemap generation enabled
- Social media integration (Twitter, GitHub)

## Multi-Language Support

This site supports multiple languages using Jekyll Polyglot:

### Supported Languages
- **English (en)**: Default language, URLs: `/`
- **Portuguese (pt)**: Brazilian Portuguese, URLs: `/pt/`

### Language Configuration
- **Plugin**: Jekyll Polyglot (`jekyll-polyglot` gem)
- **Config**: Languages defined in `_config.yml`
- **Content**: Language-specific content with `.pt.md` extension
- **Navigation**: Language-aware sidebar with automatic filtering

### Content Structure for Multi-Language
```
├── index.md              # English homepage
├── index.pt.md           # Portuguese homepage
├── pages/
│   ├── quickstarts.md    # English version
│   └── quickstarts.pt.md # Portuguese version
└── _data/
    └── locales.yml       # Translation strings for UI elements
```

### Adding New Translations
1. **Add language frontmatter**: Include `lang: en` or `lang: pt` in page frontmatter
2. **Create Portuguese version**: Copy `.md` file and rename to `.pt.md`
3. **Translate content**: Translate all text content including frontmatter titles
4. **Update internal links**: Adjust links to include `/pt/` prefix for Portuguese pages
5. **Test navigation**: Verify language switcher and sidebar navigation work correctly

### Translation Guidelines
- **UI Elements**: Use `_data/locales.yml` for interface translations
- **URLs**: Portuguese URLs automatically get `/pt/` prefix
- **SEO**: Hreflang tags automatically generated for both languages
- **Navigation**: Sidebar filters content by current language
- **Fallback**: English content serves as fallback for untranslated pages

### Language Switcher
- Located in sidebar navigation
- Switches between equivalent pages in both languages
- Preserves URL structure with language prefix