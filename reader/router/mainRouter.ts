import * as tcp from "net";
import { join } from "path";

import { parseData } from "./functions/parseData";
import { streamFile } from "../controllers/streamFile";
import { errorHandler } from "../errors/errorHandler";

const log = console.log;

/**
 * @param {tcp.Socket} socket
 * @param {any} data
 * @description this parses requests and routes them, just pass the data
 * @author kareemun (you know my github)
 */
async function router(socket: tcp.Socket, data: any): Promise<void> {
  console.log("got a message: ", data.toString());
  try {
    const order = parseData(data);

    if (order.read_type === "single_file") {
      const filePath = join(order.file_path);

      log("starting filestream");
      await streamFile(socket, filePath);
    }
  } catch (error) {
    errorHandler(socket, error);
  }
}

export { router };
