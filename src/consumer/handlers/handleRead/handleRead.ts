import { Request, Response } from "express";
import * as tcp from "net";
import { connectToReader } from "./functions/connectToReader.ts";

/**
 *
 * @param req
 * @param res
 * @description this must get the rq and res, the creates a tcp server with the reader then starts piping data to the client
 * @author kareem https://github.com/RealKareemAnees
 */
async function handleRead(req: Request, res: Response): Promise<void> {
  const filepath: string = req.params.filepath; // Assuming filepath is part of the request parameters

  // Extract filename from filepath
  const filename = filepath.substring(filepath.lastIndexOf("/") + 1);

  const reader = new tcp.Socket();
  await connectToReader(reader, filepath);

  // streams incoming data from the reader process
  reader.on("data", async (data) => {
    if (!res.write(data)) {
      reader.pause();
    }
  });

  // Send progress feedback as response header
  let totalBytesSent = 0;
  res.setHeader("Content-Disposition", `attachment; filename=${filename}`);

  res.on("drain", () => {
    reader.resume();
  });

  reader.on("end", () => {
    console.log("Connection to server closed");
    res.end();
  });

  // handling exceptions and network errors

  res.on("close", () => {
    console.log("Response closed by the client");
    reader.destroy();
  });

  reader.on("close", () => {
    console.log("Socket closed");
    res.end();
  });

  reader.on("timeout", () => {
    console.log("Socket timed out");
    reader.destroy();
    res.end();
  });

  reader.on("error", (error) => {
    console.error("Error from the reader:", error);
    throw new Error();
  });
}

export { handleRead };
