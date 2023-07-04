import nodemailer from "nodemailer";
import { config } from "./config.js";

//Credenciales de la cuenta de GMAIL
const emailAdmin = config.gmail.adminAccount;
const passAdmin = config.gmail.adminPass;

//Configuracion del canal de comunicación entre node y gmail
const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    auth:{
        user: emailAdmin,
        pass: passAdmin
    },
    secure: false,
    tls:{
        rejectUnauthorized: false
    }
})

export { transporter }