const addToCartButtons = document.querySelectorAll('.add-to-cart-button');

  addToCartButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const productId = button.getAttribute('data-product-id');
      
      try {
        const response = await fetch('/api/add-to-cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ productId })
        });

        if (response.ok) {
          alert('Producto agregado al carrito con éxito');
        } else {
          alert('Error al agregar el producto al carrito');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error al agregar el producto al carrito');
      }
    });
  });