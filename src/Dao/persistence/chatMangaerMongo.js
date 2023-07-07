import mgsModel from "../models/mgs.model.js";

export default class ChatManagerMongo {
    async getMessages() {
      const messages = await mgsModel.find();
      return messages;
    }
  }