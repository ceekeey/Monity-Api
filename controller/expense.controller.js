import Expense from "../models/Expense.model.js";

/**
 * ADD EXPENSE / INCOME
 */
export const addExpense = async (req, res) => {
  try {
    const { title, amount, type, date } = req.body;

    if (!title || !amount || !type || !date) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!["income", "expense"].includes(type)) {
      return res.status(400).json({ error: "Invalid expense type" });
    }

    const expense = await Expense.create({
      user: req.user.id,
      title,
      amount: type === "expense" ? -Math.abs(amount) : Math.abs(amount),
      type,
      date,
    });

    res.status(201).json({
      message: "Transaction added",
      expense,
    });
  } catch (error) {
    console.error("Add expense error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

/**
 * GET ALL USER EXPENSES
 */
export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({
      date: -1,
    });

    res.status(200).json(expenses);
  } catch (error) {
    console.error("Get expenses error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
