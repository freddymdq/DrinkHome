import userModel from "../models/user.model.js"
import { createHash } from '../../utils.js';

export class UserManagerMongo {
    constructor(){
        this.model = userModel;
    };
    // AGREGA USUARIO
    async addUser(first_name, last_name, age, email, password){
        if (!first_name || !last_name || !age || !email || !password ) {
            throw new Error(`Faltan datos`);
        };
        const newUser = {
            first_name,
            last_name,
            age,
            email,
            password:  createHash(password)
        };
        const result = await this.model.create(newUser);
        return result;
    };
    // AGREGA CON GITHUB
    async addUserGitHub(profile){
        const newUser = {
            first_name: profile._json.name,
            last_name: '',
            email: profile._json.email,
            age:18,
            password: '',
            role: 'usuario'
        };
        const result = await this.model.create(newUser);
        return result;
    };
    // POR EMAIL
    async findUserByEmail(username){
        const user = await this.model.findOne({email:username});
        return user;
    };
    // POR ID
    async findUserById(id){
        const user = await this.model.findById(id);
        return user;
    };
    // POR JSONEMAIL
    async findUserByJsonEmail(profile){
        const user = await this.model.findOne({email: profile._json.email});
        return user;
    };
};