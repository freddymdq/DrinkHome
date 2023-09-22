import mongoose from "mongoose";
let connectDB = null
import { options } from "./options.js";


(async () => {
  try {
    if ( connectDB ) {
      console.log("Ya estás conectado a la base de datos");
      return connectDB ;
    } else {
      connectDB  = mongoose.connect(options.mongo.url);
      console.log("Conectado con la base de datos");
      return connectDB ;
    }
  } catch (error) {
    console.log("Error al conectarse a la base de datos: " + error);
  }
})();