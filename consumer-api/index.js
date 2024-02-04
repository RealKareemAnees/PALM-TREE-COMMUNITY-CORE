const http = require("http");
const path = require("path");

const env = require("dotenv");
env.config({ path: path.join(__dirname, "..", "configs", "network.env") });

const handle_read = require("./handle_read/handle_read");
const handle_home_page = require("./handle_home_page/handle_home_page");

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const PATH = url.pathname;
    const METHOD = req.method;

    PATH === "/homepage"
      ? await handle_home_page(req, res)
      : PATH === "/read" && METHOD == "POST"
      ? await handle_read(req, res)
      : res.end("error 404");
  } catch (error) {
    res.end("internal server error! ['_']");
  }
});
server.listen(process.env.PORT);
