const log = console.log;

module.exports = async (client, dist) => {
  client.connect(process.env.READER_PORT, process.env.IP, () => {
    log(`Connected to server: ${process.env.IP}:${process.env.READER_PORT}`);
    const message = JSON.stringify({
      filedir: dist,
    });
    client.write(message);
  });
};
