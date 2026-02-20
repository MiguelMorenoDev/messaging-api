import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Message } from "./Message.js"
import { IUser } from "../interfaces/user.interface.js"
@Entity()
export class User implements IUser {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({ type: "varchar" }) 
    firstName!: string;

    @Column({ type: "varchar" })
    lastName!: string;

    @Column({ type: "varchar", unique: true })
    email!: string;

    @Column({ type: "varchar" })
    password!: string;

    @Column({ type: "boolean", default: true })
    isActive!: boolean;

    @Column({ type: "varchar", nullable: true })
    refreshToken!: string;

    @OneToMany(() => Message, (message) => message.user)
    messages!: Message[];

}