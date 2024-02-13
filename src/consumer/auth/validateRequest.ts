import { Request, Response, NextFunction } from "express";
/**
 *
 * @param req
 * @param res
 * @param next
 */
function validateRequest(req: Request, res: Response, next: NextFunction): any {
  next();
}

export { validateRequest };
