import { Router } from "express";
import ViewsManager from "../Dao/controllers/ViewsManager.js";

const router = Router();

router.get('/', async (req, res) => {
  await ViewsManager.renderHome(req, res);
});

router.get('/products', async (req, res) => {
  await ViewsManager.renderProducts(req, res);
});

router.get('/product/:id', async (req, res) => {
  await ViewsManager.renderProduct(req, res);
});

router.get('/cart/:id', async (req, res) => {
  await ViewsManager.renderCart(req, res);
});

export default router;



// routes viejos con los metodos dentro los dejo por las dudas

/* router.get('/', async (req, res) => {
  const { page = 1, limit, query } = req.query;
  const opt = { page, limit: parseInt(limit) || 16, lean: true };
  opt.sort = { price: -1 };
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
  const { docs, } = await productModel.paginate(filter, opt);
  const products = docs;
  res.render('home', {
    title: "Drink Home",
    products,
   
  });
}); */
/* 
router.get('/products', async (req, res) => {
  try {
    let { page = 1, limit, query, sort, category } = req.query;
    const opt = { page, limit: parseInt(limit) || 3, lean: true };
    if (sort) {
      opt.sort = { [sort]: 1 };
    } else {
      opt.sort = { title: 1 };
    }
    const filter = {};
    if (query) {
      filter.$or = [
        { category: { $regex: new RegExp(query, 'i') } },
        { title: { $regex: new RegExp(query, 'i') } }
      ];
    }
    if (category) {
      filter.category = category;
    } else {
      filter.category = { $exists: true };
    }
    const { docs, hasPrevPage, hasNextPage, nextPage, prevPage, status, totalpage } = await productModel.paginate(filter, opt);
    const products = docs;
    const message = products.length === 0 ? 'No se encontraron productos' : '';
    const urlParams = { page, limit, query, sort, category }; // Almacena los parámetros de la URL
    res.render('prod', {
      title: "Drink Home",
      status,
      totalpage,
      products,
      hasPrevPage,
      hasNextPage,
      nextPage,
      prevPage,
      query,
      message,
      urlParams // Pasa los parámetros de la URL a la plantilla
    });
  } catch (error) {
    res.status(500).send({ error: 'Error al obtener los productos' });
  }
});
router.get('/product/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productModel
      .findById(productId)
      .lean();    
    if (!product) {
      return res.status(204).end();
    }
    res.render('product', { product });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error interno del servidor' });
  }
});
 */
// vista cart
/* router.get("/cart/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await cartModel
      .findById(id)
      .populate("products.product")
      .lean();
      // Filtrar solicitudes para favicon.ico 
      // TENGO que ignorar el favicon.ico que es mi icono de la web porque me tira error
      // DE TODAS FORMAS YA SAQUE EL ICONO PORQUE ME TIRABA OTRO ERROR IGUAL DEJO LA FUNCION PARA RECORDAR
      if (cart === 'favicon.ico') {
        return res.status(204).end();
      }
    // Suma los precios de los productos en el carrito
    const total = cart.products.reduce((acc, product) => {
      return acc + product.product.price * product.quantity;
    }, 0);
    res.render("cart", { title: "Carrito", cart, total });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}); */
