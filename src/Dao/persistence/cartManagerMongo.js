import cartModel from "../models/cart.model.js";
import productModel from "../models/products.model.js";
import userModel from "../models/user.model.js";
import ticketModel from "../models/ticket.model.js";


export default class CartManagerMongo {
  // CREA CARRITO
  async createCart() {
    return await cartModel.create({ products: [] });
  }

  // TODOS LOS CARRITOS
  async getCarts() {
    return await cartModel.find();
  }

  // DETALLE CARRITO
  async getCartDetails(cartId) {
    return await cartModel
      .findById(cartId)
      .populate('products.product');
  }

  // CARRITO POR ID
  async getCartById(cartId) {
    return await cartModel.findById(cartId);
  }

  // AGREGAR PRODUCTO AL CARRITO
  async addProductInCart(cartId, productId, quantity = 1) {
    const product = await productModel.findById(productId);
    if (!product) return null;

    const cart = await cartModel.findById(cartId);
    if (!cart) return null;

    const existingProduct = cart.products.find(p => p.product.toString() === productId);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }
    await cart.save();
    return cart;
  }

  // VACIAR CARRITO
  async emptyCart(cartId) {
    const cart = await cartModel.findById(cartId);
    if (!cart) return null;

    cart.products = [];
    await cart.save();
    return cart;
  }

  // ACTUALIZAR CANTIDAD PRODUCTOS EN CARRITO
  async updateProductQuantityInCart(cartId, productId, quantity) {
    const product = await productModel.findById(productId);
    if (!product) return null;

    const cart = await cartModel.findById(cartId);
    if (!cart) return null;

    const existingProduct = cart.products.find(p => p.product.toString() === productId);
    if (!existingProduct) return null;

    if (quantity === 0) {
      cart.products = cart.products.filter(p => p.product.toString() !== productId);
    } else {
      existingProduct.quantity = quantity;
    }
    await cart.save();
    return cart;
  }

  // AGREGAR VARIOS PRODUCTOS AL CARRITO
  async addProductsToCart(cartId, products) {
    const cart = await cartModel.findById(cartId);
    for (const { product, quantity } of products) {
      const existingProduct = cart.products.find(item => item.product.toString() === product);
      if (existingProduct) {
        existingProduct.quantity = quantity;
      } else {
        cart.products.push({ product, quantity });
      }
    }
    await cart.save();
  }

  // BORRA EL CARRITO
  async delete(cartId) {
    const result = await cartModel.deleteOne({ _id: cartId });
    return result.deletedCount > 0;
  }
  
  async purchaseCart(cartId) {
      const cart = await cartModel.findById(cartId).populate("products.product");
        let totalAmount = 0;
      const productsStock = [];
        for (const { product, quantity } of cart.products) {
          const availableQuantity = Math.min(quantity, product.stock);
            product.stock -= availableQuantity;
              await product.save();
              totalAmount += product.price * availableQuantity;
        if (availableQuantity < quantity) {
          productsStock.push({
            product: product._id,
            quantity: quantity - availableQuantity,
          });
        }
    

      const generateCode = await code();
      const generateDate = await date();
      const user = await userModel.findOne({ cart: cartId });
      const purchaserEmail = user.email;

      const ticketData = {
        code: generateCode,
        purchase_dateTime: generateDate,
        amount: totalAmount,
        purchaser: purchaserEmail,
      };
      
      const ticket = await ticketModel.create(ticketData);
      cart.products = productsStock;
      await cart.save();
      // envio de ticket al mail
      await sendTicket(purchaserEmail, ticket);
      return ticket;
    }}
  }


