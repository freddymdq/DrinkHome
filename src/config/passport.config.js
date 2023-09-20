import passport from 'passport';
import local from 'passport-local';
import GitHubStrategy from 'passport-github2';
import { validatePassword  } from '../helpers/hashAndValidate.js';
import { ErrorCustom } from '../service/error/errorCustom.service.js';
import { EError } from '../enums/EError.js';
import { userErrorInfo } from '../service/errorInfo.js';
import cartModel from '../Dao/models/cart.model.js';
import UserManagerMongo from '../Dao/persistence/userManagerMongo.js';
import timeConnect from '../helpers/timeConnect.js';

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
            cause: "Complete los Campos",
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
            const message = "Ya estan registrados estos datos";
            return done(null, false, message);
          }
          return done(null, newUser);
        } catch (error) {
          return done("Error de registro");
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
            return done(null, false);
          }
          if (!validatePassword(password, user)) return done(null, false);
          user.last_connected = timeConnect();
          await user.save();
          return done(null, user);
        } catch (error) {
          return done("Login Error ");
        }
      }
    )
  );



  passport.use(
    "github", new GitHubStrategy(
      { clientID:'Iv1.2196bd64a6227d75',
        clientSecret: '5153430f81a1cc24766b2b6ee9214cab2239e6b1',
        callbackURL: 'http://localhost:8080/api/session/githubcallback',
        scope: ["user:email"]
      },
      async (accesToken, refreshToken, profile, done) => {
        try {
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
              last_connected: timeConnect(),
              
            };
            const userGithub = await userManager.createUser(newUser);
            done(null, userGithub);
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

