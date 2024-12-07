import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const uri = process.env.MONGODB_API;

export function connectMongoDB() {
        console.log("Waiting to connect to mongo database");
        mongoose.connect(uri)
                .then(() => console.log("Connected to the mongoose database"))
                .catch(err => console.log("Cannot connect to the database: ", err));
}
