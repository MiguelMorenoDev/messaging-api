import { z } from "zod";

export const updateUserSchema = z.object({
  body: z.object({
    username: z.string().min(3).max(30).optional(),
    email: z.string().email("Email inválido").optional(),
    password: z.string().min(8, "Mínimo 8 caracteres").optional(),
    role: z.enum(["user", "admin"]).optional(),
  }),
});

export const paramsIdSchema = z.object({
  params: z.object({
    id: z.string().uuid("ID no válido (debe ser UUID)"), 
    // Cambia .uuid() por .regex(/^[0-9a-fA-F]{24}$/) si usas MongoDB/ObjectId
  }),
});