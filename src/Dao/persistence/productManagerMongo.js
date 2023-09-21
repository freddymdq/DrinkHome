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

  async updateProductById(prodId, updateData) {
    const { title, description, price, category, img, code, stock, owner } = updateData;
    if (!title || !description || !price || !category || !img || !code || !stock || !owner) {
      throw new Error("Faltan datos");
    }
    return await productModel.updateOne({ _id: prodId }, { $set: updateData });
  }
}

