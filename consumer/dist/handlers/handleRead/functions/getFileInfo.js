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
var getFileInfo_exports = {};
__export(getFileInfo_exports, {
  getFileInfo: () => getFileInfo
});
module.exports = __toCommonJS(getFileInfo_exports);
var fs = __toESM(require("fs/promises"));
var path = __toESM(require("path"));
async function getFileInfo(filepath) {
  try {
    const normalizedPath = path.normalize(filepath);
    const stats = await fs.stat(normalizedPath);
    console.log(
      `fileinfo: 
            basename: ${path.basename(normalizedPath)},
            size: ${stats.size},
            path: ${normalizedPath}`.yellow
    );
    return {
      filename: path.basename(normalizedPath),
      size: stats.size,
      normalizedFilePath: normalizedPath
    };
  } catch (error) {
    throw new Error(error);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getFileInfo
});
//# sourceMappingURL=getFileInfo.js.map
