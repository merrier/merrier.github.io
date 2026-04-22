const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.dpm.org.cn/About.html', {waitUntil: 'networkidle2'});
  const element = await page.$('.regarding2 .link'); // Wait, the class for '更多院史编年内容'
  // Let's find the exact link
  const link = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a.link_back'));
    const target = links.find(a => a.textContent.includes('更多院史编年内容'));
    if (!target) return null;
    const rect = target.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(target);
    return {
      text: target.textContent,
      width: computedStyle.width,
      height: computedStyle.height,
      border: computedStyle.border,
      background: computedStyle.background,
      color: computedStyle.color,
      html: target.outerHTML,
      className: target.className
    };
  });
  console.log(JSON.stringify(link, null, 2));
  await browser.close();
})();
