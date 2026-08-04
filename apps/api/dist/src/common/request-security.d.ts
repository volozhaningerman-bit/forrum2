import type { NextFunction, Request, Response } from 'express';
export declare function requestSecurity(options: {
    allowedOrigin: string;
}): (request: Request, response: Response, next: NextFunction) => void;
