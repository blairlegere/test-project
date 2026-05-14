const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 3000;
const host = "127.0.0.1";

const mimeByExt = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
};

const server = http.createServer((request, response) => {
  const filePath = request.url === "/" ? "index.html" : request.url.slice(1);
  const resolvedPath = path.join(__dirname, filePath);

  fs.readFile(resolvedPath, (error, content) => {
    if (error) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    const ext = path.extname(resolvedPath).toLowerCase();
    const contentType = mimeByExt[ext] || "application/octet-stream";
    response.writeHead(200, { "Content-Type": contentType });
    response.end(content);
  });
});

server.listen(port, host, () => {
  console.log(`Website running at http://${host}:${port}`);
});
