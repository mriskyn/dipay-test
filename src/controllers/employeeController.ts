import { Request, Response } from "express";
import Employee from "../models/Employee";
import * as CustomError from "../errors";
import { Response as JSONResponse } from "../types/express/response";
import { StatusCodes } from "http-status-codes";

export const getByID = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;

  const employee = await Employee.findById(id);

  if (!employee) {
    throw new CustomError.UnprosssableEntityError("Data is not found");
  }

  const statusCode = StatusCodes.OK;

  const response: JSONResponse = {
    code: String(statusCode),
    status: statusCode,
    data: {
      id: employee._id,
      name: employee.name,
      phone_number: employee.phone_number,
      jobtitle: employee.jobtitle,
    },
    message: "Success",
  };

  res.status(statusCode).json(response);
  return;
};

export const deleteByID = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;

  const employee = await Employee.findById(id);

  if (!employee) {
    throw new CustomError.UnprosssableEntityError("Data is not found");
  }

  await employee.remove();

  res.status(StatusCodes.NO_CONTENT).send();
  return;
};
