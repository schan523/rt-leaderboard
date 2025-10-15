import express, { Request, Response } from 'express';

import { userRouter } from './routes/user';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/', userRouter);

app.get('/', (req, res) => {
    res.send("Welcome to the startup page.");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


