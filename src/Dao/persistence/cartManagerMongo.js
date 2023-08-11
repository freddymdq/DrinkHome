import cartModel from "../models/cart.model.js";
import productModel from "../models/products.model.js";

export default class CartManagerMongo {
  
  // CREA CARRITO
  async createCart() {
    const cart = await cartModel.create({ products: [] });
    return cart;
  };

  // TODOS LSO CARRITOS
  async getCarts() {
    const cart = await cartModel.find();
    return cart;
  };
  // DETALLE CARRITO
  async getCartDetails(cartId) {
    const cart = await cartModel
      .findById(cartId)
      .populate('products.product');
    return cart;
  }

  // CARRITO POR ID
  async getCartById(cartId) {
    const cart = await cartModel.findById(cartId);
    return cart;
  }

  // AGREGAR PRODUCTO AL CARRITO
  async addProductInCart(cartId, productId, quantity) {
    const product = await productModel.findById(productId);
    if (!product) {
      return null;
    }
    const cart = await cartModel.findById(cartId);
    if (!cart) {
      return null;
    }
    const existingProduct = cart.products.find(p => p.product.toString() === productId);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: quantity || 1 });
    }
    await cart.save();
    return cart;
  }
  
  
  // VACIAR CARRITO
  async emptyCart(cartId) {
    const cart = await cartModel.findById(cartId);
    if (!cart) {
      return null;
    }
    cart.products = [];
    await cart.save();
    return cart;
  }
  // ACTUALIZAR CANTIDAD PRODUCTOS EN CARRITO
  async updateProductQuantityInCart(cartId, productId, quantity) {
    const product = await productModel.findById(productId);
    if (!product) {
      return null;
    }
    const cart = await cartModel.findById(cartId);
    if (!cart) {
      return null;
    }
    const existingProduct = cart.products.find(p => p.product.toString() === productId);
    if (!existingProduct) {
      return null;
    }
    if (quantity === 0) {
      cart.products = cart.products.filter(p => p.product.toString() !== productId);
    } else {
      existingProduct.quantity = quantity;
    }
    await cart.save();
    return cart;
  }

  //AGREGA VARIOS PRODUCTOS AL CARRITO
  async addProductsToCart (cartId, products) {
    const cart = await cartModel.findById(cartId);
    for (const product of products) {
        const alreadyInCart = cart.products.find(item => item.product.toString() === product.product);
        if (alreadyInCart) {
            alreadyInCart.quantity = product.quantity;
        } else {
            cart.products.push({
                product: product.product,
                quantity: product.quantity,
            });
        };
    };
    await cart.save();
};

  // BORRA EL CARRITO
  async delete(cartId) {
    const result = await cartModel.deleteOne(cartId);
    return result.deletedCount > 0;
}
}

