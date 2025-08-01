// types/express.d.ts
import { Request } from 'express';

declare global {
    namespace Express {
        interface Request {
            userRole?: string; // or any other type based on your needs
        }
    }
}
