import express from "express"; 
import passport from "passport";
import handlebars from "express-handlebars";
import mongoConfig from "./config/mongoConfig.js";
import routerConfig from "./config/routerConfig.js";
import initializePassport from "./config/passport.config.js";
import __dirname from "./utils.js";
import mgsModel from "./Dao/models/mgs.model.js";
import userModel from "./Dao/models/user.model.js";
import { Server } from "socket.io"; 
import "./config/dbConnection.js"
import {options} from "./config/options.js";
import { errorHandler } from "./middleware/errorHandler.js"
import { addLogger } from "./helpers/logger.js";


export const port = options.server.port;
const app = express();
const httpServer = app.listen(port,()=>console.log(`Server conectado al puerto ${port}`));
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
routerConfig(app)




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