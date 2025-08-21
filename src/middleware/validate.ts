import { NextFunction, Request, Response } from "express";
import { ZodSchema, ZodError, TypeOf } from "zod";
import { BadRequest } from "../utils/ApiError";

export function validateBody(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError)
        return next(BadRequest("Validation failed", err.flatten()));
      next(err);
    }
  };
}
