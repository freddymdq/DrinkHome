import AccesManager from "./AccesManager.js"
import cartModel from "../models/cart.model.js";
import productModel from "../models/products.model.js";

//const accesManager = new AccesManager();

export default class CartManagerMongo {
  // muestra los productos detallados en el carrito
  async getCartDetails(req, res) {
    try {
      const cartId = req.params.id;
      const cart = await cartModel
        .findById(cartId)
        .populate('products.product')
        .exec();

      if (!cart) {
        return res.status(404).json({ error: 'No se encontró el carrito' });
      }

      return res.json(cart);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al obtener los detalles del carrito.' });
    }
  }
// muestra todos los carts
async getCarts(req, res) {
  try {
// await accesManager.createRecord('TODOS LOS CARRITOS');
    const carts = await cartModel.find();
      res.status(200).send(carts);
    } catch (error) {
      res.status(400).send({
        status: "Error",
        msg: "No se pueden obtener los carritos"
    });
  }
}
// muestra cart por ID
async getCartById(req, res) {
  try {
// await accesManager.createRecord(`ID DEL CARRITO: ${req.params.id}`);
    const cart = await cartModel.findById(req.params.id);
      res.status(200).send(cart);
  } catch (error) {
    res.status(400).send({
    status: "Error",
    msg: "No se puede obtener el carrito"
  });
}
}
async addCart(req, res) {
// agrega carrito
  try {
// await accesManager.createRecord('CARRITO CREADO');
    const cart = await cartModel.create({products: []});
      res.status(200).send(cart);
    } catch (error) {
      res.status(400).send({
        status: "Error",
        msg: "No se puede crear el carrito"
        });
    }
}
// borra carrito
async deleteCart(req, res) {
    try {
      //  await accesManager.createRecord('CARRITO BORRADO');
        const cartId = req.params.id;
        const result = await cartModel.deleteOne({ _id: cartId });
        if (result.deletedCount === 0) {
          res.status(404).send({ error: 'Carrito no encontrado' });
        } else {
          res.status(200).send({ message: `Carrito con ID ${cartId} eliminado exitosamente` });
        }
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'No se puede eliminar el carrito' });
      }
  }
// agregar producto al carrito
  async addProductInCart(req, res) {
    try { 
        const cartId = req.params.cartId;
        const productId = req.params.productId;
        const quantity = req.body.quantity || 1;
        // busca producto por ID
        const product = await productModel.findById(productId);
        if (!product) {
          return res.status(404).send({
            status: "Error",
            msg: "Producto no encontrado"
          });
        }
        // busca carrito por ID
        const cart = await cartModel.findById(cartId);
        if (!cart) {
          return res.status(404).send({
            status: "Error",
            msg: "Carrito no encontrado"
          });
        }
        // verifica si el producto ya esta en el carrito
        const existingProduct = cart.products.find(
          (p) => p.product.toString() === productId
        );
        // si el producto ya está en el carrito, actualizar cantidad le suma 1 a la cantidad
        if (existingProduct) {
          existingProduct.quantity += quantity;
        // si el producto no está en el carrito, lo carga con 1 en quantity
        } else {
          cart.products.push({ product: productId, quantity: quantity });
        }
        // guarda el msj de lo agregado al log.txt
       // await accesManager.createRecord(`PRODUCTO CON ID: ${productId} FUE AGREGADO AL CART CON ID: ${cartId}`);
        // guarda el carrito en la base de datos con el producto agregado (cambios)
        await cart.save();
        res.status(200).send(cart);
      } catch (error) {
        res.status(400).send({
          status: "Error",
          msg: "No se puede agregar el producto al carrito"
        });
      }
}

// vaciar carrito
async emptyCart(req, res) {
    try {
      const cartId = req.params.id;
      const cart = await cartModel.findById(cartId);
      if (!cart) {
        return res.status(404).send({
          status: "Error",
          msg: "Carrito no encontrado"
        });
      }
      cart.products = [];
      await cart.save();
      res.status(200).send({
        status: "Success",
        msg: "Carrito vaciado exitosamente"
      });
    } catch (error) {
      res.status(400).send({
        status: "Error",
        msg: "No se puede vaciar el carrito"
      });
    }
  }

// actualiza la cantidad de unidades 
async updateProductQuantityInCart(req, res) {
  try {
    const cartId = req.params.cartId;
    const productId = req.params.productId;
    const quantity = req.body.quantity;

    // busca producto por ID
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).send({
        status: "Error",
        msg: "Producto no encontrado"
      });
    }

    // busca carrito por ID
    const cart = await cartModel.findById(cartId);
    if (!cart) {
      return res.status(404).send({
        status: "Error",
        msg: "Carrito no encontrado"
      });
    }

    // verifica si el producto ya está en el carrito
    const existingProduct = cart.products.find(p => p.product.toString() === productId);

    // si el producto no está en el carrito, devuelve un error
    if (!existingProduct) {
      return res.status(404).send({
        status: "Error",
        msg: "El producto no se encuentra en el carrito"
      });
    }

    // si la cantidad es cero, elimina el producto del carrito
    if (quantity === 0) {
      cart.products = cart.products.filter(p => p.product.toString() !== productId);
    } else {
      // actualiza la cantidad del producto en el carrito
      existingProduct.quantity = quantity;
    }

    // guarda el carrito en la base de datos con los cambios
    await cart.save();
    res.status(200).send(cart);
  } catch (error) {
    res.status(400).send({
      status: "Error",
      msg: "No se puede actualizar la cantidad del producto en el carrito"
    });
  }
}
}
