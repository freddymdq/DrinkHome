import { transporter } from "../config/gmail.js";

const sendTicket = async (purchaserEmail, codeGenerator, dateGenerator, totalAmount ) => {
    const email = await transporter.sendMail({
      from: 'DRINK HOME',
      to: `${purchaserEmail}`,
      subject: 'Tu ticket de compra',
      html: 
      `<div>
        <h1>Comprobante de factura A</h1>

        <p>Código: ${codeGenerator}</p>
        <p>Fecha de compra: ${dateGenerator}</p>
        <p>Precio final: ${totalAmount}</p>
    </div>`
  });
    return email;
};

export default sendTicket