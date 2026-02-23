import 'dotenv/config';
import db from '../loaders/mongoose.js';
import { scoreModel } from '../models/score.js';
import { client } from '../loaders/redis.js';

export default class leaderboardService {
    static async submit(username: string, game:string, hours: string, minutes: string, seconds: string) {
        await db();
        // const [hours, minutes, seconds] = time.split(".");
        const score = new scoreModel({username: username, game: game, hours: parseInt(hours), minutes: parseInt(minutes), seconds: parseInt(seconds)});
        await score.save();

        const res1 = await client.zAdd();
    }
}