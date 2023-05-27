const form = document.getElementById("loginForm");

form.addEventListener('submit', e =>{
    e.preventDefault();

    const data = new FormData(form);
    const obj = {};

    data.forEach((value, key) => {
      obj[key] = value;
    });

    fetch('/api/sessions/login',{
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result=>{
        if(result.status == 200){
            window.location.replace('/')
        }
    })
})

/* const form = document.getElementById('loginForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => {
    obj[key] = value;
  });

  try {
    const response = await fetch('/api/sessions/login', {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      window.location.replace('/');
    } else {
      const errorData = await response.json();
      Swal.fire({
        icon: 'error',
        title: 'Error Inicio Sesión',
        text: errorData.error,
        footer: '<a href="/register">¿Estás registrado?</a>',
        width: 500,
        padding: '3em',
        background: '#000000',
        backdrop: `
          rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat`,
      });
    }
  } catch (error) {
    console.error('Error:', error);
  }
});
 */


{/* <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script> */}


