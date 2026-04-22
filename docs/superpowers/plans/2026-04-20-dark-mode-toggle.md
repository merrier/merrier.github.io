# Dark Mode Theme Toggle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a floating action button (FAB) with a fan-out menu to toggle between Light, Dark, and Follow System modes in the Hexo "qing" theme.

**Architecture:** 
- A blocking `<script>` in the `<head>` to check `localStorage` and `matchMedia` to prevent FOUC (Flash of Unstyled Content) by adding a `dark-mode` class to `<html>`.
- A FAB in `layout.njk` that uses CSS transitions to fan out three sub-buttons.
- A Less file `_dark-mode.less` to define the dark color palette via CSS variables and the FAB layout/animations.
- A JavaScript file `dark-mode.js` to handle click events, save preferences to `localStorage`, and update the main FAB icon.

**Tech Stack:** Hexo (Nunjucks templates), Less, Vanilla JS, FontAwesome 4.5.

---

### Task 1: Add FOUC Prevention Script to Head

**Files:**
- Modify: `themes/qing/layout/_partial/head.njk`

- [ ] **Step 1: Add inline script to check theme mode**
Add the following script right before the closing `</head>` tag to apply the `dark-mode` class immediately if needed.

```html
<!-- Insert before </head> -->
<script>
    (function() {
        var savedMode = localStorage.getItem('qing_theme_mode');
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (savedMode === 'dark' || (savedMode !== 'light' && prefersDark)) {
            document.documentElement.classList.add('dark-mode');
        }
    })();
</script>
```

### Task 2: Create CSS for Dark Mode and FAB

**Files:**
- Create: `themes/qing/source/css/less/_dark-mode.less`
- Modify: `themes/qing/source/css/less/_style.less`

- [ ] **Step 1: Create the `_dark-mode.less` file**
Define CSS variables for dark mode and the styling for the FAB.

```less
// themes/qing/source/css/less/_dark-mode.less

// 1. Dark Mode Variables (Overrides)
html.dark-mode {
    filter: invert(1) hue-rotate(180deg);
    
    // Reverse images and specific elements so they look normal
    img, video, iframe, .fa, .navbar-brand, .branding, .footer {
        filter: invert(1) hue-rotate(180deg);
    }
    // Note: Using the filter invert method is a quick way to achieve dark mode.
    // If specific elements need tweaking, add them here.
}

// 2. FAB Styling
.theme-toggle-fab {
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 9999;
    
    .fab-main {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #333;
        color: #fff;
        border: none;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        font-size: 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.3s ease;
        position: relative;
        z-index: 2;
        outline: none;
        
        html.dark-mode & {
            background-color: #f5f5f5;
            color: #333;
        }
    }

    .fab-menu {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 50px;
        height: 50px;
        z-index: 1;
        pointer-events: none;
    }

    .fab-item {
        position: absolute;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #555;
        color: #fff;
        border: none;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        font-size: 16px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transform: translate(0, 0) scale(0.5);
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        outline: none;

        html.dark-mode & {
            background-color: #e0e0e0;
            color: #333;
        }
    }

    // Hover state: fan out the items
    &:hover, &.active {
        .fab-menu {
            pointer-events: auto;
        }
        
        .fab-item {
            opacity: 1;
            transform: scale(1);
        }
        
        // Item 1: Top (Auto)
        .fab-item:nth-child(1) {
            transform: translate(0, -65px);
        }
        // Item 2: Top-Left (Dark)
        .fab-item:nth-child(2) {
            transform: translate(-46px, -46px);
        }
        // Item 3: Left (Light)
        .fab-item:nth-child(3) {
            transform: translate(-65px, 0);
        }
    }
}
```

- [ ] **Step 2: Import `_dark-mode.less` into `_style.less`**
Add the import statement at the bottom of `themes/qing/source/css/less/_style.less`.

```less
// Add to the bottom of _style.less
@import "_dark-mode.less";
```

### Task 3: Add FAB HTML Structure

**Files:**
- Modify: `themes/qing/layout/layout.njk`

- [ ] **Step 1: Add HTML before `</body>`**

```html
<!-- Insert right above {{ partial('_partial/footer') | safe }} or before </body> -->
<div class="theme-toggle-fab" id="theme-toggle-fab">
    <div class="fab-menu">
        <button class="fab-item" data-mode="auto" title="跟随系统"><i class="fa fa-desktop"></i></button>
        <button class="fab-item" data-mode="dark" title="深色模式"><i class="fa fa-moon-o"></i></button>
        <button class="fab-item" data-mode="light" title="浅色模式"><i class="fa fa-sun-o"></i></button>
    </div>
    <button class="fab-main" id="fab-main-btn">
        <i class="fa fa-desktop" id="fab-main-icon"></i>
    </button>
</div>
```

### Task 4: Add JavaScript Logic

**Files:**
- Create: `themes/qing/source/js/dark-mode.js`
- Modify: `themes/qing/layout/_partial/script.njk`

- [ ] **Step 1: Create `dark-mode.js`**

```javascript
// themes/qing/source/js/dark-mode.js
document.addEventListener('DOMContentLoaded', function() {
    var fabContainer = document.getElementById('theme-toggle-fab');
    var mainIcon = document.getElementById('fab-main-icon');
    var fabItems = document.querySelectorAll('.fab-item');
    
    var mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    var icons = {
        'light': 'fa-sun-o',
        'dark': 'fa-moon-o',
        'auto': 'fa-desktop'
    };

    function applyTheme(mode) {
        var isDark = false;
        if (mode === 'dark') {
            isDark = true;
        } else if (mode === 'light') {
            isDark = false;
        } else {
            // auto
            isDark = mediaQuery.matches;
        }
        
        if (isDark) {
            document.documentElement.classList.add('dark-mode');
        } else {
            document.documentElement.classList.remove('dark-mode');
        }
        
        // Update main icon
        mainIcon.className = 'fa ' + icons[mode];
    }

    function initTheme() {
        var savedMode = localStorage.getItem('qing_theme_mode') || 'auto';
        applyTheme(savedMode);
    }

    // Handle clicks on sub-buttons
    fabItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
            var mode = this.getAttribute('data-mode');
            localStorage.setItem('qing_theme_mode', mode);
            applyTheme(mode);
            
            // On mobile, clicking might leave the hover state active, so we remove a custom active class if we used one.
            fabContainer.classList.remove('active');
            e.stopPropagation();
        });
    });

    // Handle system theme changes
    mediaQuery.addEventListener('change', function() {
        var savedMode = localStorage.getItem('qing_theme_mode') || 'auto';
        if (savedMode === 'auto') {
            applyTheme('auto');
        }
    });

    // Toggle active class on mobile for the fan-out menu
    fabContainer.addEventListener('click', function() {
        this.classList.toggle('active');
    });

    initTheme();
});
```

- [ ] **Step 2: Link `dark-mode.js` in `script.njk`**

```html
<!-- Add near the end of themes/qing/layout/_partial/script.njk -->
<script src="{{ url_for('js/dark-mode.js') }}"></script>
```
