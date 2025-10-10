// import client from "../loaders/redis.js";
// import { userSchema } from '../models/user.ts';

import { db } from '../loaders/mongoose.js';

export default class UserService {
    static async register(username: string, password: string) {
        await db();
        // await client.json.set(`user:${i}`, '$', user);
        return { username, password };
    }
}