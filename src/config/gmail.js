import nodemailer from 'nodemailer';
import { options } from './options.js';

const adminEmail = options.gmail.adminAccount;
const adminPass = options.gmail.adminPass;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: adminEmail,
    pass: adminPass,
  },
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
}
);


  export const sendRegister = async (user) => {
    const email = await transporter.sendMail({
      from: 'DRINK HOME',
      to: `${user.email}`,
      subject: 'Usuario  Registrado',
      html: `<div>
      <h1>Bienvenido/a!!</h1
      <p>Tu registro fue realizado exitosamente.</p>
      <p> Inicia session: https://drinkhome.up.railway.app/</p>
      <p> RECUERDA QUE DEBES SER MAYOR DE 18 PARA PODER COMPRAR </p>
      </div>`
    });
    return email;
  };

  export const sendRemoveUs = async (user) => {
    const email = await transporter.sendMail({
      from: 'THE DRINK HOME',
      to: `${user.email}`,
      subject: 'Usuario eliminado',
      html: 
      `<div>
        <h1>SU CUENTA A SIDO ELIMINADA</h1>
          <p>
            Querido usuario, por el medio de la presente lamentamos comunicarle que su cuenta a sido eliminada.
            La misma se podra volver a registrar sin ningun inconveniente, siempre y cuando respete nuestras politicas
            Ademas para facilitar el flujo de datos,  las cuentas inactividad se eliminan automaticamente.
          </p>
      </div>`
    });
    return email;
  };

  export  const sendTicket = async (purchaserEmail, codeGenerator, dateGenerator, totalAmount ) => {
     await transporter.sendMail({
      from: 'DRINK HOME',
      to: `${purchaserEmail}`,
      subject: 'Tu ticket de compra',
      html: 
      `<div>
        <h1>TICKET FISCAL</h1>
        <H2>RESPONSABLE INSCRIPTO</H2>
        <h4>Copete Tomas Muchoi</h4>
        <h4>CUIT:20-21202912-3</h4>
        <p>Código: ${codeGenerator}</p>
        <p>Fecha de compra: ${dateGenerator}</p>
        <p>Precio final: ${totalAmount}</p>
        <h5>GRACIAS POR HABERNOS TENIDO EN CUENTA</h5>
    </div>`
  });
};


export default transporter
