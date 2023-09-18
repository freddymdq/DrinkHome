// DE MOMENTO ESTE ESTA DIRECTAMENTE EN EL MANAGERTICKET 
import { transporter } from "../config/gmail.js";

const sendTicket = async (user, ticket) => {
    const email = await transporter.sendMail({
      from: 'DRINK HOME',
      to: `${user.email}`,
      subject: 'Tu ticket de compra',
      html: 
      `<div>
        <h1>Tu ticket de compra</h1>
        <p>Código: ${ticket.code}</p>
        <p>Fecha de compra: ${ticket.purchase_dateTime}</p>
      <p>Monto: ${ticket.amount}</p>
    </div>`
  });
    return email;
};

export default sendTicket