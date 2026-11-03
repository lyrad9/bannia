#!/usr/bin/env node
// Serveur local du mini-éditeur. Usage : node server.mjs <dossier> [--port 4180]
// Le dossier contient banner.html, ou des sous-dossiers qui en contiennent chacun un. Aucune dépendance.
import { createServer } from "node:http";
import { readFile, writeFile, copyFile, mkdir, access, rm, readdir, cp, rename } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFile } from "node:child_process";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const portFlag = args.indexOf("--port");
const PORT = Number(process.env.PORT || (portFlag >= 0 ? args[portFlag + 1] : 4180));
const dirArg = args.find((a, i) => !a.startsWith("--") && (portFlag < 0 || i !== portFlag + 1));
if (!dirArg) {
  console.error("Usage : node server.mjs <dossier> [--port 4180]");
  process.exit(1);
}
const DIR = path.resolve(dirArg);
const ROOT_ID = "_root";

const MIME = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript",
  ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".webp": "image/webp", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".woff": "font/woff",
};
const IMAGE_EXT = [".png", ".jpg", ".jpeg", ".webp", ".svg"];

const cleanName = (name) => path.basename(name || "").replace(/[^\w.-]/g, "-").replace(/^[-.]+/, "") || "fichier";

function dirOf(id) {
  if (id === ROOT_ID) return DIR;
  const name = cleanName(id);
  if (name !== id || name.startsWith("_")) throw new Error("Bannière inconnue");
  return path.join(DIR, name);
}

async function listBanners() {
  const out = [];
  if (existsSync(path.join(DIR, "banner.html"))) out.push({ id: ROOT_ID, name: path.basename(DIR) });
  for (const entry of await readdir(DIR, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith("_") || entry.name.startsWith(".") || entry.name === "logos") continue;
    if (existsSync(path.join(DIR, entry.name, "banner.html"))) out.push({ id: entry.name, name: entry.name });
  }
  for (const b of out) {
    const dir = dirOf(b.id);
    if (!existsSync(path.join(dir, "banner.original.html"))) await copyFile(path.join(dir, "banner.html"), path.join(dir, "banner.original.html"));
    Object.assign(b, await readMeta(dir));
  }
  return out;
}

// Format, langue et taille sont déclarés dans le <head> de banner.html.
async function readMeta(dir) {
  const html = await readFile(path.join(dir, "banner.html"), "utf8");
  const meta = (name) => (html.match(new RegExp(`<meta name="banner-${name}" content="([^"]*)"`)) || [])[1];
  const [w, h] = (meta("size") || "1584x396").split("x").map(Number);
  return { w: w || 1584, h: h || 396, format: meta("format") || "linkedin", lang: meta("lang") || "fr" };
}

async function photoFile() {
  for (const ext of IMAGE_EXT) {
    const file = path.join(DIR, `_photo${ext}`);
    if (existsSync(file)) return file;
  }
  return null;
}

function uniqueId(base) {
  let id = cleanName(base), n = 2;
  while (existsSync(path.join(DIR, id))) id = `${cleanName(base)}-${n++}`;
  return id;
}

function browserPath() {
  return [
    process.env.CHROME_PATH,
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/microsoft-edge",
  ].filter(Boolean).find((p) => existsSync(p));
}

function exportPng(dir, png, w, h) {
  return new Promise((resolve, reject) => {
    const browser = browserPath();
    if (!browser) return reject(new Error("Chrome ou Edge introuvable. Indique son chemin avec CHROME_PATH."));
    execFile(browser, [
      "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
      `--window-size=${w},${h}`, "--virtual-time-budget=4000", `--user-data-dir=${path.join(tmpdir(), "banner-studio-export")}`,
      `--screenshot=${png}`, pathToFileURL(path.join(dir, "banner.html")).href,
    ], { timeout: 60000 }, (err) => (err && !existsSync(png) ? reject(err) : resolve()));
  });
}

function readBody(req, limit = 25 * 1024 * 1024) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (c) => {
      size += c.length;
      if (size > limit) { reject(new Error("Fichier trop lourd")); req.destroy(); return; }
      chunks.push(c);
    });
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function send(res, status, body, type = "application/json") {
  res.writeHead(status, { "Content-Type": type, "Cache-Control": "no-store" });
  res.end(typeof body === "string" || Buffer.isBuffer(body) ? body : JSON.stringify(body));
}

async function serveFile(res, root, relative) {
  const full = path.resolve(root, relative);
  if (full !== root && !full.startsWith(root + path.sep)) return send(res, 403, { error: "Accès refusé" });
  try {
    send(res, 200, await readFile(full), MIME[path.extname(full).toLowerCase()] || "application/octet-stream");
  } catch {
    send(res, 404, { error: "Introuvable" });
  }
}

// N'accepte que les requêtes venant de la page de l'éditeur.
function sameOrigin(req) {
  const origin = req.headers.origin;
  return !origin || origin === `http://127.0.0.1:${PORT}` || origin === `http://localhost:${PORT}`;
}

const IMPORT_HTML = (file) => `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>Bannière importée</title>
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 1584px; height: 396px; overflow: hidden; background: #111; }
body { position: relative; }
img { position: absolute; inset: 0; width: 1584px; height: 396px; object-fit: cover; }
</style>
</head>
<body>
<img data-el="Image importée" data-decor src="${file}" alt="">
</body>
</html>
`;

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${PORT}`);
  const route = decodeURIComponent(url.pathname);
  const id = url.searchParams.get("b") || ROOT_ID;
  try {
    if (req.method === "POST" && !sameOrigin(req)) return send(res, 403, { error: "Origine refusée" });

    if (req.method === "GET" && route === "/") return serveFile(res, HERE, "editor.html");
    if (req.method === "GET" && route === "/editor/inter.woff2") return serveFile(res, HERE, "inter.woff2");

    const fileMatch = route.match(/^\/b\/([^/]+)\/(.+)$/);
    if (req.method === "GET" && fileMatch) return serveFile(res, dirOf(fileMatch[1]), fileMatch[2]);

    if (req.method === "GET" && route === "/api/banners") {
      const photo = await photoFile();
      return send(res, 200, { banners: await listBanners(), photo: photo ? `/api/photo?t=${Date.now()}` : null });
    }
    if (req.method === "GET" && route === "/api/photo") {
      const photo = await photoFile();
      return photo ? serveFile(res, path.dirname(photo), path.basename(photo)) : send(res, 404, { error: "Aucune photo" });
    }
    if (req.method === "POST" && route === "/api/photo") {
      const ext = path.extname(cleanName(url.searchParams.get("name"))).toLowerCase();
      if (!IMAGE_EXT.includes(ext)) return send(res, 400, { error: "Format d'image non pris en charge" });
      const body = await readBody(req);
      const old = await photoFile();
      if (old) await rm(old, { force: true });
      await writeFile(path.join(DIR, `_photo${ext}`), body);
      return send(res, 200, { photo: `/api/photo?t=${Date.now()}` });
    }
    if (req.method === "POST" && route === "/api/photo/remove") {
      const old = await photoFile();
      if (old) await rm(old, { force: true });
      return send(res, 200, { ok: true });
    }
    if (req.method === "POST" && route === "/api/duplicate") {
      const source = dirOf(id);
      const base = id === ROOT_ID ? `${path.basename(DIR)}-copie` : `${id}-copie`;
      const next = uniqueId(base);
      const target = path.join(DIR, next);
      await mkdir(target, { recursive: true });
      for (const entry of await readdir(source, { withFileTypes: true })) {
        const skip = ["banner.original.html", "retours.json"].includes(entry.name) || /^banner-\d+x\d+\.png$/.test(entry.name)
          || entry.name.startsWith("_") || (entry.isDirectory() && id === ROOT_ID && entry.name !== "logos");
        if (!skip) await cp(path.join(source, entry.name), path.join(target, entry.name), { recursive: true });
      }
      return send(res, 200, { id: next });
    }
    // Une bannière supprimée part dans .corbeille : elle reste récupérable à la main.
    if (req.method === "POST" && route === "/api/delete") {
      if (id === ROOT_ID) return send(res, 400, { error: "Cette bannière est à la racine du dossier : supprime-la à la main" });
      const source = dirOf(id);
      if (!existsSync(path.join(source, "banner.html"))) return send(res, 404, { error: "Bannière introuvable" });
      if ((await listBanners()).length <= 1) return send(res, 400, { error: "Impossible de supprimer la dernière bannière" });
      const bin = path.join(DIR, ".corbeille");
      await mkdir(bin, { recursive: true });
      await rename(source, path.join(bin, `${id}-${Date.now()}`));
      return send(res, 200, { ok: true });
    }
    if (req.method === "POST" && route === "/api/import") {
      const file = cleanName(url.searchParams.get("name") || "image.png");
      if (!IMAGE_EXT.includes(path.extname(file).toLowerCase())) return send(res, 400, { error: "Format d'image non pris en charge" });
      const next = uniqueId(path.parse(file).name);
      const target = path.join(DIR, next);
      await mkdir(target, { recursive: true });
      await writeFile(path.join(target, file), await readBody(req));
      await writeFile(path.join(target, "banner.html"), IMPORT_HTML(file));
      return send(res, 200, { id: next });
    }

    const dir = dirOf(id);
    const comments = path.join(dir, "retours.json");
    if (req.method === "GET" && route === "/api/comments") {
      try { return send(res, 200, await readFile(comments, "utf8")); } catch { return send(res, 200, "[]"); }
    }
    if (req.method === "POST" && route === "/api/comments") {
      const body = (await readBody(req)).toString("utf8");
      JSON.parse(body);
      await writeFile(comments, body);
      return send(res, 200, { ok: true });
    }
    if (req.method === "POST" && route === "/api/save") {
      await writeFile(path.join(dir, "banner.html"), await readBody(req));
      return send(res, 200, { ok: true });
    }
    if (req.method === "POST" && route === "/api/upload") {
      const name = cleanName(url.searchParams.get("name") || "image.png");
      if (!IMAGE_EXT.includes(path.extname(name).toLowerCase())) return send(res, 400, { error: "Format d'image non pris en charge" });
      await mkdir(path.join(dir, "logos"), { recursive: true });
      await writeFile(path.join(dir, "logos", name), await readBody(req));
      return send(res, 200, { path: `logos/${name}` });
    }
    if (req.method === "POST" && route === "/api/export") {
      const { w, h } = await readMeta(dir);
      const name = `banner-${w}x${h}.png`;
      const png = path.join(dir, name);
      await rm(png, { force: true });
      await exportPng(dir, png, w, h);
      return send(res, 200, { ok: true, file: png, name, url: `/b/${id}/${name}?t=${Date.now()}` });
    }
    if (req.method === "POST" && route === "/api/restore") {
      await copyFile(path.join(dir, "banner.original.html"), path.join(dir, "banner.html"));
      await rm(comments, { force: true });
      return send(res, 200, { ok: true });
    }
    send(res, 404, { error: "Introuvable" });
  } catch (err) {
    send(res, 500, { error: err.message });
  }
});

await access(DIR).catch(() => {
  console.error(`Dossier introuvable : ${DIR}`);
  process.exit(1);
});
if (!(await listBanners()).length) {
  console.error(`Aucun banner.html trouvé dans ${DIR}`);
  process.exit(1);
}

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Éditeur de bannière : http://127.0.0.1:${PORT}`);
  console.log(`Dossier : ${DIR}`);
});
