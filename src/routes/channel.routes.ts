import { Router } from "express";
import { ChannelController } from "../controllers/channel.controller";
import { checkJwt } from "../middlewares/checkJwt.middleware"; // Asegúrate de que el nombre coincide con tu archivo

const router = Router();
const controller = new ChannelController();

// Todas las rutas de canales requieren estar logueado
router.use(checkJwt);

router.get("/", controller.getAll);        // GET /api/channels
router.get("/:id", controller.getOne);     // GET /api/channels/1
router.post("/", controller.create);       // POST /api/channels

export default router;