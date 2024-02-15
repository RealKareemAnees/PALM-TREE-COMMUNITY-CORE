import * as tcp from "net";
import { open } from "fs/promises";

/**
 *
 * @param {tcp.Socket} socket
 * @param {string} path
 * @description no description, just read the fucken STRONGLY TYPED TS CODE
 * @author zeft
 */
async function streamFile(socket: tcp.Socket, path: string) {
  try {
    const fileHandle = await open(path, "r");
    const fileStream = fileHandle.createReadStream();

    fileStream.on("data", (chunk) => {
      if (!socket.write(chunk)) {
        fileStream.pause();
      }
    });
    socket.on("drain", () => {
      fileStream.resume();
    });

    fileStream.on("end", async () => {
      try {
        await fileHandle.close();
        socket.end();
      } catch (error) {
        socket.end();
        throw new Error(error);
      }
    });

    socket.on("close", () => {
      console.log("Socket closed");
      if (!fileStream.closed) {
        fileStream.close();
      }
    });

    socket.on("end", () => {
      console.log("Connection to client closed");
      if (!socket.destroyed && !fileStream.closed) {
        fileStream.close();
      }
    });
    socket.on("error", (error) => {
      if (!fileStream.closed) {
        fileStream.close();
      }
      const stringifiedErrorBecauseThisFuckenTypeScriptJustSucks =
        error.toString();
      throw new Error(stringifiedErrorBecauseThisFuckenTypeScriptJustSucks);
    });
  } catch (error) {
    throw new Error(error);
  }
}

export { streamFile };
