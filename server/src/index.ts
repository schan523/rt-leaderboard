import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';

import { userRouter } from './routes/user';
import { lbRouter } from './routes/leaderboard';

const app = express();
const port = 3000;

app.set('trust proxy', 1);
app.use(cookieParser());

app.use(express.json());
app.use('/', userRouter);
app.use('/lb', lbRouter);

app.get('/', (req, res) => {
    res.send("Welcome to the startup page."); 
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


