const router = require("./router/router");

const net = require("net");
const path = require("path");
const env = require("dotenv");

env.config({ path: path.join(__dirname, "..", "configs", "network.env") });

const server = net.createServer(async (socket) => {
  socket.writableHighWaterMark = 1460;

  socket.on("data", async (data) => {
    await router(data, socket);
  });
});

server.on("error", (err) => {
  console.error(`Server error: ${err.message}`);
});

const PORT = process.env.READER_PORT;
const HOST = process.env.IP;

server.listen(PORT, HOST, () => {
  console.log(`reader listening on ${HOST}:${PORT}`);
});
