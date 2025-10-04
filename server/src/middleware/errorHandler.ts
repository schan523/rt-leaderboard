import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (res.headerSent) {
        return next(err);
    }

    const status = err.status ? err.status : 500;
    const message = err.message ? err.message : "Bad request.";

    console.error(err.stack);
    res.status(status).send(message);
}