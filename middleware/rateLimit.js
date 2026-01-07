import rateLimit from "express-rate-limit";

/**
 * Global limiter (basic protection)
 */
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per IP
  standardHeaders: true, // RateLimit-* headers
  legacyHeaders: false,
  message: {
    error: "Too many requests, please try again later",
  },
});

/**
 * Auth limiter (strong protection against brute force)
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 10 login/register attempts
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many authentication attempts, try again later",
  },
});
