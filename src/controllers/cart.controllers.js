import CartManagerMongo from "../Dao/persistence/cartManagerMongo.js"

const cartManagerMongo = new CartManagerMongo()

export default class CartController{
    // NUEVO CARRITO
    async createCart (req, res) {
        try{
            const result = await cartManagerMongo.createCart();
            res.status(200).send({
                status: "success",
                result
            });
        }catch (error) {
            res.status(400).send({
                status: "Error",
                msg: `El carrito solicitado no se puede crear.`
            });
        };
    };

    // MOSTRAR CARRITO
    async getCarts (req, res) {
        try {
            const result = await cartManagerMongo.getCarts();
            res.status(200).send({
                status: "success",
                result
            });
        }catch(error){
            res.status(400).send({
                status: "Error",
                msg: `El total de carritos no se puede visualizar.`
            });
        };
    };

    // POR ID
    async getCartById(req, res) {
      try {
        const cartId = req.params.cid;
        const cart = await cartManagerMongo.getCartById(cartId);
        res.send(cart);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error al obtener el carrito' });
      }
    }

    // DETALLES DEL CART
    async getCartDetails (req, res) {
        try {
            const cartId = req.params.cid;
            const cart = await cartManagerMongo.getCartDetails(cartId);
            res.send(cart);
          } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Error al obtener los detalles del carrito.' });
          }
        };

    // AGREGA PRODUCTOS AL CARRITO
    async addProductInCart(req, res) {
      try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const quantity = req.body.quantity; // Obtener la cantidad desde el cuerpo de la solicitud
        await cartManagerMongo.addProductInCart(cartId, productId, quantity);
        res.send({ message: 'Producto agregado al carrito correctamente' });
      } catch (error) {
        res.status(400).send({
          status: 'Error',
          msg: 'No se puede agregar el producto al carrito',
        });
      }
    };

    // VACIAR CARRITO
    async emptyCart (req, res) {
        try {
            const cartId = req.params.id;
            await cartManagerMongo.emptyCart(cartId);
            res.send({ message: 'Carrito vaciado correctamente' });
          } catch (error) {
            res.status(400).send({
              status: 'Error',
              msg: 'No se puede vaciar el carrito',
            });
          }
        };

    // ACTUALIZA CANTIDAD DE UNIDADES EN EL CARRITO
    async updateProductQuantityInCart (req, res) {
        try {
            const cartId = req.params.id;
            const productId = req.params.id;
            await cartManagerMongo.updateProductQuantityInCart(cartId, productId);
            res.send({ message: 'Cantidad del producto en el carrito actualizada'});
          } catch (error) {
            res.status(400).send({
              status: 'Error',
              msg: 'No se puede actualizar la cantidad del producto',
            });
          }
        };
        
    // AGREGA VARIOS PRODUCTOS AL CARRITO
    async addProductsToCart (req, res) {
        try {
            const cartId = req.params.id;
            const products = req.body;
            await cartManagerMongo.addProductsToCart(cartId, products);
            res.status(200).send({
                status: 'success',
                message: 'Productos agregados al carrito',
            });
        } catch (error) {
            res.status(400).send({
                status: 'error',
                message: 'No se pudieron agregar los productos',
            });
        }
    };
   

    // BORRA EL CARRITO
   async delete (req, res) {
    try {
      const cartId = req.params.id;
      const result = await cartManagerMongo.delete(cartId)
      res.send({ deletedCount: result });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'No se puede eliminar el carrito' });
    }
  };

}