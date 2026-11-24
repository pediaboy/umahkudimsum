import puppeteer from "puppeteer-core";
console.log("launching...");
const b = await puppeteer.launch({
  executablePath: "/usr/bin/google-chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--hide-scrollbars"],
  protocolTimeout: 120000,
});
console.log("launched");
const p = await b.newPage();
await p.setViewport({ width: 390, height: 844 });
console.log("goto...");
await p.goto("http://localhost:3000", { waitUntil: "domcontentloaded", timeout: 45000 });
console.log("dom loaded");
await new Promise(r => setTimeout(r, 3000));
const h = await p.evaluate(() => document.body.scrollHeight);
console.log("scrollHeight:", h);
await p.screenshot({ path: "./qa/test.png" });
console.log("screenshot ok");
await b.close();
console.log("done");
