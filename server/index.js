import fs from "fs";
import express from "express";
import ViteExpress from "vite-express";
import path from "path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
ViteExpress.config({
  inlineViteConfig: {
    base: "/admin",
    build: { outDir: "dist" }
  }
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.use(express.static(path.join(__dirname, ".")));
app.get("/video", (req, res) => {
  try {
    const filePath = path.join(__dirname, "mb.mp4");
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = end - start + 1;
      const file = fs.createReadStream(filePath, { start, end });
      const headers = {
        "Content-Type": "video/mp4",
        "Content-Length": chunkSize,
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes"
      };
      res.status(206).set(headers);
      file.pipe(res);
    } else {
      const headers = {
        "Content-Type": "video/mp4",
        "Content-Length": fileSize,
        "Accept-Ranges": "bytes"
      };
      res.status(200).set(headers);
      fs.createReadStream(filePath).pipe(res);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});
const port = process.env.PORT || 30009;
const host = "localhost";
const server = app.listen(port, host);
ViteExpress.bind(app, server, async () => {
  const { root, base } = await ViteExpress.getViteConfig();
  console.log(`Serving app from root ${root}`);
  console.log(`Server is listening at http://${host}:${port}${base}`);
});
