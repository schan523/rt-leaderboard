import client from "../loaders/redis.js";
import { userSchema } from '../models/user.ts';

export default class UserService {
    static async register(username: string, password: string) {
        try {
            await client.ft.create('idx:user', userSchema, {
                ON: 'JSON',
                PREFIX: 'user:'
            });
        } catch (e) {
            if (e.message === 'Index already exists') {
                console.log('Index already exists, skipped creation')
            }
            else {
                console.error(e);
                process.exit(1);
            }
        }

        // await client.json.set(`user:${i}`, '$', user);
        return { username, password };
    }
}