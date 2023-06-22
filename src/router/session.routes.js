import { Router } from 'express';
import passport from 'passport';
import SessionController from "../controllers/session.controllers.js"

const sessioControllers = new SessionController()

const router = Router();

router.post('/register', passport.authenticate('register', { failureRedirect: '/failregister' }),sessioControllers.register);
router.post('/login', sessioControllers.login);
router.get('/faillogin', sessioControllers.faillogin);
router.get('/logout', sessioControllers.logout);
router.post('/restartPassword',sessioControllers.restartPassword);


// TUVE QUE DEJAR ESTO ASI PORQUE ME TIRA ERROR / SOLUCIONAR
router.get('/github', passport.authenticate('github', {scope:['user:email']}), async (req,res)=>{})

router.get('/githubcallback', passport.authenticate('github',{failureRedirect:'/login'}), async (req,res)=>{

  req.session.user = req.user;
  res.redirect('/')

})
export default router;