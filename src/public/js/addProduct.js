document.getElementById('productForm').addEventListener('submit', (event) => {
    event.preventDefault(); 
    const form = event.target;
    const productForm = new FormData(form);
  
    fetch('/agregar-productos', {
      method: 'POST',
      body: productForm,
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // si tiene exito lo parsea a json
        } else {
          throw new Error('Error en la solicitud');
        }
      })
      .then((data) => {
        if (data.msg) {
          alert(data.msg); 
          window.location.href = "/";
        } else if (data.error) {
          alert(data.error); // mensaje de error del servidor
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud:', error.message);
      });
  });