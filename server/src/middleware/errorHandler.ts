import { Request, Response, NextFunction } from 'express';

export class CustomError extends Error {
    status?: number;

    constructor(public message: string, status?: number) {
        super(message);
        this.status = status;
        // Object.setPrototypeOf(this, CustomError.prototype);
    }
}

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(err);
    }

    const status = err.status ? err.status : 500;
    const message = err.message ? err.message : "Bad request.";

    console.error(err.stack);
    res.status(status).send(message);
}
