import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { Unauthorized } from "../utils/ApiError";

export interface JwtPayload {
  id: string;
  role: "user" | "admin";
}

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer "))
    return next(Unauthorized("Missing or invalid Authorization header"));
  const token = header.split(" ")[1];
  console.log(token, "token");
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    req.user = payload;
    next();
  } catch (error) {
    console.log(error, "error");
    next(Unauthorized("Invalid or expired token"));
  }
}
