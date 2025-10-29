import express, { Request, Response } from 'express';
import 'dotenv/config';

import { authenticateToken, errorHandler } from '../middleware/index.ts';

const lbRouter = express.Router();

lbRouter.post('/submit', authenticateToken, (req: Request, res: Response) => {
    res.status(200).send("Score successfully submitted");
})

lbRouter.use(errorHandler);

export { lbRouter }

