/**
 * RK RAJA Snap Bot — Local Offline Server
 * ----------------------------------------
 * Sirf static files serve karta hai + local settings save/load.
 * Koi Snapchat connection nahi, koi external API nahi.
 */

const express = require("express");
const path = require("path");
const fs = require("fs");
const os = require("os");

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

const PUBLIC_DIR = path.join(__dirname, "public");
const DATA_DIR = path.join(__dirname, "data");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");

/* ---------- Ensure data dir exists ---------- */
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

/* ---------- Middleware ---------- */
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

/* Simple request logger */
app.use((req, _res, next) => {
  const ts = new Date().toISOString().slice(11, 19);
  console.log(`[${ts}] ${req.method} ${req.url}`);
  next();
});

/* ---------- Static files ---------- */
app.use(express.static(PUBLIC_DIR, {
  extensions: ["html"],
  maxAge: 0,
  etag: false
}));

/* ---------- API: settings ---------- */
app.get("/api/settings", (_req, res) => {
  try {
    if (!fs.existsSync(SETTINGS_FILE)) {
      return res.json({});
    }
    const raw = fs.readFileSync(SETTINGS_FILE, "utf-8");
    res.json(JSON.parse(raw || "{}"));
  } catch (err) {
    console.error("Settings read error:", err.message);
    res.json({});
  }
});

app.post("/api/settings", (req, res) => {
  try {
    const body = req.body || {};
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(body, null, 2), "utf-8");
    res.json({ ok: true, savedAt: new Date().toISOString() });
  } catch (err) {
    console.error("Settings write error:", err.message);
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.delete("/api/settings", (_req, res) => {
  try {
    if (fs.existsSync(SETTINGS_FILE)) {
      fs.unlinkSync(SETTINGS_FILE);
    }
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

/* ---------- API: health ---------- */
app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    app: "RK RAJA Snap Bot",
    version: require("./package.json").version,
    uptime: process.uptime(),
    platform: os.platform(),
    node: process.version
  });
});

/* ---------- SPA fallback ---------- */
app.get("*", (_req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, "index.html"));
});

/* ---------- Boot ---------- */
app.listen(PORT, HOST, () => {
  const localIp = (() => {
    try {
      const nets = os.networkInterfaces();
      for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
          if (net.family === "IPv4" && !net.internal) return net.address;
        }
      }
    } catch (_) {}
    return "localhost";
  })();

  console.log("");
  console.log("  ╔══════════════════════════════════════╗");
  console.log("  ║        RK RAJA SNAP BOT v1.2         ║");
  console.log("  ║        LOCAL · OFFLINE · DEMO        ║");
  console.log("  ╚══════════════════════════════════════╝");
  console.log("");
  console.log(`  ➜  Local:    http://localhost:${PORT}`);
  console.log(`  ➜  Network:  http://${localIp}:${PORT}`);
  console.log(`  ➜  Data:     ${SETTINGS_FILE}`);
  console.log("");
});
