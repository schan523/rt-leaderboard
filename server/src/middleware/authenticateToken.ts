import { NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    // const authHeader = req.headers.authentication;
    const authHeader = req.headers['authentication'];

    if (!authHeader || !authHeader.startswith('Bearer')) {
        const err = new Error("Invalid credientials");
        err.status = 401;
        return next(err);
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            const err = new Error("Invalid token.");
            return next(err);
        }

        req.user = decoded;
    })

    next();
}