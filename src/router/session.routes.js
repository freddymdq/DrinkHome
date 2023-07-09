import { Router } from 'express';
import passport from 'passport';
import SessionController from '../controllers/session.controllers.js';

const sessionControllers = new SessionController();
const router = Router();

router.post('/register', passport.authenticate('register', { failureRedirect: '/failregister' }), sessionControllers.register);
router.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), sessionControllers.login);
router.get('/faillogin', sessionControllers.faillogin);
router.get('/logout', sessionControllers.logout);
router.post('/restartPassword', sessionControllers.restartPassword);

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get(
  '/githubcallback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);

export default router;