const http = require("http");
const path = require("path");

const env = require("dotenv");
env.config({ path: path.join(__dirname, "..", "configs", "network.env") });

const PORT = process.env.PORT || 3000;

const net = require("net");

const connectToReader = (client, dist) => {
  client.connect(process.env.READER_PORT, process.env.IP, () => {
    console.log(
      `Connected to server: ${process.env.IP}:${process.env.READER_PORT}`
    );
    const message = JSON.stringify({
      filedir: dist,
    });
    client.write(message);
  });
};

const streamData = (client, res) => {
  client.on("data", (data) => {
    if (!res.write(data)) {
      client.pause();
    }
  });

  res.on("drain", () => {
    client.resume();
  });

  client.on("close", () => {
    console.log("Socket closed");
    res.end();
  });

  client.on("timeout", () => {
    console.log("Socket timed out");
    res.end();
  });

  client.on("error", (error) => {
    console.log(error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  });
};

const handle_read = async (req, res) => {
  try {
    const client = new net.Socket();

    const url = new URL(req.url, `http://${req.headers.host}`);
    const dist = url.searchParams.get("dist");

    await connectToReader(client, dist);
    streamData(client, res);

    client.on("end", () => {
      console.log("Connection to server closed");
      res.end();
    });

    client.on("error", (error) => {
      console.log(error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    });
  } catch (error) {
    console.log(error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
};

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const PATH = url.pathname;
    const METHOD = req.method;

    PATH === "/homepage"
      ? await handle_home_page(req, res)
      : PATH === "/read" && METHOD == "GET"
      ? await handle_read(req, res)
      : res.end("error 404");
  } catch (error) {
    res.end("internal server error! ['_']");
  }
});

server.listen(process.env.PORT);
