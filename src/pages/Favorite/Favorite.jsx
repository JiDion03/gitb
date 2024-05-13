import React from 'react';
import { useCart } from '../Cart/CartContext';
import './Favorite.less';  

function FavoritesPage({ products }) {
    const { addToCart } = useCart();
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const favoriteProducts = products.filter(product => favorites.includes(product._id));

    if (favoriteProducts.length === 0) {
        return <div className="favorites-container">No favorites added.</div>;
    }

    return (
        <div className="favorites-container">
            <h2>Your Favorites</h2>
            {favoriteProducts.map(product => (
                <div key={product._id} className="product-card">
                    <img src={`http://localhost:5000/uploads/${product.images[0]}`} alt={product.name} style={{ width: "100%", height: "auto" }} />
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p className="price">${product.price}</p>
                    <button onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
            ))}
        </div>
    );
}

export default FavoritesPage;
