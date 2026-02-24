import "reflect-metadata";
import express from "express";
import authRoutes from "./routes/auth.routes";
import chatRoutes from "./routes/chat.routes";
import userRoutes from "./routes/user.routes";
import channelRoutes from "./routes/channel.routes";
const app = express();

app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/users", userRoutes);
app.use("/api/channel", channelRoutes);
export default app;