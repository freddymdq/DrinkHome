import express from "express"; 
import passport from "passport";
import handlebars from "express-handlebars";
import mongoConfig from "./config/mongoConfig.js";
import initializePassport from "./config/passport.config.js";
import __dirname from "./utils.js";
import mgsModel from "./Dao/models/mgs.model.js";
import userModel from "./Dao/models/user.model.js";
import { Server } from "socket.io"; 
import "./config/dbConnection.js"
import {options} from "./config/options.js";
import { errorHandler } from "./middleware/errorHandler.js"
import { addLogger } from "./helpers/logger.js";
import userRouter from "./router/user.routes.js";
import chatRouter from "./router/chat.routes.js";
import sessionRouter from "./router/session.routes.js";
import viewsRouter from "./router/views.routes.js";
import cartRouter from "./router/cart.routes.js"
import productRouter from "./router/product.routes.js"
import swaggerUi from "swagger-ui-express";
import { swaggerSpecs } from "./config/docConfig.js";


  
export const PORT = options.server.port;
const app = express();
const httpServer = app.listen(PORT,()=>console.log(`Server conectado al puerto ${PORT}`));
httpServer.on('error', error => console.log(`Error in server ${error}`));

mongoConfig(app)

initializePassport();
// logger
app.use(addLogger);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(errorHandler);

// routes
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use('/chat', chatRouter)
app.use('/', viewsRouter)
app.use('/api/session', sessionRouter)
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/user', userRouter)

// Socket.IO
const io = new Server(httpServer);
const messages = [];

io.on('connection', socket => {
    console.log('socket connected')
  
    socket.emit('messageLogs', messages)
  
    socket.on("message", async (data) => {
        const user = await userModel.findOne({ email: data.user }).select('email');
      
        if (!user) {
          console.log("User not found:", data.user);
          return;
        }
        const message = {
          user: user,
          message: data.message
        };
      
        messages.push(message);
        io.emit("messageLogs", messages);
      
        await mgsModel.create(message);
      });
  
    socket.on('authenticated', data => {
      socket.broadcast.emit('newUserConnected', data);
    });
  });