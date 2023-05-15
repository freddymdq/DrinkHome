
import AccesManager from "./AccesManager.js"
import productModel from "../models/products.model.js"

const accesManager = new AccesManager();

export default class ProductManagerMongo {
  async getProducts(req, res) {
    try {
     // await accesManager.createRecord("MOSTRAR PRODUCTOS");
      const result = await productModel.find();
      res.status(200).send({ result });
    } catch (error) {
      res.status(400).send({
        status: "Error",
        msg: `No se pueden ver los productos`,
      });
    }
  }

  async getProductsById(req, res) {
    try {
      //await accesManager.createRecord("MOSTRAR PRODUCTO POR ID");
      const id = req.params.pid;
      const result = await productModel.find({ _id: id });
      res.status(200).send({ result });
    } catch (error) {
      res.status(400).send({
        status: "Error",
        msg: `El producto no existe`,
      });
    }
  }

  async addProduct(req, res) {
    try {
     // await accesManager.createRecord("PRODUCTO CREADO");
      const { title, description, price, category, status, img, code, stock } = req.body;
      if (!title || !description || !price || !category || !status || !img || !code || !stock) {
        return res.status(400).send({ error: "Faltan datos" });
      }
      const product = { title, description, price, category, status, img, code, stock };
      const result = await productModel.create(product);
      res.status(200).send({ result });
    } catch (error) {
      res.status(400).send({
        status: "Error",
        msg: error.message,
      });
    }
  }

  async deleteProduct(req, res) {
    try {
     // await accesManager.createRecord("PRODUCTO BORRADO");
      const id = req.params.id;
      const result = await productModel.deleteOne({ _id: id });
      res.status(200).send({ result });
    } catch (error) {
      res.status(400).send({
        status: "Error",
        msg: `El producto no se puede eliminar`,
      });
    }
  }

  async updateProduct(req, res) {
    try {
     // await accesManager.createRecord("ACTUALIZACION DEL PRODUCTO");
      const id = req.params.id;
      const updateProduct = req.body;
      const result = await productModel.updateOne({ _id: id }, { $set: updateProduct });
      res.status(200).send({ result });
    } catch (error) {
      res.status(400).send({
        status: "Error",
        msg: `El producto no se puede actualizar.`,
      });
    }
  }
}
