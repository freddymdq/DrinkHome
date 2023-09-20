import dotenv from "dotenv";

dotenv.config();


export  const options = {
    server:{
        port: process.env.PORT,
        secretSession: process.env.SECRET_SESSION,
        persistence: process.env.PERSISTENCE
    },
    github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
    mongo:{
        url: process.env.MONGO_URL
    },
    gmail:{
        adminAccount: process.env.ADMIN_EMAIL,
        adminPass: process.env.ADMIN_PASS
    },
    nodeEnv: process.env.NODE_ENV,
};
