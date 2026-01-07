import express from "express";

import { protect } from "../middleware/auth.middleware.js";
import {
  addExpense,
  getAllExpenses,
} from "../controller/expense.controller.js";

const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/all", protect, getAllExpenses);

export default router;
