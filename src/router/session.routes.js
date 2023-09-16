import passport from 'passport';
import { Router } from 'express';
import UserControllers from '../controllers/user.controllers.js';


const router = Router();
const userControllers = new UserControllers();

router.post('/register', passport.authenticate('register', { failureRedirect: '/failregister' }), userControllers.register);
router.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), userControllers.login);
router.get('/faillogin', userControllers.faillogin);
router.get('/logout', userControllers.logout);
router.post('/restartPassword', userControllers.restartPassword);


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