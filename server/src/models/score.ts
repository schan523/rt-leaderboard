import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
    username: String,
    game: String,
    hours: Number, 
    minutes: Number,
    seconds: Number
});

export const scoreModel = mongoose.model("scores", scoreSchema);