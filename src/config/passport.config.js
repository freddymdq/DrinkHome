import passport from 'passport';
import local from 'passport-local';
import userModel from '../Dao/models/user.model.js';
import { createHash, validatePassword } from '../utils.js';
import GithubStrategy from 'passport-github2';

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
            console.log('El usuario ya existe');
            return done(null, false, { message: 'El usuario ya existe' });
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
          console.log('Usuario registrado exitosamente');
          return done(null, result, { message: 'Usuario registrado exitosamente' });
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
          console.log('Ingreso exitoso como administrador');
          return done(null, adminUser, { message: 'Ingreso exitoso como administrador' });
        }

        const user = await userModel.findOne({ email: username });
        if (!user) {
          console.log('Usuario no encontrado');
          return done(null, false, { message: 'Usuario no encontrado' });
        }

        if (!validatePassword(password, user)) {
          console.log('Contraseña incorrecta');
          return done(null, false, { message: 'Contraseña incorrecta' });
        }
        console.log('Ingreso exitoso');
        return done(null, user, { message: 'Ingreso exitoso' });
      } catch (error) {
        return done("Error al intentar ingresar: " + error);
      }
    })
  );

  passport.use('github', new GithubStrategy({
      clientID: 'Iv1.8d20b7aa9310a471',
      clientSecret: '0382d965480cd94282b99d1ccb6989e629fb616e',
      callbackURL: 'http://localhost:8080/api/session/githubcallback'

    }, async (accesToken, refreshToken, profile, done) => {
      try {
          
          console.log(profile); //vemos toda la info que viene del profile
          let user = await userModel.findOne({ email: profile._json.email })
          if (!user) {
              const email = profile._json.email == null ? profile._json.username : null;

              const newUser = {
                      first_name: profile._json.name,
                      last_name: '',
                      email: email,
                      age: 18,
                      password: '',
                      role: "usuario"
              }
              const result = await userModel.create(newUser);
              console.log('Usuario registrado exitosamente con GitHub');
              done(null, result, { message: 'Usuario registrado exitosamente con GitHub' });
          } else {
              // ya existe
              console.log('Inicio de sesión exitoso con GitHub');
              done(null, user, { message: 'Inicio de sesión exitoso con GitHub' });
          }

      } catch (error) {
          return done(null, error);
      }

  }))
};

export default initializePassport;
