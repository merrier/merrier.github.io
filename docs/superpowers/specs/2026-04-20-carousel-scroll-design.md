# Chinese Style Scroll Carousel Design

## 1. Goal
Redesign the existing `.carousel` image block on the homepage to look like a traditional Chinese painting scroll (画卷/卷轴). This will enhance the overall "National Style" (国风) aesthetic of the `qing` Hexo theme.

## 2. Appearance & Structure
- **Container (`.carousel` or a new wrapper):**
  - Will act as the "mounting paper" (装裱纸).
  - Background color: A soft rice-paper beige (e.g., `#fdfaf4` or `#f4ecc2`).
  - Padding: Added padding (e.g., 15px top/bottom, 40px left/right) to simulate the unpainted border.
  - Border: A thin dark red or ink-black line on the top and bottom edges (simulating "锦边" silk borders).
- **Scroll Rods (画杆/画轴):**
  - Using CSS pseudo-elements (`::before` and `::after`) on the container.
  - Positioned absolutely on the left and right edges.
  - Width: ~15px.
  - Background: A linear gradient simulating a 3D dark wood cylinder (`#5c3a21` with shading).
  - Height: Slightly taller than the container (e.g., `calc(100% + 20px)`), overflowing the top and bottom.
  - Scroll ends (轴头): Can be simulated with `box-shadow` or another set of pseudo elements (if needed, or just keep the rods simple and elegant).
- **Image Element:**
  - Wrapped in a `.carousel-img-wrapper` with `overflow: hidden`.
  - The image fills the wrapper, but the wrapper has `box-shadow` to simulate the slight depth of the painting on the paper.
  - Hover effect: The image scales up slightly (`transform: scale(1.05)`) with a smooth transition (`transition: transform 0.5s ease`).

## 3. CSS Architecture
- All styling will be implemented purely in CSS/Less, avoiding the need for external image assets for the scroll structure.
- **Dark Mode Support:** The beige background should invert correctly or be explicitly handled in `_dark-mode.less` so it doesn't become glaring white or lose its aesthetic in dark mode. (e.g., use a muted dark brown/grey paper color `#2c2825` for dark mode).

## 4. Implementation Scope
- `themes/qing/layout/index.njk`: Update the HTML structure of the `.carousel` block.
- `themes/qing/source/css/less/_style.less`: Replace the old `.carousel` styles with the new scroll styles.
- `themes/qing/source/css/less/_dark-mode.less`: Add dark mode overrides for the scroll background and rods.
- `themes/qing/source/css/style.css`: Ensure changes are written directly since `gulp` isn't fully reliable.