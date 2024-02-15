var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var handleRead_exports = {};
__export(handleRead_exports, {
  handleRead: () => handleRead
});
module.exports = __toCommonJS(handleRead_exports);
var tcp = __toESM(require("net"));
var import_connectToReader = require("./functions/connectToReader");
async function handleRead(req, res) {
  const filepath = req.params.filepath;
  const filename = filepath.substring(filepath.lastIndexOf("/") + 1);
  const reader = new tcp.Socket();
  await (0, import_connectToReader.connectToReader)(reader, filepath);
  reader.on("data", async (data) => {
    if (!res.write(data)) {
      reader.pause();
    }
  });
  let totalBytesSent = 0;
  res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
  res.on("drain", () => {
    reader.resume();
  });
  reader.on("end", () => {
    console.log("Connection to server closed");
    res.end();
  });
  res.on("close", () => {
    console.log("Response closed by the client");
    reader.destroy();
  });
  reader.on("close", () => {
    console.log("Socket closed");
    res.end();
  });
  reader.on("timeout", () => {
    console.log("Socket timed out");
    reader.destroy();
    res.end();
  });
  reader.on("error", (error) => {
    console.error("Error from the reader:", error);
    throw new Error();
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handleRead
});
//# sourceMappingURL=handleRead.js.map
