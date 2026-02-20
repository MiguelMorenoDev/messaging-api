import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne} from "typeorm";
import { User } from "./User.js";
import { Channel } from "./Channel.js";
import { IMessage } from "../interfaces/message.interface.js";
@Entity()
export class Message implements IMessage {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("text")
    content!: string;

    @Column({ type: "int" })
    senderId!:number;

    @Column({ type: "text" })
    channelId: string;

    @CreateDateColumn() // Esto pone la fecha y hora automáticamente
    createdAt!: Date;

    // RELACIÓN: Muchos mensajes pueden ser de UN solo Usuario
    @ManyToOne(() => User, (user) => user.messages)
    user!: any;

    // RELACIÓN: Muchos mensajes pueden estar en UN solo Canal
    @ManyToOne(() => Channel)
    channel!: Channel;
}