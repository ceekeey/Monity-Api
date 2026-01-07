import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoute from "./routes/auth.route.js";
import expensiveRoute from "./routes/expensive.route.js";
import profileRoute from "./routes/user.route.js";
import { globalLimiter, authLimiter } from "./middleware/rateLimit.js";
import connectDb from "./db.js";

dotenv.config();

const app = express();
app.use(cors());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDb();

// ✅ Apply global rate limit
app.use(globalLimiter);

// ✅ Apply stricter rate limit only to auth
app.use("/api/auth", authLimiter, authRoute);
app.use("/api/expensive", expensiveRoute);
app.use("/api/user", authLimiter, profileRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
