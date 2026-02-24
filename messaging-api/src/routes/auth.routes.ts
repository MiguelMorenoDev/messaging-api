import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validate.middleware.js"
import { registerSchema, loginSchema, refreshSchema } from "../validations/auth.validation.js";
const router = Router();

// Definimos que en la ruta /register se ejecute tu lógica
router.post("/register", validateSchema(registerSchema), register);
router.post("/login", login);

export default router;