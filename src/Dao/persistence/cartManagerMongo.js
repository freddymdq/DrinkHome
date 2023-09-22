import cartModel from "../models/cart.model.js";
import productModel from "../models/products.model.js";

export default class CartManagerMongo {
  async createCart() {
    return await cartModel.create({ products: [] });
  }

  async getCarts() {
    return await cartModel.find();
  }

  async getCartDetails(cartId) {
    return await cartModel
      .findById(cartId)
      .populate('products.product');
  }

  async getCartById(cartId) {
    return await cartModel.findById(cartId);
  }

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

  async emptyCart(cartId) {
    const cart = await cartModel.findById(cartId);
    console.log(cart)
    if (!cart) return null;
    cart.products = [];
    await cart.save();
    return cart;
  }

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
  async delete(cartId) {
    const result = await cartModel.deleteOne({ _id: cartId });
    return result.deletedCount > 0;
  }}


