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
var mainRouter_exports = {};
__export(mainRouter_exports, {
  router: () => router
});
module.exports = __toCommonJS(mainRouter_exports);
var import_path = require("path");
var import_parseData = require("./functions/parseData");
var import_streamFile = require("../controllers/streamFile");
async function router(socket, data) {
  try {
    const order = (0, import_parseData.parseData)(data);
    if (order.read_type === "single_file") {
      const filePath = (0, import_path.join)(order.file_path);
      await (0, import_streamFile.streamFile)(socket, filePath);
    }
  } catch (error) {
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  router
});
//# sourceMappingURL=mainRouter.js.map
