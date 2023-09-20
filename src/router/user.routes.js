import { Router } from "express";
import UserController from "../controllers/user.controllers.js";
import { adminAccess } from "../middleware/access.js";

const router = Router();
const userController = new UserController();

router.get("/", userController.getUsers)
router.get("/userId", userController.getUserById)
router.delete('/:userId', adminAccess, userController.deleteUserById);
router.put('/:userId', adminAccess, userController.updateUserRole)
router.delete("/:userId/notConnected", adminAccess, userController.removeUsers);


// ESTOS SON SOLO DEL FRONT
router.post("/:userId/delete", adminAccess, userController.deleteUserById);

// PROFE ESTE EN PARTICULALR ME DIO MUCHO DOLOR DE CABEZA TUVE QUE BORRAR TODO EL PROYECTO Y BAJAR LA ENTREGA PORQUE ME TIRABA ERRORES MUY RAROS.
// INCLUSO AUN FUNCIONANDO NO LOGRO ENTENDER PORQUE NO VUELVE A REDIRECCIONAR LA PAGINA DE INICIO
router.post("/:userId/change",adminAccess, userController.updateUserRole);
export default router; 