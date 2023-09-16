import { transporter } from '../config/gmail.js';

const emailTemplate = 
`<div>
  <h1>SU CUENTA A SIDO ELIMINADA</h1>
    <p>
      Querido usuario, por el medio de la presente lamentamos comunicarle que su cuenta a sido eliminada.
      La misma se podra volver a registrar sin ningun inconveniente.
      Recuerde que para facilitar la gran carga de datos,  las cuentas con mas de 48hs de inactividad, seran eleminadas automaticamente.
    </p>
</div>`

export const sendRemoveUs = async (user) => {
  const email = await transporter.sendMail({
    from: 'THE DRINK HOME',
    to: `${user.email}`,
    subject: 'Usuario eliminado',
    html: emailTemplate
  });
  return email;
};