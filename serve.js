// Jednoduchý lokální server pro náhled: npm run dev → http://localhost:8080
const http = require("http"), fs = require("fs"), path = require("path");
const DIST = path.join(__dirname, "dist"), PORT = process.env.PORT || 8080;
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".xml": "application/xml", ".txt": "text/plain; charset=utf-8" };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p.endsWith("/")) p += "index.html";
  const file = path.join(DIST, path.normalize(p));
  if (!file.startsWith(DIST) || !fs.existsSync(file)) {
    res.writeHead(404, { "Content-Type": TYPES[".html"] });
    return res.end(fs.readFileSync(path.join(DIST, "404.html")));
  }
  res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
}).listen(PORT, () => console.log(`Náhled: http://localhost:${PORT}`));
