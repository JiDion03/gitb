import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Product.less'; // Make sure the path matches your structure

function Product({ category }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${category}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="products-container">
      {products.map((product) => (
        <div key={product._id} className="product-card">
          <img src={product.imageUrl} alt={product.name} className="product-image" />
          <div className="product-info">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="price">${product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Product;
