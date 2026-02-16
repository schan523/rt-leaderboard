import express, { Request, Response } from 'express';
import 'dotenv/config';

import { authenticateToken, errorHandler } from '../middleware/index.ts';
import leaderboardService from '../services/leaderboard.ts';
 
const lbRouter = express.Router();

lbRouter.post('/submit', authenticateToken, async (req: Request, res: Response) => {
    const user = res.locals.user;
    console.log(req.body);
    const { game, hours, minutes, seconds } = req.body;
    console.log("This is running");
    await leaderboardService.submit(user.username, game, hours, minutes, seconds);
    console.log("this successfully ran");
    res.status(200).send("Score successfully submitted");
})

lbRouter.use(errorHandler);

export { lbRouter }

