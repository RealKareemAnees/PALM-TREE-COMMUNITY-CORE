import { Request, Response, NextFunction, Router } from "express";

import { handleRead } from "../handlers/handleRead/handleRead";

const readRouter = Router();

readRouter.get(
  "/read-file/:filepath",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await handleRead(req, res);
      next();
    } catch (error) {
      next(error);
    }
  }
);

export { readRouter };
