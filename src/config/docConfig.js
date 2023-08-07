import __dirname from "../utils.js";
import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

const swaggerOptions = {
    definition:{
        openapi: "3.0.1",
        info:{
            title:"Documentacion api de Ecommerce DrinkHome",
            version: "1.0.0",
            description: "endpoint de api de productos DrinkHome"
        }
    },
    apis:[`${path.join(__dirname, "../docs/**/*.yaml")}`]
};

export const swaggerSpecs = swaggerJSDoc(swaggerOptions);