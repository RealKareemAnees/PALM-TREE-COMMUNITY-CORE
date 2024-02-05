const log = console.log;

module.exports = async (client, dist) => {
  try {
    client.connect(process.env.READER_PORT, process.env.IP, () => {
      log(`Connected to server: ${process.env.IP}:${process.env.READER_PORT}`);
      const message = JSON.stringify({
        read_type: "file",
        filedir: dist,
      });
      client.write(message);
    });
  } catch (error) {
    throw new Error(error);
  }
};
