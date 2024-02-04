const log = console.log;
const net = require("net");
const path = require("path");

const env = require("dotenv");
env.config({ path: path.join(__dirname, "..", "configs", "network.env") });

const connectToReader = (client, dist) => {
  client.connect(process.env.READER_PORT, process.env.IP, () => {
    log(`Connected to server: ${process.env.IP}:${process.env.READER_PORT}`);
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
    log("Socket closed");
    res.end();
  });

  client.on("timeout", () => {
    log("Socket timed out");
    res.end();
  });

  client.on("error", (error) => {
    log(error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  });
};

module.exports = async (req, res) => {
  try {
    const client = new net.Socket();

    req.on("data", async (chunk) => {
      const reqBody = JSON.parse(chunk);
      const dist = reqBody.dist;

      await connectToReader(client, dist);
      streamData(client, res);
    });

    client.on("end", () => {
      log("Connection to server closed");
      res.end();
    });

    client.on("error", (error) => {
      log(error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    });
  } catch (error) {
    log(error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
};
