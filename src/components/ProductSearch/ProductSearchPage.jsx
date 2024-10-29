import React, { useState } from 'react';

function ProductSearchPage({ products, setFilteredProducts }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = products.filter(product =>
        product.nombre.toLowerCase().includes(term.toLowerCase())
        );
    setFilteredProducts(filtered);
  };

  return (
    <div className="product-search my-3">
      <div className="input-group bg-white">
        <span className="input-group-text" id="search-icon">
          🔍 
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Buscar producto por nombre..."
          className="form-control"
          aria-label="Buscar producto"
          aria-describedby="search-icon"
        />
      </div>
    </div>
  );
}

export default ProductSearchPage;
