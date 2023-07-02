import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
const ProductList = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    { id: 1, name: 'Web Security', imageUrl:'/images/1.png' },
    { id: 2, name: 'Service Desk', imageUrl: '/images/2.png' },
    { id: 3, name: 'Process Automation', imageUrl: '/images/3.png' },
  ];

  const handleProductClick = (productId) => {
    setSelectedProduct(productId);
  };

  return (
    <div style={{padding:'10%'}}>
    <h1>Popular Software</h1>
    <div style={{display:'flex', cursor:'pointer'}}>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <div onClick={() => {
                handleProductClick(product)
            }}
            >{product.name}</div>
          </li>
        ))}
      </ul>

      {selectedProduct && (
        <div style={{display:'flex', padding: '1%'}} >
           <NavLink to="/form"><img
              style={{width: '150px', height: '80px'}}
              src={selectedProduct.imageUrl}
              alt={selectedProduct.id}
            /></NavLink>
        </div>
      )}
    </div>
    </div>
  );
};

export default ProductList;
