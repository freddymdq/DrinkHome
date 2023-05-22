import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import mongoose from "mongoose";
import __dirname from "./utils.js";
import sessionRouter from "./router/session.routes.js";
import viewsRouter from "./router/views.routes.js";
import chatRouter from "./router/chat.routes.js"
import cartRouter from "./router/cart.routes.js"
import productRouter from "./router/product.routes.js"
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
//import messagesModel from "./Dao/models/message.model.js";



const DB = 'ecommerce';
const MONGO = "mongodb+srv://freddymdq:federico@cluster0.wm7ahcr.mongodb.net/" + DB
const PORT = process.env.PORT || 8080;
const app = express();
const connect = mongoose.connect(MONGO);
const server = app.listen(PORT, ()=>{
  console.log('Servidor funcionando en el puerto: '+ PORT);
})

app.use (session({
  store: new MongoStore({
    mongoUrl: MONGO,
    ttl:3600
  }),
  secret: 'CoderSecret',
  resave: false,
  saveUninitialized: false
}));


/* app.use(cookieParser()); */
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
app.use('/api/session', sessionRouter); 
app.use('/api/chat', chatRouter)
app.use('/api/products/', productRouter);
app.use('/api/carts/', cartRouter);

// COOKIES / llevar al router.
/* app.get('/',  (req, res) => {
  res.render('cookies')
})
app.post('/cookie',  (req, res) => {
   const data = req.body;
   res.cookie('DrinkHomeCookie', data, {maxAge:10000}).send({status:"success", message:"cookie set"});
})
 */
// Session


// WEB SOCKET
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