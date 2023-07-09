import passport from 'passport';
import local from 'passport-local';
import userModel from '../Dao/models/user.model.js';
import { createHash, validatePassword } from '../utils.js';
import { contactService } from '../repository/index.js';
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
            role: 'user',
          };

          const result = await contactService.createContact(newUser);
          console.log('Usuario registrado exitosamente');
          return done(null, result, { message: 'Usuario registrado exitosamente' });
        } catch (error) {
          return done('Error al registrar el usuario: ' + error);
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
        return done('Error al intentar ingresar: ' + error);
      }
    })
  );

  passport.use(
    'github',
    new GithubStrategy(
      {
        clientID: 'Iv1.2196bd64a6227d75',
        clientSecret: '5153430f81a1cc24766b2b6ee9214cab2239e6b1',
        callbackURL: 'http://localhost:8080/api/session/githubcallback',
      },
      async (accesToken, refreshToken, profile, done) => {
        try {
          let user = await userModel.findOne({ email: profile._json.email });
          if (!user) {
            // si tiene mail lo encuentra y carga, sino concatena el usuario con el string
            const email = profile._json.email || `${profile._json.name.replace(/\s+/g, '')}@github.com`;
            const nameParts = profile._json.name.split(' ');
            const newUser = {
              first_name: nameParts[0],
              last_name: nameParts[1] || '',
              email: email,
              age: 18,
              password: '',
              role: 'user',
            };
            const result = await contactService.createContactGitHub(newUser);
            console.log('Usuario registrado exitosamente con GitHub');
            done(null, result, { message: 'Usuario registrado exitosamente con GitHub' });
          } else {
            // ya existe
            done(null, user, { message: 'Inicio de sesión exitoso con GitHub' });
          }
        } catch (error) {
          return done(null, error);
        }
      }
    )
  );
};

export default initializePassport;