import { Request, Response, NextFunction, Router } from "express";

import { getAppHandler } from "../handlers/getApp/getAppHandler.ts";

const getApp = Router();

getApp.get("/", (req: Request, res: Response, next: NextFunction) => {
  getAppHandler(req, res);
});

export { getApp };
