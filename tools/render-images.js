// Jednorázově vygeneruje assets/og-image.png (1200×630) a apple-touch-icon.png (180×180).
// Spuštění (vyžaduje Playwright): node tools/render-images.js
const { chromium } = require("playwright");
const path = require("path");
const c = require("../content.js");
const fav = require("fs").readFileSync(path.join(__dirname, "../assets/favicon.svg"), "utf8");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  await p.setContent(`<body style="margin:0;width:1200px;height:630px;font-family:system-ui,sans-serif;color:#eef1fb;
    background:radial-gradient(900px 500px at 85% 0%,#22306a,transparent 60%),radial-gradient(700px 400px at 0% 100%,#2a1f4d,transparent 60%),#0b1020;
    display:flex;flex-direction:column;justify-content:center;padding:0 90px;box-sizing:border-box">
    <div style="display:flex;align-items:center;gap:18px;font-size:30px;font-weight:800">${fav.replace("<svg", '<svg width="64" height="64"')}${c.site.nazev}</div>
    <div style="font-size:66px;font-weight:800;line-height:1.1;margin:34px 0 24px;max-width:900px">Montáž satelitního internetu <span style="color:#ffb020">Starlink</span></div>
    <div style="font-size:30px;color:#b3bbd9">Opava · Moravskoslezský kraj · Jeseníky</div>
    <div style="margin-top:40px;font-size:34px;font-weight:800;color:#1a1200;background:#ffb020;border-radius:999px;padding:14px 32px;align-self:flex-start">☎ ${c.kontakt.telefon}</div>
  </body>`);
  await p.screenshot({ path: path.join(__dirname, "../assets/og-image.png") });
  await p.setViewportSize({ width: 180, height: 180 });
  await p.setContent(`<body style="margin:0;background:#0b1020;display:grid;place-items:center;width:180px;height:180px">${fav.replace("<svg", '<svg width="150" height="150"')}</body>`);
  await p.screenshot({ path: path.join(__dirname, "../assets/apple-touch-icon.png") });
  await b.close();
  console.log("✔ og-image.png a apple-touch-icon.png vygenerovány");
})();
