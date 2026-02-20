import { z } from 'zod';

export const channelSchema = z.object({
  name: z.string()
    .min(3, "Mínimo 3 caracteres")
    .max(50, "Máximo 50 caracteres")
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9-]+$/, "Solo letras, números y guiones"),
  
  description: z.string()
    .max(255, "Descripción demasiado larga")
    .optional(),

  isPrivate: z.boolean().default(false)
});

export type CreateChannelInput = z.infer<typeof channelSchema>;