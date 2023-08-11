import CartManagerMongo from "../Dao/persistence/cartManagerMongo.js"
import TicketManagerMongo from "../Dao/persistence/ticketManagerMongo.js";
import { EError } from "../enums/EError.js";
import { quantityErrorInfo } from "../service/errorInfo.js";
import { errorParams } from "../service/errorParams.js";
import { ErrorCustom } from '../service/error/errorCustom.service.js';



const cartManagerMongo = new CartManagerMongo()
const ticketManagerMongo = new TicketManagerMongo()

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
        if (!cart) {
          ErrorCustom.createError({
            name: "Cart get by id error",
            cause:errorParams(cartId),
            message:"Error para obtener carrito por el id.",
            errorCode: EError.INVALID_PARAM
        });
        }
        res.status(200).send({
          status: 'success',
          cart,
        });
      } catch (error) {
        console.error(error);
        res.status(500).send({
          status: 'Error',
          msg: 'Error al obtener el carrito por ID.',
        });
      }
    }
    

    // DETALLES DEL CART
    async getCartDetails (req, res) {
        try {
            const cartId = req.params.cid;
            ErrorCustom.createError({
              name: "Cart get by id error",
              cause:errorParams(cartId),
              message:"Error al obtener el carrito con ID",
              errorCode: EError.INVALID_PARAM
          });
            const cart = await cartManagerMongo.getCartDetails(cartId);
            res.status(200).send({
              status: 'success',
              cart,
            });
          } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Error al obtener los detalles del carrito.' });
          }
        };

    // AGREGA PRODUCTOS AL CARRITO
    async addProductInCart(req, res) {
      try {
        const cartId = req.params.cid
        const productId = req.params.pid;
        ErrorCustom.createError({
          name: "Get cart by id error",
          cause: errorParams(cartId),
          message:"Error obteniendo el carrito com id.",
          errorCode: EError.INVALID_PARAM
      });
      ErrorCustom.createError({
          name: "Get product by id error",
          cause: errorParams(productId),
          message:"Error obteniendo el uproducto con id",
          errorCode: EError.INVALID_PARAM
      });
       const result = await cartManagerMongo.addProductInCart(cartId, productId, /* quantity */);
       return res.status(200).send({ status: "success",result});
      } catch (error) {res.status(400).send({status: 'Error',msg: 'No se puede agregar el producto al carrito',});}
    };

    // VACIAR CARRITO
    async emptyCart (req, res) {
        try {
            const cartId = req.params.id;
            ErrorCustom.createError({
              name: "Get cart by id error",
              cause: errorParams(cartId),
              message:"Error obteniendo el carrito com id.",
              errorCode: EError.INVALID_PARAM
          });
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
            const quantity = req.body.quantity
            ErrorCustom.createError({
              name: "Get cart by id error",
              cause: errorParams(cartId),
              message:"Error obteniendo el carrito com id.",
              errorCode: EError.INVALID_PARAM
          });
          ErrorCustom.createError({
              name: "Get product by id error",
              cause: errorParams(productId),
              message:"Error obteniendo el uproducto con id",
              errorCode: EError.INVALID_PARAM
          });
          const quantityNumb = parseInt(quantity);
          if(Number.isNaN(quantityNumb)){
              ErrorCustom.createError({
                  name: "Qantity error",
                  cause:quantityErrorInfo(quantityNumb),
                  message:"Error al calcular la cantidad solicitada",
                  errorCode: EError.INVALID_JSON
              });
          };
            await cartManagerMongo.updateProductQuantityInCart(cartId, productId);
            res.send({ message: 'Cantidad del producto en el carrito actualizada'});
          } catch (error) { res.status(400).send({status: 'Error', msg: 'No se puede actualizar la cantidad del producto',});}
        };
    // AGREGA VARIOS PRODUCTOS AL CARRITO
    async addProductsToCart (req, res) {
        try {
            const cartId = req.params.id;
            const productId = req.params.productId;
            ErrorCustom.createError({
              name: "Get cart by id error",
              cause: errorParams(cartId),
              message:"Error obteniendo el carrito com id.",
              errorCode: EError.INVALID_PARAM
          });
            const result = await cartManagerMongo.addProductsToCart(cartId, productId);
            res.status(200).send({ status: 'success',result });
        } catch (error) {
            res.status(400).send({ status: 'error', message: 'No se pudieron agregar los productos' });
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