const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 3000;
const host = "127.0.0.1";

const server = http.createServer((request, response) => {
  const filePath = request.url === "/" ? "index.html" : request.url.slice(1);
  const resolvedPath = path.join(__dirname, filePath);

  fs.readFile(resolvedPath, (error, content) => {
    if (error) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    response.end(content);
  });
});

server.listen(port, host, () => {
  console.log(`Website running at http://${host}:${port}`);
});
