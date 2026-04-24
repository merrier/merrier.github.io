# Image Zoom Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a Chinese-style image zoom feature on the blog post detail page using medium-zoom, with support for dark mode.

**Architecture:** Include medium-zoom script via CDN in the layout script partial. Initialize it in the main `app.js` file for post content images. Apply custom CSS styles in the theme's LESS files to achieve the "Modern Minimalist + Chinese style" overlay effect, utilizing the existing dark mode class toggle mechanism for theme compatibility.

**Tech Stack:** JavaScript, LESS, Hexo (Nunjucks templates), medium-zoom (via CDN)

---

### Task 1: Include medium-zoom script

**Files:**
- Modify: `/Users/merrier/repos/merrier.github.io/themes/qing/layout/_partial/script.njk`

- [ ] **Step 1: Append medium-zoom CDN script**

Add the medium-zoom script tag at the end of the file.

```html
<!-- themes/qing/layout/_partial/script.njk -->
... existing code ...
{{ js('js/app.js?rev=@@hash') | safe }}

<!-- medium-zoom -->
<script src="https://cdn.jsdelivr.net/npm/medium-zoom@1.1.0/dist/medium-zoom.min.js"></script>
```

- [ ] **Step 2: Commit**

```bash
git add themes/qing/layout/_partial/script.njk
git commit -m "feat: add medium-zoom script to layout"
```

### Task 2: Initialize medium-zoom in app.js

**Files:**
- Modify: `/Users/merrier/repos/merrier.github.io/themes/qing/source/js/app.js`

- [ ] **Step 1: Add initialization code**

Add the initialization logic inside the `window.onload` function, after `addImageCaptions();`. It should target both post content images and gallery images, excluding any with a `.no-zoom` class.

```javascript
// themes/qing/source/js/app.js
... existing code ...
    // 文章详情页图片自动添加 alt 描述
    function addImageCaptions() {
        // ... existing code ...
    }
    addImageCaptions();

    // 初始化 medium-zoom
    if (typeof mediumZoom === 'function') {
        var zoom = mediumZoom('.post-content img:not(.no-zoom), #post-gallery img:not(.no-zoom)', {
            margin: 24
        });
    }

};
```

- [ ] **Step 2: Commit**

```bash
git add themes/qing/source/js/app.js
git commit -m "feat: initialize medium-zoom for post images"
```

### Task 3: Apply Chinese style and Dark Mode CSS

**Files:**
- Modify: `/Users/merrier/repos/merrier.github.io/themes/qing/source/css/less/_style.less`
- Modify: `/Users/merrier/repos/merrier.github.io/themes/qing/source/css/less/_dark-mode.less`

- [ ] **Step 1: Add Light Mode styles**

Append the light mode overlay styles to the end of `_style.less`.

```less
// themes/qing/source/css/less/_style.less
... existing code ...

/* medium-zoom overlay - Light Mode (Modern Minimalist + Chinese style) */
.medium-zoom-overlay {
    background: rgba(245, 241, 233, 0.85) !important;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 999;
}

.medium-zoom-image--opened {
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
}
```

- [ ] **Step 2: Add Dark Mode styles**

Append the dark mode overlay styles to the end of `_dark-mode.less`.

```less
// themes/qing/source/css/less/_dark-mode.less
... existing code ...

/* medium-zoom overlay - Dark Mode */
html.dark-mode .medium-zoom-overlay {
    background: rgba(30, 30, 30, 0.85) !important;
}

html.dark-mode .medium-zoom-image--opened {
    box-shadow: 0 4px 15px rgba(255, 255, 255, 0.05);
}
```

- [ ] **Step 3: Commit**

```bash
git add themes/qing/source/css/less/_style.less themes/qing/source/css/less/_dark-mode.less
git commit -m "style: add chinese style and dark mode css for medium-zoom"
```

### Task 4: Compile CSS and Generate Static Files

**Files:**
- Run commands in terminal

- [ ] **Step 1: Compile Less to CSS**

Run the gulp task to compile the updated LESS files.
```bash
npx gulp less-task
```

- [ ] **Step 2: Generate Hexo static files**

Clean and generate the static site.
```bash
npx hexo clean && npx hexo g
```

- [ ] **Step 3: Run Gulp deployment tasks**

Run the default gulp task to minify CSS/JS/HTML and add revision hashes.
```bash
npx gulp
```

- [ ] **Step 4: Commit generated public files (Optional but good for tracking state)**

```bash
git add public/ themes/qing/source/css/style.css
git commit -m "chore: compile css and generate static files for image zoom"
```
