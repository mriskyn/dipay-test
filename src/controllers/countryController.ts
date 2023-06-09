import { Request, Response } from "express";
import * as axios from "axios";
import { StatusCodes } from "http-status-codes";
import * as CustomError from "../errors";
import { Response as JSONResponse } from "../types/express/response";

export const getCountries = async (
  req: Request,
  res: Response
): Promise<void> => {
  const url: string =
    "https://gist.githubusercontent.com/herysepty/ba286b815417363bfbcc472a5197edd0/raw/aed8ce8f5154208f9fe7f7b04195e05de5f81fda/coutries.json";
  const countries = await axios.default.get(url);

  if (!countries) {
    throw new CustomError.BadRequestError("Something Went Wrong");
  }

  const result = countries.data

  const statusCode = StatusCodes.OK;

  const response: JSONResponse = {
    code: String(statusCode),
    status: statusCode,
    data: result.map((country: any) => ({
      name: country.name,
      region: country.region,
      timezones: country.timezones,
    })),
    message: "Success",
  };

  res.status(statusCode).json(response);
  return;
};
