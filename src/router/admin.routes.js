import { Router } from "express";
import AdminControllers from "../controllers/admin.controllers.js";


const router = Router();
const adminControllers = new AdminControllers; 

router.post('/admin/db-user/:userId', adminControllers.deleteUserById);
router.post('/admin/addproduct',  adminControllers.addProduct);

export default router;

