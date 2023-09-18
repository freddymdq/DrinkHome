import { transporter } from '../config/gmail.js';


const sendRemoveUs = async (user) => {
  const email = await transporter.sendMail({
    from: 'THE DRINK HOME',
    to: `${user.email}`,
    subject: 'Usuario eliminado',
    html: 
    `<div>
      <h1>SU CUENTA A SIDO ELIMINADA</h1>
        <p>
          Querido usuario, por el medio de la presente lamentamos comunicarle que su cuenta a sido eliminada.
          La misma se podra volver a registrar sin ningun inconveniente.
          Recuerde que para facilitar el flujo de datos,  las cuentas inactividad se eliminan de nuestra base de datos.
        </p>
    </div>`
  });
  return email;
};

export default sendRemoveUs