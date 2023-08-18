import React from 'react';
const ProductItem = ({ product, onDelete }) => {
  const { name, description, price, image_url, thumbnailUrl } = product;

  return (
    <div className="border p-4 rounded-md mb-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">{name}</h2>
        <button
          onClick={() => onDelete(product)}
          className="px-2 py-1 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
      <p className="mb-2">{description}</p>
      <p className="mb-2">${parseInt(price).toFixed(2)}</p>
      <img src={thumbnailUrl || image_url} alt={name} className="w-32" />
    </div>
  );
};

export default ProductItem;
