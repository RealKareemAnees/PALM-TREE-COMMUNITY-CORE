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
var getAppHandler_exports = {};
__export(getAppHandler_exports, {
  getAppHandler: () => getAppHandler
});
module.exports = __toCommonJS(getAppHandler_exports);
function getAppHandler(req, res) {
  res.send(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>homepage</title>
      </head>
      <body>
        <h1>PALM TREE</h1>
      </body>
    </html>
    `);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAppHandler
});
//# sourceMappingURL=getAppHandler.js.map
