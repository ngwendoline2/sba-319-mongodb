import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Global configuration
const mongoURI = process.env.MONGO_URI;
console.log(mongoURI);
const db = mongoose.connection;

// Connect to Mongo
mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});

export default db;