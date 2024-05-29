import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useCart } from "../Cart/CartContext";
import { useFavorites } from "../Favorite/FavoritesContext";
import Navbar from "../../components/navbar/Navbar";
import "./Favorite.less";

function FavoritesPage({ products = [] }) {
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  const navigate = useNavigate();
  const location = useLocation();

  const isSpecialPage =
    location.pathname.startsWith("/profile") ||
    location.pathname.startsWith("/favorites") ||
    location.pathname.startsWith("/cart");

  const pageStyles = isSpecialPage ? { boxSizing: "border-box" } : {};

  useEffect(() => {
    console.log("Favorites:", favorites);
    console.log("Products:", products);
  }, [favorites, products]);

  if (!Array.isArray(products) || products.length === 0) {
    console.error("Products is not an array or empty:", products);
    return (
      <div className="favorites-container" style={pageStyles}>
        <Navbar />
        <p>Error loading products. Please try again later.</p>
        <button
          onClick={handleContinueShopping}
          className="continue-shopping-button"
        >
          Back to shopping
        </button>
      </div>
    );
  }

  const favoriteProducts = products.filter((product) => {
    const isFavorite = favorites.includes(product._id);
    console.log(`Product ${product._id} is favorite:`, isFavorite);
    return isFavorite;
  });

  const handleAddToCart = (product) => {
    addToCart(product);
    alert("Item added to cart!");
  };

  const handleContinueShopping = () => {
    navigate(-1);
  };

  if (favoriteProducts.length === 0) {
    return (
      <div className="favorites-container" style={pageStyles}>
        <Navbar />
        <div>
          <p className="no-fav-mes">No favorites added.</p>
        </div>
        <button
          onClick={handleContinueShopping}
          className="continue-shopping-button"
        >
          Back to shopping
        </button>
      </div>
    );
  }

  return (
    <div className="favorites-container" style={pageStyles}>
      <Navbar />
      <h2 className="text-favorite">Your Favorites</h2>
      {favoriteProducts.map((product) => (
        <div key={product._id} className="product-card">
          <img
            src={`http://localhost:5000/${product.images[0]}`}
            alt={product.name}
            style={{ width: "100%", height: "auto" }}
          />
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p className="price">${product.price}</p>
          <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          <button
            onClick={() => toggleFavorite(product._id)}
            className="remove-favorite-button"
          >
            Remove from Favorites
          </button>
        </div>
      ))}
      <button
        onClick={handleContinueShopping}
        className="continue-shopping-button"
      >
        Back to shopping
      </button>
    </div>
  );
}

FavoritesPage.propTypes = {
  products: PropTypes.array.isRequired,
};

export default FavoritesPage;
