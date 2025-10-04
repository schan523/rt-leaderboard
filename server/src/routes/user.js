import express, { request, Response } from 'express';

import { errorHandler } from '../middleware/errorHandler';

const userRouter = express.Router();

userRouter.post('/register', (req: Request, res: Response) => {

})


userRouter.use(errorHandler);

export { userRouter }