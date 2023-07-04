import {CreateContactDto} from "../Dao/dto/contactDto.js"

export class ContactRepository{
    constructor(dao) {
        this.dao = dao;
    }
    async createContactGitHub(contact){
        const contactDto = new CreateContactDto(contact)
        const contactCreated = await this.dao.postGithub(contactDto)
        return contactCreated
    };
    async getContacts(){
        const contacts = await this.dao.get()
        return contacts;
    };
    async createContact(contact){
        const contactDto = new CreateContactDto(contact)
        const contactCreated = await this.dao.post(contactDto)
        return contactCreated;
    };
}