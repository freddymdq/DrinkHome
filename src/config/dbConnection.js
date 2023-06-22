// AUN NO IMPLEMENTADO

import mongoose from "mongoose";
import {config} from "./config.js";

try {
    await mongoose.connect(config.mongoDB.url);
    console.log("Conected Success DataBase")
}catch (error){
    console.log("Error with connected at Database")
}

