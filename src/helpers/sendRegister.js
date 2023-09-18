import { transporter } from "../config/gmail.js";


const sendRegister = async (user) => {
  const email = await transporter.sendMail({
      from: 'DRINK HOME',
      to: `${user.email}`,
      subject: 'Usuario  Registrado',
      html: `<div>
      <h1>Bienvenido/a!!</h1
      <p>Tu registro fue realizado exitosamente.</p>
      </div>`
    });
    return email;
  };

export default sendRegister