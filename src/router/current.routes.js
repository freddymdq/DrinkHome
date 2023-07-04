import { Router } from "express";
import cartController from "../controllers/cart.controllers"

const router = Router();

router.get('/', cartController.getCarts);

export default router;