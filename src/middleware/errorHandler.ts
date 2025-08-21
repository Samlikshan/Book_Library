import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { STATUS_CODES } from "../utils/statusCodes";
import { ZodError } from "zod";
import mongoose from "mongoose";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof ApiError) {
    return res
      .status(err.statusCode)
      .json({ message: err.message, details: err.details });
  }

  if (err instanceof mongoose.Error.CastError) {
    return res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ message: "Invalid id format" });
  }

  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      message: "Validation failed",
      details: err.errors,
    });
  }

  if (err instanceof ZodError) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      message: "Validation failed",
      details: err.issues.map((issue) => ({
        path: issue.path,
        message: issue.message,
      })),
    });
  }

  console.error(err);

  return res
    .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
    .json({ message: "Internal server error" });
}
