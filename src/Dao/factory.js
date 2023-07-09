import {options} from "../config/options.js";

const persistence = options.server.persistence;
let daoContact;

switch (persistence) {
    case "mongo":
        const {connectDB} = await import("../config/dbConnection.js")
            connectDB()
        const {UserManagerMongo} = await import("./persistence/userManagerMongo.js")
        daoContact = new UserManagerMongo()
        break;
    case "memory":
        break;
};

export {daoContact}