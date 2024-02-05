const log = console.log;

const express = require("express");
const path = require("path");
const env = require("dotenv");

const handle_read = require("./handle_read/handle_read");
const handle_read_with_get = require("./handle_read/handle_read_with_get");
const handle_home_page = require("./handle_home_page/handle_home_page");
const validator = require("./validator/validator");
const error_handler = require("./error_handler/error_handler");

const app = express();

env.config({ path: path.join(__dirname, "..", "configs", "network.env") });

app.use(express.json());

app.get("/homepage", async (req, res, next) => {
  try {
    await handle_home_page(req, res, next);
  } catch (error) {
    res.status(500).send("Internal Server Error! ['_']");
  }
});

app.get("/read", validator, async (req, res, next) => {
  try {
    await handle_read_with_get(req, res, next);
  } catch (error) {
    res.status(500).send("Internal Server Error! ['_']");
  }
});

app.post("/read", validator, async (req, res, next) => {
  try {
    await handle_read(req, res, next);
  } catch (error) {
    res.status(500).send("Internal Server Error! ['_']");
  }
});

app.use(error_handler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`consumer-api is running on port ${PORT}`);
});
