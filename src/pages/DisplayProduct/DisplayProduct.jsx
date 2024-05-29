import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from "../Cart/CartContext";
import { useFavorites } from "../Favorite/FavoritesContext";
import "./DisplayProduct.less";
import { useNotification } from "../../components/notifications/NotificationContext";

function DisplayProducts({ products, setProducts }) {
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  const [error, setError] = useState("");
  const showNotification = useNotification();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        setError("Failed to fetch products");
        console.error("Error:", error);
      }
    };

    fetchProducts();
  }, [setProducts]);

  const handleAddToCart = (product) => {
    addToCart(product);
    showNotification("Item added to cart!", "success");
  };

  const handleToggleFavorite = (product) => {
    toggleFavorite(product._id);
    const isFavorite = favorites.includes(product._id);
    showNotification(
      isFavorite ? "Item removed from favorites!" : "Item added to favorites!",
      "info"
    );
  };

  if (error) {
    return <p>Error loading products: {error}</p>;
  }

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <p>No products found. Please adjust your filters or try again later.</p>
    );
  }

  return (
    <div className="products-container">
      {products.map((product) => (
        <div key={product._id} className="product-card">
          <Link to={`/product/${product._id}`}>
            <img
              src={`http://localhost:5000/${product.images[0]}`}
              alt={product.name}
              style={{ width: "100%", height: "auto" }}
            />
            <h2>{product.name}</h2>
          </Link>
          <p className="price">${product.price}</p>
          <p className="category">
            {product.category} - {product.subcategory}
          </p>
          <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          <button
            onClick={() => handleToggleFavorite(product)}
            className={
              favorites.includes(product._id)
                ? "favorite-button active"
                : "favorite-button"
            }
          >
            {favorites.includes(product._id)
              ? "Remove from Favorites"
              : "Add to Favorites"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default DisplayProducts;
