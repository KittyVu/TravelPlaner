import { check, validationResult } from "express-validator";

const validateUser = [
  check('username')
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 4, max: 50 }).withMessage("Username has invalid length")
    .matches(/[a-zA-Z\s]+/).withMessage('Invalid characters used in username'),

  check('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 5 }).withMessage("Password is too short")
    .matches(/[a-z]/).withMessage('Password has at least one lowercase letter required')
    .matches(/[A-Z]/).withMessage('Password has at least one uppercase letter required')
    .matches(/[0-9]/).withMessage('Password has at least one digit required'),

  check('email')
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 4, max: 50 }).withMessage("Email has invalid length")
    .matches(/[a-zA-Z\s]+/).withMessage('Invalid characters used in email'),
    
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Just return first error as a simple message
      return res.status(422).json({ success: false, message: errors.array()[0].msg });
    }
    next();
  }
];

export default validateUser;