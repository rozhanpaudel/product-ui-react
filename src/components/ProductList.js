import React from 'react';
import ProductItem from './ProductItem';
const ProductList = ({ products,onDelete }) => {
  return (
    <div className='grid grid-cols-2 '>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default ProductList;
