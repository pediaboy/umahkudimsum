import puppeteer from "puppeteer-core";
const b = await puppeteer.launch({
  executablePath: "/usr/bin/google-chrome", headless: true,
  args: ["--no-sandbox","--disable-dev-shm-usage","--hide-scrollbars"],
  protocolTimeout: 60000,
});
const p = await b.newPage();
await p.setViewport({ width: 390, height: 844 });
await p.goto("http://localhost:3000", { waitUntil: "domcontentloaded", timeout: 40000 });
await new Promise(r => setTimeout(r, 2000));
const r1 = await p.evaluate(() => ({
  vw: innerWidth,
  docW: document.documentElement.scrollWidth,
  bodyH: document.body.scrollHeight,
  n: document.querySelectorAll("*").length,
}));
console.log("viewport", r1.vw, "docW", r1.docW, "bodyH", r1.bodyH, "nodes", r1.n);
const secs = await p.evaluate(() =>
  [...document.querySelectorAll("section,footer,nav")].map(s => ({
    tag: s.tagName.toLowerCase(), id: s.id || "",
    h: Math.round(s.getBoundingClientRect().height),
  }))
);
secs.forEach(s => console.log("  " + String(s.h).padStart(6) + "px " + s.tag + " " + s.id));
await b.close();
