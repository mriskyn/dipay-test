import * as express from "express";
import { getCombination } from "../controllers/combinationController";

const router = express.Router();

router.post("/", getCombination);

export default router;
