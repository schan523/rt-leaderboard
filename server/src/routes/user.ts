import express, { NextFunction, Request, Response } from 'express';
import 'dotenv/config';

import UserService from '../services/user.ts';
import { CustomError, errorHandler } from '../middleware/errorHandler';

const userRouter = express.Router();
userRouter.use(express.json());


userRouter.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    const jwt = await UserService.register(username, password);

    if (!jwt) {
        const error = new CustomError("A user with this username already exists.");
        return next(error);
    }

    res.status(200).send("User successfully registered: "+jwt);  
})

userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    const user = await UserService.login(username, password);

    if (!user) {
        const error = new CustomError("Invalid or missing login credentials.", 400);
        return next(error);
    }
    req.session.refreshToken = user.refresh;
    res.status(200).json(user.access);
})

userRouter.post('/refresh', async (req: Request, res: Response) => {
    // when access token expires, check for a refresh token. If not present, return "session expired". Otherwise, generate a new access token.
    const newToken = UserService.refresh(req.session.refreshToken);
    if (!newToken) {
        res.status(401).send("Session expired");
    }
    res.send(200).json(newToken);
})

userRouter.use(errorHandler);

export { userRouter }