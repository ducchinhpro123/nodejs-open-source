import mongoose from 'mongoose';

function connectToMongoDB() {
  mongoose.connect("mongodb://localhost:27017/test").then(() => console.log("MongoDB connected"));
};

export default connectToMongoDB;
