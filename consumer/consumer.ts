import "colors";

const log = console.log;
log("consumer has started".green);

import * as path from "path";
import * as env from "dotenv";

env.config({
  path: path.join(__dirname, "..", "..", "configs", "network.env"),
});

import express from "express";

import { errorHandler } from "./errors/errorHandler";
import { validateRequest } from "./auth/validateRequest";
import { getApp } from "./router/getAppRouter";
import { readRouter } from "./router/readRouter";

const consumer = express();

consumer.use(express.json());
consumer.use(validateRequest);

consumer.use("/read", readRouter);
consumer.use("/palm-tree", getApp);

consumer.use(errorHandler);

consumer.listen(process.env.PORT, () => {
  log(
    "consumer is listening on port:",
    process.env.PORT.rainbow,
    "on all hosts".rainbow
  );
});
