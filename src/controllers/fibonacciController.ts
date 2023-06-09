import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as CustomError from "../errors";
import { Response as JSONResponse } from "../types/express/response";

export const getFibonacci = async (
  req: Request,
  res: Response
): Promise<void> => {
  const n = parseInt(req.body.n);
  if (!n) {
    throw new CustomError.BadRequestError("n is required");
  }

  let n1 = 0,
    n2 = 1,
    nextTerm = 0,
    result = "";
  result += `${n1} ${n2} `;
  nextTerm = n1 + n2;

  while (nextTerm <= n) {
    result += `${nextTerm} `;
    n1 = n2;
    n2 = nextTerm;
    nextTerm = n1 + n2;
  }
  result = result.trim();
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
