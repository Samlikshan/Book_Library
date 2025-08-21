import { Router } from "express";
import { authController } from "../controller/authController";
import { validateBody } from "../middleware/validate";
import { loginSchema, registerSchema } from "../validators/authSchema";

const router = Router();

router.post("/register", validateBody(registerSchema), authController.register);
router.post("/login", validateBody(loginSchema), authController.login);

export default router;
