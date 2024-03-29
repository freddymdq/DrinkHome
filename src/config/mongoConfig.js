import session from "express-session";
import passport from "passport";
import initializePassport from "./passport.config.js";
import MongoStore from "connect-mongo";
import {options} from "./options.js";

const MONGO_URL = options.mongo.url;
const SECRET_SESSION = options.server.secretSession;


function mongoConfig(app) {

  app.use(session({
        store: new MongoStore({
        mongoUrl:MONGO_URL,
        ttl: 3200
      }),
      secret:SECRET_SESSION,
      resave:false,
      saveUninitialized:false
  }));

  initializePassport();
  app.use(passport.initialize());
  app.use(passport.session());
}
export default mongoConfig;