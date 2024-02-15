import { Request, Response, NextFunction } from "express";

import "colors";

/**
 * @param req Request object
 * @param res Response object
 * @param next Next function
 * @param error Error object
 * @description This error handler handles all errors in the consumer according to the passed error object based on HTTP standards.
 * @author Kareemun: https://github.com/RealKareemAnees
 */
function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): any {
  console.log("AN ERROR OCCURRED".red);
  console.error(error);
  res.status(500).send({ error: "Internal Server Error" });
}
export { errorHandler };
