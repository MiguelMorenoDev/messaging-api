import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  async getAll(req: Request, res: Response) {
    try {
      const users = await this.userRepository.find();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ message: "Error al obtener usuarios" });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
   // 1. Convertimos el ID a número (sin llaves {})
      const id = parseInt(req.params.id as string, 10);

    // 2. Buscamos en la base de datos
    const user = await this.userRepository.findOneBy({ id });

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      return res.json(user);
    } catch (error) {
      return res.status(500).json({ message: "Error al obtener el usuario" });
    }
  }
}