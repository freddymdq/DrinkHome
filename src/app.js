import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import mongoose from "mongoose";
import __dirname from "./utils.js";
import viewsRouter from "./router/views.routes.js";
import chatRouter from "./router/chat.routes.js"
import cartRouter from "./router/cart.routes.js"
import productRouter from "./router/product.routes.js"
//import messagesModel from "./Dao/models/message.model.js";

const PORT = process.env.PORT || 8080;
const app = express();
const server = app.listen(PORT, ()=>{
    console.log('Servidor funcionando en el puerto: '+PORT);
})

const MONGO = "mongodb+srv://freddymdq:federico@cluster0.wm7ahcr.mongodb.net/ecommerce?retryWrites=true&w=majority"
const connect = mongoose.connect(MONGO);

const consult = async () =>{

  //agrupar por precio de mayor a menor
 /*  const result = await productModel.aggregate([
    {$group: {_id:'$price', products:{$push: "$$ROOT"}}},
    {$sort: {_id:-1}}
  ]) */

  // agrupar productos por categoria
  /* const category = await productModel.aggregate([
    {$group: {_id:'$category', products:{$push: "$$ROOT"}}},
  ])
  console.log(JSON.stringify(category, null,'\t')); */

  // promedio de precio de los productos segun categoria
  /* const promed = await productModel.aggregate([
    {$match: {category:"whisky"}},
    {$group: {_id: "whisky", promedio:{$avg: "$price" }}}
  ])
  console.log(JSON.stringify(promed, null,'\t')) */

  //promedio de precios general de producto
 /*  const promed1 = await productModel.aggregate([
    {$group: {_id: "products", promedio:{$avg: "$price" }}}
  ])
  console.log(JSON.stringify(promed1, null,'\t'))  */
}
consult()



app.use(express.json());
app.use(express.urlencoded({extended:true}));
// Estaticos
app.use(express.static(__dirname+'/public'));
// Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// routes
app.use('/', viewsRouter)
app.use('/realTimeProducts', viewsRouter)
app.use('/api/chat', chatRouter)
app.use('/api/products/', productRouter);
app.use('/api/carts/', cartRouter);

const io = new Server(server)
const messages = []

io.on('connection', socket => {
    console.log('socket connected')
  
    socket.emit('messageLogs', messages)
  
    socket.on('message', async data => {
        // Pusheamos un mensaje a un arrays para mostrarlo por handlebars. 
        messages.push(data)  
        io.emit('messageLogs', messages)
        // Crear un nuevo documento en la base de datos
       // await messagesModel.create({ user: data.user, message: data.message })
      });
  
    socket.on('authenticated', data => {
      socket.broadcast.emit('newUserConnected', data);
    });
  });