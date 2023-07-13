export const userErrorInfo = (user) =>{
    return `
    Alguno de los campos para crear el usuario no es correcto
    Campos necesarios:
    first_name: Debe ser un campo string ${user.first_name}
    last_name: Debe ser un campo string${user.last_name}
    email: Debe ser un campo string${user.email}
    age: Debe ser un campo number ${user.age}
    `;
};

export const quantityErrorInfo = (quantity) =>{
    return `quantity: Debe ser un campo number${quantity}`;
};

export const productErrorInfo = (product) =>{
    return `
    Alguno de los campos para crear el producto no es correcto
    Campos necesarios:
    title: Debe ser un campo string ${product.title}
    description: Debe ser un campo string${product.description}
    price: Debe ser un campo number${product.price}
    category: Debe ser un campo string${product.category}
    img: Debe ser un campo string ${product.category}
    code: Debe ser un campo string${product.category}
    stock: Debe ser un campo number${product.category}
    `;
};