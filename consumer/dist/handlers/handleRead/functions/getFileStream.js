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
var getFileStream_exports = {};
__export(getFileStream_exports, {
  getFileStream: () => getFileStream
});
module.exports = __toCommonJS(getFileStream_exports);
async function getFileStream(socket, res, next) {
  socket.on("data", (data) => {
    if (!res.write(data)) {
      socket.pause();
    }
  });
  res.on("drain", () => {
    socket.resume();
  });
  socket.on("end", () => {
    console.log("socket ent from reader");
    res.end();
  });
  socket.on("error", (error) => {
    console.error("Socket error:", error);
    next(error);
  });
  res.on("error", (error) => {
    socket.destroy();
    next(error);
  });
  res.on("close", () => {
    console.log("Response closed by the client, destroying socket");
    socket.destroy();
    console.log("socket has bet destroyed ");
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getFileStream
});
//# sourceMappingURL=getFileStream.js.map
