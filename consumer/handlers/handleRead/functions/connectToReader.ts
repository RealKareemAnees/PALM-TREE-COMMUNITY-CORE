import * as tcp from "net";

const READER_PORT: number = parseInt(process.env.READER_PORT || "0", 10);
const IP: string = process.env.IP || "127.0.0.1";

/**
 * 
 * @param {tcp.Socket} reader 
 * @param {string} filepath 
 * @description it sends this json object {
      read_type: "single_file",
      filepath: filepath,
    }
 */
async function connectToReader(reader: tcp.Socket, filepath: string) {
  reader.connect(READER_PORT, IP, () => {
    console.log(`Connected to server: ${IP}:${READER_PORT}`);

    const message = JSON.stringify({
      read_type: "single_file",
      file_path: filepath,
    });

    reader.write(message);
  });
}

export { connectToReader };
