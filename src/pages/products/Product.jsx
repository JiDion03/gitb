import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "../Cart/CartContext";
import { useAuth } from "../login/AuthContext";
import "./Product.less";
import { useNotification } from "../../components/notifications/NotificationContext";

function Product() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [rating, setRating] = useState(0);
  const [distributorRating, setDistributorRating] = useState(0);
  const [user, setUser] = useState(null);
  const [review, setReview] = useState({ rating: "", comment: "" });
  const [reviews, setReviews] = useState([]);
  const { auth } = useAuth();
  const showNotification = useNotification();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log(`Fetching product with ID: ${productId}`);
        const response = await axios.get(
          `http://localhost:5000/api/products/${productId}`
        );
        console.log("Product data fetched:", response.data);
        setProduct(response.data);
        setReviews(response.data.reviews || []);
        setUser(auth.user);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, auth.user]);

  const toggleFavorite = () => {
    let updatedFavorites;
    if (favorites.includes(product._id)) {
      updatedFavorites = favorites.filter((favId) => favId !== product._id);
      showNotification("Item removed from favorites!", "info");
    } else {
      updatedFavorites = [...favorites, product._id];
      showNotification("Item added to favorites!", "info");
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleAddToCart = () => {
    addToCart(product);
    showNotification("Item added to cart!", "success");
  };

  const handleRating = async (type) => {
    const endpoint =
      type === "product"
        ? `/api/items/rate/${productId}`
        : `/api/items/rate-distributor/${product?.distributor?._id}`;

    try {
      await axios.post(endpoint, {
        userId: user._id,
        rating: type === "product" ? rating : distributorRating,
      });
      showNotification(
        `${type === "product" ? "Product" : "Distributor"} rated successfully!`,
        "success"
      );
    } catch (error) {
      console.error("Error rating:", error);
      showNotification("Error rating the item.", "error");
    }
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReview((prevReview) => ({ ...prevReview, [name]: value }));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, redirecting to login.");
        return;
      }

      const response = await axios.post(
        `http://localhost:5000/api/products/${productId}/reviews`,
        review,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReviews([...reviews, response.data]);
      setReview({ rating: "", comment: "" });
      showNotification("Review submitted successfully!", "success");
    } catch (err) {
      console.error("Error submitting review:", err);
      showNotification("Error submitting the review.", "error");
    }
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
        <img
          src={`http://localhost:5000/${product.images[0]}`}
          alt={product.name}
          className="product-image"
        />
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="price">${product.price}</p>
          <p>{product.description}</p>
          <p>
            Distributor: {product.distributor?.firstName}{" "}
            {product.distributor?.lastName} ({product.distributor?.email})
          </p>
          <div className="button-group">
            <button onClick={handleAddToCart}>Add to Cart</button>
            <button
              onClick={toggleFavorite}
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
          {auth.isLoggedIn && (
            <div className="review-form">
              <h3>Leave a Review</h3>
              <form onSubmit={handleReviewSubmit}>
                <label>
                  Rating:
                  <select
                    name="rating"
                    value={review.rating}
                    onChange={handleReviewChange}
                    required
                  >
                    <option value="">Select rating</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                </label>
                <label>
                  Comment:
                  <textarea
                    name="comment"
                    value={review.comment}
                    onChange={handleReviewChange}
                  ></textarea>
                </label>
                <button type="submit">Submit Review</button>
              </form>
            </div>
          )}
          <div className="reviews">
            <h3>Reviews</h3>
            {reviews.length === 0 ? (
              <p>No reviews yet</p>
            ) : (
              reviews.map((review) => (
                <div key={review._id} className="review">
                  <p>
                    <strong>
                      {review.user.firstName} {review.user.lastName}
                    </strong>{" "}
                    ({new Date(review.createdAt).toLocaleDateString()})
                  </p>
                  <p>Rating: {review.rating}</p>
                  <p>{review.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
