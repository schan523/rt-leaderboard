// import client from "../loaders/redis.js";
// import { userSchema } from '../models/user.ts';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import db from '../loaders/mongoose.js';
import { userModel} from '../models/user.js';

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
        let user = await userModel.findOne({ username }).select('-_id -__v');
        let userData: {username: string, password: string, jwt?: string} = { ...user};

        if (!user || !user.password) {
            return;
        }

        const hashedPassword = user.password;
        const check = await bcrypt.compare(password, hashedPassword);

        if (!check) {
            return;
        }

        userData.jwt = jwt.sign({ username }, process.env.TOKEN_SECRET, { expiresIn: '3600s' });
        console.log(userData.jwt);
        return userData;
    }
}