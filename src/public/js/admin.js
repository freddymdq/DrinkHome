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
    window.location.href = "/admin/agregar-productos";
}

function volver() {
  window.location.href = "/";
}

document.addEventListener('DOMContentLoaded', () => {
  const deleteButtons = document.querySelectorAll('.delete-button');
  const changeRoleButtons = document.querySelectorAll('.change-role-button');

  // Agregar un evento click a cada botón de eliminar usuario
  deleteButtons.forEach(button => {
      button.addEventListener('click', () => {
          const userId = button.dataset.userId;
          eliminarUsuario(userId);
      });
  });

  // Agregar un evento click a cada botón de cambiar rol
  changeRoleButtons.forEach(button => {
      button.addEventListener('click', () => {
          const userId = button.dataset.userId;
          changeRole(userId);
      });
  });
});

// ...

function eliminarUsuario(userId) {
  fetch(`/${userId}/delete`, { method: 'POST' })
      .then(response => {
          if (response.ok) {
              window.location.href = "/admin/db-user";
          } else {
              console.error('NO SE PUDO ELIMINAR EL USUARIO');
          }
      })
      .catch(error => {
          console.error('ERROR DELETE USER', error);
      });
}

function changeRole(userId) {
  fetch(`/${userId}/change`, { method: 'POST',
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