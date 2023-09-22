import mongoose from "mongoose";
let dataBase = null

import { options } from "./options.js";


(async () => {
  try {
    if ( dataBase ) {
      console.log("READY CONNECTED DATABASE");
      return dataBase ;
    } else {
      dataBase  = mongoose.connect(options.mongo.url);
      console.log("SECURITY CONNECTED DATABASE");
      return dataBase ;
    }
  } catch (error) {
    console.log("ERROR CONNECTED DATABASE " + error);
  }})();