const log = console.log;
const net = require("net");
const path = require("path");

const env = require("dotenv");
env.config({ path: path.join(__dirname, "..", "configs", "network.env") });

const connect_to_reader = require("./connect_to_reader");

const stream_data = require("./stream_data");

module.exports = async (res, dist) => {
  try {
    const client = new net.Socket();

    await connect_to_reader(client, dist);
    await stream_data(client, res);

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
    log(error);
  }
};
