# Chinese Style Scroll Carousel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the homepage carousel image into a traditional Chinese painting scroll using pure CSS.

**Architecture:** 
- Keep the existing `.carousel` HTML structure.
- Redefine `.carousel` in `_style.less` with padding, borders, and pseudo-elements for the scroll rods.
- Add corresponding styles to `_dark-mode.less`.
- Manually compile/sync the changes to `style.css` to bypass local build environment issues.

**Tech Stack:** Hexo (Less/CSS).

---

### Task 1: Update Carousel Styles in Less

**Files:**
- Modify: `themes/qing/source/css/less/_style.less:468-473`

- [ ] **Step 1: Replace old `.carousel` styling**
Replace the `.carousel` block (around line 468) with the new scroll-style CSS.

```less
.carousel {
    position: relative;
    margin: 30px 15px 40px;
    padding: 15px 35px;
    background-color: #fdfaf4; /* Rice paper background */
    border-top: 2px solid #8b2110; /* Silk border */
    border-bottom: 2px solid #8b2110;
    box-shadow: 0 5px 15px rgba(0,0,0,0.08);
    
    /* Left scroll rod */
    &::before {
        content: '';
        position: absolute;
        top: -10px;
        left: -15px;
        width: 30px;
        height: ~"calc(100% + 20px)";
        background: linear-gradient(to right, #4a2c11 0%, #8b5a2b 30%, #5c3a21 70%, #2c1a0a 100%);
        border-radius: 15px;
        box-shadow: 3px 5px 10px rgba(0,0,0,0.3);
        z-index: 2;
    }

    /* Right scroll rod */
    &::after {
        content: '';
        position: absolute;
        top: -10px;
        right: -15px;
        width: 30px;
        height: ~"calc(100% + 20px)";
        background: linear-gradient(to left, #4a2c11 0%, #8b5a2b 30%, #5c3a21 70%, #2c1a0a 100%);
        border-radius: 15px;
        box-shadow: -3px 5px 10px rgba(0,0,0,0.3);
        z-index: 2;
    }

    a {
        display: block;
        overflow: hidden;
        border: 1px solid rgba(0,0,0,0.05);
    }

    img {
        width: 100%;
        display: block;
        transition: transform 0.5s ease;
        &:hover {
            transform: scale(1.03);
        }
    }
}
```

### Task 2: Add Dark Mode Overrides

**Files:**
- Modify: `themes/qing/source/css/less/_dark-mode.less`

- [ ] **Step 1: Append dark mode specific variables for the carousel**

```less
// Add inside the html.dark-mode block or at the end of _dark-mode.less
html.dark-mode {
    .carousel {
        background-color: #2c2825 !important;
        border-top-color: #5a1910 !important;
        border-bottom-color: #5a1910 !important;
        box-shadow: 0 5px 15px rgba(0,0,0,0.5) !important;
        
        a {
            border-color: rgba(255,255,255,0.05) !important;
        }
    }
}
```

### Task 3: Update Pre-compiled CSS

**Files:**
- Modify: `themes/qing/source/css/style.css`

- [ ] **Step 1: Replace old `.carousel` block in `style.css`**
Find the block `.carousel { margin-bottom: 20px; } .carousel img { width: 100%; }` (around line 488) and replace it with:

```css
.carousel {
  position: relative;
  margin: 30px 15px 40px;
  padding: 15px 35px;
  background-color: #fdfaf4;
  border-top: 2px solid #8b2110;
  border-bottom: 2px solid #8b2110;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}
.carousel::before {
  content: '';
  position: absolute;
  top: -10px;
  left: -15px;
  width: 30px;
  height: calc(100% + 20px);
  background: linear-gradient(to right, #4a2c11 0%, #8b5a2b 30%, #5c3a21 70%, #2c1a0a 100%);
  border-radius: 15px;
  box-shadow: 3px 5px 10px rgba(0, 0, 0, 0.3);
  z-index: 2;
}
.carousel::after {
  content: '';
  position: absolute;
  top: -10px;
  right: -15px;
  width: 30px;
  height: calc(100% + 20px);
  background: linear-gradient(to left, #4a2c11 0%, #8b5a2b 30%, #5c3a21 70%, #2c1a0a 100%);
  border-radius: 15px;
  box-shadow: -3px 5px 10px rgba(0, 0, 0, 0.3);
  z-index: 2;
}
.carousel a {
  display: block;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.05);
}
.carousel img {
  width: 100%;
  display: block;
  transition: transform 0.5s ease;
}
.carousel img:hover {
  transform: scale(1.03);
}
```

- [ ] **Step 2: Append dark mode CSS to the bottom of `style.css`**

```css
/* Append at the very end of themes/qing/source/css/style.css */
html.dark-mode .carousel {
  background-color: #2c2825 !important;
  border-top-color: #5a1910 !important;
  border-bottom-color: #5a1910 !important;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5) !important;
}
html.dark-mode .carousel a {
  border-color: rgba(255, 255, 255, 0.05) !important;
}
```