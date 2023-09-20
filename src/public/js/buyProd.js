const addToCart = document.querySelectorAll('.cartB');
addToCart.forEach(button => {
  button.addEventListener('click', (i) => {
    const userId = i.target.getAttribute('data-user-id');
    const cartId = i.target.getAttribute('data-cart-id');
    const prodId = i.target.getAttribute('data-product-id');
    const productData = {
      userId,
      prodId
    };
    fetch(`/api/carts/${cartId}/product/${prodId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    })
      .then(response => {
        if (response.ok) {
          console.log('PRODUCTO CARGADO AL CARRITO');
        } else {
          console.error('NO SE PUDO CARGAR AL CARRITO');
        }
      })
      .catch(error => {
        console.error('ERROR INTERNO', error);
      });
  });
});

const purchaseBtn = document.getElementById('purchaseB');
purchaseBtn.addEventListener('click', (i) => {
 i.preventDefault();
  const cartId = i.target.dataset.cartId;
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
        console.error('ALGO SALIO MAL');
      }
    })
    .then((data) => {
      window.location.href = '/orden';
      console.log('COMPRA FINALIZASA');
    })
    .catch((error) => {
      console.error('ERROR INTERNO', error);
    });
});