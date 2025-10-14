// import client from "../loaders/redis.js";
// import { userSchema } from '../models/user.ts';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

        const user = new userModel({username: username, password: password});
        await user.save();
        
        userData.jwt = jwt.sign({ username }, process.env.TOKEN_SECRET, { expiresIn: '3600s' });
        return userData;
    }
}