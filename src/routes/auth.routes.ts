import { Router } from "express";
import { register, login, logout, refresh } from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validate.middleware.js"
import { registerSchema, loginSchema, refreshSchema } from "../validations/auth.validation";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();
router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", authMiddleware, logout);
router.post("/refresh", validateSchema(refreshSchema), refresh);

export default router;