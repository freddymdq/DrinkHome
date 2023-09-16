import { CreateUserDto } from "../Dao/dto/user.dto.js";

export class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async createUser(user) {
      const newUser= new CreateUserDto(user)
      const newCreateUser = await this.dao.createUser(newUser)
      return newCreateUser
  }

  async getUser(user) {
    const userDb = await this.dao.getUser(user)
    return userDb;
  }
  
  async addGitHub(user) {
      const newUser= new CreateUserDto(user);
      const newCreateUser = await this.dao.addGithub(newUser);
      return newCreateUser;
  }
}



