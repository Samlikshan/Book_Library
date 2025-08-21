import { Router } from "express";
import { bookController } from "../controller/bookController";
import { requireAuth } from "../middleware/auth";
import { validateBody } from "../middleware/validate";
import {
  createBookSchema,
  getBooksQuerySchema,
} from "../validators/bookSchema";

const router = Router();

router.get("/", bookController.list);

router.post(
  "/",
  requireAuth,
  validateBody(createBookSchema),
  bookController.create
);

router.post("/:id/checkout", requireAuth, bookController.checkout);

export default router;
