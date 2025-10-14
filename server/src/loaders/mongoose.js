import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export default async () => {
    try {
        await mongoose.connect(process.env.ATLAS_URL, 
            {autoIndex: true});
    } catch (error) {
        console.error(error);
    }
}