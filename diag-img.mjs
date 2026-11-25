import puppeteer from "puppeteer-core";
const b = await puppeteer.launch({ executablePath:"/usr/bin/google-chrome", headless:true,
  args:["--no-sandbox","--disable-dev-shm-usage","--hide-scrollbars"], protocolTimeout:90000 });
const p = await b.newPage();
await p.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 3 });
await p.goto("http://localhost:3000", { waitUntil:"domcontentloaded", timeout:45000 });
await new Promise(r=>setTimeout(r,2500));
const out = await p.evaluate(() => {
  const res = [];
  document.querySelectorAll("img").forEach((img, i) => {
    const r = img.getBoundingClientRect();
    // walk up looking for a clipping / hiding ancestor
    let clip = "", op = 1, chain = [];
    let el = img;
    while (el && el !== document.body) {
      const cs = getComputedStyle(el);
      if (cs.clipPath && cs.clipPath !== "none") clip = cs.clipPath;
      op *= parseFloat(cs.opacity || "1");
      if (cs.transform && cs.transform !== "none") chain.push("tf");
      el = el.parentElement;
    }
    if (i < 6 || r.width === 0) res.push({
      i, src: img.getAttribute("src")?.slice(0, 42),
      w: Math.round(r.width), h: Math.round(r.height),
      loaded: img.complete && img.naturalWidth > 0,
      nat: img.naturalWidth, clip: clip.slice(0, 30), op: op.toFixed(2),
    });
  });
  return res;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
