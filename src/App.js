import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import './App.css'
import axios from 'axios';
import { toHaveStyle } from '@testing-library/jest-dom/dist/matchers';
import Notification from './components/Notification';
const serverUrl = process.env.REACT_APP_SERVER_URL

function App() {
  const [products, setProducts] = useState([]);
  const [notify,setNotify] = useState(true)

  useEffect(() => {
    fetchProducts();
    console.log(products)
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${serverUrl}/products`);

      if (response.status === 200) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      // Handle error here
    }
  };

  const addProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const deleteProduct = async (productToDelete) => {
    try {
      const response = await axios.delete(`${serverUrl}/products/${productToDelete.id}`)
      setProducts(products.filter((product) => product.id !== productToDelete.id));
      // TODO; SHOW TOAST MESSAGE HERE
      alert('Product deleted Successfully')
    } catch (err) {
      alert('Product delete failed')
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <Notification />
      <div className="flex">
        <div className="w-1/2">
          <ProductList products={products} onDelete={deleteProduct} />
        </div>
        <div className="w-1/2 bg-gray-100">
          <h1 className="text-3xl font-semibold mb-8">Product Management App</h1>
          <ProductForm fetchProducts={fetchProducts} />
        </div>
      </div>


    </div>
  );
}

export default App
