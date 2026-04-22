# Dark Mode Theme Toggle Button Design

## 1. Goal
Add a Dark Mode toggle button to the Hexo "qing" theme. The button needs to support three distinct modes:
1. **Light Mode** (浅色模式)
2. **Dark Mode** (深色模式)
3. **Follow System** (跟随系统)

## 2. Placement & Appearance
- **Location:** Bottom right corner of the screen, implemented as a fixed Floating Action Button (FAB).
- **Default State:** A main circular button displaying the icon of the currently active theme mode (Sun for Light, Moon for Dark, Desktop for System).
- **Icons (FontAwesome 4.5):**
  - Light: `fa fa-sun-o`
  - Dark: `fa fa-moon-o`
  - Auto/System: `fa fa-desktop` (or `fa fa-adjust`)

## 3. Interaction Design (Fan-out)
- **Trigger:** When the user hovers over (or clicks on mobile) the main floating button.
- **Animation:** Three smaller sub-buttons (representing the three modes) will fan out from the main button in a semi-circle (arc) or vertical layout. A fan-out arc is preferred for visual appeal.
- **Selection:**
  - Clicking a sub-button immediately applies that theme mode to the page.
  - The main button's icon instantly updates to reflect the newly chosen mode.
  - The fan-out menu smoothly collapses back into the main button.

## 4. Core Logic & Data Flow
- **Storage:** The selected mode is saved to the browser's `localStorage` under a key like `qing_theme_mode`.
- **Initialization (Page Load):**
  1. A small script in the `<head>` checks `localStorage.getItem('qing_theme_mode')` immediately to prevent FOUC (Flash of Unstyled Content).
  2. If the value is `'dark'`, a `dark-mode` class is added to the `<html>` or `<body>` element.
  3. If the value is `'light'`, the `dark-mode` class is removed.
  4. If the value is `'auto'` or empty (null), the script checks `window.matchMedia('(prefers-color-scheme: dark)').matches` and applies the class accordingly.
- **Event Listeners:** The script will also listen to the `change` event on `window.matchMedia('(prefers-color-scheme: dark)')` so that if the user's OS changes theme while the site is open (and set to Auto), the site updates automatically in real-time.

## 5. CSS Architecture
- The theme's core CSS will need an updated set of variables or overrides mapped to the `dark-mode` class.
- The FAB button and its fan-out animation will be styled using pure CSS transitions (`transform: translate(...) rotate(...)`, `opacity`, `transition`).

## 6. Implementation Scope
This design is self-contained. It touches:
- Layout files: adding the HTML structure for the FAB.
- CSS files: adding the dark mode color palette and the FAB fan-out animations.
- JS files: adding the initialization script and the click event handlers for the toggle.