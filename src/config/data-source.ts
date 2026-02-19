import "dotenv/config";
import { DataSource } from "typeorm";
import { User } from "../entities/User.js";
import { Message } from "../entities/Message.js"; 
import { Channel } from "../entities/Channel.js"; 

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,  
    entities: [User, Message, Channel], 
    logging: true,
});