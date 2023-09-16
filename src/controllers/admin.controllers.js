import userModel from "../Dao/models/user.model.js";
import productModel from "../Dao/models/products.model.js";

export default class AdminControllers {
  async deleteUserById(req, res) {
    try {
      const userId = req.params.userId;
      const userToDelete = await userModel.findById(userId);

      if (!userToDelete) {
        return res.status(404).send({ error: 'Usuario no encontrado' });
      }
      if (userToDelete.role === 'admin') {
        return res.status(403).send({ error: 'No puedes eliminar a un administrador' });
      }
      const deletedUser = await userModel.findByIdAndDelete(userId);
      if (deletedUser) {
        req.logger.info("Usuario borrado por administrador");
        res.redirect('/admin/db-user');
      } else {
        return res.status(404).send({ error: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error(error); 
      res.status(500).send({ error: 'Error al eliminar el usuario de la base de datos' });
    }
  }
  async addProduct(req, res) {
    try {
      const { title, description, price, category, status, img, code, stock } = req.body;
      if (!title || !description || !price || !category || !status || !img || !code || !stock) {
        req.logger.warn("Faltan datos")
      }
      const productData = { title, description, price, category, status, img, code, stock };
      const result = await productModel.create(productData)
      res.redirect('/admin');
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Error al agregar el producto a la base de datos' });
    }
  }

}
