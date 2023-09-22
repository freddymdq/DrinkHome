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
            res.status(200).send({ products });
          } 
          catch (error) {
            req.logger.error(error);
            res.status(500).send({ message: error.message });
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

    async addProduct (req,res){
        try {
            const { title, description, price, category, status, img, code, stock, owner} = req.body;
            if (!title || !description || !price || !category || !status || !img || !code || !stock || !owner) {
                console.log(error);
            };
            const productData = {title, description, price, category, status , img, code, stock, owner };
            await productManager.addProduct(productData);
            // res.redirect('/admin');
            res.status(200).send({ msg: 'Producto creado exitosamente' });
        } catch (error) {
            res.status(500).send({ error: 'Error interno del servidor' });
        }}


    async deleteProductById (req, res){
        try {
            const productId = req.params.pid;
            await productManager.deleteProductById( productId );
            res.status(200).send({ msg: 'Producto eliminado' })
          } catch (error) {
            req.logger.error(error);
            res.status(500).json({ message: "Error al eliminar" })
          }
        };
       
    // ACTUALIZA UN PRDOCUNTO ID
    async updateProductById (req, res){
        try {
            const productId = req.params.pid;
            const { title, description, price, category, img, code, stock} = req.body;
            
            if (!title || !description || !price || !category || !img || !code || !stock) {
                ErrorCustom.createError({
                    name: "Error create error",
                    cause: productErrorInfo(req.body),
                    message: "Error al creando el producto.",
                    errorCode: EError.INVALID_JSON
                });
            };
            const updateData = {title,description, price, category, img, code, stock
            };
                await productManager.updateProductById(productId, updateData);
            res.status(200).send({ msg: 'Producto actualizado exitosamente' });
            }  catch (error) {
                req.logger.error(error);
                res.status(500).json({ message: error.message });
            }
    };

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
