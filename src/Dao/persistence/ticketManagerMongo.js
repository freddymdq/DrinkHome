import cartModel from '../models/cart.model.js';
import ticketModel from '../models/ticket.model.js';
import userModel from '../models/user.model.js';
import { code } from '../../helpers/codeGenerator.js';
import { datetime } from '../../helpers/dateGenerator.js'
import  sendTicket  from '../../helpers/sendTicket.js';

export default class TicketManagerMongo {
    async purchaseCart (cartId) {
        const cart = await cartModel
            .findById(cartId)
            .populate('products.product');
            let totalAmount = 0;
            const productsToRemove = [];
            for (const productInCart of cart.products) {
                const product = productInCart.product;
                if (productInCart.quantity <= product.stock) {
                product.stock -= productInCart.quantity;
                    await product.save();
                totalAmount += product.price * productInCart.quantity;
                productsToRemove.push(productInCart);
            };
            };
        const codeGenerator = await code();
        const dateGenerator  = await datetime();
        const user = await userModel.findOne({ cart: cartId });
        const purchaserEmail = user.email;
        const ticketData = {
          code: codeGenerator,
          purchase_dateTime: dateGenerator,
          amount: totalAmount,
          purchaser: purchaserEmail,
        };
        const ticket = await ticketModel.create(ticketData);
        cart.products = productsStock;
        await cart.save();
        // envio de ticket al mail
        await sendTicket(purchaserEmail, ticket);
        for (const productToRemove of productsToRemove) {
            cart.products = cart.products.filter(
              (productInCart) => productInCart._id.toString() !== productToRemove._id.toString()
            );
          };
          await cart.save();
          return ticketData;
      }}

