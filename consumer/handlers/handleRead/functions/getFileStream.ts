import * as tcp from "net";
import { NextFunction, Request, Response } from "express";

async function getFileStream(
  socket: tcp.Socket,
  res: Response,
  next: NextFunction
) {
  socket.on("data", (data) => {
    if (!res.write(data)) {
      socket.pause();
    }
  });

  res.on("drain", () => {
    socket.resume();
  });

  socket.on("end", () => {
    console.log("socket ent from reader");
    res.end();
  });

  socket.on("error", (error) => {
    console.error("Socket error:", error);
    next(error);
  });

  res.on("error", (error) => {
    socket.destroy();
    next(error);
  });

  res.on("close", () => {
    console.log("Response closed by the client, destroying socket");
    socket.destroy();
    console.log("socket has bet destroyed ");
  });
}

export { getFileStream };
