import passport from 'passport';
import local from 'passport-local';
import GithubStrategy from 'passport-github2';
import { validatePassword  } from '../helpers/hashAndValidate.js';
import { ErrorCustom } from '../service/error/errorCustom.service.js';
import { EError } from '../enums/EError.js';
import cartModel from '../Dao/models/cart.model.js';
import UserManagerMongo from '../Dao/persistence/userManagerMongo.js';
import { userErrorInfo } from '../service/errorInfo.js';

const LocalStrategy = local.Strategy;
const userManager = new UserManagerMongo()

const initializePassport = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await userManager.findUserById(id);
    done(null, user);
  });

  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age, role } = req.body;
        if (!first_name || !last_name || !email) {
          ErrorCustom.createError({
            name: "Error",
            cause: "Faltan datos",
            message: userErrorInfo(req.body),
            errorCode: EError.INVALID_JSON,
          });
        }
        try {
          const newUser = await userManager.register(
            first_name,
            last_name,
            email,
            age,
            role,
            password,
            username
          );
          if (!newUser) {
            const errorMessage = "El usuario ya existe en la base de datos";
            return done(null, false, errorMessage);
          }
          return done(null, newUser);
        } catch (error) {
          return done("Error al registrar el usuario: " + error);
        }
      }
    )
  );
  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await userManager.login(username);
          if (!user) {
            console.log("No existe el usuario");
            return done(null, false);
          }
          if (!validatePassword(password, user)) return done(null, false);
          user.last_connected = new Date();
          await user.save();
          return done(null, user);
        } catch (error) {
          return done("Error al intentar ingresar: " + error);
        }
      }
    )
  );


  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: 'Iv1.2196bd64a6227d75',
        clientSecret: '5153430f81a1cc24766b2b6ee9214cab2239e6b1',
        callbackURL: 'http://localhost:8080/api/session/githubcallback',
        scope: ["user:email"],
      },
      async (accesToken, refreshToken, profile, done) => {
        try {
          console.log(profile);
          const email = profile.emails[0].value;
          const user = await userManager.findUserByEmail(email);
          const newCart = await cartModel.create({});
          if (!user) {
            const newUser = {
              first_name: profile._json.name,
              last_name: "",
              email: email,
              age: 18,
              password: "",
              cart: newCart._id,
              last_connected: new Date(),
              
            };
            const result = await userManager.createUser(newUser);
            done(null, result);
          } else {
            done(null, user);
          }
        } catch (error) {
          return done(null, error);
        }
      }
    )
  );
};

export default initializePassport;

