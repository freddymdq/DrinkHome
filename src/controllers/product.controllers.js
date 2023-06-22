import ProductManagerMongo from "../Dao/persistence/ProductManagerMongo.js";

const productManagerMongo = new ProductManagerMongo();

export default class ProductController{
    // MUESTRA PRODUCTOS
    async getProducts (req, res){
        try {
            const products = await productManagerMongo.getProducts();
            res.status(200).send({ products });
          } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Error interno' });
          }
        };
    
    // PRODUCTOS POR ID
    async getProductById (req, res){
        try {
            const productId = req.params.id;
            const product = await productManagerMongo.getProductById(productId);
            res.status(200).send({ product });
          } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Error interno' });
          }
        };
    
    // AGREGA PRODUCTOS
    async addProduct (req,res){
        try {
            const productData = req.body;
            await productManagerMongo.addProduct(productData);
            res.status(200).send({ msg: 'Producto creado' });
          } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Error interno' });
          }
        };
       
    // ELIMINA UN PRODUCTO ID
    async deleteProductById (req, res){
        try {
            const productId = req.params.id;
            await productManagerMongo.deleteProductById(productId );
            res.status(200).send({ msg: 'Producto eliminado' });
          } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Error interno' });
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
    };
