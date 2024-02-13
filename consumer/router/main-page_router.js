const log = console.log;

const express = require("express");
const path = require("path");

const env = require("dotenv");
env.config({ path: path.join(__dirname, "..", "configs", "network.env") });

const authenticate_client = require("../auth/authenticate_client");
const ui_handler = require("../handlers/ui_handler/ui_handler");

const router = express.Router();

router.all(authenticate_client);

router.get("/", ui_handler);

module.exports = router;
