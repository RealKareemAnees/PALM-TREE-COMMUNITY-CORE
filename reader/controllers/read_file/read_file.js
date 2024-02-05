const fs = require("fs/promises");

module.exports = async (filedir, socket) => {
  try {
    let file_stream;

    const file_dir = path.join(filedir);
    const file_handle = await fs.open(file_dir, "r");
    file_stream = file_handle.createReadStream();

    file_stream.on("data", (chunk) => {
      if (!socket.write(chunk)) {
        file_stream.pause();
      }
    });

    socket.on("drain", () => {
      file_stream.resume();
    });

    // file_stream.on("end", async () => {
    //   // Close the file and end the socket if it is still open
    //   if (!socket.destroyed) {
    //     try {
    //       await file_handle.close();
    //       socket.end();
    //     } catch (err) {
    //       console.error(`Error closing file: ${err.message}`);
    //       socket.end();
    //     }
    //   }
    // });

    // file_stream.on("error", (err) => {
    //   // Handle error, write the error to the socket, and end
    //   socket.write(`Error: ${err.message}`);
    //   socket.end();
    // });

    // // Handle the close event on the socket
    // socket.on("close", () => {
    //   console.log("Socket closed");

    //   // Check if file_stream exists before attempting to close it
    //   if (file_stream && !file_stream.closed) {
    //     file_stream.close();
    //   }
    // });

    // // Handle the end event on the socket
    // socket.on("end", () => {
    //   console.log("Connection to client closed");

    //   // Check if the socket was destroyed (file transfer canceled)
    //   if (!socket.destroyed && file_stream) {
    //     file_stream.close();
    //   }
    // });

    // // Handle socket errors
    // socket.on("error", (err) => {
    //   console.error(`Socket error: ${err.message}`);

    //   // Check if file_stream exists before attempting to close it
    //   if (file_stream && !file_stream.closed) {
    //     file_stream.close();
    //   }
    // });
  } catch (error) {}
};
