import { Request, Response, NextFunction, Router } from "express";

/**
 *
 * @param {Request} req request object
 * @param {Response} res response object
 * @description For now it just sends empty html
 */
function getAppHandler(req: Request, res: Response) {
  res.send(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>homepage</title>
      </head>
      <body>
        <h1>PALM TREE</h1>
      </body>
    </html>
    `);
}

export { getAppHandler };
