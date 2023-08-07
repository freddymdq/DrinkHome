
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