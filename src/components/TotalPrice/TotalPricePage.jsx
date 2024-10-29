import React from 'react';

function TotalPricePage({ products }) {
  // Calcula la suma total de los precios de todos los productos
  const total = products.reduce((acc, product) => {
    const precio = product.precio ? parseFloat(product.precio) : 0;
    const cantidad = product.cantidad ? parseInt(product.cantidad, 10) : 0;
    return acc + (precio * cantidad);
  }, 0);

  return (
    <div className={`btn btn-${total < 200000 ? 'success' : total <= 250000 ? 'warning' : 'danger'}`}>
      <h4>TOTAL: ${total.toFixed(2)}</h4>
    </div>
  );
}

export default TotalPricePage;
