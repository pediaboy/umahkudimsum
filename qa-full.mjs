import puppeteer from "puppeteer-core";

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
  protocolTimeout: 120000,
});

const report = [];

for (const v of VIEWPORTS) {
  const page = await browser.newPage();
  await page.setViewport({ width: v.w, height: v.h, deviceScaleFactor: 1 });
  await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded", timeout: 45000 });
  await new Promise((r) => setTimeout(r, 1800));

  // trigger every reveal, then settle images
  const total = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < total; y += Math.round(v.h * 0.8)) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await new Promise((r) => setTimeout(r, 60));
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.evaluate(
    () =>
      new Promise((res) => {
        const imgs = [...document.images];
        let left = imgs.filter((i) => !i.complete).length;
        if (!left) return res(true);
        const t = setTimeout(res, 8000);
        imgs.forEach((i) => {
          if (i.complete) return;
          const done = () => {
            if (--left <= 0) {
              clearTimeout(t);
              res(true);
            }
          };
          i.addEventListener("load", done, { once: true });
          i.addEventListener("error", done, { once: true });
        });
      })
  );

  const m = await page.evaluate(() => {
    const vw = window.innerWidth;
    const docW = document.documentElement.scrollWidth;

    const broken = [...document.images]
      .filter((i) => i.complete && i.naturalWidth === 0)
      .map((i) => i.currentSrc || i.src)
      .slice(0, 6);

    // tap targets: interactive elements smaller than 40px in either axis
    const small = [];
    document.querySelectorAll("a,button,[role=button]").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) return;
      if (r.width < 40 || r.height < 40) {
        const t = (el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 22);
        if (t) small.push({ t, w: Math.round(r.width), h: Math.round(r.height) });
      }
    });

    // clipped text: overflow hidden with content taller than box
    const clipped = [];
    document.querySelectorAll("h1,h2,h3,p,span,li").forEach((el) => {
      const s = getComputedStyle(el);
      if (s.overflow !== "hidden" && s.overflowY !== "hidden") return;
      if (el.scrollHeight - el.clientHeight > 3 && el.clientHeight > 0) {
        clipped.push((el.textContent || "").trim().slice(0, 22));
      }
    });

    const sections = [...document.querySelectorAll("section,footer,nav")]
      .map((s) => ({ id: s.id || s.tagName.toLowerCase(), h: Math.round(s.getBoundingClientRect().height) }))
      .filter((s) => s.h > 40);

    const weight = (() => {
      const res = performance.getEntriesByType("resource");
      let t = 0;
      for (const r of res) t += r.transferSize || 0;
      const nav = performance.getEntriesByType("navigation")[0];
      return Math.round((t + (nav?.transferSize || 0)) / 1024);
    })();

    return {
      vw,
      docW,
      bodyH: document.body.scrollHeight,
      broken,
      small: small.slice(0, 8),
      clipped: [...new Set(clipped)].slice(0, 6),
      sections,
      weight,
      font: getComputedStyle(document.querySelector("h1")).fontFamily,
    };
  });

  report.push({ ...v, ...m });
  const overflow = m.docW > m.vw + 1;
  console.log(
    `${v.name.padEnd(21)} ${String(m.weight).padStart(5)}KB  ${String(m.bodyH).padStart(6)}px  ` +
      `${overflow ? "OVERFLOW " + m.docW + ">" + m.vw : "ok"}  ` +
      `broken=${m.broken.length} small=${m.small.length} clipped=${m.clipped.length}`
  );
  if (m.broken.length) console.log("   broken:", m.broken.join(", "));
  if (m.small.length) console.log("   small:", JSON.stringify(m.small));
  if (m.clipped.length) console.log("   clipped:", JSON.stringify(m.clipped));

  await page.close();
}

await browser.close();

const worstOverflow = report.filter((r) => r.docW > r.vw + 1);
const anyBroken = report.reduce((a, r) => a + r.broken.length, 0);
const anyClipped = report.reduce((a, r) => a + r.clipped.length, 0);
const anySmall = report.reduce((a, r) => a + r.small.length, 0);

console.log("\n================ SUMMARY ================");
console.log("overflow issues:", worstOverflow.length ? worstOverflow.map((r) => r.name).join(", ") : "none");
console.log("broken images:", anyBroken);
console.log("clipped text:", anyClipped);
console.log("small tap targets:", anySmall);
console.log("weights KB:", report.map((r) => r.name + "=" + r.weight).join(" "));
console.log("display font:", report[0].font);
console.log("section heights @390:", JSON.stringify(report[1].sections));
