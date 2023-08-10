import express from "express"; 
import handlebars from "express-handlebars";
import session from "express-session";
import MongoStore from 'connect-mongo'; 
import { Server } from "socket.io"; 
import "./config/dbConnection.js"
import {options} from "./config/options.js";

import swaggerUi from "swagger-ui-express";
import { swaggerSpecs } from "./config/docConfig.js";

import passport from "passport";
import __dirname from "./utils.js";
import adminRouter from "./router/admin.routes.js";
import mgsModel from "./Dao/models/mgs.model.js";
import chatRouter from "./router/chat.routes.js";
import sessionRouter from "./router/session.routes.js";
import viewsRouter from "./router/views.routes.js";
/* import currentRouter from "./router/current.routes.js"; */
import cartRouter from "./router/cart.routes.js"
import productRouter from "./router/product.routes.js"
import initializePassport from "./config/passport.config.js";
import userModel from "./Dao/models/user.model.js";
import { errorHandler } from "./middleware/errorHandler.js"
import { addLogger } from "./helpers/logger.js";


export const port = options.server.port;
const app = express();

const httpServer = app.listen(port,()=>console.log(`Server listening on port ${port}`));

app.use(session({
  store: new MongoStore({
      mongoUrl:options.mongoDB.url,
      ttl: 3200
  }),
  secret:options.server.secretSession,
  resave:false,
  saveUninitialized:false
}));

httpServer.on('error', error => console.log(`Error in server ${error}`));


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
/* app.use('/current', currentRouter) */
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use('/chat', chatRouter)
app.use('/', viewsRouter)
app.use('/api/session', sessionRouter); 
app.use('/api/sessions', sessionRouter); 
app.use('/api/products/', productRouter);
app.use('/api/carts/', cartRouter);
app.use('/', adminRouter);


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