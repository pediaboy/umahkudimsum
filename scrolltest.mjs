import puppeteer from "puppeteer-core";
const b = await puppeteer.launch({ executablePath:"/usr/bin/google-chrome", headless:true,
  args:["--no-sandbox","--disable-dev-shm-usage","--hide-scrollbars"], protocolTimeout:90000 });
const p = await b.newPage();
await p.setViewport({ width: 390, height: 844 });
await p.goto("http://localhost:3000", { waitUntil:"domcontentloaded", timeout:45000 });
await new Promise(r=>setTimeout(r,1500));
const before = await p.evaluate(()=>[...document.images].filter(i=>getComputedStyle(i.parentElement).clipPath.includes("100%")).length);
await p.evaluate(async()=>{ for(let y=0;y<document.body.scrollHeight;y+=400){window.scrollTo(0,y); await new Promise(r=>setTimeout(r,60));} window.scrollTo(0,0); });
await new Promise(r=>setTimeout(r,1500));
const after = await p.evaluate(()=>[...document.images].filter(i=>getComputedStyle(i.parentElement).clipPath.includes("100%")).length);
console.log("clipped before scroll:", before, "| after scroll:", after);
await b.close();
