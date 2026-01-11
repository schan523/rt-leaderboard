// import client from "../loaders/redis.js";
// import { userSchema } from '../models/user.ts';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import db from '../loaders/mongoose.js';
import { userModel } from '../models/user.js';
import { CustomError } from './errorHandler.ts';

export default class UserService {
    static async register(username: string, password: string) {        
        await db();

        const saltRounds = 10;
        let userData = { 
            username: username, 
            password: password, 
            jwt: "" 
        };
        const hash = await bcrypt.hash(password, saltRounds);
        if (hash) {
            userData.password = hash;
        }

        const user = new userModel({username: username, password: hash});
        await user.save();
        
        userData.jwt = jwt.sign({ username }, process.env.TOKEN_SECRET, { expiresIn: '3600s' });
        return userData.jwt;
    }


    static async login(username: string, password: string) {
        await db();
        let user = await userModel.findOne({ username }).select('-__v');
        if (!user || !user.password) {
            return;
        }

        let userData: {username: string, password: string, id: string, access?: string, refresh?: string} = 
        {
             username: user.username, 
             password: user.password, 
             id: user._id.toString(), 
             jwt: null
        };
        const userId = userData.id;

        const hashedPassword = user.password;
        const check = await bcrypt.compare(password, hashedPassword);

        if (!check) {
            return;
        }

        userData.access = jwt.sign({ username }, process.env.TOKEN_SECRET, { expiresIn: '900s' });
        userData.refresh = jwt.sign({ userId }, process.env.TOKEN_SECRET, { expiresIn: '1d'});
        console.log(userData);
        return userData;
    }

    
    static refresh(token: string | undefined) {
        if (!token) {
            return;
        }

        try {
            let payload = jwt.verify(token, process.env.TOKEN_SECRET);
        } catch (err) {
            console.error(err);
        }

        const payload = jwt.verify(token, process.env.TOKEN_SECRET);

        return jwt.sign({ payload }, process.env.TOKEN_SECRET, { expiresIn: '3600s' });
    }
}