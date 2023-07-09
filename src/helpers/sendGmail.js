import { transporter } from "../config/gmail.js";

const emailTemplate = `<div>
<h1>Bienvenido/a!!</h1>
<p>Tu registro fue realizado exitosamente.</p>
</div>`;
export const sendGmail = async (recipient) => {
    const email = await transporter.sendMail({
      from: 'DRINK HOME',
      to: recipient,
      subject: 'Registro exitoso',
      html: emailTemplate,
    });
    return email;
  };