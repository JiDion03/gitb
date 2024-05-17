import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCart } from '../Cart/CartContext';
import './Product.less'; // Make sure the path matches your structure

function Product() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
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
    return <div>Loading product...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="product-page">
      <div className="product-details">
        <img src={`http://localhost:5000/uploads/${product.images[0].split('\\').pop()}`} alt={product.name} className="product-image" />
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="price">${product.price}</p>
          <p>{product.description}</p>
          <div className="button-group">
            <button onClick={handleAddToCart}>Add to Cart</button>
            <button 
              onClick={toggleFavorite} 
              className={favorites.includes(product._id) ? 'favorite-button active' : 'favorite-button'}
            >
              {favorites.includes(product._id) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
