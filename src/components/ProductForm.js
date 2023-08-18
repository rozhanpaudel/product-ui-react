import React, { useState } from 'react';
import axios from 'axios';


const serverUrl = process.env.REACT_APP_SERVER_URL

const ProductForm = ({ fetchProducts }) => {
  const [formData, setFormData] = useState({
    description: '',
    price: '',
    name: '',
    file: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = {};

    if (!formData.name) {
      validationErrors.name = 'Name is required';
    }

    if (!formData.description) {
      validationErrors.description = 'Description is required';
    }

    if (!formData.price) {
      validationErrors.price = 'Price is required';
    } else if (isNaN(parseFloat(formData.price))) {
      validationErrors.price = 'Price must be a valid number';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const form = new FormData();
      form.append('description', formData.description);
      form.append('price', parseFloat(formData.price));
      form.append('name', formData.name);
      form.append('file', formData.file);

      await axios.post(`${serverUrl}/products`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFormData({
        description: '',
        price: '',
        name: '',
        file: ''
      });
      fetchProducts()
      alert('Product Created Successfully')
    } catch (error) {
      console.error('Error creating product:', error);
      // Handle error here
      alert('Product Create failed ')
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="block font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="block font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="block font-medium">
            Price
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="block font-medium">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="file"
            required={true}
            accept="image/*"
            onChange={(e) => {
              setFormData({ ...formData, file: e.target.files[0] })
            }}
            className="border rounded w-full p-2"
          />
          {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
