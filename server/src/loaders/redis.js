import { createClient } from 'redis';
import 'dotenv/config';

const client = createClient({
    username: "default",
    password: process.env.DATABASE_PW,
    socket: {
        host: 'redis-12653.c245.us-east-1-3.ec2.cloud.redislabs.com',
        port: 12653
    }
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

export { client }


