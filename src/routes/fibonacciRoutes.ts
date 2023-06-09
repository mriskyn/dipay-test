import * as express from "express";
import { getFibonacci } from "../controllers/fibonacciController";

const router = express.Router();

router.post("/", getFibonacci);

export default router;
