import db from "../loaders/redis.js";

export default class UserService {
    static async register(username: string, password: string) {
        return { username, password };
    }
}