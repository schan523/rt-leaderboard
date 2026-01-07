import express, { Request, Response } from 'express';
import session from 'express-session';

import { userRouter } from './routes/user';
import { lbRouter } from './routes/leaderboard';

const app = express();
const port = 3000;

app.set('trust proxy', 1);

// sameSite: 'strict'
// consider adding a session store: connect-redis or mongodb
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        httpOnly: true,
        secure: false,
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


