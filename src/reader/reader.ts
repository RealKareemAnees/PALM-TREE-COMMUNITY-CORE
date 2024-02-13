import "colors";

const log = console.log;
log("reader has started".green);

import * as path from "path";
import * as env from "dotenv";

env.config({
  path: path.join(__dirname, "..", "..", "configs", "network.env"),
});

import * as tcp from "net";
const server = tcp.createServer();

import { router } from "./router/mainRouter";
import { errorHandler } from "./errors/errorHandler";

server.on("connection", async (socket) => {
  try {
    socket.on("data", async (data) => {
      await router(socket, data);
    });
  } catch (error) {
    errorHandler(socket, error);
  }
});

const PORT = process.env.READER_PORT;
const HOST: number = parseInt(process.env.IP || "127.0.0.1", 10); // Default value for IP address

server.listen(PORT, HOST, () => {
  console.log(`reader listening on ${HOST}:${PORT}`.blue);
});
