const log = console.log;

const express = require("express");
const error_handler = require("./error_handler/error_handler");

const consumer_api = express();

consumer_api.use();

consumer_api.use(error_handler);
