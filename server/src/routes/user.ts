import express, { Request, Response } from 'express';
import 'dotenv/config';

import UserService from '../services/user.ts';
import { errorHandler } from '../middleware/errorHandler';

const userRouter = express.Router();

userRouter.post('/register', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const jwt = await UserService.register(username, password);
    res.status(200).send("User successfully registered: "+jwt);  
})

userRouter.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await UserService.login(username, password);
    res.status(200).send(user?.jwt);
})

userRouter.use(errorHandler);

export { userRouter }