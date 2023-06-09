import * as express from "express";
import {
  create,
  getAll,
  setActive,
  createEmployee,
  getEmployeesByCompanyID,
  updateEmployee,
} from "../controllers/companyController";

const router = express.Router();

router.route("/").get(getAll).post(create);
router.put("/:id/set_active", setActive);
router.get("/:id/employees", getEmployeesByCompanyID);
router.post("/:company_id/employees", createEmployee);
router.put("/:company_id/employees/:employee_id", updateEmployee);

export default router;
