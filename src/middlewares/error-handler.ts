import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.NODE_ENV !== 'testing'){
    console.log(err);
  }
  let customError = {
    status: parseInt(err.statusCode) || StatusCodes.INTERNAL_SERVER_ERROR,
    code: String(err.statusCode) || String(StatusCodes.INTERNAL_SERVER_ERROR),
    data: err.data || null,
    message: err.message || "Something went wrong try again later",
  };

  if (err.name === "ValidationError") {
    customError.message = Object.values(err.errors)
      .map((item: any) => item.message)
      .join(",");
    customError.status = StatusCodes.BAD_REQUEST;
    customError.code = String(StatusCodes.BAD_REQUEST);
  }

  return res.status(customError.status).json(customError);
};

export default errorHandlerMiddleware;
