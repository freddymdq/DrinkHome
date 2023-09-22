import ProductManagerMongo from "../Dao/persistence/productManagerMongo.js";
import { genProduct } from '../helpers/createFakerProducts.js'
import { EError } from '../enums/EError.js';
import { productErrorInfo } from '../service/errorInfo.js';
import { errorParams } from '../service/errorParams.js';
import { ErrorCustom } from '../service/error/errorCustom.service.js';


const productManager = new ProductManagerMongo();

export default class ProductController{
    async getProducts (req, res){
        try {
            const products = await productManager.getProducts();
            res.status(200)
               .send({ products });
          } 
          catch (error) {
            req.logger.error(error);
            res.status(500)
               .send({ message: error.message });
          }
        };

    async getProductById (req, res){
        try {
            const productId = req.params.pid;
            const idProd = parseInt(productId);
            if(Number.isNaN(idProd)){
                ErrorCustom.createError({
                    name: "Product get by id error",
                    cause: errorParams(idProd),
                    message:"Error obteniendo el producto por id",
                    errorCode: EError.INVALID_PARAM
                });
            }
            const product = await productManager.getProductById(productId);
            res.status(200).send({ product });
          } catch (error) {
            req.logger.error(error);
            res.status(500).send({ message: error.message });
          }
        };
        
    async addProduct (req, res) {
        try {
            const { title, description, category, status, price, img, code, stock, owner} = req.body;
              if (!title || !description || !category || !status || !price || !img || !code || !stock || !owner) {
                ErrorCustom.createError({
                  name: 'Error al agregar producto',
                  cause: productErrorInfo(req.body),
                  message: 'Error al agregar producto',
                  errorCode: EError.INVALID_JSON
                });
              };
              const prodData = { title, description, category, status, price, img, code, stock, owner};
                await productManager.addProduct(prodData);
              res.status(200).send({ msg: 'Se creo el producto correctamente' });
            } catch (error) {
              res.status(500).send({ error: 'Error:' + error });
            };
          };

    async deleteProductById (req, res){
        try {
            const productId = req.params.pid;
                await productManager.deleteProductById( productId );
                res.status(200)
                    .send({ msg: 'Producto eliminado' })
        } catch (error) {
            req.logger.error(error);
            res.status(500)
               .json({ message: "Error al eliminar" })
          }
        };
       
    // ACTUALIZA UN PRDOCUNTO ID
    async updateProductById (req, res){
        try {
         const prodId = req.params.pid;
         const { title, description, price, category, img, code, stock, owner} = req.body;         
        if (!title || !description || !price || !category || !img || !code || !stock || !owner) {
            ErrorCustom.createError({
                name: "Error actualizando producto",
                cause: productErrorInfo(req.body),
                message: "Error actualizando el producto.",
                errorCode: EError.INVALID_JSON
            }); };
        const updateProd = {title,description, price, category, img, code, stock, owner };
            await productManager.updateProductById(prodId, updateProd);
            res.status(200)
               .send({ message: 'Producto actualizado exitosamente' });
            } catch (error) {
                req.logger.error(error);
                res.status(500)
                   .json({ message: "Error" });
            }};

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
