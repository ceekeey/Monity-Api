import express from "express";

import { protect } from "../middleware/auth.middleware.js";
import {
  addExpense,
  deleteExpense,
  getAllExpenses,
} from "../controller/expense.controller.js";

const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/all", protect, getAllExpenses);
router.delete("/delete/:id", protect, deleteExpense);
router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", time: new Date() });
});

export default router;
