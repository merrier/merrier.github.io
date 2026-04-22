# Dark Mode Navigation Menu Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the dark mode toggle from a FAB to the main navigation menu with a dropdown list of options.

**Architecture:** 
- Clean up previous FAB HTML, CSS, and JS.
- Inject a new `<li>` at the end of the `.menu` in `nav.njk`.
- Re-wire `dark-mode.js` to target the new menu dropdown links.

**Tech Stack:** Hexo (Nunjucks templates), Vanilla JS.

---

### Task 1: Clean up old FAB HTML and add Menu HTML

**Files:**
- Modify: `themes/qing/layout/layout.njk`
- Modify: `themes/qing/layout/_partial/nav.njk`

- [ ] **Step 1: Remove FAB from layout**
In `themes/qing/layout/layout.njk`, remove the `.theme-toggle-fab` div.

- [ ] **Step 2: Add theme toggle to navigation menu**
In `themes/qing/layout/_partial/nav.njk`, add the dropdown menu item right before the closing `</ul>`.

```html
<!-- themes/qing/layout/_partial/nav.njk -->
<!-- Insert before </ul> -->
<li role="presentation" class="text-center">
    <a href="javascript:void(0);" id="theme-menu-trigger"><i class="fa fa-desktop" id="theme-menu-icon"></i> 主题</a>
    <ul class="theme-dropdown" style="width: 120px; left: 50%; margin-left: -60px; text-align: center; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <li><a href="javascript:void(0);" class="theme-option" data-mode="auto"><i class="fa fa-desktop"></i> 跟随系统</a></li>
        <li><a href="javascript:void(0);" class="theme-option" data-mode="light"><i class="fa fa-sun-o"></i> 浅色模式</a></li>
        <li><a href="javascript:void(0);" class="theme-option" data-mode="dark"><i class="fa fa-moon-o"></i> 深色模式</a></li>
    </ul>
</li>
```

### Task 2: Clean up CSS

**Files:**
- Modify: `themes/qing/source/css/less/_dark-mode.less`
- Modify: `themes/qing/source/css/style.css`

- [ ] **Step 1: Remove FAB Less code**
In `themes/qing/source/css/less/_dark-mode.less`, delete everything under `// 2. FAB Styling`.

- [ ] **Step 2: Clean up style.css**
In `themes/qing/source/css/style.css`, delete all `.theme-toggle-fab` blocks (around lines 2515 to 2588) to ensure the old button disappears completely.
Keep the `html.dark-mode` overrides block.

- [ ] **Step 3: Add minor CSS tweaks for the dropdown (Optional but recommended for mobile)**
In `themes/qing/source/css/style.css`, make sure the dropdown looks good on mobile by overriding inline styles if needed. (The default `qing` theme CSS handles dropdowns reasonably well, but adding an active state to `.theme-option` helps).
```css
/* Append to themes/qing/source/css/style.css */
.theme-dropdown li a.theme-option.active {
    color: #e67e22; /* Use theme color */
    font-weight: bold;
}
html.dark-mode .theme-dropdown {
    background-color: #222 !important;
}
html.dark-mode .theme-dropdown li a {
    color: #eee !important;
}
html.dark-mode .theme-dropdown li a:hover {
    color: #e67e22 !important;
}
```

### Task 3: Update JavaScript Logic

**Files:**
- Modify: `themes/qing/source/js/dark-mode.js`

- [ ] **Step 1: Replace JS with menu-based logic**

```javascript
// themes/qing/source/js/dark-mode.js
document.addEventListener('DOMContentLoaded', function() {
    var menuIcon = document.getElementById('theme-menu-icon');
    var themeOptions = document.querySelectorAll('.theme-option');
    
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
        
        // Update main menu icon
        if (menuIcon) {
            menuIcon.className = 'fa ' + icons[mode];
        }
        
        // Update active state in dropdown
        themeOptions.forEach(function(opt) {
            if (opt.getAttribute('data-mode') === mode) {
                opt.classList.add('active');
            } else {
                opt.classList.remove('active');
            }
        });
    }

    function initTheme() {
        var savedMode = localStorage.getItem('qing_theme_mode') || 'auto';
        applyTheme(savedMode);
    }

    // Handle clicks on dropdown options
    themeOptions.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            var mode = this.getAttribute('data-mode');
            localStorage.setItem('qing_theme_mode', mode);
            applyTheme(mode);
            
            // For mobile: close the dropdown by blurring or removing hover state if possible
            var dropdown = this.closest('.theme-dropdown');
            if (dropdown) {
                dropdown.style.display = 'none';
                setTimeout(function() {
                    dropdown.style.display = '';
                }, 100); // quick reset to let css hover take over again later
            }
        });
    });

    // Handle system theme changes
    mediaQuery.addEventListener('change', function() {
        var savedMode = localStorage.getItem('qing_theme_mode') || 'auto';
        if (savedMode === 'auto') {
            applyTheme('auto');
        }
    });

    initTheme();
});
```