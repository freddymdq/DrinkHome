import nodemailer from "nodemailer"
import {options} from "./options.js"

const transporter = nodemailer.createTransport({
   
    service: 'gmail',
    auth: {
      user: 'freddymdq@gmail.com',
      pass: '',
    },
    secure: false,
    tls:{
        rejectUnauthorized: false
    }
  });


// de esta forma no me funciona.
/* const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    auth:{
        user: adminEmail,
        pass: adminPass
    },
    secure: false,
    tls:{
        rejectUnauthorized: false
    }
})
 */
export {transporter}