import { Router } from "express";
import UserController from "../controllers/user.controllers.js";
import { adminAccess } from "../middleware/access.js";

const router = Router();
const userController = new UserController();

router.get("/", userController.getUsers)
router.get('/:userId', userController.getUserById)
router.delete('/:userId', adminAccess, userController.deleteUserById);
router.put('/:userId', adminAccess, userController.updateUserRole)
router.delete("/:userId/notConnected", adminAccess, userController.removeUsers);
router.post("/:userId/delete", adminAccess, userController.deleteUserById);
router.post("/:userId/change",adminAccess, userController.updateUserRole);
export default router; 