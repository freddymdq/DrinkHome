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