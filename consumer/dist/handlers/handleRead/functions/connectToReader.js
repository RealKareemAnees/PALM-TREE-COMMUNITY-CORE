var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var connectToReader_exports = {};
__export(connectToReader_exports, {
  connectToReader: () => connectToReader
});
module.exports = __toCommonJS(connectToReader_exports);
const READER_PORT = process.env.READER_PORT;
const IP = process.env.IP || "127.0.0.1";
async function connectToReader(reader, filepath) {
  try {
    reader.connect(process.env.READER_PORT, process.env.IP, () => {
      console.log(`Connected to server: ${IP}:${process.env.READER_PORT}`);
      const message = JSON.stringify({
        read_type: "single_file",
        file_path: filepath
      });
      reader.write(message);
    });
  } catch (error) {
    throw new Error(error);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  connectToReader
});
//# sourceMappingURL=connectToReader.js.map
