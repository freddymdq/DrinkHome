import { code, date } from "../../utils.js";
import ticketModel from "../models/ticket.model.js";
import userModel from "../models/user.model.js";
import cartModel from "../models/cart.model.js";
import { transporter } from "../../config/gmail.js";

export default class TicketManagerMongo {
  async purchaseCart(cartId) {
    const cart = await cartModel.findById(cartId).populate("products.product");
    let totalAmount = 0;
    const productsStock = [];

    for (const productInCart of cart.products) {
      const { product, quantity } = productInCart;
      const availableQuantity = Math.min(quantity, product.stock);

      product.stock -= availableQuantity;
      await product.save();

      totalAmount += product.price * availableQuantity;

      if (availableQuantity < quantity) {
        productsStock.push({
          product: product._id,
          quantity: quantity - availableQuantity
        });
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
      purchaser: purchaserEmail
    };

    const ticket = await ticketModel.create(ticketData);

    cart.products = productsStock;
    await cart.save();

    // Send ticket email to the purchaser
    await sendTicketByEmail(purchaserEmail, ticket);

    return ticket;
  }
}

async function sendTicketByEmail(recipient, ticket) {
  const emailTemplate = `<div>
    <h1>Tu ticket de compra</h1>
    <p>Código: ${ticket.code}</p>
    <p>Fecha de compra: ${ticket.purchase_dateTime}</p>
    <p>Monto: ${ticket.amount}</p>
  </div>`;

  await transporter.sendMail({
    from: "DRINK HOME",
    to: recipient,
    subject: "Tu ticket de compra",
    html: emailTemplate,
  });
}

