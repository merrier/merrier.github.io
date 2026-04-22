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
        
        // Notify iframe calendars
        var iframes = document.querySelectorAll('.he-calendar-widget iframe');
        iframes.forEach(function(iframe) {
            if (iframe.contentWindow) {
                // We send both a common JSON object and a simple string to maximize compatibility
                var message = { type: 'theme-change', mode: isDark ? 'dark' : 'light' };
                iframe.contentWindow.postMessage(message, '*');
                // Some older or different implementations might expect a raw string:
                iframe.contentWindow.postMessage(isDark ? 'dark' : 'light', '*');
            }
        });
        
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