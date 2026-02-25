import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source.js";
import { User } from "../entities/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "../interfaces/user.interface.js";
import { ITokenPayload } from "../interfaces/tokenpayload.interface.js";
import { IAccessTokenPayload } from "../interfaces/IAccessTokenPayload.js";
export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const userRepository = AppDataSource.getRepository(User);
        const existingUser = await userRepository.findOneBy({ email }) as IUser;
        
        if (existingUser) {
            return res.status(400).json({ message: "El email ya está registrado" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = userRepository.create({ 
            email, 
            password: hashedPassword 
        });
        
        await userRepository.save(newUser);
        res.status(201).json({ message: "Usuario creado con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const userRepository = AppDataSource.getRepository(User);
        
        // Buscamos al usuario
        const user = await userRepository.findOneBy({ email }) as IUser;
        if (!user) {
            return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
        }

        // Validamos contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
        }

        // 1. Access Token (Corto: 15 min) - Para el uso diario
        const accessToken = jwt.sign(
            { id: user.id, email: user.email } as IAccessTokenPayload,
            process.env.JWT_SECRET!,
            { expiresIn: "15m" }
        );

        // 2. Refresh Token (Largo: 30 días) - Para renovar la sesión
        const refreshToken = jwt.sign(
            { id: user.id },
            process.env.JWT_REFRESH_SECRET!,
            { expiresIn: "30d" }
        );

        // 3. Guardamos el Refresh Token en la base de datos para poder validarlo/revocarlo
        user.refreshToken = refreshToken;
        await userRepository.save(user);

        res.status(200).json({
            message: "Login exitoso",
            accessToken,
            refreshToken,
            user: { id: user.id, email: user.email }
        });

    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
};
    // Logout
    export const logout = async (req: Request, res: Response) => {
        try {
            const userId = req.user?.id;

            if (!userId) {
                return res.status(401).json({message: "Usuario no identificado"});
            }
       

        const userRepository = AppDataSource.getRepository(User);

        //Buscamos y usamos el refresh token
        await userRepository.update(userId, { refreshToken: null as any });

        res.status(200).json( { message: "Sesión cerrada correctamente"});
 
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor al cerrar sesión"});
    }
};

export const refresh = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body ;

        if (!refreshToken) {
            return res.status(401).json({ message: "Refresh Token requerido" });
        }

        // Verificar el token con el secreto de REFRESH
        const decoded = jwt.verify(
            refreshToken, 
            process.env.JWT_REFRESH_SECRET!
        ) as ITokenPayload;

        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ 
            id: decoded.id,
            refreshToken: refreshToken // Verificamos que sea el mismo que hay en DB
        });

        if (!user) {
            return res.status(401).json({ message: "Sesión no válida" });
        }

        // Generar un nuevo Access Token (Otros 15 minutos de vida)
        const newAccessToken = jwt.sign(
            { id: user.id, email: user.email } as IAccessTokenPayload,
            process.env.JWT_SECRET!,
            { expiresIn: "15m" }
        );

        //Creación del nuevo refresh Token (30 días)
        const newRefreshToken = jwt.sign(
            { id: user.id },
            process.env.JWT_REFRESH_SECRET!,
            { expiresIn: "30d"}
        ) 

        // Guardamos la nueva "llave maestra" y borramos la vieja
        user.refreshToken = newRefreshToken;
        await userRepository.save(user);

        res.json({ 
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        });
    } catch (error) {
        res.status(401).json({ message: "Token inválido o expirado" });
    }
        };
