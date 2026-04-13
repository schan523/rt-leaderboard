import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import UserService from '../services/user.ts';
import { CustomError, errorHandler } from '../middleware/errorHandler';

const userRouter = express.Router();
userRouter.use(express.json());


userRouter.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;
    const jwt = await UserService.register(username, email, password);

    if (!jwt) {
        const error = new CustomError("A user with this username already exists.");
        return next(error);
    }

    res.status(200).send("User successfully registered");  
})

userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await UserService.login(email, password);

    if (!user) {
        const error = new CustomError("Invalid or missing login credentials.", 400);
        return next(error);
    }
    res.cookie('refreshToken', user.refresh, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 1000
    });
    res.cookie('accessToken', user.access, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000
    });
    res.status(200).json(user.username);
})

userRouter.post('/logout', async (req: Request, res: Response) => {
    if (req.cookies.accessToken && req.cookies.refreshToken) {
        res.clearCookie('accessToken', {
            httpOnly: true,
            maxAge: 15 * 60 * 1000
        });
        res.clearCookie('refreshToken', {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })

        res.status(200).send("User successfully logged out");
    }
    else {
        res.status(401).send("Valid access and refresh tokens could not be found");
    }
    
})

userRouter.post('/refresh', async (req: Request, res: Response) => {
    const newToken = await UserService.refresh(req.cookies.refreshToken);
    if (!newToken) {
        res.status(401).send("Session expired");
    }
    console.log("access token generated", newToken);
    res.cookie('accessToken', newToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000
    });
    res.send(200);
})

userRouter.use(errorHandler);

export { userRouter }