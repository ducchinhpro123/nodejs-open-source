import mongoose from 'mongoose';

function connectToMongoDB() {
        mongoose.connect("mongodb+srv://chinh99562:BCmCSjoYeI0CdHng@cluster0.irlpk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
                .then(() => console.log("MongoDB connected"));
};

export default connectToMongoDB;
