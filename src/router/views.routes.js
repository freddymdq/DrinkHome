import { Router } from "express";
import ViewsManager from "../Dao/controllers/ViewsManager.js";

const router = Router();

const publicAccess = (req, res, next) => {
  if(req.session.user) return res.redirect('/')
  next()
}
const privateAccess = (req, res, next) => {
  if(!req.session.user) return res.redirect('/login')
  next()
}

// HOME
router.get('/', privateAccess, async (req, res) => {
  await ViewsManager.renderHome(req, res);
});
// ALL PRODUCT
router.get('/products',  privateAccess, async (req, res) => {
  await ViewsManager.renderProducts(req, res);
});
// 1 PRODUCT
router.get('/product/:id',  privateAccess, async (req, res) => {
  await ViewsManager.renderProduct(req, res);
});
// CART
router.get('/cart/:id', privateAccess, async (req, res) => {
  await ViewsManager.renderCart(req, res);
});

// SESSION
router.get('/profile', privateAccess, (req, res) => {
  res.render('profile', {
    user: req.session.user
  });
});

router.get('/register', publicAccess, (req, res) => {
  res.render('register')
})

router.get('/login', publicAccess, (req, res) => {
  res.render('login')
})

export default router;