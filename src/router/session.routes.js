import { Router } from "express";
import userModel from "../Dao/models/user.model.js";

const router = Router()

router.post('/register', async (req, res) => {
    const {first_name, last_name, email, age, password} = req.body
    const exist = await userModel.findOne({email})
        if(exist){
            return res.status(400).send({status: 'error', error: "El usuario ya existe"})
        }

    const user ={
        first_name, 
        last_name, 
        email, 
        age, 
        password
    }
    
    const result = await userModel.create(user)
    res.send({status: 'Succes', error: "El usuario se a registrado"})
})


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
  
    if (!user) {
      return res.status(400).send({ status: 'error', error: "Datos incorrectos" });
    }
  
    let role = 'Usuario'; 
  
    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
      role = 'Admin'; 
    }
  
    req.session.user = {
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      age: user.age,
      role: role, 
    };
  
    res.send({ status: 'Success', payload: req.session.user, message: "Primer logueo" });
  });
  

router.get('/logout', (req, res)=>{
    req.session.destroy(err => {
        if(err)return res.status(400).send({status: 'error', error: 'No se puede desloguear'})
        res.redirect('/login')
    })
})

export default router