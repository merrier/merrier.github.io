from playwright.sync_api import sync_playwright
import json

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('https://www.dpm.org.cn/About.html', wait_until='networkidle')
    
    # Extract computed styles
    style = page.evaluate('''() => {
        const el = Array.from(document.querySelectorAll('a.link_back')).find(a => a.textContent.includes('更多院史编年内容'));
        if (!el) return null;
        const cs = window.getComputedStyle(el);
        return {
            width: cs.width,
            height: cs.height,
            lineHeight: cs.lineHeight,
            padding: cs.padding,
            border: cs.border,
            background: cs.background,
            color: cs.color,
            fontSize: cs.fontSize,
            fontFamily: cs.fontFamily,
            display: cs.display,
            margin: cs.margin,
            textDecoration: cs.textDecoration,
            backgroundImage: cs.backgroundImage,
            backgroundColor: cs.backgroundColor,
            borderRadius: cs.borderRadius,
            boxShadow: cs.boxShadow,
            textAlign: cs.textAlign
        };
    }''')
    print(json.dumps(style, indent=2))
    browser.close()
