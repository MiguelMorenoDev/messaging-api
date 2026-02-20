import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Channel } from "./Channel";

@Entity("user_channels")
export class UserChannel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "int"})
    userId!: number;

    @Column({type: "int"})
    channelId!: number;

    @Column({ type: "varchar", default: "member" }) // Por si quieres añadir 'admin' luego
    role: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "userId" })
    user: User;

    @ManyToOne(() => Channel)
    @JoinColumn({ name: "channelId" })
    channel: Channel;
}