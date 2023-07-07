
//configuracion del canal de comunicacion entre node y gmail
import nodemailer from "nodemailer";
import { options } from "./options.js";

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: options.gmail.adminAccount,
    pass: options.gmail.adminPass,
  },
});

export { transporter }