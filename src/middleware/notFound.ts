import { Request, Response } from "express";
import { STATUS_CODES } from "../utils/statusCodes";

export function notFound(_req: Request, res: Response) {
  res.status(STATUS_CODES.NOT_FOUND).json({ message: "Route not found" });
}
