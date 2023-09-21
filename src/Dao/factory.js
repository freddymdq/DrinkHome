import {options} from "../config/options.js"

const persistence = options.server.persistence

let daoUsers;

switch (persistence) {
    case "mongo":
        const {connectDB} = await import("../config/dbConnection.js")
            connectDB()
        const {UserManagerMongo} = await import("./persistence/userManagerMongo.js")
        daoUsers = new UserManagerMongo()
        break;
    case "memory":
        break;
};

export { daoUsers }