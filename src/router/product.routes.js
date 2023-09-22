import { Router } from "express";
import ProductController from "../controllers/product.controllers.js";
import { adminAccess, premiumAccess } from "../middleware/access.js";

const router = Router();
const productController = new ProductController();


router.post('/', productController.addProduct);
router.get('/', productController.getProducts);
router.get('/:pid', productController.getProductById);
router.delete('/:pid', productController.deleteProductById);
router.put('/:pid', productController.updateProductById);


router.post('/agregar-productos', productController.addProduct);
// FAKER 
router.post('/mockingproducts', productController.genProduct);
export default router; 

