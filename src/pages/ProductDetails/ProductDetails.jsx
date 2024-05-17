// src/pages/ProductDetails/ProductDetails.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ProductDetails.less'; // Make sure the path matches your structure
import { useCart } from '../Cart/CartContext';

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart } = useCart();
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setProduct(response.data);
      } catch (err) {
        setError('Error fetching product details');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const toggleFavorite = () => {
    let updatedFavorites;
    if (favorites.includes(product._id)) {
      updatedFavorites = favorites.filter(favId => favId !== product._id);
    } else {
      updatedFavorites = [...favorites, product._id];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleAddToCart = () => {
    addToCart(product);
    alert('Item added to cart!');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>No product found</div>;
  }

  return (
    <div className="product-details">
      <h1>{product.name}</h1>
      <div className="product-details-container">
        <div className="product-image">
          <img src={`http://localhost:5000/${product.images[0]}`} alt={product.name} />
        </div>
        <div className="product-info">
          <p className="product-description">{product.description}</p>
          <p className="product-price">${product.price}</p>
          <div className="product-actions">
            <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
            <button 
              className={favorites.includes(product._id) ? 'add-to-favorites active' : 'add-to-favorites'}
              onClick={toggleFavorite}
            >
              {favorites.includes(product._id) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
