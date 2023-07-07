// AUN NO IMPLEMENTADO

import mongoose from "mongoose";
import { options } from "./options.js";


export const dbConect = async () => {

    try {
        await mongoose.connect(options.mongoDB.url);
        console.log("Conected Success DataBase")
    }catch (error){
        console.log("Error with connected at Database")
    }
    
}
