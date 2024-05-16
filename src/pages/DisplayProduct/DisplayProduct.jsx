import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../Cart/CartContext';
import './DisplayProduct.less';
import { useProducts } from '../../components/hooks/useProducts';

function DisplayProducts() {
  const { products, setProducts } = useProducts();  // Use the hook
  const { addToCart } = useCart();
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (products.length === 0) {
      axios.get('http://localhost:5000/api/products')
        .then(response => setProducts(response.data))
        .catch(error => {
          setError('Failed to fetch products');
          console.error('Error:', error);
        });
    }
  }, [products, setProducts]);

  if (error) {
    return <p>Error loading products: {error}</p>;
  }

  return (
    <div className="products-container">
      {products.map(product => (
        <div key={product._id} className="product-card">
          <img src={`http://localhost:5000/uploads/${product.images[0]}`} alt={product.name} style={{ width: "100%", height: "auto" }} />
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p className="price">${product.price}</p>
          <p className="category">{product.category} - {product.subcategory}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
          <button onClick={() => toggleFavorite(product)} className={favorites.includes(product._id) ? 'favorite-button active' : 'favorite-button'}>
            {favorites.includes(product._id) ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
      ))}
    </div>
  );
}

export default DisplayProducts;
