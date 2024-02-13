import * as tcp from "net";

function errorHandler(socket: tcp.Socket, error: Error) {
  socket.end();
  console.log(error);
}

export { errorHandler };
