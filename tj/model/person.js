import mongoose, { Schema } from "mongoose";

const person = new Schema({
  username: String,
  password: String,
  createdAt: { type: Date, default: Date.now }
});

export const Person = mongoose.model('Person', person);

