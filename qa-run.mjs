import puppeteer from "puppeteer-core";
import fs from "node:fs";

const VIEWPORTS = [
  { name: "mobile-360", w: 360, h: 780 },
  { name: "mobile-390", w: 390, h: 844 },
  { name: "tablet-portrait-768", w: 768, h: 1024 },
  { name: "tablet-landscape-1024", w: 1024, h: 768 },
  { name: "laptop-1280", w: 1280, h: 800 },
  { name: "desktop-1920", w: 1920, h: 1080 },
];

const browser = await puppeteer.launch({
  executablePath: "/usr/bin/google-chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--hide-scrollbars"],
  protocolTimeout: 180000,
});

fs.mkdirSync("./qa", { recursive: true });
const out = [];

for (const v of VIEWPORTS) {
  process.stdout.write(`→ ${v.name} ... `);
  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  await page.setViewport({ width: v.w, height: v.h, deviceScaleFactor: 1 });
  await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded", timeout: 45000 });
  await new Promise((r) => setTimeout(r, 2500));

  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.7);
    const max = document.body.scrollHeight;
    for (let y = 0; y < max; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 130));
    }
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 2500));

  const m = await page.evaluate((vw) => {
    const de = document.documentElement;
    const vis = (el) => {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return cs.visibility !== "hidden" && cs.display !== "none" && Number(cs.opacity) > 0.05 && r.width > 0 && r.height > 0;
    };
    const clipped = [];
    document.querySelectorAll("h1,h2,h3,h4,p,span,a,button,dt,dd,li,blockquote,figcaption").forEach((el) => {
      if (!vis(el)) return;
      const cs = getComputedStyle(el);
      if (cs.overflow === "visible") return;
      if (cs.overflowY === "auto" || cs.overflowY === "scroll") return;
      const d = el.scrollHeight - el.clientHeight;
      if (d > 3) clipped.push({ tag: el.tagName.toLowerCase(), over: d, text: (el.textContent || "").trim().slice(0, 30) });
    });
    const small = [];
    if (vw <= 768) {
      document.querySelectorAll("a,button,[role=tab]").forEach((el) => {
        if (!vis(el)) return;
        const r = el.getBoundingClientRect();
        if (r.height < 40 && r.width > 0) small.push({ text: (el.textContent || "").trim().slice(0, 22), h: Math.round(r.height) });
      });
    }
    const broken = [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.getAttribute("src"));
    const pending = [...document.images].filter((i) => !i.complete).length;
    const h1 = document.querySelector("h1");
    const res = performance.getEntriesByType("resource");
    const nav = performance.getEntriesByType("navigation")[0];
    let bytes = nav?.transferSize || 0;
    for (const r of res) bytes += r.transferSize || 0;
    return {
      scrollWidth: de.scrollWidth,
      clientWidth: de.clientWidth,
      horizontalOverflow: de.scrollWidth > de.clientWidth + 1,
      docHeight: de.scrollHeight,
      imgCount: document.images.length,
      broken, pending,
      clipped: clipped.slice(0, 5),
      small: small.slice(0, 6),
      kb: Math.round(bytes / 1024),
      reqs: res.length + 1,
      h1Size: h1 ? Math.round(parseFloat(getComputedStyle(h1).fontSize)) : null,
      h1Font: h1 ? getComputedStyle(h1).fontFamily.split(",")[0].replace(/"/g, "") : null,
    };
  }, v.w);

  await page.screenshot({ path: `./qa/${v.name}-fold.png` });
  await page.screenshot({ path: `./qa/${v.name}-full.png`, fullPage: true });
  out.push({ viewport: v.name, ...m });
  const bad = [];
  if (m.horizontalOverflow) bad.push(`OVERFLOW ${m.scrollWidth}>${m.clientWidth}`);
  if (m.broken.length) bad.push(`BROKEN ${m.broken.length}`);
  if (m.clipped.length) bad.push(`CLIPPED ${m.clipped.length}`);
  if (m.small.length) bad.push(`SMALL ${m.small.length}`);
  console.log(`${m.kb}KB ${m.reqs}req h=${m.docHeight} ${bad.length ? "❌ " + bad.join(" | ") : "✅ clean"}`);
  if (m.clipped.length) console.log("    clipped:", JSON.stringify(m.clipped));
  if (m.small.length) console.log("    small:", JSON.stringify(m.small));
  if (m.broken.length) console.log("    broken:", JSON.stringify(m.broken.slice(0, 4)));
  await page.close();
}

await browser.close();
fs.writeFileSync("./qa/report.json", JSON.stringify(out, null, 2));
console.log("\nsections:", out[0] ? "ok" : "n/a");
