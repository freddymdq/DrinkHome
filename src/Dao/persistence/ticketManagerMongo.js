import cartModel from "../models/cart.model.js";
import ticketModel from "../models/ticket.model.js";
import userModel from "../models/user.model.js";
import { code, date } from "../../utils.js";

export default class TicketManagerMongo {
  async purchaseCart(cartId) {
    const cart = await cartModel.findById(cartId).populate("products.product");
    let totalAmount = 0;
    const productsWithStock = [];
    const user = await userModel.findOne({ cart: cartId });

    for (const productInCart of cart.products) {
      const product = productInCart.product;
      const availableStock = product.stock;

      if (productInCart.quantity <= availableStock) {
        product.stock -= productInCart.quantity;
        totalAmount += product.price * productInCart.quantity;
      } else {
        totalAmount += product.price * availableStock;
        productsWithStock.push({
          product: product._id,
          quantity: availableStock,
        });
      }

      await product.save();
    }

    const genDate = await date();
    const genCode = await code();

    const dataTicket = {
      code: genCode,
      purchase_dateTime: genDate,
      amount: totalAmount,
      purchaser: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    };

    const ticket = new ticketModel(dataTicket);
    await ticket.save();

    cart.products = productsWithStock;
    await cart.save();

    return ticket;
  }
}
