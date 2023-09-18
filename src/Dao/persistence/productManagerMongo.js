import productModel from "../models/products.model.js";

export default class ProductManagerMongo {
  async addProduct(productData) {
    const { title, description, price, category, status, img, code, stock } = productData;
    if (!title || !description || !price || !category || !status || !img || !code || !stock) {
      throw new Error("Faltan datos");
    }
    return await productModel.create(productData);
  }

  async getProducts() {
    return await productModel.find();
  }

  async getProductById(idProduct) {
    return await productModel.findById(idProduct);
  }

  async deleteProductById(idProduct) {
    await productModel.deleteOne({ _id: idProduct });
    return this.getProducts();
  }

  async productsFindLean() {
    return await productModel.find().lean();
  }

  async updateProductById(idProduct, updateData) {
    const { title, description, price, category, img, code, stock } = updateData;
    if (!title || !description || !price || !category || !img || !code || !stock) {
      throw new Error("Faltan datos");
    }
    return await productModel.updateOne({ _id: idProduct }, { $set: updateData });
  }
}


//export default class ProductManagerMongo {
 /*  constructor() {
    this.productModel = productModel;
  }

  async addProduct(productData) {
    try {
      const { title, description, price, category, status, img, code, stock } = productData;
      if (!title || !description || !price || !category || !status || !img || !code || !stock) {
        throw new Error("Faltan datos");
      }

      const newProduct = await productModel.create(productData);
      return newProduct;
    } catch (error) {
      throw new Error(`Error al agregar el producto: ${error.message}`);
    }
  }

  async getProducts() {
    try {
      const products = await productModel.find();
      return products;
    } catch (error) {
      throw new Error(`Error al obtener los productos: ${error.message}`);
    }
  }

  async getProductById(id) {
    try {
      const product = await productModel.findById(id);
      return product;
    } catch (error) {
      throw new Error(`Error al obtener el producto por ID: ${error.message}`);
    }
  }

  async deleteProductById(id) {
    try {
      await productModel.deleteOne({ _id: id });
      return true;
    } catch (error) {
      throw new Error(`Error al eliminar el producto por ID: ${error.message}`);
    }
  }

  async productsFindLean() {
    try {
      const products = await productModel.find().lean();
      return products;
    } catch (error) {
      throw new Error(`Error al obtener productos de forma optimizada: ${error.message}`);
    }
  }

  async updateProductById(id, updateData) {
    try {
      const { title, description, price, category, img, code, stock } = updateData;
      if (!title || !description || !price || !category || !img || !code || !stock) {
        throw new Error("Faltan datos");
      }

      const result = await productModel.updateOne({ _id: id }, { $set: updateData });
      return result;
    } catch (error) {
      throw new Error(`Error al actualizar el producto por ID: ${error.message}`);
    }
  }
}

 */


/* import productModel from "../models/products.model.js"

export default class ProductManagerMongo {

// AGREGA PRODUCTO
async addProduct(productData) {
  const { title, description, price, category, status, img, code, stock } = productData;
    if (!title || !description || !price || !category || !status || !img || !code || !stock) {
      throw new Error("Faltan datos");
    }
  const product = { title, description, price, category, status, img, code, stock };
  const result = await productModel.create(product);
    return result;
  }
// TODOS LOS PRODUCTOS
async getProducts(){
  const products = await productModel.find();
  return products;
};

// MUESTRA PRODUCTO POR ID
async getProductById(idProduct) {
  const product = await productModel.find({ _id: idProduct });
  return product;
};

// BORRA PRODUCTO POR ID
async deleteProductById(idProduct) {
  await productModel.deleteOne({ _id: idProduct });
  return this.getProducts();
};
//
async productsFindLean(){
  const products = await productModel.find().lean();
  return products;
};
//ACTUALIZA PRODUCTO
async updateProductById(idProduct, updateData){
  const { title, description, price, category, img, code, stock } = updateData;
  if (!title || !description || !price || !category || !img || !code || !stock) {
      throw new Error("Faltan datos");
    };
  const product = await productModel.updateOne({ _id: idProduct }, { $set: updateData });
  await product.save();
};

}
 */