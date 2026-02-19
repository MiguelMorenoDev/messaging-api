import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ITokenPayload } from "../interfaces/tokenpayload.interface";

declare global {
  namespace Express {
    interface Request {
      tokenData?: ITokenPayload; 
    }
  }
}
// Esta línea es clave: obliga a TS a tratar este archivo como un módulo


//Access Token Middleware
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // 1. Obtener el token de la cabecera "Authorization"
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No hay token, autorización denegada" });
    }

    // El header viene como "Bearer XXXX...", así que quitamos el "Bearer "
    const token = authHeader.split(" ")[1];

    try {
        //2. Buscamos la llave en el .env
        const secret = process.env.JWT_SECRET;

        if (!secret) {  
            throw new Error("Falta la variable JWT_SECRET en .env")
        }

        // 3. Verificar el token
        const decoded = jwt.verify(
            token, secret
        ) as ITokenPayload;

        // 3. Añadir los datos del usuario a la petición (req)
        // Esto permite que el siguiente paso sepa quién es el usuario
        req.tokenData = decoded;

        next(); // ¡Todo ok! Pasa al siguiente paso (el controlador)
    } catch (error) {
        res.status(401).json({ message: "Token no válido o caducado" });
    }
};