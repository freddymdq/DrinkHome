import { transporter } from "../config/gmail.js";

const emailTemplate = `<div>
<h1>Bienvenido/a!!</h1
<p>Tu registro fue realizado exitosamente.</p>
</div>`;
export const sendRegister = async (user) => {const email = await transporter.sendMail({
      from: 'DRINK HOME',
      to: `${user.email}`,
      subject: 'Usuario  Registrado',
      html: emailTemplate,
    });
    return email;
  };