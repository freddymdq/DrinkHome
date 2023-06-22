import { Router } from "express";
import viewsManagerMongo from "../Dao/persistence/viewsManagerMongo.js";
import userModel from "../Dao/models/user.model.js";

const router = Router();

const publicAccess = (req, res, next) => {
  if (req.session.user) return res.redirect('/');
  next();
};

const privateAccess = (req, res, next) => {
  if (!req.session.user) return res.redirect('/login');
  next();
};

const adminAccess = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return res.redirect('/login');
  }
  next();
};

// ADMIN
router.get('/admin', adminAccess, (req, res) => {
  res.render('admin', { user: req.session.user });
});
router.get('/admin/db-user', adminAccess, async (req, res) => {
  try {
    const users = await userModel.find().lean();
    res.render('dbuser', { users });
  } catch (error) {
    res.status(500).send({ error: 'Error al obtener los usuarios de la base de datos' });
  }
});
router.get('/admin/rendimientos', adminAccess, (req, res) => {
  res.render('rendimientos', { user: req.session.user });
});
router.get('/admin/agregar-productos', adminAccess, (req, res) => {
  res.render('addProducts', { user: req.session.user });
});

// HOME
router.get('/', privateAccess, async (req, res) => {
  await viewsManagerMongo.renderHome(req, res);
});

// ALL PRODUCT
router.get('/products', privateAccess, async (req, res) => {
  await viewsManagerMongo.renderProducts(req, res);
});

// 1 PRODUCT
router.get('/product/:id', privateAccess, async (req, res) => {
  await viewsManagerMongo.renderProduct(req, res);
});

// CART
router.get('/cart/:id', privateAccess, async (req, res) => {
  await viewsManagerMongo.renderCart(req, res);
});

// SESSION
router.get('/profile', privateAccess, (req, res) => {
  res.render('profile', {
    user: req.session.user,
    isAdmin: req.session.user.role === 'admin'
  });
});

router.get('/register', publicAccess, (req, res) => {
  res.render('register');
});

router.get('/login', publicAccess, (req, res) => {
  res.render('login');
});
router.get('/resetPassword', (req,res)=>{
  res.render('resetPassword');
})


export default router;
