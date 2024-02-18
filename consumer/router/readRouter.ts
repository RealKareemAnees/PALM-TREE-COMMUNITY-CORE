import { Router } from "express";
import "colors";
import { handleRead } from "../handlers/handleRead/handleRead";

const readRouter = Router();

readRouter.get("/read-file", handleRead);

export { readRouter };
