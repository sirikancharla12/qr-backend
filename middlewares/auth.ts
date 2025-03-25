import { Request, Response, NextFunction } from "express";

// Extend the Request interface to include a 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// ✅ Middleware to Protect Routes
export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, token missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token is not valid" });
  }
};
