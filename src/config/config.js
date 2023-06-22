import dotenv from "dotenv";
dotenv.config();


export const config = {
    mongoDB:{
        url:process.env.MONGO_URL
    },
    server:{
        port:process.env.PORT,
        secretSession: process.env.SECRET_SESSION
    }
};