import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import { userRouter } from './routes/user';
import { lbRouter } from './routes/leaderboard';

const app = express();
const port = 3000;

app.set('trust proxy', 1);
app.use(cookieParser());

// sameSite: 'strict'
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true, 
        maxAge: 86400000
    }
}));

app.use(express.json());
app.use('/', userRouter);
app.use('/lb', lbRouter);

app.get('/', (req, res) => {
    res.send("Welcome to the startup page."); 
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


