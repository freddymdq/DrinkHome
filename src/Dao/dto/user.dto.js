
export class CreateUserDto{
  constructor(user){
      this.first_name = user.first_name;
      this.last_name = user.last_name;
      this.age = user.age;
      this.email = user.email;
      this.password = user.password;
      this.role = user.role;
  
  };
};

export class GetUserDto{
  constructor(userDb){
      this.full_name = userDb.first_name + " " + userDb.last_name;
      this.email = userDb.email
      this.age = userDb.age
      this.role = userDb.role

  };
};

