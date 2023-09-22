import productModel from "../models/products.model.js";

export default class ProductManagerMongo {
  async addProduct(prodData) {
    const { title, description, price, category, status, img, code, stock, owner } =prodData;
    if (!title || !description || !price || !category || !status || !img || !code || !stock || !owner) {
      throw new Error("Se neitan todos los datos del producto");
    }
    const product = { title, description, category, status, price, img, code, stock, owner}
    const result = await productModel.create(product);
    return result;
  }

  async getProducts() {
    return await productModel.find();
  }

  async getProductById(prodId) {
    return await productModel.findById(prodId);
  }

  async deleteProductById(prodId) {
    await productModel.deleteOne({ _id: prodId });
    return this.getProducts();
  }

  async productsFindLean() {
    return await productModel.find().lean();
  }

  async updateProductById(prodId, prodData) {
    const { title, description, price, category, img, code, stock, owner } = prodData;
    if (!title || !description || !price || !category || !img || !code || !stock || !owner) {
      throw new Error("Faltan datos");
    }
    return await productModel.updateOne({ _id: prodId }, { $set: prodData });
  }
}

