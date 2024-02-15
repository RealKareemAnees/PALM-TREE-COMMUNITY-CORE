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
var readRouter_exports = {};
__export(readRouter_exports, {
  readRouter: () => readRouter
});
module.exports = __toCommonJS(readRouter_exports);
var import_express = require("express");
var import_handleRead = require("../handlers/handleRead/handleRead.ts");
const readRouter = (0, import_express.Router)();
readRouter.get(
  "/read-file/:filepath",
  async (req, res, next) => {
    try {
      await (0, import_handleRead.handleRead)(req, res);
      next();
    } catch (error) {
      next(error);
    }
  }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  readRouter
});
