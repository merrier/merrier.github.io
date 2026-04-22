const jsdom = require("jsdom");
const { JSDOM } = jsdom;
JSDOM.fromURL("https://www.dpm.org.cn/About.html", {
  runScripts: "dangerously",
  resources: "usable"
}).then(dom => {
  setTimeout(() => {
    const links = Array.from(dom.window.document.querySelectorAll('a.link_back'));
    const target = links.find(a => a.textContent.includes('更多院史编年内容'));
    if (target) {
        console.log(target.innerHTML);
    }
  }, 3000);
}).catch(err => {
    console.error(err);
});
