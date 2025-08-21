import { STATUS_CODES } from "../utils/statusCodes";
export class ApiError extends Error {
  statusCode: number;
  details?: unknown;

  constructor(statusCode: number, message: string, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const NotFound = (msg = "Resource not found") =>
  new ApiError(STATUS_CODES.NOT_FOUND, msg);
export const BadRequest = (msg = "Bad request", details?: unknown) =>
  new ApiError(STATUS_CODES.BAD_REQUEST, msg, details);
export const Unauthorized = (msg = "Unauthorized") =>
  new ApiError(STATUS_CODES.UNAUTHORIZED, msg);
export const Forbidden = (msg = "Forbidden") =>
  new ApiError(STATUS_CODES.FORBIDDEN, msg);
