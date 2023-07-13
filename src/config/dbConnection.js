import { options } from "./options.js";
import mongoose from "mongoose";
import { EError } from "../enums/EError.js"
import { errorDB } from "../service/errorDb.js";
import ErrorCustom from "../service/error/errorCustom.service.js";

const errorCustom = new ErrorCustom()

export const connectDB = async()=>{
    try {
        mongoose.connect(options.mongoDB.url);
        console.log("Database connected");
    } catch (error) {errorCustom.createError({
        name: "Error DB",
        cause:generateDBError(options.mongoDB.url),
        message:"Error al intentar conectarse a la base de datos",
        errorCode: EError.DATABASE_ERROR
    });
}
};
