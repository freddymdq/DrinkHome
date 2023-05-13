import { Router } from "express";
import CartManagerMongo from "../Dao/controllers/CartManagerMongo.js";

const router = Router();

const CartManager = new CartManagerMongo();

// muestra el el cart el producto detallado
router.get('/cart/:id', CartManager.getCartDetails)
router.get('/', CartManager.getCarts);
router.get('/:id', CartManager.getCartById);
router.post('/', CartManager.addCart);
router.delete('/:id', CartManager.deleteCart);
router.post('/:cartId/product/:productId', CartManager.addProductInCart);
// router api/carts/delete/id cart/ products
router.delete("/delete/:id/products", CartManager.emptyCart);
// actualizar la cantidad 
router.patch("/carts/:cartId/products/:productId", CartManager.updateProductQuantityInCart);

export default router;
