import { Router } from "express";
import CartController from "../controllers/cart.controllers.js";

const router = Router();
const cartController = new CartController();

router.post('/', cartController.createCart);
router.get('/', cartController.getCarts);
router.get('/:cid', cartController.getCartById);
router.get('/:cid/detail', cartController.getCartDetails);
router.post('/:cid/products/:pid', cartController.addProductsToCart);
router.post('/:cid/product/:pid', cartController.addProductInCart);
router.put('/:cid/uprod/:pid', cartController.updateProductQuantityInCart);
router.delete('/empty/:cid', cartController.emptyCart);
router.delete('/:cid', cartController.delete);
router.post('/:cid/purchase', cartController.purchaseCart);

export default router;