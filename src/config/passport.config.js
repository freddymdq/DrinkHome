import passport from 'passport';
import local from 'passport-local';
import userModel from '../Dao/models/user.model.js';
import { createHash, validatePassword } from '../utils.js';

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    'register',
    new LocalStrategy(
      { passReqToCallback: true, usernameField: 'email' },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
          const user = await userModel.findOne({ email: username });
          if (user) {
            console.log('El usuario existe');
            return done(null, false);
          }
          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            role: 'usuario'
          };

          const result = await userModel.create(newUser);
          return done(null, result);
        } catch (error) {
          return done("Error al registrar el usuario: " + error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);
    done(null, user);
  });

  passport.use(
    'login',
    new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
      try {
        if (username === 'admin@admin.com' && password === 'admin') {
          const adminUser = {
            first_name: 'Admin',
            last_name: 'Admin',
            email: username,
            age: 0,
            role: 'admin'
          };
          return done(null, adminUser);
        }

        const user = await userModel.findOne({ email: username });
        if (!user) {
          console.log('No existe el usuario');
          return done(null, false);
        }

        if (!validatePassword(password, user)) return done(null, false);
        return done(null, user);
      } catch (error) {
        return done("Error al intentar ingresar: " + error);
      }
    })
  );
};

export default initializePassport;
