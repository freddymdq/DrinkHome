import express from "express"; //
import handlebars from "express-handlebars"; //
import session from "express-session"; //
import MongoStore from 'connect-mongo'; //
import { Server } from "socket.io"; 
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
import "./config/dbConnection.js"
import {options} from "./config/options.js";



export const port = options.server.port;
const app = express();

const httpServer = app.listen(port,()=>console.log(`Server listening on port ${port}`));

app.use(session({
  store: new MongoStore({
      mongoUrl:options.mongoDB.url
  }),
  secret:options.server.secretSession,
  resave:false,
  saveUninitialized:false
}));

httpServer.on('error', error => console.log(`Error in server ${error}`));


initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
// Estaticos
app.use(express.static(__dirname+'/public'));
// Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');


// routes
/* app.use('/current', currentRouter) */
app.use('/chat', chatRouter)
app.use('/', viewsRouter)
app.use('/api/session', sessionRouter); 
app.use('/api/sessions', sessionRouter); 
app.use('/api/products/', productRouter);
app.use('/api/carts/', cartRouter);
app.use('/', adminRouter);


const io = new Server(httpServer);
io.on('connected', async Socket => {
    console.log('socket conectado');
    Socket.on('message', data=>{
        const newMessage = new mgsModel({
            user: data.user,
            message: data.message
        });
        io.emit('messageLogs', newMessage);
    });
    Socket.on('authenticated', (data) =>{      
        Socket.broadcast.emit('Nuevo Usuario conectado', data);
    });
});
