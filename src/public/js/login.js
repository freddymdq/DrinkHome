
const form = document.getElementById('loginForm');

form.addEventListener('submit', e => {
  e.preventDefault();

  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => obj[key] = value);
  fetch('/api/session/login', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (response.status === 200) {
      window.location.replace('/');
    } else {
      return response.json();
    }
  })
  .then(data => {
    // Mostrar mensaje de error con SweetAlert2
    // el sweet alert me tira error por consola por la version.
    Swal.fire({
      icon: 'error',
      title: 'Error Inicio Sesión',
      text: data.error,
      footer: '<a href="/register">Estas registrado?</a>',
      width: 500,
      padding: '3em',
      color: '#fff',
      background: '#000000',
      backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat`
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
});



