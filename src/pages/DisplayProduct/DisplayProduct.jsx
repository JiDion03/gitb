import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../Cart/CartContext';
import './DisplayProduct.less';

function DisplayProducts({ products, setProducts }) {
    const { addToCart } = useCart();
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!products || products.length === 0) {
            const fetchProducts = async () => {
                try {
                    const response = await axios.get('http://localhost:5000/api/products');
                    setProducts(response.data);
                } catch (error) {
                    setError('Failed to fetch products');
                    console.error('Error:', error);
                }
            };
            fetchProducts();
        }
    }, [products, setProducts]);

    const toggleFavorite = (product) => {
        let updatedFavorites;
        if (favorites.includes(product._id)) {
            updatedFavorites = favorites.filter(favId => favId !== product._id);
        } else {
            updatedFavorites = [...favorites, product._id];
        }
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    const handleAddToCart = (product) => {
        addToCart(product);
        alert('Item added to cart!');
    };

    if (error) {
        return <p>Error loading products: {error}</p>;
    }

    if (!Array.isArray(products) || products.length === 0) {
        return <p>No products found. Please adjust your filters or try again later.</p>;
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
                    <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                    <button onClick={() => toggleFavorite(product)} className={favorites.includes(product._id) ? 'favorite-button active' : 'favorite-button'}>
                        {favorites.includes(product._id) ? 'Remove from Favorites' : 'Add to Favorites'}
                    </button>
                </div>
            ))}
        </div>
    );
}

export default DisplayProducts;