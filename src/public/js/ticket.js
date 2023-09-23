const purchaseBtn = document.getElementById('purchaseBtn');
purchaseBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const cartId = e.target.dataset.cartId;
  console.log(cartId);
  fetch(`/api/carts/${cartId}/purchase`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        console.error('ERROR DE COMPRA');
      }
    })
    .then((data) => {
      window.location.href = '/';
      console.log('COMPRA FINALIZADA, REVISE SU TICKET');
    })
    .catch((error) => {
      console.error('ERROR EN SOLICITUD', error);
    });
});