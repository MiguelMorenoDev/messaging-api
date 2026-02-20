import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Channel } from "../entities/Channel";

export class ChannelController {
    private channelRepo = AppDataSource.getRepository(Channel);

    // Crear un canal
    create = async (req: Request, res: Response) => {
        try {
            const { name, description } = req.body;
            const newChannel = this.channelRepo.create({ name, description });
            await this.channelRepo.save(newChannel);
            res.status(201).json(newChannel);
        } catch (error) {
            res.status(500).json({ message: "Error al crear canal" });
        }
    };

    // Listar todos los canales
    getAll = async (_req: Request, res: Response) => {
        try {
            const channels = await this.channelRepo.find();
            res.json(channels);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener canales" });
        }
    };

    // Obtener un canal con sus mensajes (opcional)
    getOne = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id as string);
            const channel = await this.channelRepo.findOne({
                where: { id },
                relations: ["messages"] // <--- Para ver sus mensajes
            });

            if (!channel) return res.status(404).json({ message: "No existe" });
            res.json(channel);
        } catch (error) {
            res.status(500).json({ message: "Error" });
        }
    };
}