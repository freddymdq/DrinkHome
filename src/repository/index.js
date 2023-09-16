import { UserRepository }  from "./user.repository.js"
import { daoUsers } from "../Dao/factory.js";

export const userService = new UserRepository(daoUsers);