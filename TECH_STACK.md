# Technology Stack Specification

**Project:** fonts.ericpitcock.com  
**Last Updated:** January 25, 2026  
**Version:** 0.1.0

---

## Core Framework & Runtime

| Technology | Version | Purpose |
|------------|---------|---------|
| Vue.js | ^3.4.15 | Frontend framework |
| Node.js | - | Runtime environment |

---

## Build Tools & Development

| Technology | Version | Purpose |
|------------|---------|---------|
| Vite | ^5.0.11 | Build tool and dev server |
| @vitejs/plugin-vue | ^5.0.3 | Vue 3 support for Vite |
| vite-svg-loader | ^5.1.0 | Inline SVGs as Vue components |

### Vite Configuration
- **Dev Server:** Port 5176, host enabled (`--host`)
- **Path Aliases:**
  - `@/*` → `./src/*`
  - `@epicenter/*` → `./node_modules/@ericpitcock/epicenter-vue-components/dist`
  - `@epicenter-styles/*` → `./node_modules/@ericpitcock/epicenter-styles/dist`

---

## State Management & Routing

| Technology | Version | Purpose |
|------------|---------|---------|
| Pinia | ^3.0.1 | State management |
| Vue Router | ^4.3.0 | Client-side routing |

---

## Styling & CSS

| Technology | Version | Purpose |
|------------|---------|---------|
| SCSS/Sass | 1.82.0 | CSS preprocessor |

### Styling Architecture
- **File Structure:** Component-scoped styles
- **Global Styles:** `src/assets/app.scss`
- **Sass Configuration:** Modern compiler API

---

## Code Quality & Linting

| Technology | Version | Purpose |
|------------|---------|---------|
| ESLint | ^8.49.0 | JavaScript linting |
| eslint-plugin-vue | ^9.17.0 | Vue-specific linting rules |
| eslint-plugin-simple-import-sort | ^12.1.1 | Import sorting |
| eslint-plugin-import | ^2.31.0 | Import/export validation |

### ESLint Configuration
- **Target Files:** `**/*.{vue,js,jsx,cjs,mjs}`
- **Environment:** Browser globals
- **Auto Fix:** Enabled via lint script

---

## Utility Libraries

| Library | Version | Purpose |
|---------|---------|---------|
| @faker-js/faker | ^9.6.0 | Fake data generation |
| @google/genai | ^1.38.0 | Google AI integration |
| chart.js | ^4.4.8 | Chart visualization |
| fitty | ^2.4.2 | Text fitting utility |
| webfontloader | ^1.6.28 | Web font loading |

---

## Custom Internal Packages

| Package | Version | Purpose |
|---------|---------|---------|
| @ericpitcock/epicenter-icons | 1.0.4 | Icon system |
| @ericpitcock/epicenter-styles | 1.0.5 | Design system styles |
| @ericpitcock/epicenter-vue-components | 1.0.5 | Vue component library |

---

## Project Architecture

### Directory Structure
```
src/
├── assets/          # Global styles and fonts
├── components/      # Vue components
│   └── samples/     # Sample components
├── composables/     # Vue composition API utilities
├── data/            # Static JSON data
├── layouts/         # Layout components
├── router/          # Vue Router configuration
├── store/           # Pinia store modules
└── views/           # Route view components
```

### Component Patterns
- **Composition API:** Primary pattern for component logic
- **Composables:** Reusable composition functions
- **Layout System:** Dedicated layout components
- **Data Management:** Static JSON files in `data/` directory

---

## Build & Deployment

### Available Scripts
```json
{
  "dev": "vite --host --port 5176",           // Development server
  "build": "vite build",                      // Production build
  "preview": "vite preview",                  // Preview production build
  "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs --fix --ignore-path .gitignore" // Run linter
}
```

### Build Configuration
- **Module Type:** ES Module
- **Output Directory:** `dist/`
- **Development Server:** http://localhost:5176

---

## Standards & Best Practices

### Code Style
- **Vue 3:** Composition API preferred
- **State Management:** Pinia for application state
- **Import Sorting:** Automated via ESLint plugin

### File Naming Conventions
- **Components:** PascalCase (e.g., `FontCard.vue`)
- **Composables:** camelCase with `use` prefix (e.g., `useWebFont.js`)

### Import Aliases
- `@/` - Source directory shorthand
- `@epicenter/` - Custom component library
- `@epicenter-styles/` - Custom styles library

---

## Browser Support

- **Target:** Modern browsers
- **Global Variables:** Browser environment

---

## Version Control & Ignored Files

### Key Ignored Directories
- `dist/` - Build output
- `node_modules/` - Dependencies
