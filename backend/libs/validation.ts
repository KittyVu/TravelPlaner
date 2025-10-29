import type { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

const validateUser = [
  check('username')
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 4, max: 50 }).withMessage("Username must be between 4 and 50 characters")
    .matches(/^[a-zA-Z\s]+$/).withMessage('Username contains invalid characters'),

  check('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 5 }).withMessage("Password must be at least 5 characters")
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[0-9]/).withMessage('Password must contain at least one number'),

  check('email')
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format")
    .isLength({ max: 50 }).withMessage("Email must not exceed 50 characters"),

  // Middleware to check validation results
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return first validation error
      return res.status(422).json({ success: false, message: errors.array()[0].msg });
    }
    next();
  }
];

export default validateUser;
