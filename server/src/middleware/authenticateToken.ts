import { NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

import { CustomError } from './errorHandler.ts';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    // Checking to see if http-only cookie info is properly transmitted
    const accToken = req.cookies.accessToken;
    if (!accToken) {
        const err = new CustomError("Invalid credentials", 401);
        return next(err);
    }
    
    jwt.verify(accToken, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            const err = new CustomError("Invalid token.");
            return next(err);
        }

        res.locals.user = decoded;
        // res['locals'] = { user: decoded };
    })

    next();
}