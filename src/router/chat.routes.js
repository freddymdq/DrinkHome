import express from "express";
import ChatController from "../controllers/chat.controllers.js";

const router = express.Router();
const chatController = new ChatController();

router.get("/", chatController.getAllMessages);

export default router;