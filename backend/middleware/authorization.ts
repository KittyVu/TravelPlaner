import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY || "mysecrettripkeyplaner";

declare global {
  namespace Express {
    interface Request {
      user?: { id: number; username: string };
    }
  }
}

export const authorization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.jwt;

  if (!token) {
    return res.status(401).json({
      success: false,
      msg: "No authentication token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, secretKey) as {
      id: number;
      username: string;
    };

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      msg: "Invalid or expired authentication token",
    });
  }
};
