
import { Router } from "express";
import UserController from "../controllers/user.controllers.js";

const router = Router();
const userController = new UserController();


router.get("/",  userController.getUsers);
router.put("/admin/editrole/:uid",  userController.changeRole);
/* router.delete("/inactivity",  userController.removeUsers); */
router.delete("/admin/:uid", userController.deleteUserById);

export default router;