import ChatManagerMongo from "../Dao/persistence/chatMangaerMongo.js";

const chatManagerMongo = new ChatManagerMongo();

export default class ChatController {
  async getAllMessages(req, res) {
    try {
      const messages = await chatManagerMongo.getMessages();
      res.render("chat", { messages });
    } catch (error) {
      res.status(400).send({
        status: "Error",
        msg: "No se pueden ver los mensajes",
      });
    }
  }
}