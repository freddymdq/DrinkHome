import {config} from "../config/config.js";

const persistence = config.server.persistence;
let daoContact;

switch (persistence) {
    case "mongo":
        const {connectDB} = await import("../config/dbConnection.js");
        connectDB();
        const {UserManagerMongo} = await import("./persistence/userManagerMongo.js")
        daoContact = new UserManagerMongo();
        break;
    case "memory":
        break;
    case "sql":
        break;
};

export {daoContact}