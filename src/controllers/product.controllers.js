import ProductManagerMongo from "../Dao/persistence/ProductManagerMongo.js";
import {genProduct} from '../utils.js'
import { EError } from '../enums/EError.js';
import { productErrorInfo } from '../service/errorInfo.js';
import { errorParams } from '../service/errorParams.js';
import ErrorCustom from '../service/error/errorCustom.service.js';

const productManagerMongo = new ProductManagerMongo();
const errorCustom = new ErrorCustom()


export default class ProductController{
    // MUESTRA PRODUCTOS
    async getProducts (req, res){
        try {
            const products = await productManagerMongo.getProducts();
            res.status(200).send({ products });
          } /* catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Error interno' });
          } */
          catch (error) {
            req.logger.error(error);
          }
        };
    
    // PRODUCTOS POR ID
    async getProductById (req, res){
        try {
            const productId = req.params.id;
            const idProd = parseInt(productId);
            if(Number.isNaN(idProd)){
                errorCustom.createError({
                    name: "Product get by id error",
                    cause: errorParams(idProd),
                    message:"Error obteniendo el producto por id",
                    errorCode: EError.INVALID_PARAM
                });
            }
            const product = await productManagerMongo.getProductById(productId);
            res.status(200).send({ product });
          } catch (error) {
            req.logger.error(error);
          }
        };
    
    // AGREGA PRODUCTOS
    async addProduct (req,res){
        try {
            const { title, description, price, category, img, code, stock} = req.body;
            if (!title || !description || !price || !category || !img || !code || !stock) {
                customError.createError({
                    name: "Product create error",
                    cause: productErrorInfo(req.body),
                    message: "Error creando el producto.",
                    errorCode: EError.INVALID_JSON
                });
            };
            const productData = {
                title,
                description,
                price,
                category,
                thumbnail,
                code,
                stock
            };
            await productManagerMongo.addProduct(productData);
            res.status(200).send({ msg: 'Producto creado exitosamente' });
        } catch (error) {
            res.status(500).send({ error: 'Error interno del servidor' });
        }}
       
    // ELIMINA UN PRODUCTO ID
    async deleteProductById (req, res){
        try {
            const productId = req.params.id;
            errorCustom.createError({
              name: "Product get by id error",
              cause:errorParams(idProd),
              message:"Error obteniendo el uproducto por el id",
              errorCode: EError.INVALID_PARAM
          });
            await productManagerMongo.deleteProductById(productId );
            res.status(200).send({ msg: 'Producto eliminado' })
          } catch (error) {
            req.logger.error(error);
            res.status(500).json({ message: "Error al eliminar" })
          }
        };
       
    // ACTUALIZA UN PRDOCUNTO ID
    async updateProductById (req, res){
        try {
            const productId = req.params.id;
            const { title, description, price, category, img, code, stock} = req.body;
            errorCustom.createError({
                name: "Product get by id error",
                cause:errorParams(idProd),
                message:"Error obteniendo el producto por el id",
                errorCode: EError.INVALID_PARAM
            });
            if (!title || !description || !price || !category || !img || !code || !stock) {
                errorCustom.createError({
                    name: "Error create error",
                    cause: productErrorInfo(req.body),
                    message: "Error al creando el producto.",
                    errorCode: EError.INVALID_JSON
                });
            };
            const updateData = {
                title,
                description,
                price,
                category,
                img,
                code,
                stock
            };
            await productManagerMongo.updateProductById(productId, updateData);
            res.status(200).send({ msg: 'Producto actualizado exitosamente' });
            }  catch (error) {
                req.logger.error(error);
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
