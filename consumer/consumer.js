const log = console.log;

const express = require("express");
const path = require("path");

const env = require("dotenv");
env.config({ path: path.join(__dirname, "..", "configs", "network.env") });

const error_handler = require("./handlers/error_handler/error_handler.js");
const validate_request = require("./auth/validate_request.js"); // validate requests before being processed

const main_page_router = require("./router/main-page_router.js");
const read_router = require("./router/read_router.js");
const write_router = require("./router/write_router.js");

const app = express();

app.use(express.json());
app.use(validate_request);

app.use("/main-page", main_page_router);
app.use("/read", read_router);
app.use("/write", write_router);

app.use(error_handler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`consumer-api is running on port ${PORT}`);
});
