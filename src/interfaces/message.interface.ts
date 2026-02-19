export interface IMessage {
    id?: number;
    content: string;    // El texto del mensaje
    senderId: number;   // Quién lo envía (ID de User)
    channelId: string;  // A qué sala o chat pertenece
    createdAt?: Date;
}