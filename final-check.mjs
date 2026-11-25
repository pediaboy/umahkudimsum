import puppeteer from "puppeteer-core";
const URL_ = "https://umahkudimsum.vercel.app";
const b = await puppeteer.launch({ executablePath:"/usr/bin/google-chrome", headless:true,
  args:["--no-sandbox","--disable-dev-shm-usage","--hide-scrollbars"], protocolTimeout:90000 });
for (const v of [{n:"mobile-390",w:390,h:844},{n:"tablet-768",w:768,h:1024},{n:"desktop-1920",w:1920,h:1080}]) {
  const p = await b.newPage();
  await p.setViewport({width:v.w,height:v.h});
  await p.goto(URL_, {waitUntil:"domcontentloaded", timeout:45000});
  await new Promise(r=>setTimeout(r,1800));
  const m = await p.evaluate(() => {
    const small = [];
    document.querySelectorAll("a,button").forEach(el=>{
      const r=el.getBoundingClientRect();
      if(!r.width&&!r.height) return;
      if(r.width<40||r.height<40) small.push({t:(el.textContent||el.getAttribute("aria-label")||"").trim().slice(0,20),h:Math.round(r.height)});
    });
    const broken=[...document.images].filter(i=>i.complete&&i.naturalWidth===0).length;
    const res=performance.getEntriesByType("resource"); let t=0; for(const r of res) t+=r.transferSize||0;
    return { docW:document.documentElement.scrollWidth, vw:innerWidth, small:small.slice(0,5), nSmall:small.length,
             broken, kb:Math.round(t/1024), imgs:document.images.length,
             h1:document.querySelector("h1")?.textContent?.trim().slice(0,40) };
  });
  console.log(`${v.n.padEnd(13)} ${m.docW>m.vw+1?"OVERFLOW":"ok"} | broken=${m.broken} | smallTap=${m.nSmall} | ${m.kb}KB | imgs=${m.imgs}`);
  if(m.small.length) console.log("   ", JSON.stringify(m.small));
  await p.close();
}
await b.close();
