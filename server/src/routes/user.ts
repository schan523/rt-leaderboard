import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

import UserService from '../services/user.ts';
import { errorHandler } from '../middleware/errorHandler';

dotenv.config();

const userRouter = express.Router();

userRouter.post('/register', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    await UserService.register(username, password);
    res.status(200).send("User successfully registered");  
})


userRouter.use(errorHandler);

export { userRouter }