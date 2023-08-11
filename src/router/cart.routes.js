
import { Router } from "express";
import CartController from "../controllers/cart.controllers.js";
import TicketController from "../controllers/ticket.controllers.js";

const router = Router();
const cartController = new CartController();
const ticketController = new TicketController()

// CREA CARRITO
router.post('/', cartController.createCart);
// MUESTRA CARRITOS
router.get('/', cartController.getCarts);
// MUESTRA UN CARRITO ID
router.get('/:cid', cartController.getCartById);
// MUESTRA DETALLES DEL CARRITO
router.get('/:cid/detail', cartController.getCartDetails);
// AGREGA VARIOS PRODUCTOS AL CARRITO
router.put('/:cid/products/:pid', cartController.addProductsToCart);
// AGREGA 1 PRODUCTO AL CARRITO
router.post('/:cid/products/:pid', cartController.addProductInCart);
// AUMENTA LA CANTIDAD DE UNIDADES
router.put('/:cid/uprod/:pid', cartController.updateProductQuantityInCart);
// VACIA EL CARRITO
router.delete('/empty/:cid', cartController.emptyCart);
// BORRA EL CARRITO
router.delete('/:cid', cartController.delete);


// A REPARAR
// EMITIR ORDEN DE COMPRA
router.post('/:cid/purchase', ticketController.purchaseCart);

export default router;