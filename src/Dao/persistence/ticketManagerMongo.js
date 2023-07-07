import { code, date } from "../../utils.js";
import ticketModel from "../models/ticket.model.js";
import userModel from "../models/user.model.js";
import cartModel from "../models/cart.model.js";

export default class TicketManagerMongo {
  async purchaseCart(cartId) {
    try {
      const cart = await cartModel.findById(cartId).populate("products.product");
      let totalAmount = 0;
      const productStock = [];
      for (const productInCart of cart.products) {
        const product = productInCart.product;
        if (productInCart.quantity <= product.stock) {
          product.stock -= productInCart.quantity;
          await product.save();
          totalAmount += product.price * productInCart.quantity;
        } else {
          totalAmount += product.price * product.stock;
          productStock.push(productInCart);
          product.stock -= productInCart.quantity;
          await product.save();
        }
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
      cart.products = productStock;
      await cart.save();
      return ticket;
    } catch (error) {
      throw new Error("No se puede efectuar la compra. Error: " + error.message);
    }
    
  }
}