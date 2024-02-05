const log = console.log;
const net = require("net");
const path = require("path");
const env = require("dotenv");

env.config({ path: path.join(__dirname, "..", "configs", "network.env") });

const connect_to_reader = require("./connect_to_reader");

module.exports = async (res, dist) => {
  try {
    const reader = new net.Socket();
    await connect_to_reader(reader, dist);

    reader.on("data", (data) => {
      if (!res.write(data)) {
        reader.pause();
      }
    });

    res.on("drain", () => {
      reader.resume();
    });

    reader.on("end", () => {
      log("Connection to server closed");
      res.end();
    });

    res.on("close", () => {
      log("Response closed by the client");
      reader.destroy();
    });

    reader.on("close", () => {
      log("Socket closed");
      res.end();
    });

    reader.on("timeout", () => {
      log("Socket timed out");
      res.end();
    });

    reader.on("error", (error) => {
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
