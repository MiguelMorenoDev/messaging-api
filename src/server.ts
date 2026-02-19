import "reflect-metadata";
import app from "./app";
import { createServer } from "http";
import { Server } from "socket.io";
import { AppDataSource } from "./config/data-source";
import jwt from "jsonwebtoken";
import { ITokenPayload } from "./interfaces/tokenpayload.interface";
import { Message } from "./entities/Message";
import { messageSchema } from "./validations/message.validation"; // <--- NUEVO: El import

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: { origin: "*" }
});

// Middleware Socket.io
io.use((socket, next) => {
    const token = socket.handshake.auth.token?.split(" ")[1];
    if (!token) return next(new Error("No Token"));

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as ITokenPayload;
        socket.data.user = decoded;
        next();
    } catch (error) {
        next(new Error("Invalid token"));
    }
});

io.on("connection", (socket) => {
    const messageRepo = AppDataSource.getRepository(Message);
    
    console.log("🟢 Usuario conectado:", socket.id);

    socket.on("joinChannel", (channelId: number) => {
        socket.rooms.forEach(room => {
            if (room !== socket.id) socket.leave(room);
        });
        socket.join(`channel_${channelId}`);
    });

    socket.on("sendMessage", async (data: { content: string, channelId: number }) => {
        try {
            // 1. VALIDACIÓN CON ZOD <--- NUEVO
            const validatedData = messageSchema.parse(data); 

            // 2. USAMOS LOS DATOS VALIDADOS <--- NUEVO
            const newMessage = messageRepo.create({
                content: validatedData.content,
                user: { id: socket.data.user.id },
                channel: { id: validatedData.channelId }
            });

            await messageRepo.save(newMessage);

            io.to(`channel_${validatedData.channelId}`).emit("newMessage", {
                content: newMessage.content,
                user: socket.data.user.email,
                createdAt: newMessage.createdAt
            });
        } catch (err: any) {
            // 3. CAPTURAMOS EL ERROR DE ZOD <--- NUEVO
            console.error("Error en mensaje:", err.errors || err);
            socket.emit("error", {
                message: "Datos inválidos",
                details: err.errors ? err.errors[0].message : "Error desconocido"
            });
        }
    });

    socket.on("disconnect", () => console.log("🔴 Desconectado"));
});

// Encendido
AppDataSource.initialize()
    .then(() => {
        const PORT = 4000;
        httpServer.listen(PORT, () => {
            console.log(`🚀 Servidor en: http://localhost:${PORT}`);
        });
    })
    .catch(error => console.error("❌ Error DB:", error));