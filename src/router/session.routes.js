import { Router } from 'express';
import passport from 'passport';
import userModel from '../Dao/models/user.model.js';
import { createHash, validatePassword } from '../utils.js';


const router = Router();

router.post('/register', passport.authenticate('register', { failureRedirect:'/failregister'} ),async (req, res) =>{

    res.send({status:"succes", message:"User registered"});
})
router.get('/failregister', async (req,res)=>{
    console.log('Fallo en el registro');
    res.send({error: 'Error en el registro'})
})
// LOGIN
router.post('/login', (req, res, next) => {
  passport.authenticate('login', (err, user, info) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ status: 'error', error: 'Error en el servidor' });
    }
    if (!user) {
      // Las credenciales son inválidas
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
        role: user.role
      };

      if (user.role === 'admin') {
        return res.redirect('/admin');
      } else {
        return res.send({ status: 'success', payload: user, message: 'Primer logueo!!' });
      }
    });
  })(req, res, next);
});

router.get('/faillogin', async (req, res) => {
  console.log('Fallo en el ingreso');
  res.send({ error: 'Error en el ingreso' });
});


// CERRAR SESION
router.get('/logout', (req,res)=>{
    req.session.destroy(err =>{
        if(err) return res.status(500).send({status:"error", error:"No pudo cerrar sesion"})
        res.redirect('/login');
    })
})

// RESTABLECER CONTRASEÑA
router.post('/restartPassword', async (req, res)=>{
    const {email, password } = req.body;
    
    if(!email || !password ) return res.status(400).send({status:"error", error:"Datos incorrectos"})

    const user = await userModel.findOne({email});
    if(!user) return res.status(400).send({status:"error", error:"Datos incorrectos"})
    
    const newHashedPassword = createHash(password);

    await userModel.updateOne({_id:user._id},{$set:{password:newHashedPassword}});

    res.send({status:"success", message:"Contraseña actualizada"})
})

// GIT HUB
router.get('/github', passport.authenticate('github', {scope:['user:email']}), async (req,res)=>{})

router.get('/githubcallback', passport.authenticate('github',{failureRedirect:'/login'}), async (req,res)=>{

  req.session.user = req.user;
  res.redirect('/')

})
export default router;