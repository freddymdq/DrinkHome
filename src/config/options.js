import dotenv from "dotenv";

dotenv.config();


export const options = {
    server:{
        port: process.env.PORT,
        secretSession: process.env.SECRET_SESSION,
        persistence: process.env.PERSISTENCE
    },
    mongo:{
        url: process.env.MONGO_URL
    },
    gmail:{
        adminAccount: process.env.ADMIN_EMAIL,
        adminPass: process.env.ADMIN_PASS,
    },
    nodeEnv: process.env.NODE_ENV,
};
