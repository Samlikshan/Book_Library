import { Request, Response, NextFunction } from "express";
import { authService } from "../services/authServices";
import { STATUS_CODES } from "../utils/statusCodes";

export const authController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await authService.register(email, password);
      res.status(STATUS_CODES.CREATED).json({ user });
    } catch (err) {
      next(err);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const { token } = await authService.login(email, password);
      res.status(STATUS_CODES.OK).json({ token });
    } catch (err) {
      next(err);
    }
  },
};
