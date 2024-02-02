const log = console.log;

const http = require("http");
const path = require("path");

const env = require("dotenv");
env.config({ path: path.join("configs", "network.env") });

const router = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;
  const method = req.method;

  if (path === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        data: " /",
      })
    );
  }
  if (path === "/x") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        data: " /x",
      })
    );
  }
});

const IP = process.env.IP;
const PORT = process.env.PORT;

router.listen(PORT, IP);
