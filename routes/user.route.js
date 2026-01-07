import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { showProfile, updateProfile } from "../controller/user.controller.js";

const router = express.Router();

router.put("/profile", protect, updateProfile);
router.get("/profile", protect, showProfile);

export default router;
