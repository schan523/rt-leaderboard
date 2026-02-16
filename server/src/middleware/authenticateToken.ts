import { NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

import { CustomError } from './errorHandler.ts';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    // const authHeader = req.headers.authentication;
    console.log("the type of req.headers[authorization] is", typeof(req.headers['authorization']))

    if (typeof(req.headers['authorization']) !== 'string') {
        const err = new CustomError("Invalid authentication", 401);
        return next(err);
    }

    const authHeader: string = req.headers['authorization'];

    if (!authHeader.startsWith('Bearer')) {
        const err = new CustomError("Invalid credientials", 401);
        return next(err);
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            const err = new CustomError("Invalid token.");
            return next(err);
        }

        res.locals.user = decoded;
        // res['locals'] = { user: decoded };
    })

    next();
}