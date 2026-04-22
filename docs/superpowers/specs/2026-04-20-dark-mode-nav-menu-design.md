# Dark Mode Theme Toggle in Navigation Menu Design

## 1. Goal
Move the previously added Dark Mode toggle button from a floating action button (FAB) in the bottom-right corner to the main navigation menu (`<ul class="menu">`). It needs to support three distinct modes:
1. **Light Mode** (浅色模式)
2. **Dark Mode** (深色模式)
3. **Follow System** (跟随系统)

## 2. Placement & Appearance
- **Location:** The last item in the main navigation menu (`themes/qing/layout/_partial/nav.njk`).
- **Main Item:** An `<li>` acting as the toggle trigger. It will display the icon of the currently active theme mode (Sun for Light, Moon for Dark, Desktop for System) and the text "主题" (Theme).
- **Dropdown Menu:** A standard dropdown `<ul>` containing the three modes as `<li>` items, consistent with the existing theme's nested menu style.
- **Icons (FontAwesome 4.5):**
  - Light: `fa fa-sun-o`
  - Dark: `fa fa-moon-o`
  - Auto/System: `fa fa-desktop`

## 3. Interaction Design (Dropdown)
- **Trigger:** Hovering over the "主题" menu item reveals the dropdown list (using the theme's existing CSS logic for `.menu li:hover ul`).
- **Selection:**
  - Clicking an item in the dropdown immediately applies that theme mode to the page.
  - The main menu item's icon instantly updates to reflect the newly chosen mode.
  - The dropdown menu disappears when the mouse leaves.

## 4. Core Logic & Data Flow (Maintained)
- **Storage:** The selected mode is saved to the browser's `localStorage` under `qing_theme_mode`.
- **Initialization (Page Load):**
  1. A small script in the `<head>` checks `localStorage.getItem('qing_theme_mode')` immediately to prevent FOUC (Flash of Unstyled Content).
  2. If the value is `'dark'`, a `dark-mode` class is added to the `<html>` or `<body>` element.
  3. If the value is `'light'`, the `dark-mode` class is removed.
  4. If the value is `'auto'` or empty (null), the script checks `window.matchMedia('(prefers-color-scheme: dark)').matches` and applies the class accordingly.
- **Event Listeners:** The script will also listen to the `change` event on `window.matchMedia('(prefers-color-scheme: dark)')` so that if the user's OS changes theme while the site is open (and set to Auto), the site updates automatically in real-time.

## 5. CSS Architecture
- Remove the FAB CSS from `_dark-mode.less` and `style.css`.
- Rely mostly on the existing `.main-navigation .menu ul` styles for the dropdown. Add minimal custom CSS in `_dark-mode.less` if needed for spacing or specific highlighting of the active mode in the dropdown.
- Keep the core `.dark-mode` filter variables.

## 6. Implementation Scope
- `themes/qing/layout/layout.njk`: Remove the FAB HTML.
- `themes/qing/layout/_partial/nav.njk`: Add the new dropdown menu item at the end of the list.
- `themes/qing/source/css/less/_dark-mode.less`: Remove FAB styles, add any necessary dropdown tweaks.
- `themes/qing/source/css/style.css`: Clean up FAB styles manually since `gulp` isn't running reliably.
- `themes/qing/source/js/dark-mode.js`: Update the script to target the new navigation menu items instead of the FAB items.