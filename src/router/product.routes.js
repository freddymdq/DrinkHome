import { Router } from "express";
import ProductController from "../controllers/product.controllers.js";

const router = Router();
const productController = new ProductController();

// AGREGA PRODUCTO
router.post('/', productController.addProduct);
// MUESTRA PRODUCTOS
router.get('/', productController.getProducts);
// PRODUCTO POR ID
router.get('/:pid', productController.getProductById);
// BORRA PRODUCTO POR ID
router.delete('/:pid', productController.deleteProductById);
// ACTUALIZA PRODUCTO ID
router.put('/:pid', productController.updateProductById);

export default router; 

