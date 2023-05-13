import { Router } from "express";
import AccesManager from "../Dao/controllers/AccesManager.js";
import productModel from "../Dao/models/products.model.js";
import cartModel from "../Dao/models/cart.model.js";

const router = Router();
//const accesManager = new AccesManager()


router.get('/products', async (req, res) => {
    const { page = 1, limit, query, sort } = req.query;
    const opt = { page, limit: parseInt(limit) || 3, lean: true };
    if (sort) {
      opt.sort = { [sort]: 1 };
    } else {
      opt.sort = { title: 1 };
    }
    // esto no lo vimos pero a mi me funciono asi el filtrado. de lo contrario tendria que aplicar agregate y paginate todo al mismo router.
    const filter = {};
    if (query) {
      filter.$or = [
        { category: { $regex: new RegExp(query, 'i') } },
        { title: { $regex: new RegExp(query, 'i') } }
      ];
    }
    else {
      filter.category = { $exists: true };
    }
    const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await productModel.paginate(filter, opt);
    const products = docs;
    const message = products.length === 0 ? 'No se encontraron productos' : '';
    res.render('home', {
        title: "Drink Home",
      products,
      hasPrevPage,
      hasNextPage,
      nextPage,
      prevPage,
      query,
      message
    });
  });

// vista cart
router.get('/:cartId', async (req, res) => {
  const cartId = req.params.cartId;
  // Filtrar solicitudes para favicon.ico 
  // esto si no lo pongo me da un error, creo que es por el icono de la page
  if (cartId === 'favicon.ico') {
    return res.status(204).end();
  }
  const cart = await cartModel.findById(cartId);
  const total = cart.items.reduce((acc, item) => {
    return acc + (item.product.price * item.quantity);
  }, 0);
  res.render('cart', { cart, total });
});

export default router;

