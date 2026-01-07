import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import {
  isValidEmail,
  isAlpha,
  isStrongPassword,
} from "../utils/validators.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Validate
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!isAlpha(username)) {
      return res.status(400).json({ error: "Username must be alphabetic" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({ error: "Password too weak" });
    }

    // 2. Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    console.log("Saved user:", user);

    // 5. Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // 6. Optional: httpOnly cookie (recommended)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // 7. Send response
    res.status(201).json({
      message: "Account created successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Validate
    if (!username || !password)
      return res.status(400).json({ error: "Username and password required" });

    // 2. Find user
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    // 4. Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
