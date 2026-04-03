import 'dotenv/config';
import db from '../loaders/mongoose.js';
import { scoreModel } from '../models/score.js';
import { client } from '../loaders/redis.js';

export default class leaderboardService {
    static async submit(username: string, game:string, hours: string, minutes: string, seconds: string) {
        await db();
        const score = new scoreModel({username: username, game: game, hours: parseInt(hours), minutes: parseInt(minutes), seconds: parseInt(seconds)});
        await score.save();

        const scoreTime = parseInt(hours+minutes+seconds);
        const gameGroup: Record<string, string> = {
            "hollow-knight": "hk_times",
            "silksong": "silksong_times",
            "minecraft": "minecraft_times"
        }

        const res1 = await client.zAdd(gameGroup[game], {score: scoreTime, value: username});
        console.log("game name:", gameGroup[game], "time:", scoreTime);
    }


    static async displayBoard() {
        const board = await client.zRangeWithScores('hk_times', 0, -1);
        const board2 = await client.zRangeWithScores('silksong_times', 0, -1);
        const board3 = await client.zRangeWithScores('minecraft_times', 0, -1);
        const boards = {"Hollow Knight": [...board], "Silksong": [...board2], "Minecraft": [...board3]};
        return boards;
    }
}