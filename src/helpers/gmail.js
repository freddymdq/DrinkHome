import { transporter } from "../config/gmail.js"

export const sendGmail = async () => {
    const email = await transporter.sendMail({
        from:"thedrinkhome@gmail.com",
        to:'freddymdq@gmail.com', 
        subject:"Registre Successfully",
        text: 'El registro a sido exitoso'
    });
    return email;
}