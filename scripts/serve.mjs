// Minimal static server for the exported site in out/. No dependencies.
// Usage: node scripts/serve.mjs [port]   (default 4173, bound to 127.0.0.1)
import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { extname, join, normalize, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("../out", import.meta.url)));
const PORT = Number(process.argv[2] ?? 4173);
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".webmanifest": "application/manifest+json",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
};

async function resolveFile(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath.split("?")[0])).replace(/^([/\\])+/, "");
  const full = join(ROOT, clean);
  if (full !== ROOT && !full.startsWith(ROOT + sep)) return null; // stay inside out/
  try {
    const info = await stat(full);
    if (info.isDirectory()) return resolveFile(join(clean, "index.html"));
    return full;
  } catch {
    return null;
  }
}

createServer(async (req, res) => {
  const file = (await resolveFile(req.url ?? "/")) ?? (await resolveFile("404.html"));
  const status = file?.endsWith("404.html") && !req.url?.includes("404") ? 404 : 200;
  if (!file) {
    res.writeHead(404).end("Not found");
    return;
  }
  const type = TYPES[extname(file)] ?? "application/octet-stream";
  // Byte ranges, so the browser can seek videos (Cloudflare Pages does this on staging).
  const { size } = await stat(file);
  const range = status === 200 && /^bytes=(\d*)-(\d*)$/.exec(req.headers.range ?? "");
  if (range && (range[1] || range[2])) {
    let start = range[1] ? Number(range[1]) : size - Number(range[2]);
    let end = range[1] && range[2] ? Number(range[2]) : size - 1;
    start = Math.max(0, start);
    end = Math.min(end, size - 1);
    if (start > end) {
      res.writeHead(416, { "Content-Range": `bytes */${size}` }).end();
      return;
    }
    res.writeHead(206, {
      "Content-Type": type,
      "Accept-Ranges": "bytes",
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Content-Length": end - start + 1,
    });
    createReadStream(file, { start, end }).pipe(res);
    return;
  }
  res.writeHead(status, { "Content-Type": type, "Accept-Ranges": "bytes", "Content-Length": size });
  createReadStream(file).pipe(res);
}).listen(PORT, "127.0.0.1", 511, () => {
  console.log(`Serving out/ at http://127.0.0.1:${PORT}/`);
});
