import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js"; 


const router = Router();

router.get("/messages", authMiddleware, (req,res) => {
    const userId = req.tokenData?.id;

    res.json({
        message: `Hola usuario con ID: ${userId}, aquí tienes tus mensajes`,
        data: [
            { id: 101, texto: "Bienvenido al chat privado" },
            { id: 102, texto: "Este contenido solo lo ves tú" }
        ]
    });
});

export default router;