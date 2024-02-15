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
var import_express = __toESM(require("express"));
var import_errorHandler = require("./errors/errorHandler");
var import_validateRequest = require("./auth/validateRequest");
var import_getAppRouter = require("./router/getAppRouter");
var import_readRouter = require("./router/readRouter");
const log = console.log;
log("consumer has started".rainbow);
env.config({
  path: path.join(__dirname, "..", "..", "configs", "network.env")
});
const consumer = (0, import_express.default)();
consumer.use(import_express.default.json());
consumer.use(import_validateRequest.validateRequest);
consumer.get("/palm-tree", import_getAppRouter.getApp);
consumer.use("/read", import_readRouter.readRouter);
consumer.use(import_errorHandler.errorHandler);
consumer.listen(process.env.PORT, () => {
  log(
    "consumer is listening on port:",
    process.env.PORT,
    "on all hosts".rainbow
  );
});
//# sourceMappingURL=consumer.js.map
