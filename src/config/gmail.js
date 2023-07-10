import nodemailer from "nodemailer"


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


export {transporter}