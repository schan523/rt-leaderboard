import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const client = createClient({
    username: "default",
    password: process.env.DATABASE_PW,
    socket: {
        host: 'redis-18762.c261.us-east-1-4.ec2.redns.redis-cloud.com',
        port: 18762
    }
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

export { client }


