import * as tcp from "net";
const READER_PORT = process.env.READER_PORT;
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
  try {
    //@ts-ignore
    reader.connect(process.env.READER_PORT, process.env.IP, () => {
      console.log(`Connected to server: ${IP}:${process.env.READER_PORT}`);

      const message = JSON.stringify({
        read_type: "single_file",
        file_path: filepath,
      });

      reader.write(message);
    });
  } catch (error) {
    throw new Error(error);
  }
}

export { connectToReader };
