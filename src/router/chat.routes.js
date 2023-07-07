import { Router } from "express";
import ChatController from "../controllers/chat.controllers.js";

const router = Router();
const chatController = new ChatController();

router.get('/chat', chatController.getAllMgs);

export default router;