import { ContactRepository } from "./user.repository.js"
import { daoContact } from "../Dao/factory.js";

export const contactService = new ContactRepository(daoContact);