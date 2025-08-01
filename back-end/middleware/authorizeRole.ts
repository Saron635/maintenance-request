import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
  userId: string;
  role: string;
}

export const authorizeRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.authToken;
    console.log(token)
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
      const secret = process.env.JWT_KEY as string;
      const decoded = jwt.verify(token, secret) as DecodedToken;

      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: "Access denied. Insufficient permissions." });
      }

      (req as any).user = decoded; // Use type assertion here
      next();
    } catch (err) {
      res.status(400).json({ message: "Invalid token." });
    }
  };
};