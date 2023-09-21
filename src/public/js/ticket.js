const purchaseBtn = document.getElementById('purchaseB');
purchaseBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const cartId = e.target.dataset.cartId;
  
  fetch(`/${cartId}/purchase`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      console.error('ALGO SALIÓ MAL');
      const errorMessage = document.getElementById('error-message');
      if (errorMessage) {
        errorMessage.textContent = 'Hubo un error al procesar la compra. Por favor, inténtalo nuevamente.';
      }
    }
  })
  .then((data) => {
    window.location.href = '/orden';
    console.log('COMPRA FINALIZADA');
  })
  .catch((error) => {
    console.error('ERROR INTERNO', error);
  });
});