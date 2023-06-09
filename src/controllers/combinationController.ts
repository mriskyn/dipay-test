import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as CustomError from "../errors";
import { Response as JSONResponse } from "../types/express/response";

export const getCombination = async (
  req: Request,
  res: Response
): Promise<void> => {
  const n = parseInt(req.body.n);
  const r = parseInt(req.body.r);
  if (!n || !r) {
    throw new CustomError.BadRequestError("n or r is required");
  }

  let result = factorialize(n) / (factorialize(r) * factorialize(n - r));

  const statusCode = StatusCodes.OK;

  const response: JSONResponse = {
    code: String(statusCode),
    status: statusCode,
    data: { result },
    message: "Success",
  };

  res.status(statusCode).json(response);
  return;
};

function factorialize(num: number): number {
  if (num < 0) return -1;
  else if (num == 0) return 1;
  else {
    return num * factorialize(num - 1);
  }
}
