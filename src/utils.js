import{fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';
import {Faker, en } from '@faker-js/faker'


// FAKER 
export const fakerCustom = new Faker ({
    locale: [en]
})

const { commerce, image, database, string} = fakerCustom;
export const genProduct = () => {

    return {
        _id: database.mongodbObjectId(),
        title: commerce.productName(),
        description: commerce.productDescription(),
        price: parseFloat(commerce.price()),
        code: string.alphanumeric(10),
        img: image.url(),
        stock: parseInt(string.numeric(2)),
    }
}

//FIN FAKER

export const date = async () =>{
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const infoDate = ` Hora: ${time} - Fecha: ${date}`;
    return infoDate;
};
export const code = async () =>{
    const code = uuidv4();
    return code;
};

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const validatePassword = (password, user) => bcrypt.compareSync(password, user.password);


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default __dirname