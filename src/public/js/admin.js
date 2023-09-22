function irPanelControl() {
    window.location.href = "/admin/panel-control";
}

function irDBUser() {
    window.location.href = "/admin/db-user";
    fetch('/admin/db-user')
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
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
        console.error('NO SE PUDO ELIMINAR EL USUARIO');
      }
    })
    .catch(error => {
      console.error('ERROR INTERNO', error);
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
          console.error('ERROR CAMBIO DE ROL');
        }
      })
      .catch(error => {
        console.error('ERROR INTERNO CAMBIO ROL', error);
      });
  }
  