import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ProductDetails.less';
import { useCart } from '../Cart/CartContext';
import { useAuth } from '../login/AuthContext';

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart } = useCart();
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const [review, setReview] = useState({ rating: '', comment: '' });
  const [reviews, setReviews] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setProduct(response.data);
        setReviews(response.data.reviews || []);
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

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReview(prevReview => ({ ...prevReview, [name]: value }));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found, redirecting to login.');
        return;
      }

      const response = await axios.post(`http://localhost:5000/api/products/${productId}/reviews`, review, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setReviews([...reviews, response.data]);
      setReview({ rating: '', comment: '' });
    } catch (err) {
      console.error('Error submitting review:', err);
    }
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
          <p className="product-distributor">Sold by: {product.distributor.firstName} {product.distributor.lastName}</p>
          <div className="product-actions">
            <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
            <button
              className={favorites.includes(product._id) ? 'add-to-favorites active' : 'add-to-favorites'}
              onClick={toggleFavorite}
            >
              {favorites.includes(product._id) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
          {auth.isLoggedIn && (
            <div className="review-form">
              <h3>Leave a Review</h3>
              <form onSubmit={handleReviewSubmit}>
                <label>
                  Rating:
                  <select name="rating" value={review.rating} onChange={handleReviewChange} required>
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
                  <textarea name="comment" value={review.comment} onChange={handleReviewChange}></textarea>
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
              reviews.map(review => (
                <div key={review._id} className="review">
                  <p><strong>{review.user.firstName} {review.user.lastName}</strong> ({new Date(review.createdAt).toLocaleDateString()})</p>
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

export default ProductDetails;
