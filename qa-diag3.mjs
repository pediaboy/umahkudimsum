import puppeteer from "puppeteer-core";
const b = await puppeteer.launch({ executablePath:"/usr/bin/google-chrome", headless:true,
  args:["--no-sandbox","--disable-dev-shm-usage","--hide-scrollbars"], protocolTimeout:60000 });
const p = await b.newPage();
await p.setViewport({ width: 390, height: 844 });
await p.goto("http://localhost:3000", { waitUntil:"domcontentloaded", timeout:40000 });
await new Promise(r=>setTimeout(r,1500));
const out = await p.evaluate(() => {
  const sec = document.querySelector("#menu");
  const track = sec?.querySelector(".snap-x") || sec?.querySelector("div[class*='overflow-x-auto']");
  const art = sec?.querySelector("[data-card]");
  const cs = (el) => el ? getComputedStyle(el) : null;
  const t = cs(track), a = cs(art);
  const shell = document.querySelector(".shell");
  const sh = cs(shell);
  // widest unclipped element
  let worst = null;
  document.querySelectorAll("*").forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.width < 50) return;
    if (!worst || r.right > worst.right) {
      worst = { right: Math.round(r.right), w: Math.round(r.width),
        tag: el.tagName.toLowerCase(),
        cls: (typeof el.className === "string" ? el.className : "").slice(0,60) };
    }
  });
  return {
    track: track ? { display: t.display, overflowX: t.overflowX, w: Math.round(track.getBoundingClientRect().width), h: Math.round(track.getBoundingClientRect().height) } : null,
    article: art ? { display: a.display, w: Math.round(art.getBoundingClientRect().width), h: Math.round(art.getBoundingClientRect().height), shrink: a.flexShrink } : null,
    shell: shell ? { w: Math.round(shell.getBoundingClientRect().width), maxW: sh.maxWidth, width: sh.width } : null,
    worst,
    menuH: sec ? Math.round(sec.getBoundingClientRect().height) : null,
  };
});
console.log(JSON.stringify(out, null, 1));
await b.close();
