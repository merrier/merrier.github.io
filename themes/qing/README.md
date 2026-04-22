# Hexo Theme Qing (青)

> 一款基于 Hexo 的国风典雅主题，融合中国传统文化元素与现代前端设计。

**Qing (青)** 是一款为 Hexo 打造的响应式博客主题。它的设计灵感来源于中国古典文化（宣纸、竹简、水墨、印章、太极、山水），并在保留古典韵味的同时，吸收了现代化组件库（如 Zhui 组件库）的交互体验，旨在为博主提供一个宁静、雅致的写作与阅读空间。

## 🌟 核心特色

- **国风设计语言**：
  - **水墨山水**：首页顶部支持随机或自定义的中国风山水画背景，并配有半透明遮罩，使文字清晰可见。
  - **宣纸与竹简**：文章分类、标签、日期等元信息采用仿古宣纸底色与竹简排版，配以精致的红色印章（动态计算文章年份对应的十二地支）。
  - **竹林归档**：时光轴（归档页）被精心设计为“竹子”生长的形态，年份为竹节，文章为竹叶，充满生机与古意。
  - **云纹标题**：文章详情页标题融入故宫同款云纹装饰，庄重典雅。
  - **中国风日历**：侧边栏内置高颜值的国风日历小工具，支持公历、农历、节气与黄历宜忌。
- **现代化体验**：
  - **深浅色模式 (Dark Mode)**：全站原生支持“浅色”、“深色”及“跟随系统”三种主题模式，导航栏一键平滑切换，并能与内置日历组件丝滑联动。
  - 引入了 `Zhui` 组件库的**太极 Loading 动画**（纯 CSS 径向渐变实现），在图片懒加载与全局页面加载时展示。
  - 引入了 `Zhui` 组件库的**毛笔书写风格输入框**，用于全站搜索。
- **排版与阅读体验**：
  - 全局采用 `Noto Serif SC`, `Songti SC` 等衬线字体，增强文学气息。
  - 文章内插图自动提取 `alt` 属性，并在图片下方生成居中且带有斜体水墨色的图注（Image Caption）。
  - 支持响应式设计，完美适配移动端与桌面端。
- **技术栈优化**：
  - 模板引擎采用 `Nunjucks (.njk)`，逻辑清晰，渲染高效。
  - CSS 预处理器采用 `Less`，结构模块化，便于二次开发。
  - 构建工具已全面升级至 **Gulp 4**，支持并行与串行的高效前端工作流（压缩、编译、混淆）。

## 🚀 安装与使用

### 1. 下载主题

将本主题下载（或 Clone）到你的 Hexo 博客的 `themes` 目录下：

```bash
cd your-hexo-site
git clone https://github.com/your-username/hexo-theme-qing.git themes/qing
```

### 2. 启用主题

修改 Hexo 根目录下的 `_config.yml`，将 `theme` 字段设置为 `qing`：

```yaml
theme: qing
```

### 3. 安装依赖与构建

由于本主题使用了 Gulp 4 进行 Less 编译与资源压缩，你需要进入主题目录安装依赖并执行一次构建：

```bash
cd themes/qing
npm install
npx gulp default
```

### 4. 启动本地服务

回到 Hexo 根目录，启动服务即可预览效果：

```bash
cd ../../
hexo server
```

## 📋 全部配置预览 (`_config.yml`)

你可以通过修改主题目录下的 `_config.yml` 来开启或关闭相关功能。以下是主题支持的完整配置清单：

```yaml
# ---------------------------------------------------------------
#   Site Information And Theme Configuration Settings
#   language: zh-CN
# ---------------------------------------------------------------

## menu (顶部导航菜单)
menu:
- page: Home
  url: /
  icon: fa-home
- page: 前端
  url: /categories/frontend/
  icon: fa-tablet
# ...更多菜单配置请参考源码

## favicon (网站图标)
favicon: /favicon.ico
appleIcon: /images/hexo_others_10.png

## Feed (RSS 订阅)
rss: /atom.xml

## Carousel (右侧边栏幻灯片/推荐图片)
carousel:
  img: '/images/hexo_others_3.png'
  url: '//github.com/merrier/mobile-games'

# ==========================================
# 侧边栏小工具 (Widgets) 设置
# ==========================================
widgets:
  - search        # Zhui 风格全站搜索
  - he-calendar   # 中国风日历 (依赖 hexo-he-calendar 插件)
  - notification  # 网站公告
  - social        # 社交链接
  - category      # 分类列表
  - archive       # 归档列表
  - tagcloud      # 3D 标签云
  - friends       # 友情链接

## 搜索功能开关
jsonContent:
  searchLocal: true
  searchGoogle: false
  posts:
    title: true
    text: true
    content: true
    categories: false
    tags: false

## 中国风日历
he_calendar:
  route: 'he-calendar/' # 保持与 Hexo 根目录配置一致
  width: '100%'
  height: '130px'
  view: 'week'
  defaultTheme: 'red'
  hideHeader: true
  border_radius: '2px'

## 深色模式 (Dark Mode)
# 主题内置深色模式，无须配置，入口位于导航栏右侧，状态自动保存于浏览器 localStorage。

## 网站公告设置 (支持 HTML)
notification: |-
            <p>
                网站源码：<a href="https://github.com/merrier/merrier.github.io" target="_blank">merrier.github.io</a> <br/>
                代码集合：<a href="https://github.com/merrier/web-demo">Web Demo</a><br />
            </p>

## 社交链接设置
social:
 - name: Github
   icon: git
   href: //github.com/merrier
 - name: 邮箱
   icon: envelope-o
   href: mailto:953075999@qq.com

## 文章分类 & 归档面板设置
cate_config:
   show_count: true
   show_current: true

arch_config:
   type: 'monthly'
   format: 'YYYY年MM月'
   show_count: true
   order: -1

# 3D 标签云设置
tagcloud:
  tag3d: true
  textColour: '#444'
  outlineMethod: 'block'
  outlineColour: '#FFDAB9'
  interval: 30
  freezeActive: true
  frontSelect: true
  reverse: true
  wheelZoom: true

## 友情链接设置
links:
  - Harttle Land: https://harttle.land
  - 政子的博客: https://blog2.zhengzi.me/

# ==========================================
# 主题自定义个性化配置
# ==========================================

## 网站宣传语 (展示在左侧/顶部)
branding: 总有人间一两风，填我十万八千梦

## 设置首页头部背景 (国风主题特色配置)
## header_bg 支持三种模式:
##   - 'random': 随机中国风山水图片 (默认)
##   - 纯色/半透明代码: 例如 '#4a4a4a', 'rgb(74, 74, 74)', 或 'rgba(0, 0, 0, 0.5)'
##   - 图片路径: 例如 '/images/custom_bg.jpg' 或 'http://example.com/bg.png'
header_bg: 'random'

## 首页列表底部面板
homePanel: true

## 截取文章首页描述字数
excerptLength: 120

## 是否开启文章目录 (TOC)
toc: true

## 文章过期提醒功能
warning:
  days: 36500
  text: '本文于%d天之前发表，文中内容可能已经过时。'

## 文章内声明 (版权声明)
declaration:
  enable: true
  title: '转载声明'
  tip: |-
      商业转载请联系作者获得授权,非商业转载请注明出处 © <a href="//merrier.wang" target="_blank">Merrier说</a>

## 文章打赏 (微信/支付宝二维码)
reward:
  alipay: '/images/hexo_others_5.png'
  wepay: '/images/hexo_others_6.png'
  tip: 听说赞过就能年薪百万

# ==========================================
# 评论系统配置 (支持多种评论插件，选择一个开启)
# ==========================================
gitment:
  enable: false
livere:
  enable: false
uyan:
  enable: false
disqus:
  enable: true
  shortname: merrier
  count: true
changyan:
  enable: false
valine:
   enable: false
   appId: xOKV9J4UeQAtVkvnJC7Kq2Jn-gzGzoHsz
   appKey: erIpQac4azoCmgfBB7Dl9maa

# ==========================================
# 网站访客与分析统计
# ==========================================
## 网站访客统计 (文章阅读量与全站访问量)
visit_counter:
   site: true
   page: true

## 分析工具配置
cnzz_analytics: 1264342320
baidu_analytics:
google_analytics:
tencent_analytics:

## 百度站点认证与自动推送
baidu_site_verification:
baidu_push: true

# ==========================================
# 网站主题基础配置
# ==========================================
since: 2018
robot: 'all' ### 控制搜索引擎的抓取和索引编制行为
version: 1.0.2
```

## 🛠 开发与调试

如果你需要修改主题的 Less 样式或 JS 代码，可以使用主题内置的 Gulp 任务：

- 编译 Less 并压缩：`npx gulp less-task`
- 压缩 JS：`npx gulp minify-js`
- 压缩 HTML 模板（注意已过滤 `canvas` 内部数据源）：`npx gulp minify-html`
- 一键执行全部：`npx gulp default`

## 📝 鸣谢

- 感谢 [Hexo](https://hexo.io/) 提供的强大博客框架。
- 感谢 [Zhui 组件库](https://merrier.wang/zhui/) 提供的国风 UI 交互灵感。
- 感谢 [LoremFlickr](https://loremflickr.com/) 提供的随机图片占位服务。
- 感谢 [故宫博物院](https://www.dpm.org.cn/) 官网提供的标题云纹等传统设计灵感。

---
*“一蓑烟雨任平生，也无风雨也无晴。”* 
愿 **Qing** 能为你带来宁静的写作时光。