import TicketManagerMongo from "../Dao/persistence/ticketManagerMongo.js";

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
    } catch (error) {
      res.status(400).send({
        status: "error",
        message: "No se puede efectuar la compra.",
      });
    }
  }
}