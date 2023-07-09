import { options } from "./options.js";
import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        mongoose.connect(options.mongoDB.url);
        console.log("Database connected");
    } catch (error) {
        console.log(`Error al conectar database ${error}`);
    };
};
