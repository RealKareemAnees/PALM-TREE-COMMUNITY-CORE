const log = console.log;

const express = require("express");
const path = require("path");

const env = require("dotenv");
env.config({ path: path.join(__dirname, "..", "configs", "network.env") });

const authenticate_client = require("../auth/authenticate_client");
const authenticate_token = require("../auth/authenticate_token");

const read_file_handler_with_GET = require("../handlers/read-handler/read_file_handler_with_GET");
const read_file_handler = require("../handlers/read-handler/read_file_handler");

const router = express.Router();

router.all(authenticate_client);

router.get("/file/:dist", authenticate_token, read_file_handler_with_GET);
router.post("/file", read_file_handler);

module.exports = router;
