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
var getAppRouter_exports = {};
__export(getAppRouter_exports, {
  getApp: () => getApp
});
module.exports = __toCommonJS(getAppRouter_exports);
var import_express = require("express");
var import_getAppHandler = require("../handlers/getApp/getAppHandler");
const getApp = (0, import_express.Router)();
getApp.get("/", (req, res, next) => {
  (0, import_getAppHandler.getAppHandler)(req, res);
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getApp
});
//# sourceMappingURL=getAppRouter.js.map
