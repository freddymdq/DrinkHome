import ProductManagerMongo from "../Dao/persistence/ProductManagerMongo.js";
import {PRODUCT_MANAGER_ERRORS} from '../service/error.message.js'
import {genProduct} from '../utils.js'
const productManagerMongo = new ProductManagerMongo();

export default class ProductController{
    // MUESTRA PRODUCTOS
    async getProducts (req, res){
        try {
            const products = await productManagerMongo.getProducts();
            res.status(200).send({ products });
          } catch (error) { 
            throw new Error(PRODUCT_MANAGER_ERRORS.NO_PRODUCTO.ERROR_CODE)
          }
        };
    
    // PRODUCTOS POR ID
    async getProductById (req, res){
        try {
            const productId = req.params.id;
            const product = await productManagerMongo.getProductById(productId);
            res.status(200).send({ product });
          } catch (error) {
            throw new Error(PRODUCT_MANAGER_ERRORS.NO_PRODUCTO.ERROR_CODE)
          }
        };
    
    // AGREGA PRODUCTOS
    async addProduct (req,res){
        try {
            const productData = req.body;
            await productManagerMongo.addProduct(productData);
            res.status(200).send({ msg: 'Producto creado' });
          } catch (error) {
            throw new Error(RODUCT_MANAGER_ERRORS.ADD_PRODUCTO.ERROR_CODE)
          }
        };
       
    // ELIMINA UN PRODUCTO ID
    async deleteProductById (req, res){
        try {
            const productId = req.params.id;
            await productManagerMongo.deleteProductById(productId );
            res.status(200).send({ msg: 'Producto eliminado' });
          } catch (error) { throw new Error(PRODUCT_MANAGER_ERRORS.DELETE_PRODUCT.ERROR_CODE)
          }
        };
       
    // ACTUALIZA UN PRDOCUNTO ID
    async updateProductById (req, res){
        try {
            const productId = req.params.id;
            const updateData = req.body;
            await productManagerMongo.updateProductById(productId ,updateData );
            res.status(200).send({ msg: 'Producto actualizado'});
          } catch (error) {
            console.error(error);
            res.status(500).send({error: 'Error interno'});
          }
        }

        // FAKER 
      async genProduct(req, res) {
          try {
              const cant = parseInt(req.query.cant) || 100;
              let products = [];
              for(let i=0; i< cant; i++) {
                  const prod = genProduct()
                  products.push(prod);
              };
              res.json({products});
          } catch (error) {
              throw new Error(error);
          };
      };
    };
