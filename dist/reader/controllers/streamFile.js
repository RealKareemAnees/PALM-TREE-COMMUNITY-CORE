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
var streamFile_exports = {};
__export(streamFile_exports, {
  streamFile: () => streamFile
});
module.exports = __toCommonJS(streamFile_exports);
var import_promises = require("fs/promises");
async function streamFile(socket, path) {
  try {
    const fileHandle = await (0, import_promises.open)(path, "r");
    const fileStream = fileHandle.createReadStream();
    fileStream.on("data", (chunk) => {
      if (!socket.write(chunk)) {
        fileStream.pause();
      }
    });
    socket.on("drain", () => {
      fileStream.resume();
    });
    fileStream.on("end", async () => {
      try {
        await fileHandle.close();
        socket.end();
      } catch (error) {
        socket.end();
        throw new Error(error);
      }
    });
    socket.on("close", () => {
      console.log("Socket closed");
      if (!fileStream.closed) {
        fileStream.close();
      }
    });
    socket.on("end", () => {
      console.log("Connection to client closed");
      if (!socket.destroyed && !fileStream.closed) {
        fileStream.close();
      }
    });
    socket.on("error", (error) => {
      if (!fileStream.closed) {
        fileStream.close();
      }
      const stringifiedErrorBecauseThisFuckenTypeScriptJustSucks = error.toString();
      throw new Error(stringifiedErrorBecauseThisFuckenTypeScriptJustSucks);
    });
  } catch (error) {
    throw new Error(error);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  streamFile
});
//# sourceMappingURL=streamFile.js.map
