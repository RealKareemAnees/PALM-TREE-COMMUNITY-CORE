var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_colors = require("colors");
var path = __toESM(require("path"));
var env = __toESM(require("dotenv"));
var tcp = __toESM(require("net"));
var import_mainRouter = require("./router/mainRouter");
var import_errorHandler = require("./errors/errorHandler");
const log = console.log;
log("reader has started".green);
env.config({
  path: path.join(__dirname, "..", "..", "configs", "network.env")
});
const server = tcp.createServer();
server.on("connection", async (socket) => {
  try {
    socket.on("data", async (data) => {
      await (0, import_mainRouter.router)(socket, data);
    });
  } catch (error) {
    (0, import_errorHandler.errorHandler)(socket, error);
  }
});
const PORT = process.env.READER_PORT;
const HOST = process.env.IP;
server.listen(PORT, HOST, () => {
  console.log("reader listening on ", HOST.rainbow, ":", PORT.rainbow);
});
//# sourceMappingURL=reader.js.map
