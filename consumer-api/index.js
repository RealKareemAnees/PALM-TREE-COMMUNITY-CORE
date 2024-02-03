const handle_home_page = require("./handle_home_page/handle_home_page");

const log = console.log;

const http = require("http");
const path = require("path");

const env = require("dotenv");
env.config({ path: path.join("configs", "network.env") });

const router = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const PATH = url.pathname;
    const METHOD = req.method;

    PATH === "/homepage" ? handle_home_page(req, res) : res.end("error 404");
  } catch (error) {
    res.end("server error", error);
  }
});

const IP = process.env.IP;
const PORT = process.env.PORT;

router.listen(PORT, IP);
router.on("listening", () => {
  setTimeout(() => {
    log("router listening on port:", PORT, ", socket:", IP);
  }, 0);
});
