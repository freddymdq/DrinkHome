import { code, date } from "../../utils.js";
import ticketModel from "../models/ticket.model.js"
import userModel from "../models/user.model.js";
import cartModel from "../models/cart.model.js";

export default class TicketManagerMongo {
  async purchaseCart(cartId) {
    try {
      const cart = await cartModel.findById(cartId);
      if (!cart) {
        throw new Error("No se encontró el carrito");
      }

      const user = await userModel.findOne({ cart: cartId });
      if (!user) {
        throw new Error("No se encontró el usuario asociado al carrito");
      }

      const totalAmount = calculateTotalAmount(cart);

      const generateCode = await code();
      const generateDate = await date();

      const ticketData = {
        code: generateCode,
        purchase_dateTime: generateDate,
        amount: totalAmount,
        purchaser: user.email,
      };

      const ticket = await ticketModel.create(ticketData);

      return ticket;
    } catch (error) {
      throw new Error("No se puede efectuar la compra. Error: " + error.message);
    }
  }
}

function calculateTotalAmount(cart) {
  let totalAmount = 0;
  for (const product of cart.products) {
    totalAmount += product.price * product.quantity;
  }
  return totalAmount;
}