import e, { NextFunction, Request, Response } from "express";
import * as tcp from "net";
import { connectToReader } from "./functions/connectToReader";
import { getFileInfo } from "./functions/getFileInfo";
import { getFileStream } from "./functions/getFileStream";

async function handleRead(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const filepath = req.query.filepath;
    //@ts-ignore
    const { filename, size, normalizedFilePath } = await getFileInfo(filepath);

    const socket = new tcp.Socket();
    await connectToReader(socket, normalizedFilePath);

    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-Length", size.toString());

    await getFileStream(socket, res, next);
  } catch (error) {
    next(error);
  }
}

export { handleRead };
