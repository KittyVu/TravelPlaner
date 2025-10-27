import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

const secretKey = process.env.SECRET_KEY || "secret";

// Register user 
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password, email } = req.body;
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) return res.status(400).json({ msg: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ success: true, msg: "User registered successfully", user: newUser });
  } catch (error) {
    next(error);
  }
};

// Login user and set cookie
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(401).json({ msg: "Invalid username or password" });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ msg: "Invalid username or password" });

    const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: "2h" });

    res
      .cookie("jwt", token, {
        maxAge: 2 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false,   
        sameSite: "none" 
      })
      .status(200)
      .json({ success: true, user: { id: user.id, username: user.username } });

  } catch (error) {
    next(error);
  }
};

// Logout
export const logout = (req: Request, res: Response) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: false,
    sameSite: "none",
  });
  return res.status(200).json({ msg: "Logged out successfully" });
};

// Get user info
export const infoUser = (req: Request, res: Response) => {
  const token = req.cookies?.jwt;
  if (!token) return res.status(401).json({ msg: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, secretKey);
    res.json({ success: true, user: decoded });
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
};
