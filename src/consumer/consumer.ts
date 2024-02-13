import "colors";

const log = console.log;
log("consumer has started".green);

import * as path from "path";
import * as env from "dotenv";

env.config({
  path: path.join(__dirname, "..", "..", "configs", "network.env"),
});

import express from "express";

import { errorHandler } from "../errors/errorHandler";
import { validateRequest } from "./auth/validateRequest";
import { getApp } from "./router/getAppRouter";
import { readRouter } from "./router/readRouter";

const consumer = express();

consumer.use(express.json());
consumer.use(validateRequest);

consumer.get("/palm-tree", getApp);
consumer.use("/read", readRouter);

consumer.use(errorHandler);
