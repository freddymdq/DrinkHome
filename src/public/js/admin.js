function irPanelControl() {
    window.location.href = "/admin/panel-control";
}

function irDBUser() {
    window.location.href = "/admin/db-user";
    fetch('/admin/db-user')
    .then(response => response.json())
    .then(data => {
      // Hacer algo con los datos de los usuarios recibidos
      console.log(data);
    })
    .catch(error => {
      // Manejar el error en caso de que ocurra
      console.error(error);
    });
}

function irRendimientos() {
    window.location.href = "/admin/rendimientos";
}

function irAgregarProductos() {
    window.location.href = "/agregar-productos";
}

function volver() {
  window.location.href = "/";
}

function eliminarUsuario(userId) {
  fetch(`/${userId}/delete`, { method: 'DELETE' })
    .then(response => {
      if (response.ok) {
        window.location.href = "/admin/db-user";
      } else {
        console.error('Error al eliminar el usuario');
      }
    })
    .catch(error => {
      console.error('Error al eliminar el usuario', error);
    });
}
  function changeRole(userId) {
    fetch(`/${userId}/change`, { method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role: 'premium' }),
    })
      .then(response => {
        if (response.ok) {
          window.location.href = "/admin/db-user";
        } else {
          console.error('Error al cambiar el rol del usuario');
        }
      })
      .catch(error => {
        console.error('Error al cambiar el rol del usuario', error);
      });
  }
  