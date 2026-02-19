import { z } from "zod";

export const messageSchema = z.object({
  content: z.string().min(1, "El mensaje no puede estar vacío").max(500, "Mensaje demasiado largo"),
  channelId: z.number().int().positive("ID de canal inválido")
});