import {options} from "../config/options.js";

const persistence = options.server.persistence;
let daoContact;

switch (persistence) {
    case "mongo":
        const {dbConect} = await import("../config/dbConnection.js")
            dbConect()
        const {UserManagerMongo} = await import("./persistence/userManagerMongo.js")
        daoContact = new UserManagerMongo()
        break;
    case "memory":
        break;
    case "sql":
        break;
};

export {daoContact}