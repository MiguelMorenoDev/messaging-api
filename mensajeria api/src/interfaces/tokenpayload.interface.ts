export interface ITokenPayload {
    id: number;
    email: string;
    iat?: number; // Issued at (added by JWT)
    exp?: number; // Expiration (added by JWT)
}