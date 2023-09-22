import { Router } from "express";
import UserController from "../controllers/user.controllers.js";
import { adminAccess } from "../middleware/access.js";

const router = Router();
const userController = new UserController();

router.get("/", userController.getUsers)
router.get('/:userId',adminAccess, userController.getUserById)
router.delete('/:userId', adminAccess, userController.deleteUserById);
router.put('/:userId', adminAccess, userController.updateUserRole)
router.delete("/:userId/notConnected", adminAccess, userController.removeUsers);

//ROTAS PARA MANEJAS LAS SOLICITUDES DESDE EL FRONT USUARIO ADMIN
router.post('/:userId/delete', userController.deleteUserById);
router.post("/:userId/change", userController.updateUserRole);
export default router; 