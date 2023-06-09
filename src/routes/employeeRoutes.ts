import * as express from "express";
import { getByID, deleteByID } from "../controllers/employeeController";

const router = express.Router();

router.route("/:id").get(getByID).delete(deleteByID);

export default router;
