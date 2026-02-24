import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Message } from "./Message.js";

@Entity()
export class Channel {
    @PrimaryGeneratedColumn()
    id!: number;

    // Aquí le decimos explícitamente que es un string (varchar)
    @Column({ type: "varchar", unique: true })
    name!: string;

    // Y aquí también, indicando que puede ser nulo
    @Column({ type: "varchar", nullable: true })
    description!: string;

    @OneToMany(() => Message, (message) => message.channel)
    messages!: Message[];
}