import { SCHEMA_FIELD_TYPE } from "redis";
import mongoose from 'mongoose';


// export const userSchema = {
//     '$.username': {
//         type: SCHEMA_FIELD_TYPE.TEXT,
//         SORTABLE: true,
//         AS: 'username'
//     },
//     '.password': {
//         type: SCHEMA_FIELD_TYPE.TEXT,
//         AS: 'password'
//     }
// }

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: String
});

export const userModel = mongoose.model("users", userSchema);