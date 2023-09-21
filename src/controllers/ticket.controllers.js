/* import TicketManagerMongo from "../Dao/persistence/ticketManagerMongo.js";

const ticketManagerMongo = new TicketManagerMongo();

export default class TicketController {
  // Comprar carrito y generar ticket
  async purchaseCart(req, res) {
    try {
      const cartId = req.params.cid;
      const ticket = await ticketManagerMongo.purchaseCart(cartId);
      res.status(200).send({
        status: "success",
        ticket,
      });
    } 
      catch (error) {
        req.logger.error(error);
        res.status(500).json({ message: error.message });
      }
  }
} */