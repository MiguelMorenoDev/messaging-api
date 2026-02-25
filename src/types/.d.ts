import { ITokenPayload } from "../interfaces/tokenpayload.interface.js";

declare global {
    namespace Express {
        interface Request {
            tokenData?: ITokenPayload;
            user?: ITokenPayload;
        }
    }
}