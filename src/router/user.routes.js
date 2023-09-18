import { Router } from "express";
import UserController from "../controllers/user.controllers.js";
import { adminAccess } from "../middleware/access.js";
const router = Router();
const userController = new UserController();

// muestra usuario
router.get("/", userController.getUsers)
router.post("/")
// borra usuario
router.delete('/admin/:userId', adminAccess, userController.deleteUserById);
// cambia el roll de usuario
router.put('/:userId', adminAccess, userController.updateUserRole)
// cambia el rol de usuario desde el front
router.post("/:userId/change",adminAccess, userController.updateUserRole);
// borra un usuario por inactividad
router.delete("/:userId/notConnected", adminAccess, userController.removeUsers);
// borra usuario desde el Front
router.post("/:userId/delete", adminAccess, userController.deleteUserById);

export default router; 