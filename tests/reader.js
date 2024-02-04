const net = require("net");
const fs = require("fs/promises");
const path = require("path");
const env = require("dotenv");

env.config({ path: path.join(__dirname, "..", "configs", "network.env") });

const server = net.createServer((socket) => {
  let fileStream;

  socket.on("data", (data) => {
    const fileDir = JSON.parse(data).file_dir;

    fs.open(fileDir, "r")
      .then((fileHandle) => {
        fileStream = fileHandle.createReadStream();

        fileStream.on("data", (chunk) => {
          if (!socket.write(chunk)) {
            fileStream.pause();
          }
        });

        socket.on("drain", () => {
          fileStream.resume();
        });

        fileStream.on("end", () => {
          // Close the file and end the socket if it is still open
          if (!socket.destroyed) {
            fileHandle
              .close()
              .then(() => {
                socket.end();
              })
              .catch((err) => {
                console.error(`Error closing file: ${err.message}`);
                socket.end();
              });
          }
        });

        fileStream.on("error", (err) => {
          // Handle error, write the error to the socket, and end
          socket.write(`Error: ${err.message}`);
          socket.end();
        });
      })
      .catch((error) => {
        console.error("Error in server:", error);
        // Handle error, write the error to the socket, and end
        socket.write(`Error: ${error.message}`);
        socket.end();
      });
  });

  // Handle the end event on the socket
  socket.on("end", () => {
    console.log("Connection to client closed");
  });

  // Handle the close event on the socket
  socket.on("close", () => {
    console.log("Socket closed");

    if (fileStream && !fileStream.closed) {
      fileStream.close().catch((err) => {
        console.error(`Error closing file stream: ${err.message}`);
      });
    }
  });

  // Handle socket errors
  socket.on("error", (err) => {
    console.error(`Socket error: ${err.message}`);
  });
});

// Handle server errors
server.on("error", (err) => {
  console.error(`Server error: ${err.message}`);
});

const PORT = process.env.READER_PORT;
const HOST = process.env.IP;

server.listen(PORT, HOST, () => {
  console.log(`Server listening on ${HOST}:${PORT}`);
});
