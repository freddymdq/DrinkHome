import { transporter } from "../config/gmail.js";

const emailTemplate = `<div>
<h1>Tu ticket de compra</h1>
<p>Adjuntamos los detalles de tu compra.</p>
</div>`;


export const sendTicket = async (recipient) => {
    const email = await transporter.sendMail({
      from: 'DRINK HOME',
      to: recipient,
      subject: 'Tu ticket de compra',
      html: emailTemplate,
    });
    return email;
  };