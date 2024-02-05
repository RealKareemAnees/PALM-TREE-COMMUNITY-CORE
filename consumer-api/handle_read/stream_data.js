const log = console.log;

module.exports = async (client, res) => {
  client.on("data", (data) => {
    if (!res.write(data)) {
      client.pause();
    }
  });

  res.on("drain", () => {
    client.resume();
  });

  res.on("close", () => {
    log("Response closed by the client");
    client.destroy();
  });

  client.on("close", () => {
    log("Socket closed");
    res.end();
  });

  client.on("timeout", () => {
    log("Socket timed out");
    res.end();
  });

  client.on("error", (error) => {
    log(error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  });
};
