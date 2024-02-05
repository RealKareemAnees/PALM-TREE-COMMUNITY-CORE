const fs = require("fs/promises");
const path = require("path");

module.exports = async (file_dir, socket) => {
  try {
    const file_handle = await fs.open(file_dir, "r");
    const file_stream = file_handle.createReadStream();

    file_stream.on("data", (chunk) => {
      if (!socket.write(chunk)) {
        file_stream.pause();
      }
    });

    socket.on("drain", () => {
      file_stream.resume();
    });

    file_stream.on("end", async () => {
      try {
        await file_handle.close();
        socket.end();
      } catch (err) {
        console.error(`Error closing file: ${err.message}`);
        socket.end();
      }
    });

    file_stream.on("error", (err) => {
      socket.write(`Error: ${err.message}`);
      socket.destroy();
    });

    socket.on("close", () => {
      console.log("Socket closed");
      if (!file_stream.closed) {
        file_stream.close();
      }
    });

    socket.on("end", () => {
      console.log("Connection to client closed");
      if (!socket.destroyed && !file_stream.closed) {
        file_stream.close();
      }
    });

    socket.on("error", (err) => {
      console.error(`Socket error: ${err.message}`);
      if (!file_stream.closed) {
        file_stream.close();
      }
    });
  } catch (error) {
    console.error(`Unexpected error: ${error.message}`);
  }
};
