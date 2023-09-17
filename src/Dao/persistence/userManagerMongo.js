
import { createHash } from '../../helpers/hashAndValidate.js';
import userModel from "../models/user.model.js"
import cartModel from "../models/cart.model.js";


export default class UserMongoManager {
  constructor() {
    this.userModel = userModel;
  }

  async register(first_name, last_name, email, age, role, password, username) {
    try {
      const userInDb = await this.userModel.findOne({ email: username }).exec();
      if (userInDb) {
        console.log("El usuario ya exite");
        return false;
      }

      const newCart = await cartModel.create({});
      const newUser = {
        first_name,
        last_name,
        email,
        age,
        cart: newCart._id,
        role,
        password: createHash(password),
      };

      const result = await this.userModel.create(newUser);
      return result;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  
  async login(username) {
    try {
      const user = await this.userModel.findOne({ email: username }).exec();
      if (!user) {
        console.log("Es necesario registrarse");
        return false;
      }
      return user;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async findUserByEmail(email) {
    try {
      const user = await this.userModel.findOne({ email }).exec();
      if (!user) {
        console.log("No se encontro el Email");
        return false;
      }
      return user;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async findUserById(id) {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        console.log("No se encontro el ID");
        return false;
      }
      return user;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async createUser(user) {
    try {
      const result = await this.userModel.create(user);
      return result || false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async updateUserRole(userId, newRole) {
    try {
      const user = await this.userModel.findById(userId).exec();
  
      if (!user) {
        console.log("No se encontró el usuario");
        return false;
      }
      user.role = newRole;
  
      const updatedUser = await user.save();
      return updatedUser;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  
}