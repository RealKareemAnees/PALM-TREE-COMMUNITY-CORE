import * as tcp from "net";
import * as fs from "fs";
import { join } from "path";
import { errorHandler } from "../errors/errorHandler";

const log = console.log;

/**
 * Streams a file over a TCP socket.
 * @param {tcp.Socket} socket The TCP socket to stream the file to.
 * @param {string} path The path to the file to stream.
 */
async function streamFile(socket: tcp.Socket, path: string) {
  try {
    const fileStream = fs.createReadStream(join(path));

    fileStream.on("data", (chunk) => {
      if (!socket.write(chunk)) {
        fileStream.pause();
      }
    });

    socket.on("drain", () => {
      fileStream.resume();
    });

    fileStream.on("end", () => {
      log("filestream has ent ,ending socket");
      socket.end();
      log("socket ent");
    });

    fileStream.on("error", (error) => {
      log("error from filestream ,ending socket");

      socket.end();

      log("socket ent");

      errorHandler(socket, error);
    });

    socket.on("error", (error) => {
      log("error from socket, closing filestream");
      fileStream.close();
      log("filestream has been closed");
      errorHandler(socket, error);
    });
  } catch (error) {
    errorHandler(socket, error);
  }
}

export { streamFile };
