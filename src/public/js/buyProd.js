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
        console.error('ERROR INTERNO');
      });
  });
});

