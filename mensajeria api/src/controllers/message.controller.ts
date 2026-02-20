import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source.js";
import { Message } from "../entities/Message.js";
import { User } from "../entities/User.js";
import { Channel } from "../entities/Channel.js";

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { content, channelId } = req.body;
        const userId = (req as any).user.id; // Obtenido del token de acceso

        const messageRepo = AppDataSource.getRepository(Message);
        const userRepo = AppDataSource.getRepository(User);
        const channelRepo = AppDataSource.getRepository(Channel);

        const user = await userRepo.findOneBy({ id: userId });
        const channel = await channelRepo.findOneBy({ id: channelId });

        if (!user || !channel) {
            return res.status(404).json({ message: "Usuario o Canal no encontrado" });
        }

        const newMessage = messageRepo.create({
            content,
            user,
            channel
        });

        await messageRepo.save(newMessage);

        res.status(201).json({ message: "Mensaje enviado", data: newMessage });
    } catch (error) {
        res.status(500).json({ message: "Error al enviar mensaje", error });
    }
};

export const getMessagesByChannel = async (req: Request, res: Response) => {
    try {
        const { channelId } = req.params;
        const messageRepo = AppDataSource.getRepository(Message);

        const messages = await messageRepo.find({
            where: { channel: { id: Number(channelId) } },
            relations: ["user"], // Para saber el nombre del que escribió
            order: { createdAt: "ASC" } // Los mensajes más antiguos primero
        });

        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener mensajes", error });
    }
};