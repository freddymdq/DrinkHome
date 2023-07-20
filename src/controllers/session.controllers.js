
import passport from 'passport';
import userModel from '../Dao/models/user.model.js';
import { sendGmail } from '../helpers/sendGmail.js';
import { createHash, validatePassword } from '../utils.js';



export default class SessionControllers {
    async register(req, res) {
      try {
        // Realizar el registro del usuario y obtener la dirección de correo electrónico
        const { first_name, last_name, email, age, password } = req.body;
        const newUser = {
          first_name,
          last_name,
          email,
          age,
          password,
          role: 'user',
        };

        // Enviar el correo electrónico al usuario registrado
        await sendGmail(newUser.email);
        // Responder con éxito
        res.status(200).json({ status: 'success', message: 'Usuario registrado exitosamente' });
      } catch (error) {
        req.logger.error(error);
        res.status(500).json({ message: error.message });
      }
    }

  login(req, res, next) {
    passport.authenticate('login', (err, user) => {
      if (err) {
        return res.status(500).send({ status: 'error', error: 'Error en el servidor' });
      }
      if (!user) {
        return res.status(400).send({ status: 'error', error: 'Credenciales inválidas' });
      }
      req.logIn(user, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send({ status: 'error', error: 'Error en el servidor' });
        }
  
        req.session.user = {
          first_name: user.first_name,
          last_name: user.last_name,
          age: user.age,
          email: user.email,
          cart: user.cart,
          role: user.role
        };
  
        if (user.role === 'admin') {
          return res.redirect('/admin');
        } else { 
          return res.send({ status: 'success', payload: user, message: 'Primer logueo!!' });
        }
      });
    })(req, res, next);
  }
  

  async faillogin(req, res) {
    console.log('Fallo en el ingreso');
    res.send({ error: 'Error en el ingreso' });
  }

  logout(req, res) {
    req.session.destroy((err) => {
      if (err) return res.status(500).send({ status: 'error', error: 'No pudo cerrar sesión' });
      res.redirect('/login');
    });
  }

  async restartPassword(req, res) {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send({ status: 'error', error: 'Datos incorrectos' });

    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).send({ status: 'error', error: 'Datos incorrectos' });

    const newHashedPassword = createHash(password);

    await userModel.updateOne({ _id: user._id }, { $set: { password: newHashedPassword } });

    res.send({ status: 'success', message: 'Contraseña actualizada' });
  }

  github(req, res, next) {
    passport.authenticate('github', { scope: ['user:email'] })(req, res, next);
  }

  githubCallback(req, res, next) {
    passport.authenticate('github', { failureRedirect: '/login' })(req, res, next);
  }
}

