import { Request, Response, RequestParamHandler } from "express";
import * as mongoose from "mongoose";
import Company from "../models/Company";
import Employee from "../models/Employee";
import * as CustomError from "../errors";
import { Response as JSONResponse } from "../types/express/response";
import { StatusCodes } from "http-status-codes";

export const create = async (req: Request, res: Response): Promise<void> => {
  const { company_name, telephone_number, address } = req.body;

  const companyAlreadyExists = await Company.findOne({ company_name });
  if (companyAlreadyExists) {
    throw new CustomError.ConflictError("Company Name already exist");
  }

  const company = await Company.create({
    company_name,
    telephone_number,
    address,
  });

  const statusCode = StatusCodes.CREATED;

  const response: JSONResponse = {
    code: String(statusCode),
    status: statusCode,
    data: {
      id: company.id,
    },
    message: "Success",
  };

  res.status(statusCode).json(response);
  return;
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
  const count = await Company.count();

  if (count < 1) {
    throw new CustomError.UnprosssableEntityError("Data is not found");
  }
  let rows = await Company.find();

  const statusCode = StatusCodes.OK;

  let result = rows.map((row) => ({
    id: row._id,
    company_name: row.company_name,
    telephone_number: row.telephone_number,
    is_active: row.is_active,
    address: row.address,
  }));

  const response: JSONResponse = {
    code: String(statusCode),
    status: statusCode,
    data: {
      count,
      rows: result,
    },
    message: "Success",
  };

  res.status(statusCode).json(response);
  return;
};

export const setActive = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;

  const company = await Company.findById(id);

  if (!company) {
    throw new CustomError.UnprosssableEntityError("Data is not found");
  }

  if (company.is_active) {
    throw new CustomError.BadRequestError("Company is already active");
  }

  company.is_active = true;

  await company.save();

  const statusCode = StatusCodes.CREATED;

  const response: JSONResponse = {
    code: String(statusCode),
    status: statusCode,
    data: {
      id: company._id,
      is_active: company.is_active,
    },
    message: "Success",
  };

  res.status(StatusCodes.OK).json(response);
  return;
};

export const createEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  const company_id = req.params.company_id;
  const { name, phone_number, jobtitle, email } = req.body;

  const employeeAlreadyExists = await Employee.findOne({ email });

  if (employeeAlreadyExists) {
    throw new CustomError.ConflictError("Email already exist");
  }
  const employee = await Employee.create({
    name,
    phone_number,
    jobtitle,
    email,
    companies: company_id,
  });

  const statusCode = StatusCodes.CREATED;

  const response: JSONResponse = {
    code: String(statusCode),
    status: statusCode,
    data: {
      id: employee._id,
      company_id: company_id,
    },
    message: "Success",
  };

  res.status(statusCode).json(response);
  return;
};

export const getEmployeesByCompanyID = async (
  req: Request,
  res: Response
): Promise<void> => {
  const company_id = req.params.id;

  const employees = await Employee.find({ companies: company_id });

  if (!employees) {
    throw new CustomError.UnprosssableEntityError("Data is not found");
  }
  const company = await Company.findById(company_id);

  if (!company) {
    throw new CustomError.UnprosssableEntityError("Data is not found");
  }

  const statusCode = StatusCodes.OK;

  const response: JSONResponse = {
    code: String(statusCode),
    status: statusCode,
    data: {
      id: company.id,
      company_name: company.company_name,
      is_active: company.is_active,
      employees: employees.map((employee) => ({
        id: employee._id,
        name: employee.name,
        phone_number: employee.phone_number,
        jobtitle: employee.jobtitle,
      })),
    },
    message: "Success",
  };

  res.status(statusCode).json(response);
  return;
};

export const updateEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { company_id, employee_id } = req.params;
  const { name, phone_number, jobtitle, email } = req.body;

  const employee = await Employee.findById(employee_id);

  if (!employee) {
    throw new CustomError.UnprosssableEntityError("Data is not found");
  }

  const employeeAlreadyExists = await Employee.findOne({ email });
  if (employeeAlreadyExists) {
    throw new CustomError.ConflictError("Email already exist");
  }

  employee.name = name;
  employee.phone_number = phone_number;
  employee.jobtitle = jobtitle;
  employee.email = email;
  // @ts-ignore: Unreachable code error
  employee.companies = company_id;

  await employee.save();

  const statusCode = StatusCodes.CREATED;

  const response: JSONResponse = {
    code: String(statusCode),
    status: statusCode,
    data: {
      id: employee._id,
      company_id: company_id,
    },
    message: "Success",
  };

  res.status(statusCode).json(response);
  return;
};
