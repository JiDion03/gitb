import React, { useEffect, useState } from 'react';
import { useCart } from '../Cart/CartContext';
import { useNavigate } from 'react-router-dom';
import './Favorite.less';

function FavoritesPage({ products }) {
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, []);

    const favoriteProducts = products.filter(product => favorites.includes(product._id));

    const removeFromFavorites = (productId) => {
        const updatedFavorites = favorites.filter(favId => favId !== productId);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    const handleAddToCart = (product) => {
        addToCart(product);
        alert('Item added to cart!');
    };

    const handleContinueShopping = () => {
        navigate(-1); 
    };

    if (favoriteProducts.length === 0) {
        return (
            <div className="favorites-container">
                <p>No favorites added.</p>
                <button onClick={handleContinueShopping} className="continue-shopping-button">
                    Continue Shopping
                </button>
            </div>
        );
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
                    <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                    <button onClick={() => removeFromFavorites(product._id)} className="remove-favorite-button">
                        Remove from Favorites
                    </button>
                </div>
            ))}
            <button onClick={handleContinueShopping} className="continue-shopping-button">
                Continue Shopping
            </button>
        </div>
    );
}

export default FavoritesPage;