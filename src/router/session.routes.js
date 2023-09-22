import { Router } from 'express';
import passport from 'passport';
import UserControllers from '../controllers/user.controllers.js';

const router = Router();
const userControllers = new UserControllers();

router.post("/resetpassword", userControllers.restartPassword);
router.post('/register', passport.authenticate('register', { failureRedirect: '/failregister' }), userControllers.register);
router.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), userControllers.login);
router.get('/faillogin', userControllers.faillogin);
router.get('/logout', userControllers.logout);
router.get("/github", passport.authenticate("github"), async (req, res) => {});
router.get("/githubcallback",passport.authenticate("github", { failureRedirect: "/login" }),
  userControllers.githubCallback);

export default router;
