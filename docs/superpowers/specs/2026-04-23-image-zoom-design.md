# 文章详情页图片放大功能设计 (Medium-Zoom + 中国风)

## 1. 需求背景
在 Qing 主题的文章详情页中，目前图片仅支持基础渲染和图注显示，无法点击放大。用户希望引入图片放大功能，并结合博客现有的中国风设计（特别是要兼容已有的暗黑模式）。

## 2. 方案选择
- **核心库**: `medium-zoom`
  - **原因**: 现代、轻量（无依赖）、支持纯 JS 调用，放大效果平滑（类似 Medium 体验），非常适合注重阅读体验的博客。
  - **引入方式**: 通过 CDN (如 jsdelivr 或 unpkg) 引入，避免增加本地打包体积。

## 3. 视觉与交互设计 (Modern Minimalist + 中国风)
- **交互**: 
  - 鼠标悬停在文章图片上时，显示 `zoom-in` 鼠标指针，提示可点击。
  - 左键点击图片，图片平滑放大到屏幕中央。
  - 再次点击或滚动页面、按 ESC 键，图片恢复原状。
- **视觉 (Light Mode)**:
  - 遮罩层背景: 半透明的米白色或宣纸色调 (如 `rgba(245, 241, 233, 0.9)`)，带轻微的高斯模糊 (`backdrop-filter: blur(4px)`)，营造干净雅致的现代中国风。
- **视觉 (Dark Mode)**:
  - 遮罩层背景: 半透明的深色水墨基调 (如 `rgba(30, 30, 30, 0.9)`)，同样带高斯模糊，确保在暗黑模式下不刺眼且融入整体氛围。
- **细节修饰**:
  - 为放大后的图片增加一个极细的边框 (如 `1px solid rgba(0,0,0,0.1)` 或暗黑模式下的 `rgba(255,255,255,0.1)`) 和轻微的阴影，使其在背景中更具立体感（可选，视 medium-zoom 支持情况而定，通常通过 CSS 覆盖实现）。

## 4. 实施步骤

### 步骤 1: 引入 `medium-zoom` 脚本
- 在 Qing 主题的公共脚本区域 (如 `themes/qing/layout/_partial/script.njk`) 中，引入 `medium-zoom` 的 CDN 链接。
- **代码示例**:
  ```html
  <script src="https://cdn.jsdelivr.net/npm/medium-zoom@1.1.0/dist/medium-zoom.min.js"></script>
  ```

### 步骤 2: 编写初始化逻辑与主题适配
- 在主题的主 JS 文件 (如 `themes/qing/source/js/app.js` 或新建一个独立文件并引入) 中，添加 `medium-zoom` 的初始化代码。
- **目标元素**: 选择文章内容区域的图片，例如 `.post-content img`。
- **主题适配逻辑**:
  - 需要监听主题切换事件或在初始化时读取当前主题状态（通过 `localStorage.getItem('qing_theme_mode')` 或 `document.documentElement.classList.contains('dark-mode')` 等现有逻辑判断）。
  - 根据当前主题，动态设置 `medium-zoom` 的 `background` 属性。
  - 如果博客的主题切换是无刷新的，需要监听切换事件并在切换时更新 `medium-zoom` 实例的背景色 (`zoom.update({ background: newColor })`)。

### 步骤 3: 编写 CSS 样式 (模糊效果与修饰)
- 在主题的 CSS/Less 文件中 (如 `themes/qing/source/css/less/_style.less` 或 `_dark-mode.less`)，添加针对 `medium-zoom` 遮罩层的样式覆盖，以实现高斯模糊等高级效果。
- **代码示例**:
  ```less
  /* 基础模式 (中国风浅色遮罩) */
  .medium-zoom-overlay {
      background: rgba(245, 241, 233, 0.85) !important;
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      z-index: 999; /* 确保在导航栏之上 */
  }

  /* 放大后的图片层级 */
  .medium-zoom-image--opened {
      z-index: 1000;
      /* 可选的边框/阴影修饰 */
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      border-radius: 4px;
  }

  /* 暗黑模式适配 */
  html.dark-mode .medium-zoom-overlay,
  body.dark-mode .medium-zoom-overlay { /* 根据实际使用的暗黑模式 class 调整 */
      background: rgba(25, 25, 25, 0.85) !important;
  }
  ```

### 步骤 4: 测试与验证
- 验证本地编译 `hexo g && hexo s`。
- 在浅色和暗黑模式下分别点击图片，检查背景色、模糊效果和交互是否正常。
- 确保在移动端设备上也能良好体验。
