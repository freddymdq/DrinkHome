import { options } from "./options.js";
import mongoose from "mongoose";
import { EError } from "../enums/EError.js"
import { ErrorCustom } from '../service/error/errorCustom.service.js';


export const connectDB = async()=>{
    try {
        mongoose.connect(options.mongoDB.url);
        console.log("Database connected");
    } catch (error) { ErrorCustom.createError({
        name: "Error DB",
        cause:generateDBError(options.mongoDB.url),
        message:"Error al intentar conectarse a la base de datos",
        errorCode: EError.DATABASE_ERROR
    });
}
};
