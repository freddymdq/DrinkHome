import userModel from '../Dao/models/user.model.js';
import { createHash } from '../helpers/hashAndValidate.js';
import  sendRemoveUs  from '../helpers/sendRemoveUs.js';
import  timeConnect  from '../helpers/timeConnect.js';
import UserMongoManager from '../Dao/persistence/userManagerMongo.js';

const userMongoManager = new UserMongoManager();

export default class UserController {
  async register(req, res) {
    try {
      res.status(200).json({ status: "success", payload: req.user });
      req.logger.info("Usuario registrado");
    } catch (error) {
      console.error(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  failregister(req, res) {
    req.logger.warn("Fallo de registro");
    res.status(400).json({ error: "Error en registro" });
  }

  async login(req, res) {
    if (!req.user) {
      return res.status(400).json({ status: "error", error: "Credenciales Incorrectas" });
    }

    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      age: req.user.age,
      role: req.user.role,
      id: req.user._id,
      cart: req.user.cart,
    };

    req.logger.info("Inicio de Session");
    res.json({ status: "success", payload: req.user });
  }

  async logout(req, res) {
    try {
      if (req.session.user) {
        const user = await userModel.findById(req.session.user.id || req.session.user._id);
        if (user) {
          user.last_connected = timeConnect(); 
          await user.save();
        }
      }
      req.session.destroy((err) => {
        if (err) {
          console.error(err);
        }
        res.redirect("/login");
        req.logger.info("Session Cerrada");
      });
    } catch (error) {
      console.error(error);
    }
  }

  faillogin(req, res) {
    res.status(401).json({ error: "Error de login" });
  }
  
  githubCallback(req, res) {
    req.session.user = req.user;
    req.logger.info("Usuario logueado usando GitHub")
    res.redirect("/")
  }

  async restartPassword(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ status: "error", error: "Datos incorrectos" });
    }
    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ status: "error", error: "Datos incorrectos" });
      }
      const passwordChange = createHash(password);
        await userModel.updateOne(
        { _id: user._id },{ $set: { password: passwordChange } }
        );
      res.json({ status: "success", message: "Contraseña actualizada" })
    } catch (error) {
      console.error(error);
        res.status(500).json({ error: "Error interno del servidor" })
    }
  }

  async removeUsers(req, res) {
    const removoTwoDays = timeConnect()
    twoDaysAgo.setDate(removoTwoDays.getDate() - 2)

    try {
      const users = await userModel.find({
        last_connected: { $lte: removoTwoDays }, 
      });

      if (users.length > 0) {
        users.forEach(async (o) => {
          const result = await sendRemoveUs(o.email);
          console.log(result);
        });
          const result = await userModel.deleteMany({
            last_connected: { $lte: twoDaysAgo }
        });
        res.status(200).json({ message: "success", users: result });
      } else {
        res.status(400).json({ message: "No hay usuarios inactivos para borrar" });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async deleteUserById(req, res) {
    try {
      const userId = req.params.userId;
      const userToDelete = await userModel.findById(userId);

      if (!userToDelete) {
        return res.status(404).send({ error: 'Usuario no encontrado' });
      }
      if (userToDelete.role === 'admin') {
        return res.status(403).send({ error: 'No puedes eliminar a un administrador' });
      }
      const deletedUser = await userModel.findByIdAndDelete(userId);
      if (deletedUser) {
        req.logger.info("Usuario borrado por administrador");
        res.redirect('/admin/db-user');
      } else {
        return res.status(404).send({ error: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error(error); 
      res.status(500).send({ error: 'Error al eliminar el usuario de la base de datos' });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await userModel.find().lean().exec();
      const db = users.map((o) => {
        return {
          first_name: o.first_name,
          last_name: o.last_name,
          email: o.email,
          age: o.age,
          role: o.role,
          last_connected: o.last_connected,
        };
      });
      res.json({ status: "success", payload: db });
    } catch (error) {
      console.log(error.message);
      res.json({status: "error", message: "Hubo un error al obtener los usuarios",
      });
    }
  }

  async getUserById(req, res) {
    try {
      const userId = req.params.userId;
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
      }
      res.json({ status: "success", payload: user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", message: "Error al obtener el usuario por ID" });
    }
  }

  async updateUserRole(req, res) {
    try {
      const userId = req.params.userId;
      const newRole = 'premium'; 
      const updatedUser = await userMongoManager.updateUserRole(userId, newRole);
      if (!updatedUser) {
        return res.json({ status: "error", message: "Hubo un error al cambiar el rol del usuario a premium" });
      }
      res.json({ status: "success", message: "Se actualizo correctamente el rol del usuario" });
    } catch (error) {
      console.error(error.message);
      res.json({ status: "error", message: "Hubo un error al cambiar el rol del usuario a premium" });
    }
  }
}
 

