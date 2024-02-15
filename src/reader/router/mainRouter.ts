import * as tcp from "net";
import { join } from "path";

import { parseData } from "./functions/parseData";
import { streamFile } from "../controllers/streamFile";

/**
 * @param {tcp.Socket} socket
 * @param {any} data
 * @description this parses requests and routes them, just pass the data
 * @author kareemun (you know my github)
 */
async function router(socket: tcp.Socket, data: any): Promise<void> {
  try {
    const order = parseData(data);

    if (order.read_type === "single_file") {
      const filePath = join(order.file_path);
      await streamFile(socket, filePath);
    }
  } catch (error) {}
}

export { router };
